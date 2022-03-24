import React, { useState, useEffect } from 'react';

import { useRouteMatch } from 'react-router';
import styled from 'styled-components';

import { Normaltekst, Sidetittel, Undertittel } from 'nav-frontend-typografi';

import { useHttp } from '@navikt/familie-http';
import { byggTomRessurs, type Ressurs, RessursStatus } from '@navikt/familie-typer';
import { type Periode, Tidslinje } from '@navikt/helse-frontend-tidslinje';
import type { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

import { useTidslinje } from '../../../context/TidslinjeContext';
import type {
    IRestRegelverkTidslinjePeriode,
    IRestResultatTidslinjePeriode,
    IRestTidslinjerForBarn,
    IRestTidslinjerForSøker,
    IRestVilkårRegelverkResultatTidslinjePeriode,
    ITidslinjer,
} from '../../../typer/tidslinjer';
import { Regelverk, Resultat } from '../../../typer/vilkår';
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
    'Under 18 år',
    'Bor med søker',
    'Bosatt i riket',
    'Lovlig opphold',
    'Gift/partnerskap',
    '----',
    'Bosatt i riket',
    'Lovlig opphold',
    'Utvidet',
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
        resultatTidslinje: IRestVilkårRegelverkResultatTidslinjePeriode[]
    ): Periode[] => {
        return resultatTidslinje.map(resultatPeriode => ({
            fom: kalenderDatoTilDate(kalenderDato(resultatPeriode.fraOgMed)),
            tom: kalenderDatoTilDate(kalenderDato(resultatPeriode.tilOgMed)),
            id: `${resultatPeriode.fraOgMed}_${resultatPeriode.tilOgMed}`,
            status: mapResultatTilStatus(resultatPeriode.innhold.resultat),
        }));
    };

    const genererRaderResultatTidslinje = (
        resultatTidslinje: IRestResultatTidslinjePeriode[]
    ): Periode[] => {
        return resultatTidslinje.map(resultatPeriode => ({
            fom: kalenderDatoTilDate(kalenderDato(resultatPeriode.fraOgMed)),
            tom: kalenderDatoTilDate(kalenderDato(resultatPeriode.tilOgMed)),
            id: `${resultatPeriode.fraOgMed}_${resultatPeriode.tilOgMed}`,
            status: mapResultatTilStatus(resultatPeriode.innhold),
        }));
    };

    const genererRaderRegelverkTidslinje = (
        regelverkTidslinje: IRestRegelverkTidslinjePeriode[]
    ): Periode[] => {
        return regelverkTidslinje.map(regelverkPeriode => ({
            fom: kalenderDatoTilDate(kalenderDato(regelverkPeriode.fraOgMed)),
            tom: kalenderDatoTilDate(kalenderDato(regelverkPeriode.tilOgMed)),
            id: `${regelverkPeriode.fraOgMed}_${regelverkPeriode.tilOgMed}`,
            status:
                regelverkPeriode.innhold === Regelverk.NASJONALE_REGLER ? 'suksess' : 'advarsel',
        }));
    };

    const genererRaderForBarnetsTidslinjer = (
        søkersTidslinjer: IRestTidslinjerForSøker,
        barnetsTidslinjer: IRestTidslinjerForBarn
    ): Periode[][] => {
        const barnetsVilkårPerioder: Periode[][] = barnetsTidslinjer.vilkårTidslinjer.map(
            vilkårTidslinje => genererRaderVilkårRegelverkResultatTidslinje(vilkårTidslinje.sort())
        );

        const søkersVilkårPerioder: Periode[][] = søkersTidslinjer.vilkårTidslinjer.map(
            vilkårTidslinje => genererRaderVilkårRegelverkResultatTidslinje(vilkårTidslinje.sort())
        );

        const barnetsOppfyllerEgneVilkårIKombinasjonMedSøkerTidslinje: Periode[] =
            genererRaderResultatTidslinje(
                barnetsTidslinjer.oppfyllerEgneVilkårIKombinasjonMedSøkerTidslinje
            );

        const barnetsRegelverkTidslinje: Periode[] = genererRaderRegelverkTidslinje(
            barnetsTidslinjer.regelverkTidslinje
        );

        return [
            ...barnetsVilkårPerioder,
            [],
            ...søkersVilkårPerioder,
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
                    {barna.map(barn => (
                        <>
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
                                    direction={'right'}
                                    etikettRender={(etikett: Skalaetikett) => (
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
                                            fom: aktivEtikett.dato,
                                            tom: kalenderDatoTilDate(
                                                sisteDagIMåned(
                                                    kalenderDatoFraDate(aktivEtikett.dato)
                                                )
                                            ),
                                        }
                                    }
                                />
                            </div>
                        </>
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
