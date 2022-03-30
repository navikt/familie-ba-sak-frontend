import * as React from 'react';
import { useState } from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import Alertstripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

import { FamilieSelect } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import useDokument from '../../../hooks/useDokument';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import { DokumentIkon } from '../../../ikoner/DokumentIkon';
import type { IBehandling } from '../../../typer/behandling';
import {
    BehandlerRolle,
    BehandlingResultat,
    BehandlingStatus,
    BehandlingSteg,
    Behandlingstype,
    BehandlingÅrsak,
    hentStegNummer,
} from '../../../typer/behandling';
import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';
import IkonKnapp, { IkonPosisjon } from '../../Felleskomponenter/IkonKnapp/IkonKnapp';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import PdfVisningModal from '../../Felleskomponenter/PdfVisningModal/PdfVisningModal';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import { VedtaksbegrunnelseTeksterProvider } from './VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';
import VedtaksperioderMedBegrunnelser from './VedtakBegrunnelserTabell/VedtaksperioderMedBegrunnelser/VedtaksperioderMedBegrunnelser';

interface IVedtakProps {
    åpenBehandling: IBehandling;
}

const Container = styled.div`
    max-width: 49rem;
    #forhandsvis-vedtaksbrev {
        float: right;
    }
`;

enum FortsattInnvilgetPeriodetype {
    MED_PERIODER = 'MED_PERIODER',
    UTEN_PERIODER = 'UTEN_PERIODER',
}

export const mapFortsattInnvilgetPeriodetypeTilBoolean: Record<
    FortsattInnvilgetPeriodetype,
    boolean
> = {
    MED_PERIODER: true,
    UTEN_PERIODER: false,
};

