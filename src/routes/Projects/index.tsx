import type { AnyRoute } from '@tanstack/react-router';
import { createRoute, Link } from '@tanstack/react-router';
import { Button } from '@undp/design-system-react/Button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from '@undp/design-system-react/Card';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1 } from '@undp/design-system-react/Typography';
import { useTranslation } from 'react-i18next';

export function ProjectsListing() {
  const { t } = useTranslation();
  const projectCards = t('projectCards', { returnObjects: true }) as {
    title: string;
    id: string;
    text: string;
    image: string;
    url: string;
  }[];
  return (
    <div className='mx-auto my-8 w-full max-w-[1920px] px-4'>
      <H1 size='sm'>{t('projects')}</H1>
      <Spacer size='2xl' />
      <Grid noOfCol={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        {projectCards.map((card) => (
          <GridItem key={card.title}>
            <Link to='/{-$locale}/projects/$projectId' params={{ projectId: card.id }}>
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
          </GridItem>
        ))}
      </Grid>
    </div>
  );
}

export default function createProjectRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/projects',
    component: ProjectsListing,
    getParentRoute: () => parentRoute,
  });
}
