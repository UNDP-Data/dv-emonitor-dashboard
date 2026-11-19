import { Link } from '@tanstack/react-router';
import { Skeleton } from '@undp/design-system-react';
import {
  Banner,
  BannerBody,
  BannerBodyContent,
  BannerBodySidebar,
} from '@undp/design-system-react/Banner';
import { Button } from '@undp/design-system-react/Button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from '@undp/design-system-react/Card';
import { Carousel, CarouselItem } from '@undp/design-system-react/Carousel';
import {
  FeaturedCard,
  FeaturedCardDescription,
  FeaturedCardFooter,
  FeaturedCardTitle,
} from '@undp/design-system-react/FeaturedCard';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { LazyMount } from '@undp/design-system-react/LazyMount';
import { PageHeader, PageHeaderContent } from '@undp/design-system-react/PageHeader';
import { Spacer } from '@undp/design-system-react/Spacer';
import {
  StatCard,
  StatCardDescription,
  StatCardTitle,
  StatCardValue,
} from '@undp/design-system-react/StatCard';
import { Blockquote, H1, H2, H4, H5, P } from '@undp/design-system-react/Typography';
import { lazy, Suspense } from 'react';

const DotDensityMap = lazy(() =>
  import('@undp/data-viz/DotDensityMap').then((m) => ({ default: m.DotDensityMap })),
);

const DropdownSelect = lazy(() =>
  import('@undp/design-system-react/DropdownSelect').then((m) => ({ default: m.DropdownSelect })),
);

