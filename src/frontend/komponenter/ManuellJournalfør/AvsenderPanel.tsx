import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { FamilieInput, FamilieCheckbox } from '@navikt/familie-form-elements';
import { Valideringsstatus } from '@navikt/familie-skjema';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { EmailIkon } from '../../ikoner/EmailIkon';
import { formaterIdent } from '../../utils/formatter';
import { DeltagerInfo } from './DeltagerInfo';
import { StyledEkspanderbartpanelBase } from './StyledEkspanderbartpanelBase';

const StyledEkspanderbartpanelBaseMedMargin = styled(StyledEkspanderbartpanelBase)`
    & .ekspanderbartPanel__innhold {
        margin-left: 4rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }
`;

export const AvsenderPanel: React.FC = () => {
    const {
        skjema,
        erLesevisning,
        settAvsenderLikBruker,
        tilbakestillAvsender,
    } = useManuellJournalfør();
    const [åpen, settÅpen] = useState(false);
    const [brukerErAvsender, settBrukerErAvsender] = useState(false);

    useEffect(() => {
        if (
            skjema.visFeilmeldinger &&
            (skjema.felter.avsenderNavn.valideringsstatus === Valideringsstatus.FEIL ||
                skjema.felter.avsenderIdent.valideringsstatus === Valideringsstatus.FEIL)
        ) {
            settÅpen(true);
        }
    }, [
        skjema.visFeilmeldinger,
        skjema.felter.avsenderNavn.valideringsstatus,
        skjema.felter.avsenderIdent.valideringsstatus,
    ]);

    return (
        <StyledEkspanderbartpanelBaseMedMargin
            visFeilmeldinger={
                skjema.visFeilmeldinger &&
                (skjema.felter.avsenderNavn.valideringsstatus === Valideringsstatus.FEIL ||
                    skjema.felter.avsenderIdent.valideringsstatus === Valideringsstatus.FEIL)
            }
            tittel={
                <DeltagerInfo
                    ikon={<EmailIkon filled={åpen} width={48} height={48} />}
                    navn={skjema.felter.avsenderNavn.verdi || 'Ukjent avsender'}
                    ident={formaterIdent(skjema.felter.avsenderIdent.verdi ?? '')}
                    undertittel="Avsender"
                />
            }
            apen={åpen}
            onClick={() => {
                settÅpen(!åpen);
            }}
        >
            <FamilieCheckbox
                erLesevisning={false}
                label={'Avsender er bruker'}
                checked={brukerErAvsender}
                onChange={() => {
                    brukerErAvsender ? tilbakestillAvsender() : settAvsenderLikBruker();
                    settBrukerErAvsender(!brukerErAvsender);
                }}
            />
            <br />
            <FamilieInput
                {...skjema.felter.avsenderNavn.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={erLesevisning()}
                label={'Navn'}
                bredde={'XL'}
                placeholder={'navn'}
                disabled={brukerErAvsender}
            />

            <br />
            <FamilieInput
                {...skjema.felter.avsenderIdent.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={erLesevisning()}
                label={'Ident'}
                bredde={'XL'}
                placeholder={'Fnr/dnr/orgnr'}
                disabled={brukerErAvsender}
            />
        </StyledEkspanderbartpanelBaseMedMargin>
    );
};
