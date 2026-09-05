import { useBehandlingId } from '@hooks/useBehandlingId';
import VilkårResultatIkon from '@ikoner/VilkårResultatIkon';
import { CogIcon, CogRotationIcon, PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, Table, Tooltip } from '@navikt/ds-react';
import { useEkspanderbarVilkårResultatRad } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårResultatRaderContext';
import type { IGrunnlagPerson } from '@typer/person';
import { type IRestVilkårResultat, type IVilkårConfig, Resultat, resultatVisningsnavn } from '@typer/vilkår';
import { isoDatoPeriodeTilFormatertString, nyIsoDatoPeriode } from '@utils/dato';
import { alleRegelverk } from '@utils/vilkår';
import { useEffect } from 'react';
import { FormProvider, useWatch } from 'react-hook-form';
import { useVilkårResultatSkjema, VilkårResultatFelt } from './useVilkårResultatSkjema';
import { vilkårFeilmeldingId } from './VilkårTabell';
import Styles from './VilkårTabellRad.module.css';
import { VilkårTabellRadEndre } from './VilkårTabellRadEndre';

interface Props {
    person: IGrunnlagPerson;
    vilkårFraConfig: IVilkårConfig;
    vilkårResultat: IRestVilkårResultat;
    visFeilmeldinger: boolean;
    settFokusPåKnapp: () => void;
}

export function VilkårTabellRad({
    person,
    vilkårFraConfig,
    vilkårResultat,
    visFeilmeldinger,
    settFokusPåKnapp,
}: Props) {
    const behandlingId = useBehandlingId();

    const { erRadEkspandert, toggleRad } = useEkspanderbarVilkårResultatRad(vilkårResultat.id);

    const { form, onSubmit } = useVilkårResultatSkjema({ vilkårResultat, person, visFeilmeldinger, settFokusPåKnapp });

    const {
        control,
        handleSubmit,
        reset,
        trigger,
        formState: { isDirty },
    } = form;

    const vurderesEtter = useWatch({ control, name: VilkårResultatFelt.VURDERES_ETTER });

    useEffect(() => {
        if (visFeilmeldinger && erRadEkspandert) {
            trigger();
        }
    }, [visFeilmeldinger, erRadEkspandert, trigger]);

    const periodeErTom = !vilkårResultat.periodeFom && !vilkårResultat.periodeTom;

    const toggleForm = (visAlert: boolean) => {
        const harUlagredeEndringer = erRadEkspandert && visAlert && isDirty;
        toggleRad(harUlagredeEndringer);
        if (!harUlagredeEndringer) {
            reset();
        }
    };

    return (
        <Table.ExpandableRow
            key={`${vilkårResultat.id}-${erRadEkspandert ? 'ekspandert' : 'lukket'}`} // Pga. React.Activity ikke fungerer så bra med Aksel, se https://github.com/navikt/aksel/issues/5017
            open={erRadEkspandert}
            togglePlacement={'right'}
            onOpenChange={() => toggleForm(true)}
            id={vilkårFeilmeldingId(vilkårResultat)}
            content={
                erRadEkspandert ? (
                    <FormProvider {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <VilkårTabellRadEndre
                                person={person}
                                vilkårFraConfig={vilkårFraConfig}
                                vilkårResultat={vilkårResultat}
                                onAvbryt={() => toggleForm(false)}
                            />
                        </form>
                    </FormProvider>
                ) : null
            }
        >
            <Table.DataCell className={Styles.celle}>
                <HStack justify={'start'} align={'center'} gap={'space-6'} wrap={false}>
                    <VilkårResultatIkon
                        resultat={vilkårResultat.resultat}
                        resultatBegrunnelse={vilkårResultat.resultatBegrunnelse}
                    />
                    <BodyShort>
                        {vilkårResultat.resultat === Resultat.OPPFYLT && vilkårResultat.resultatBegrunnelse
                            ? resultatVisningsnavn[vilkårResultat.resultatBegrunnelse]
                            : resultatVisningsnavn[vilkårResultat.resultat]}
                    </BodyShort>
                </HStack>
            </Table.DataCell>
            <Table.DataCell className={Styles.celle}>
                <BodyShort>
                    {periodeErTom
                        ? '-'
                        : isoDatoPeriodeTilFormatertString(
                              nyIsoDatoPeriode(vilkårResultat.periodeFom, vilkårResultat.periodeTom)
                          )}
                </BodyShort>
            </Table.DataCell>
            <Table.DataCell className={Styles.celle}>
                {vilkårResultat.begrunnelse && (
                    <Tooltip content={vilkårResultat.begrunnelse} className={Styles.tooltip}>
                        <BodyShort className={Styles.beskrivelse}>{vilkårResultat.begrunnelse}</BodyShort>
                    </Tooltip>
                )}
            </Table.DataCell>
            <Table.DataCell className={Styles.celle}>
                <HStack justify={'start'} align={'center'} gap={'space-6'} wrap={false}>
                    {vurderesEtter ? (
                        <>
                            {alleRegelverk[vurderesEtter].symbol}
                            <BodyShort>{alleRegelverk[vurderesEtter].tekst}</BodyShort>
                        </>
                    ) : (
                        <>
                            <CogIcon title={'Generell vurdering'} className={Styles.ikon} />
                            <BodyShort>Generell vurdering</BodyShort>
                        </>
                    )}
                </HStack>
            </Table.DataCell>
            <Table.DataCell className={Styles.celle}>
                <HStack justify={'start'} align={'center'} gap={'space-6'} wrap={false}>
                    {vilkårResultat.erAutomatiskVurdert ? (
                        <CogRotationIcon title={'Automatisk Vurdering'} className={Styles.ikon} />
                    ) : (
                        <PersonIcon title={'Manuell vurdering'} className={Styles.ikon} />
                    )}
                    <BodyShort>
                        {vilkårResultat.erVurdert
                            ? vilkårResultat.behandlingId === behandlingId
                                ? 'Vurdert i denne behandlingen'
                                : 'Vurdert i tidligere behandling'
                            : ''}
                    </BodyShort>
                </HStack>
            </Table.DataCell>
        </Table.ExpandableRow>
    );
}
