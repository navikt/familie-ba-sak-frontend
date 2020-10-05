import React from 'react';
import '@navikt/helse-frontend-tidslinje/lib/main.css';

import { IPersonBeregning } from '../../../typer/beregning';
import { useBehandling } from '../../../context/BehandlingContext';
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
import { RessursStatus } from '@navikt/familie-typer';
import { IPerson } from '../../../typer/person';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Tidslinje } from '@navikt/helse-frontend-tidslinje';
import { formaterPersonIdent, sisteDatoIMnd, sorterFødselsdato } from '../../../utils/formatter';
import TidslinjeEtikett from './TidslinjeEtikett';
import { useTidslinje } from '../../../context/TidslinjeContext';
import Vinduvelger from './VinduVelger';
import TidslinjeNavigering from './TidslinjeNavigering';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

const TilkjentYtelseTidslinje: React.FC = () => {
    const { åpenBehandling } = useBehandling();
    const {
        genererFormatertÅrstall,
        genererRader,
        aktivEtikett,
        aktivtTidslinjeVindu,
    } = useTidslinje();

    const aktivVedtak =
        åpenBehandling.status === RessursStatus.SUKSESS
            ? hentAktivVedtakPåBehandlig(åpenBehandling.data)
            : undefined;

    const tidslinjeRader = genererRader(aktivVedtak && aktivVedtak.personBeregninger);
    if (
        åpenBehandling.status !== RessursStatus.SUKSESS ||
        !aktivVedtak ||
        tidslinjeRader.length === 0
    )
        return null;

    const personer = åpenBehandling.data.personer;

    const mapPersonberegningerTilPersoner = (): IPerson[] => {
        const personBeregningerTilPersoner: IPerson[] = [];

        aktivVedtak?.personBeregninger
            .map((personBeregning: IPersonBeregning) => {
                return personer.find(
                    (person: IPerson) => person.personIdent === personBeregning.personIdent
                );
            })
            .forEach(person => {
                person && personBeregningerTilPersoner.push(person);
            });

        return personBeregningerTilPersoner;
    };

    return (
        <>
            <div className={'tidslinje-header'}>
                <Undertittel>{genererFormatertÅrstall()}</Undertittel>
                <div className={'tidslinje-header__controls'}>
                    <Vinduvelger />
                    <TidslinjeNavigering />
                </div>
            </div>
            <div className={'tidslinje'}>
                <div className={'tidslinje__labels'}>
                    {mapPersonberegningerTilPersoner()
                        .sort((personA, personB) =>
                            sorterFødselsdato(personA.fødselsdato, personB.fødselsdato)
                        )
                        .map((person, index) => {
                            return (
                                <Normaltekst key={index} title={person.navn}>
                                    {formaterPersonIdent(person.personIdent)}
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
                    startDato={aktivtTidslinjeVindu.startDato.toDate()}
                    sluttDato={aktivtTidslinjeVindu.sluttDato.toDate()}
                    aktivtUtsnitt={
                        aktivEtikett && {
                            fom: aktivEtikett.dato,
                            tom: sisteDatoIMnd(
                                aktivEtikett.dato.getMonth(),
                                aktivEtikett.dato.getFullYear()
                            ),
                        }
                    }
                />
            </div>
        </>
    );
};

export default TilkjentYtelseTidslinje;
