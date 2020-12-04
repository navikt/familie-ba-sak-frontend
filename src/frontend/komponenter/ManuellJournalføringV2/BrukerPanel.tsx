import React, { useState } from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';

import { FamilieInput } from '@navikt/familie-form-elements';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { useFelt } from '../../familie-skjema/felt';
import { Valideringsstatus } from '../../familie-skjema/typer';
import { KontoSirkel } from '../../ikoner/KontoSirkel';
import { IPersonInfo } from '../../typer/person';
import { identValidator } from '../../utils/validators';
import { Deltager } from './Deltager';

const VIS_FELT_MELDING = '';
const IKKE_VIS_MELDING = undefined;

const StyledAlert = styled(AlertStripeFeil)`
    margin: 10px 0 0 0;
`;

export const BrukerPanel: React.FC = () => {
    const { dataForManuellJournalføring, settPerson } = useManuellJournalføringV2();
    const [feilMelding, settFeilMelding] = useState<string | undefined>(IKKE_VIS_MELDING);
    const { axiosRequest } = useApp();
    const [spinner, settSpinner] = useState(false);

    const nyttIdent = useFelt({
        verdi: '',
        valideringsfunksjon: identValidator,
    });

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            const bruker = dataForManuellJournalføring.data.person;
            const navn = bruker?.navn || 'Ingen brukernavn';
            const type = bruker?.type || 'Ingen brukertype';
            const ident = bruker?.personIdent || 'Ingen brukerident';
            return (
                <Deltager ikon={<KontoSirkel />} navn={navn} type={type} ident={ident}>
                    <div className={'hentperson__inputogknapp'}>
                        <FamilieInput
                            {...nyttIdent.hentNavInputProps(feilMelding === VIS_FELT_MELDING)}
                            erLesevisning={false}
                            id={'hent-person'}
                            label={'Skrive inn fødselsnummer/D-nummer'}
                            bredde={'XL'}
                            placeholder={'fnr/dnr'}
                        />
                        {
                            <Knapp
                                onClick={() => {
                                    if (
                                        nyttIdent.valideringsstatus === Valideringsstatus.OK ||
                                        process.env.NODE_ENV === 'development'
                                    ) {
                                        settSpinner(true);
                                        axiosRequest<IPersonInfo, void>({
                                            method: 'GET',
                                            url: '/familie-ba-sak/api/person',
                                            headers: {
                                                personIdent: nyttIdent.verdi,
                                            },
                                        })
                                            .then((hentetPerson: Ressurs<IPersonInfo>) => {
                                                if (hentetPerson.status === RessursStatus.SUKSESS) {
                                                    settPerson(hentetPerson.data);
                                                }
                                                settSpinner(false);
                                                settFeilMelding(
                                                    hentetPerson.status === RessursStatus.SUKSESS
                                                        ? IKKE_VIS_MELDING
                                                        : 'Ukjent feil ved hent person.'
                                                );
                                            })
                                            .catch(() => {
                                                settSpinner(false);
                                                settFeilMelding('Ukjent feil ved hent person.');
                                            });
                                    } else {
                                        settFeilMelding(VIS_FELT_MELDING);
                                    }
                                }}
                                children={'Endre bruker'}
                                spinner={spinner}
                            />
                        }
                    </div>
                    {feilMelding && <StyledAlert>{feilMelding}</StyledAlert>}
                </Deltager>
            );
        default:
            return <></>;
    }
};
