import React from 'react';

import { FagsakType } from '../../../../typer/fagsak';
import type { IInstitusjon } from '../../../../typer/institusjon-og-verge';
import { type IGrunnlagPerson, PersonType } from '../../../../typer/person';
import { formaterIdent, lagPersonLabel } from '../../../../utils/formatter';
import {
    type IRestBrevmottaker,
    Mottaker,
} from '../../../Fagsak/Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useLeggTilFjernBrevmottaker';

interface IProps {
    personer: IGrunnlagPerson[];
    institusjon: IInstitusjon | undefined;
    brevmottakere: IRestBrevmottaker[];
    fagsakType?: FagsakType;
}

const BrevmottakerListe: React.FC<IProps> = ({
    personer,
    institusjon,
    brevmottakere,
    fagsakType,
}) => {
    const skalViseInstitusjon = !!institusjon;
    const harUtenlandskAdresse = brevmottakere.some(
        mottaker => mottaker.type === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE
    );
    const harFullmektig = brevmottakere.some(mottaker => mottaker.type === Mottaker.FULLMEKTIG);
    const harVerge = brevmottakere.some(mottaker => mottaker.type === Mottaker.VERGE);
    const harManuellDødsboadresse = brevmottakere.some(
        mottaker => mottaker.type === Mottaker.DØDSBO
    );

    const søker = personer.find(person => person.type === PersonType.SØKER);
    const skalViseSøker =
        søker && !institusjon && !harManuellDødsboadresse && !harUtenlandskAdresse;

    const skalViseEnsligMindreårig = fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG;

    return (
        <ul>
            {skalViseSøker && (
                <li key="søker">{lagPersonLabel(søker.personIdent || '', personer)}</li>
            )}
            {skalViseEnsligMindreårig && (
                <li key="barnet">
                    {lagPersonLabel(
                        personer.find(person => person.type === PersonType.BARN)?.personIdent || '',
                        personer
                    )}
                </li>
            )}
            {skalViseInstitusjon && (
                <li key="institusjon">{`Institusjon | ${
                    institusjon.navn?.concat(' |') || ''
                } ${formaterIdent(institusjon.orgNummer)}`}</li>
            )}
            {harUtenlandskAdresse && !harFullmektig && søker && (
                <li key="utenlandsk-adresse">
                    {lagPersonLabel(søker.personIdent, personer)} | Utenlandsk adresse
                </li>
            )}
            {harUtenlandskAdresse && harFullmektig && søker && (
                <li key="kort-utenlandsk-adresse">
                    {søker.navn} | {formaterIdent(søker.personIdent)} | Utenlandsk adresse
                </li>
            )}
            {harManuellDødsboadresse && søker && <li key="dødsbo">{søker.navn} | Dødsbo</li>}
            {harFullmektig &&
                brevmottakere
                    .filter(mottaker => mottaker.type === Mottaker.FULLMEKTIG)
                    .map(mottaker => (
                        <li key={`fullmektig-${mottaker.id}`}>{mottaker.navn} | Fullmektig</li>
                    ))}
            {harVerge &&
                brevmottakere
                    .filter(mottaker => mottaker.type === Mottaker.VERGE)
                    .map(mottaker => <li key={`verge-${mottaker.id}`}>{mottaker.navn} | Verge</li>)}
        </ul>
    );
};

export default BrevmottakerListe;
