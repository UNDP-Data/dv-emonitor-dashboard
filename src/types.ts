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
