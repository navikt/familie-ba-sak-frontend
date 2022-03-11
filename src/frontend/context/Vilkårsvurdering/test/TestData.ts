import type { IGrunnlagPerson } from '../../../typer/person';
import type { IRestPersonResultat } from '../../../typer/vilkår';

export const genererPersonresultat = (
    annenVurderingEnResultat: string,
    annenVurderingToResultat: string
): IRestPersonResultat =>
    JSON.parse(`{
        "personIdent": "11079219845",
        "vilkårResultater": [],
        "andreVurderinger": [
            {
                "id": 2,
                "begrunnelse": null,
                "behandlingId": 1054601,
                "endretAv": "F_Z991772.E_Z991772@trygdeetaten.no",
                "endretTidspunkt": "2021-02-17T12:40:08.458",
                "erVurdert": true,
                "resultat": "${annenVurderingEnResultat}",
                "type": "OPPLYSNINGSPLIKT"
            },
            {
                "id": 3,
                "begrunnelse": null,
                "behandlingId": 1054601,
                "endretAv": "F_Z991772.E_Z991772@trygdeetaten.no",
                "endretTidspunkt": "2021-02-17T12:40:08.458",
                "erVurdert": true,
                "resultat": "${annenVurderingToResultat}",
                "type": "OPPLYSNINGSPLIKT"
            }
        ]
    }`);

export const genererPerson: IGrunnlagPerson = JSON.parse(
    `{
            "type": "SØKER",
            "fødselsdato": "1992-07-11",
            "personIdent": "11079219845",
            "navn": "FRODIG HEST",
            "kjønn": "KVINNE",
            "målform": "NB"
          }`
);
