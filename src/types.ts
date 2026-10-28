export interface DefenderCountriesDataRow {
  iso_code: string;
  country_name: string;
  total_posts: number;
  tfgbv_posts_ai_assisted: number;
  tfgbv_posts_human_validated: number;
  behavior_inorganic: number;
  behavior_organic: number;
  country_snapshot: string;
}

export interface TargetAffiliationDataRow {
  targets: string;
  value: number;
}

export interface MessageItem {
  year: number;
  month: number;
  day: number;
  author?: number;
  is_tfgbv?: number;
  is_hate_speech?: number;
  no_of_followers?: number;
  is_event_related?: number;
  total_engagement?: number;
  overall_sentiment?: number;
  topic?: number;
  target_gender?: number;
  is_target_wehrd?: number;
  is_target_indigenous?: number;
  incitement_techniques?: number;
  speech_intensity?: number;
  target_affiliation?: number;
  core_event?: number;
  harmful_keyword?: number;
}

export interface LookupItem {
  id: number;
  column: string;
  name: string;
}
