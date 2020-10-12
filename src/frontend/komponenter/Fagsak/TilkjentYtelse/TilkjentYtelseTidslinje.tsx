import React from 'react';
import '@navikt/helse-frontend-tidslinje/lib/main.css';
import { useBehandling } from '../../../context/BehandlingContext';
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
import { RessursStatus } from '@navikt/familie-typer';
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
        mapPersonberegningerTilPersoner,
        mapPersonerTilPersonberegninger,
    } = useTidslinje();

    const aktivVedtak =
        åpenBehandling.status === RessursStatus.SUKSESS
            ? hentAktivVedtakPåBehandlig(åpenBehandling.data)
            : undefined;

    if (åpenBehandling.status !== RessursStatus.SUKSESS || !aktivVedtak) {
        return null;
    }

    const personer = åpenBehandling.data.personer;
    const personerFraPersonberegningerSortert = mapPersonberegningerTilPersoner(
        personer,
        aktivVedtak.personBeregninger
    ).sort((personA, personB) => sorterFødselsdato(personA.fødselsdato, personB.fødselsdato));
    const personberegningerSortert = mapPersonerTilPersonberegninger(
        personerFraPersonberegningerSortert,
        aktivVedtak.personBeregninger
    );

    const tidslinjeRader = genererRader(personberegningerSortert);

    return (
        <>
            <div className={'tidslinje-header'}>
                <Undertittel>{genererFormatertÅrstall()}</Undertittel>
                <div className={'tidslinje-header__controls'}>
                    <Vinduvelger />
                    <TidslinjeNavigering />
                </div>
            </div>
            <div className={'tidslinje-container'}>
                <div className={'tidslinje-container__labels'}>
                    {personerFraPersonberegningerSortert.map((person, index) => {
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
