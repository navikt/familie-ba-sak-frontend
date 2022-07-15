import * as React from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Radio, RadioGruppe, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';
import { Element, Normaltekst, Systemtittel, UndertekstBold } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import ØyeGrå from '../../../../ikoner/ØyeGrå';
import ØyeGrønn from '../../../../ikoner/ØyeGrønn';
import ØyeRød from '../../../../ikoner/ØyeRød';
import type { IBehandling } from '../../../../typer/behandling';
import { TotrinnskontrollBeslutning } from '../../../../typer/totrinnskontroll';
import { formaterIsoDato, datoformat } from '../../../../utils/formatter';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import { KontrollertStatus } from '../../Venstremeny/sider';

interface IProps {
    innsendtVedtak: Ressurs<IBehandling>;
    sendInnVedtak: (
        beslutning: TotrinnskontrollBeslutning,
        begrunnelse: string,
        egetVedtak: boolean
    ) => void;
    åpenBehandling: IBehandling;
}

const KontrollerteTrinnOverskrift = styled(Element)`
    margin-bottom: 1rem;
`;

const SendtTilBeslutterContainer = styled.div`
    display: flex;
`;

const Totrinnskontrollskjema: React.FunctionComponent<IProps> = ({
    innsendtVedtak,
    sendInnVedtak,
    åpenBehandling,
}) => {
    const { trinnPåBehandling } = useBehandling();
    const { innloggetSaksbehandler } = useApp();

    const [beslutning, settBeslutning] = React.useState<TotrinnskontrollBeslutning>(
        TotrinnskontrollBeslutning.IKKE_VURDERT
    );
    const [begrunnelse, settBegrunnelse] = React.useState<string>('');

    const senderInn = innsendtVedtak.status === RessursStatus.HENTER;

    const totrinnskontroll = åpenBehandling.totrinnskontroll;

    const saksbehandler = totrinnskontroll?.saksbehandler ?? 'UKJENT SAKSBEHANDLER';
    const opprettetTidspunkt = totrinnskontroll?.opprettetTidspunkt ?? undefined;

    const egetVedtak =
        totrinnskontroll?.saksbehandler === innloggetSaksbehandler?.displayName ?? false;

    return (
        <SkjemaGruppe
            className="totrinnskontroll-skjemagruppe"
            feil={hentFrontendFeilmelding(innsendtVedtak)}
        >
            <RadioGruppe
                className="totrinnskontroll-radiogruppe"
                description={
                    egetVedtak ? (
                        <SendtTilBeslutterContainer>
                            <div>
                                <Systemtittel>Totrinnskontroll</Systemtittel>
                                <br />
                                <Normaltekst>
                                    {formaterIsoDato(
                                        opprettetTidspunkt,
                                        datoformat.DATO_FORLENGET_MED_TID,
                                        'UKJENT OPPRETTELSESTIDSPUNKT'
                                    )}
                                </Normaltekst>
                                <Normaltekst>{saksbehandler}</Normaltekst>
                                <br />
                                <UndertekstBold>Vedtaket er sendt til godkjenning</UndertekstBold>
                            </div>
                        </SendtTilBeslutterContainer>
                    ) : (
                        <>
                            <Normaltekst>
                                Kontrollér opplysninger og faglige vurderinger som er gjort
                            </Normaltekst>

                            <br />
                            <KontrollerteTrinnOverskrift>
                                Kontrollerte trinn
                            </KontrollerteTrinnOverskrift>

                            {Object.entries(trinnPåBehandling).map(([_, trinn], index) => {
                                return (
                                    <TrinnStatus
                                        kontrollertStatus={trinn.kontrollert}
                                        navn={`${index + 1}. ${trinn.navn}`}
                                    />
                                );
                            })}
                        </>
                    )
                }
            >
                <Radio
                    label={'Godkjent'}
                    name={'totrinnskontroll'}
                    className="totrinnskontroll-radio"
                    checked={beslutning === TotrinnskontrollBeslutning.GODKJENT}
                    onChange={() =>
                        beslutning === TotrinnskontrollBeslutning.GODKJENT
                            ? settBeslutning(TotrinnskontrollBeslutning.IKKE_VURDERT)
                            : settBeslutning(TotrinnskontrollBeslutning.GODKJENT)
                    }
                    disabled={senderInn || egetVedtak}
                />
                <Radio
                    label={'Vurdér på nytt'}
                    name={'totrinnskontroll'}
                    className="totrinnskontroll-radio"
                    checked={beslutning === TotrinnskontrollBeslutning.UNDERKJENT}
                    onClick={() =>
                        beslutning === TotrinnskontrollBeslutning.UNDERKJENT
                            ? settBeslutning(TotrinnskontrollBeslutning.IKKE_VURDERT)
                            : settBeslutning(TotrinnskontrollBeslutning.UNDERKJENT)
                    }
                    disabled={senderInn}
                />
            </RadioGruppe>
            {beslutning === TotrinnskontrollBeslutning.UNDERKJENT && (
                <div className={'totrinnskontroll-begrunnelse'}>
                    <TextareaControlled
                        defaultValue={begrunnelse}
                        value={begrunnelse}
                        placeholder={'Begrunnelse'}
                        onBlur={event => settBegrunnelse(event.target.value)}
                    />
                </div>
            )}

            <Knapp
                type={'hoved'}
                spinner={senderInn}
                disabled={senderInn}
                mini={true}
                onClick={() => {
                    if (!senderInn) {
                        sendInnVedtak(
                            beslutning,
                            beslutning === TotrinnskontrollBeslutning.UNDERKJENT ? begrunnelse : '',
                            egetVedtak
                        );
                    }
                }}
                children={
                    egetVedtak
                        ? 'Underkjenn eget vedtak'
                        : beslutning === TotrinnskontrollBeslutning.UNDERKJENT
                        ? 'Send til saksbehandler'
                        : 'Godkjenn vedtaket'
                }
            />
        </SkjemaGruppe>
    );
};

const Trinn = styled.div`
    display: flex;

    svg {
        margin-right: 1rem;
    }
`;

const TrinnStatus: React.FC<{
    kontrollertStatus: KontrollertStatus;
    navn: string;
}> = ({ kontrollertStatus, navn }) => {
    return (
        <Trinn>
            {kontrollertStatus === KontrollertStatus.IKKE_KONTROLLERT && (
                <ØyeGrå height={24} width={24} />
            )}

            {kontrollertStatus === KontrollertStatus.KONTROLLERT && (
                <ØyeGrønn height={24} width={24} />
            )}

            {kontrollertStatus === KontrollertStatus.MANGLER_KONTROLL && (
                <ØyeRød height={24} width={24} />
            )}
            <span>{navn}</span>
        </Trinn>
    );
};

export default Totrinnskontrollskjema;
