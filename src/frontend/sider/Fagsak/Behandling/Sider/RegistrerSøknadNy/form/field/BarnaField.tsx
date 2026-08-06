import { useBruker } from '@hooks/useBruker';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import StatusIkon, { Status } from '@ikoner/StatusIkon';
import { useBarnaFieldArray } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/BarnaFieldArrayContext';
import { BarnCheckbox } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/field/BarnCheckbox';
import { FieldLabel } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/field/FieldLabel';
import {
    RegistrerSøknadFormField,
    type RegistrerSøknadFormValues,
} from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/useRegistrerSøknadForm';
import { erFagsakAvTypeEnsligMindreårig, erFagsakAvTypeInstitusjon, erFagsakAvTypeSkjermetBarn } from '@typer/fagsak';
import { adressebeskyttelsestyper, ForelderBarnRelasjonRolle } from '@typer/person';
import { useFormContext } from 'react-hook-form';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyShort, CheckboxGroup, HStack, InfoCard, VStack } from '@navikt/ds-react';

export function BarnaField() {
    const fagsak = useFagsak();
    const bruker = useBruker();
    const erLesevisning = useErLesevisning();

    const {
        setValue,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useFormContext<RegistrerSøknadFormValues>();

    const { fields } = useBarnaFieldArray();

    const gjelderInstitusjon = erFagsakAvTypeInstitusjon(fagsak);
    const gjelderEnsligMindreårig = erFagsakAvTypeEnsligMindreårig(fagsak);
    const gjelderSkjermetBarn = erFagsakAvTypeSkjermetBarn(fagsak);

    const maskerteRelasjoner = bruker.forelderBarnRelasjonMaskert.filter(
        forelderBarnRelasjonMaskert => forelderBarnRelasjonMaskert.relasjonRolle === ForelderBarnRelasjonRolle.BARN
    );

    function onBarnChecked(checkedIds: string[]) {
        fields.forEach((barn, index) => {
            const merket = checkedIds.includes(barn.id);
            if (merket !== barn.merket) {
                setValue(`${RegistrerSøknadFormField.BARN}.${index}.merket`, merket as never, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                });
            }
        });
        clearErrors(RegistrerSøknadFormField.BARN);
    }

    const description =
        !erLesevisning && !gjelderInstitusjon && !gjelderEnsligMindreårig && !gjelderSkjermetBarn
            ? 'Velg hvilke barn det er søkt om'
            : 'Barn det er søkt om';

    return (
        <VStack marginBlock={'space-16'}>
            {maskerteRelasjoner.map((relasjon, index) => {
                const diskresjonskode = adressebeskyttelsestyper[relasjon.adressebeskyttelseGradering];
                return (
                    <HStack gap={'space-8'} margin={'space-8'} key={`${index}_${relasjon.relasjonRolle}`}>
                        <StatusIkon status={Status.FEIL} />
                        <BodyShort>{`Bruker har barn med diskresjonskode ${diskresjonskode ?? 'ukjent'}`}</BodyShort>
                    </HStack>
                );
            })}
            <CheckboxGroup
                id={RegistrerSøknadFormField.BARN}
                legend={<FieldLabel label={'Opplysninger om barn'} />}
                description={description}
                value={fields.filter(barn => barn.merket).map(barn => barn.id)}
                onChange={onBarnChecked}
                readOnly={erLesevisning || isSubmitting}
                error={errors[RegistrerSøknadFormField.BARN]?.root?.message}
            >
                {fields.map((barn, index) => (
                    <BarnCheckbox key={barn.id} index={index} barn={barn} />
                ))}
                {fields.length === 0 && maskerteRelasjoner.length === 0 && (
                    <VStack marginBlock={'space-0 space-20'}>
                        <InfoCard data-color={'info'}>
                            <InfoCard.Message icon={<InformationSquareIcon aria-hidden={true} />}>
                                Folkeregisteret har ikke registrerte barn på denne søkeren
                            </InfoCard.Message>
                        </InfoCard>
                    </VStack>
                )}
            </CheckboxGroup>
        </VStack>
    );
}
