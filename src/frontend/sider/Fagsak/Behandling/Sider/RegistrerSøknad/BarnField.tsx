import * as React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Alert, BodyShort, CheckboxGroup, Heading, HStack, Label, VStack } from '@navikt/ds-react';

import { BarnCheckbox } from './BarnCheckbox';
import { useBarn } from './useBarn';
import { Fields, type FormValues } from './useRegistrerSøknadForm';
import StatusIkon, { Status } from '../../../../../ikoner/StatusIkon';
import {
    sjekkGjelderEnsligMindreårig,
    sjekkGjelderInstitusjon,
    sjekkGjelderSkjermetBarn,
} from '../../../../../typer/fagsak';
import { adressebeskyttelsestyper, ForelderBarnRelasjonRolle } from '../../../../../typer/person';
import { useBrukerContext } from '../../../BrukerContext';
import { useFagsakContext } from '../../../FagsakContext';
import { useBehandlingContext } from '../../context/BehandlingContext';

function Legend() {
    const { fagsak } = useFagsakContext();
    const { vurderErLesevisning } = useBehandlingContext();

    const lesevisning = vurderErLesevisning();

    const gjelderInstitusjon = sjekkGjelderInstitusjon(fagsak);
    const gjelderEnsligMindreårig = sjekkGjelderEnsligMindreårig(fagsak);
    const gjelderSkjermetBarn = sjekkGjelderSkjermetBarn(fagsak);

    if (!lesevisning && !gjelderInstitusjon && !gjelderEnsligMindreårig && !gjelderSkjermetBarn) {
        return <Label>Velg hvilke barn det er søkt om</Label>;
    }

    return <Label>Barn det er søkt om</Label>;
}

export function BarnField() {
    const { bruker } = useBrukerContext();
    const { vurderErLesevisning } = useBehandlingContext();
    const { control } = useFormContext<FormValues>();

    const { field, fieldState, formState } = useController({
        name: Fields.BARN,
        control,
        rules: { required: 'Du må velge minst ett barn.' },
    });

    const barn = useBarn();

    const erLesevisning = vurderErLesevisning();

    const maskerteRelasjoner = bruker.forelderBarnRelasjonMaskert.filter(
        relasjon => relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN
    );

    return (
        <VStack gap={'space-8'}>
            <Heading size={'medium'} level={'2'}>
                Opplysninger om barn
            </Heading>
            {maskerteRelasjoner.map((relasjon, index) => {
                const diskresjonskode = adressebeskyttelsestyper[relasjon.adressebeskyttelseGradering] ?? 'ukjent';
                return (
                    <HStack gap={'2'} margin={'2'} key={`${index}_${relasjon.relasjonRolle}`}>
                        <StatusIkon status={Status.FEIL} />
                        <BodyShort>{`Bruker har barn med diskresjonskode ${diskresjonskode}`}</BodyShort>
                    </HStack>
                );
            })}
            <CheckboxGroup
                id={Fields.BARN}
                ref={field.ref}
                name={field.name}
                legend={<Legend />}
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                error={fieldState.error?.message}
                readOnly={formState.isSubmitting || erLesevisning}
            >
                {barn.map(barn => (
                    <BarnCheckbox barn={barn} />
                ))}
            </CheckboxGroup>
            {barn.length === 0 && maskerteRelasjoner.length === 0 && (
                <Alert variant={'info'}>Folkeregisteret har ikke registrerte barn på denne søkeren</Alert>
            )}
        </VStack>
    );
}
