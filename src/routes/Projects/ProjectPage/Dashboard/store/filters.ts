import { create } from 'zustand';

type Actions = {
  setSelectedCountry: (selectedCountry: { value: string; label: string }) => void;
  setAnalysisType: (analysisType: 'human' | 'ai') => void;
  setFromDate: (fromDate?: Date) => void;
  setToDate: (toDate?: Date) => void;
  setContainsHateSpeech: (containsHateSpeech: boolean) => void;
  setIsTFGBV: (isTFGBV: boolean) => void;
  setSelectedAffiliation: (selectedAffiliation: { value: string; label: string }[]) => void;
};

type Store = {
  selectedCountry: { value: string; label: string };
  fromDate?: Date;
  toDate?: Date;
  containsHateSpeech: boolean;
  isTFGBV: boolean;
  selectedAffiliation: { value: string; label: string }[];
  analysisType: 'human' | 'ai';
  actions: Actions;
};

export const useFilterStore = create<Store>((set) => ({
  selectedCountry: { value: 'IDN', label: 'Indonesia' },
  fromDate: undefined,
  toDate: undefined,
  containsHateSpeech: false,
  isTFGBV: false,
  selectedAffiliation: [],
  analysisType: 'human',
  actions: {
    setSelectedCountry: (selectedCountry: { value: string; label: string }) =>
      set({ selectedCountry }),
    setAnalysisType: (analysisType: 'human' | 'ai') => set({ analysisType }),
    setFromDate: (fromDate?: Date) => set({ fromDate }),
    setToDate: (toDate?: Date) => set({ toDate }),
    setContainsHateSpeech: (containsHateSpeech: boolean) => set({ containsHateSpeech }),
    setIsTFGBV: (isTFGBV: boolean) => set({ isTFGBV }),
    setSelectedAffiliation: (selectedAffiliation: { value: string; label: string }[]) =>
      set({ selectedAffiliation }),
  },
}));

export const useSelectedCountry = () => useFilterStore((s) => s.selectedCountry);
export const useFromDate = () => useFilterStore((s) => s.fromDate);
export const useToDate = () => useFilterStore((s) => s.toDate);
export const useContainsHateSpeech = () => useFilterStore((s) => s.containsHateSpeech);
export const useIsTFGBV = () => useFilterStore((s) => s.isTFGBV);
export const useSelectedAffiliation = () => useFilterStore((s) => s.selectedAffiliation);
export const useAnalysisType = () => useFilterStore((s) => s.analysisType);

export const useFilterActions = () => useFilterStore((s) => s.actions);
