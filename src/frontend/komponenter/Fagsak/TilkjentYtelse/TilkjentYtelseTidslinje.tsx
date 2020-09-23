import React from 'react';
import '@navikt/helse-frontend-tidslinje/lib/main.css';

import { IPersonBeregning } from '../../../typer/beregning';
import { useBehandling } from '../../../context/BehandlingContext';
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
import { RessursStatus } from '@navikt/familie-typer';
import { IPerson } from '../../../typer/person';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Tidslinje } from '@navikt/helse-frontend-tidslinje/lib';
import { formaterPersonIdent, sisteDatoIMnd } from '../../../utils/formatter';
import FamilieChevron from '../../../ikoner/FamilieChevron';
import { Flatknapp } from 'nav-frontend-knapper';
import TidslinjeEtikett from './TidslinjeEtikett';
import { NavigeringsRetning, useTidslinje } from '../../../context/TidslinjeContext';
import Vinduvelger from './VinduVelger';

const TilkjentYtelseTidslinje: React.FC = () => {
    const { åpenBehandling } = useBehandling();
    const {
        genererFormatertÅrstall,
        naviger,
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

    return (
        <>
            <div className={'tidslinje-header'}>
                <Undertittel>{genererFormatertÅrstall()}</Undertittel>
                <div className={'tidslinje-header__controls'}>
                    <Vinduvelger />
                    <div className={'tidslinje-header__navigering'}>
                        <Flatknapp
                            title={'Naviger til venstre'}
                            mini
                            kompakt
                            onClick={() => naviger(NavigeringsRetning.VENSTRE)}
                        >
                            <FamilieChevron title={'Naviger til venstre'} retning={'venstre'} />
                            <span className="sr-only">Naviger til venstre i tidslinjen</span>
                        </Flatknapp>
                        <Flatknapp
                            title={'Naviger til høyre'}
                            mini
                            kompakt
                            onClick={() => naviger(NavigeringsRetning.HØYRE)}
                        >
                            <FamilieChevron title={'Naviger til høyre'} />
                            <span className="sr-only">Naviger til høyre i tidslinjen</span>
                        </Flatknapp>
                    </div>
                </div>
            </div>
            <div className={'tidslinje'}>
                <div className={'tidslinje__labels'}>
                    {aktivVedtak.personBeregninger.map(
                        (personBeregning: IPersonBeregning, index: number) => {
                            const person: IPerson | undefined = personer.find(
                                (person: IPerson) =>
                                    person.personIdent === personBeregning.personIdent
                            );
                            return (
                                person && (
                                    <Normaltekst key={index} title={person.navn}>
                                        {formaterPersonIdent(person.personIdent)}
                                    </Normaltekst>
                                )
                            );
                        }
                    )}
                </div>
                <Tidslinje
                    rader={tidslinjeRader}
                    direction={'right'}
                    EtikettKomponent={TidslinjeEtikett}
                    startDato={aktivtTidslinjeVindu.startDato.toDate()}
                    sluttDato={aktivtTidslinjeVindu.sluttDato.toDate()}
                    aktivPeriode={
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
