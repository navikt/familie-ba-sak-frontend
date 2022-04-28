import React, { useState, useEffect } from 'react';

import { useRouteMatch } from 'react-router';
import styled from 'styled-components';

import { Normaltekst, Sidetittel, Undertittel } from 'nav-frontend-typografi';

import { Globe as Eu, Home as NorwegianFlag } from '@navikt/ds-icons';
import { useHttp } from '@navikt/familie-http';
import { type Periode, Tidslinje, type Etikett } from '@navikt/familie-tidslinje';
import { byggTomRessurs, type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useTidslinje } from '../../../context/TidslinjeContext';
import { PersonType } from '../../../typer/person';
import type {
    IRestTidslinjePeriode,
    IRestTidslinjerForBarn,
    IRestTidslinjerForSøker,
    ITidslinjer,
    IVilkårRegelverkResultat,
} from '../../../typer/tidslinjer';
import { type IVilkårConfig, Regelverk, Resultat, vilkårConfig } from '../../../typer/vilkår';
import { formaterIdent } from '../../../utils/formatter';
import {
    kalenderDato,
    kalenderDatoFraDate,
    kalenderDatoTilDate,
    sisteDagIMåned,
} from '../../../utils/kalender';
import TidslinjeEtikett from '../../Fagsak/Behandlingsresultat/TidslinjeEtikett';
import TidslinjeNavigering from '../../Fagsak/Behandlingsresultat/TidslinjeNavigering';
import Vinduvelger from '../../Fagsak/Behandlingsresultat/VinduVelger';

const Container = styled.div`
    padding: 2rem;
    overflow: auto;
    height: calc(100vh - 6rem);
`;

const tidslinjerLabels = [
    ...Object.values(vilkårConfig)
        .filter(vc => vc.parterDetteGjelderFor.includes(PersonType.SØKER))
        .map(vc => vc.beskrivelse),
    '----',
    ...Object.values(vilkårConfig)
        .filter(vc => vc.parterDetteGjelderFor.includes(PersonType.BARN))
        .map(vc => vc.beskrivelse),
    '----',
    'Oppfylte perioder',
    '----',
    'Regelverk',
];

