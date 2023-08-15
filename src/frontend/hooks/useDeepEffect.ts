import type { DependencyList, EffectCallback } from 'react';
import { useEffect, useRef } from 'react';

import deepEqual from 'deep-equal';

const useDeepEffect = (fn: EffectCallback, deps: DependencyList) => {
    const isFirst = useRef(true);
    const prevDeps = useRef(deps);

    useEffect(() => {
        const isFirstEffect = isFirst.current;
        const isSame = prevDeps.current.every((obj, index) => deepEqual(obj, deps[index]));
        isFirst.current = false;
        prevDeps.current = deps;
        if (isFirstEffect || !isSame) {
            return fn();
        }
    }, deps);
};

export default useDeepEffect;
