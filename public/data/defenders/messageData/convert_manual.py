#!/usr/bin/env python3
"""
Convert the manually annotated TFGBV sheet (Manual.xlsx) into the same integer-coded CSV
format as convert_excel.py, plus a lookup CSV for core_event, harmful_keyword and
harmful_phrases.

is_hate_speech and no_of_followers are not produced (no matching columns in this sheet).

Usage:
    python convert_manual.py Manual.xlsx
    python convert_manual.py Manual.xlsx -o manual_output.csv -l manual_lookup.csv --no-core-event

Requires: pandas, openpyxl  (pip install pandas openpyxl)
"""

import argparse
import re

import pandas as pd

# --------------------------------------------------------------------------------------
# Config
# --------------------------------------------------------------------------------------

# Flag: include the core_event column (and its lookup rows). Can also be turned off
# from the command line with --no-core-event.
INCLUDE_CORE_EVENT = True

# Characters that separate multiple keywords/phrases in one cell.
KEYWORD_SEPARATORS = [","]

# Separator for cells with several topics, e.g. "Politics; Environment"
TOPIC_SEPARATOR = ";"

# Source column names (several have a trailing space in the sheet)
COL = {
    "created": "Creation date",
    "author": "Author",
    "tfgbv": "Does the post contain TFGBV ",
    "event": "the post linked to a specific event",
    "sentiment": "Overall sentiment of the text",
    "topic": "the topic of the content",
    "gender": "Gender of target of hate speech ",
    "wehrd": "Is the harmful content targeting WEHRDs? ",
    "indigenous": "Is the harmful content targeting Indigenous women? ",
    "tactic": "What is the tactic used to incite violence? ",
    "intensity": "What is the intensity of the hate speech ",
    "affiliation": "Affiliation of target of TFGBV? ",
    "event_name": "What event",
    "keywords": "the harmful keyword ",
}

ENGAGEMENT_COLS = [
    "Number of shares", "Number of 'Likes'", "Number of comments", "Number of 'Love'",
    "Number of 'Haha'", "Number of 'Angry'", "Number of 'Care'", "Number of 'Sad'",
    "Number of 'Wow'", "Number of retweets",
]

# Label -> code maps, same codes as convert_excel.py. Keys are spelled exactly as in the
# sheet. Matching ignores case and surrounding spaces ("YES" -> "Yes", " Other" -> "Other").
# A non-blank value that isn't listed here is printed as a warning and left blank.

TFGBV = {"No": 0, "YES": 1}

EVENT_RELATED = {"No": 0, "Yes": 1}

SENTIMENT = {"Positive": 0, "Negative": 1, "Neutral": 2}

TOPIC = {
    "Politics": 0,
    "Environment": 1,
    "Social Issues (including health, education and others)": 2,
    "Technology": 3,
    "Sports/Entertainment": 4,
    "Other": 5,
}

# 3 is N/A in convert_excel.py; "Unclear" is new in this sheet, coded as 4
GENDER = {"Women": 0, "Men": 1, "Nonbinary": 2, "Not applicable": 3, "Unclear": 4}

# 2 is N/A in convert_excel.py; "Unclear" is new in this sheet, coded as 3
WEHRD = {"No": 0, "Yes": 1, "Unclear": 3}

INDIGENOUS = {"No": 0, "Yes": 1, "Unclear": 2}

TACTIC = {
    "Incitement of violence": 0,
    "Rape threats": 1,
    "Marginalization and shaming": 2,
    "Stereotyping": 3,
    "Disinformation": 4,
    "Sexual and/or verbal harassment": 5,
    "Nonconsensual image or video sharing": 6,
    "Doxing": 7,
    "Hostile political profiling": 8,
    "Legal harassment and intimidation": 9,
    "Other (please specify)": 10,
}

