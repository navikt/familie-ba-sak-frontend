export enum Registeropplysning {
    SIVILSTAND = 'SIVILSTAND',
    OPPHOLD = 'OPPHOLD',
    STATSBORGERSKAP = 'STATSBORGERSKAP',
    BOSTEDSADRESSE = 'BOSTEDSADRESSE',
    OPPHOLDSADRESSE = 'OPPHOLDSADRESSE',
    DØDSBOADRESSE = 'DØDSBOADRESSE',
    FØDSELSDATO = 'FØDSELSDATO',
    DELTBOSTED = 'DELTBOSTED',
    HISTORISKE_IDENTER = 'HISTORISKE_IDENTER',
}

export const registeropplysning: Record<Registeropplysning, string> = {
    SIVILSTAND: 'Sivilstand',
    OPPHOLD: 'Oppholdstillatelse',
    STATSBORGERSKAP: 'Statsborgerskap',
    BOSTEDSADRESSE: 'Adresse',
    OPPHOLDSADRESSE: 'Oppholdsadresse',
    DØDSBOADRESSE: 'Dødsboadresse',
    FØDSELSDATO: 'Fødselsdato',
    DELTBOSTED: 'Delt bosted adresse',
    HISTORISKE_IDENTER: 'Historiske identer',
};
