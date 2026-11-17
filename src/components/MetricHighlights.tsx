import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { H4, P } from '@undp/design-system-react/Typography';

export default function MetricHighlights({
  items,
}: {
  items: { value: string | number; description: React.ReactNode }[];
}) {
  return (
    <Grid noOfCol={2}>
      {items.map((el, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: not changing
        <GridItem noOfColSpan={1} key={i}>
          <div>
            <H4 marginBottom='none' weight='bold'>
              {el.value}
            </H4>
            <P size='base'>{el.description}</P>
          </div>
        </GridItem>
      ))}
    </Grid>
  );
}
