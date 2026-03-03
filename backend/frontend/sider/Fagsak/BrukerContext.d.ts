import React, { type PropsWithChildren } from 'react';
import type { IPersonInfo } from '../../typer/person';
interface BrukerContext {
    bruker: IPersonInfo;
}
interface Props extends PropsWithChildren {
    bruker: IPersonInfo;
}
declare const BrukerContext: React.Context<BrukerContext | undefined>;
export declare function BrukerProvider({ bruker, children }: Props): React.JSX.Element;
export declare function useBrukerContext(): BrukerContext;
export {};
