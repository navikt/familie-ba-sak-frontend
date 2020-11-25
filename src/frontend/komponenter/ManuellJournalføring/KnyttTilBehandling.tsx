import { FamilieCheckbox } from '@navikt/familie-form-elements';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import dayjs from 'dayjs';
import AlertStripe from 'nav-frontend-alertstriper';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { Feilmelding } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useManuellJournalføring } from '../../context/ManuellJournalføringContext';
import Pluss from '../../ikoner/Pluss';
import {
    BehandlingKategori,
    BehandlingStatus,
    Behandlingstype,
    BehandlingUnderkategori,
    BehandlingÅrsak,
    IBehandling,
} from '../../typer/behandling';
import { IFagsak } from '../../typer/fagsak';
import { IDataForManuellJournalføring } from '../../typer/manuell-journalføring';
import { datoformat, formaterDato } from '../../utils/formatter';
import IkonKnapp from '../Felleskomponenter/IkonKnapp/IkonKnapp';

interface IKnyttTilBehandlingProps {
    aktivBehandling: IBehandling | undefined;
    dataForManuellJournalføring: IDataForManuellJournalføring;
}

export const KnyttTilBehandling: React.FC<IKnyttTilBehandlingProps> = ({
    aktivBehandling,
    dataForManuellJournalføring,
}) => {
    const { innloggetSaksbehandler } = useApp();
    const behandlinger = dataForManuellJournalføring.fagsak?.behandlinger.sort((a, b) =>
        dayjs(b.opprettetTidspunkt).diff(dayjs(a.opprettetTidspunkt))
    );
    const visOpprettBehandlingKnapp =
        !aktivBehandling || aktivBehandling.status === BehandlingStatus.AVSLUTTET;

    const [oppretterBehandling, settOppretterBehandling] = useState(false);
    const [opprettBehandlingFeilmelding, settOpprettBehandlingFeilmelding] = useState<
        string | undefined
    >(undefined);

    const {
        feilmeldinger,
        innsendingsfeilmelding,
        opprettBehandling,
        opprettFagsak,
        settDataForManuellJournalføring,
        settTilknyttedeBehandlingIder,
        tilknyttedeBehandlingIder,
        visFeilmeldinger,
    } = useManuellJournalføring();

    const onClickOpprett = async (data: IDataForManuellJournalføring) => {
        const søker = data.person?.personIdent ?? '';
        if (søker === '') {
            settOpprettBehandlingFeilmelding(
                'Klarer ikke opprette behandling fordi journalpost mangler bruker. Hent bruker før opprettelse av behandling'
            );
        } else {
            settOppretterBehandling(true);

            const fagsak: IFagsak | undefined = !data.fagsak
                ? await opprettFagsak({
                      personIdent: data.person?.personIdent ?? null,
                      aktørId: null,
                  })
                      .then((response: Ressurs<IFagsak>) =>
                          response.status === RessursStatus.SUKSESS ? response.data : undefined
                      )
                      .catch(() => {
                          settOppretterBehandling(false);
                          return undefined;
                      })
                : data.fagsak;

            if (fagsak) {
                const behandlingType =
                    behandlinger && behandlinger.length > 0
                        ? Behandlingstype.REVURDERING
                        : Behandlingstype.FØRSTEGANGSBEHANDLING;

                const fagsakMedBehandling: Ressurs<IFagsak> = await opprettBehandling({
                    behandlingType: behandlingType,
                    behandlingÅrsak: BehandlingÅrsak.SØKNAD,
                    kategori: BehandlingKategori.NASJONAL, // TODO: Utvides/fjernes fra opprettelse
                    navIdent: innloggetSaksbehandler?.navIdent,
                    søkersIdent: søker,
                    underkategori: BehandlingUnderkategori.ORDINÆR, // TODO: Utvides/fjernes fra opprettelse
                }).then((response: Ressurs<IFagsak>) => response);

                settOppretterBehandling(false);
                if (fagsakMedBehandling.status === RessursStatus.SUKSESS) {
                    settDataForManuellJournalføring({
                        status: RessursStatus.SUKSESS,
                        data: {
                            ...dataForManuellJournalføring,
                            fagsak: fagsakMedBehandling.data,
                        },
                    });
                } else if (fagsakMedBehandling.status === RessursStatus.FEILET) {
                    settOpprettBehandlingFeilmelding(fagsakMedBehandling.frontendFeilmelding);
                } else {
                    settOpprettBehandlingFeilmelding('Opprettelse av behandling feilet.');
                }
            } else {
                settOpprettBehandlingFeilmelding('Opprettelse av behandling feilet.');
            }
        }
    };

    return (
        <>
            {visOpprettBehandlingKnapp && (
                <div className={'journalføring__opprett-behandling'}>
                    <AlertStripe type="info">
                        {(behandlinger && behandlinger.length > 0
                            ? 'Det finnes ingen åpne behandlinger på denne brukeren.'
                            : 'Det er ikke registrert tidligere behandlinger på denne brukeren.') +
                            ' For å koble dokumentasjonen til en behandling, "Opprett ny behandling", eller journalfør uten å opprette behandling. '}
                    </AlertStripe>
                    <IkonKnapp
                        aria-labelledby={`utfør_opprett-fagsak-og-behandling-ved-journalføring`}
                        className={'ikon-knapp'}
                        id={'opprettbehandling'}
                        onClick={() => {
                            onClickOpprett(dataForManuellJournalføring);
                        }}
                        label={'Opprett ny behandling'}
                        erLesevisning={false}
                        knappPosisjon={'venstre'}
                        type="flat"
                        spinner={oppretterBehandling}
                        disabled={oppretterBehandling}
                        ikon={<Pluss />}
                    />
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
                                        dayjs(behandling.opprettetTidspunkt),
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