function App() {
  const projectCards = [
    {
      title: 'UNDP Defenders Project',
      id: 'defenders',
      text: "Supporting Women's Leadership for a Just, Healthy Planet",
      image: '/imgs/projects-01.webp',
      url: 'https://www.undp.org/',
    },
  ];
  return (
    <div className='flex flex-col antialiased'>
      <PageHeader
        className='h-auto px-0 sm:px-2 md:h-[calc(100vh-115px)]'
        backgroundImage='imgs/header_img.webp'
        contentMode='dark'
      >
        <PageHeaderContent className='max-w-full sm:max-w-[50%]'>
          <H5>eMonitor+</H5>
          <H1 size='sm'>Placeholder for title</H1>
        </PageHeaderContent>
      </PageHeader>
      <section id='about'>
        <Banner
          backgroundColor='foreground'
          bodyGap='base'
          bodyMaxWidth='full'
          padding='none'
          sidebarWidth='base'
          className='px-4 py-16 sm:px-12 sm:py-24 lg:px-32 lg:py-60'
        >
          <BannerBody>
            <BannerBodySidebar>
              <H2>About</H2>
            </BannerBodySidebar>
            <BannerBodyContent>
              <H4>
                Lorem ipsum dolor sit amet consectetur. Faucibus venenatis lorem nunc egestas. Nisl
                faucibus mi eget ac cras amet a. Facilisi arcu duis dapibus elementum arcu. Pulvinar
                tortor egestas tortor orci.
              </H4>
            </BannerBodyContent>
          </BannerBody>
        </Banner>
      </section>
      <Spacer size='8xl' />
      <section
        id='stats'
        className='mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-4 sm:px-6 lg:px-8'
      >
        <H2>Key stats</H2>
        <Grid gap='24px' noOfCol={{ base: 1, sm: 2, md: 4 }}>
          <GridItem noOfColSpan={{ base: 1, sm: 2 }}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>25%</StatCardValue>
              <StatCardTitle>people</StatCardTitle>
              <StatCardDescription>Lorem ipsum dolor sit amet</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>25%</StatCardValue>
              <StatCardTitle>people</StatCardTitle>
              <StatCardDescription>Lorem ipsum dolor sit amet</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>25%</StatCardValue>
              <StatCardTitle>people</StatCardTitle>
              <StatCardDescription>Lorem ipsum dolor sit amet</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>25%</StatCardValue>
              <StatCardTitle>people</StatCardTitle>
              <StatCardDescription>Lorem ipsum dolor sit amet</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>25%</StatCardValue>
              <StatCardTitle>people</StatCardTitle>
              <StatCardDescription>Lorem ipsum dolor sit amet</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={{ base: 1, sm: 2 }}>
            <StatCard
              hoverColor='yellow'
              size='full'
              className='col-span-1 min-h-45 sm:min-h-60 md:col-span-2'
            >
              <StatCardValue>25%</StatCardValue>
              <StatCardTitle>people</StatCardTitle>
              <StatCardDescription>Lorem ipsum dolor sit amet</StatCardDescription>
            </StatCard>
          </GridItem>
        </Grid>
      </section>
      <Spacer size='8xl' />
      <section
        id='projects'
        className='mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-4 sm:px-6 lg:px-8'
      >
        <H2>Projects</H2>
        <Carousel>
          {projectCards.map((card) => (
            <CarouselItem size='xs' key={card.title}>
              <Link to='/projects/$projectId' params={{ projectId: card.id }}>
                <Card
                  className='h-full'
                  backgroundColor='background'
                  size='full'
                  variant='with-image'
                >
                  <CardHeader>
                    <CardImage src={card.image} />
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.text}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button padding='none' variant='link'>
                      <a href={card.url} target='_blank' rel='noopener'>
                        Read more
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </Carousel>
      </section>
      <Spacer size='8xl' />
      <section
        id='quote'
        className='flex w-3/4 flex-col gap-10 bg-accent-yellow px-4 py-20 sm:px-6 lg:px-20'
      >
        <H4>
          [A placeholder for quote] Lorem ipsum dolor sit amet consectetur. Accumsan volutpat id hac
          tincidunt rhoncus sollicitudin amet vel ut. Non suspendisse pellentesque tincidunt at.
          Cras habitant libero sed in nec senectus interdum eu ultrices.
        </H4>
        <Blockquote>— John Doe</Blockquote>
      </section>
      <Spacer size='8xl' />
      <section id='map-viz' className='bg-primary-gray-300 p-4 sm:p-6 lg:p-8'>
        <div className='mx-auto w-full max-w-[1920px]'>
          <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
            <H2 marginBottom='none' className='min-w-60 grow'>
              Projects by countries
            </H2>
            <div className='flex min-w-60 grow flex-col gap-2'>
              <P size='sm' marginBottom='none'>
                Filter by projects
              </P>
              <Suspense fallback={<div className='h-12 w-full animate-pulse bg-surface' />}>
                <DropdownSelect
                  className='w-full'
                  options={projectCards.map((card) => ({
                    label: card.title,
                    value: card.id,
                  }))}
                  variant='light'
                  isClearable
                  placeholder='All projects'
                  onChange={(value) => {
                    // biome-ignore lint/suspicious/noConsole: Temporary need to be removed in the future
                    console.log(value);
                  }}
                />
              </Suspense>
            </div>
          </div>
          <div className='h-[75vh] w-full'>
            <LazyMount>
              <Suspense fallback={<Skeleton />}>
                <DotDensityMap
                  data={[
                    {
                      lat: 20,
                      long: 10,
                    },
                    {
                      lat: 25,
                      long: 26,
                    },
                    {
                      lat: 0,
                      long: 0,
                    },
                    {
                      lat: 15,
                      long: 5,
                    },
                    {
                      lat: 10,
                      long: 20,
                    },
                  ]}
                  showCostalBorder
                />
              </Suspense>
            </LazyMount>
          </div>
        </div>
      </section>
      <Spacer size='8xl' />
      <section id='featured-stories' className='px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto grid max-w-[1920px] grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='flex items-start p-8 md:col-start-1 md:row-start-1 md:p-12'>
            <H2 className='font-bold md:text-5xl'>
              Featured
              <br />
              stories
            </H2>
          </div>
          <a target='_blank' href='https://www.undp.org/' rel='noopener'>
            <FeaturedCard
              backgroundColor='surface'
              size='full'
              className='min-h-100 md:col-start-2 md:row-start-1'
            >
              <FeaturedCardTitle>Story 1</FeaturedCardTitle>
              <FeaturedCardDescription>
                Lorem ipsum dolor sit amet consectetur. Leo velit in sit leo integer nunc. Massa
                elementum non in integer. Condimentum eget at eget id nullam vel accumsan tortor.
              </FeaturedCardDescription>
              <FeaturedCardFooter>
                <Button padding='none' variant='link'>
                  Read more
                </Button>
              </FeaturedCardFooter>
            </FeaturedCard>
          </a>

          <a target='_blank' href='https://www.undp.org/' rel='noopener'>
            <FeaturedCard
              backgroundColor='surface'
              size='full'
              className='min-h-100 md:col-start-2 md:row-start-1'
            >
              <FeaturedCardTitle>Story 1</FeaturedCardTitle>
              <FeaturedCardDescription>
                Lorem ipsum dolor sit amet consectetur. Leo velit in sit leo integer nunc. Massa
                elementum non in integer. Condimentum eget at eget id nullam vel accumsan tortor.
              </FeaturedCardDescription>
              <FeaturedCardFooter>
                <Button padding='none' variant='link'>
                  Read more
                </Button>
              </FeaturedCardFooter>
            </FeaturedCard>
          </a>
          <a
            target='_blank'
            href='https://www.undp.org/'
            className='md:col-span-2 md:col-start-1 md:row-start-2'
            rel='noopener'
          >
            <FeaturedCard
              backgroundColor='surface'
              size='full'
              className='min-h-100 md:col-start-2 md:row-start-1'
            >
              <FeaturedCardTitle>Story 1</FeaturedCardTitle>
              <FeaturedCardDescription>
                Lorem ipsum dolor sit amet consectetur. Leo velit in sit leo integer nunc. Massa
                elementum non in integer. Condimentum eget at eget id nullam vel accumsan tortor.
              </FeaturedCardDescription>
              <FeaturedCardFooter>
                <Button padding='none' variant='link'>
                  Read more
                </Button>
              </FeaturedCardFooter>
            </FeaturedCard>
          </a>

          <a target='_blank' href='https://www.undp.org/' rel='noopener'>
            <FeaturedCard
              backgroundColor='surface'
              size='full'
              className='min-h-100 md:col-start-2 md:row-start-1'
            >
              <FeaturedCardTitle>Story 1</FeaturedCardTitle>
              <FeaturedCardDescription>
                Lorem ipsum dolor sit amet consectetur. Leo velit in sit leo integer nunc. Massa
                elementum non in integer. Condimentum eget at eget id nullam vel accumsan tortor.
              </FeaturedCardDescription>
              <FeaturedCardFooter>
                <Button padding='none' variant='link'>
                  Read more
                </Button>
              </FeaturedCardFooter>
            </FeaturedCard>
          </a>
        </div>
      </section>
      <Spacer size='8xl' />
    </div>
  );
}

export default App;
