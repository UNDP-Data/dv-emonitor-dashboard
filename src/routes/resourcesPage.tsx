import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { Button } from '@undp/design-system-react/Button';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import {
  ResourceCard,
  ResourceCardContent,
  ResourceCardDescription,
  ResourceCardFooter,
  ResourceCardImage,
  ResourceCardTitle,
} from '@undp/design-system-react/ResourceCard';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1 } from '@undp/design-system-react/Typography';
import { useTranslation } from 'react-i18next';

export function Resource() {
  const { t } = useTranslation();
  const resourceCards = t('resourceCards', { returnObjects: true }) as {
    title: string;
    text: string;
    image: string;
    url: string;
  }[];
  return (
    <div className='mx-auto my-8 w-full max-w-[1920px] px-4'>
      <H1 size='sm'>{t('resources')}</H1>
      <Spacer size='2xl' />
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
    </div>
  );
}

export default function createAboutRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/resources',
    component: Resource,
    getParentRoute: () => parentRoute,
  });
}
