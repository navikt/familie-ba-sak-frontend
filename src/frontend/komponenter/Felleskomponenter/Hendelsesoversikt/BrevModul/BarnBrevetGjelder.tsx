import React from 'react';

import styled from 'styled-components';

import { Alert, Checkbox, CheckboxGroup } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import { BehandlingSteg, hentStegNummer } from '../../../../typer/behandling';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { lagBarnLabel } from '../../../../utils/formatter';
import { kalenderDiff, kalenderDatoTilDate, kalenderDato } from '../../../../utils/kalender';

const StyledCheckbox = styled(Checkbox)`
    margin-left: 1rem;

    > label {
        width: 100%;
    }
`;

const LabelContent = styled.div`
    display: flex;
    white-space: nowrap;
`;

const LabelTekst = styled.p`
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
`;

interface IProps {
    barnBrevetGjelderFelt: Felt<IBarnMedOpplysninger[]>;
    behandlingsSteg?: BehandlingSteg;
    visFeilmeldinger: boolean;
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void;
}

const BarnBrevetGjelder = (props: IProps) => {
    const { barnBrevetGjelderFelt, behandlingsSteg, visFeilmeldinger, settVisFeilmeldinger } =
        props;

    const skalViseVarselOmManglendeBarn =
        behandlingsSteg &&
        hentStegNummer(behandlingsSteg) <= hentStegNummer(BehandlingSteg.REGISTRERE_SØKNAD) &&
        barnBrevetGjelderFelt.verdi.length === 0;

    const sorterteBarn = barnBrevetGjelderFelt.verdi.sort(
        (a: IBarnMedOpplysninger, b: IBarnMedOpplysninger) => {
            if (!a.fødselsdato || a.fødselsdato === '') {
                return 1;
            }

            if (!b.fødselsdato || b.fødselsdato === '') {
                return -1;
            }

            return !a.ident
                ? 1
                : kalenderDiff(
                      kalenderDatoTilDate(kalenderDato(b.fødselsdato)),
                      kalenderDatoTilDate(kalenderDato(a.fødselsdato))
                  );
        }
    );

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
                    <StyledCheckbox value={barn.ident} key={'barn-' + index}>
                        <LabelContent>
                            <LabelTekst title={barnLabel}>{barnLabel}</LabelTekst>
                        </LabelContent>
                    </StyledCheckbox>
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

export default BarnBrevetGjelder;
