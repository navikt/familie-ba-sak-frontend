import React from 'react';

import { Link, BodyShort, Tag } from '@navikt/ds-react';
import { kjønnType } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';

import Behandlingsmeny from './Behandlingsmeny/Behandlingsmeny';
import { useApp } from '../../../context/AppContext';
import KontorIkonGrønn from '../../../ikoner/KontorIkonGrønn';
import { FagsakType } from '../../../typer/fagsak';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import { Datoformat } from '../../../utils/dato';
import {
    formaterIdent,
    formaterIsoDato,
    hentAlder,
    millisekunderIEttÅr,
} from '../../../utils/formatter';
import DødsfallTag from '../../Felleskomponenter/DødsfallTag';

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
            ValgfrittIkon={
                minimalFagsak?.fagsakType === FagsakType.INSTITUSJON ? KontorIkonGrønn : undefined
            }
        >
            <div className="visittkort__pipe">|</div>
            <BodyShort>{`Kommunenr: ${bruker?.kommunenummer ?? 'ukjent'}`}</BodyShort>
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
                                    Datoformat.DATO
                                )}`}
                                variant={'info'}
                            />
                        )}
                    <Link
                        className={'visittkort__lenke'}
                        href={`/fagsak/${minimalFagsak.id}/saksoversikt`}
                    >
                        <BodyShort>Saksoversikt</BodyShort>
                    </Link>
                    <Link
                        className={'visittkort__lenke'}
                        href={`/fagsak/${minimalFagsak.id}/dokumenter`}
                    >
                        <BodyShort>Dokumenter</BodyShort>
                    </Link>
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
