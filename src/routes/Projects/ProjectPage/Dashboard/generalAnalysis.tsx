import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { DonutChart } from '@undp/data-viz/DonutChart';
import { SimpleLineChart } from '@undp/data-viz/SimpleLineChart';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { Spacer } from '@undp/design-system-react/Spacer';
import { StatCardDescription, StatCardValue } from '@undp/design-system-react/StatCard';
import { H5, H6 } from '@undp/design-system-react/Typography';
import { useMemo } from 'react';
import {
  useAnalysisType,
  useContainsHateSpeech,
  useFromDate,
  useIsTFGBV,
  useSelectedAffiliation,
  useSelectedCountry,
  useToDate,
} from './store/filters';
import { useCountryMessagesData } from './useCountryMessagesData';

export function GeneralAnalysisDashboard() {
  const selectedCountry = useSelectedCountry();
  const analysisType = useAnalysisType();
  const fromDate = useFromDate();
  const toDate = useToDate();
  const containsHateSpeech = useContainsHateSpeech();
  const isTFGBV = useIsTFGBV();
  const selectedAffiliation = useSelectedAffiliation();
  const { data, isLoading, isError } = useCountryMessagesData(selectedCountry.value, analysisType);

  const filteredData = useMemo(() => {
    if (!data) return undefined;
    const affiliationSet = new Set(selectedAffiliation.map((d) => d.value));
    const filterByAffiliation = affiliationSet.size > 0;

    return data.formattedData.filter(
      (item) =>
        (!fromDate || item.date >= fromDate) &&
        (!toDate || item.date <= toDate) &&
        (!containsHateSpeech || item.is_hate_speech) &&
        (!isTFGBV || item.is_tfgbv) &&
        (!filterByAffiliation ||
          (item.target_affiliation !== undefined && affiliationSet.has(item.target_affiliation))),
    );
  }, [data, fromDate, toDate, containsHateSpeech, isTFGBV, selectedAffiliation]);

  if (isError) {
    return <div className='flex h-120 items-center justify-center'>Error loading data</div>;
  }
  if (isLoading || !filteredData || !data) {
    return <div className='flex h-120 items-center justify-center'>Loading...</div>;
  }
  return (
    <>
      <section>
        <H6 marginBottom='none' className='text-content-secondary'>
          About the research sample
        </H6>
        <Spacer size='xl' />
        <Grid
          noOfCol={{
            base: 1,
            md: 2,
            lg: 3,
            xl: 4,
            sm: 1,
          }}
        >
          <GridItem noOfColSpan={1}>
            <div className='flex h-auto flex-col md:h-120'>
              <div className='flex grow flex-col justify-center bg-background p-6'>
                <StatCardValue>{numberFormattingFunction(filteredData.length)}</StatCardValue>
                <StatCardDescription className='mb-0!'>Collected posts/tweets</StatCardDescription>
              </div>
              <Spacer size='xl' />
              <div className='flex grow flex-col justify-center bg-background p-6'>
                <StatCardValue>
                  {numberFormattingFunction(filteredData.filter((d) => d.is_hate_speech).length)}
                </StatCardValue>
                <StatCardDescription className='mb-0!'>
                  Posts contain hate speech
                </StatCardDescription>
              </div>
            </div>
          </GridItem>
          <GridItem
            noOfColSpan={{
              base: 1,
              md: 1,
              lg: 2,
              xl: 3,
              sm: 1,
            }}
          >
            <div className='h-auto md:h-120'>
              <SimpleLineChart
                data={[...new Set(filteredData.map((d) => d.date_string))].map((el) => ({
                  date: el,
                  y: filteredData.filter((d) => d.date_string === el).length,
                }))}
                backgroundColor='var(--background)'
                graphTitle='Data collected over time'
                showValues={false}
                showDots={false}
                animate={false}
                fillArea={true}
                lineColor='#A9B7CB'
                dateFormat='yyyy-MM-dd'
              />
            </div>
          </GridItem>
        </Grid>
      </section>
      <Spacer size='4xl' />
      <section>
        <H6 marginBottom='none' className='text-content-secondary'>
          Analysis of virality
        </H6>
        <Spacer size='xl' />
        <Grid
          noOfCol={{
            base: 1,
            md: 3,
          }}
        >
          <GridItem noOfColSpan={1}>
            <div className='h-auto md:h-120'>
              <DonutChart
                data={data.lookupData
                  .filter((d) => d.column === 'no_of_followers')
                  .map((d) => {
                    return {
                      label: d.name,
                      size: filteredData.filter((f) => f?.no_of_followers === d.name).length,
                    };
                  })}
                backgroundColor='var(--background)'
                graphTitle='Virality potential of authors'
                animate={false}
                strokeWidth={50}
                colors={['#F4EEE7', '#E2BC3B', '#776992', '#006EB5']}
              />
            </div>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <div className='h-auto md:h-120'>
              <SimpleLineChart
                data={[
                  ...new Set(
                    filteredData.filter((d) => d.is_event_related).map((d) => d.month_year),
                  ),
                ].map((el) => ({
                  date: el,
                  y: filteredData.filter((d) => d.month_year === el).length,
                }))}
                backgroundColor='var(--background)'
                graphTitle='Event-related posts per month'
                showValues
                showDots
                animate={false}
                fillArea={false}
                dateFormat='M-yyyy'
                noOfXTicks={4}
              />
            </div>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <div className='flex h-auto flex-col md:h-120'>
              <div className='flex grow flex-col justify-center bg-background p-6'>
                <H5 weight='bold' marginBottom='xs'>
                  {numberFormattingFunction(new Set(filteredData.map((d) => d.author)).size)}
                </H5>
                <StatCardDescription className='mb-0!'>Unique authors</StatCardDescription>
              </div>
              <Spacer size='xl' />
              <div className='flex grow flex-col justify-center bg-background p-6'>
                <H5 weight='bold' marginBottom='xs'>
                  {numberFormattingFunction(
                    filteredData.reduce((acc, d) => acc + (d.total_engagement || 0), 0),
                  )}
                </H5>
                <StatCardDescription className='mb-0!'>Total engagement</StatCardDescription>
              </div>
              <Spacer size='xl' />
              <div className='flex grow flex-col justify-center bg-background p-6'>
                <H5 weight='bold' marginBottom='xs'>
                  {numberFormattingFunction(filteredData.filter((f) => f.is_event_related).length)}
                </H5>
                <StatCardDescription className='mb-0!'>
                  Posts related to real-life events
                </StatCardDescription>
              </div>
            </div>
          </GridItem>
        </Grid>
      </section>
      <Spacer size='4xl' />
      <section>
        <H6 marginBottom='none' className='text-content-secondary'>
          Analysis of contents
        </H6>
        <Spacer size='xl' />
        <Grid
          noOfCol={{
            base: 1,
            md: 2,
            lg: 3,
            sm: 1,
          }}
        >
          <GridItem noOfColSpan={1}>
            <div className='h-auto md:h-120'>
              <DonutChart
                data={data.lookupData
                  .filter((d) => d.column === 'overall_sentiment')
                  .map((d) => {
                    return {
                      label: d.name,
                      size: filteredData.filter((f) => f.overall_sentiment === d.name).length,
                    };
                  })}
                backgroundColor='var(--background)'
                graphTitle='Overall sentiment'
                animate={false}
                strokeWidth={50}
                colors={['#776992', '#E2BC3B', '#F4EEE7']}
              />
            </div>
          </GridItem>
          <GridItem
            noOfColSpan={{
              base: 1,
              md: 1,
              lg: 2,
              sm: 1,
            }}
          >
            <div className='h-auto md:h-120'>
              <SimpleBarGraph
                data={data.lookupData
                  .filter((d) => d.column === 'topic')
                  .map((d) => {
                    return {
                      label: d.name,
                      size: filteredData.filter((f) => f.topic === d.name).length,
                    };
                  })}
                backgroundColor='var(--background)'
                graphTitle='Most common topics'
                animate={false}
                orientation='horizontal'
                showTicks={false}
                valueColor='var(--foreground)'
              />
            </div>
          </GridItem>
        </Grid>
      </section>
    </>
  );
}
