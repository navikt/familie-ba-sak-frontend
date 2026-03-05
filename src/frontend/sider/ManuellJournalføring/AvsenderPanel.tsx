import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { BodyShort, Checkbox, ExpansionCard, TextField } from '@navikt/ds-react';
import { Valideringsstatus } from '@navikt/familie-skjema';

import styles from './AvsenderPanel.module.css';
import { DeltagerInfo } from './DeltagerInfo';
import { useManuellJournalføringContext } from './ManuellJournalføringContext';
import { EmailIkon } from '../../ikoner/EmailIkon';
import { formaterIdent } from '../../utils/formatter';

const StyledExpansionCard = styled(ExpansionCard)`
    margin-top: 1rem;
`;

export const AvsenderPanel: React.FC = () => {
    const { skjema, erLesevisning, settAvsenderLikBruker, tilbakestillAvsender, erDigitaltInnsendtDokument } =
        useManuellJournalføringContext();
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

    const lesevisning = erLesevisning() || erDigitaltInnsendtDokument;

    return (
        <StyledExpansionCard
            open={åpen}
            onToggle={() => {
                settÅpen(!åpen);
            }}
            size="small"
            aria-label="Avsenderpanel"
        >
            <ExpansionCard.Header>
                <ExpansionCard.Title>
                    <DeltagerInfo
                        ikon={<EmailIkon filled={åpen} width={48} height={48} />}
                        navn={skjema.felter.avsenderNavn.verdi || 'Ukjent avsender'}
                        ident={formaterIdent(skjema.felter.avsenderIdent.verdi ?? '')}
                        undertittel="Avsender"
                    />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content className={styles.innerContent}>
                {lesevisning ? (
                    brukerErAvsender ? (
                        <BodyShort
                            className={classNames('skjemaelement', 'lese-felt')}
                            children={'Avsender er bruker'}
                        />
                    ) : null
                ) : (
                    <Checkbox
                        value={'Avsender er bruker'}
                        checked={brukerErAvsender}
                        onChange={() => {
                            if (brukerErAvsender) {
                                tilbakestillAvsender();
                            } else {
                                settAvsenderLikBruker();
                            }
                            settBrukerErAvsender(!brukerErAvsender);
                        }}
                    >
                        Avsender er bruker
                    </Checkbox>
                )}
                <br />
                <TextField
                    {...skjema.felter.avsenderNavn.hentNavInputProps(skjema.visFeilmeldinger)}
                    readOnly={lesevisning}
                    label={'Navn'}
                    size={'medium'}
                    placeholder={'Navn'}
                    disabled={brukerErAvsender}
                />

                <br />
                <TextField
                    {...skjema.felter.avsenderIdent.hentNavInputProps(skjema.visFeilmeldinger)}
                    readOnly={lesevisning}
                    label={'Ident'}
                    size={'medium'}
                    placeholder={'Fnr/dnr/orgnr'}
                    disabled={brukerErAvsender}
                />
            </ExpansionCard.Content>
        </StyledExpansionCard>
    );
};
