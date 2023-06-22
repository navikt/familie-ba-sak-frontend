export enum Registeropplysning {
    SIVILSTAND = 'SIVILSTAND',
    OPPHOLD = 'OPPHOLD',
    STATSBORGERSKAP = 'STATSBORGERSKAP',
    BOSTEDSADRESSE = 'BOSTEDSADRESSE',
    DØDSBOADRESSE = 'DØDSBOADRESSE',
    FØDSELSDATO = 'FØDSELSDATO',
}

export const registeropplysning: Record<Registeropplysning, string> = {
    SIVILSTAND: 'Sivilstand',
    OPPHOLD: 'Oppholdstillatelse',
    STATSBORGERSKAP: 'Statsborgerskap',
    BOSTEDSADRESSE: 'Adresse',
    DØDSBOADRESSE: 'Dødsboadresse',
    FØDSELSDATO: 'Fødselsdato',
};
