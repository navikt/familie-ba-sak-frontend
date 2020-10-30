import { Knapp } from 'nav-frontend-knapper';
import { Radio, RadioGruppe, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import Info from '../../../ikoner/Info';
import { IFagsak } from '../../../typer/fagsak';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import { ITotrinnskontrollData, TotrinnskontrollBeslutning } from '../../../typer/totrinnskontroll';

interface IProps {
    innsendtVedtak: Ressurs<IFagsak>;
    sendInnVedtak: (totrinnskontrollData: ITotrinnskontrollData) => void;
}

const Totrinnskontrollskjema: React.FunctionComponent<IProps> = ({
    innsendtVedtak,
    sendInnVedtak,
}) => {
    const [totrinnskontrollStatus, settTotrinnskontrollStatus] = React.useState<
        TotrinnskontrollBeslutning
    >(TotrinnskontrollBeslutning.IKKE_VURDERT);
    const [totrinnskontrollBegrunnelse, settTotrinnskontrollBegrunnelse] = React.useState<string>(
        ''
    );

    const senderInn = innsendtVedtak.status === RessursStatus.HENTER;
    const feilmelding =
        innsendtVedtak.status === RessursStatus.FEILET ||
        innsendtVedtak.status === RessursStatus.IKKE_TILGANG
            ? innsendtVedtak.frontendFeilmelding
            : '';
    return (
        <div className="totrinnskontroll">
            <SkjemaGruppe className="totrinnskontroll-skjemagruppe" feil={feilmelding}>
                <legend className="totrinnskontroll-tittel">
                    <Info className="ikon" />
                    <Systemtittel>Totrinnskontroll</Systemtittel>
                </legend>
                <RadioGruppe
                    className="totrinnskontroll-radiogruppe"
                    description="Kontrollér opplysninger og faglige vurderinger som er gjort"
                >
                    <Radio
                        label={'Godkjent'}
                        name={`godkjent`}
                        className="totrinnskontroll-radio"
                        checked={totrinnskontrollStatus === TotrinnskontrollBeslutning.GODKJENT}
                        onChange={() =>
                            settTotrinnskontrollStatus(TotrinnskontrollBeslutning.GODKJENT)
                        }
                        disabled={senderInn}
                    />
                    <Radio
                        label={'Vurdér på nytt'}
                        name={`underkjent`}
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
                <Knapp
                    type={'hoved'}
                    spinner={senderInn}
                    disabled={senderInn}
                    onClick={() => {
                        if (!senderInn) {
                            sendInnVedtak({
                                beslutning: totrinnskontrollStatus,
                                begrunnelse:
                                    totrinnskontrollStatus === TotrinnskontrollBeslutning.UNDERKJENT
                                        ? totrinnskontrollBegrunnelse
                                        : '',
                            });
                        }
                    }}
                    children={
                        totrinnskontrollStatus === TotrinnskontrollBeslutning.UNDERKJENT
                            ? 'Send til saksbehandler'
                            : 'Godkjenn vedtaket'
                    }
                />
            </SkjemaGruppe>
        </div>
    );
};

export default Totrinnskontrollskjema;
