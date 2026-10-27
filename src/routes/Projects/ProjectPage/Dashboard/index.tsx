import { Button } from '@undp/design-system-react/Button';
import { DateRangePicker } from '@undp/design-system-react/DateRangePicker';
import { DropdownSelect } from '@undp/design-system-react/DropdownSelect';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { SegmentedControl } from '@undp/design-system-react/SegmentedControl';
import { Spacer } from '@undp/design-system-react/Spacer';
import { Switch } from '@undp/design-system-react/Switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@undp/design-system-react/Tabs';
import { H3, H5, H6, P } from '@undp/design-system-react/Typography';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { GeneralAnalysisDashboard } from './generalAnalysis';
import { TFGBVAnalysisDashboard } from './tfgbvAnalysis';

export function Dashboard({ countryList }: { countryList: { value: string; label: string }[] }) {
  const [selectedCountry, setSelectedCountry] = useState(countryList[0]);
  const [analysisType, setAnalysisType] = useState<'human' | 'ai'>('human');
  const [dataRange, setDataRange] = useState<[Date | undefined, Date | undefined]>([
    undefined,
    undefined,
  ]);
  const [onlyContainsHateSpeech, setOnlyContainsHateSpeech] = useState(false);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(innerWidth > 620);
  return (
    <div className='mx-auto w-full max-w-[1920px]'>
      <H5>Data Explorer</H5>
      <div className='flex items-center gap-2'>
        <H3 marginBottom='none'>Explore data for</H3>
        <DropdownSelect
          variant='light'
          value={selectedCountry}
          onChange={(v) => setSelectedCountry(v as { label: string; value: string })}
          options={countryList}
          isSearchable={false}
          classNames={{
            container: () => 'inline-block',
            control: () =>
              'inline-flex items-center gap-1.5 cursor-pointer bg-transparent! border-0! shadow-none! p-0!',
            valueContainer: () => 'p-0!',
            singleValue: () =>
              'text-h3-xs md:text-h3-sm lg:text-h3 font-bold text-secondary! underline decoration-dotted decoration-2 underline-offset-3 overflow-visible',
            input: () => 'text-h3-xs md:text-h3-sm lg:text-h3 font-bold text-secondary!',
            indicatorSeparator: () => 'hidden',
          }}
        />
      </div>
      <Spacer size='2xl' />
      <Grid
        gap='32px'
        noOfCol={{
          base: 1,
          md: 2,
          lg: 3,
          xl: 4,
          '2xl': 5,
          sm: 1,
        }}
      >
        <GridItem noOfColSpan={1}>
          <div className='undp-scrollbar sticky top-10 max-h-auto max-h-auto bg-background p-4 md:max-h-[calc(100vh-5rem)]'>
            <div className='flex justify-between'>
              <div className='flex gap-4'>
                <H6 marginBottom='none' className='mt-1'>
                  Filter data
                </H6>
              </div>
              <Button
                padding='none'
                variant='icon'
                className='bg-transparent'
                endIcon='none'
                onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              >
                {!isFiltersExpanded ? <Plus /> : <Minus />}
              </Button>
            </div>
            <div className={isFiltersExpanded ? '' : 'hidden'}>
              <Spacer size='lg' />
              <div className='flex w-full flex-col flex-wrap items-center gap-4'>
                <div className='w-full'>
                  <P size='sm' marginBottom='3xs' weight='bold'>
                    Type of analysis
                  </P>
                  <SegmentedControl
                    options={[
                      { value: 'human', label: 'Human-validated' },
                      { value: 'ai', label: 'AI-assisted' },
                    ]}
                    onValueChange={(val) => setAnalysisType(val as 'human' | 'ai')}
                    value={analysisType}
                    variant='light'
                  />
                </div>
                <div className='w-full'>
                  <P size='sm' marginBottom='3xs' weight='bold'>
                    Date
                  </P>
                  <DateRangePicker
                    inputSize='base'
                    numberOfMonths={2}
                    rounded='base'
                    variant='light'
                    value={{ from: dataRange[0], to: dataRange[1] }}
                    onValueChange={(d) => {
                      setDataRange([d.from, d.to]);
                    }}
                  />
                </div>
                <div className='flex w-full items-center justify-between'>
                  <P size='sm' marginBottom='none' weight='bold'>
                    Contains hate speech
                  </P>
                  <Switch
                    size='small'
                    checked={onlyContainsHateSpeech}
                    onCheckedChange={(checked) => setOnlyContainsHateSpeech(checked)}
                  />
                </div>
                <div className='flex w-full items-center justify-between'>
                  <P size='sm' marginBottom='3xs' weight='bold'>
                    TFGBV related
                  </P>
                  <Switch
                    size='small'
                    checked={onlyContainsHateSpeech}
                    onCheckedChange={(checked) => setOnlyContainsHateSpeech(checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </GridItem>
        <GridItem
          noOfColSpan={{
            base: 1,
            md: 1,
            lg: 2,
            xl: 3,
            '2xl': 4,
            sm: 1,
          }}
        >
          <Tabs color='primary' defaultValue='tab 1' className='pl-0!'>
            <TabsList className='pl-0!'>
              <TabsTrigger value='tab 1'>General analysis</TabsTrigger>
              <TabsTrigger value='tab 2'>TFGBV analysis</TabsTrigger>
            </TabsList>
            <TabsContent value='tab 1'>
              <GeneralAnalysisDashboard />
            </TabsContent>
            <TabsContent value='tab 2'>
              <TFGBVAnalysisDashboard />
            </TabsContent>
          </Tabs>
        </GridItem>
      </Grid>
    </div>
  );
}
