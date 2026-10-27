import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { CirclePackingGraph } from '@undp/data-viz/CirclePackingGraph';
import { Colors } from '@undp/data-viz/Colors';
import { DonutChart } from '@undp/data-viz/DonutChart';
import { SimpleLineChart } from '@undp/data-viz/SimpleLineChart';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { Spacer } from '@undp/design-system-react/Spacer';
import { StatCardDescription, StatCardValue } from '@undp/design-system-react/StatCard';
import { H6, P } from '@undp/design-system-react/Typography';

const WORD_CLOUD_DUMMY = [
  {
    event: 'Election Debate',
    frequency: 437,
  },
  {
    event: 'Campaign Rally',
    frequency: 214,
  },
  {
    event: 'Policy Announcement',
    frequency: 171,
  },
  {
    event: 'Public Demonstration',
    frequency: 136,
  },
  {
    event: 'Community Meeting',
    frequency: 134,
  },
  {
    event: 'Town Hall',
    frequency: 115,
  },
  {
    event: 'Press Conference',
    frequency: 109,
  },
  {
    event: 'Candidate Speech',
    frequency: 78,
  },
  {
    event: 'Protest March',
    frequency: 77,
  },
  {
    event: 'Neighbourhood Watch',
    frequency: 65,
  },
  {
    event: 'Civic Forum',
    frequency: 64,
  },
  {
    event: 'Ballot Initiative',
    frequency: 63,
  },
  {
    event: 'Online Forum Post',
    frequency: 57,
  },
  {
    event: 'Solidarity Rally',
    frequency: 53,
  },
  {
    event: 'Legislative Hearing',
    frequency: 52,
  },
  {
    event: 'Media Briefing',
    frequency: 52,
  },
  {
    event: 'Street Canvass',
    frequency: 50,
  },
  {
    event: 'Social Media Thread',
    frequency: 49,
  },
  {
    event: 'Cultural Festival',
    frequency: 46,
  },
  {
    event: 'School Board Meeting',
    frequency: 45,
  },
  {
    event: 'Community Outreach',
    frequency: 43,
  },
  {
    event: 'Opinion Article',
    frequency: 42,
  },
  {
    event: 'Interfaith Dialogue',
    frequency: 38,
  },
  {
    event: 'Voter Registration Drive',
    frequency: 37,
  },
  {
    event: 'Radio Interview',
    frequency: 37,
  },
  {
    event: 'Podcast Broadcast',
    frequency: 34,
  },
  {
    event: 'Live Stream Event',
    frequency: 34,
  },
  {
    event: 'Memorial Vigil',
    frequency: 34,
  },
  {
    event: 'Fundraiser Gala',
    frequency: 34,
  },
  {
    event: 'Grassroots Petition',
    frequency: 33,
  },
  {
    event: 'Awareness Walk',
    frequency: 33,
  },
  {
    event: 'Panel Discussion',
    frequency: 31,
  },
  {
    event: 'Roundtable Session',
    frequency: 30,
  },
  {
    event: 'Open Letter',
    frequency: 30,
  },
  {
    event: 'Charity Drive',
    frequency: 28,
  },
];

const getStyleFromFrequency = (frequency: number, maxFrequency: number) => {
  const fontSize = (frequency / maxFrequency) * 64 + 8;
  const opacity = Math.min((frequency / maxFrequency) * 0.7 + 0.4, 1);
  return {
    fontSize,
    opacity,
  };
};

