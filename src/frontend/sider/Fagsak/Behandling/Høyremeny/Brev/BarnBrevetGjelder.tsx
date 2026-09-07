import { Checkbox, CheckboxGroup, InlineMessage } from '@navikt/ds-react';
import { differenceInMilliseconds } from 'date-fns';
import { BehandlingSteg, hentStegNummer } from '../../../../../typer/behandling';
import type { IBarnMedOpplysninger } from '../../../../../typer/søknad';
import { isoStringTilDate } from '../../../../../utils/dato';
import { lagBarnLabel } from '../../../../../utils/formatter';
import styles from './BarnBrevetGjelder.module.css';

interface IProps {
    barnBrevetGjelder: IBarnMedOpplysninger[];
    onChange: (barn: IBarnMedOpplysninger[]) => void;
    behandlingsSteg?: BehandlingSteg;
    error?: string;
}

export const BarnBrevetGjelder = ({ barnBrevetGjelder, onChange, behandlingsSteg, error }: IProps) => {
    const skalViseVarselOmManglendeBarn =
        behandlingsSteg &&
        hentStegNummer(behandlingsSteg) <= hentStegNummer(BehandlingSteg.REGISTRERE_SØKNAD) &&
        barnBrevetGjelder.length === 0;

    const sorterteBarn = [...barnBrevetGjelder].sort((a: IBarnMedOpplysninger, b: IBarnMedOpplysninger) => {
        if (!a.fødselsdato || a.fødselsdato === '') {
            return 1;
        }

        if (!b.fødselsdato || b.fødselsdato === '') {
            return -1;
        }

        return !a.ident
            ? 1
            : differenceInMilliseconds(isoStringTilDate(b.fødselsdato), isoStringTilDate(a.fødselsdato));
    });

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
