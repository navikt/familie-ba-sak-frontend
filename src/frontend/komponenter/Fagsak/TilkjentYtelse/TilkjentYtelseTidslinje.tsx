import React, { useEffect, useState } from 'react';

import '@navikt/helse-frontend-tidslinje/lib/main.css';

import { Feilmelding, Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';
import { Periode, Tidslinje } from '@navikt/helse-frontend-tidslinje';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { useTidslinje } from '../../../context/TidslinjeContext';
import { formaterIdent, sorterFødselsdato } from '../../../utils/formatter';
import { kalenderDatoFraDate, kalenderDatoTilDate, sisteDagIMåned } from '../../../utils/kalender';
import TidslinjeEtikett from './TidslinjeEtikett';
import TidslinjeNavigering from './TidslinjeNavigering';
import Vinduvelger from './VinduVelger';

const TilkjentYtelseTidslinje: React.FC = () => {
    const { åpenBehandling } = useBehandling();
    const { fagsak } = useFagsakRessurser();
    const {
        genererFormatertÅrstall,
        genererRader,
        aktivEtikett,
        aktivtTidslinjeVindu,
        mapPersonerMedAndelerTilkjentYtelseTilPersoner,
        mapPersonerTilPersonerMedAndelerTilkjentYtelse,
        naviger,
    } = useTidslinje();
    const [feilmelding, settFeilmelding] = useState<string>();
    useEffect(() => {
        genererRader(tidslinjePersonerSortert);
    }, [fagsak]);

    if (åpenBehandling.status !== RessursStatus.SUKSESS) {
        return null;
    }

    const personer = åpenBehandling.data.personer;
    const personerFraAndelerTilkjentYtelseSortert = mapPersonerMedAndelerTilkjentYtelseTilPersoner(
        personer,
        åpenBehandling.data.personerMedAndelerTilkjentYtelse
    ).sort((personA, personB) => sorterFødselsdato(personA.fødselsdato, personB.fødselsdato));

    const tidslinjePersonerSortert = mapPersonerTilPersonerMedAndelerTilkjentYtelse(
        personerFraAndelerTilkjentYtelseSortert,
        åpenBehandling.data.personerMedAndelerTilkjentYtelse
    );

    const onSelectPeriode = (periode: Periode) => {
        settFeilmelding(undefined);
        const identOgPeriode = periode.id?.split('_');
        if (identOgPeriode?.length === 2) {
            const valgtIdent = identOgPeriode[0];
            const perioderForIdent = tidslinjePersonerSortert.filter(
                p => p.personIdent === valgtIdent
            );
            const valgtPeriode = perioderForIdent[Number(identOgPeriode[1])];

            // TODO: Skal brukes til å fylle ut skjema
            console.log('valgtIdent ', valgtIdent);
            console.log('valgtPeriode ', valgtPeriode);
        } else {
            settFeilmelding('Klarte ikke hente valgt periode.');
        }
    };

    const tidslinjeRader = genererRader(tidslinjePersonerSortert);

    return (
        <>
            <div className={'tidslinje-header'}>
                <Undertittel>{genererFormatertÅrstall()}</Undertittel>
                <div className={'tidslinje-header__controls'}>
                    <Vinduvelger />
                    <TidslinjeNavigering naviger={naviger} />
                </div>
            </div>
            <div className={'tidslinje-container'}>
                <div className={'tidslinje-container__labels'}>
                    {personerFraAndelerTilkjentYtelseSortert.map((person, index) => {
                        return (
                            <Normaltekst key={index} title={person.navn}>
                                {formaterIdent(person.personIdent)}
                            </Normaltekst>
                        );
                    })}
                </div>
                <Tidslinje
                    rader={tidslinjeRader}
                    direction={'right'}
                    etikettRender={(etikett: Skalaetikett) => (
                        <TidslinjeEtikett etikett={etikett} />
                    )}
                    onSelectPeriode={onSelectPeriode}
                    startDato={kalenderDatoTilDate(aktivtTidslinjeVindu.startDato, 23, 0)}
                    sluttDato={kalenderDatoTilDate(aktivtTidslinjeVindu.sluttDato)}
                    aktivtUtsnitt={
                        aktivEtikett && {
                            fom: aktivEtikett.dato,
                            tom: kalenderDatoTilDate(
                                sisteDagIMåned(kalenderDatoFraDate(aktivEtikett.dato))
                            ),
                        }
                    }
                />
            </div>
            {feilmelding && <Feilmelding children={feilmelding} />}
        </>
    );
};

export default TilkjentYtelseTidslinje;
