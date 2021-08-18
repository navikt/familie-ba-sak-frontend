import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Knapp } from 'nav-frontend-knapper';
import { Radio, RadioGruppe, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';

import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/BehandlingContext';
import Info from '../../../ikoner/Info';
import { IFagsak } from '../../../typer/fagsak';
import { ITotrinnskontrollData, TotrinnskontrollBeslutning } from '../../../typer/totrinnskontroll';
import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';
import { ISide, siderForBehandling } from '../../Felleskomponenter/Venstremeny/sider';

interface IProps {
    innsendtVedtak: Ressurs<IFagsak>;
    sendInnVedtak: (totrinnskontrollData: ITotrinnskontrollData) => void;
}

const Container = styled.div`
    margin: 0.5rem;
    border-radius: 0.25rem;
    padding: 1.2rem;
    border: 1.5px solid ${navFarger.navGra40};
`;

const Totrinnskontrollskjema: React.FunctionComponent<IProps> = ({
    innsendtVedtak,
    sendInnVedtak,
}) => {
    const { besøkteSider, åpenBehandling } = useBehandling();
    const [feilmelding, settFeilmelding] = useState<string | undefined>(
        hentFrontendFeilmelding(innsendtVedtak)
    );
    const siderPåBehandling =
        åpenBehandling.status === RessursStatus.SUKSESS
            ? siderForBehandling(åpenBehandling.data)
            : [];

    const [
        totrinnskontrollStatus,
        settTotrinnskontrollStatus,
    ] = React.useState<TotrinnskontrollBeslutning>(TotrinnskontrollBeslutning.IKKE_VURDERT);
    const [totrinnskontrollBegrunnelse, settTotrinnskontrollBegrunnelse] = React.useState<string>(
        ''
    );

    const siderForKontroll: Map<ISide, boolean> = new Map(
        siderPåBehandling.map(([sideId, side]) =>
            besøkteSider.has(sideId) ? [side, true] : [side, false]
        )
    );

    useEffect(() => {
        settFeilmelding(hentFrontendFeilmelding(innsendtVedtak));
    }, [besøkteSider.size, totrinnskontrollStatus]);

    const ikkeKontrollerteSider = (): ISide[] => {
        const mangler = [];
        for (const [side, erKontrollert] of siderForKontroll) {
            if (!erKontrollert) {
                mangler.push(side);
            }
        }
        return mangler;
    };

    const senderInn = innsendtVedtak.status === RessursStatus.HENTER;

    return (
        <Container className="totrinnskontroll">
            <SkjemaGruppe className="totrinnskontroll-skjemagruppe" feil={feilmelding}>
                <legend className="totrinnskontroll-tittel">
                    <Info className="ikon" />
                    <Systemtittel>Totrinnskontroll</Systemtittel>
                </legend>
                {siderPåBehandling.map(([_, side]) => {
                    return siderForKontroll.get(side) ? (
                        <div>OK {side.navn}</div>
                    ) : (
                        <div>X {side.navn}</div>
                    );
                })}
                <RadioGruppe
                    className="totrinnskontroll-radiogruppe"
                    description="Kontrollér opplysninger og faglige vurderinger som er gjort"
                >
                    <Radio
                        label={'Godkjent'}
                        name={'totrinnskontroll'}
                        className="totrinnskontroll-radio"
                        checked={totrinnskontrollStatus === TotrinnskontrollBeslutning.GODKJENT}
                        onChange={() =>
                            settTotrinnskontrollStatus(TotrinnskontrollBeslutning.GODKJENT)
                        }
                        disabled={senderInn}
                    />
                    <Radio
                        label={'Vurdér på nytt'}
                        name={'totrinnskontroll'}
                        className="totrinnskontroll-radio"
                        checked={totrinnskontrollStatus === TotrinnskontrollBeslutning.UNDERKJENT}
                        onChange={() =>
                            settTotrinnskontrollStatus(TotrinnskontrollBeslutning.UNDERKJENT)
                        }
                        disabled={senderInn}
                    />
                </RadioGruppe>
                {totrinnskontrollStatus === TotrinnskontrollBeslutning.UNDERKJENT && (
                    <div className={'totrinnskontroll-begrunnelse'}>
                        <TextareaControlled
                            defaultValue={totrinnskontrollBegrunnelse}
                            value={totrinnskontrollBegrunnelse}
                            placeholder={'Begrunnelse'}
                            onBlur={event => settTotrinnskontrollBegrunnelse(event.target.value)}
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
                    const manglerValidering = ikkeKontrollerteSider();
                    if (manglerValidering.length > 0) {
                        settFeilmelding(
                            'Alle steg er ikke kontrollerte. Mangler: ' +
                                manglerValidering.map(side => `\n ${side.navn}`)
                        );
                    } else if (siderPåBehandling.length === 0) {
                        settFeilmelding(
                            'Kunne ikke se at alle sider er kontrollert. Ta kontakt med brukerstøtte.'
                        );
                    } else if (!senderInn) {
                        sendInnVedtak({
                            beslutning: totrinnskontrollStatus,
                            begrunnelse:
                                totrinnskontrollStatus === TotrinnskontrollBeslutning.UNDERKJENT
                                    ? totrinnskontrollBegrunnelse
                                    : '',
                        });
                        settFeilmelding(hentFrontendFeilmelding(innsendtVedtak));
                    }
                }}
                children={
                    totrinnskontrollStatus === TotrinnskontrollBeslutning.UNDERKJENT
                        ? 'Send til saksbehandler'
                        : 'Godkjenn vedtaket'
                }
            />
        </Container>
    );
};

export default Totrinnskontrollskjema;