interface FortsattInnvilgetPerioderSelect extends HTMLSelectElement {
    value: FortsattInnvilgetPeriodetype;
}

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ åpenBehandling }) => {
    const { hentSaksbehandlerRolle } = useApp();
    const { fagsakId } = useSakOgBehandlingParams();
    const {
        erLesevisning,
        sendTilBeslutterNesteOnClick,
        behandlingsstegSubmitressurs,
        settÅpenBehandling,
    } = useBehandling();

    const history = useHistory();

    const { request } = useHttp();

    interface IOppdaterVedtaksperioder {
        skalGenererePerioderForFortsattInnvilget: boolean;
        behandlingId: number;
    }

    const oppdaterVedtaksperioder = (medPerioder: boolean) => {
        request<IOppdaterVedtaksperioder, IBehandling>({
            method: 'PUT',
            url: '/familie-ba-sak/api/vedtaksperioder/fortsatt-innvilget',
            data: {
                skalGenererePerioderForFortsattInnvilget: medPerioder,
                behandlingId: åpenBehandling.behandlingId,
            },
        }).then((behandling: Ressurs<IBehandling>) => {
            if (behandling.status === RessursStatus.SUKSESS) {
                settÅpenBehandling(behandling);
            }
        });
    };

    const {
        hentForhåndsvisning,
        nullstillDokument,
        visDokumentModal,
        hentetDokument,
        settVisDokumentModal,
    } = useDokument();
    const [visModal, settVisModal] = React.useState<boolean>(false);

    const visSubmitKnapp = !erLesevisning() && åpenBehandling?.status === BehandlingStatus.UTREDES;

    const hentVedtaksbrev = () => {
        const vedtak = åpenBehandling.vedtak;
        const rolle = hentSaksbehandlerRolle();
        const genererBrevUnderBehandling =
            rolle &&
            rolle > BehandlerRolle.VEILEDER &&
            hentStegNummer(åpenBehandling.steg) < hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const genererBrevUnderBeslutning =
            rolle &&
            rolle === BehandlerRolle.BESLUTTER &&
            hentStegNummer(åpenBehandling.steg) === hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const httpMethod =
            genererBrevUnderBehandling || genererBrevUnderBeslutning ? 'POST' : 'GET';

        hentForhåndsvisning({
            method: httpMethod,
            url: `/familie-ba-sak/api/dokument/vedtaksbrev/${vedtak?.id}`,
        });
    };

    const sendTilBeslutter = () => {
        sendTilBeslutterNesteOnClick((visModal: boolean) => settVisModal(visModal));
    };

    const lesevisning = erLesevisning();

    const erMigreringFraInfotrygd = åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
    const erBehandlingMedVedtaksbrevutsending =
        åpenBehandling.type !== Behandlingstype.TEKNISK_ENDRING &&
        åpenBehandling.årsak !== BehandlingÅrsak.SATSENDRING &&
        !erMigreringFraInfotrygd;

    const startverdi =
        åpenBehandling.vedtak?.vedtaksperioderMedBegrunnelser.length === 1
            ? FortsattInnvilgetPeriodetype.UTEN_PERIODER
            : FortsattInnvilgetPeriodetype.MED_PERIODER;
    const [fortsattInnvilgetPeriodetype, settFortsattInnvilgetPeriodetype] =
        useState<FortsattInnvilgetPeriodetype>(startverdi);

    return (
        <Skjemasteg
            tittel={'Vedtak'}
            forrigeOnClick={() =>
                history.push(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/simulering`)
            }
            nesteOnClick={visSubmitKnapp ? sendTilBeslutter : undefined}
            nesteKnappTittel={erMigreringFraInfotrygd ? 'Bekreft migrering' : 'Til godkjenning'}
            senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
            maxWidthStyle="100%"
            className={'vedtak'}
            feilmelding={hentFrontendFeilmelding(behandlingsstegSubmitressurs)}
            steg={BehandlingSteg.BESLUTTE_VEDTAK}
        >
            {erBehandlingMedVedtaksbrevutsending ? (
                <>
                    <PdfVisningModal
                        onRequestOpen={() => {
                            if (hentetDokument.status !== RessursStatus.HENTER) {
                                hentVedtaksbrev();
                            }
                        }}
                        åpen={visDokumentModal}
                        onRequestClose={() => {
                            settVisDokumentModal(false);
                            nullstillDokument();
                        }}
                        pdfdata={hentetDokument}
                    />
                    <Container>
                        {åpenBehandling.resultat === BehandlingResultat.FORTSATT_INNVILGET && (
                            <FamilieSelect
                                label="Velg brev med eller uten perioder"
                                erLesevisning={lesevisning}
                                onChange={(
                                    event: React.ChangeEvent<FortsattInnvilgetPerioderSelect>
                                ): void => {
                                    oppdaterVedtaksperioder(
                                        mapFortsattInnvilgetPeriodetypeTilBoolean[
                                            event.target.value
                                        ]
                                    );
                                    settFortsattInnvilgetPeriodetype(event.target.value);
                                }}
                                value={fortsattInnvilgetPeriodetype}
                            >
                                <option value={FortsattInnvilgetPeriodetype.UTEN_PERIODER}>
                                    Fortsatt innvilget: Uten perioder
                                </option>
                                <option value={FortsattInnvilgetPeriodetype.MED_PERIODER}>
                                    Fortsatt innvilget: Med perioder
                                </option>
                            </FamilieSelect>
                        )}
                        {åpenBehandling.årsak === BehandlingÅrsak.DØDSFALL_BRUKER ||
                        åpenBehandling.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ? (
                            <Alertstripe
                                type="info"
                                style={{ margin: '2rem 0 1rem 0' }}
                                form="inline"
                            >
                                <b>
                                    {åpenBehandling.årsak === BehandlingÅrsak.DØDSFALL_BRUKER
                                        ? 'Vedtak om opphør på grunn av dødsfall er automatisk generert.'
                                        : 'Behandling bruker manuelt skrevet vedtaksbrev. Forhåndsvis for å se brevet.'}
                                </b>
                            </Alertstripe>
                        ) : (
                            <VedtaksbegrunnelseTeksterProvider>
                                <VedtaksperioderMedBegrunnelser åpenBehandling={åpenBehandling} />
                            </VedtaksbegrunnelseTeksterProvider>
                        )}

                        <IkonKnapp
                            id={'forhandsvis-vedtaksbrev'}
                            erLesevisning={false}
                            label={'Vis vedtaksbrev'}
                            ikon={<DokumentIkon />}
                            onClick={() => settVisDokumentModal(!visDokumentModal)}
                            spinner={hentetDokument.status === RessursStatus.HENTER}
                            ikonPosisjon={IkonPosisjon.VENSTRE}
                            mini={true}
                        />
                    </Container>
                    {visModal && (
                        <UIModalWrapper
                            modal={{
                                tittel: 'Totrinnskontroll',
                                lukkKnapp: false,
                                visModal: visModal,
                                actions: [
                                    <Knapp
                                        key={'saksoversikt'}
                                        mini={true}
                                        onClick={() => {
                                            settVisModal(false);
                                            history.push(`/fagsak/${fagsakId}/saksoversikt`);
                                            window.location.reload();
                                        }}
                                        children={'Gå til saksoversikten'}
                                    />,
                                    <Knapp
                                        key={'oppgavebenk'}
                                        type={'hoved'}
                                        mini={true}
                                        onClick={() => {
                                            settVisModal(false);
                                            history.push('/oppgaver');
                                        }}
                                        children={'Gå til oppgavebenken'}
                                    />,
                                ],
                            }}
                        >
                            <Normaltekst>Behandlingen er nå sendt til totrinnskontroll</Normaltekst>
                        </UIModalWrapper>
                    )}
                </>
            ) : erMigreringFraInfotrygd ? (
                <AlertStripeInfo>
                    {`Du er inne på en migreringsbehandling og det sendes ingen vedtaksbrev.`}
                </AlertStripeInfo>
            ) : (
                <AlertStripeInfo>
                    {`Du er inne på en teknisk behandling og det finnes ingen vedtaksbrev.`}
                </AlertStripeInfo>
            )}
        </Skjemasteg>
    );
};

export default OppsummeringVedtak;
