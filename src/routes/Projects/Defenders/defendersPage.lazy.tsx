import { useQuery } from '@tanstack/react-query';
import { createLazyRoute } from '@tanstack/react-router';
import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { fetchAndParseCSV } from '@undp/data-viz/fetchAndParseData';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@undp/design-system-react/Accordion';
import { Badge } from '@undp/design-system-react/Badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@undp/design-system-react/Breadcrumb';
import { Button } from '@undp/design-system-react/Button';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@undp/design-system-react/HoverCard';
import { Modal } from '@undp/design-system-react/Modal';
import { PageHeader, PageHeaderContent } from '@undp/design-system-react/PageHeader';
import { PageSection } from '@undp/design-system-react/PageSection';
import { SegmentedControl } from '@undp/design-system-react/SegmentedControl';
import { Separator } from '@undp/design-system-react/Separator';
import { Spacer } from '@undp/design-system-react/Spacer';
import { Spinner } from '@undp/design-system-react/Spinner';
import { StatCardDescription } from '@undp/design-system-react/StatCard';
import { Switch } from '@undp/design-system-react/Switch';
import { A, H1, H2, H3, H4, H5, H6, P } from '@undp/design-system-react/Typography';
import { VizCarousel } from '@undp/design-system-react/VizCarousel';
import { lazy, Suspense, useState } from 'react';
import MetricHighlights from '@/components/MetricHighlights';
import { RenderWhenVisible } from '@/components/RenderWhenVisible';
import { Section } from '@/components/Section';
import { DEFENDER_COUNTRIES, DEFENDER_RESOURCES } from '@/constants';
import type { DefenderCountriesDataRow } from '@/types';

function useCountryData() {
  return useQuery({
    queryKey: ['country-data'],
    queryFn: () =>
      fetchAndParseCSV('/data/defenders/data.csv') as Promise<DefenderCountriesDataRow[]>,
  });
}
function useTargetAffiliationData() {
  return useQuery({
    queryKey: ['target-affiliation-data'],
    queryFn: () =>
      fetchAndParseCSV('/data/defenders/targetAffiliation.csv') as Promise<
        DefenderCountriesDataRow[]
      >,
  });
}

const TOTAL_POSTS = 255586;
const TOTAL_HATE_POST = 75809;
const TOTAL_POSTS_TARGETING_WEHRD = 16804;

const ATTACK_TWEETS = [
  {
    translation:
      '“Well, on Facebook the news says the woman was living together without marriage, that’s why she got beaten up.”',
    original: 'lah ini di FB beritanya si ibu kumpul kebo makanya di keroyok',
  },
  {
    translation:
      '“You are one of the reasons this country is falling apart… are you still not aware?”',
    original: 'Anda salah satu penyebab hancur nya negeri ini.... Masih gak sadar',
  },
  {
    translation: (
      <>
        “Hahaha… serves this bastard right, the face of this asshole, already chased away that old
        woman (
        <HoverCard openDelay={0}>
          <HoverCardTrigger className='underline decoration-dotted'>nenek gayung</HoverCardTrigger>
          <HoverCardContent className='bg-background shadow'>
            in Indonesia, “nenek gayung” does not refer to an ordinary elderly woman. It is
            associated with a ghost from local folklore.
          </HoverCardContent>
        </HoverCard>
        ), lol.”
      </>
    ),
    original: 'Whahaha ..... mampus muka bajingan satu ini udah usir nenek gayung wkwk ...',
  },
];

const DropdownSelect = lazy(() =>
  import('@undp/design-system-react/DropdownSelect').then((m) => ({ default: m.DropdownSelect })),
);

