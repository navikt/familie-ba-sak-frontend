import { FamilieCheckbox } from '@navikt/familie-form-elements';
import moment from 'moment';
import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { Feilmelding } from 'nav-frontend-typografi';
import React from 'react';
import { useManuellJournalføring } from '../../context/ManuellJournalføringContext';
import Pluss from '../../ikoner/Pluss';
import { IBehandling } from '../../typer/behandling';
import { IDataForManuellJournalføring } from '../../typer/manuell-journalføring';
import { datoformat, formaterDato } from '../../utils/formatter';

interface IKnyttTilBehandlingProps {
    aktivBehandlingFinnes: boolean;
    dataForManuellJournalføring: IDataForManuellJournalføring;
    onClickOpprett: (dataForManuellJournalføring: IDataForManuellJournalføring) => void;
    opprettBehandlingFeilmelding: string | undefined;
}

export const KnyttTilBehandling: React.FC<IKnyttTilBehandlingProps> = ({
    aktivBehandlingFinnes,
    dataForManuellJournalføring,
    onClickOpprett,
    opprettBehandlingFeilmelding,
}) => {
    const behandlinger = dataForManuellJournalføring.fagsak?.behandlinger.sort((a, b) =>
        moment(b.opprettetTidspunkt).diff(moment(a.opprettetTidspunkt))
    );

    const {
        tilknyttedeBehandlingIder,
        settTilknyttedeBehandlingIder,
        feilmeldinger,
        visFeilmeldinger,
        innsendingsfeilmelding,
    } = useManuellJournalføring();

    return (
        <>
            {!aktivBehandlingFinnes && (
                <div className={'journalføring__opprett-behandling'}>
                    <AlertStripe type="info">
                        {(behandlinger && behandlinger.length > 0
                            ? 'Det finnes ingen åpne behandlinger på denne brukeren.'
                            : 'Det er ikke registrert tidligere behandlinger på denne brukeren.') +
                            ' For å koble dokumentasjonen til en behandling, "Opprett ny behandling", eller journalfør uten å opprette behandling. '}
                    </AlertStripe>
                    <KnappBase
                        aria-label={`utfør_opprettfagsakogbehandlingvedjournalføring}`}
                        className={'ikon-knapp'}
                        id={'d'}
                        onClick={() => {
                            onClickOpprett(dataForManuellJournalføring);
                        }}
                        type="flat"
                        kompakt={true}
                    >
                        <Pluss />
                        {'Opprett ny behandling'}
                    </KnappBase>
                    {opprettBehandlingFeilmelding && (
                        <Feilmelding>{opprettBehandlingFeilmelding}</Feilmelding>
                    )}
                </div>
            )}
            {behandlinger && behandlinger.length > 0 && (
                <table className="tabell">
                    <thead className="tabell__head">
                        <tr className="tabell__head__tr">
                            <th>{'Behandlingstype'}</th>
                            <th>{'Status'}</th>
                            <th>{'Dato'}</th>
                        </tr>
                    </thead>
                    <tbody className="tabell__body">
                        {behandlinger.map((behandling: IBehandling) => (
                            <tr key={behandling.behandlingId}>
                                <td className={'behandlingliste__tabell--behandlingtype'}>
                                    <FamilieCheckbox
                                        erLesevisning={false}
                                        label={behandling.type}
                                        checked={tilknyttedeBehandlingIder.includes(
                                            behandling.behandlingId
                                        )}
                                        onChange={() => {
                                            const id = behandling.behandlingId;
                                            if (
                                                tilknyttedeBehandlingIder.includes(
                                                    behandling.behandlingId
                                                )
                                            ) {
                                                settTilknyttedeBehandlingIder(
                                                    tilknyttedeBehandlingIder.filter(
                                                        tilknyttedeBehandlingId =>
                                                            tilknyttedeBehandlingId !== id
                                                    )
                                                );
                                            } else {
                                                settTilknyttedeBehandlingIder([
                                                    ...tilknyttedeBehandlingIder,
                                                    id,
                                                ]);
                                            }
                                        }}
                                    />
                                </td>
                                <td className={'behandlingliste__tabell--status'}>
                                    {behandling.status}
                                </td>
                                <td className={'behandlingliste__tabell--dato'}>
                                    {formaterDato(
                                        moment(behandling.opprettetTidspunkt),
                                        datoformat.DATO_FORKORTTET
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {feilmeldinger.length > 0 && visFeilmeldinger && (
                <Feiloppsummering
                    tittel={'For å gå videre må du rette opp følgende:'}
                    feil={feilmeldinger}
                />
            )}
            {visFeilmeldinger && <Feilmelding children={innsendingsfeilmelding} />}
        </>
    );
};
