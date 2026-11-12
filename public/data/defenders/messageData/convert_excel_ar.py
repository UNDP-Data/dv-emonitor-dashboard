#!/usr/bin/env python3
"""
Convert the automatically annotated TFGBV / hate-speech Excel sheet (Auto.xlsx) into a
compact, integer-coded CSV plus a lookup CSV for core_event, harmful_keyword and
harmful_phrases.

Works with the English and the Arabic version of the sheet. The language is detected from
the column headers; use --lang to force one. Keywords, phrases and event names are kept in
their original language in the lookup.

Usage:
    python convert_excel.py Auto.xlsx
    python convert_excel.py Auto_1.xlsx -o output_ar.csv -l lookup_ar.csv
    python convert_excel.py Auto.xlsx --no-core-event

Requires: pandas, openpyxl  (pip install pandas openpyxl)
"""

import argparse
import re
import sys

import pandas as pd

# --------------------------------------------------------------------------------------
# Config
# --------------------------------------------------------------------------------------

# Flag: include the core_event column (and its lookup rows). Can also be turned off
# from the command line with --no-core-event.
INCLUDE_CORE_EVENT = True

# Characters that separate multiple keywords/phrases in one cell ("،" is the Arabic comma).
KEYWORD_SEPARATORS = [",", "،"]

# Source column names per language
COLUMNS = {
    "en": {
        "created": "created",
        "author": "author",
        "tfgbv": "does the post contain technology facilitated gender based  TFGBV",
        "hate": "does the article contains hate speech",
        "followers": "followers_count",
        "event": "is the post linked to a specific event that happened in the country",
        "sentiment": "what is the overall sentiment of the post",
        "topic": "what is the topic of the content",
        "gender": "what is the gender of target of hate speech",
        "wehrd": "is the harmful content targeting wehrds",
        "indigenous": "is the harmful content targeting Indigenous women?",
        "tactic": "what is the tactic used to incite violence",
        "intensity": "what is the intensity of the hate speech",
        "affiliation": "what is the affiliation of target of tfgbv",
        "event_name": "if there is an event that happened in the country please return its name",
        "keywords": "what is the harmful keyword used in the post",
        "text": "text",
    },
    "ar": {
        "created": "تاريخ الإنشاء",
        "author": "الكاتب",
        "tfgbv": "هل يحتوي المنشور على عنف قائم على النوع الاجتماعي الميسّر بالتكنولوجيا (TFGBV)؟",
        "hate": "هل يحتوي المنشور/المقال على خطاب كراهية؟",
        "followers": "عدد المتابعين",
        "event": "هل يرتبط المنشور بحدث محدد وقع في البلد؟",
        "sentiment": "ما هو الشعور العام للمنشور؟",
        "topic": "ما موضوع المحتوى؟",
        "gender": "ما هو نوع جنس الهدف من خطاب الكراهية؟",
        "wehrd": "هل يستهدف المحتوى الضار المدافعات عن حقوق الإنسان؟",
        "indigenous": "هل يستهدف المحتوى الضار النساء من الشعوب الأصلية؟",
        "tactic": "ما هو التكتيك المستخدم للتحريض على العنف؟",
        "intensity": "ما شدة خطاب الكراهية؟",
        "affiliation": "ما الانتماء/الصفة المؤسسية لهدف TFGBV؟",
        "event_name": "إذا وُجد حدث في البلد، يرجى ذكر اسمه.",
        "keywords": "ما هي الكلمة/الكلمات الضارة المستخدمة في المنشور؟",
        "text": "نص",
    },
}

ENGAGEMENT_COLUMNS = {
    "en": [
        "like_count", "nbre_share", "count_comments", "count_love", "count_haha",
        "count_angry", "count_care", "count_sad", "count_wow", "retweet_count",
    ],
    "ar": [
        "عدد الإعجابات", "عدد المشاركات", "عدد التعليقات", "عدد القلوب", "عدد الضحك",
        "عدد الغضب", "عدد الاهتمام", "عدد الحزن", "عدد الدهشة", "عدد إعادة النشر",
    ],
}