const Dashboard = lazy(() => import('./Dashboard').then((m) => ({ default: m.Dashboard })));

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
  const [TFGBVTab, setTFGBVTab] = useState<'human_validated' | 'ai_assisted'>('human_validated');
  const [showContent, setShowContent] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [resourceCardCountryFilter, setResourceCardCountryFilter] = useState<
    undefined | { value: string; label: string }
  >(undefined);
  return (
    <div className='w-full antialiased'>
      <PageHeader
        className='h-auto px-0 sm:px-2 md:h-[calc(100vh-115px)]'
        backgroundImage='/imgs/defenders_header_img.webp'
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
          <H5>eMonitor+</H5>
          <H1 size='sm'>Women’s leadership for a just, healthy planet</H1>
          <H5>
            Supporting influence & safety of Women Environment Human Rights Defender and Civil
            Society Organisations
          </H5>
          <a href='#explore-data'>
            <Button endIcon='none'>Explore the data</Button>
          </a>
        </PageHeaderContent>
      </PageHeader>
      <PageSection backgroundColor='secondary'>
        <Grid noOfCol={{ base: 1, sm: 3 }}>
          <GridItem noOfColSpan={1}>
            <H2>About</H2>
          </GridItem>
          <GridItem noOfColSpan={{ base: 1, sm: 2 }}>
            <H5>
              Technology-facilitated gender-based violence (TFGBV) is a governance and human rights
              issue requiring coordinated national and global responses. Across the five project
              countries — Indonesia, Iraq, Kenya, the Philippines and Uganda — UNDP’s eMonitor+
              reveals that TFGBV is systemic, targeted and increasing. This page shows how UNDP
              transforms data into evidence for protection, accountability and policy reform.
            </H5>
          </GridItem>
        </Grid>
        <Spacer size='5xl' />
        {/** biome-ignore lint/a11y/useMediaCaption: subtitles embeded in the video */}
        <video
          controls
          preload='metadata'
          playsInline
          className='aspect-video h-auto w-full bg-background/10'
          poster='/imgs/defender_video.webp'
        >
          <source
            src='/eMonitor+ Women Human Rights Defenders 2026 (short version).mp4'
            type='video/mp4'
          />
        </video>
        <Spacer size='5xl' />
        <Grid noOfCol={{ base: 1, sm: 3 }}>
          <GridItem noOfColSpan={1} />
          <GridItem noOfColSpan={{ base: 1, sm: 2 }}>
            <P size='xs' weight='semibold' marginBottom='xs' className='uppercase tracking-wider'>
              Project countries
            </P>
            <div className='flex flex-wrap gap-2'>
              {DEFENDER_COUNTRIES.map((country) => (
                <Badge
                  key={country.id}
                  variant='outline'
                  color='background'
                  className='px-4 py-1.5'
                >
                  {country.name}
                </Badge>
              ))}
            </div>
            <Spacer size='3xl' />
            <Separator color='background' thickness='xs' className='opacity-30' />
            <Spacer size='2xl' />
            <H5 marginBottom='none' className='opacity-70'>
              Thanks to Denmark, Luxembourg and the Republic of Korea, partners to UNDP’s 
              Governance, Peacebuilding, Crisis and Resilience (GCPR) Funding Window, for making
              this work possible.
            </H5>
          </GridItem>
        </Grid>
      </PageSection>
      <Section id='stats'>
        <H5>Overview</H5>
        <H3 className='content-block'>
          TFGBV is widespread and viral — and women environment defenders are widely targeted
        </H3>
        <P className='content-block'>
          TFGBV generates high levels of engagement and mobilises large numbers of unique users.
          Combining AI-assisted detection with human vetting, UNDP built an evidence base that
          country teams now use for advocacy.
        </P>
        <Grid gap='24px' noOfCol={{ base: 1, md: 3 }}>
          <GridItem noOfColSpan={1}>
            <div className='flex h-full flex-col gap-4'>
              <div className='flex grow flex-col justify-center bg-surface p-6'>
                <H3 weight='bold'>{numberFormattingFunction(TOTAL_POSTS)}</H3>
                <StatCardDescription>
                  <strong>Social media posts analysed</strong> across five countries, coming from
                  close to 80,000 unique authors.
                </StatCardDescription>
              </div>
              <div className='flex grow flex-col justify-center bg-surface p-6'>
                <H3 weight='bold'>
                  {numberFormattingFunction((TOTAL_HATE_POST * 100) / TOTAL_POSTS, undefined, 1)}%
                </H3>
                <StatCardDescription>
                  <strong>Contained some level of violence</strong> as identified with AI models
                  prompted by UNDP.
                </StatCardDescription>
              </div>
              <div className='flex grow flex-col justify-center bg-surface p-6'>
                <H3 weight='bold'>{numberFormattingFunction(TOTAL_POSTS_TARGETING_WEHRD)}</H3>
                <StatCardDescription>
                  <strong>Incidents of violence against women</strong> environment defenders, vetted
                  and reported by trained monitors.
                </StatCardDescription>
              </div>
            </div>
          </GridItem>
          <GridItem noOfColSpan={{ base: 1, md: 2 }}>
            <div className='flex h-full w-full flex-col gap-4 bg-surface p-6'>
              <div className='flex items-center justify-between gap-4'>
                <P size='xl' marginBottom='none'>
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
                      { columnId: 'country_name', chartConfigId: 'label' },
                      {
                        columnId:
                          TFGBVTab === 'ai_assisted'
                            ? 'tfgbv_posts_ai_assisted'
                            : 'tfgbv_posts_human_validated',
                        chartConfigId: 'size',
                      },
                    ])}
                    orientation='vertical'
                    colors='var(--primary)'
                    showTicks={false}
                  />
                )}
              </div>
              <div>
                <Separator color='surface-lg' />
                <Spacer size='xl' />
                <Spacer size='sm' />
                <P
                  size='sm'
                  weight='bold'
                  marginBottom='2xs'
                  className='text-content-secondary uppercase'
                >
                  {TFGBVTab === 'human_validated'
                    ? 'How human vetting works'
                    : 'About ai-assisted detection'}
                </P>
                <P size='sm' marginBottom='none' className='text-content-secondary'>
                  {TFGBVTab === 'human_validated'
                    ? 'Manual verification uses a standardised method for sub-sampling content, so the most relevant cases can be identified and studied qualitatively. It builds on the EU Foreign Information Manipulation and Interference methodology, expanded for this project. Vetted cases are also used to retrain the AI models.'
                    : 'AI assisted detection uses machine-learning models to screen posts in real time, prioritising posts that are more likely to contain harmful content for human analysts. The system combines keyword-based identification with contextual understanding, allowing it to detect both explicit and coded language.'}
                </P>
              </div>
            </div>
          </GridItem>
        </Grid>
      </Section>
      <Section id='key-findings'>
        <H5>Key findings</H5>
        <H3 marginBottom='none' className='content-block'>
          TFGBV against women environment defenders intensifies at moments of high public visibility
        </H3>
        <Spacer size='2xl' />
        <Accordion type='single' variant='secondary' collapsible defaultValue='item-1'>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-[1.25rem] normal-case'>
              Why attacks happen
            </AccordionTrigger>
            <AccordionContent>
              <Grid noOfCol={{ base: 1, md: 2 }}>
                <GridItem noOfColSpan={1}>
                  <div className='flex flex-col'>
                    <H4 weight='bold' marginBottom='none'>
                      TFGBV is used to push women environment defenders into self-censorship and to
                      discredit their work
                    </H4>
                    <Spacer size='2xl' />
                    <P marginBottom='none'>
                      Attacks rise when defenders are most visible, such as during a policy debate
                      or when they speak in public. The aim is to make them step back, or to
                      undermine their advocacy with stereotypes.
                    </P>
                    <Spacer size='2xl' />
                    <Separator color='surface-md' />
                    <Spacer size='2xl' />
                    <MetricHighlights
                      items={[
                        {
                          value: '40%',
                          description: 'of vetted attacks were reactions to specific events',
                        },
                        {
                          value: '92%',
                          description: (
                            <>
                              of environmental defenders experience online abuse (
                              <A
                                href='https://globalwitness.org/en/campaigns/digital-threats/toxic-platforms-broken-planet/'
                                target='_blank'
                                rel='noopener'
                              >
                                Global Witness
                              </A>
                              )
                            </>
                          ),
                        },
                      ]}
                    />
                  </div>
                </GridItem>
                <GridItem noOfColSpan={1}>
                  <div className='h-full px-6'>
                    <div className='flex h-full w-full flex-col justify-between gap-4 bg-background p-6'>
                      <H6 marginBottom='none'>A case from Indonesia</H6>
                      <div className='justify-center'>
                        <H5 marginBottom='none'>
                          Assaulted for opposing illegal mining, then attacked again online
                        </H5>
                        <Spacer size='3xl' />
                        <P size='base' marginBottom='none'>
                          An elderly woman who spoke out against illegal mining was physically
                          assaulted. As the news spread, eMonitor+ found a second wave of abuse
                          online: posts that blamed her, mocked the attack and spread false claims
                          about her private life to hide why she was targeted.
                        </P>
                      </div>
                      <Button
                        endIcon='arrow'
                        variant='link'
                        onClick={() => {
                          setOpenModal(true);
                        }}
                        padding='none'
                        className='w-fit'
                      >
                        Read more
                      </Button>
                    </div>
                  </div>
                </GridItem>
              </Grid>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='text-[1.25rem] normal-case'>
              How attacks are amplified
            </AccordionTrigger>
            <AccordionContent>
              <Grid noOfCol={{ base: 1, md: 2 }}>
                <GridItem noOfColSpan={1}>
                  <div className='flex flex-col'>
                    <H4 weight='bold' marginBottom='none'>
                      TFGBV is enhanced through coordinated strategies of inorganic content
                      production, distribution, and engagement
                    </H4>
                    <Spacer size='2xl' />
                    <P marginBottom='none'>
                      Inorganic behaviour is artificial, automated or paid activity that pushes
                      engagement towards more polarising or violent narratives. How often it appears
                      varies widely between countries; Iraq is where most of these cases were vetted
                      by human monitors.
                    </P>
                    <Spacer size='2xl' />
                    <Separator color='surface-md' />
                    <Spacer size='2xl' />
                    <MetricHighlights
                      items={[
                        {
                          value: '1 in 3',
                          description:
                            'vetted violent attacks showed strong signs of inorganic behaviour',
                        },
                      ]}
                    />
                  </div>
                </GridItem>
                <GridItem noOfColSpan={1}>
                  <div className='flex h-full min-h-95 flex-col bg-surface px-6'>
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
                          { columnId: 'country_name', chartConfigId: 'label' },
                          {
                            columnId: 'behavior_inorganic',
                            chartConfigId: 'size',
                          },
                        ])}
                        colorDomain={['Inorganic', 'Organic']}
                        maxValue={100}
                        numberDisplayOptions={{ suffix: '%' }}
                        trackColor='var(--gray-300)'
                        graphTitle='Share of vetted attacks with strong signs of inorganic behaviour'
                        showValues
                        showTicks={false}
                        backgroundColor='var(--background)'
                        topMargin={0}
                        bottomMargin={0}
                        orientation='horizontal'
                      />
                    )}
                  </div>
                </GridItem>
              </Grid>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger className='text-[1.25rem] normal-case'>
              Who is targeted
            </AccordionTrigger>
            <AccordionContent>
              <Grid noOfCol={{ base: 1, md: 2 }}>
                <GridItem noOfColSpan={1}>
                  <div className='flex flex-col'>
                    <H4 weight='semibold' marginBottom='none'>
                      TFGBV discredits established women defenders, and also persecutes newer
                      leaders and activism itself
                    </H4>
                    <Spacer size='2xl' />
                    <P marginBottom='none'>
                      Attacks also target activism, feminism and environmental justice as ideas.
                      When advocacy is framed as a place of inherent violence, new activism becomes
                      harder to foster.
                    </P>
                    <Spacer size='2xl' />
                    <Separator color='surface-sm' />
                    <Spacer size='2xl' />
                    <MetricHighlights
                      items={[
                        {
                          value: '62%',
                          description:
                            'of vetted violent attacks targeted women with established leadership',
                        },
                        {
                          value: '38%',
                          description: 'targeted lesser-known voices or activism itself',
                        },
                      ]}
                    />
                  </div>
                </GridItem>
                <GridItem noOfColSpan={1}>
                  <div className='flex h-full min-h-95 flex-col bg-surface px-6'>
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
                        showTicks={false}
                        topMargin={0}
                        bottomMargin={0}
                        backgroundColor='var(--background)'
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
        <Spacer size='3xl' />
        <H4 marginBottom='none' className='content-block'>
          This analysis points to the need to{' '}
          <strong>prioritise protection for high risk groups</strong> at the intersection of gender,
          visibility, and activism and overcome TFGBV as barrier to women’s leadership and
          participation.
        </H4>
      </Section>
      <Section id='country-snapshots'>
        <H5>Country snapshots</H5>
        <H3 className='content-block'>
          TFGBV patterns are consistent across countries, but the intensity varies
        </H3>
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
                    <H4 weight='bold'>{el.country_name}</H4>
                    <P marginBottom='none'>{el.country_snapshot}</P>
                    <Spacer size='3xl' />
                    <Separator color='surface-md' />
                    <Spacer size='2xl' />
                    <MetricHighlights
                      items={[
                        {
                          value: el.total_posts,
                          description: (
                            <>
                              posts monitored with eMonitor
                              <br />
                              <strong>
                                {numberFormattingFunction(
                                  (el.tfgbv_posts_ai_assisted * 100) / el.total_posts,
                                  undefined,
                                  1,
                                )}
                                % showed signs of TFGBV
                              </strong>
                            </>
                          ),
                        },
                        {
                          value: el.tfgbv_posts_human_validated,
                          description: (
                            <>
                              human-verified TFGBV cases
                              <br />
                              <strong>
                                {numberFormattingFunction(
                                  (el.event_tfgbv_posts_human_validated * 100) /
                                    el.tfgbv_posts_human_validated,
                                  undefined,
                                  1,
                                )}
                                % event-based attacks
                              </strong>
                            </>
                          ),
                        },
                      ]}
                    />
                  </div>
                ),
                viz: (
                  <div
                    className='aspect-video h-full w-full bg-center bg-cover'
                    style={{ backgroundImage: `url(/imgs/CountryImage/${el.iso_code}.webp)` }}
                  />
                ),
              }))}
              vizWidth='base'
            />
          )}
        </div>
      </Section>
      <Section id='explore-data'>
        {isCountryDataError ? (
          <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
            <P className='text-error'>Error loading country data</P>
          </div>
        ) : isCountryDataLoading || !countryData ? (
          <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
            <Spinner />
          </div>
        ) : (
          <RenderWhenVisible
            fallback={
              <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
                <Spinner />
              </div>
            }
          >
            <Suspense
              fallback={
                <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
                  <Spinner />
                </div>
              }
            >
              <Dashboard
                countryList={countryData.map((d) => ({ label: d.country_name, value: d.iso_code }))}
              />
            </Suspense>
          </RenderWhenVisible>
        )}
      </Section>
      <Section id='resources'>
        <H5>From Evidence to Accountability</H5>
        <H3>Data is most powerful when used for action</H3>
        <Spacer className='3xl' />
        <div className='flex items-center justify-between gap-4'>
          <div>
            <P size='sm' marginBottom='2xs'>
              Filter by country
            </P>
            <Suspense fallback={<div className='h-12 w-full animate-pulse bg-surface' />}>
              <DropdownSelect
                variant='light'
                value={resourceCardCountryFilter}
                onChange={(v) =>
                  setResourceCardCountryFilter(v as { value: string; label: string })
                }
                options={[...new Set(DEFENDER_RESOURCES.map((el) => el.title))].map((el) => ({
                  value: el,
                  label: el,
                }))}
                isSearchable={false}
                isClearable
                className='min-w-60'
              />
            </Suspense>
          </div>
          <P size='sm' className='hidden text-content-secondary md:block' marginBottom='none'>
            {
              DEFENDER_RESOURCES.filter(
                (el) => !resourceCardCountryFilter || el.title === resourceCardCountryFilter?.value,
              ).length
            }{' '}
            resource(s)
          </P>
        </div>
        <Spacer size='3xl' />
        <Grid noOfCol={{ base: 1, sm: 2, md: 3 }}>
          {DEFENDER_RESOURCES.filter(
            (el) => !resourceCardCountryFilter || el.title === resourceCardCountryFilter?.value,
          ).map((card) => (
            <GridItem key={`${card.title}_${card.text}`}>
              <a href={card.url} target='_blank' rel='noopener'>
                <div className='group flex h-full min-h-60 flex-col bg-surface p-6 hover:bg-surface-hover'>
                  <H6 marginBottom='none'>{card.title}</H6>
                  <Spacer size='xl' />
                  <P size='lg' marginBottom='none' className='line-clamp-3 grow'>
                    {card.text}
                  </P>
                  <Spacer size='xl' />
                  <Button variant='link' padding='none' endIcon='arrow' className='w-fit'>
                    Read more
                  </Button>
                </div>
              </a>
            </GridItem>
          ))}
        </Grid>
      </Section>
      <Modal
        onClose={() => {
          setOpenModal(false);
        }}
        open={openModal}
      >
        <div>
          <H6 marginBottom='none'>A case from Indonesia</H6>
          <Spacer size='2xl' />
          <H5 marginBottom='none'>
            Assaulted for opposing illegal mining, then attacked again online
          </H5>
          <Spacer size='2xl' />
          <div className='bg-surface p-4'>
            <P marginBottom='none' size='base' className='text-content-secondary'>
              <strong>Content warning</strong>: this story contains descriptions of gender-based
              violence, including comments that could be considered sexist and abusive, that some
              readers may find distressing.
            </P>
          </div>
          <Spacer size='2xl' />
          <P size='base' className='text-content-secondary'>
            An elderly woman in Indonesia who opposed illegal mining in her area was physically
            assaulted. News of the attack spread quickly online and drew strong public reactions,
            including many messages of solidarity.
          </P>
          <P size='base' className='text-content-secondary'>
            Monitoring with eMonitor+ also found repeated technology-facilitated gender-based
            violence targeting her after the assault. Posts included derogatory remarks and
            victim-blaming, and some mocked or celebrated the violence against her.
          </P>
          <P marginBottom='none' size='base' className='text-content-secondary'>
            Several posts accused her of harming the nation. Others tried to justify the assault
            with gendered disinformation, claiming she was attacked because of “kumpul kebo” (living
            together outside marriage). These claims deliberately hid the fact that she was targeted
            for opposing illegal mining.
          </P>
          <Spacer size='2xl' />
          <Separator color='surface-md' />
          <Spacer size='2xl' />
          <div className='flex w-full items-center justify-between gap-4'>
            <div>
              <P size='base' marginBottom='none'>
                What the posts said
              </P>
              <P size='sm' marginBottom='none' className='text-content-secondary'>
                Examples identified by eMonitor+, translated from Indonesian
              </P>
            </div>
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
          <Spacer size='2xl' />
          {showContent ? (
            <Grid noOfCol={{ sm: 1, md: 2, lg: 3 }} gap='16px'>
              {ATTACK_TWEETS.map((el, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: not changing
                <GridItem noOfColSpan={1} key={i}>
                  <div className='bg-surface p-4'>
                    <P size='base' marginBottom='base'>
                      {el.translation}
                    </P>
                    <P size='sm' marginBottom='none' className='text-content-secondary'>
                      <strong>Original (Indonesian)</strong>: {el.original}
                    </P>
                  </div>
                </GridItem>
              ))}
            </Grid>
          ) : (
            <div className='flex min-h-50 grow items-center justify-center bg-surface'>
              <P className='mx-auto w-full text-center text-content-tertiary' size='sm'>
                <strong>Sensitive content hidden</strong>
                <br />
                This section may contain offensive language. Switch the toggle to view the content.
              </P>
            </div>
          )}
          <Spacer size='2xl' />
          <Separator color='surface-md' />
          <Spacer size='2xl' />
          <P size='base' marginBottom='none' weight='bold'>
            Narratives like these trivialise the physical violence she endured and normalise harm
            against women environment human rights defenders. They show how digital spaces are used
            to extend and legitimise physical violence.
          </P>
          <Spacer size='2xl' />
          <Separator color='surface-md' />
          <Spacer size='2xl' />
          <P size='base' marginBottom='none' className='text-content-secondary'>
            Source: Indonesia eMonitor+ report,{' '}
            <span className='italic'>
              Understanding Digital Risks Faced by Women Environmental Human Rights Defenders:
              Insights from eMonitor+ Monitoring of Technology-Facilitated Gender-Based Violence
              (September 2025 – June 2026)
            </span>
          </P>
        </div>
      </Modal>
    </div>
  );
}

export const Route = createLazyRoute('/projects/$projectId')({
  component: ProjectsPage,
});
