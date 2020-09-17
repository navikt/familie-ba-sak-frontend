import React from 'react';
import '@navikt/helse-frontend-tidslinje/lib/main.css';

import { IPersonBeregning, IYtelsePeriode } from '../../../typer/beregning';
import { useBehandling } from '../../../context/BehandlingContext';
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
import { RessursStatus } from '@navikt/familie-typer';
import { IPerson } from '../../../typer/person';
import { Normaltekst } from 'nav-frontend-typografi';
import { Tidslinje, Periode } from '@navikt/helse-frontend-tidslinje/lib';
import { formaterPersonIdent } from '../../../utils/formatter';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/components/types.internal';
import { useTidslinje } from '../../../context/TidslinjeContext';
import classNames from 'classnames';

interface IEtikettProp {
    etikett: Skalaetikett;
    style: { [key: string]: string };
}

const BehandlingsResultatTidslinje: React.FC = () => {
    const { åpenBehandling } = useBehandling();
    const aktivVedtak =
        åpenBehandling.status === RessursStatus.SUKSESS
            ? hentAktivVedtakPåBehandlig(åpenBehandling.data)
            : undefined;

    const tidslinjeRader = genererRader(aktivVedtak && aktivVedtak.personBeregninger);

    const onSelectPeriode = (periode: { id?: string }) => {
        console.log(periode);
    };

    /*const onSelectEtikett = (etikett: { label: string }) => {
        console.log(etikett);
    };*/

    if (
        åpenBehandling.status !== RessursStatus.SUKSESS ||
        !aktivVedtak ||
        tidslinjeRader.length === 0
    )
        return null;
    const personer = åpenBehandling.data.personer;

    return (
        <div className={'tidslinje'}>
            <div className={'tidslinje__labels'}>
                {aktivVedtak.personBeregninger.map(
                    (personBeregning: IPersonBeregning, index: number) => {
                        const person: IPerson | undefined = personer.find(
                            (person: IPerson) => person.personIdent === personBeregning.personIdent
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
                onSelectPeriode={onSelectPeriode}
                direction={'right'}
                EtikettKomponent={Etikett}
                startDato={new Date('2019-12-31')}
            />
        </div>
    );
};

export default BehandlingsResultatTidslinje;

export const Etikett: React.FunctionComponent<IEtikettProp> = ({ etikett, style }) => {
    const { aktivEtikett, setAktivEtikett } = useTidslinje();

    const onEtikettClick = () => {
        setAktivEtikett(etikett);
    };

    return (
        <button
            style={style}
            className={classNames(
                'tidslinje__etikett',
                aktivEtikett === etikett ? 'tidslinje__etikett--aktiv' : ''
            )}
            onClick={onEtikettClick}
        >
            <span className={'tidslinje__etikett__label'}>{etikett.label}</span>
        </button>
    );
};

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
