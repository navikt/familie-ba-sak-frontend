export enum Registeropplysning {
    SIVILSTAND = 'SIVILSTAND',
    OPPHOLD = 'OPPHOLD',
    STATSBORGERSKAP = 'STATSBORGERSKAP',
    BOSTEDSADRESSE = 'BOSTEDSADRESSE',
}

export const registeropplysning: Record<Registeropplysning, string> = {
    SIVILSTAND: 'Sivilstand',
    OPPHOLD: 'Oppholdstillatelse',
    STATSBORGERSKAP: 'Statsborgerskap',
    BOSTEDSADRESSE: 'Adresse',
};
