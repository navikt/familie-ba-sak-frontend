import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { useSlettVilkårResultatError } from '@hooks/useSlettVilkårResultatError';
import { Button, ErrorMessage, Fieldset, HStack, VStack } from '@navikt/ds-react';
import { BehandlingÅrsak } from '@typer/behandling';
import { erFagsakAvTypeEnsligMindreårig, erFagsakAvTypeInstitusjon } from '@typer/fagsak';
import type { IGrunnlagPerson } from '@typer/person';
import { type IRestVilkårResultat, type IVilkårConfig, Resultat, VilkårType } from '@typer/vilkår';
import { nyIsoDatoPeriode } from '@utils/dato/periode';
import { useFormContext, useWatch } from 'react-hook-form';

import { SkjemaRamme } from '../SkjemaRamme';
import { AvslagBegrunnelserFelt } from './AvslagBegrunnelserFelt';
import { BegrunnelseFelt } from './BegrunnelseFelt';
import { ErEksplisittAvslagPåSøknadFelt } from './ErEksplisittAvslagPåSøknadFelt';
import { PeriodeFelt } from './PeriodeFelt';
import { ResultatFelt } from './ResultatFelt';
import { SlettVilkårResultat } from './SlettVilkårResultat';
import { UtdypendeVilkårsvurderingerFelt } from './UtdypendeVilkårsvurderingerFelt';
import { VilkårResultatFelt, type VilkårResultatFormValues } from './useVilkårResultatSkjema';
import { VurderesEtterFelt } from './VurderesEtterFelt';

const VILKÅR_MED_REGELVERKSVALG = [VilkårType.BOR_MED_SØKER, VilkårType.BOSATT_I_RIKET, VilkårType.LOVLIG_OPPHOLD];

interface Props {
    person: IGrunnlagPerson;
    vilkårFraConfig: IVilkårConfig;
    vilkårResultat: IRestVilkårResultat;
    onAvbryt: () => void;
}

export function VilkårTabellRadEndre({ person, vilkårFraConfig, vilkårResultat, onAvbryt }: Props) {
    const behandling = useBehandling();
    const fagsak = useFagsak();
    const erLesevisning = useErLesevisning();

    const slettVilkårResultatError = useSlettVilkårResultatError(vilkårResultat.id);

    const {
        control,
        formState: { isSubmitting, errors },
    } = useFormContext<VilkårResultatFormValues>();

    const resultat = useWatch({ control, name: VilkårResultatFelt.RESULTAT });
    const erEksplisittAvslagPåSøknad = useWatch({ control, name: VilkårResultatFelt.ER_EKSPLISITT_AVSLAG_PÅ_SØKNAD });

    const årsakErSøknad = behandling.årsak === BehandlingÅrsak.SØKNAD;

    const visRegelverkValg =
        !erFagsakAvTypeEnsligMindreårig(fagsak) &&
        !erFagsakAvTypeInstitusjon(fagsak) &&
        VILKÅR_MED_REGELVERKSVALG.includes(vilkårResultat.vilkårType);

    const feilmeldinger = [
        { id: 'lagre', feilmelding: errors.root?.message },
        { id: 'slett', feilmelding: slettVilkårResultatError?.message },
    ].filter(({ feilmelding }) => !!feilmelding);

    return (
        <Fieldset
            legend={'Endre vilkår'}
            hideLegend
            error={
                feilmeldinger.length > 0 ? (
                    <VStack gap={'space-16'}>
                        {feilmeldinger.map(({ id, feilmelding }) => (
                            <ErrorMessage key={id}>{feilmelding}</ErrorMessage>
                        ))}
                    </VStack>
                ) : undefined
            }
            errorPropagation={false}
        >
            <SkjemaRamme lesevisning={erLesevisning} resultat={vilkårResultat.resultat}>
                {visRegelverkValg && (
                    <VurderesEtterFelt personType={person.type} vilkårType={vilkårResultat.vilkårType} />
                )}
                <ResultatFelt
                    legend={vilkårFraConfig.spørsmål ? vilkårFraConfig.spørsmål(person.type.toLowerCase()) : ''}
                    personType={person.type}
                    vilkårType={vilkårResultat.vilkårType}
                />
                <UtdypendeVilkårsvurderingerFelt personType={person.type} vilkårType={vilkårResultat.vilkårType} />
                {resultat === Resultat.IKKE_OPPFYLT && årsakErSøknad && (
                    <>
                        <ErEksplisittAvslagPåSøknadFelt />
                        {erEksplisittAvslagPåSøknad && (
                            <AvslagBegrunnelserFelt
                                vilkårResultatId={vilkårResultat.id}
                                vilkårType={vilkårResultat.vilkårType}
                            />
                        )}
                    </>
                )}
                <PeriodeFelt
                    key={`${vilkårResultat.endretTidspunkt}_${vilkårResultat.periodeFom}_${vilkårResultat.periodeTom}`}
                    person={person}
                    vilkårType={vilkårResultat.vilkårType}
                    lagretPeriode={nyIsoDatoPeriode(vilkårResultat.periodeFom, vilkårResultat.periodeTom)}
                />
                <BegrunnelseFelt personType={person.type} vilkårType={vilkårResultat.vilkårType} />
                {!erLesevisning && (
                    <HStack justify={'space-between'} marginBlock={'space-16'}>
                        <HStack gap={'space-16'}>
                            <Button type={'submit'} size={'medium'} variant={'secondary'} loading={isSubmitting}>
                                Ferdig
                            </Button>
                            <Button type={'button'} onClick={onAvbryt} size={'medium'} variant={'tertiary'}>
                                Avbryt
                            </Button>
                        </HStack>
                        <SlettVilkårResultat personIdent={person.personIdent} vilkårResultatId={vilkårResultat.id} />
                    </HStack>
                )}
            </SkjemaRamme>
        </Fieldset>
    );
}
