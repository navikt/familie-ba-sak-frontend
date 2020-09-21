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
import { ToggleGruppe } from 'nav-frontend-toggle';
import FamilieChevron from '../../../ikoner/FamilieChevron';
import { Knapp } from 'nav-frontend-knapper';
import TidslinjeEtikett from './TidslinjeEtikett';
import { NavigeringsRetning, useTidslinje } from '../../../context/TidslinjeContext';

const TilkjentYtelseTidslinje: React.FC = () => {
    const { åpenBehandling } = useBehandling();
    const {
        tidslinjeInput,
        genererFormatertÅrstall,
        genererToggleKnapper,
        naviger,
        endreSkala,
        genererRader,
        aktivEtikett,
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
                    <ToggleGruppe
                        defaultToggles={genererToggleKnapper()}
                        kompakt
                        minstEn
                        onChange={endreSkala}
                    />
                    <div className={'tidslinje-header__navigering'}>
                        <Knapp mini kompakt onClick={() => naviger(NavigeringsRetning.VENSTRE)}>
                            <FamilieChevron retning={'venstre'} />
                            <span className="sr-only">Naviger til venstre i tidslinjen</span>
                        </Knapp>
                        <Knapp mini kompakt onClick={() => naviger(NavigeringsRetning.HØYRE)}>
                            <FamilieChevron />
                            <span className="sr-only">Naviger til høyre i tidslinjen</span>
                        </Knapp>
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
                    startDato={tidslinjeInput.startDato.toDate()}
                    sluttDato={tidslinjeInput.sluttDato.toDate()}
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
