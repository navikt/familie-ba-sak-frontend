// Enum
export var AdresseType;
(function (AdresseType) {
    AdresseType["BOSTEDSADRESSE"] = "BOSTEDSADRESSE";
    AdresseType["MIDLERTIDIG_POSTADRESSE_NORGE"] = "MIDLERTIDIG_POSTADRESSE_NORGE";
    AdresseType["MIDLERTIDIG_POSTADRESSE_UTLAND"] = "MIDLERTIDIG_POSTADRESSE_UTLAND";
    AdresseType["POSTADRESSE"] = "POSTADRESSE";
    AdresseType["POSTADRESSE_UTLAND"] = "POSTADRESSE_UTLAND";
    AdresseType["UKJENT_ADRESSE"] = "UKJENT_ADRESSE";
})(AdresseType || (AdresseType = {}));
export var PersonType;
(function (PersonType) {
    PersonType["S\u00D8KER"] = "S\u00D8KER";
    PersonType["ANNENPART"] = "ANNENPART";
    PersonType["BARN"] = "BARN";
})(PersonType || (PersonType = {}));
export const personTypeMap = {
    SØKER: 'Søker',
    ANNENPART: 'Annen part',
    BARN: 'Barn',
};
export var ForelderBarnRelasjonRolle;
(function (ForelderBarnRelasjonRolle) {
    ForelderBarnRelasjonRolle["BARN"] = "BARN";
    ForelderBarnRelasjonRolle["FAR"] = "FAR";
    ForelderBarnRelasjonRolle["MEDMOR"] = "MEDMOR";
    ForelderBarnRelasjonRolle["MOR"] = "MOR";
    ForelderBarnRelasjonRolle["EKTE"] = "EKTE";
})(ForelderBarnRelasjonRolle || (ForelderBarnRelasjonRolle = {}));
export var PersonTypeVisningsRangering;
(function (PersonTypeVisningsRangering) {
    PersonTypeVisningsRangering[PersonTypeVisningsRangering["S\u00D8KER"] = 1] = "S\u00D8KER";
    PersonTypeVisningsRangering[PersonTypeVisningsRangering["ANNENPART"] = 2] = "ANNENPART";
    PersonTypeVisningsRangering[PersonTypeVisningsRangering["BARN"] = 3] = "BARN";
})(PersonTypeVisningsRangering || (PersonTypeVisningsRangering = {}));
export var Adressebeskyttelsegradering;
(function (Adressebeskyttelsegradering) {
    Adressebeskyttelsegradering["STRENGT_FORTROLIG"] = "STRENGT_FORTROLIG";
    Adressebeskyttelsegradering["STRENGT_FORTROLIG_UTLAND"] = "STRENGT_FORTROLIG_UTLAND";
    Adressebeskyttelsegradering["FORTROLIG"] = "FORTROLIG";
    Adressebeskyttelsegradering["UGRADERT"] = "UGRADERT";
})(Adressebeskyttelsegradering || (Adressebeskyttelsegradering = {}));
export const adressebeskyttelsestyper = {
    STRENGT_FORTROLIG: 'strengt fortrolig',
    STRENGT_FORTROLIG_UTLAND: 'strengt fortrolig utland',
    FORTROLIG: 'fortrolig',
    UGRADERT: 'ugradert',
};
