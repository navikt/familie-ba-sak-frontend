import React from 'react';

import styled from 'styled-components';

import { Buldings3Icon } from '@navikt/aksel-icons';
import { BodyShort, Link, Spacer, Tag } from '@navikt/ds-react';
import { AGreen600, ASpacing6 } from '@navikt/ds-tokens/dist/tokens';
import { kjønnType } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';

import Behandlingsmeny from './Behandlingsmeny/Behandlingsmeny';
import { useApp } from '../../../context/AppContext';
import type { IBehandling } from '../../../typer/behandling';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { FagsakType } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import { Datoformat, isoStringTilFormatertString } from '../../../utils/dato';
import { formaterIdent, hentAlder, millisekunderIEttÅr } from '../../../utils/formatter';
import DødsfallTag from '../../Felleskomponenter/DødsfallTag';

const IkonSirkel = styled.span`
    border-color: ${AGreen600};
    border-radius: 50%;
    background-color: ${AGreen600};
    display: inline-grid;
    place-items: center;
    height: ${ASpacing6};
    width: ${ASpacing6};
    color: white;
`;

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
            ikon={
                minimalFagsak?.fagsakType === FagsakType.INSTITUSJON ? (
                    <IkonSirkel>
                        <Buldings3Icon width={20} height={20} />
                    </IkonSirkel>
                ) : undefined
            }
            dempetKantlinje
            padding
        >
            <div>|</div>
            <BodyShort>{`Kommunenr: ${bruker?.kommunenummer ?? 'ukjent'}`}</BodyShort>
            {bruker?.dødsfallDato?.length && (
                <>
                    <div>|</div>
                    <DødsfallTag dødsfallDato={bruker.dødsfallDato} />
                </>
            )}
            <Spacer />
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
                    <Link href={`/fagsak/${minimalFagsak.id}/saksoversikt`}>
                        <BodyShort>Saksoversikt</BodyShort>
                    </Link>
                    <Link href={`/fagsak/${minimalFagsak.id}/dokumenter`}>
                        <BodyShort>Dokumenter</BodyShort>
                    </Link>
                    {harInnloggetSaksbehandlerSkrivetilgang() && (
                        <Behandlingsmeny
                            bruker={bruker}
                            minimalFagsak={minimalFagsak}
                            behandling={behandling}
                        />
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
