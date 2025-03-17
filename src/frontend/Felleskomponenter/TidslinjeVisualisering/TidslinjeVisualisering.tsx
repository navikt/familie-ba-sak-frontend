import React, { useState, useEffect } from 'react';

import { endOfMonth } from 'date-fns';
import { useMatch } from 'react-router';
import styled from 'styled-components';

import { GlobeIcon as Eu, HouseIcon as NorwegianFlag } from '@navikt/aksel-icons';
import { BodyShort, Heading } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import { Tidslinje } from '@navikt/familie-tidslinje';
import type { Periode, Etikett } from '@navikt/familie-tidslinje';
import type { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import { useTidslinje } from '../../context/TidslinjeContext';
import TidslinjeEtikett from '../../sider/Fagsak/Behandling/Sider/Behandlingsresultat/TidslinjeEtikett';
import TidslinjeNavigering from '../../sider/Fagsak/Behandling/Sider/Behandlingsresultat/TidslinjeNavigering';
import Vinduvelger from '../../sider/Fagsak/Behandling/Sider/Behandlingsresultat/VinduVelger';
import { PersonType } from '../../typer/person';
import type {
    IRestTidslinjePeriode,
    IRestTidslinjerForBarn,
    IRestTidslinjerForSøker,
    ITidslinjer,
    IVilkårRegelverkResultat,
} from '../../typer/tidslinjer';
import type { IVilkårConfig } from '../../typer/vilkår';
import { Regelverk, Resultat, vilkårConfig } from '../../typer/vilkår';
import { isoStringTilDate } from '../../utils/dato';
import { formaterIdent } from '../../utils/formatter';

const Container = styled.div`
    padding: 2rem;
    overflow: auto;
    height: calc(100vh - 3rem);
`;

const TidslinjeHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;
`;

const TidslinjeControls = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    > div:first-child {
        margin-bottom: 1rem;
    }
`;

const TidslinjeContainer = styled.div`
    display: flex;

    & .tidslinje {
        margin: 0;
        overflow-x: hidden;
    }

    & .typo-normal {
        &:first-child {
            margin-top: 4.8rem;
        }
    }

    & .typo-normal {
        &:not(:first-child) {
            margin-top: 2.125rem;
        }
    }
`;

const TidslinjeLabels = styled.div`
    min-width: 7rem;
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
    const matchBehandlingId = useMatch('/tidslinjer/:behandlingId');
    const behandlingId = matchBehandlingId?.params.behandlingId;

    const { genererFormatertÅrstall, aktivEtikett, aktivtTidslinjeVindu, naviger } = useTidslinje();

    const [tidslinjerRessurs, settTidslinjerRessurs] =
        useState<Ressurs<ITidslinjer>>(byggTomRessurs());
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
            fom: isoStringTilDate(resultatPeriode.fraOgMed),
            tom: isoStringTilDate(resultatPeriode.tilOgMed),
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
            fom: isoStringTilDate(resultatPeriode.fraOgMed),
            tom: isoStringTilDate(resultatPeriode.tilOgMed),
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
                fom: isoStringTilDate(regelverkPeriode.fraOgMed),
                tom: isoStringTilDate(regelverkPeriode.tilOgMed),
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
                    <Heading size="xlarge" level={'1'}>
                        Tidslinjer
                    </Heading>
                    {barna.map((barn, index) => (
                        <div key={`barn_${index}`}>
                            <TidslinjeHeader>
                                <Heading size={'small'} level={'2'}>{`${formaterIdent(
                                    barn
                                )}: ${genererFormatertÅrstall()}`}</Heading>
                                <TidslinjeControls>
                                    <Vinduvelger />
                                    <TidslinjeNavigering naviger={naviger} />
                                </TidslinjeControls>
                            </TidslinjeHeader>
                            <TidslinjeContainer>
                                <TidslinjeLabels>
                                    {tidslinjerLabels.map((label, index) => {
                                        return (
                                            <BodyShort key={index} title={label}>
                                                {label}
                                            </BodyShort>
                                        );
                                    })}
                                </TidslinjeLabels>
                                <Tidslinje
                                    rader={genererRaderForBarnetsTidslinjer(
                                        tidslinjerRessurs.data.søkersTidslinjer,
                                        tidslinjerRessurs.data.barnasTidslinjer[barn]
                                    )}
                                    etikettRender={(etikett: Etikett) => (
                                        <TidslinjeEtikett etikett={etikett} />
                                    )}
                                    startDato={aktivtTidslinjeVindu.startDato}
                                    sluttDato={aktivtTidslinjeVindu.sluttDato}
                                    aktivtUtsnitt={
                                        aktivEtikett && {
                                            fom: aktivEtikett.date,
                                            tom: endOfMonth(aktivEtikett.date),
                                        }
                                    }
                                />
                            </TidslinjeContainer>
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
