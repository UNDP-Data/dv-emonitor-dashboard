import { useQuery } from '@tanstack/react-query';
import { getCountryData } from '@/utils/defendersDataFetch';

export function useCountryMessagesData(countryCode: string, analysisType: 'human' | 'ai') {
  return useQuery({
    queryKey: ['country-messages-data', countryCode, analysisType],
    queryFn: () => getCountryData(countryCode, analysisType),
  });
}
