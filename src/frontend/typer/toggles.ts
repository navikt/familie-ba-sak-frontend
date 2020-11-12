export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    visTekniskOpphør = 'familie-ba-sak.behandling.vis-teknisk-opphoer',
    visHenleggelse = 'familie-ba-sak.behandling.aktiver-henleggelse',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
