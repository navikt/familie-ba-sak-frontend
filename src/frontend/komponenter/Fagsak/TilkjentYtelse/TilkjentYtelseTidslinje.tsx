import React from 'react';
import '@navikt/helse-frontend-tidslinje/lib/main.css';

import { IPersonBeregning } from '../../../typer/beregning';
import { useBehandling } from '../../../context/BehandlingContext';
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
import { RessursStatus } from '@navikt/familie-typer';
import { IPerson } from '../../../typer/person';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Tidslinje } from '@navikt/helse-frontend-tidslinje';
import { formaterPersonIdent, sisteDatoIMnd } from '../../../utils/formatter';
import TidslinjeEtikett from './TidslinjeEtikett';
import { useTidslinje } from '../../../context/TidslinjeContext';
import Vinduvelger from './VinduVelger';
import TidslinjeNavigering from './TidslinjeNavigering';

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
