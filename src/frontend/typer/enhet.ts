import { erProd } from '../utils/miljø';

export const behandendeEnheter: IArbeidsfordelingsenhet[] = [
    { enhetId: '2103', enhetNavn: 'NAV Vikafossen' },
    { enhetId: '4806', enhetNavn: 'NAV Familie- og pensjonsytelser Drammen' },
    { enhetId: '4820', enhetNavn: 'NAV Familie- og pensjonsytelser Vadsø' },
    { enhetId: '4833', enhetNavn: 'NAV Familie- og pensjonsytelser Oslo 1' },
    { enhetId: '4842', enhetNavn: 'NAV Familie- og pensjonsytelser Stord' },
    { enhetId: '4817', enhetNavn: 'NAV Familie- og pensjonsytelser Steinkjer' },
];

export const enhetsgrupper: Record<string, string> = {
    '2103': '833f1f77-b64b-4708-b479-389ca4009af5',
    '4806': 'c2cf4114-1f5d-47f2-bb6e-c7a06fd26412',
    '4820': '6c8c5d93-0e08-4bd8-960c-5c4c0ce5c609',
    '4833': '9cd89ac3-5587-46ba-b571-a625f2af481d',
    '4842': '7af5f216-6a5e-4228-9c99-687658c5b957',
    '4817': '0feaea21-ada1-48c0-9300-3f6aec36b993',
};

export interface IArbeidsfordelingsenhet {
    enhetId: string;
    enhetNavn: string;
}

export interface IRestEndreBehandlendeEnhet {
    enhetId: string;
    begrunnelse: string;
}

export const harTilgangTilEnhet = (
    enhet: string,
    grupper: string[],
    alltidTilgang: () => boolean = () => !erProd()
): boolean => {
    const enhetsgruppe: string | undefined = enhetsgrupper[enhet];

    if (!enhetsgruppe) return true;

    return alltidTilgang() ? true : grupper.includes(enhetsgruppe);
};
