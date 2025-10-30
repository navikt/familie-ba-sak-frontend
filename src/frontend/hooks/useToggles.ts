import { useTogglesContext } from '../context/TogglesContext';

export function useToggles() {
    const { toggles } = useTogglesContext();
    return toggles;
}
