import * as React from 'react';
import { IFagsak, IBehandling, IVedtakForBehandling, VedtakResultat } from '../../../typer/fagsak';
import { useHistory } from 'react-router';
import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { axiosRequest } from '../../../api/axios';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import AlertStripe from 'nav-frontend-alertstriper';

interface IProps {
    fagsak: IFagsak;
}

const VelgVilkaarene: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const history = useHistory();
    const [fyltvilkår, settFyltvilkår] = React.useState(true);
    const [feilmelding, settFeilmelding] = React.useState('');
    const [senderInn, settSenderInn] = React.useState(false);

    const aktivBehandling = fagsak.behandlinger.find(
        (behandling: IBehandling) => behandling.aktiv === true
    );

    const aktivVedtak = aktivBehandling
        ? aktivBehandling.vedtakForBehandling.find(
              (vedtak: IVedtakForBehandling) => vedtak.aktiv === true
          )
        : undefined;

    React.useEffect(() => {
        if (aktivVedtak) {
            settFyltvilkår(aktivVedtak.resultat == VedtakResultat.INNVILGET);
        }
    }, []);

    if (!aktivBehandling) {
        return (
            <div>
                <Normaltekst>Ingen aktiv behandling</Normaltekst>
            </div>
        );
    }

    return (
        <div>
            {feilmelding !== '' && <AlertStripe type="feil">{feilmelding}</AlertStripe>}
            <div className={'vilkårene'}>
                <Systemtittel children={'Inngangsvilkår'} />

                <br />
                <RadioPanelGruppe
                    name={'inngangsvilkår'}
                    legend={'Inngangsvikår for barnetrygd'}
                    radios={[
                        { label: 'Inngangsvilkårene er oppfylt', value: 'oppfylt' },
                        { label: 'Inngangsvilkårene er ikke oppfylt', value: 'ikkeoppfylt' },
                    ]}
                    checked={fyltvilkår ? 'oppfylt' : 'ikkeoppfylt'}
                    onChange={(evt: {}, value: string) => {
                        settFyltvilkår(value === 'oppfylt');
                    }}
                />

                <br />
                <div className={'fastsett__navigering'}>
                    <Knapp
                        type={'hoved'}
                        onClick={() => {
                            history.push(`/fagsak/opprett`);
                        }}
                        children={'Tilbake'}
                    />
                    <Knapp
                        type={'hoved'}
                        spinner={senderInn}
                        onClick={() => {
                            const result = fyltvilkår
                                ? VedtakResultat.INNVILGET
                                : VedtakResultat.AVSLÅTT;
                            const nextTo =
                                result == VedtakResultat.INNVILGET
                                    ? `/fagsak/${fagsak.id}/behandle`
                                    : `/fagsak/${fagsak.id}/vedtak`;
                            if (aktivVedtak?.resultat !== result) {
                                settSenderInn(true);
                                axiosRequest<IFagsak>({
                                    data: {
                                        resultat: result,
                                    },
                                    method: 'POST',
                                    url: `/familie-ba-sak/api/fagsak/${fagsak.id}/kort-vedtak`,
                                })
                                    .then((response: Ressurs<any>) => {
                                        settSenderInn(false);
                                        if (response.status === RessursStatus.SUKSESS) {
                                            settFeilmelding('');
                                            console.log(nextTo);
                                            history.push(nextTo);
                                        } else if (response.status === RessursStatus.FEILET) {
                                            settFeilmelding(response.melding);
                                        } else {
                                            settFeilmelding('Opprettelse av vedtak feilet');
                                        }
                                    })
                                    .catch(() => {
                                        settSenderInn(false);
                                        settFeilmelding('Opprettelse av vedtak feilet');
                                    });
                            } else {
                                history.push(`/fagsak/${fagsak.id}/behandle`);
                            }
                        }}
                        children={'Neste'}
                    />
                </div>
            </div>
        </div>
    );
};

export default VelgVilkaarene;
