import { useQuery } from '@tanstack/react-query';
import { createLazyRoute } from '@tanstack/react-router';
import { SimpleBarGraph, StackedBarGraph } from '@undp/data-viz/BarGraph';
import { fetchAndParseCSV } from '@undp/data-viz/fetchAndParseData';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@undp/design-system-react/Accordion';
import { Badge } from '@undp/design-system-react/Badge';
import {
  Banner,
  BannerBody,
  BannerBodyContent,
  BannerBodySidebar,
} from '@undp/design-system-react/Banner';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@undp/design-system-react/Breadcrumb';
import { Button } from '@undp/design-system-react/Button';
import { DropdownSelect } from '@undp/design-system-react/DropdownSelect';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { PageHeader, PageHeaderContent } from '@undp/design-system-react/PageHeader';
import {
  ResourceCard,
  ResourceCardContent,
  ResourceCardDescription,
  ResourceCardFooter,
  ResourceCardImage,
  ResourceCardTitle,
} from '@undp/design-system-react/ResourceCard';
import { SegmentedControl } from '@undp/design-system-react/SegmentedControl';
import { Separator } from '@undp/design-system-react/Separator';
import { Spacer } from '@undp/design-system-react/Spacer';
import { Spinner } from '@undp/design-system-react/Spinner';
import { StatCard, StatCardDescription, StatCardValue } from '@undp/design-system-react/StatCard';
import { Switch } from '@undp/design-system-react/Switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@undp/design-system-react/Tabs';
import { H1, H2, H3, H4, H5, P } from '@undp/design-system-react/Typography';
import { VizCarousel } from '@undp/design-system-react/VizCarousel';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFENDER_COUNTRIES } from '@/constants';
import type { DefenderCountriesDataRow } from '@/types';

