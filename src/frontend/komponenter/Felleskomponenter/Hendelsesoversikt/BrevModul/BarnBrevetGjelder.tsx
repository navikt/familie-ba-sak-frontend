import React from 'react';

import styled from 'styled-components';

import { CheckboxGruppe } from 'nav-frontend-skjema';

import { Alert } from '@navikt/ds-react';
import { FamilieCheckbox } from '@navikt/familie-form-elements';
import type { Felt } from '@navikt/familie-skjema';

import { BehandlingSteg, hentStegNummer } from '../../../../typer/behandling';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { lagBarnLabel } from '../../../../utils/formatter';
import { kalenderDiff, kalenderDatoTilDate, kalenderDato } from '../../../../utils/kalender';

const StyledFamilieCheckbox = styled(FamilieCheckbox)`
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
    alternativer: IBarnMedOpplysninger[];
}

const BarnBrevetGjelder = (props: IProps) => {
    const {
        barnBrevetGjelderFelt,
        behandlingsSteg,
        visFeilmeldinger,
        settVisFeilmeldinger,
        alternativer,
    } = props;

    const skalViseVarselOmManglendeBarn =
        behandlingsSteg &&
        hentStegNummer(behandlingsSteg) <= hentStegNummer(BehandlingSteg.REGISTRERE_SØKNAD) &&
        alternativer.length === 0;

    alternativer.sort((a: IBarnMedOpplysninger, b: IBarnMedOpplysninger) => {
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
    });

    return (
        <CheckboxGruppe
            {...barnBrevetGjelderFelt.hentNavBaseSkjemaProps(visFeilmeldinger)}
            legend={'Hvilke barn gjelder brevet?'}
        >
            {alternativer.map((barn: IBarnMedOpplysninger, index: number) => {
                const barnLabel = lagBarnLabel(barn);
                return (
                    <StyledFamilieCheckbox
                        erLesevisning={false}
                        label={
                            <LabelContent>
                                <LabelTekst title={barnLabel}>{barnLabel}</LabelTekst>
                            </LabelContent>
                        }
                        checked={barn.merket}
                        key={'barn-' + index}
                        onChange={event => {
                            const barnSkalMerkes = event.target.checked;
                            if (barnSkalMerkes) {
                                barnBrevetGjelderFelt.validerOgSettFelt([
                                    ...barnBrevetGjelderFelt.verdi,
                                    { ...barn, merket: true },
                                ]);
                            } else {
                                barnBrevetGjelderFelt.validerOgSettFelt(
                                    barnBrevetGjelderFelt.verdi.filter(
                                        it => it.ident !== barn.ident
                                    )
                                );
                            }
                            settVisFeilmeldinger(false);
                        }}
                    />
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
        </CheckboxGruppe>
    );
};

export default BarnBrevetGjelder;
