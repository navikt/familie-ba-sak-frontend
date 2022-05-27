import React from 'react';

import styled from 'styled-components';

import { CheckboxGruppe } from 'nav-frontend-skjema';

import { FamilieCheckbox } from '@navikt/familie-form-elements';
import type { Felt } from '@navikt/familie-skjema';

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
    visFeilmeldinger: boolean;
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void;
    alternativer: IBarnMedOpplysninger[];
}

const BarnBrevetGjelder = (props: IProps) => {
    const { barnBrevetGjelderFelt, visFeilmeldinger, settVisFeilmeldinger, alternativer } = props;

    const sorterteBarn = alternativer.sort((a: IBarnMedOpplysninger, b: IBarnMedOpplysninger) => {
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
            {sorterteBarn.map((barn: IBarnMedOpplysninger) => {
                const barnLabel = lagBarnLabel(barn);
                return (
                    <StyledFamilieCheckbox
                        erLesevisning={false}
                        label={
                            <LabelContent>
                                <LabelTekst title={barnLabel}>{barnLabel}</LabelTekst>
                            </LabelContent>
                        }
                        onChange={event => {
                            console.log({ barn, checked: event.target.checked });
                            const nyVerdi = event.target.checked;
                            if (nyVerdi) {
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
                            /*barnBrevetGjelderFelt.validerOgSettFelt(
                                barnBrevetGjelderFelt.verdi.map(
                                    (barnBrevetGjelder: IBarnMedOpplysninger) =>
                                        barnBrevetGjelder.ident === barn.ident
                                            ? {
                                                  ...barnBrevetGjelder,
                                                  merket: !barnBrevetGjelder.merket,
                                              }
                                            : barnBrevetGjelder
                                )
                            );*/
                            settVisFeilmeldinger(false);
                        }}
                    />
                );
            })}
        </CheckboxGruppe>
    );
};

export default BarnBrevetGjelder;
