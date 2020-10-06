export const behandendeEnheter: IArbeidsfordelingsenhet[] = [
    { enhetId: '2103', enhetNavn: 'NAV Vikafossen' },
    { enhetId: '4806', enhetNavn: 'NAV Familie- og pensjonsytelser Drammen' },
    { enhetId: '4820', enhetNavn: 'NAV Familie- og pensjonsytelser Vadsø' },
    { enhetId: '4833', enhetNavn: 'NAV Familie- og pensjonsytelser Oslo 1' },
    { enhetId: '4842', enhetNavn: 'NAV Familie- og pensjonsytelser Stord' },
    { enhetId: '4847', enhetNavn: 'NAV Familie- og pensjonsytelser Levanger' },
];

export interface IArbeidsfordelingsenhet {
    enhetId: string;
    enhetNavn: string;
}

export interface IRestEndreBehandlendeEnhet {
    enhetId: string;
    begrunnelse: string;
}
