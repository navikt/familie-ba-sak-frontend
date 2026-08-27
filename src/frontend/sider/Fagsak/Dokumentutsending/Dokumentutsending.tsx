import { Fagsaklinje } from '@komponenter/Saklinje/Fagsaklinje';
import { HGrid } from '@navikt/ds-react';
import { BrevSendtDialog } from '@sider/Fagsak/Dokumentutsending/BrevSendtDialog';
import { DokumentutsendingSkjema } from '@sider/Fagsak/Dokumentutsending/DokumentutsendingSkjema';
import { useState } from 'react';

export function Dokumentutsending() {
    const [erBrevSendtDialogÅpen, settErBrevSendtDialogÅpen] = useState(false);
    const [forhåndsvisningUrl, settForhåndsvisningUrl] = useState<string | undefined>(undefined);

    return (
        <>
            <Fagsaklinje />
            <HGrid columns={'35rem 1fr'} height={'100%'}>
                <BrevSendtDialog
                    erBrevSendtDialogÅpen={erBrevSendtDialogÅpen}
                    settErBrevSendtDialogÅpen={settErBrevSendtDialogÅpen}
                />
                <DokumentutsendingSkjema
                    settForhåndsvisningUrl={settForhåndsvisningUrl}
                    åpneBrevSendtDialog={() => settErBrevSendtDialogÅpen(true)}
                />
                <iframe title={'dokument'} src={forhåndsvisningUrl} width={'100%'} height={'100%'} />
            </HGrid>
        </>
    );
}