INTENSITY = {
    "Disagreement": 0,
    "Negative actions": 1,
    "Negative characterization": 2,
    "Demonizing and dehumanizing": 3,
    "Violence": 4,
    "Death": 5,
    "Other": 6,  # not in the current sheets, kept for parity with convert_excel.py
}

AFFILIATION = {
    "Journalist": 0,
    "Religious figure": 1,
    "Politician": 2,
    "Academic": 3,
    "Government employee/public office holders": 4,
    "CSO representative": 5,
    "Other (Specify)": 6,
}

# --------------------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------------------

UNKNOWN_LABELS = {}  # (column, value) -> count, reported at the end


def _key(value):
    return re.sub(r"\s+", " ", str(value)).strip().casefold()


def lookup(mapping, value, column):
    """Case/space-insensitive lookup against the exact sheet spellings in `mapping`."""
    if pd.isna(value) or not str(value).strip():
        return None
    table = {_key(k): v for k, v in mapping.items()}
    code = table.get(_key(value))
    if code is None:
        UNKNOWN_LABELS[(column, str(value))] = UNKNOWN_LABELS.get((column, str(value)), 0) + 1
    return code


def map_category(df, column, mapping):
    return df[column].map(lambda v: lookup(mapping, v, column)).astype("Int64")



def map_multi_category(df, column, mapping, sep):
    """'Politics; Environment' -> '0|1'. Unknown labels are dropped; none left -> blank."""
    def convert(cell):
        if pd.isna(cell):
            return None
        codes = []
        for part in str(cell).split(sep):
            code = lookup(mapping, part, column)
            if code is not None and code not in codes:
                codes.append(code)
        return "|".join(map(str, codes)) if codes else None
    return df[column].map(convert)


class IdRegistry:
    """Hands out ids starting at 1, deduplicating case-insensitively.
    The first spelling seen is the one written to the lookup."""

    def __init__(self):
        self.ids = {}
        self.names = {}

    def get(self, name):
        key = re.sub(r"\s+", " ", name.strip()).lower()
        if key not in self.ids:
            self.ids[key] = len(self.ids) + 1
            self.names[self.ids[key]] = re.sub(r"\s+", " ", name.strip())
        return self.ids[key]

    def items(self):
        return sorted(self.names.items())


def split_terms(cell):
    if pd.isna(cell):
        return []
    text = str(cell)
    for sep in KEYWORD_SEPARATORS[1:]:
        text = text.replace(sep, KEYWORD_SEPARATORS[0])
    return [t.strip() for t in text.split(KEYWORD_SEPARATORS[0]) if t.strip()]


def is_single_word(term):
    return len(term.split()) == 1


def to_pipe_list(ids):
    # Written as e.g. 1|4|7 ; empty list -> blank cell
    return "|".join(map(str, ids)) if ids else None


# --------------------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------------------

