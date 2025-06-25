import React from 'react';

import { PersonCircleFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Spacer, Tag } from '@navikt/ds-react';
import { kjønnType } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';

import { useHentPerson } from '../../../hooks/useHentPerson';
import KontorIkonGrønn from '../../../ikoner/KontorIkonGrønn';
import DødsfallTag from '../../../komponenter/DødsfallTag';
import type { IBehandling } from '../../../typer/behandling';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { FagsakType } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import { Datoformat, isoStringTilFormatertString } from '../../../utils/dato';
import { formaterIdent, hentAlder, millisekunderIEttÅr } from '../../../utils/formatter';

interface IProps {
    bruker?: IPersonInfo;
    minimalFagsak?: IMinimalFagsak;
    behandling?: IBehandling;
}

const ikonForFagsakType = (fagsakType?: FagsakType) => {
    switch (fagsakType) {
        case FagsakType.INSTITUSJON:
            return <KontorIkonGrønn height={'24'} width={'24'} />;
        case FagsakType.SKJERMET_BARN:
            return (
                <PersonCircleFillIcon color={'var(--a-icon-alt-1)'} height={'28'} width={'28'} /> // Hvorfor er størrelse ulik?
            );
        default:
            return undefined; // Bruker default-verdier i visittkort
    }
};

const Personlinje: React.FC<IProps> = ({ bruker, minimalFagsak }) => {
    const fagsakEier = useHentPerson(minimalFagsak?.fagsakeier);
    const søker = useHentPerson(minimalFagsak?.søkerFødselsnummer);

    console.log('fagsakEier: ', fagsakEier.data);
    console.log('søker', søker.data);

    return (
        <Visittkort
            navn={bruker?.navn ?? 'Ukjent'}
            ident={formaterIdent(bruker?.personIdent ?? '')}
            alder={hentAlder(bruker?.fødselsdato ?? '')}
            kjønn={bruker?.kjønn ?? kjønnType.UKJENT}
            ikon={ikonForFagsakType(minimalFagsak?.fagsakType)}
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
