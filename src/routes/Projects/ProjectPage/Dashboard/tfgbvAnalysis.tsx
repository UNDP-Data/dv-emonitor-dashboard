import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { CirclePackingGraph } from '@undp/data-viz/CirclePackingGraph';
import { Colors } from '@undp/data-viz/Colors';
import { DonutChart } from '@undp/data-viz/DonutChart';
import { SimpleLineChart } from '@undp/data-viz/SimpleLineChart';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { Spacer } from '@undp/design-system-react/Spacer';
import { StatCardDescription, StatCardValue } from '@undp/design-system-react/StatCard';
import { H6, P } from '@undp/design-system-react/Typography';
import { useMemo } from 'react';
import {
  useAnalysisType,
  useContainsHateSpeech,
  useFromDate,
  useSelectedAffiliation,
  useSelectedCountry,
  useToDate,
} from './store/filters';
import { useCountryMessagesData } from './useCountryMessagesData';

const getStyleFromFrequency = (frequency: number, maxFrequency: number) => {
  const fontSize = (frequency / maxFrequency) * 36 + 10;
  const opacity = Math.min((frequency / maxFrequency) * 0.7 + 0.4, 1);
  return {
    fontSize,
    opacity,
  };
};

export function TFGBVAnalysisDashboard() {
  const selectedCountry = useSelectedCountry();
  const analysisType = useAnalysisType();
  const fromDate = useFromDate();
  const toDate = useToDate();
  const containsHateSpeech = useContainsHateSpeech();
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
        item.is_tfgbv &&
        (!filterByAffiliation ||
          (item.target_affiliation !== undefined && affiliationSet.has(item.target_affiliation))),
    );
  }, [data, fromDate, toDate, containsHateSpeech, selectedAffiliation]);

  const coreEventsWordCloudData = useMemo(() => {
    if (!filteredData || !data) return undefined;

    return data.lookupData
      .filter((d) => d.column === 'core_event')
      .map((d) => {
        return {
          word: d.name,
          frequency: filteredData.filter((f) => f.core_event === d.name).length,
        };
      })
      .sort((a, b) => b.frequency - a.frequency);
  }, [filteredData, data]);

  const harmfulKeywordWordCloudData = useMemo(() => {
    if (!filteredData || !data) return undefined;

    return data.lookupData
      .filter((d) => d.column === 'harmful_keyword')
      .map((d) => {
        return {
          word: d.name,
          frequency: filteredData.filter((f) => f.harmful_keyword === d.name).length,
        };
      })
      .sort((a, b) => b.frequency - a.frequency);
  }, [filteredData, data]);

  if (isError) {
    return <div className='flex h-120 items-center justify-center'>Error loading data</div>;
  }
  if (
    isLoading ||
    !filteredData ||
    !data ||
    !coreEventsWordCloudData ||
    !harmfulKeywordWordCloudData
  ) {
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
                <StatCardDescription>Collected posts/tweets</StatCardDescription>
              </div>
              <Spacer size='xl' />
              <div className='flex grow flex-col justify-center bg-background p-6'>
                <StatCardValue>
                  {numberFormattingFunction(filteredData.filter((d) => d.is_hate_speech).length)}
                </StatCardValue>
                <StatCardDescription>Posts contain hate speech</StatCardDescription>
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
          Characterizing victims
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
                  .filter((d) => d.column === 'target_gender')
                  .map((d) => {
                    return {
                      label: d.name,
                      size: filteredData.filter((f) => f.target_gender === d.name).length,
                    };
                  })}
                backgroundColor='var(--background)'
                graphTitle='Gender of the target of hate speech'
                animate={false}
                strokeWidth={50}
                colors={['#E2BC3B', '#776992', '#F4EEE7']}
              />
            </div>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <div className='h-auto md:h-120'>
              <CirclePackingGraph
                data={data.lookupData
                  .filter((d) => d.column === 'target_affiliation')
                  .map((d) => {
                    return {
                      label: d.name,
                      size: filteredData.filter((f) => f.target_affiliation === d.name).length,
                    };
                  })}
                backgroundColor='var(--background)'
                graphTitle='Target Affiliation'
              />
            </div>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <div className='flex h-auto flex-col md:h-120'>
              <div className='flex grow flex-col justify-center bg-background p-6'>
                <StatCardValue>
                  {numberFormattingFunction(filteredData.filter((d) => d.is_target_wehrd).length)}
                </StatCardValue>
                <StatCardDescription>Unique WEHRD targets</StatCardDescription>
              </div>
              <Spacer size='xl' />
              <div className='flex grow flex-col justify-center bg-background p-6'>
                <StatCardValue>
                  {numberFormattingFunction(
                    filteredData.filter((d) => d.is_target_indigenous).length,
                  )}
                </StatCardValue>
                <StatCardDescription>posts targeting indigenous women</StatCardDescription>
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
          }}
        >
          <GridItem noOfColSpan={1}>
            <div className='h-auto md:h-120'>
              <SimpleBarGraph
                data={data.lookupData
                  .filter((d) => d.column === 'incitement_techniques')
                  .map((d) => {
                    return {
                      label: d.name,
                      size: filteredData.filter((f) => f.incitement_techniques === d.name).length,
                    };
                  })}
                backgroundColor='var(--background)'
                graphTitle='Incitement tactics'
                animate={false}
                orientation='horizontal'
                showTicks={false}
                valueColor='var(--foreground)'
                colors='#A8071A'
              />
            </div>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <div className='h-auto bg-background p-4 md:h-120'>
              <div className='undp-scrollbar flex h-full flex-col'>
                <P size='lg'>Core events driving attacks</P>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-0'>
                  {coreEventsWordCloudData.map((word) => (
                    <div
                      key={word.word}
                      style={getStyleFromFrequency(
                        word.frequency,
                        coreEventsWordCloudData[0].frequency,
                      )}
                    >
                      {word.word}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GridItem>
        </Grid>
        <Spacer size='xl' />
        <Grid
          noOfCol={{
            base: 1,
            md: 2,
          }}
        >
          <GridItem noOfColSpan={1}>
            <div className='h-auto bg-background p-4 md:h-120'>
              <div className='undp-scrollbar flex h-full flex-col'>
                <P size='xl'>Core events driving attacks</P>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-0'>
                  {harmfulKeywordWordCloudData.map((word) => (
                    <div
                      key={word.word}
                      style={getStyleFromFrequency(
                        word.frequency,
                        harmfulKeywordWordCloudData[0].frequency,
                      )}
                    >
                      {word.word}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <div className='h-auto md:h-120'>
              <SimpleBarGraph
                data={data.lookupData
                  .filter((d) => d.column === 'speech_intensity')
                  .map((d) => {
                    return {
                      label: d.name,
                      size: filteredData.filter((f) => f.speech_intensity === d.name).length,
                      color: d.name,
                    };
                  })}
                backgroundColor='var(--background)'
                graphTitle='Intensity of hate speech'
                animate={false}
                orientation='vertical'
                showTicks={false}
                valueColor='var(--foreground)'
                showColorScale={false}
                bottomMargin={50}
                colors={Colors.light.sequentialColors.neutralColorsx05}
                footNote='Less severe  →  More severe'
              />
            </div>
          </GridItem>
        </Grid>
      </section>
    </>
  );
}
