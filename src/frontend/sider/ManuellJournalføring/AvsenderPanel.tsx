import { EmailIkon } from '@ikoner/EmailIkon';
import { BodyShort, Checkbox, ExpansionCard } from '@navikt/ds-react';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { AvsenderIdentFelt } from '@sider/ManuellJournalføring/felter/AvsenderIdentFelt';
import { AvsenderNavnFelt } from '@sider/ManuellJournalføring/felter/AvsenderNavnFelt';
import { formaterIdent } from '@utils/formatter';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './AvsenderPanel.module.css';
import { DeltagerInfo } from './DeltagerInfo';
import { useManuellJournalføringContext } from './ManuellJournalføringContext';

export function AvsenderPanel() {
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
        <ExpansionCard
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
                        <BodyShort className={classNames('skjemaelement', 'lese-felt')}>Avsender er bruker</BodyShort>
                    ) : null
                ) : (
                    <>
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

                        <br />
                    </>
                )}

                <AvsenderNavnFelt lesevisning={lesevisning} brukerErAvsender={brukerErAvsender} />
                <br />
                <AvsenderIdentFelt lesevisning={lesevisning} brukerErAvsender={brukerErAvsender} />
            </ExpansionCard.Content>
        </ExpansionCard>
    );
}
