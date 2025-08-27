export enum Registeropplysning {
    SIVILSTAND = 'SIVILSTAND',
    OPPHOLD = 'OPPHOLD',
    STATSBORGERSKAP = 'STATSBORGERSKAP',
    BOSTEDSADRESSE = 'BOSTEDSADRESSE',
    OPPHOLDSADRESSE = 'OPPHOLDSADRESSE',
    DØDSBOADRESSE = 'DØDSBOADRESSE',
    FØDSELSDATO = 'FØDSELSDATO',
}

export const registeropplysning: Record<Registeropplysning, string> = {
    SIVILSTAND: 'Sivilstand',
    OPPHOLD: 'Oppholdstillatelse',
    STATSBORGERSKAP: 'Statsborgerskap',
    BOSTEDSADRESSE: 'Adresse',
    OPPHOLDSADRESSE: 'Oppholdsadresse',
    DØDSBOADRESSE: 'Dødsboadresse',
    FØDSELSDATO: 'Fødselsdato',
};
