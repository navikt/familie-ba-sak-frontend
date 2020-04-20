"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commons_1 = require("../utils/commons");
const periode_1 = require("./periode");
const person_1 = require("./person");
const felt_1 = require("./felt");
const validators_1 = require("../utils/validators");
var Resultat;
(function (Resultat) {
    Resultat["NEI"] = "NEI";
    Resultat["JA"] = "JA";
    Resultat["KANSKJE"] = "KANSKJE";
})(Resultat = exports.Resultat || (exports.Resultat = {}));
exports.resultatTilUi = (resultat) => {
    switch (resultat) {
        case Resultat.JA:
            return 'Oppfylt';
        case Resultat.NEI:
            return 'Ikke oppfylt';
        case Resultat.KANSKJE:
            return 'Ikke vurdert';
        default:
            return 'Ukjent resultat';
    }
};
var VilkårType;
(function (VilkårType) {
    VilkårType["UNDER_18_\u00C5R"] = "UNDER_18_\u00C5R";
    VilkårType["BOR_MED_S\u00D8KER"] = "BOR_MED_S\u00D8KER";
    VilkårType["GIFT_PARTNERSKAP"] = "GIFT_PARTNERSKAP";
    VilkårType["BOSATT_I_RIKET"] = "BOSATT_I_RIKET";
    VilkårType["LOVLIG_OPPHOLD"] = "LOVLIG_OPPHOLD";
})(VilkårType = exports.VilkårType || (exports.VilkårType = {}));
exports.lagTomtFeltMedVilkår = (vilkårType) => ({
    begrunnelse: felt_1.nyttFelt('', validators_1.erUtfylt),
    id: commons_1.randomUUID(),
    periode: felt_1.nyttFelt(periode_1.nyPeriode(), validators_1.erPeriodeGyldig),
    resultat: felt_1.nyttFelt(Resultat.KANSKJE, validators_1.erResultatGyldig),
    vilkårType,
});
exports.vilkårConfig = {
    UNDER_18_ÅR: {
        beskrivelse: 'under 18 år',
        key: 'UNDER_18_ÅR',
        lovreferanse: '§ 2',
        tittel: 'Under 18 år',
        spørsmål: () => `Er barnet under 18 år?`,
        parterDetteGjelderFor: [person_1.PersonType.BARN],
    },
    BOR_MED_SØKER: {
        beskrivelse: 'bor med søker',
        key: 'BOR_MED_SØKER',
        lovreferanse: '§ 2, 2. LEDD',
        tittel: 'Bor med søker',
        spørsmål: () => `Bor barnet med søker?`,
        parterDetteGjelderFor: [person_1.PersonType.BARN],
    },
    GIFT_PARTNERSKAP: {
        beskrivelse: 'ugift og ikke partnerskap',
        key: 'GIFT_PARTNERSKAP',
        lovreferanse: '§ 2, 4. LEDD',
        tittel: 'Ugift og ikke partnerskap',
        spørsmål: () => 'Er barnet ugift og har ikke partnerskap',
        parterDetteGjelderFor: [person_1.PersonType.BARN],
    },
    BOSATT_I_RIKET: {
        beskrivelse: 'bosatt i riket',
        key: 'BOSATT_I_RIKET',
        lovreferanse: '§ 4, 1. LEDD',
        tittel: 'Bosatt i riket',
        spørsmål: (part) => `Er ${part} bosatt i riket?`,
        parterDetteGjelderFor: [person_1.PersonType.BARN, person_1.PersonType.SØKER],
    },
    LOVLIG_OPPHOLD: {
        beskrivelse: 'lovlig opphold',
        key: 'LOVLIG_OPPHOLD',
        lovreferanse: '§ 4, 2. LEDD',
        tittel: 'Lovlig opphold',
        spørsmål: (part) => `Har ${part} lovlig opphold?`,
        parterDetteGjelderFor: [person_1.PersonType.BARN, person_1.PersonType.SØKER],
    },
};
//# sourceMappingURL=vilkår.js.map