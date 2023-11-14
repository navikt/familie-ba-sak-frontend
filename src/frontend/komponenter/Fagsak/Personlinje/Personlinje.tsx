import React from 'react';

import { BodyShort, Link, Tag } from '@navikt/ds-react';
import { kjønnType } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';

import Behandlingsmeny from './Behandlingsmeny/Behandlingsmeny';
import { useApp } from '../../../context/AppContext';
import KontorIkonGrønn from '../../../ikoner/KontorIkonGrønn';
import type { IBehandling } from '../../../typer/behandling';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { FagsakType } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import { Datoformat, isoStringTilFormatertString } from '../../../utils/dato';
import { formaterIdent, hentAlder, millisekunderIEttÅr } from '../../../utils/formatter';
import DødsfallTag from '../../Felleskomponenter/DødsfallTag';

interface IProps {
    bruker?: IPersonInfo;
    minimalFagsak?: IMinimalFagsak;
    behandling?: IBehandling;
}

const Personlinje: React.FC<IProps> = ({ bruker, minimalFagsak, behandling }) => {
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
                                children={`Migrert ${isoStringTilFormatertString({
                                    isoString: minimalFagsak?.migreringsdato,
                                    tilFormat: Datoformat.DATO,
                                })}`}
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
