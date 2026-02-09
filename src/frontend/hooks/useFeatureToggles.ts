import { useFeatureTogglesContext } from '../context/TogglesContext';

export function useFeatureToggles() {
    const { featureToggles } = useFeatureTogglesContext();
    return featureToggles;
}
