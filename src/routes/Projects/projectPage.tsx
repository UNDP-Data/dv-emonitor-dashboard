import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@undp/design-system-react/Accordion';
import {
  Banner,
  BannerBody,
  BannerBodyContent,
  BannerBodySidebar,
} from '@undp/design-system-react/Banner';
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
import { Spacer } from '@undp/design-system-react/Spacer';
import {
  StatCard,
  StatCardDescription,
  StatCardTitle,
  StatCardValue,
} from '@undp/design-system-react/StatCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@undp/design-system-react/Tabs';
import { H1, H2, H3, H4, H5, P } from '@undp/design-system-react/Typography';
import { VizCarousel } from '@undp/design-system-react/VizCarousel';
import { useTranslation } from 'react-i18next';

export function ProjectsPage() {
  const { t } = useTranslation();
  const resourceCards = t('resourceCards', { returnObjects: true }) as {
    title: string;
    text: string;
    image: string;
    url: string;
  }[];
  return (
    <div className='w-full antialiased'>
      <PageHeader
        className='h-auto px-0 sm:px-2 md:h-[calc(100vh_-_115px)]'
        backgroundImage='/imgs/header_img.webp'
        contentMode='light'
        variant='secondary'
      >
        <PageHeaderContent>
          <H5>{t('pageTitleSub')}</H5>
          <H1 size='sm'>UNDP Defenders project</H1>
        </PageHeaderContent>
      </PageHeader>
      <section id='about'>
        <Banner
          backgroundColor='black'
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
                Technology facilitated gender-based violence (TFGBV) is a governance and human
                rights issue requiring coordinated national and global resources. Across the five
                project countries - Indonesia, The Philippines, Kenya, Uganda and Iraq, UNDP's
                eMonitor+ reveals that TFGBV is systemic, targeted and increasing. This dashboard
                reveals how UNDP transforms data into evidence for protection, accountability and
                policy reform.
              </H4>
            </BannerBodyContent>
          </BannerBody>
        </Banner>
      </section>
      <Spacer size='8xl' />
      <section id='stats' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <H5>Overview</H5>
        <H3>
          TFGBV is increasingly prevalent, and women environmental defenders are are widely targeted
          and exposed to online harassment, abuse, and threats
        </H3>
        <Grid gap='24px' noOfCol={{ base: 1, md: 3 }}>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>{t('keyStatsCards.0.value')}</StatCardValue>
              <StatCardTitle>{t('keyStatsCards.0.title')}</StatCardTitle>
              <StatCardDescription>{t('keyStatsCards.0.text')}</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>{t('keyStatsCards.0.value')}</StatCardValue>
              <StatCardTitle>{t('keyStatsCards.0.title')}</StatCardTitle>
              <StatCardDescription>{t('keyStatsCards.0.text')}</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>{t('keyStatsCards.1.value')}</StatCardValue>
              <StatCardTitle>{t('keyStatsCards.1.title')}</StatCardTitle>
              <StatCardDescription>{t('keyStatsCards.1.text')}</StatCardDescription>
            </StatCard>
          </GridItem>
        </Grid>
      </section>
      <Spacer size='8xl' />
      <section id='country-snapshots' className='mx-auto w-full bg-primary-gray-200 py-12'>
        <div className='mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8'>
          <H5>Country snapshots</H5>
          <H3>TFGBV patterns are consistent across countries, but the intensity varies</H3>
          <div className='w-full bg-primary-white p-6'>
            <VizCarousel
              slideNo
              slides={[
                {
                  content: (
                    <div className='flex flex-col'>
                      <H3>Iraq</H3>
                      <P>
                        Building advocacy networks and evidence for women activists and defenders
                        through capacity building, digital monitoring, and policy engagement.
                      </P>
                      <Grid noOfCol={3}>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              100%
                            </H4>
                            <P size='base'>CSOs and EHRDs assessed</P>
                          </div>
                        </GridItem>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              32
                            </H4>
                            <P size='base'>women activists trained through a four-day programme</P>
                          </div>
                        </GridItem>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              600
                            </H4>
                            <P size='base'>
                              incidents of online violence documented across 37,000+ posts
                            </P>
                          </div>
                        </GridItem>
                      </Grid>
                    </div>
                  ),
                  viz: <div className='h-full min-h-[320px] w-full bg-primary-gray-300' />,
                },
                {
                  content: (
                    <div className='flex flex-col'>
                      <H3>Iraq</H3>
                      <P>
                        Building advocacy networks and evidence for women activists and defenders
                        through capacity building, digital monitoring, and policy engagement.
                      </P>
                      <Grid noOfCol={3}>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              100%
                            </H4>
                            <P size='base'>CSOs and EHRDs assessed</P>
                          </div>
                        </GridItem>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              32
                            </H4>
                            <P size='base'>women activists trained through a four-day programme</P>
                          </div>
                        </GridItem>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              600
                            </H4>
                            <P size='base'>
                              incidents of online violence documented across 37,000+ posts
                            </P>
                          </div>
                        </GridItem>
                      </Grid>
                    </div>
                  ),
                  viz: <div className='h-full w-full bg-primary-gray-500' />,
                },
                {
                  content: (
                    <div className='flex flex-col'>
                      <H3>Iraq</H3>
                      <P>
                        Building advocacy networks and evidence for women activists and defenders
                        through capacity building, digital monitoring, and policy engagement.
                      </P>
                      <Grid noOfCol={3}>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              100%
                            </H4>
                            <P size='base'>CSOs and EHRDs assessed</P>
                          </div>
                        </GridItem>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              32
                            </H4>
                            <P size='base'>women activists trained through a four-day programme</P>
                          </div>
                        </GridItem>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              600
                            </H4>
                            <P size='base'>
                              incidents of online violence documented across 37,000+ posts
                            </P>
                          </div>
                        </GridItem>
                      </Grid>
                    </div>
                  ),
                  viz: <div className='h-full w-full bg-primary-gray-300' />,
                },
              ]}
              vizWidth='base'
            />
          </div>
        </div>
      </section>
      <Spacer size='8xl' />
      <section id='key=findings' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <H5>Key findings</H5>
        <H3>
          TFGBV against women environmental defenders is often targeted and tends to intensify when
          during moments of high public visibility
        </H3>
        <Accordion type='single' variant='tertiary' collapsible defaultValue='item-1'>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-[1.25rem] normal-case'>
              Who is targeted
            </AccordionTrigger>
            <AccordionContent>
              <Grid noOfCol={{ base: 1, md: 2 }}>
                <GridItem noOfColSpan={1}>
                  <div className='flex flex-col'>
                    <H5>
                      Lorem ipsum dolor sit amet consectetur. At maecenas enim proin accumsan enim
                      lacus pellentesque vestibulum semper.
                    </H5>
                    <H4 weight='bold' marginBottom='none'>
                      32
                    </H4>
                    <P size='base'>
                      Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                    </P>
                    <H4 weight='bold' marginBottom='none'>
                      32
                    </H4>
                    <P size='base'>
                      Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                    </P>
                  </div>
                </GridItem>
                <GridItem noOfColSpan={1}>
                  <div className='h-full bg-primary-gray-200' />
                </GridItem>
              </Grid>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='text-[1.25rem] normal-case'>
              Tactics & Intensity
            </AccordionTrigger>
            <AccordionContent>
              <Grid noOfCol={{ base: 1, md: 2 }}>
                <GridItem noOfColSpan={1}>
                  <div className='flex flex-col'>
                    <H5>
                      Lorem ipsum dolor sit amet consectetur. At maecenas enim proin accumsan enim
                      lacus pellentesque vestibulum semper.
                    </H5>
                    <H4 weight='bold' marginBottom='none'>
                      32
                    </H4>
                    <P size='base'>
                      Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                    </P>
                    <H4 weight='bold' marginBottom='none'>
                      32
                    </H4>
                    <P size='base'>
                      Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                    </P>
                  </div>
                </GridItem>
                <GridItem noOfColSpan={1}>
                  <div className='h-full bg-primary-gray-200' />
                </GridItem>
              </Grid>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger className='text-[1.25rem] normal-case'>
              How attacks happen
            </AccordionTrigger>
            <AccordionContent>
              <Grid noOfCol={{ base: 1, md: 2 }}>
                <GridItem noOfColSpan={1}>
                  <div className='flex flex-col'>
                    <H5>
                      Lorem ipsum dolor sit amet consectetur. At maecenas enim proin accumsan enim
                      lacus pellentesque vestibulum semper.
                    </H5>
                    <H4 weight='bold' marginBottom='none'>
                      32
                    </H4>
                    <P size='base'>
                      Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                    </P>
                    <H4 weight='bold' marginBottom='none'>
                      32
                    </H4>
                    <P size='base'>
                      Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                    </P>
                  </div>
                </GridItem>
                <GridItem noOfColSpan={1}>
                  <div className='h-full bg-primary-gray-200' />
                </GridItem>
              </Grid>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-4'>
            <AccordionTrigger className='text-[1.25rem] normal-case'>
              Platforms & Ecosystem
            </AccordionTrigger>
            <AccordionContent>
              <Grid noOfCol={{ base: 1, md: 2 }}>
                <GridItem noOfColSpan={1}>
                  <div className='flex flex-col'>
                    <H5>
                      Lorem ipsum dolor sit amet consectetur. At maecenas enim proin accumsan enim
                      lacus pellentesque vestibulum semper.
                    </H5>
                    <H4 weight='bold' marginBottom='none'>
                      32
                    </H4>
                    <P size='base'>
                      Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                    </P>
                    <H4 weight='bold' marginBottom='none'>
                      32
                    </H4>
                    <P size='base'>
                      Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                    </P>
                  </div>
                </GridItem>
                <GridItem noOfColSpan={1}>
                  <div className='h-full bg-primary-gray-200' />
                </GridItem>
              </Grid>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <Spacer size='8xl' />
      <section id='explore-data' className='mx-auto w-full bg-primary-gray-200 py-12'>
        <div className='mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8'>
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

export default function createProjectPageRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/projects/$projectId',
    component: ProjectsPage,
    getParentRoute: () => parentRoute,
  });
}
