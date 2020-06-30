import React from 'react';
import { Tidslinje, Periode } from '@navikt/helse-frontend-tidslinje';
import '@navikt/helse-frontend-tidslinje/lib/main.css';

import { IPersonBeregning, IYtelsePeriode } from '../../../typer/beregning';
import { useBehandling } from '../../../context/BehandlingContext';
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
import { RessursStatus } from '../../../typer/ressurs';
import { IPerson } from '../../../typer/person';
import { Normaltekst } from 'nav-frontend-typografi';

const TilkjentYtelseTidslinje: React.FC = () => {
    const { åpenBehandling } = useBehandling();
    const aktivVedtak =
        åpenBehandling.status === RessursStatus.SUKSESS
            ? hentAktivVedtakPåBehandlig(åpenBehandling.data)
            : undefined;

    switch (åpenBehandling.status) {
        case RessursStatus.SUKSESS:
            const personer = åpenBehandling.data.personer;

            return aktivVedtak ? (
                <div className={'tidslinje'}>
                    <div className={'tidslinje__labels'}>
                        {aktivVedtak.personBeregninger.map((personBeregning: IPersonBeregning) => {
                            const person: IPerson | undefined = personer.find(
                                (person: IPerson) =>
                                    person.personIdent === personBeregning.personIdent
                            );

                            return <Normaltekst>{person?.navn}</Normaltekst>;
                        })}
                    </div>
                    <div className={'tidslinje__scroll'}>
                        <div className={'tidslinje__scroll--inner'}>
                            <Tidslinje
                                rader={mapTilPersonPerioder(aktivVedtak.personBeregninger)}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div />
            );

        default:
            return <div />;
    }
};

const mapTilPersonPerioder = (personBeregninger?: IPersonBeregning[]): Periode[][] => {
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

export default TilkjentYtelseTidslinje;
