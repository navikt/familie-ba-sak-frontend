interface JournalposterForBrukerRequest {
    antall: number;
    brukerId: { id: string; type: string };
    journalposttype: string; // 'I' | 'U' | 'N';
}
