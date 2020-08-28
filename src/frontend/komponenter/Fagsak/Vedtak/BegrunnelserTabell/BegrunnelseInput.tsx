import { VedtakBegrunnelse } from '../../../../typer/vedtak';
import { BehandlingResultat, behandlingsresultater } from '../../../../typer/behandling';
import { useBehandling } from '../../../../context/BehandlingContext';
import { useUtbetalingBegrunnelser } from '../../../../context/UtbetalingBegrunnelseContext';
import { RessursStatus } from '@navikt/familie-typer';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import React from 'react';
import { FamilieSelect } from '@navikt/familie-form-elements';
import { IPar } from '../../../../typer/common';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import Slett from '../../../../ikoner/Slett';
import { Feilmelding } from 'nav-frontend-typografi';

interface IBegrunnelseInputProps {
    vedtakBegrunnelse?: VedtakBegrunnelse;
    id: number;
    resultat?: BehandlingResultat;
}

const BegrunnelseInput: React.FC<IBegrunnelseInputProps> = ({
    vedtakBegrunnelse,
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

    const onChangeResultat = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value ? event.target.value : '';
        endreUtbetalingBegrunnelse(id, {
            resultat:
                value !== 'Velg behandlingsresultat' ? (value as BehandlingResultat) : undefined,
            vedtakBegrunnelse: value !== 'Velg behandlingsresultat' ? vedtakBegrunnelse : undefined,
        });
    };

    const onChangeBegrunnelse = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value ? event.target.value : '';
        endreUtbetalingBegrunnelse(id, {
            resultat,
            vedtakBegrunnelse:
                value !== 'Velg begrunnelse' ? (value as VedtakBegrunnelse) : undefined,
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
                    className="begrunnelse-input__select"
                    name="begrunnelse"
                    bredde={'l'}
                    erLesevisning={erLesevisning()}
                    onChange={onChangeResultat}
                    value={resultat}
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
                    name="begrunnelse"
                    bredde={'l'}
                    erLesevisning={erLesevisning()}
                    onChange={onChangeBegrunnelse}
                    value={vedtakBegrunnelse}
                >
                    <option>Velg begrunnelse</option>
                    {begrunnelser &&
                        begrunnelser.map((type: IPar) => {
                            return (
                                <option key={type.id} value={type.id}>
                                    {type.navn}
                                </option>
                            );
                        })}
                </FamilieSelect>

                <IkonKnapp
                    onClick={() => {
                        slettUtbetalingBegrunnelse(id);
                    }}
                    id={`slett-knapp-${id}`}
                    label={'Slett'}
                    ikon={<Slett />}
                />
            </div>
            {utbetalingBegrunnelseFeilmelding && utbetalingBegrunnelseFeilmelding.id === id && (
                <Feilmelding>{utbetalingBegrunnelseFeilmelding.feilmelding}</Feilmelding>
            )}
        </div>
    );
};

export default BegrunnelseInput;
