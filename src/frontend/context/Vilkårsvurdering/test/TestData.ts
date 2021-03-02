import { IFagsak } from '../../../typer/fagsak';
import { Resultat } from '../../../typer/vilkår';

export const testFagsak: IFagsak = JSON.parse(`{
    "opprettetTidspunkt": "2021-02-17T12:03:14.529",
    "id": 1051701,
    "søkerFødselsnummer": "11079219845",
    "status": "OPPRETTET",
    "underBehandling": true,
    "behandlinger": [
      {
        "aktiv": true,
        "arbeidsfordelingPåBehandling": {
          "behandlendeEnhetId": "4842",
          "behandlendeEnhetNavn": "NAV Familie- og pensjonsytelser Stord",
          "manueltOverstyrt": false
        },
        "årsak": "SØKNAD",
        "skalBehandlesAutomatisk": false,
        "behandlingId": 1054601,
        "type": "FØRSTEGANGSBEHANDLING",
        "status": "UTREDES",
        "steg": "VILKÅRSVURDERING",
        "stegTilstand": [
          {
            "behandlingSteg": "REGISTRERE_PERSONGRUNNLAG",
            "behandlingStegStatus": "UTFØRT"
          },
          {
            "behandlingSteg": "REGISTRERE_SØKNAD",
            "behandlingStegStatus": "UTFØRT"
          },
          {
            "behandlingSteg": "VILKÅRSVURDERING",
            "behandlingStegStatus": "IKKE_UTFØRT"
          }
        ],
        "kategori": "NASJONAL",
        "personer": [
          {
            "type": "BARN",
            "fødselsdato": "2018-06-12",
            "personIdent": "12061879860",
            "navn": "TVILSOM SAKS",
            "kjønn": "KVINNE",
            "målform": "NB"
          },
          {
            "type": "SØKER",
            "fødselsdato": "1992-07-11",
            "personIdent": "11079219845",
            "navn": "FRODIG HEST",
            "kjønn": "KVINNE",
            "målform": "NB"
          }
        ],
        "opprettetTidspunkt": "2021-02-17T12:03:23.283",
        "underkategori": "ORDINÆR",
        "personResultater": [
          {
            "personIdent": "11079219845",
            "vilkårResultater": [
              {
                "id": 1108486,
                "vilkårType": "LOVLIG_OPPHOLD",
                "resultat": "OPPFYLT",
                "periodeFom": "1992-07-11",
                "periodeTom": null,
                "begrunnelse": "",
                "endretAv": "F_Z991772.E_Z991772@trygdeetaten.no",
                "endretTidspunkt": "2021-02-17T12:40:08.458",
                "behandlingId": 1054601,
                "erVurdert": true,
                "erAutomatiskVurdert": false,
                "erEksplisittAvslagPåSøknad": false
              },
              {
                "id": 1108485,
                "vilkårType": "BOSATT_I_RIKET",
                "resultat": "OPPFYLT",
                "periodeFom": "1992-07-11",
                "periodeTom": null,
                "begrunnelse": "",
                "endretAv": "F_Z991772.E_Z991772@trygdeetaten.no",
                "endretTidspunkt": "2021-02-17T12:40:08.458",
                "behandlingId": 1054601,
                "erVurdert": true,
                "erAutomatiskVurdert": false,
                "erEksplisittAvslagPåSøknad": false
              }
            ],
            "andreVurderinger": [
              {
                "id": 2,
                "begrunnelse": null,
                "behandlingId": 1054601,
                "endretAv": "F_Z991772.E_Z991772@trygdeetaten.no",
                "endretTidspunkt": "2021-02-17T12:40:08.458",
                "erVurdert": true,
                "resultat": "OPPFYLT",
                "type": "OPPLYSNINGSPLIKT"
              }
            ]
          },
          {
            "personIdent": "12061879860",
            "vilkårResultater": [
              {
                "id": 1108480,
                "vilkårType": "BOR_MED_SØKER",
                "resultat": "OPPFYLT",
                "periodeFom": "2018-06-12",
                "periodeTom": null,
                "begrunnelse": "",
                "endretAv": "F_Z991772.E_Z991772@trygdeetaten.no",
                "endretTidspunkt": "2021-02-17T12:40:16.221",
                "behandlingId": 1054601,
                "erVurdert": true,
                "erAutomatiskVurdert": false,
                "erEksplisittAvslagPåSøknad": false
              },
              {
                "id": 1108484,
                "vilkårType": "GIFT_PARTNERSKAP",
                "resultat": "OPPFYLT",
                "periodeFom": "2018-06-12",
                "periodeTom": null,
                "begrunnelse": "",
                "endretAv": "F_Z991772.E_Z991772@trygdeetaten.no",
                "endretTidspunkt": "2021-02-17T12:40:08.458",
                "behandlingId": 1054601,
                "erVurdert": true,
                "erAutomatiskVurdert": true,
                "erEksplisittAvslagPåSøknad": null
              },
              {
                "id": 1108483,
                "vilkårType": "UNDER_18_ÅR",
                "resultat": "OPPFYLT",
                "periodeFom": "2018-06-12",
                "periodeTom": "2036-05-10",
                "begrunnelse": "Vurdert og satt automatisk",
                "endretAv": "F_Z994954.E_Z994954@trygdeetaten.no",
                "endretTidspunkt": "2021-02-19T10:26:16.245",
                "behandlingId": 1054601,
                "erVurdert": true,
                "erAutomatiskVurdert": false,
                "erEksplisittAvslagPåSøknad": null
              },
              {
                "id": 1108481,
                "vilkårType": "BOSATT_I_RIKET",
                "resultat": "OPPFYLT",
                "periodeFom": "2018-06-12",
                "periodeTom": null,
                "begrunnelse": "",
                "endretAv": "F_Z991772.E_Z991772@trygdeetaten.no",
                "endretTidspunkt": "2021-02-17T12:40:19.027",
                "behandlingId": 1054601,
                "erVurdert": true,
                "erAutomatiskVurdert": false,
                "erEksplisittAvslagPåSøknad": false
              },
              {
                "id": 1108482,
                "vilkårType": "LOVLIG_OPPHOLD",
                "resultat": "OPPFYLT",
                "periodeFom": "2018-06-12",
                "periodeTom": null,
                "begrunnelse": "",
                "endretAv": "F_Z991772.E_Z991772@trygdeetaten.no",
                "endretTidspunkt": "2021-02-17T12:40:23.708",
                "behandlingId": 1054601,
                "erVurdert": true,
                "erAutomatiskVurdert": false,
                "erEksplisittAvslagPåSøknad": false
              }
            ],
            "andreVurderinger": [
              {
                "id": 2,
                "begrunnelse": null,
                "behandlingId": 1054601,
                "endretAv": "F_Z991772.E_Z991772@trygdeetaten.no",
                "endretTidspunkt": "2021-02-17T12:40:08.458",
                "erVurdert": true,
                "resultat": "OPPFYLT",
                "type": "OPPLYSNINGSPLIKT"
              }
            ]
          }
        ],
        "resultat": "IKKE_VURDERT",
        "vedtakForBehandling": [],
        "totrinnskontroll": null,
        "utbetalingsperioder": [],
        "vedtaksperioder": [],
        "personerMedAndelerTilkjentYtelse": [],
        "endretAv": "F_Z991772.E_Z991772@trygdeetaten.no",
        "opplysningsplikt": null
      }
    ]
  }`);

export const lagAndreVurderingResultater = (fagsak: IFagsak, resultat: Resultat) => {
    fagsak.behandlinger.forEach(behandling =>
        behandling.personResultater.forEach(personResultat =>
            personResultat.andreVurderinger.forEach(
                annenVurdering => (annenVurdering.resultat = resultat)
            )
        )
    );
    return fagsak;
};
