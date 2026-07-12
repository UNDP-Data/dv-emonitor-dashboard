import { Link } from '@tanstack/react-router';
import { DotDensityMap } from '@undp/data-viz/DotDensityMap';
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
import { DropdownSelect } from '@undp/design-system-react/DropdownSelect';
import {
  FeaturedCard,
  FeaturedCardDescription,
  FeaturedCardFooter,
  FeaturedCardTitle,
} from '@undp/design-system-react/FeaturedCard';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { PageHeader, PageHeaderContent } from '@undp/design-system-react/PageHeader';
import { Spacer } from '@undp/design-system-react/Spacer';
import {
  StatCard,
  StatCardDescription,
  StatCardTitle,
  StatCardValue,
} from '@undp/design-system-react/StatCard';
import { Blockquote, H1, H2, H4, H5, P } from '@undp/design-system-react/Typography';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const projectCards = t('projectCards', { returnObjects: true }) as {
    title: string;
    id: string;
    text: string;
    image: string;
    url: string;
  }[];
  return (
    <div className='flex flex-col antialiased'>
      <PageHeader
        className='h-auto px-0 sm:px-2 md:h-[calc(100vh_-_115px)]'
        backgroundImage='imgs/header_img.webp'
        contentMode='dark'
      >
        <PageHeaderContent className='max-w-[100%] sm:max-w-[50%]'>
          <H5>{t('pageTitleSub')}</H5>
          <H1 size='sm'>{t('pageTitle')}</H1>
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
              <H4>{t('aboutText')}</H4>
            </BannerBodyContent>
          </BannerBody>
        </Banner>
      </section>
      <Spacer size='8xl' />
      <section
        id='stats'
        className='mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-4 sm:px-6 lg:px-8'
      >
        <H2>{t('keyStats')}</H2>
        <Grid gap='24px' noOfCol={{ base: 1, sm: 2, md: 4 }}>
          <GridItem noOfColSpan={{ base: 1, sm: 2 }}>
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
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>{t('keyStatsCards.2.value')}</StatCardValue>
              <StatCardTitle>{t('keyStatsCards.2.title')}</StatCardTitle>
              <StatCardDescription>{t('keyStatsCards.2.text')}</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>{t('keyStatsCards.3.value')}</StatCardValue>
              <StatCardTitle>{t('keyStatsCards.3.title')}</StatCardTitle>
              <StatCardDescription>{t('keyStatsCards.3.text')}</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={{ base: 1, sm: 2 }}>
            <StatCard
              hoverColor='yellow'
              size='full'
              className='col-span-1 min-h-[180px] sm:min-h-[240px] md:col-span-2'
            >
              <StatCardValue>{t('keyStatsCards.5.value')}</StatCardValue>
              <StatCardTitle>{t('keyStatsCards.5.title')}</StatCardTitle>
              <StatCardDescription>{t('keyStatsCards.5.text')}</StatCardDescription>
            </StatCard>
          </GridItem>
        </Grid>
      </section>
      <Spacer size='8xl' />
      <section
        id='projects'
        className='mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-4 sm:px-6 lg:px-8'
      >
        <H2>{t('projects')}</H2>
        <Carousel>
          {projectCards.map((card) => (
            <CarouselItem size='xs' key={card.title}>
              <Link to='/projects/$projectId' params={{ projectId: card.id }}>
                <Card className='h-full' backgroundColor='white' size='full' variant='with-image'>
                  <CardHeader>
                    <CardImage src={card.image} />
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.text}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button padding='none' variant='link'>
                      <a href={card.url} target='_blank' rel='noopener'>
                        {t('readMore')}
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
        <H4>{t('quote')}</H4>
        <Blockquote>— Name Surname</Blockquote>
      </section>
      <Spacer size='8xl' />
      <section id='map-viz' className='bg-primary-gray-300 p-4 sm:p-6 lg:p-8'>
        <div className='mx-auto w-full max-w-[1920px]'>
          <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
            <H2 marginBottom='none' className='min-w-[240px] grow'>
              {t('mapTitle')}
            </H2>
            <div className='flex min-w-[240px] grow flex-col gap-2'>
              <P size='sm' marginBottom='none'>
                {t('filterByProjects')}
              </P>
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
                  console.log(value);
                }}
              />
            </div>
          </div>
          <div className='h-[75vh] w-full'>
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
              colors='#0FABA2'
              mapBorderColor='#fff'
              mapNoDataColor='#fff'
            />
          </div>
        </div>
      </section>
      <Spacer size='8xl' />
      <section id='featured-stories' className='px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto grid max-w-[1920px] grid-cols-1 gap-1 gap-6 md:grid-cols-3'>
          <div className='flex items-start p-8 md:col-start-1 md:row-start-1 md:p-12'>
            <H2 className='font-bold md:text-5xl'>
              {t('featured')}
              <br />
              {t('stories')}
            </H2>
          </div>
          <a target='_blank' href='https://www.undp.org/' rel='noopener'>
            <FeaturedCard
              backgroundColor='gray'
              size='full'
              className='min-h-[400px] md:col-start-2 md:row-start-1'
            >
              <FeaturedCardTitle>{t('storyCards.0.title')}</FeaturedCardTitle>
              <FeaturedCardDescription>{t('storyCards.0.text')}</FeaturedCardDescription>
              <FeaturedCardFooter>
                <Button padding='none' variant='link'>
                  {t('readMore')}
                </Button>
              </FeaturedCardFooter>
            </FeaturedCard>
          </a>

          <a target='_blank' href='https://www.undp.org/' rel='noopener'>
            <FeaturedCard
              backgroundColor='gray'
              size='full'
              className='min-h-[400px] md:col-start-2 md:row-start-1'
            >
              <FeaturedCardTitle>{t('storyCards.1.title')}</FeaturedCardTitle>
              <FeaturedCardDescription>{t('storyCards.1.text')}</FeaturedCardDescription>
              <FeaturedCardFooter>
                <Button padding='none' variant='link'>
                  {t('readMore')}
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
              backgroundColor='gray'
              size='full'
              className='min-h-[400px] md:col-start-2 md:row-start-1'
            >
              <FeaturedCardTitle>{t('storyCards.2.title')}</FeaturedCardTitle>
              <FeaturedCardDescription>{t('storyCards.2.text')}</FeaturedCardDescription>
              <FeaturedCardFooter>
                <Button padding='none' variant='link'>
                  {t('readMore')}
                </Button>
              </FeaturedCardFooter>
            </FeaturedCard>
          </a>

          <a target='_blank' href='https://www.undp.org/' rel='noopener'>
            <FeaturedCard
              backgroundColor='gray'
              size='full'
              className='min-h-[400px] md:col-start-2 md:row-start-1'
            >
              <FeaturedCardTitle>{t('storyCards.3.title')}</FeaturedCardTitle>
              <FeaturedCardDescription>{t('storyCards.3.text')}</FeaturedCardDescription>
              <FeaturedCardFooter>
                <Button padding='none' variant='link'>
                  {t('readMore')}
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
