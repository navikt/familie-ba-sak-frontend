import React, { useEffect, useState } from 'react';

import { Knapp } from 'nav-frontend-knapper';
import { Innholdstittel } from 'nav-frontend-typografi';

import { useFelt } from '@navikt/familie-skjema';
import { kjønnType } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';

import { MigreringProvider, useMigrering } from '../../context/MigreringContext';
import { IInfotrygdSak } from '../../typer/infotrygd';
import { identValidator } from '../../utils/validators';

// Omslutt MigreringContent med MigreringProvider hvis nødvendig

const MigreringContent: React.FC = () => {
    const { hentSakerForBruker, infotrygdsaker } = useMigrering();
    const [feilmelding, settFeilmelding] = useState('');
    const [spinner, settSpinner] = useState(false);

    const nyIdent = useFelt({
        verdi: '',
        valideringsfunksjon: identValidator,
    });

    useEffect(() => {
        settFeilmelding('');
    }, [nyIdent.verdi]);

    return (
        <div>
            <Visittkort
                navn={'dummy'}
                ident={'12345'}
                alder={42}
                kjønn={kjønnType.MANN}
            ></Visittkort>
            <Innholdstittel>Sakshistorikk fra Infotrygd</Innholdstittel>
            <p>Her trenger vi et inputfelt, se BrukerPanel:73</p>
            <Knapp
                onClick={() => {
                    settSpinner(true);
                    hentSakerForBruker(/* her går verdien for inputfelt */)
                        .then((feilmelding: string) => {
                            settFeilmelding(feilmelding);
                        })
                        .finally(() => {
                            settSpinner(false);
                        });
                }}
                children={'Endre bruker'}
                spinner={spinner}
                mini={true}
            />
            <p>{feilmelding}</p>
            {infotrygdsaker.map((infotrygdsak: IInfotrygdSak) => {
                return (
                    <div>
                        <span>{infotrygdsak.saksblokk}</span>
                        <span>{infotrygdsak.saksnr}</span>
                        <span>{infotrygdsak.mottattdato}</span>
                        <span>{infotrygdsak.kapittelnr}</span>
                        <span>{infotrygdsak.valg}</span>
                        <span>{infotrygdsak.undervalg}</span>
                        <span>{infotrygdsak.type}</span>
                        <span>{infotrygdsak.nivå}</span>
                        <span>{infotrygdsak.resultat}</span>
                        <span>{infotrygdsak.vedtaksdato}</span>
                        <span>{infotrygdsak.iverksattdato}</span>
                    </div>
                );
            })}
        </div>
    );
};

const Migrering: React.FC = () => {
    return (
        <MigreringProvider>
            <MigreringContent />
        </MigreringProvider>
    );
};

export default Migrering;
