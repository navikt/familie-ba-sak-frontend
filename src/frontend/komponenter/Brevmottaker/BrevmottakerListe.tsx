import { useBruker } from '@hooks/useBruker';
import { useFagsak } from '@hooks/useFagsak';
import type { Brevmottaker } from '@typer/brevmottaker';
import { Brevmottakertype } from '@typer/brevmottaker';
import { FagsakType } from '@typer/fagsak';
import { formaterIdent, lagBrukerLabel } from '@utils/formatter';

interface Props {
    brevmottakere: Brevmottaker[];
    institusjonNavn?: string;
}

export function BrevmottakerListe({ brevmottakere, institusjonNavn }: Props) {
    const fagsak = useFagsak();
    const bruker = useBruker();

    const institusjon = fagsak.institusjon;
    const fagsakType = fagsak.fagsakType;
    const vistInstitusjonNavn = institusjonNavn ?? institusjon?.navn;

    const skalViseInstitusjon = !!institusjon;
    const harUtenlandskAdresse = brevmottakere.some(
        mottaker => mottaker.type === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE
    );
    const harFullmektig = brevmottakere.some(mottaker => mottaker.type === Brevmottakertype.FULLMEKTIG);
    const harVerge = brevmottakere.some(mottaker => mottaker.type === Brevmottakertype.VERGE);
    const harManuellDødsboadresse = brevmottakere.some(mottaker => mottaker.type === Brevmottakertype.DØDSBO);

    const skalViseSøker = !institusjon && !harManuellDødsboadresse && !harUtenlandskAdresse;
    const skalViseEnsligMindreårig = fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG;

    return (
        <ul>
            {(skalViseSøker || skalViseEnsligMindreårig) && <li key="søker">{lagBrukerLabel(bruker)}</li>}
            {harUtenlandskAdresse && !harFullmektig && (
                <li key="utenlandsk-adresse">{lagBrukerLabel(bruker)} | Utenlandsk adresse</li>
            )}
            {harUtenlandskAdresse && harFullmektig && (
                <li key="kort-utenlandsk-adresse">
                    {bruker.navn} | {formaterIdent(bruker.personIdent)} | Utenlandsk adresse
                </li>
            )}
            {harManuellDødsboadresse && <li key="dødsbo">{bruker.navn} | Dødsbo</li>}
            {skalViseInstitusjon && (
                <li key="institusjon">{`Institusjon | ${
                    vistInstitusjonNavn?.concat(' |') || ''
                } ${formaterIdent(institusjon.orgNummer)}`}</li>
            )}
            {harFullmektig &&
                brevmottakere
                    .filter(mottaker => mottaker.type === Brevmottakertype.FULLMEKTIG)
                    .map(mottaker => <li key={`fullmektig-${mottaker.navn}`}>{mottaker.navn} | Fullmektig</li>)}
            {harVerge &&
                brevmottakere
                    .filter(mottaker => mottaker.type === Brevmottakertype.VERGE)
                    .map(mottaker => <li key={`verge-${mottaker.navn}`}>{mottaker.navn} | Verge</li>)}
        </ul>
    );
}
