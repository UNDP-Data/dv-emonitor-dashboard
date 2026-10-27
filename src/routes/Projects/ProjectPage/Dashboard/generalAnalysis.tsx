import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { DonutChart } from '@undp/data-viz/DonutChart';
import { SimpleLineChart } from '@undp/data-viz/SimpleLineChart';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { Spacer } from '@undp/design-system-react/Spacer';
import { StatCardDescription, StatCardValue } from '@undp/design-system-react/StatCard';
import { H6 } from '@undp/design-system-react/Typography';

export function GeneralAnalysisDashboard() {
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
          Analysis of virality
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
                    label: '< 100 followers',
                    size: 3,
                  },
                  {
                    label: '100 - 1K followers',
                    size: 8,
                  },
                  {
                    label: '1K - 5K followers',
                    size: 11,
                  },
                  {
                    label: ' > 5K followers',
                    size: 19,
                  },
                ]}
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
                graphTitle='Event-related posts per month'
                showValues
                showDots
                animate={false}
                fillArea={false}
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
            lg: 3,
            xl: 4,
            sm: 1,
          }}
        >
          <GridItem noOfColSpan={1}>
            <div className='h-auto md:h-120'>
              <DonutChart
                data={[
                  {
                    label: 'Negative',
                    size: 3,
                  },
                  {
                    label: 'Positive',
                    size: 11,
                  },
                  {
                    label: 'Neutral',
                    size: 8,
                  },
                  {
                    label: 'Not available',
                    size: 19,
                  },
                ]}
                backgroundColor='var(--background)'
                graphTitle='Overall sentiment'
                animate={false}
                strokeWidth={50}
                colors={['#776992', '#E2BC3B', '#F4EEE7', '#FAFAFA']}
              />
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
              />
            </div>
          </GridItem>
        </Grid>
      </section>
    </>
  );
}
