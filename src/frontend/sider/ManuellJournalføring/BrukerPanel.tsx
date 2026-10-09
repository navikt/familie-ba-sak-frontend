import { KontoSirkel } from '@ikoner/KontoSirkel';
import { SamhandlerTabell } from '@komponenter/Samhandler/SamhandlerTabell';
import { Buildings3FillIcon } from '@navikt/aksel-icons';
import { Box, ExpansionCard, InlineMessage, ReadMore } from '@navikt/ds-react';
import { BgAccentStrong } from '@navikt/ds-tokens/dist/tokens';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { EndreBrukerSkjema } from '@sider/ManuellJournalføring/EndreBrukerSkjema';
import { EndreFagsaktypeSkjema } from '@sider/ManuellJournalføring/EndreFagsaktypeSkjema';
import { FagsakType } from '@typer/fagsak';
import { formaterIdent } from '@utils/formatter';
import { useEffect, useState } from 'react';
import styles from './BrukerPanel.module.css';
import { DeltagerInfo } from './DeltagerInfo';
import { useManuellJournalføringContext } from './ManuellJournalføringContext';

export function BrukerPanel() {
    const { skjema, erLesevisning, kanKnyttesTilInstitusjonsfagsak } = useManuellJournalføringContext();
    const [åpen, settÅpen] = useState(false);

    const [valgtInstitusjon, settValgtInstitusjon] = useState<string>('');
    const [samhandlerFeilmelding, settSamhandlerFeilmelding] = useState<string>('');
    const [erFagsaktypePanelÅpnet, settErFagsaktypePanelÅpnet] = useState<boolean>(false);

    useEffect(() => {
        if (skjema.visFeilmeldinger && skjema.felter.bruker.valideringsstatus === Valideringsstatus.FEIL) {
            settÅpen(true);
        }
    }, [skjema.visFeilmeldinger, skjema.felter.bruker.valideringsstatus]);

    const erBrukerPåInstitusjon = skjema.felter.fagsakType.verdi === FagsakType.INSTITUSJON;

    const nullstillFagsaktype = () => {
        skjema.felter.fagsakType.validerOgSettFelt(FagsakType.NORMAL);
        settValgtInstitusjon('');
        settErFagsaktypePanelÅpnet(false);
    };

    return (
        <ExpansionCard
            open={åpen}
            onToggle={() => {
                settÅpen(!åpen);
            }}
            size="small"
            aria-label="Brukerpanel"
        >
            <ExpansionCard.Header>
                <ExpansionCard.Title>
                    <DeltagerInfo
                        ikon={
                            erBrukerPåInstitusjon ? (
                                <Buildings3FillIcon color={BgAccentStrong} width={48} height={48} />
                            ) : (
                                <KontoSirkel filled={åpen} width={48} height={48} />
                            )
                        }
                        navn={skjema.felter.bruker.verdi?.navn || 'Ukjent bruker'}
                        undertittel={erBrukerPåInstitusjon ? 'Søker/Bruker er på institusjon' : 'Søker/Bruker'}
                        ident={formaterIdent(skjema.felter.bruker.verdi?.personIdent ?? '')}
                    />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content className={styles.innerContent}>
                {!erLesevisning() && (
                    <>
                        <EndreBrukerSkjema nullstillFagsaktype={nullstillFagsaktype} />
                        {kanKnyttesTilInstitusjonsfagsak() && (
                            <ReadMore
                                size="medium"
                                header="Søker er en institusjon eller enslig mindreårig"
                                open={erFagsaktypePanelÅpnet}
                                onClick={() => settErFagsaktypePanelÅpnet(!erFagsaktypePanelÅpnet)}
                            >
                                <EndreFagsaktypeSkjema
                                    nullstillFagsaktype={nullstillFagsaktype}
                                    valgtInstitusjon={valgtInstitusjon}
                                    settValgtInstitusjon={settValgtInstitusjon}
                                    settSamhandlerFeilmelding={settSamhandlerFeilmelding}
                                />
                            </ReadMore>
                        )}
                    </>
                )}
                {samhandlerFeilmelding && (
                    <Box marginBlock={'space-32 space-0'}>
                        <InlineMessage status="warning">{samhandlerFeilmelding}</InlineMessage>
                    </Box>
                )}
                {skjema.felter.samhandler.verdi !== undefined && (
                    <Box marginBlock={'space-32 space-0'}>
                        <SamhandlerTabell samhandler={skjema.felter.samhandler.verdi} />
                    </Box>
                )}
            </ExpansionCard.Content>
        </ExpansionCard>
    );
}
