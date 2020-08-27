import { FamilieSelect } from '@navikt/familie-form-elements';
import Lenke from 'nav-frontend-lenker';
import { Feilmelding } from 'nav-frontend-typografi';
import React from 'react';
import { useBehandling } from '../../../../context/BehandlingContext';
import { useBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import Pluss from '../../../../ikoner/Pluss';
import Slett from '../../../../ikoner/Slett';
import {
    BehandlingResultat,
    behandlingsresultater,
    IBehandling,
} from '../../../../typer/behandling';
import { IPar } from '../../../../typer/common';
import { periodeToString } from '../../../../typer/periode';
import { IRestStønadBrevBegrunnelse, VedtakBegrunnelse } from '../../../../typer/vedtak';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';

interface IBegrunnelserTabellProps {
    åpenBehandling: IBehandling;
}

const BegrunnelserTabell: React.FC<IBegrunnelserTabellProps> = ({ åpenBehandling }) => {
    const harAndeler = åpenBehandling.beregningOversikt.length > 0;
    const { leggTilBegrunnelse, begrunnelser } = useBegrunnelser();

    return (
        <div className={'begrunnelser-tabell'}>
            {harAndeler ? (
                <table className={'tabell'}>
                    <thead>
                        <tr>
                            <th role="columnheader" aria-sort="none">
                                <Lenke href="#">Periode</Lenke>
                            </th>
                            <th>Behandlingsresultat</th>
                            <th>Begrunnelse(r)</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {åpenBehandling.beregningOversikt
                            .slice()
                            .reverse()
                            .map(beregning => {
                                const begrunnelserForPeriode = begrunnelser.filter(
                                    (begrunnelse: IRestStønadBrevBegrunnelse) => {
                                        return (
                                            begrunnelse.fom === beregning.periodeFom &&
                                            begrunnelse.tom === beregning.periodeTom
                                        );
                                    }
                                );

                                return (
                                    <tr key={beregning.periodeFom}>
                                        <td>
                                            {periodeToString({
                                                fom: beregning.periodeFom,
                                                tom: beregning.periodeTom,
                                            })}
                                        </td>
                                        <td>{`${beregning.utbetaltPerMnd} kr/mnd for ${beregning.antallBarn} barn`}</td>
                                        <td>
                                            {begrunnelserForPeriode.map(begrunnelse => {
                                                return begrunnelse.id ? (
                                                    <BegrunnelseInput
                                                        id={begrunnelse.id}
                                                        fom={begrunnelse.fom}
                                                        tom={begrunnelse.tom}
                                                        resultat={begrunnelse.resultat}
                                                        begrunnelse={begrunnelse.begrunnelse}
                                                    />
                                                ) : (
                                                    <Feilmelding>
                                                        Begrunnelsen mangler id
                                                    </Feilmelding>
                                                );
                                            })}
                                        </td>
                                        <td>
                                            <IkonKnapp
                                                id={`legg-til-begrunnelse-${periodeToString({
                                                    fom: beregning.periodeFom,
                                                    tom: beregning.periodeTom,
                                                })}`}
                                                onClick={() => {
                                                    leggTilBegrunnelse({
                                                        fom: beregning.periodeFom,
                                                        tom: beregning.periodeTom,
                                                        resultat: undefined,
                                                        begrunnelse: undefined,
                                                    });
                                                }}
                                                label={'Legg til'}
                                                ikon={<Pluss />}
                                                spinner={false}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
};

interface IBegrunnelseInputProps {
    begrunnelse?: VedtakBegrunnelse;
    fom: string;
    id: number;
    resultat?: BehandlingResultat;
    tom?: string;
}

const BegrunnelseInput: React.FC<IBegrunnelseInputProps> = ({
    begrunnelse,
    fom,
    id,
    resultat,
    tom,
}) => {
    const { erLesevisning } = useBehandling();
    const { endreBegrunnelse, vilkårBegrunnelser, slettBegrunnelse } = useBegrunnelser();

    const onChangeResultat = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value ? event.target.value : '';
        endreBegrunnelse({
            id,
            fom,
            tom,
            resultat:
                value !== 'Velg behandlingsresultat' ? (value as BehandlingResultat) : undefined,
            begrunnelse: value !== 'Velg behandlingsresultat' ? begrunnelse : undefined,
        });
    };

    const onChangeBegrunnelse = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value ? event.target.value : '';
        endreBegrunnelse({
            id,
            fom,
            tom,
            resultat,
            begrunnelse: value !== 'Velg begrunnelse' ? (value as VedtakBegrunnelse) : undefined,
        });
    };

    const begrunnelser = vilkårBegrunnelser && resultat && vilkårBegrunnelser[resultat];
    return (
        <div className={'begrunnelse-input'}>
            <FamilieSelect
                className="begrunnelse-input__select"
                name="begrunnelse"
                bredde={'l'}
                erLesevisning={erLesevisning()}
                onChange={onChangeResultat}
                value={resultat}
            >
                <option>Velg behandlingsresultat</option>
                {vilkårBegrunnelser &&
                    Object.keys(vilkårBegrunnelser)
                        .filter((behandlingResultat: string) => {
                            return (
                                vilkårBegrunnelser &&
                                vilkårBegrunnelser[behandlingResultat as BehandlingResultat]
                                    .length > 0
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
                value={begrunnelse}
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
                    slettBegrunnelse({
                        id,
                        fom,
                        tom,
                        resultat,
                        begrunnelse,
                    });
                }}
                id={`slett-knapp-${id}`}
                label={'Slett'}
                ikon={<Slett />}
            />
        </div>
    );
};

export default BegrunnelserTabell;
