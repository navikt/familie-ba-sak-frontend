import { IPersonResultat } from '../../../typer/vilkår';
import { kjørValidering } from '../validering';

describe('vilkårsvurdering/validering', () => {
    describe('validering', () => {
        const søkerPersonResultat: IPersonResultat = JSON.parse(`{
                    "person": {
                        "type": "SØKER",
                        "fødselsdato": "1990-02-19",
                        "personIdent": "12345678910",
                        "navn": "MorMoresen",
                        "kjønn": "KVINNE",
                        "målform": "NB"
                    },
                    "personIdent": "12345678910",
                    "vilkårResultater": [
                        {
                            "feilmelding": "Felteterpåkrevd, menmanglerinput",
                            "valideringsstatus": "IKKE_VALIDERT",
                            "verdi": {
                                "begrunnelse": {
                                    "feilmelding": "",
                                    "valideringsstatus": "OK",
                                    "verdi": ""
                                },
                                "id": 6,
                                "periode": {
                                    "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                    "valideringsstatus": "IKKE_VALIDERT",
                                    "verdi": {
                                        "fom": "2021-03-01"
                                    }
                                },
                                "resultat": {
                                    "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                    "valideringsstatus": "IKKE_VALIDERT",
                                    "verdi": "OPPFYLT"
                                },
                                "vilkårType": "BOSATT_I_RIKET",
                                "endretAv": "F_Z994549.E_Z994549@trygdeetaten.no",
                                "erVurdert": true,
                                "erAutomatiskVurdert": false,
                                "erEksplisittAvslagPåSøknad": false,
                                "endretTidspunkt": "2021-03-01T16: 28: 44.415876",
                                "behandlingId": 1
                            }
                        },
                        {
                            "feilmelding": "Felteterpåkrevd, menmanglerinput",
                            "valideringsstatus": "IKKE_VALIDERT",
                            "verdi": {
                                "begrunnelse": {
                                    "feilmelding": "",
                                    "valideringsstatus": "OK",
                                    "verdi": ""
                                },
                                "id": 7,
                                "periode": {
                                    "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                    "valideringsstatus": "IKKE_VALIDERT",
                                    "verdi": {
                                        "fom": "2021-03-01"
                                    }
                                },
                                "resultat": {
                                    "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                    "valideringsstatus": "IKKE_VALIDERT",
                                    "verdi": "OPPFYLT"
                                },
                                "vilkårType": "LOVLIG_OPPHOLD",
                                "endretAv": "F_Z994549.E_Z994549@trygdeetaten.no",
                                "erVurdert": true,
                                "erAutomatiskVurdert": false,
                                "erEksplisittAvslagPåSøknad": false,
                                "endretTidspunkt": "2021-03-01T16: 28: 49.858632",
                                "behandlingId": 1
                            }
                        }
                    ],
                    "andreVurderinger": [
                        {
                            "feilmelding": "Felteterpåkrevd, menmanglerinput",
                            "valideringsstatus": "IKKE_VALIDERT",
                            "verdi": {
                                "begrunnelse": {
                                    "feilmelding": "",
                                    "valideringsstatus": "OK",
                                    "verdi": null
                                },
                                "id": 2,
                                "resultat": {
                                    "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                    "valideringsstatus": "IKKE_VALIDERT",
                                    "verdi": "OPPFYLT"
                                },
                                "type": "OPPLYSNINGSPLIKT"
                            }
                        }
                    ]
                },
            {
                "person": {
                    "type": "BARN",
                    "fødselsdato": "2020-03-01",
                    "personIdent": "01032000033",
                    "navn": "JentaBarnesen",
                    "kjønn": "KVINNE",
                    "målform": "NB"
                },
                "personIdent": "01032000033",
                "vilkårResultater": [
                    {
                        "feilmelding": "Felteterpåkrevd, menmanglerinput",
                        "valideringsstatus": "IKKE_VALIDERT",
                        "verdi": {
                            "begrunnelse": {
                                "feilmelding": "",
                                "valideringsstatus": "OK",
                                "verdi": ""
                            },
                            "id": 1,
                            "periode": {
                                "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                "valideringsstatus": "IKKE_VALIDERT",
                                "verdi": {
                                    "fom": "2021-03-01"
                                }
                            },
                            "resultat": {
                                "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                "valideringsstatus": "IKKE_VALIDERT",
                                "verdi": "OPPFYLT"
                            },
                            "vilkårType": "BOR_MED_SØKER",
                            "endretAv": "F_Z994549.E_Z994549@trygdeetaten.no",
                            "erVurdert": true,
                            "erAutomatiskVurdert": false,
                            "erEksplisittAvslagPåSøknad": false,
                            "endretTidspunkt": "2021-03-01T16: 28: 57.347721",
                            "behandlingId": 1
                        }
                    },
                    {
                        "feilmelding": "Felteterpåkrevd, menmanglerinput",
                        "valideringsstatus": "IKKE_VALIDERT",
                        "verdi": {
                            "begrunnelse": {
                                "feilmelding": "",
                                "valideringsstatus": "OK",
                                "verdi": ""
                            },
                            "id": 2,
                            "periode": {
                                "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                "valideringsstatus": "IKKE_VALIDERT",
                                "verdi": {
                                    "fom": "2021-03-01"
                                }
                            },
                            "resultat": {
                                "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                "valideringsstatus": "IKKE_VALIDERT",
                                "verdi": "OPPFYLT"
                            },
                            "vilkårType": "BOSATT_I_RIKET",
                            "endretAv": "F_Z994549.E_Z994549@trygdeetaten.no",
                            "erVurdert": true,
                            "erAutomatiskVurdert": false,
                            "erEksplisittAvslagPåSøknad": false,
                            "endretTidspunkt": "2021-03-01T16: 29: 12.962043",
                            "behandlingId": 1
                        }
                    },
                    {
                        "feilmelding": "Felteterpåkrevd, menmanglerinput",
                        "valideringsstatus": "IKKE_VALIDERT",
                        "verdi": {
                            "begrunnelse": {
                                "feilmelding": "",
                                "valideringsstatus": "OK",
                                "verdi": "Vilkåreterforsøktbehandletautomatisk, menbarneterregistrertsomgiftifolkeregisteret.Vurderhvilkekonsekvenserdetteskalhaforbehandlingen"
                            },
                            "id": 5,
                            "periode": {
                                "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                "valideringsstatus": "IKKE_VALIDERT",
                                "verdi": {
                                    "fom": "2020-03-02"
                                }
                            },
                            "resultat": {
                                "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                "valideringsstatus": "IKKE_VALIDERT",
                                "verdi": "IKKE_OPPFYLT"
                            },
                            "vilkårType": "GIFT_PARTNERSKAP",
                            "endretAv": "F_Z994549.E_Z994549@trygdeetaten.no",
                            "erVurdert": true,
                            "erAutomatiskVurdert": false,
                            "erEksplisittAvslagPåSøknad": false,
                            "endretTidspunkt": "2021-03-01T16: 29: 04.939789",
                            "behandlingId": 1
                        }
                    },
                    {
                        "feilmelding": "Felteterpåkrevd, menmanglerinput",
                        "valideringsstatus": "IKKE_VALIDERT",
                        "verdi": {
                            "begrunnelse": {
                                "feilmelding": "",
                                "valideringsstatus": "OK",
                                "verdi": ""
                            },
                            "id": 3,
                            "periode": {
                                "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                "valideringsstatus": "IKKE_VALIDERT",
                                "verdi": {
                                    "fom": "2021-03-01"
                                }
                            },
                            "resultat": {
                                "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                "valideringsstatus": "IKKE_VALIDERT",
                                "verdi": "OPPFYLT"
                            },
                            "vilkårType": "LOVLIG_OPPHOLD",
                            "endretAv": "F_Z994549.E_Z994549@trygdeetaten.no",
                            "erVurdert": true,
                            "erAutomatiskVurdert": false,
                            "erEksplisittAvslagPåSøknad": false,
                            "endretTidspunkt": "2021-03-01T16: 29: 21.089732",
                            "behandlingId": 1
                        }
                    },
                    {
                        "feilmelding": "Felteterpåkrevd, menmanglerinput",
                        "valideringsstatus": "IKKE_VALIDERT",
                        "verdi": {
                            "begrunnelse": {
                                "feilmelding": "",
                                "valideringsstatus": "OK",
                                "verdi": "Vurdertogsattautomatisk"
                            },
                            "id": 4,
                            "periode": {
                                "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                "valideringsstatus": "IKKE_VALIDERT",
                                "verdi": {
                                    "fom": "2020-03-01",
                                    "tom": "2038-02-28"
                                }
                            },
                            "resultat": {
                                "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                "valideringsstatus": "IKKE_VALIDERT",
                                "verdi": "OPPFYLT"
                            },
                            "vilkårType": "UNDER_18_ÅR",
                            "endretAv": "F_Z994549.E_Z994549@trygdeetaten.no",
                            "erVurdert": true,
                            "erAutomatiskVurdert": true,
                            "erEksplisittAvslagPåSøknad": null,
                            "endretTidspunkt": "2021-03-01T16: 21: 52.507961",
                            "behandlingId": 1
                        }
                    }
                ],
                "andreVurderinger": [
                    {
                        "feilmelding": "Felteterpåkrevd, menmanglerinput",
                        "valideringsstatus": "IKKE_VALIDERT",
                        "verdi": {
                            "begrunnelse": {
                                "feilmelding": "",
                                "valideringsstatus": "OK",
                                "verdi": null
                            },
                            "id": 1,
                            "resultat": {
                                "feilmelding": "Felteterpåkrevd, menmanglerinput",
                                "valideringsstatus": "IKKE_VALIDERT",
                                "verdi": "IKKE_OPPFYLT"
                            },
                            "type": "OPPLYSNINGSPLIKT"
                        }
                    }
                ]
            }`);

        test('Skal validere gjennom å returnere tom liste', () => {
            expect(kjørValidering([søkerPersonResultat])).toBe([]);
        });
    });
});
