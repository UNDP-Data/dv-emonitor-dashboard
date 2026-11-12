import { fetchAndParseCSV } from '@undp/data-viz/fetchAndParseData';
import {
  AFFILIATION,
  GENDER,
  INTENSITY,
  NO_OF_FOLLOWERS,
  SENTIMENT,
  TACTIC,
  TOPIC,
} from '@/constants';
import type { LookupItem, MessageItem } from '@/types';

export async function getCountryData(countryCode: string, analysisType: 'human' | 'ai') {
  const [messageData, lookupData] = await Promise.all([
    fetchAndParseCSV(
      `/data/defenders/messageData/${countryCode}/data-${analysisType}.csv`,
    ) as Promise<MessageItem[]>,
    fetchAndParseCSV(
      `/data/defenders/messageData/${countryCode}/lookup-${analysisType}.csv`,
    ) as Promise<LookupItem[]>,
  ]);

  const formattedData = messageData
    .map((item) => {
      const date = new Date(Date.UTC(2000 + +item.year, +item.month - 1, +item.day));
      return {
        ...item,
        date,
        date_string: date.toISOString().slice(0, 10),
        month_year: `${item.month}-${2000 + item.year}`,
        is_tfgbv: item.is_tfgbv === 1 ? true : item.is_tfgbv === 0 ? false : null,
        is_hate_speech: item.is_hate_speech === 1 ? true : item.is_hate_speech === 0 ? false : null,
        is_event_related:
          item.is_event_related === 1 ? true : item.is_event_related === 0 ? false : null,
        is_target_wehrd:
          item.is_target_wehrd === 1 ? true : item.is_target_wehrd === 0 ? false : null,
        is_target_indigenous:
          item.is_target_indigenous === 1 ? true : item.is_target_indigenous === 0 ? false : null,
        no_of_followers:
          item.no_of_followers !== undefined && item.no_of_followers !== null
            ? NO_OF_FOLLOWERS[item.no_of_followers]
            : undefined,
        overall_sentiment:
          item.overall_sentiment !== undefined && item.overall_sentiment !== null
            ? SENTIMENT[item.overall_sentiment]
            : undefined,
        topic:
          item.topic !== undefined && item.topic !== null
            ? typeof item.topic === 'string'
              ? item.topic
                  .split('|')
                  .map((d) => TOPIC[Number(d)])
                  .join('|')
              : TOPIC[item.topic]
            : undefined,
        target_gender:
          item.target_gender !== undefined && item.target_gender !== null
            ? item.target_gender === 4
              ? 'N/A'
              : GENDER[item.target_gender]
            : undefined,
        incitement_techniques:
          item.incitement_techniques !== undefined && item.incitement_techniques !== null
            ? TACTIC[item.incitement_techniques]
            : undefined,
        speech_intensity:
          item.speech_intensity !== undefined && item.speech_intensity !== null
            ? INTENSITY[item.speech_intensity]
            : undefined,
        target_affiliation:
          item.target_affiliation !== undefined && item.target_affiliation !== null
            ? AFFILIATION[item.target_affiliation]
            : undefined,
        core_event:
          analysisType === 'ai'
            ? undefined
            : lookupData.find((l) => l.id === item.core_event && l.column === 'core_event')?.name,
        harmful_keyword: (typeof item.harmful_keyword === 'string'
          ? item.harmful_keyword.split('|').map((d) => Number(d))
          : [item.harmful_keyword]
        )
          .map((d) => lookupData.find((l) => l.id === d && l.column === 'harmful_keyword')?.name)
          .filter((d) => d !== undefined),
        harmful_phrases: (typeof item.harmful_phrases === 'string'
          ? item.harmful_phrases.split('|').map((d) => Number(d))
          : [item.harmful_phrases]
        )
          .map((d) => lookupData.find((l) => l.id === d && l.column === 'harmful_phrases')?.name)
          .filter((d) => d !== undefined),
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return { formattedData, lookupData };
}