export function TFGBVAnalysisDashboard() {
  return (
    <>
      <section>
        <H6 marginBottom='none' className='text-content-secondary'>
          About the research sample
        </H6>
        <Spacer size='xl' />
        <Grid
          gap='32px'
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
                <StatCardValue>52</StatCardValue>
                <StatCardDescription>Defenders</StatCardDescription>
              </div>
              <Spacer size='xl' />
              <div className='flex grow flex-col justify-center bg-background p-6'>
                <StatCardValue>52</StatCardValue>
                <StatCardDescription>Defenders</StatCardDescription>
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
                data={[
                  {
                    date: '2020',
                    y: 3,
                  },
                  {
                    date: '2021',
                    y: 8,
                  },
                  {
                    date: '2022',
                    y: 11,
                  },
                  {
                    date: '2023',
                    y: 19,
                  },
                  {
                    date: '2024',
                    y: 3,
                  },
                  {
                    date: '2025',
                    y: 8,
                  },
                  {
                    date: '2026',
                    y: 11,
                  },
                  {
                    date: '2027',
                    y: 19,
                  },
                ]}
                backgroundColor='var(--background)'
                graphTitle='Data collected over time'
                showValues={false}
                showDots={false}
                animate={false}
                fillArea={true}
                lineColor='#A9B7CB'
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
          gap='32px'
          noOfCol={{
            base: 1,
            md: 3,
          }}
        >
          <GridItem noOfColSpan={1}>
            <div className='h-auto md:h-120'>
              <DonutChart
                data={[
                  {
                    label: 'Women',
                    size: 3,
                  },
                  {
                    label: 'Men',
                    size: 11,
                  },
                  {
                    label: 'Other/Unspecified',
                    size: 19,
                  },
                ]}
                backgroundColor='var(--background)'
                graphTitle='Gender of the target of hate speech'
                animate={false}
                strokeWidth={50}
                colors={['#E2BC3B', '#776992', '#006EB5']}
              />
            </div>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <div className='h-auto md:h-120'>
              <CirclePackingGraph
                data={[
                  {
                    label: '2010',
                    size: 3,
                  },
                  {
                    label: '2012',
                    size: 8,
                  },
                  {
                    label: '2014',
                    size: 11,
                  },
                  {
                    label: '2016',
                    size: 19,
                  },
                  {
                    label: '2018',
                    size: 3,
                  },
                  {
                    label: '2020',
                    size: 8,
                  },
                  {
                    label: '2022',
                    size: 11,
                  },
                  {
                    label: '2024',
                    size: 19,
                  },
                ]}
                backgroundColor='var(--background)'
                graphTitle='Target Affiliation'
              />
            </div>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <div className='flex h-auto flex-col md:h-120'>
              <div className='flex grow flex-col justify-center bg-background p-6'>
                <StatCardValue>52</StatCardValue>
                <StatCardDescription>Defenders</StatCardDescription>
              </div>
              <Spacer size='xl' />
              <div className='flex grow flex-col justify-center bg-background p-6'>
                <StatCardValue>52</StatCardValue>
                <StatCardDescription>Defenders</StatCardDescription>
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
          gap='32px'
          noOfCol={{
            base: 1,
            md: 2,
          }}
        >
          <GridItem noOfColSpan={1}>
            <div className='h-auto md:h-120'>
              <SimpleBarGraph
                data={[
                  {
                    label: '2020 Q1',
                    size: 3,
                  },
                  {
                    label: '2020 Q2',
                    size: 8,
                  },
                  {
                    label: '2020 Q3',
                    size: 11,
                  },
                  {
                    label: '2020 Q4',
                    size: 19,
                  },
                  {
                    label: '2021 Q1',
                    size: 3,
                  },
                  {
                    label: '2022 Q2',
                    size: 8,
                  },
                  {
                    label: '2023 Q3',
                    size: 11,
                  },
                  {
                    label: '2024 Q4',
                    size: 19,
                  },
                ]}
                backgroundColor='var(--background)'
                graphTitle='Most common topics'
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
                <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
                  {WORD_CLOUD_DUMMY.map((word) => (
                    <div
                      key={word.event}
                      style={getStyleFromFrequency(
                        word.frequency,
                        Math.max(...WORD_CLOUD_DUMMY.map((d) => d.frequency)),
                      )}
                    >
                      {word.event}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GridItem>
        </Grid>
        <Spacer size='xl' />
        <Grid
          gap='32px'
          noOfCol={{
            base: 1,
            md: 2,
          }}
        >
          <GridItem noOfColSpan={1}>
            <div className='h-auto bg-background p-4 md:h-120'>
              <div className='undp-scrollbar flex h-full flex-col'>
                <P size='xl'>Core events driving attacks</P>
                <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
                  {WORD_CLOUD_DUMMY.map((word) => (
                    <div
                      key={word.event}
                      style={getStyleFromFrequency(
                        word.frequency,
                        Math.max(...WORD_CLOUD_DUMMY.map((d) => d.frequency)),
                      )}
                    >
                      {word.event}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <div className='h-auto md:h-120'>
              <SimpleBarGraph
                data={[
                  {
                    label: 'Offensive language',
                    color: 'Offensive language',
                    size: 3,
                  },
                  {
                    label: 'Stereotyping',
                    color: 'Stereotyping',
                    size: 8,
                  },
                  {
                    label: 'Dehumanising',
                    color: 'Dehumanising',
                    size: 11,
                  },
                  {
                    label: 'Incitement',
                    color: 'Incitement',
                    size: 19,
                  },
                  {
                    label: 'Explicit threat',
                    color: 'Explicit threat',
                    size: 3,
                  },
                ]}
                backgroundColor='var(--background)'
                graphTitle='Intensity of hate speech'
                animate={false}
                orientation='vertical'
                showTicks={false}
                valueColor='var(--foreground)'
                showColorScale={false}
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
