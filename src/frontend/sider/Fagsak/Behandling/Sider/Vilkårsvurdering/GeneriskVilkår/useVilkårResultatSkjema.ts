import { useConfirmBrowserRefresh } from '@hooks/useConfirmBrowserRefresh';
import { useOnFormSubmitSuccessful } from '@hooks/useOnFormSubmitSuccessful';
import { useOppdaterVilkårResultat } from '@hooks/useOppdaterVilkårResultat';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { useEkspanderbarVilkårResultatRad } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårResultatRaderContext';
import type { IGrunnlagPerson } from '@typer/person';
import type { VedtakBegrunnelse } from '@typer/vedtak';
import type { IRestPersonResultat, IRestVilkårResultat, Regelverk, UtdypendeVilkårsvurdering } from '@typer/vilkår';
import { type IIsoDatoPeriode, nyIsoDatoPeriode } from '@utils/dato';
import { filtrerUtUmuligeUtdypendeVilkårsvurderinger } from '@utils/utdypendeVilkårsvurderinger';
import { useForm } from 'react-hook-form';
import { tilResultat, tilResultatBegrunnelse, tilVilkårResultatUi, type VilkårResultatUi } from '../validering';

export enum VilkårResultatFelt {
    VURDERES_ETTER = 'vurderesEtter',
    RESULTAT = 'resultat',
    UTDYPENDE_VILKÅRSVURDERINGER = 'utdypendeVilkårsvurderinger',
    ER_EKSPLISITT_AVSLAG_PÅ_SØKNAD = 'erEksplisittAvslagPåSøknad',
    AVSLAG_BEGRUNNELSER = 'avslagBegrunnelser',
    PERIODE = 'periode',
    BEGRUNNELSE = 'begrunnelse',
}

export interface VilkårResultatFormValues {
    [VilkårResultatFelt.VURDERES_ETTER]: Regelverk | null;
    [VilkårResultatFelt.RESULTAT]: VilkårResultatUi;
    [VilkårResultatFelt.UTDYPENDE_VILKÅRSVURDERINGER]: UtdypendeVilkårsvurdering[];
    [VilkårResultatFelt.ER_EKSPLISITT_AVSLAG_PÅ_SØKNAD]: boolean;
    [VilkårResultatFelt.AVSLAG_BEGRUNNELSER]: VedtakBegrunnelse[];
    [VilkårResultatFelt.PERIODE]: IIsoDatoPeriode;
    [VilkårResultatFelt.BEGRUNNELSE]: string;
}

export function lagVilkårResultatFormValues(
    vilkårResultat: IRestVilkårResultat,
    person: IGrunnlagPerson
): VilkårResultatFormValues {
    return {
        [VilkårResultatFelt.VURDERES_ETTER]: vilkårResultat.vurderesEtter,
        [VilkårResultatFelt.RESULTAT]: tilVilkårResultatUi(vilkårResultat),
        [VilkårResultatFelt.UTDYPENDE_VILKÅRSVURDERINGER]: filtrerUtUmuligeUtdypendeVilkårsvurderinger(
            vilkårResultat.utdypendeVilkårsvurderinger,
            {
                personType: person.type,
                vilkårType: vilkårResultat.vilkårType,
                resultat: vilkårResultat.resultat,
                vurderesEtter: vilkårResultat.vurderesEtter,
            }
        ),
        [VilkårResultatFelt.ER_EKSPLISITT_AVSLAG_PÅ_SØKNAD]: vilkårResultat.erEksplisittAvslagPåSøknad ?? false,
        [VilkårResultatFelt.AVSLAG_BEGRUNNELSER]: vilkårResultat.avslagBegrunnelser,
        [VilkårResultatFelt.PERIODE]: nyIsoDatoPeriode(vilkårResultat.periodeFom, vilkårResultat.periodeTom),
        [VilkårResultatFelt.BEGRUNNELSE]: vilkårResultat.begrunnelse,
    };
}

export function tilRestVilkårResultat(
    vilkårResultat: IRestVilkårResultat,
    values: VilkårResultatFormValues
): IRestVilkårResultat {
    return {
        ...vilkårResultat,
        vurderesEtter: values.vurderesEtter,
        resultat: tilResultat(values.resultat),
        resultatBegrunnelse: tilResultatBegrunnelse(values.resultat),
        utdypendeVilkårsvurderinger: values.utdypendeVilkårsvurderinger,
        erEksplisittAvslagPåSøknad: values.erEksplisittAvslagPåSøknad,
        avslagBegrunnelser: values.avslagBegrunnelser,
        periodeFom: values.periode.fom,
        periodeTom: values.periode.tom,
        begrunnelse: values.begrunnelse,
    };
}

interface Props {
    vilkårResultat: IRestVilkårResultat;
    person: IGrunnlagPerson;
    visFeilmeldinger: boolean;
    settFokusPåKnapp: () => void;
}

export function useVilkårResultatSkjema({ vilkårResultat, person, visFeilmeldinger, settFokusPåKnapp }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { kollapsRad } = useEkspanderbarVilkårResultatRad(vilkårResultat.id);
    const { mutateAsync: oppdaterVilkårResultat } = useOppdaterVilkårResultat();

    const form = useForm<VilkårResultatFormValues>({
        values: lagVilkårResultatFormValues(vilkårResultat, person),
        mode: visFeilmeldinger ? 'onChange' : 'onSubmit',
    });

    const {
        control,
        setError,
        reset,
        formState: { isDirty },
    } = form;

    useConfirmBrowserRefresh({ enabled: isDirty });

    useOnFormSubmitSuccessful(control, () => reset());

    const onSubmit = async (values: VilkårResultatFormValues) => {
        const personResultat: IRestPersonResultat = {
            personIdent: person.personIdent,
            vilkårResultater: [tilRestVilkårResultat(vilkårResultat, values)],
            andreVurderinger: [],
        };

        try {
            const oppdatertBehandling = await oppdaterVilkårResultat({
                behandlingId: behandling.behandlingId,
                vilkårResultatId: vilkårResultat.id,
                personResultat,
            });
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            kollapsRad();
            settFokusPåKnapp();
        } catch (error) {
            setError('root', { message: error instanceof Error ? error.message : 'En ukjent feil oppstod.' });
        }
    };

    return { form, onSubmit };
}
