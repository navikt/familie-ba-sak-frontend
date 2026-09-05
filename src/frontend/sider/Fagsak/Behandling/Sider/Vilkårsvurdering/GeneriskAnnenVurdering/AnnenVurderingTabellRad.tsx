import { useErLesevisning } from '@hooks/useErLesevisning';
import VilkårResultatIkon from '@ikoner/VilkårResultatIkon';
import { PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, Table } from '@navikt/ds-react';
import type { IGrunnlagPerson } from '@typer/person';
import type { IAnnenVurderingConfig, IRestAnnenVurdering } from '@typer/vilkår';
import { Resultat, resultatVisningsnavn } from '@typer/vilkår';
import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { AnnenVurderingRadEndre } from './AnnenVurderingRadEndre';
import { annenVurderingFeilmeldingId } from './AnnenVurderingTabell';
import Styles from './AnnenVurderingTabellRad.module.css';
import { useAnnenVurderingSkjema } from './useAnnenVurderingSkjema';

interface Props {
    person: IGrunnlagPerson;
    annenVurderingConfig: IAnnenVurderingConfig;
    annenVurdering: IRestAnnenVurdering;
    visFeilmeldinger: boolean;
}

export function AnnenVurderingTabellRad({ person, annenVurderingConfig, visFeilmeldinger, annenVurdering }: Props) {
    const erLesevisning = useErLesevisning();

    const [erEkspandert, settErEkspandert] = useState(
        erLesevisning || annenVurdering.resultat === Resultat.IKKE_VURDERT
    );

    const { form, onSubmit } = useAnnenVurderingSkjema({
        annenVurdering,
        visFeilmeldinger,
        lukkSkjema: () => settErEkspandert(false),
    });

    const {
        handleSubmit,
        reset,
        trigger,
        formState: { isDirty },
    } = form;

    useEffect(() => {
        if (visFeilmeldinger && erEkspandert) {
            trigger();
        }
    }, [visFeilmeldinger, erEkspandert, trigger]);

    const toggleForm = (visAlert: boolean) => {
        if (erEkspandert && visAlert && isDirty) {
            alert('Vurderingen har endringer som ikke er lagret!');
        } else {
            settErEkspandert(!erEkspandert);
            reset();
        }
    };

    const erVurdert = annenVurdering.resultat !== Resultat.IKKE_VURDERT;

    return (
        <Table.ExpandableRow
            open={erEkspandert}
            togglePlacement={'right'}
            onOpenChange={() => toggleForm(true)}
            id={annenVurderingFeilmeldingId(annenVurdering)}
            content={
                erEkspandert ? (
                    <FormProvider {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <AnnenVurderingRadEndre
                                person={person}
                                annenVurderingConfig={annenVurderingConfig}
                                onAvbryt={() => toggleForm(false)}
                            />
                        </form>
                    </FormProvider>
                ) : null
            }
        >
            <Table.DataCell>
                <HStack justify={'start'} align={'center'} gap={'space-6'} wrap={false}>
                    <VilkårResultatIkon resultat={annenVurdering.resultat} />
                    <BodyShort>{resultatVisningsnavn[annenVurdering.resultat]}</BodyShort>
                </HStack>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort className={Styles.beskrivelse}>{annenVurdering.begrunnelse}</BodyShort>
            </Table.DataCell>
            <Table.DataCell>
                {erVurdert && (
                    <HStack justify={'start'} align={'center'} gap={'space-6'} wrap={false}>
                        <PersonIcon title={'Manuell vurdering'} className={Styles.ikon} />
                        <BodyShort>Vurdert i denne behandlingen</BodyShort>
                    </HStack>
                )}
            </Table.DataCell>
        </Table.ExpandableRow>
    );
}
