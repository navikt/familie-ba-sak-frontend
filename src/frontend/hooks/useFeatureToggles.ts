import { useFeatureTogglesContext } from '@context/FeatureTogglesContext';

export function useFeatureToggles() {
    const { featureToggles } = useFeatureTogglesContext();
    return featureToggles;
}
