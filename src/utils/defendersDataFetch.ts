import { fetchAndParseCSV } from '@undp/data-viz/fetchAndParseData';
import type { LookupItem, MessageItem } from '@/types';

export async function getCountryData(countryCode: string, analysisType: 'human' | 'ai') {
  const [messageData, lookupData] = await Promise.all([
    fetchAndParseCSV(
      `/data/defenders/messageData/${countryCode}/data-${analysisType}.csv`,
    ) as Promise<MessageItem[]>,
    fetchAndParseCSV(`/data/defenders/messageData/${countryCode}/lookup.csv`) as Promise<
      LookupItem[]
    >,
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
        no_of_followers: lookupData.find(
          (l) => l.id === item.no_of_followers && l.column === 'no_of_followers',
        )?.name,
        overall_sentiment: lookupData.find(
          (l) => l.id === item.overall_sentiment && l.column === 'overall_sentiment',
        )?.name,
        topic: lookupData.find((l) => l.id === item.topic && l.column === 'topic')?.name,
        target_gender: lookupData.find(
          (l) => l.id === item.target_gender && l.column === 'target_gender',
        )?.name,
        incitement_techniques: lookupData.find(
          (l) => l.id === item.incitement_techniques && l.column === 'incitement_techniques',
        )?.name,
        speech_intensity: lookupData.find(
          (l) => l.id === item.speech_intensity && l.column === 'speech_intensity',
        )?.name,
        target_affiliation: lookupData.find(
          (l) => l.id === item.target_affiliation && l.column === 'target_affiliation',
        )?.name,
        core_event: lookupData.find((l) => l.id === item.core_event && l.column === 'core_event')
          ?.name,
        harmful_keyword: lookupData.find(
          (l) => l.id === item.harmful_keyword && l.column === 'harmful_keyword',
        )?.name,
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return { formattedData, lookupData };
}
