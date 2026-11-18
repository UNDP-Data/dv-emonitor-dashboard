import { createLazyRoute } from '@tanstack/react-router';
import { Button } from '@undp/design-system-react/Button';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import {
  ResourceCard,
  ResourceCardContent,
  ResourceCardDescription,
  ResourceCardFooter,
  ResourceCardTitle,
} from '@undp/design-system-react/ResourceCard';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1 } from '@undp/design-system-react/Typography';
import { Section } from '@/components/Section';
import { DEFENDER_RESOURCES } from '@/constants';

export function Resource() {
  return (
    <Section>
      <H1 size='sm'>Resources</H1>
      <Spacer size='2xl' />
      <Grid noOfCol={{ base: 1, sm: 2, md: 4, lg: 6 }}>
        {DEFENDER_RESOURCES.map((card) => (
          <GridItem key={card.title}>
            <ResourceCard href={card.url}>
              <ResourceCardContent>
                <ResourceCardTitle>{card.title}</ResourceCardTitle>
                <ResourceCardDescription>{card.text}</ResourceCardDescription>
              </ResourceCardContent>
              <ResourceCardFooter>
                <Button variant='link'>Read more</Button>
              </ResourceCardFooter>
            </ResourceCard>
          </GridItem>
        ))}
      </Grid>
    </Section>
  );
}

export const Route = createLazyRoute('/resources')({
  component: Resource,
});
