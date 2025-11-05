import * as React from 'react';

import classNames from 'classnames';

import { BodyShort, Button, Checkbox, HStack } from '@navikt/ds-react';

import styles from './BarnMedOpplysninger.module.css';
import { useSøknadContext } from './SøknadContext';
import Slett from '../../../../../ikoner/Slett';
import type { IBarnMedOpplysninger } from '../../../../../typer/søknad';
import { formaterIdent, hentAlderSomString } from '../../../../../utils/formatter';
import { useBehandlingContext } from '../../context/BehandlingContext';

interface IProps {
    barn: IBarnMedOpplysninger;
}

export const BarnMedOpplysninger: React.FunctionComponent<IProps> = ({ barn }) => {
    const { skjema, barnMedLøpendeUtbetaling } = useSøknadContext();
    const { vurderErLesevisning, gjelderInstitusjon, gjelderEnsligMindreårig, gjelderSkjermetBarn } =
        useBehandlingContext();
    const erLesevisning = vurderErLesevisning();
    const barnetHarLøpendeUtbetaling = barnMedLøpendeUtbetaling.has(barn.ident);

    const navnOgIdentTekst = `${barn.navn ?? 'Navn ukjent'} (${hentAlderSomString(
        barn.fødselsdato
    )}) | ${formaterIdent(barn.ident)} ${barnetHarLøpendeUtbetaling ? '(løpende)' : ''}`;

    return (
        <HStack gap={'space-16'}>
            {erLesevisning || gjelderInstitusjon || gjelderEnsligMindreårig || gjelderSkjermetBarn ? (
                barn.merket ? (
                    <BodyShort
                        className={classNames('skjemaelement', 'lese-felt')}
                        children={
                            <HStack className={styles.labelContent}>
                                <p title={navnOgIdentTekst}>{navnOgIdentTekst}</p>
                            </HStack>
                        }
                    />
                ) : null
            ) : (
                <Checkbox className={styles.checkbox} value={barn.ident}>
                    <HStack className={styles.labelContent}>
                        <p title={navnOgIdentTekst}>{navnOgIdentTekst}</p>
                    </HStack>
                </Checkbox>
            )}
            {barn.manueltRegistrert && !erLesevisning && (
                <Button
                    variant={'tertiary'}
                    id={`fjern__${barn.ident}`}
                    size={'small'}
                    onClick={() => {
                        skjema.felter.barnaMedOpplysninger.validerOgSettFelt([
                            ...skjema.felter.barnaMedOpplysninger.verdi.filter(
                                barnMedOpplysninger =>
                                    barnMedOpplysninger.ident !== barn.ident ||
                                    barnMedOpplysninger.navn !== barn.navn ||
                                    barnMedOpplysninger.fødselsdato !== barn.fødselsdato
                            ),
                        ]);
                    }}
                    icon={<Slett />}
                >
                    {'Fjern barn'}
                </Button>
            )}
        </HStack>
    );
};
