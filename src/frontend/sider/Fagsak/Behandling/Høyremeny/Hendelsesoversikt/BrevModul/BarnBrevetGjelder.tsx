import React from 'react';

import { differenceInMilliseconds } from 'date-fns';

import { Alert, Checkbox, CheckboxGroup } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import styles from './BarnBrevetGjelder.module.css';
import { BehandlingSteg, hentStegNummer } from '../../../../../../typer/behandling';
import type { IBarnMedOpplysninger } from '../../../../../../typer/søknad';
import { isoStringTilDate } from '../../../../../../utils/dato';
import { lagBarnLabel } from '../../../../../../utils/formatter';

interface IProps {
    barnBrevetGjelderFelt: Felt<IBarnMedOpplysninger[]>;
    behandlingsSteg?: BehandlingSteg;
    visFeilmeldinger: boolean;
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void;
}

export const BarnBrevetGjelder = (props: IProps) => {
    const { barnBrevetGjelderFelt, behandlingsSteg, visFeilmeldinger, settVisFeilmeldinger } = props;

    const skalViseVarselOmManglendeBarn =
        behandlingsSteg &&
        hentStegNummer(behandlingsSteg) <= hentStegNummer(BehandlingSteg.REGISTRERE_SØKNAD) &&
        barnBrevetGjelderFelt.verdi.length === 0;

    const sorterteBarn = barnBrevetGjelderFelt.verdi.sort((a: IBarnMedOpplysninger, b: IBarnMedOpplysninger) => {
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
        barnBrevetGjelderFelt.validerOgSettFelt(
            barnBrevetGjelderFelt.verdi.map((barnMedOpplysninger: IBarnMedOpplysninger) => ({
                ...barnMedOpplysninger,
                merket: barnaSomErMerket.includes(barnMedOpplysninger.ident),
            }))
        );
    };

    return (
        <CheckboxGroup
            {...barnBrevetGjelderFelt.hentNavBaseSkjemaProps(visFeilmeldinger)}
            legend={'Hvilke barn gjelder brevet?'}
            value={barnBrevetGjelderFelt.verdi
                .filter((barn: IBarnMedOpplysninger) => barn.merket)
                .map((barn: IBarnMedOpplysninger) => barn.ident)}
            onChange={(barnaSomErMerket: string[]) => {
                oppdaterBarnMedNyMerketStatus(barnaSomErMerket);
                settVisFeilmeldinger(false);
            }}
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
                <Alert
                    variant="warning"
                    children={'Du må trykke "Bekreft og fortsett" før du kan legge til barn.'}
                    size={'small'}
                    inline
                />
            )}
        </CheckboxGroup>
    );
};
