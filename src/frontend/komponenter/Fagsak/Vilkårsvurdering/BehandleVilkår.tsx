import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';

import { IFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import BehandlingVilkårSkjema from './BehandleVilkårSkjema';
import { slåSammenVilkårForPerson } from '../../../context/Vilkårsvurdering/vilkårsvurdering';
import {
    IPeriodeResultat,
    IRestPeriodeResultat,
    IVilkårResultat,
    IRestVilkårResultat,
} from '../../../typer/vilkår';
import { randomUUID } from '../../../utils/commons';
import { nyPeriode } from '../../../typer/periode';
import { IPerson } from '../../../typer/person';

interface IProps {
    fagsak: IFagsak;
}

const BehandleVilkår: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { vilkårsvurdering, settVilkårsvurdering } = useVilkårsvurdering();

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');
    const history = useHistory();
    const { opprettEllerOppdaterVilkårsvurdering, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

    React.useEffect(() => {
        if (aktivBehandling && aktivBehandling.periodeResultater.length !== 0) {
            // TODO map til frontend format
            const mappetVilkårsvurdering = aktivBehandling.periodeResultater.reduce(
                (acc: IPeriodeResultat[], periodeResultat: IRestPeriodeResultat) => {
                    const reduceVilkårsvurderingForPersonIndex = acc.findIndex(
                        (pResultat: IPeriodeResultat) =>
                            pResultat.personIdent === periodeResultat.personIdent
                    );

                    const vilkårsvurderingForPerson: IVilkårResultat[] = slåSammenVilkårForPerson(
                        periodeResultat.vilkårResultater.map(
                            (vilkårResultat: IRestVilkårResultat) => ({
                                vilkårType: vilkårResultat.vilkårType,
                                id: randomUUID(),
                                begrunnelse: vilkårResultat.begrunnelse,
                                resultat: vilkårResultat.resultat,
                                periode: nyPeriode(
                                    periodeResultat.periodeFom,
                                    periodeResultat.periodeTom
                                ),
                            })
                        ),
                        true
                    );

                    if (reduceVilkårsvurderingForPersonIndex !== -1) {
                        acc[reduceVilkårsvurderingForPersonIndex] = {
                            ...acc[reduceVilkårsvurderingForPersonIndex],
                            vilkårResultater: [
                                ...acc[reduceVilkårsvurderingForPersonIndex].vilkårResultater,
                                ...vilkårsvurderingForPerson,
                            ],
                        };
                    } else {
                        acc.push({
                            personIdent: periodeResultat.personIdent,
                            vilkårResultater: vilkårsvurderingForPerson,
                            person: aktivBehandling.personer.find(
                                (person: IPerson) =>
                                    person.personIdent === periodeResultat.personIdent
                            )!!,
                        });
                    }

                    return acc;
                },
                []
            );
            console.log(aktivBehandling.periodeResultater, mappetVilkårsvurdering);
            settVilkårsvurdering(mappetVilkårsvurdering);
        }
    }, [fagsak]);

    if (!aktivBehandling) {
        return (
            <div>
                <Normaltekst>Ingen aktiv behandling</Normaltekst>
            </div>
        );
    }

    if (vilkårsvurdering.length === 0) {
        return <div>Finner ingen vilkår på behandlingen. Det er sansynligvis noe feil.</div>;
    }

    return (
        <div className={'vilkårsvurdering'}>
            <Skjemasteg
                tittel={'Vilkår'}
                forrigeOnClick={() => {
                    history.push(`/fagsak/${fagsak.id}/registrer-soknad`);
                }}
                nesteOnClick={() => {
                    opprettEllerOppdaterVilkårsvurdering(vilkårsvurdering, fagsak);
                }}
                senderInn={senderInn}
            >
                {aktivBehandling.periodeResultater.length !== 0 && (
                    <>
                        <br />
                        <AlertStripeAdvarsel
                            children={
                                'Det finnes allerede en vilkårsvurdering på behandlingen. Vi har fylt ut gjeldende vurdering.'
                            }
                        />
                        <br />
                    </>
                )}

                <BehandlingVilkårSkjema
                    opprettelseFeilmelding={opprettelseFeilmelding}
                    visFeilmeldinger={visFeilmeldinger}
                    behandlingstype={aktivBehandling.type}
                />
            </Skjemasteg>
        </div>
    );
};

export default BehandleVilkår;
