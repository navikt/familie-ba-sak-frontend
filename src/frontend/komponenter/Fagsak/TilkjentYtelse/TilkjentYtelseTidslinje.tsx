import React, { SyntheticEvent, useState } from 'react';
import '@navikt/helse-frontend-tidslinje/lib/main.css';

import { IPersonBeregning, IYtelsePeriode } from '../../../typer/beregning';
import { useBehandling } from '../../../context/BehandlingContext';
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
import { RessursStatus } from '@navikt/familie-typer';
import { IPerson } from '../../../typer/person';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Tidslinje, Periode } from '@navikt/helse-frontend-tidslinje/lib';
import { formaterPersonIdent } from '../../../utils/formatter';
import moment from 'moment';
import { ToggleGruppe, ToggleKnappPureProps } from 'nav-frontend-toggle';
import TidslinjeEtikett from './TidslinjeEtikett';

interface ITidslinjeSkala {
    id: number;
    navn: string;
    verdi: number;
}

enum TidslinjeSkala {
    HALVT_ÅR,
    ETT_ÅR,
    TRE_ÅR,
}

const genererRader = (personBeregninger?: IPersonBeregning[]): Periode[][] => {
    return personBeregninger
        ? personBeregninger.map((personBeregning: IPersonBeregning) => {
              return personBeregning.ytelsePerioder.map(
                  (ytelsePeriode: IYtelsePeriode, index: number) => ({
                      fom: new Date(ytelsePeriode.stønadFom),
                      tom: new Date(ytelsePeriode.stønadTom),
                      id: `${personBeregning.personIdent}_${index}`,
                      status: 'suksess',
                  })
              );
          })
        : [[]];
};

const TilkjentYtelseTidslinje: React.FC = () => {
    const { åpenBehandling } = useBehandling();
    const [tidslinjeDato, settTidslinjeDato] = useState({
        slutt: moment(),
        start: moment().subtract(12, 'month'),
    });
    const aktivVedtak =
        åpenBehandling.status === RessursStatus.SUKSESS
            ? hentAktivVedtakPåBehandlig(åpenBehandling.data)
            : undefined;

    const tidslinjeRader = genererRader(aktivVedtak && aktivVedtak.personBeregninger);

    const skalaer: ITidslinjeSkala[] = [
        { id: TidslinjeSkala.HALVT_ÅR, navn: '6 mnd', verdi: 6 },
        { id: TidslinjeSkala.ETT_ÅR, navn: '1 år', verdi: 12 },
        { id: TidslinjeSkala.TRE_ÅR, navn: '3 år', verdi: 36 },
    ];

    if (
        åpenBehandling.status !== RessursStatus.SUKSESS ||
        !aktivVedtak ||
        tidslinjeRader.length === 0
    )
        return null;
    const personer = åpenBehandling.data.personer;

    const oppdaterTidslinjeDato = (antallMåneder: number) => {
        settTidslinjeDato({
            slutt: moment(),
            start: moment().subtract(antallMåneder, 'month'),
        });
    };

    const onToggleChange = (
        _event: SyntheticEvent<EventTarget, Event>,
        toggles: ToggleKnappPureProps[]
    ) => {
        const tidslinjeSkala: ITidslinjeSkala | undefined = skalaer.find(
            skala =>
                TidslinjeSkala[skala.id] ===
                TidslinjeSkala[toggles.findIndex(toggle => toggle.pressed)]
        );
        tidslinjeSkala && oppdaterTidslinjeDato(tidslinjeSkala.verdi);
    };

    return (
        <>
            <div className={'tidslinje-header'}>
                <Undertittel>{`${tidslinjeDato.start.year()} - ${tidslinjeDato.slutt.year()} `}</Undertittel>
                <ToggleGruppe
                    defaultToggles={skalaer.map(skala => ({
                        children: skala.navn,
                        pressed: skala.id === TidslinjeSkala.ETT_ÅR,
                    }))}
                    kompakt
                    minstEn
                    onChange={onToggleChange}
                />
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
                    startDato={tidslinjeDato.start.toDate()}
                    sluttDato={tidslinjeDato.slutt.toDate()}
                />
            </div>
        </>
    );
};

export default TilkjentYtelseTidslinje;
