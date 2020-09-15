import { FamilieSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Feilmelding } from 'nav-frontend-typografi';
import React from 'react';
import { useBehandling } from '../../../../context/BehandlingContext';
import { useUtbetalingBegrunnelser } from '../../../../context/UtbetalingBegrunnelseContext';
import Slett from '../../../../ikoner/Slett';
import { BehandlingResultat, behandlingsresultater } from '../../../../typer/behandling';
import {
    BehandlingresultatOgVilkårBegrunnelse,
    IRestVedtakBegrunnelse,
} from '../../../../typer/vedtak';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';

interface IUtbetalingsBegrunnelseInput {
    behandlingresultatOgVilkårBegrunnelse?: BehandlingresultatOgVilkårBegrunnelse;
    id: number;
    resultat?: BehandlingResultat;
}

const UtbetalingBegrunnelseInput: React.FC<IUtbetalingsBegrunnelseInput> = ({
    behandlingresultatOgVilkårBegrunnelse,
    id,
    resultat,
}) => {
    const { erLesevisning } = useBehandling();
    const {
        endreUtbetalingBegrunnelse,
        vilkårBegrunnelser,
        slettUtbetalingBegrunnelse,
        utbetalingBegrunnelseFeilmelding,
    } = useUtbetalingBegrunnelser();

    const [mutableVedtakBegrunnelse, settMutableVedBegrunnelse] = React.useState<
        BehandlingresultatOgVilkårBegrunnelse | undefined
    >(behandlingresultatOgVilkårBegrunnelse);
    const [mutableResultat, setMutableResultat] = React.useState<BehandlingResultat | undefined>(
        resultat
    );

    const onChangeResultat = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value ? event.target.value : '';
        setMutableResultat(value as BehandlingResultat);
        endreUtbetalingBegrunnelse(id, {
            resultat:
                value !== 'Velg behandlingsresultat' ? (value as BehandlingResultat) : undefined,
            behandlingresultatOgVilkårBegrunnelse:
                value !== 'Velg behandlingsresultat'
                    ? behandlingresultatOgVilkårBegrunnelse
                    : undefined,
        });
    };

    const onChangeBegrunnelse = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value ? event.target.value : '';
        settMutableVedBegrunnelse(value as BehandlingresultatOgVilkårBegrunnelse);
        endreUtbetalingBegrunnelse(id, {
            resultat,
            behandlingresultatOgVilkårBegrunnelse:
                value !== 'Velg begrunnelse'
                    ? (value as BehandlingresultatOgVilkårBegrunnelse)
                    : undefined,
        });
    };

    const begrunnelser =
        vilkårBegrunnelser?.status === RessursStatus.SUKSESS &&
        resultat &&
        vilkårBegrunnelser.data[resultat];

    if (vilkårBegrunnelser.status === RessursStatus.FEILET) {
        return <AlertStripeFeil>Klarte ikke å hente inn begrunnelser for vilkår.</AlertStripeFeil>;
    }

    return (
        <div className={'begrunnelse-input'}>
            <div className={'begrunnelse-input__flex'}>
                <FamilieSelect
                    bredde={'m'}
                    className="begrunnelse-input__select"
                    erLesevisning={erLesevisning()}
                    lesevisningVerdi={
                        mutableResultat ? behandlingsresultater[mutableResultat]?.navn : ''
                    }
                    name="begrunnelse"
                    onChange={onChangeResultat}
                    value={mutableResultat === null ? undefined : mutableResultat}
                >
                    <option>Velg behandlingsresultat</option>
                    {vilkårBegrunnelser?.status === RessursStatus.SUKSESS &&
                        Object.keys(vilkårBegrunnelser?.data)
                            .filter((behandlingResultat: string) => {
                                return (
                                    vilkårBegrunnelser?.status === RessursStatus.SUKSESS &&
                                    vilkårBegrunnelser.data[
                                        behandlingResultat as BehandlingResultat
                                    ] &&
                                    vilkårBegrunnelser.data[
                                        behandlingResultat as BehandlingResultat
                                    ].length > 0
                                );
                            })
                            .map((behandlingResultat: string) => {
                                return behandlingsresultater[behandlingResultat] ? (
                                    <option
                                        key={behandlingsresultater[behandlingResultat].id}
                                        value={behandlingsresultater[behandlingResultat].id}
                                    >
                                        {behandlingsresultater[behandlingResultat].navn}
                                    </option>
                                ) : null;
                            })}
                </FamilieSelect>

                <FamilieSelect
                    bredde={'l'}
                    erLesevisning={erLesevisning()}
                    lesevisningVerdi={
                        mutableVedtakBegrunnelse && begrunnelser
                            ? begrunnelser.find(
                                  (restVedtakBegrunnelse: IRestVedtakBegrunnelse) =>
                                      restVedtakBegrunnelse.id === mutableVedtakBegrunnelse
                              )?.navn
                            : ''
                    }
                    name="begrunnelse"
                    onChange={onChangeBegrunnelse}
                    value={mutableVedtakBegrunnelse === null ? undefined : mutableVedtakBegrunnelse}
                >
                    <option>Velg begrunnelse</option>
                    {begrunnelser &&
                        begrunnelser.map((restVedtakBegrunnelse: IRestVedtakBegrunnelse) => {
                            return (
                                <option
                                    key={restVedtakBegrunnelse.id}
                                    value={restVedtakBegrunnelse.id}
                                >
                                    {restVedtakBegrunnelse.navn}
                                </option>
                            );
                        })}
                </FamilieSelect>

                <IkonKnapp
                    erLesevisning={erLesevisning()}
                    onClick={() => {
                        slettUtbetalingBegrunnelse(id);
                    }}
                    id={`slett-knapp-${id}`}
                    label={'Slett'}
                    ikon={<Slett />}
                />
            </div>
            {utbetalingBegrunnelseFeilmelding.feilmelding !== '' &&
                utbetalingBegrunnelseFeilmelding.id === id && (
                    <Feilmelding>{utbetalingBegrunnelseFeilmelding.feilmelding}</Feilmelding>
                )}
        </div>
    );
};

export default UtbetalingBegrunnelseInput;
