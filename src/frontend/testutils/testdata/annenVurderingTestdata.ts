import { AnnenVurderingType, type IRestAnnenVurdering, Resultat } from '@typer/vilkår';

export function lagAnnenVurdering(annenVurdering: Partial<IRestAnnenVurdering> = {}): IRestAnnenVurdering {
    return {
        id: 1,
        begrunnelse: '',
        behandlingId: 1,
        endretAv: 'Z999999',
        endretTidspunkt: '2024-01-01T00:00:00',
        erVurdert: false,
        resultat: Resultat.IKKE_VURDERT,
        type: AnnenVurderingType.OPPLYSNINGSPLIKT,
        ...annenVurdering,
    };
}
