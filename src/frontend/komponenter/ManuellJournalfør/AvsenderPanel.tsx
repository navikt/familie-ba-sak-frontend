import React, { useEffect, useState } from 'react';

import { FamilieInput } from '@navikt/familie-form-elements';
import { Valideringsstatus } from '@navikt/familie-skjema';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { EmailIkon } from '../../ikoner/EmailIkon';
import { formaterPersonIdent } from '../../utils/formatter';
import { DeltagerInfo } from './DeltagerInfo';
import { StyledEkspanderbartpanelBase } from './StyledEkspanderbartpanelBase';

export const AvsenderPanel: React.FC = () => {
    const { skjema, erLesevisning } = useManuellJournalfør();
    const [åpen, settÅpen] = useState(false);

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
        <StyledEkspanderbartpanelBase
            visFeilmeldinger={
                skjema.visFeilmeldinger &&
                (skjema.felter.avsenderNavn.valideringsstatus === Valideringsstatus.FEIL ||
                    skjema.felter.avsenderIdent.valideringsstatus === Valideringsstatus.FEIL)
            }
            tittel={
                <DeltagerInfo
                    ikon={<EmailIkon filled={åpen} width={48} height={48} />}
                    navn={skjema.felter.avsenderNavn.verdi || 'Ukjent'}
                    ident={formaterPersonIdent(skjema.felter.avsenderIdent.verdi ?? '')}
                    undertittel="Avsender"
                />
            }
            apen={åpen}
            onClick={() => {
                settÅpen(!åpen);
            }}
        >
            <FamilieInput
                {...skjema.felter.avsenderNavn.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={erLesevisning()}
                label={'Navn'}
                bredde={'XL'}
                placeholder={'navn'}
            />

            <br />
            <FamilieInput
                {...skjema.felter.avsenderIdent.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={erLesevisning()}
                label={'Ident'}
                bredde={'XL'}
                placeholder={'Fnr/dnr/orgnr'}
            />
        </StyledEkspanderbartpanelBase>
    );
};
