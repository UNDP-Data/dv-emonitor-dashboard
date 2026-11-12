#!/usr/bin/env python3
"""
Convert the TFGBV / hate-speech annotation Excel sheet into a compact, integer-coded CSV
plus a lookup CSV for core_event, harmful_keyword and harmful_phrases.

Usage:
    python convert_excel.py Auto.xlsx
    python convert_excel.py Auto.xlsx -o output.csv -l lookup.csv --no-core-event

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

# Source column names
COL = {
    "created": "created",
    "author": "author",
    "tfgbv": "does the post contain technology facilitated gender based violence TFGBV",
    "hate": "does the article contains hate speech",
    "followers": "followers_count",
    "event": "is the post linked to a specific event that happened in the country",
    "sentiment": "what is the overall sentiment of the post",
    "topic": "what is the topic of the content",
    "gender": "what is the gender of target of hate speech",
    "wehrd": "is the harmful content targeting wehrds",
    "indigenous": "is the harmful content targeting indigenous women",
    "tactic": "what is the tactic used to incite violence",
    "intensity": "what is the intensity of the hate speech",
    "affiliation": "what is the affiliation of target of tfgbv",
    "event_name": "if there is an event that happened in the country please return its name",
    "keywords": "what is the harmful keyword used in the post",
}

ENGAGEMENT_COLS = [
    "like_count", "nbre_share", "count_comments", "count_love", "count_haha",
    "count_angry", "count_care", "count_sad", "count_wow", "retweet_count",
]

# Label -> code maps. Matching is done on the label text (case-insensitive, without the
# "N- " prefix in the sheet), because the sheet's own numbering doesn't always match the
# coding wanted here (e.g. wehrds is "0- Yes / 1- No" in the sheet). Anything not listed
# becomes blank.
YES_NO = {"no": 0, "yes": 1}
YES_NO_NA = {"no": 0, "yes": 1, "n/a": 2}          # wehrds, event-related
YES_NO_UNCLEAR = {"no": 0, "yes": 1, "unclear": 2}  # Indigenous women

SENTIMENT = {"positive": 0, "negative": 1, "neutral": 2}

TOPIC = {
    "politics": 0, "environment": 1, "social issues": 2,
    "technology": 3, "sports/entertainment": 4, "other": 5, "others": 5,
}

GENDER = {"women": 0, "men": 1, "nonbinary": 2, "n/a": 3}

TACTIC = {
    "incitement of violence": 0, "rape threats": 1, "marginalization and shaming": 2,
    "stereotyping": 3, "disinformation": 4, "sexual and/or verbal harassment": 5,
    "nonconsensual image or video sharing": 6, "doxing": 7,
    "hostile political profiling": 8, "legal harassment and intimidation": 9, "other": 10,
}

INTENSITY = {
    "disagreement": 0, "negative actions": 1, "negative characterization": 2,
    "demonizing and dehumanizing": 3, "violence": 4, "death": 5, "other": 6,
}

AFFILIATION = {
    "journalist": 0, "religious figure": 1, "politician": 2, "academic": 3,
    "government employee/public office holder": 4,
    "government employee/public office holders": 4,
    "cso representative": 5, "other": 6,
}

# --------------------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------------------

PREFIX_RE = re.compile(r"^\s*\d+\s*-\s*")


def normalise_label(value):
    """'1- Yes' -> 'yes'; blank -> None."""
    if pd.isna(value):
        return None
    text = PREFIX_RE.sub("", str(value)).strip().lower()
    text = re.sub(r"\s+", " ", text)
    return text or None


def map_category(series, mapping):
    return series.map(lambda v: mapping.get(normalise_label(v))).astype("Int64")


def follower_bucket(value):
    n = pd.to_numeric(value, errors="coerce")
    if pd.isna(n):
        return pd.NA
    if n < 100:
        return 0
    if n < 1_000:
        return 1
    if n <= 5_000:
        return 2
    return 3


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

    out["is_tfgbv"] = map_category(df[COL["tfgbv"]], YES_NO)
    out["is_hate_speech"] = map_category(df[COL["hate"]], YES_NO)
    out["no_of_followers"] = df[COL["followers"]].map(follower_bucket).astype("Int64")
    out["is_event_related"] = map_category(df[COL["event"]], YES_NO_NA)
    out["total_engagement"] = (
        df[ENGAGEMENT_COLS].apply(pd.to_numeric, errors="coerce").fillna(0).sum(axis=1).astype("int64")
    )
    out["overall_sentiment"] = map_category(df[COL["sentiment"]], SENTIMENT)
    out["topic"] = map_category(df[COL["topic"]], TOPIC)
    out["target_gender"] = map_category(df[COL["gender"]], GENDER)
    out["is_target_wehrd"] = map_category(df[COL["wehrd"]], YES_NO_NA)
    out["is_target_indigenous"] = map_category(df[COL["indigenous"]], YES_NO_UNCLEAR)
    out["incitement_techniques"] = map_category(df[COL["tactic"]], TACTIC)
    out["speech_intensity"] = map_category(df[COL["intensity"]], INTENSITY)
    out["target_affiliation"] = map_category(df[COL["affiliation"]], AFFILIATION)

    lookup_rows = []

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


def report_unparseable_dates(df, created):
    """Print every row whose 'created' value could not be parsed as a date.
    A blank 'created' is not reported, only non-blank values that failed to parse."""
    bad = created.isna() & df[COL["created"]].notna()
    if not bad.any():
        return
    print(f"\n{bad.sum()} rows had an unparseable 'created' value (year/month/day left blank):")
    for idx in df.index[bad]:
        # idx is the 0-based DataFrame index; +2 gives the Excel row (1 header row, 1-based)
        print(f"\n--- index {idx} (Excel row {idx + 2}) | created = {df.at[idx, COL['created']]!r}")
        for col, val in df.loc[idx].items():
            if pd.notna(val):
                print(f"  {col}: {val!r}" if isinstance(val, str) else f"  {col}: {val}")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("input", help="Path to the .xlsx file")
    p.add_argument("-o", "--output", default="output.csv")
    p.add_argument("-l", "--lookup", default="lookup.csv")
    p.add_argument("--no-core-event", action="store_true", help="Leave out the core_event column")
    args = p.parse_args()
    convert(args.input, args.output, args.lookup, INCLUDE_CORE_EVENT and not args.no_core_event)


if __name__ == "__main__":
    main()