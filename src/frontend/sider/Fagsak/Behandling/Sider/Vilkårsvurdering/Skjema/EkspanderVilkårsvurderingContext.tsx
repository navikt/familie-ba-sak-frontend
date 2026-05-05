import { createContext, useContext } from 'react';

import { useToggle } from '@hooks/useToggle';

interface Context {
    ekspandert: boolean;
    ekspander: () => void;
}

const Context = createContext<Context | undefined>(undefined);

interface Props {
    starterEkspandert?: boolean;
    children: React.ReactNode | ((value: Context) => React.ReactNode);
}

export function EkspanderVilkårsvurderingProvider({ starterEkspandert = false, children }: Props) {
    const [ekspandert, ekspander] = useToggle(starterEkspandert);

    const value = { ekspandert, ekspander };

    return (
        <Context.Provider value={value}>{typeof children === 'function' ? children(value) : children}</Context.Provider>
    );
}
export function useEkspanderVilkårsvurderingContext() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useEkspanderVilkårsvurderingContext må brukes innenfor en EkspanderVilkårsvurderingProvider.');
    }
    return context;
}
