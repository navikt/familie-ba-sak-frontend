import * as React from 'react';
import { useState } from 'react';

import { Knapp } from 'nav-frontend-knapper';
import { Radio, RadioGruppe, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/BehandlingContext';
import { IFagsak } from '../../../../typer/fagsak';
import {
    ITotrinnskontrollData,
    TotrinnskontrollBeslutning,
} from '../../../../typer/totrinnskontroll';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';

interface IProps {
    innsendtVedtak: Ressurs<IFagsak>;
    sendInnVedtak: (totrinnskontrollData: ITotrinnskontrollData) => void;
}

const Totrinnskontrollskjema: React.FunctionComponent<IProps> = ({
    innsendtVedtak,
    sendInnVedtak,
}) => {
    const { besøkteSider } = useBehandling();
    const [feilmelding] = useState<string | undefined>(hentFrontendFeilmelding(innsendtVedtak));

    const [
        totrinnskontrollStatus,
        settTotrinnskontrollStatus,
    ] = React.useState<TotrinnskontrollBeslutning>(TotrinnskontrollBeslutning.IKKE_VURDERT);
    const [totrinnskontrollBegrunnelse, settTotrinnskontrollBegrunnelse] = React.useState<string>(
        ''
    );

    const senderInn = innsendtVedtak.status === RessursStatus.HENTER;

    return (
        <div>
            <SkjemaGruppe className="totrinnskontroll-skjemagruppe" feil={feilmelding}>
                <RadioGruppe
                    className="totrinnskontroll-radiogruppe"
                    description={
                        <div>
                            <Normaltekst>
                                Kontrollér opplysninger og faglige vurderinger som er gjort
                            </Normaltekst>

                            <br />
                            <Element>Kontrolerte trinn</Element>
                            <br />

                            {Object.entries(besøkteSider).map(([_, side]) => {
                                return side.besøkt ? (
                                    <div>OK {side.navn}</div>
                                ) : (
                                    <div>X {side.navn}</div>
                                );
                            })}
                        </div>
                    }
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
                    if (!senderInn) {
                        sendInnVedtak({
                            beslutning: totrinnskontrollStatus,
                            begrunnelse:
                                totrinnskontrollStatus === TotrinnskontrollBeslutning.UNDERKJENT
                                    ? totrinnskontrollBegrunnelse
                                    : '',
                            kontrollerteSider: [],
                        });
                    }
                }}
                children={
                    totrinnskontrollStatus === TotrinnskontrollBeslutning.UNDERKJENT
                        ? 'Send til saksbehandler'
                        : 'Godkjenn vedtaket'
                }
            />
        </div>
    );
};

export default Totrinnskontrollskjema;