const TidslinjeVisualisering: React.FC = () => {
    const matchBehandlingId = useRouteMatch<{ behandlingId: string }>('/tidslinjer/:behandlingId');
    const behandlingId = matchBehandlingId?.params.behandlingId;

    const { genererFormatertÅrstall, aktivEtikett, aktivtTidslinjeVindu, naviger } = useTidslinje();

    const [tidslinjerRessurs, settTidslinjerRessurs] = useState<Ressurs<ITidslinjer>>(
        byggTomRessurs()
    );
    const { request } = useHttp();

    useEffect(() => {
        if (behandlingId) {
            request<void, ITidslinjer>({
                method: 'GET',
                url: `/familie-ba-sak/api/tidslinjer/${behandlingId}`,
            }).then((tidslinjer: Ressurs<ITidslinjer>) => {
                settTidslinjerRessurs(tidslinjer);
            });
        }
    }, []);

    const mapResultatTilStatus = (
        resultat: Resultat
    ): 'suksess' | 'feil' | 'advarsel' | 'ukjent' => {
        switch (resultat) {
            case Resultat.OPPFYLT:
                return 'suksess';
            case Resultat.IKKE_OPPFYLT:
                return 'feil';
            case Resultat.IKKE_VURDERT:
                return 'advarsel';
            default:
                return 'ukjent';
        }
    };

    const genererRaderVilkårRegelverkResultatTidslinje = (
        resultatTidslinje: IRestTidslinjePeriode<IVilkårRegelverkResultat>[]
    ): Periode[] => {
        return resultatTidslinje.map(resultatPeriode => ({
            fom: kalenderDatoTilDate(kalenderDato(resultatPeriode.fraOgMed)),
            tom: kalenderDatoTilDate(kalenderDato(resultatPeriode.tilOgMed)),
            id: `${resultatPeriode.fraOgMed}_${resultatPeriode.tilOgMed}`,
            status: mapResultatTilStatus(resultatPeriode.innhold.resultat),
        }));
    };

    const genererSorterteVilkårsresultaterTidslinjer = (
        vilkårsresultaterTidslinjer: IRestTidslinjePeriode<IVilkårRegelverkResultat>[][]
    ) => {
        return Object.values(vilkårConfig).reduce((acc: Periode[][], vc: IVilkårConfig) => {
            const vilkårTidslinje = vilkårsresultaterTidslinjer.find(vTidslinje =>
                vTidslinje.some(v => v.innhold.vilkår === vc.key)
            );

            return vilkårTidslinje !== undefined
                ? [...acc, genererRaderVilkårRegelverkResultatTidslinje(vilkårTidslinje)]
                : acc;
        }, []);
    };

    const genererRaderResultatTidslinje = (
        resultatTidslinje: IRestTidslinjePeriode<Resultat>[]
    ): Periode[] => {
        return resultatTidslinje.map(resultatPeriode => ({
            fom: kalenderDatoTilDate(kalenderDato(resultatPeriode.fraOgMed)),
            tom: kalenderDatoTilDate(kalenderDato(resultatPeriode.tilOgMed)),
            id: `${resultatPeriode.fraOgMed}_${resultatPeriode.tilOgMed}`,
            status: mapResultatTilStatus(resultatPeriode.innhold),
        }));
    };

    const genererRaderRegelverkTidslinje = (
        regelverkTidslinje: IRestTidslinjePeriode<Regelverk | undefined>[]
    ): Periode[] => {
        return regelverkTidslinje
            .filter(regelverkPeriode => regelverkPeriode.innhold)
            .map(regelverkPeriode => ({
                fom: kalenderDatoTilDate(kalenderDato(regelverkPeriode.fraOgMed)),
                tom: kalenderDatoTilDate(kalenderDato(regelverkPeriode.tilOgMed)),
                id: `${regelverkPeriode.fraOgMed}_${regelverkPeriode.tilOgMed}`,
                status:
                    regelverkPeriode.innhold === Regelverk.NASJONALE_REGLER
                        ? 'suksess'
                        : 'advarsel',
                children:
                    regelverkPeriode.innhold === Regelverk.EØS_FORORDNINGEN ? (
                        <Eu width={24} height={24} />
                    ) : (
                        <NorwegianFlag width={24} height={24} />
                    ),
            }));
    };

    const genererRaderForBarnetsTidslinjer = (
        søkersTidslinjer: IRestTidslinjerForSøker,
        barnetsTidslinjer: IRestTidslinjerForBarn
    ): Periode[][] => {
        const barnetsVilkårPerioder: Periode[][] = genererSorterteVilkårsresultaterTidslinjer(
            barnetsTidslinjer.vilkårTidslinjer
        );

        const søkersVilkårPerioder: Periode[][] = genererSorterteVilkårsresultaterTidslinjer(
            søkersTidslinjer.vilkårTidslinjer
        );

        const barnetsOppfyllerEgneVilkårIKombinasjonMedSøkerTidslinje: Periode[] =
            genererRaderResultatTidslinje(
                barnetsTidslinjer.oppfyllerEgneVilkårIKombinasjonMedSøkerTidslinje
            );

        const barnetsRegelverkTidslinje: Periode[] = genererRaderRegelverkTidslinje(
            barnetsTidslinjer.regelverkTidslinje
        );

        return [
            ...søkersVilkårPerioder,
            ...(søkersVilkårPerioder.length === 2 ? [[], []] : [[]]),
            ...barnetsVilkårPerioder,
            [],
            barnetsOppfyllerEgneVilkårIKombinasjonMedSøkerTidslinje,
            [],
            barnetsRegelverkTidslinje,
        ];
    };

    switch (tidslinjerRessurs.status) {
        case RessursStatus.SUKSESS:
            const barna = Object.keys(tidslinjerRessurs.data.barnasTidslinjer).sort();

            return (
                <Container>
                    <Sidetittel>Tidslinjer</Sidetittel>
                    {barna.map((barn, index) => (
                        <div key={`barn_${index}`}>
                            <div className={'tidslinje-header'}>
                                <Undertittel>{`${formaterIdent(
                                    barn
                                )}: ${genererFormatertÅrstall()}`}</Undertittel>
                                <div className={'tidslinje-header__controls'}>
                                    <Vinduvelger />
                                    <TidslinjeNavigering naviger={naviger} />
                                </div>
                            </div>
                            <div className={'tidslinje-container'}>
                                <div className={'tidslinje-container__labels'}>
                                    {tidslinjerLabels.map((label, index) => {
                                        return (
                                            <Normaltekst key={index} title={label}>
                                                {label}
                                            </Normaltekst>
                                        );
                                    })}
                                </div>
                                <Tidslinje
                                    rader={genererRaderForBarnetsTidslinjer(
                                        tidslinjerRessurs.data.søkersTidslinjer,
                                        tidslinjerRessurs.data.barnasTidslinjer[barn]
                                    )}
                                    etikettRender={(etikett: Etikett) => (
                                        <TidslinjeEtikett etikett={etikett} />
                                    )}
                                    startDato={kalenderDatoTilDate(
                                        aktivtTidslinjeVindu.startDato,
                                        23,
                                        0
                                    )}
                                    sluttDato={kalenderDatoTilDate(aktivtTidslinjeVindu.sluttDato)}
                                    aktivtUtsnitt={
                                        aktivEtikett && {
                                            fom: aktivEtikett.date,
                                            tom: kalenderDatoTilDate(
                                                sisteDagIMåned(
                                                    kalenderDatoFraDate(aktivEtikett.date)
                                                )
                                            ),
                                        }
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </Container>
            );
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return <div>Feilet med feilmeldingen: {tidslinjerRessurs.frontendFeilmelding}</div>;
        default:
            return <div>Henter</div>;
    }
};

export default TidslinjeVisualisering;