# Label -> code maps (English and Arabic labels in the same map). Matching is done on the
# label text, ignoring case and the "N- " prefix, because the sheet's own numbering doesn't
# always match the coding wanted here (e.g. wehrds is "0- Yes / 1- No" in the sheet).
# A non-blank value that isn't listed is printed as a warning and left blank.
YES_NO = {
    "no": 0, "yes": 1,
    "لا": 0, "نعم": 1,
}
YES_NO_NA = {  # wehrds, event-related
    "no": 0, "yes": 1, "n/a": 2,
    "لا": 0, "نعم": 1,
}
INDIGENOUS = {
    "no": 0, "yes": 1, "unclear": 2,
    "لا": 0, "نعم": 1,
    "n/a": 3,  # only in the Arabic sheet ("2- N/A")
}

SENTIMENT = {
    "positive": 0, "negative": 1, "neutral": 2,
    "إيجابي": 0, "سلبي": 1, "محايد": 2,
}

TOPIC = {
    "politics": 0, "environment": 1, "social issues": 2,
    "technology": 3, "sports/entertainment": 4, "other": 5, "others": 5,
    "السياسة": 0, "البيئة": 1, "القضايا الاجتماعية": 2,
    "التكنولوجيا": 3, "الرياضة/الترفيه": 4, "أخرى": 5,
}

GENDER = {
    "women": 0, "men": 1, "nonbinary": 2, "n/a": 3,
    "نساء": 0, "رجال": 1,
}

TACTIC = {
    "incitement of violence": 0, "rape threats": 1, "marginalization and shaming": 2,
    "stereotyping": 3, "disinformation": 4, "sexual and/or verbal harassment": 5,
    "nonconsensual image or video sharing": 6, "doxing": 7,
    "hostile political profiling": 8, "legal harassment and intimidation": 9, "other": 10,
    "تحريض على العنف": 0, "تهديدات بالاغتصاب": 1, "تهميش وتشويه سمعة": 2,
    "قوالب نمطية": 3, "معلومات مضللة": 4, "تحرش جنسي و/أو لفظي": 5,
    "مشاركة صور أو فيديو دون موافقة": 6, "كشف بيانات خاصة": 7,
    "تصنيف سياسي عدائي": 8, "مضايقة وتهديد قانوني": 9, "غيره": 10,
}

INTENSITY = {
    "disagreement": 0, "negative actions": 1, "negative characterization": 2,
    "demonizing and dehumanizing": 3, "violence": 4, "death": 5, "other": 6,
    "اختلاف في الرأي": 0, "أفعال سلبية": 1, "توصيف سلبي": 2,
    "شيطنة ونزع الإنسانية": 3, "عنف": 4, "موت": 5,
}

# The Arabic Auto sheet's affiliation column contains topic options (سياسة، بيئة، ...)
# instead of affiliations, so those values are reported as unknown and left blank.
AFFILIATION = {
    "journalist": 0, "religious figure": 1, "politician": 2, "academic": 3,
    "government employee/public office holder": 4,
    "government employee/public office holders": 4,
    "cso representative": 5, "other": 6,
    "صحفي/ـة": 0, "شخصية دينية": 1, "سياسي/ـة": 2, "أكاديمي/ـة": 3,
    "موظف حكومي/شاغل منصب عام": 4, "ممثل منظمة مجتمع مدني": 5, "أخرى (حدد)": 6,
}

# --------------------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------------------

PREFIX_RE = re.compile(r"^\s*\d+\s*-\s*")
UNKNOWN_LABELS = {}  # (column, value) -> count, reported at the end


def normalise_label(value):
    """'1- Yes' -> 'yes'; '4-  مرتبك/مندهش' -> 'مرتبك/مندهش'; blank -> None."""
    if pd.isna(value):
        return None
    text = PREFIX_RE.sub("", str(value)).strip().casefold()
    text = re.sub(r"\s+", " ", text)
    return text or None


def map_category(df, column, mapping):
    table = {normalise_label(k): v for k, v in mapping.items()}

    def convert(value):
        key = normalise_label(value)
        if key is None:
            return None
        code = table.get(key)
        if code is None:
            UNKNOWN_LABELS[(column, str(value))] = UNKNOWN_LABELS.get((column, str(value)), 0) + 1
        return code

    return df[column].map(convert).astype("Int64")


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
        key = re.sub(r"\s+", " ", name.strip()).casefold()
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


def detect_language(df, forced=None):
    langs = [forced] if forced else list(COLUMNS)
    missing = {}
    for lang in langs:
        needed = list(COLUMNS[lang].values()) + ENGAGEMENT_COLUMNS[lang]
        missing[lang] = [c for c in needed if c not in df.columns]
        if not missing[lang]:
            return lang
    for lang, cols in missing.items():
        print(f"Not a '{lang}' sheet, missing columns: {cols}", file=sys.stderr)
    sys.exit(1)


