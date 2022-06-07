import React from 'react';

import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';

import { Tag } from '@navikt/ds-react';
import { kjønnType } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';

import { useApp } from '../../../context/AppContext';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import {
    datoformat,
    formaterIdent,
    formaterIsoDato,
    hentAlder,
    millisekunderIEttÅr,
} from '../../../utils/formatter';
import DødsfallTag from '../../Felleskomponenter/DødsfallTag';
import Behandlingsmeny from './Behandlingsmeny/Behandlingsmeny';

interface IProps {
    bruker?: IPersonInfo;
    minimalFagsak?: IMinimalFagsak;
}

const Personlinje: React.FC<IProps> = ({ bruker, minimalFagsak }) => {
    const { harInnloggetSaksbehandlerSkrivetilgang } = useApp();
    return (
        <Visittkort
            navn={bruker?.navn ?? 'Ukjent'}
            ident={formaterIdent(bruker?.personIdent ?? '')}
            alder={hentAlder(bruker?.fødselsdato ?? '')}
            kjønn={bruker?.kjønn ?? kjønnType.UKJENT}
        >
            <div className="visittkort__pipe">|</div>
            <Normaltekst>{`Kommunenr: ${bruker?.kommunenummer ?? 'ukjent'}`}</Normaltekst>
            {bruker?.dødsfallDato?.length && (
                <>
                    <div className="visittkort__pipe"></div>
                    <DødsfallTag dødsfallDato={bruker.dødsfallDato} />
                </>
            )}
            <div style={{ flex: 1 }}></div>
            <div style={{ flex: 1 }}></div>
            {minimalFagsak !== undefined && (
                <>
                    {minimalFagsak?.migreringsdato !== undefined &&
                        sjekkOmMigreringsdatoErEldreEnn3År(minimalFagsak.migreringsdato) && (
                            <Tag
                                size="small"
                                children={`Migrert ${formaterIsoDato(
                                    minimalFagsak?.migreringsdato,
                                    datoformat.DATO
                                )}`}
                                variant={'info'}
                            />
                        )}
                    <Lenke
                        className={'visittkort__lenke'}
                        href={`/fagsak/${minimalFagsak.id}/saksoversikt`}
                    >
                        <Normaltekst>Saksoversikt</Normaltekst>
                    </Lenke>
                    <Lenke
                        className={'visittkort__lenke'}
                        href={`/fagsak/${minimalFagsak.id}/dokumenter`}
                    >
                        <Normaltekst>Dokumenter</Normaltekst>
                    </Lenke>
                    {harInnloggetSaksbehandlerSkrivetilgang() && (
                        <Behandlingsmeny bruker={bruker} minimalFagsak={minimalFagsak} />
                    )}
                </>
            )}
        </Visittkort>
    );
};

const sjekkOmMigreringsdatoErEldreEnn3År = (migreringsdatoIString: string) => {
    const dato = new Date();
    const migreringsdato = new Date(migreringsdatoIString);
    const difference = dato.getTime() - migreringsdato.getTime();
    return Math.floor(Math.abs(difference) / millisekunderIEttÅr) < 3;
};

export default Personlinje;
