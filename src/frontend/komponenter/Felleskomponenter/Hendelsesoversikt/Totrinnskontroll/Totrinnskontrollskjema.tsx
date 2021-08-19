import * as React from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Radio, RadioGruppe, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/BehandlingContext';
import ØyeGrå from '../../../../ikoner/ØyeGrå';
import ØyeGrønn from '../../../../ikoner/ØyeGrønn';
import ØyeRød from '../../../../ikoner/ØyeRød';
import { IFagsak } from '../../../../typer/fagsak';
import { TotrinnskontrollBeslutning } from '../../../../typer/totrinnskontroll';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import { KontrollertStatus } from '../../Venstremeny/sider';

interface IProps {
    innsendtVedtak: Ressurs<IFagsak>;
    sendInnVedtak: (beslutning: TotrinnskontrollBeslutning, begrunnelse: string) => void;
}

const Totrinnskontrollskjema: React.FunctionComponent<IProps> = ({
    innsendtVedtak,
    sendInnVedtak,
}) => {
    const { trinnPåBehandling } = useBehandling();

    const [beslutning, settBeslutning] = React.useState<TotrinnskontrollBeslutning>(
        TotrinnskontrollBeslutning.IKKE_VURDERT
    );
    const [begrunnelse, settBegrunnelse] = React.useState<string>('');

    const senderInn = innsendtVedtak.status === RessursStatus.HENTER;

    return (
        <div>
            <SkjemaGruppe
                className="totrinnskontroll-skjemagruppe"
                feil={hentFrontendFeilmelding(innsendtVedtak)}
            >
                <RadioGruppe
                    className="totrinnskontroll-radiogruppe"
                    description={
                        <>
                            <Normaltekst>
                                Kontrollér opplysninger og faglige vurderinger som er gjort
                            </Normaltekst>

                            <br />
                            <Element>Kontrolerte trinn</Element>
                            <br />

                            {Object.entries(trinnPåBehandling).map(([_, trinn]) => {
                                return (
                                    <TrinnStatus
                                        kontrollertStatus={trinn.kontrollert}
                                        navn={trinn.navn}
                                    />
                                );
                            })}
                        </>
                    }
                >
                    <Radio
                        label={'Godkjent'}
                        name={'totrinnskontroll'}
                        className="totrinnskontroll-radio"
                        checked={beslutning === TotrinnskontrollBeslutning.GODKJENT}
                        onChange={() => settBeslutning(TotrinnskontrollBeslutning.GODKJENT)}
                        disabled={senderInn}
                    />
                    <Radio
                        label={'Vurdér på nytt'}
                        name={'totrinnskontroll'}
                        className="totrinnskontroll-radio"
                        checked={beslutning === TotrinnskontrollBeslutning.UNDERKJENT}
                        onChange={() => settBeslutning(TotrinnskontrollBeslutning.UNDERKJENT)}
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
            </SkjemaGruppe>
            <Knapp
                type={'hoved'}
                spinner={senderInn}
                disabled={senderInn}
                mini={true}
                onClick={() => {
                    if (!senderInn) {
                        sendInnVedtak(
                            beslutning,
                            beslutning === TotrinnskontrollBeslutning.UNDERKJENT ? begrunnelse : ''
                        );
                    }
                }}
                children={
                    beslutning === TotrinnskontrollBeslutning.UNDERKJENT
                        ? 'Send til saksbehandler'
                        : 'Godkjenn vedtaket'
                }
            />
        </div>
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
                <ØyeGrå heigth={24} width={24} />
            )}

            {kontrollertStatus === KontrollertStatus.KONTROLLERT && (
                <ØyeGrønn heigth={24} width={24} />
            )}

            {kontrollertStatus === KontrollertStatus.MANGLER_KONTROLL && (
                <ØyeRød heigth={24} width={24} />
            )}
            <span>{navn}</span>
        </Trinn>
    );
};

export default Totrinnskontrollskjema;