# --------------------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------------------

def convert(input_path, output_path, lookup_path, include_core_event, lang=None):
    df = pd.read_excel(input_path)
    lang = detect_language(df, lang)
    COL = COLUMNS[lang]
    print(f"Detected language: {lang}")

    # Drop rows with no date, text and author (e.g. the ~1M filled-down empty rows in the
    # Arabic sheet). Kept rows keep their original index, so Excel row = index + 2.
    empty = df[[COL["created"], COL["text"], COL["author"]]].isna().all(axis=1)
    if empty.any():
        print(f"Skipped {empty.sum():,} empty rows (no date, text or author)")
        df = df[~empty]

    out = pd.DataFrame(index=df.index)

    created = pd.to_datetime(df[COL["created"]], errors="coerce")
    out["year"] = (created.dt.year % 100).astype("Int64")   # 2025 -> 25
    out["month"] = created.dt.month.astype("Int64")
    out["day"] = created.dt.day.astype("Int64")

    authors = IdRegistry()
    out["author"] = df[COL["author"]].map(
        lambda a: authors.get(str(a)) if pd.notna(a) and str(a).strip() else pd.NA
    ).astype("Int64")

    out["is_tfgbv"] = map_category(df, COL["tfgbv"], YES_NO)
    out["is_hate_speech"] = map_category(df, COL["hate"], YES_NO)
    out["no_of_followers"] = df[COL["followers"]].map(follower_bucket).astype("Int64")
    out["is_event_related"] = map_category(df, COL["event"], YES_NO_NA)
    out["total_engagement"] = (
        df[ENGAGEMENT_COLUMNS[lang]].apply(pd.to_numeric, errors="coerce")
        .fillna(0).sum(axis=1).astype("int64")
    )
    out["overall_sentiment"] = map_category(df, COL["sentiment"], SENTIMENT)
    out["topic"] = map_category(df, COL["topic"], TOPIC)
    out["target_gender"] = map_category(df, COL["gender"], GENDER)
    out["is_target_wehrd"] = map_category(df, COL["wehrd"], YES_NO_NA)
    out["is_target_indigenous"] = map_category(df, COL["indigenous"], INDIGENOUS)
    out["incitement_techniques"] = map_category(df, COL["tactic"], TACTIC)
    out["speech_intensity"] = map_category(df, COL["intensity"], INTENSITY)
    ### out["target_affiliation"] = map_category(df, COL["affiliation"], AFFILIATION)

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

    # utf-8-sig adds a BOM so Excel shows Arabic correctly when opening the CSV
    out.to_csv(output_path, index=False, encoding="utf-8-sig")
    pd.DataFrame(lookup_rows, columns=["id", "column", "name"]).to_csv(
        lookup_path, index=False, encoding="utf-8-sig"
    )

    print(f"Wrote {len(out):,} rows to {output_path}")
    print(f"Wrote {len(lookup_rows):,} lookup rows to {lookup_path}")
    print(f"  authors: {len(authors.ids):,}  keywords: {len(keywords.ids):,}  phrases: {len(phrases.ids):,}"
          + (f"  events: {len(events.ids):,}" if include_core_event else ""))
    report_unknown_labels()
    report_unparseable_dates(df, created, COL)


def report_unknown_labels():
    if not UNKNOWN_LABELS:
        return
    print("\nValues not in the mappings (left blank) - add them to the maps at the top if needed:")
    for (column, value), n in sorted(UNKNOWN_LABELS.items()):
        print(f"  {column.strip()!r}: {value!r} x{n:,}")


def report_unparseable_dates(df, created, COL):
    """Print every row whose 'created' value could not be parsed as a date.
    A blank 'created' is not reported, only non-blank values that failed to parse."""
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
    p.add_argument("-o", "--output", default="output.csv")
    p.add_argument("-l", "--lookup", default="lookup.csv")
    p.add_argument("--lang", choices=list(COLUMNS), help="Force the sheet language (default: detect)")
    p.add_argument("--no-core-event", action="store_true", help="Leave out the core_event column")
    args = p.parse_args()
    convert(args.input, args.output, args.lookup,
            INCLUDE_CORE_EVENT and not args.no_core_event, args.lang)


if __name__ == "__main__":
    main()