def convert(input_path, output_path, lookup_path, include_core_event):
    df = pd.read_excel(input_path)
    out = pd.DataFrame(index=df.index)

    created = pd.to_datetime(df[COL["created"]], errors="coerce")
    out["year"] = (created.dt.year % 100).astype("Int64")   # 2025 -> 25
    out["month"] = created.dt.month.astype("Int64")
    out["day"] = created.dt.day.astype("Int64")

    authors = IdRegistry()
    out["author"] = df[COL["author"]].map(
        lambda a: authors.get(str(a)) if pd.notna(a) and str(a).strip() else pd.NA
    ).astype("Int64")

    out["is_tfgbv"] = map_category(df, COL["tfgbv"], TFGBV)
    out["is_event_related"] = map_category(df, COL["event"], EVENT_RELATED)
    out["total_engagement"] = (
        df[ENGAGEMENT_COLS].apply(pd.to_numeric, errors="coerce").fillna(0).sum(axis=1).astype("int64")
    )
    out["overall_sentiment"] = map_category(df, COL["sentiment"], SENTIMENT)
    out["topic"] = map_multi_category(df, COL["topic"], TOPIC, TOPIC_SEPARATOR)
    out["target_gender"] = map_category(df, COL["gender"], GENDER)
    out["is_target_wehrd"] = map_category(df, COL["wehrd"], WEHRD)
    out["is_target_indigenous"] = map_category(df, COL["indigenous"], INDIGENOUS)
    out["incitement_techniques"] = map_category(df, COL["tactic"], TACTIC)
    out["speech_intensity"] = map_category(df, COL["intensity"], INTENSITY)
    out["target_affiliation"] = map_category(df, COL["affiliation"], AFFILIATION)

    lookup_rows = []  # core_event rows are only added when include_core_event is True

    if include_core_event:
        events = IdRegistry()
        out["core_event"] = df[COL["event_name"]].map(
            lambda e: events.get(str(e)) if pd.notna(e) and str(e).strip() else pd.NA
        ).astype("Int64")
        lookup_rows += [(i, "core_event", n) for i, n in events.items()]

    keywords, phrases = IdRegistry(), IdRegistry()
    kw_col, ph_col = [], []
    for cell in df[COL["keywords"]]:
        kw_ids, ph_ids = [], []
        for term in split_terms(cell):
            if is_single_word(term):
                i = keywords.get(term)
                if i not in kw_ids:
                    kw_ids.append(i)
            else:
                i = phrases.get(term)
                if i not in ph_ids:
                    ph_ids.append(i)
        kw_col.append(to_pipe_list(kw_ids))
        ph_col.append(to_pipe_list(ph_ids))
    out["harmful_keyword"] = kw_col
    out["harmful_phrases"] = ph_col

    lookup_rows += [(i, "harmful_keyword", n) for i, n in keywords.items()]
    lookup_rows += [(i, "harmful_phrases", n) for i, n in phrases.items()]

    out.to_csv(output_path, index=False)
    pd.DataFrame(lookup_rows, columns=["id", "column", "name"]).to_csv(lookup_path, index=False)

    print(f"Wrote {len(out):,} rows to {output_path}")
    print(f"Wrote {len(lookup_rows):,} lookup rows to {lookup_path}")
    print(f"  authors: {len(authors.ids):,}  keywords: {len(keywords.ids):,}  phrases: {len(phrases.ids):,}"
          + (f"  events: {len(events.ids):,}" if include_core_event else ""))
    report_unparseable_dates(df, created)
    report_unknown_labels()


def report_unknown_labels():
    if not UNKNOWN_LABELS:
        return
    print("\nValues not in the mappings (left blank) - add them to the maps at the top:")
    for (column, value), n in sorted(UNKNOWN_LABELS.items()):
        print(f"  {column.strip()!r}: {value!r} x{n}")


def report_unparseable_dates(df, created):
    """Print every row whose Creation date could not be parsed.
    A blank Creation date is not reported, only non-blank values that failed to parse."""
    bad = created.isna() & df[COL["created"]].notna()
    if not bad.any():
        return
    print(f"\n{bad.sum()} rows had an unparseable '{COL['created']}' value (year/month/day left blank):")
    for idx in df.index[bad]:
        # idx is the 0-based DataFrame index; +2 gives the Excel row (1 header row, 1-based)
        print(f"\n--- index {idx} (Excel row {idx + 2}) | {COL['created']} = {df.at[idx, COL['created']]!r}")
        for col, val in df.loc[idx].items():
            if pd.notna(val):
                print(f"  {col}: {val!r}" if isinstance(val, str) else f"  {col}: {val}")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("input", help="Path to the .xlsx file")
    p.add_argument("-o", "--output", default="manual_output.csv")
    p.add_argument("-l", "--lookup", default="manual_lookup.csv")
    p.add_argument("--no-core-event", action="store_true", help="Leave out the core_event column")
    args = p.parse_args()
    convert(args.input, args.output, args.lookup, INCLUDE_CORE_EVENT and not args.no_core_event)


if __name__ == "__main__":
    main()