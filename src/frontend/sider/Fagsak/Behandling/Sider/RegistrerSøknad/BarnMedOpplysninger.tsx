import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { erFagsakAvTypeEnsligMindreårig, erFagsakAvTypeInstitusjon, erFagsakAvTypeSkjermetBarn } from '@typer/fagsak';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { formaterIdent, hentAlderSomString } from '@utils/formatter';
import classNames from 'classnames';

import { BodyShort, Button, Checkbox, HStack } from '@navikt/ds-react';

import styles from './BarnMedOpplysninger.module.css';
import { useSøknadContext } from './SøknadContext';
import Slett from '../../../../../ikoner/Slett';

interface IProps {
    barn: IBarnMedOpplysninger;
}

export const BarnMedOpplysninger = ({ barn }: IProps) => {
    const { skjema, barnMedLøpendeUtbetaling } = useSøknadContext();

    const fagsak = useFagsak();

    const gjelderInstitusjon = erFagsakAvTypeInstitusjon(fagsak);
    const gjelderEnsligMindreårig = erFagsakAvTypeEnsligMindreårig(fagsak);
    const gjelderSkjermetBarn = erFagsakAvTypeSkjermetBarn(fagsak);

    const erLesevisning = useErLesevisning();

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
