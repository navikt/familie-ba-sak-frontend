import type { FieldDictionary } from '@navikt/familie-skjema';
import type { UseSkjemaVerdi } from '@navikt/familie-skjema/dist/typer';
import type { IBehandling } from '../../../../../typer/behandling';
export type BrevmottakerUseSkjema = UseSkjemaVerdi<ILeggTilFjernBrevmottakerSkjemaFelter, IBehandling>;
interface Props {
    eksisterendeMottakere: SkjemaBrevmottaker[];
}
export declare enum Mottaker {
    BRUKER_MED_UTENLANDSK_ADRESSE = "BRUKER_MED_UTENLANDSK_ADRESSE",
    FULLMEKTIG = "FULLMEKTIG",
    VERGE = "VERGE",
    DØDSBO = "D\u00D8DSBO"
}
export declare const mottakerVisningsnavn: Record<Mottaker, string>;
interface ILeggTilFjernBrevmottakerSkjemaFelter {
    mottaker: Mottaker | '';
    navn: string;
    adresselinje1: string;
    adresselinje2: string;
    postnummer: string;
    poststed: string;
    land: string;
}
export interface SkjemaBrevmottaker {
    type: Mottaker;
    navn: string;
    adresselinje1: string;
    adresselinje2?: string;
    postnummer?: string;
    poststed?: string;
    landkode: string;
}
export interface IRestBrevmottaker extends SkjemaBrevmottaker {
    id: number;
}
export declare const useBrevmottakerSkjema: ({ eksisterendeMottakere }: Props) => {
    verdierFraBrevmottakerUseSkjema: BrevmottakerUseSkjema;
    navnErPreutfylt: boolean;
};
export declare const felterTilSkjemaBrevmottaker: (felter: FieldDictionary<ILeggTilFjernBrevmottakerSkjemaFelter>) => SkjemaBrevmottaker;
export {};
