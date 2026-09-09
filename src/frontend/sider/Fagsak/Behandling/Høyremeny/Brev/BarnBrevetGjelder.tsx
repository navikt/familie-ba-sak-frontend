import { Checkbox, CheckboxGroup, InlineMessage } from '@navikt/ds-react';
import { BehandlingSteg, hentStegNummer } from '../../../../../typer/behandling';
import type { IBarnMedOpplysninger } from '../../../../../typer/søknad';
import { lagBarnLabel, sorterBarnEtterFødselsdato } from '../../../../../utils/formatter';
import styles from './BarnBrevetGjelder.module.css';

interface IProps {
    barnBrevetGjelder: IBarnMedOpplysninger[];
    onChange: (barn: IBarnMedOpplysninger[]) => void;
    behandlingsSteg?: BehandlingSteg;
    readOnly?: boolean;
    error?: string;
}

export const BarnBrevetGjelder = ({
    barnBrevetGjelder,
    onChange,
    behandlingsSteg,
    readOnly = false,
    error,
}: IProps) => {
    const skalViseVarselOmManglendeBarn =
        behandlingsSteg &&
        hentStegNummer(behandlingsSteg) <= hentStegNummer(BehandlingSteg.REGISTRERE_SØKNAD) &&
        barnBrevetGjelder.length === 0;

    const sorterteBarn = sorterBarnEtterFødselsdato(barnBrevetGjelder);

    const oppdaterBarnMedNyMerketStatus = (barnaSomErMerket: string[]) => {
        onChange(
            barnBrevetGjelder.map((barnMedOpplysninger: IBarnMedOpplysninger) => ({
                ...barnMedOpplysninger,
                merket: barnaSomErMerket.includes(barnMedOpplysninger.ident),
            }))
        );
    };

    return (
        <CheckboxGroup
            legend={'Hvilke barn gjelder brevet?'}
            error={error}
            readOnly={readOnly}
            value={barnBrevetGjelder
                .filter((barn: IBarnMedOpplysninger) => barn.merket)
                .map((barn: IBarnMedOpplysninger) => barn.ident)}
            onChange={(barnaSomErMerket: string[]) => oppdaterBarnMedNyMerketStatus(barnaSomErMerket)}
        >
            {sorterteBarn.map((barn: IBarnMedOpplysninger, index: number) => {
                const barnLabel = lagBarnLabel(barn);
                return (
                    <Checkbox value={barn.ident} key={'barn-' + index} className={styles.checkbox}>
                        <p title={barnLabel} className={styles.labelTekst}>
                            {barnLabel}
                        </p>
                    </Checkbox>
                );
            })}
            {skalViseVarselOmManglendeBarn && (
                <InlineMessage status="warning" size={'small'}>
                    Du må trykke "Bekreft og fortsett" før du kan legge til barn.
                </InlineMessage>
            )}
        </CheckboxGroup>
    );
};
