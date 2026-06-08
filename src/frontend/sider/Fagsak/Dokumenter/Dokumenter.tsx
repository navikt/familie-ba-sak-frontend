import { Fagsaklinje } from '@komponenter/Saklinje/Fagsaklinje';
import { JournalpostListe } from '@sider/Fagsak/Dokumenter/JournalpostListe';

export function Dokumenter() {
    return (
        <>
            <Fagsaklinje />
            <JournalpostListe />
        </>
    );
}