function useCountryData() {
  return useQuery({
    queryKey: ['satisfaction-public-services-16-6-2'],
    queryFn: () =>
      fetchAndParseCSV('/data/defenders/data.csv') as Promise<DefenderCountriesDataRow[]>,
  });
}
function useTargetAffiliationData() {
  return useQuery({
    queryKey: ['targetAffiliation'],
    queryFn: () =>
      fetchAndParseCSV('/data/defenders/targetAffiliation.csv') as Promise<
        DefenderCountriesDataRow[]
      >,
  });
}
export function ProjectsPage() {
  const {
    data: countryData,
    isLoading: isCountryDataLoading,
    isError: isCountryDataError,
  } = useCountryData();
  const {
    data: targetAffiliationData,
    isLoading: isTargetAffiliationDataLoading,
    isError: isTargetAffiliationDataError,
  } = useTargetAffiliationData();
  const { t } = useTranslation();
  const [TFGBVTab, setTFGBVTab] = useState<'human_validated' | 'ai_assisted'>('human_validated');
  const [showContent, setShowContent] = useState(false);
  const resourceCards = t('resourceCards', { returnObjects: true }) as {
    title: string;
    text: string;
    image: string;
    url: string;
  }[];
  return (
    <div className='w-full antialiased'>
      <PageHeader
        className='h-auto px-0 sm:px-2 md:h-[calc(100vh-115px)]'
        backgroundImage='/imgs/header_img.webp'
        contentMode='light'
        variant='secondary'
      >
        <PageHeaderContent>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='/projects'>Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>UNDP Defenders project</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <H5>{t('pageTitleSub')}</H5>
          <H1 size='sm'>Women’s leadership for a just, healthy planet</H1>
          <H5>
            Supporting influence & safety of Women Environment Human Rights Defender and Civil
            Society Organisations
          </H5>
        </PageHeaderContent>
      </PageHeader>
      <section id='about'>
        <Banner
          backgroundColor='secondary'
          bodyGap='base'
          bodyMaxWidth='full'
          padding='none'
          sidebarWidth='base'
          className='px-4 py-16 sm:px-12 sm:py-24 lg:px-32 lg:py-60'
        >
          <BannerBody>
            <BannerBodySidebar>
              <H2>{t('aboutTitle')}</H2>
            </BannerBodySidebar>
            <BannerBodyContent>
              <H4>
                Technology-facilitated gender-based violence (TFGBV) is a governance and human
                rights issue requiring coordinated national and global responses. Across the five
                project countries — Indonesia, Iraq, Kenya, the Philippines and Uganda — UNDP’s
                eMonitor+ reveals that TFGBV is systemic, targeted and increasing. This page shows
                how UNDP transforms data into evidence for protection, accountability and policy
                reform.
              </H4>
              <div className='flex flex-wrap gap-4'>
                {DEFENDER_COUNTRIES.map((country) => (
                  <Badge key={country.id} variant='outline' color='background' className='px-5'>
                    {country.name}
                  </Badge>
                ))}
              </div>
            </BannerBodyContent>
          </BannerBody>
        </Banner>
      </section>
      <Spacer size='8xl' />
      <section id='stats' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <H5>Overview</H5>
        <H3>TFGBV is widespread and viral — and women environment defenders are widely targeted</H3>
        <P>
          TFGBV generates high levels of engagement and mobilises large numbers of unique users.
          Combining AI-assisted detection with human vetting, UNDP built an evidence base that
          country teams now use for advocacy.
        </P>
        <Grid gap='24px' noOfCol={{ base: 1, md: 3, lg: 4, xl: 5 }}>
          <GridItem noOfColSpan={1}>
            <div className='flex flex-col gap-4'>
              <StatCard hoverColor='yellow'>
                <StatCardValue>255K</StatCardValue>
                <StatCardDescription>
                  <strong>Social media posts analysed</strong> across five countries, coming from
                  close to 80,000 unique authors.
                </StatCardDescription>
              </StatCard>
              <StatCard hoverColor='yellow'>
                <StatCardValue>40%</StatCardValue>
                <StatCardDescription>
                  <strong>Contained some level of violence</strong> as identified with AI models
                  prompted by UNDP.
                </StatCardDescription>
              </StatCard>
              <StatCard hoverColor='yellow'>
                <StatCardValue>4.5K</StatCardValue>
                <StatCardDescription>
                  <strong>Incidents of violence against women</strong> environment defenders, vetted
                  and reported by trained monitors.
                </StatCardDescription>
              </StatCard>
            </div>
          </GridItem>
          <GridItem noOfColSpan={{ base: 1, md: 2, lg: 3, xl: 4 }}>
            <div className='flex h-full w-full flex-col gap-4 bg-surface p-6'>
              <div className='flex items-center justify-between gap-4'>
                <P weight='bold' marginBottom='none'>
                  TFGBV cases, by country
                </P>
                <SegmentedControl
                  color='secondary'
                  defaultValue='human_validated'
                  classNames={{
                    control: 'bg-surface-hard',
                  }}
                  onValueChange={(d) => setTFGBVTab(d as 'human_validated' | 'ai_assisted')}
                  options={[
                    {
                      label: 'Human validated',
                      value: 'human_validated',
                    },
                    {
                      label: 'AI-assisted',
                      value: 'ai_assisted',
                    },
                  ]}
                  rounded='base'
                  size='base'
                  variant='light'
                />
              </div>
              <div className='grow'>
                {isCountryDataError ? (
                  <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
                    <P className='text-error'>Error loading country data</P>
                  </div>
                ) : isCountryDataLoading || !countryData ? (
                  <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
                    <Spinner />
                  </div>
                ) : (
                  <SimpleBarGraph
                    data={transformDataForGraph(countryData ?? [], 'barChart', [
                      { columnId: 'isocode', chartConfigId: 'label' },
                      {
                        columnId:
                          TFGBVTab === 'ai_assisted'
                            ? 'tfgbv_posts_ai_assisted'
                            : 'tfgbv_posts_human_validated',
                        chartConfigId: 'size',
                      },
                    ])}
                    orientation='vertical'
                  />
                )}
              </div>
              <div>
                <P size='sm' weight='bold' className='uppercase'>
                  {TFGBVTab === 'human_validated'
                    ? 'How human vetting works'
                    : 'About ai-assisted detection'}
                </P>
                <P size='sm'>
                  {TFGBVTab === 'human_validated'
                    ? 'Manual verification uses a standardised method for sub-sampling content, so the most relevant cases can be identified and studied qualitatively. It builds on the EU Foreign Information Manipulation and Interference methodology, expanded for this project. Vetted cases are also used to retrain the AI models.'
                    : 'AIassisted detection uses machine-learning models to screen posts in real time, prioritising posts that are more likely to contain harmful content for human analysts. The system combines keyword-based identification with contextual understanding, allowing it to detect both explicit and coded language. AI-assisted detection is continuously refined through feedback loops that use human-validated results to improve the accuracy of the models.'}
                </P>
              </div>
            </div>
          </GridItem>
        </Grid>
      </section>
      <Spacer size='8xl' />
      <section id='key-findings' className='mx-auto w-full bg-surface px-4 sm:px-6 lg:px-8'>
        <Spacer size='8xl' />
        <div className='mx-auto w-full max-w-[1920px]'>
          <H5>Key findings</H5>
          <H3 marginBottom='none'>
            TFGBV against women environmental defenders is often targeted and tends to intensify
            when during moments of high public visibility
          </H3>
          <Spacer size='2xl' />
          <Accordion type='single' variant='secondary' collapsible defaultValue='item-1'>
            <AccordionItem value='item-1' className='bg-background'>
              <AccordionTrigger className='text-[1.25rem] normal-case'>
                Why attacks happen
              </AccordionTrigger>
              <AccordionContent>
                <Grid noOfCol={{ base: 1, md: 2 }}>
                  <GridItem noOfColSpan={1}>
                    <div className='flex flex-col'>
                      <P size='xl' weight='semibold' className='text-secondary' marginBottom='none'>
                        There is strong evidence suggesting the use of TFGBV as a mechanism to push
                        women environment defenders towards self-censorship and to discredit their
                        work.
                      </P>
                      <Spacer size='2xl' />
                      <P marginBottom='none'>
                        About{' '}
                        <span className='font-bold text-secondary'>
                          40% of all attacks vetted by human monitors were produced as a reaction to
                          specific events
                        </span>
                        : an ongoing policy debate, a right defenders' participation in public fora,
                        amongst others.
                      </P>
                      <Spacer size='2xl' />
                      <Separator color='surface-sm' />
                      <Spacer size='2xl' />
                      <P marginBottom='none'>
                        These findings align with wider evidence showing that{' '}
                        <span className='font-bold text-secondary'>
                          92% of environmental defenders experience online abuse
                        </span>
                        , with women defenders often facing gendered, sexualized and identity-based
                        attacks that seek to silence their participation and advocacy.
                      </P>
                    </div>
                  </GridItem>
                  <GridItem noOfColSpan={1}>
                    <div className='flex h-full min-h-95 flex-col bg-surface p-6'>
                      <div className='flex w-full items-center justify-between gap-4'>
                        <P weight='bold' size='base' className='text-contet-secondary'>
                          Examples of attacks
                        </P>
                        <div className='flex items-center gap-2'>
                          <P size='sm' marginBottom='none'>
                            Show content
                          </P>
                          <Switch
                            size='small'
                            color='secondary'
                            onCheckedChange={(d) => {
                              setShowContent(d);
                            }}
                            checked={showContent}
                          />
                        </div>
                      </div>
                      <div className='flex grow items-center justify-center'>
                        <P
                          className='mx-auto w-full max-w-75 text-center text-content-tertiary'
                          size='sm'
                        >
                          <strong>Sensitive content hidden</strong>
                          <br />
                          This section may contain offensive language. Switch the toggle to view the
                          content.
                        </P>
                      </div>
                    </div>
                  </GridItem>
                </Grid>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2' className='bg-background'>
              <AccordionTrigger className='text-[1.25rem] normal-case'>
                How attacks are amplified
              </AccordionTrigger>
              <AccordionContent>
                <Grid noOfCol={{ base: 1, md: 2 }}>
                  <GridItem noOfColSpan={1}>
                    <div className='flex flex-col'>
                      <P size='xl' weight='semibold' className='text-secondary' marginBottom='none'>
                        TFGBV is enhanced through coordinated strategies of inorganic content
                        production, distribution, and engagement.
                      </P>
                      <Spacer size='2xl' />
                      <P marginBottom='none'>
                        <span className='font-bold text-secondary'>
                          About one in three of the violent attacks vetted by human monitors had
                          strong indications of being produced or enhanced through inorganic
                          behavior,
                        </span>{' '}
                        which refers to artificial, automated, or paid activity that pushes
                        engagement into more polarizing and/or violent narratives or content.
                      </P>
                      <Spacer size='2xl' />
                      <Separator color='surface-sm' />
                      <Spacer size='2xl' />
                      <P marginBottom='none'>
                        The identification of these strategies widely varies across countries, with
                        Iraq being the one where most of these cases were vetted by human monitors.
                      </P>
                    </div>
                  </GridItem>
                  <GridItem noOfColSpan={1}>
                    <div className='flex h-full min-h-95 flex-col bg-surface p-6'>
                      {isCountryDataError ? (
                        <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
                          <P className='text-error'>Error loading country data</P>
                        </div>
                      ) : isCountryDataLoading || !countryData ? (
                        <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
                          <Spinner />
                        </div>
                      ) : (
                        <StackedBarGraph
                          data={transformDataForGraph(countryData ?? [], 'stackedBarChart', [
                            { columnId: 'isocode', chartConfigId: 'label' },
                            {
                              columnId: ['behavior_inorganic', 'behavior_organic'],
                              chartConfigId: 'size',
                            },
                          ])}
                          colorDomain={['Inorganic', 'Organic']}
                          maxValue={100}
                          showValues
                          showTicks={false}
                          topMargin={0}
                          bottomMargin={0}
                          graphTitle='Behavior breakdown'
                          showTotalValue={false}
                          colors={['var(--blue-600)', 'var(--azure-600)']}
                          orientation='horizontal'
                        />
                      )}
                    </div>
                  </GridItem>
                </Grid>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3' className='bg-background'>
              <AccordionTrigger className='text-[1.25rem] normal-case'>
                Who is targeted
              </AccordionTrigger>
              <AccordionContent>
                <Grid noOfCol={{ base: 1, md: 2 }}>
                  <GridItem noOfColSpan={1}>
                    <div className='flex flex-col'>
                      <P size='xl' weight='semibold' className='text-secondary' marginBottom='none'>
                        TFGBV is used to discredit established women environment defenders and
                        intimidate newer voices, making advocacy harder to sustain.
                      </P>
                      <Spacer size='2xl' />
                      <P marginBottom='none'>
                        <span className='font-bold text-secondary'>
                          62% of violent attacks vetted by human monitors targeted women with
                          established leadership roles,
                        </span>{' '}
                        including CSO representatives, politicians, journalists, religious figures
                        and women environment human rights defenders.
                      </P>
                      <Spacer size='2xl' />
                      <Separator color='surface-sm' />
                      <Spacer size='2xl' />
                      <P marginBottom='none'>
                        <span className='font-bold text-secondary'>
                          The remaining 38% targeted lesser-known voices or activism itself.
                        </span>{' '}
                        These emerging leaders may be less equipped to respond to TFGBV, increasing
                        their vulnerability and potentially limiting their future advocacy.
                      </P>
                    </div>
                  </GridItem>
                  <GridItem noOfColSpan={1}>
                    <div className='flex h-full min-h-95 flex-col bg-surface p-6'>
                      {isTargetAffiliationDataError ? (
                        <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
                          <P className='text-error'>Error loading target affiliation data</P>
                        </div>
                      ) : isTargetAffiliationDataLoading || !targetAffiliationData ? (
                        <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
                          <Spinner />
                        </div>
                      ) : (
                        <SimpleBarGraph
                          data={transformDataForGraph(targetAffiliationData ?? [], 'barChart', [
                            { columnId: 'targets', chartConfigId: 'label' },
                            { columnId: 'value', chartConfigId: 'size' },
                          ])}
                          showValues
                          topMargin={0}
                          bottomMargin={0}
                          graphTitle='Target Affiliation'
                          orientation='horizontal'
                        />
                      )}
                    </div>
                  </GridItem>
                </Grid>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Spacer size='2xl' />
          <H4 marginBottom='none'>
            This analysis points to the need to{' '}
            <strong>prioritise protection for high risk groups</strong> at the intersection of
            gender, visibility, and activism and overcome TFGBV as barrier to women’s leadership and
            participation.
          </H4>
        </div>
        <Spacer size='8xl' />
      </section>
      <Spacer size='8xl' />
      <section id='country-snapshots' className='mx-auto w-full bg-primary-gray-200 py-12'>
        <div className='mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8'>
          <H5>Country snapshots</H5>
          <H3>TFGBV patterns are consistent across countries, but the intensity varies</H3>
          <div className='w-full bg-surface p-6'>
            {isCountryDataError ? (
              <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
                <P className='text-error'>Error loading country data</P>
              </div>
            ) : isCountryDataLoading || !countryData ? (
              <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
                <Spinner />
              </div>
            ) : (
              <VizCarousel
                slideNo
                slides={countryData.map((el) => ({
                  content: (
                    <div className='flex flex-col'>
                      <H4 weight='medium'>{el.isocode}</H4>
                      <P marginBottom='none'>{el.country_snapshot}</P>
                      <Spacer size='2xl' />
                      <Grid noOfCol={2}>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              {el.total_posts}
                            </H4>
                            <P size='base'>posts collected</P>
                          </div>
                        </GridItem>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              {el.tfgbv_posts_human_validated}
                            </H4>
                            <P size='base'>human-verified TFGBV cases</P>
                          </div>
                        </GridItem>
                      </Grid>
                    </div>
                  ),
                  viz: (
                    <div
                      className='aspect-video h-full w-full bg-center bg-cover'
                      style={{ backgroundImage: `url(/imgs/CountryImage/${el.isocode}.webp)` }}
                    />
                  ),
                }))}
                vizWidth='base'
              />
            )}
          </div>
        </div>
      </section>
      <Spacer size='8xl' />
      <section id='explore-data' className='mx-auto w-full bg-surface'>
        <Spacer size='8xl' />
        <div className='mx-auto w-full max-w-[1920px]'>
          <H5>Key findings</H5>
          <div className='flex items-center gap-2'>
            <H3 marginBottom='none'>Explore data for</H3>
            <DropdownSelect
              variant='light'
              defaultValue={{ label: 'Iran', value: 'Iran' }}
              options={[
                { label: 'Iran', value: 'Iran' },
                { label: 'Iraq', value: 'Iraq' },
                { label: 'Moldova', value: 'Moldova' },
              ]}
            />
          </div>
          <Spacer size='2xl' />

          <Tabs color='red' defaultValue='tab 1'>
            <TabsList>
              <TabsTrigger value='tab 1'>General analysis</TabsTrigger>
              <TabsTrigger value='tab 2'>TFGBV analysis</TabsTrigger>
            </TabsList>
            <TabsContent value='tab 1'>
              <div>General analysis</div>
            </TabsContent>
            <TabsContent value='tab 2'>
              <div>TFGBV analysis</div>
            </TabsContent>
          </Tabs>
        </div>
        <Spacer size='8xl' />
      </section>
      <Spacer size='8xl' />
      <section id='resources' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <H3>Resources</H3>
        <Grid noOfCol={{ base: 1, sm: 2, md: 4, lg: 6 }}>
          {resourceCards.map((card) => (
            <GridItem key={card.title}>
              <ResourceCard href={card.url}>
                <ResourceCardImage imageSrc={card.image} aspectRatio='portrait' />
                <ResourceCardContent>
                  <ResourceCardTitle>{card.title}</ResourceCardTitle>
                  <ResourceCardDescription>{card.text}</ResourceCardDescription>
                </ResourceCardContent>
                <ResourceCardFooter>
                  <Button variant='link'>{t('readMore')}</Button>
                </ResourceCardFooter>
              </ResourceCard>
            </GridItem>
          ))}
        </Grid>
      </section>
      <Spacer size='8xl' />
    </div>
  );
}

export const Route = createLazyRoute('/projects/$projectId')({
  component: ProjectsPage,
});
