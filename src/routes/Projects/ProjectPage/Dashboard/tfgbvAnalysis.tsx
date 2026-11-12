import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { CirclePackingGraph } from '@undp/data-viz/CirclePackingGraph';
import { Colors } from '@undp/data-viz/Colors';
import { DonutChart } from '@undp/data-viz/DonutChart';
import { SimpleLineChart } from '@undp/data-viz/SimpleLineChart';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { SegmentedControl } from '@undp/design-system-react/SegmentedControl';
import { Spacer } from '@undp/design-system-react/Spacer';
import { StatCardDescription } from '@undp/design-system-react/StatCard';
import { H5, H6, P } from '@undp/design-system-react/Typography';
import { useMemo, useState } from 'react';
import { AFFILIATION, GENDER, INTENSITY, TACTIC } from '@/constants';
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
  const [harmfulContentType, setHarmfulContentType] = useState<'words' | 'phrases'>('words');
  const [coreEventWordCloudHover, setCoreEventWordCloudHover] = useState<
    { word: string; frequency: number } | undefined
  >(undefined);
  const [harmfulKeywordWordCloudHover, setHarmfulKeywordWordCloudHover] = useState<
    { word: string; frequency: number } | undefined
  >(undefined);
  const [mouseXpos, setMouseXPos] = useState(0);
  const [mouseYpos, setMouseYPos] = useState(0);

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
          frequency: filteredData.filter((f) => f.harmful_keyword.includes(d.name)).length,
        };
      })
      .sort((a, b) => b.frequency - a.frequency);
  }, [filteredData, data]);

  const harmfulPhrasesWordCloudData = useMemo(() => {
    if (!filteredData || !data) return undefined;

    return data.lookupData
      .filter((d) => d.column === 'harmful_phrases')
      .map((d) => {
        return {
          word: d.name,
          frequency: filteredData.filter((f) => f.harmful_phrases.includes(d.name)).length,
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
                <H5 weight='bold' marginBottom='xs'>
                  {numberFormattingFunction(filteredData.length)}
                </H5>
                <StatCardDescription className='mb-0!'>Collected posts/tweets</StatCardDescription>
              </div>
              <Spacer size='xl' />
              <div className='flex grow flex-col justify-center bg-background p-6'>
                {analysisType === 'ai' ? (
                  <H5 weight='bold' marginBottom='xs'>
                    {numberFormattingFunction(filteredData.filter((d) => d.is_hate_speech).length)}
                  </H5>
                ) : (
                  <P className='text-content-secondary' size='base' marginBottom='xs'>
                    Not available for human verified data
                  </P>
                )}
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
                data={GENDER.map((d) => {
                  return {
                    label: d === 'N/A' ? 'N/A or Unclear' : d,
                    size: filteredData.filter((f) =>
                      d === 'N/A'
                        ? f.target_gender === d || !f.target_gender
                        : f.target_gender === d,
                    ).length,
                  };
                })}
                backgroundColor='var(--background)'
                graphTitle='Gender of the target of hate speech'
                animate={false}
                strokeWidth={50}
                colors={['#E2BC3B', '#776992', '#F4EEE7', '#FAFAFA']}
              />
            </div>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <div className='h-auto md:h-120'>
              <CirclePackingGraph
                data={AFFILIATION.map((d) => {
                  return {
                    label: d,
                    size: filteredData.filter((f) => f.target_affiliation === d).length,
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
                <H5 weight='bold' marginBottom='xs'>
                  {numberFormattingFunction(filteredData.filter((d) => d.is_target_wehrd).length)}
                </H5>
                <StatCardDescription className='mb-0!'>Unique WEHRD targets</StatCardDescription>
              </div>
              <Spacer size='xl' />
              <div className='flex grow flex-col justify-center bg-background p-6'>
                <H5 weight='bold' marginBottom='xs'>
                  {numberFormattingFunction(
                    filteredData.filter((d) => d.is_target_indigenous).length,
                  )}
                </H5>
                <StatCardDescription className='mb-0!'>
                  posts targeting indigenous women
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
          }}
        >
          <GridItem noOfColSpan={1}>
            <div className='h-auto md:h-120'>
              <SimpleBarGraph
                data={TACTIC.map((d) => {
                  return {
                    label: d,
                    size: filteredData.filter((f) => f.incitement_techniques === d).length,
                  };
                })}
                backgroundColor='var(--background)'
                graphTitle='Incitement tactics'
                animate={false}
                orientation='horizontal'
                showTicks={false}
                valueColor='var(--foreground)'
                colors='#A8071A'
                leftMargin={125}
                topMargin={0}
                bottomMargin={0}
                truncateBy={25}
              />
            </div>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <div className='h-auto bg-background p-4 md:h-120'>
              <div className='undp-scrollbar flex h-full flex-col'>
                <P size='lg'>Core events driving attacks</P>
                <div className='flex h-full flex-wrap items-center gap-x-4 gap-y-0'>
                  {analysisType === 'ai' ? (
                    <div className='flex h-full w-full items-center justify-center p-6 text-base text-content-tertiary'>
                      Only available for human analysis
                    </div>
                  ) : (
                    coreEventsWordCloudData.map((word) => (
                      // biome-ignore lint/a11y/noStaticElementInteractions: Here the div just have a mouse over effect
                      <div
                        key={word.word}
                        className='cursor-pointer'
                        style={{
                          ...getStyleFromFrequency(
                            word.frequency,
                            coreEventsWordCloudData[0].frequency,
                          ),
                          opacity: coreEventWordCloudHover
                            ? coreEventWordCloudHover.word === word.word
                              ? 1
                              : 0.4
                            : 1,
                        }}
                        onMouseEnter={(e) => {
                          setCoreEventWordCloudHover({
                            word: word.word,
                            frequency: word.frequency,
                          });
                          setMouseXPos(e.clientX);
                          setMouseYPos(e.clientY);
                        }}
                        onMouseMove={(e) => {
                          setCoreEventWordCloudHover({
                            word: word.word,
                            frequency: word.frequency,
                          });
                          setMouseXPos(e.clientX);
                          setMouseYPos(e.clientY);
                        }}
                        onMouseLeave={() => {
                          setCoreEventWordCloudHover(undefined);
                        }}
                      >
                        {word.word}
                      </div>
                    ))
                  )}
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
                <div className='mb-4 flex items-center justify-between gap-2 pr-2'>
                  <P size='xl' marginBottom='none'>
                    Harmful keywords/phrases
                  </P>
                  <SegmentedControl
                    options={[
                      { value: 'words', label: 'Keywords' },
                      { value: 'phrases', label: 'Phrases' },
                    ]}
                    onValueChange={(val) => setHarmfulContentType(val as 'words' | 'phrases')}
                    value={harmfulContentType}
                    variant='light'
                  />
                </div>
                <div className='flex flex-wrap items-center gap-4'>
                  {(harmfulContentType === 'words'
                    ? harmfulKeywordWordCloudData
                    : harmfulPhrasesWordCloudData
                  )?.map((word) => (
                    // biome-ignore lint/a11y/noStaticElementInteractions: Here the div just have a mouse over effect
                    <div
                      key={word.word}
                      className='cursor-pointer leading-[1]'
                      style={{
                        ...getStyleFromFrequency(
                          word.frequency,
                          (harmfulContentType === 'words'
                            ? harmfulKeywordWordCloudData
                            : harmfulPhrasesWordCloudData)?.[0].frequency || 0,
                        ),
                        opacity: harmfulKeywordWordCloudHover
                          ? harmfulKeywordWordCloudHover.word === word.word
                            ? 1
                            : 0.4
                          : 1,
                      }}
                      onMouseEnter={(e) => {
                        setHarmfulKeywordWordCloudHover({
                          word: word.word,
                          frequency: word.frequency,
                        });
                        setMouseXPos(e.clientX);
                        setMouseYPos(e.clientY);
                      }}
                      onMouseMove={(e) => {
                        setHarmfulKeywordWordCloudHover({
                          word: word.word,
                          frequency: word.frequency,
                        });
                        setMouseXPos(e.clientX);
                        setMouseYPos(e.clientY);
                      }}
                      onMouseLeave={() => {
                        setHarmfulKeywordWordCloudHover(undefined);
                      }}
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
                data={INTENSITY.filter((d) => d !== 'Other').map((d) => {
                  return {
                    label: d,
                    size: filteredData.filter((f) => f.speech_intensity === d).length,
                    color: d,
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
                colors={Colors.light.sequentialColors.neutralColorsx06}
                footNote='Less severe  →  More severe'
              />
            </div>
          </GridItem>
        </Grid>
      </section>
      <div
        className='graph-tooltip fixed z-1000 block bg-surface p-2'
        style={{
          top: `${mouseYpos < window.innerHeight / 2 ? mouseYpos - 10 : mouseYpos + 10}px`,
          left: `${mouseXpos > window.innerWidth / 2 ? mouseXpos - 10 : mouseXpos + 10}px`,
          transform: `translate(${
            mouseXpos > window.innerWidth / 2 ? '-100%' : '0%'
          },${mouseYpos > window.innerHeight / 2 ? '-100%' : '0%'})`,
        }}
      >
        <div className='m-0 text-content-primary text-xl leading-normal'>
          {(harmfulKeywordWordCloudHover || coreEventWordCloudHover)?.frequency}
        </div>
      </div>
      );
    </>
  );
}
