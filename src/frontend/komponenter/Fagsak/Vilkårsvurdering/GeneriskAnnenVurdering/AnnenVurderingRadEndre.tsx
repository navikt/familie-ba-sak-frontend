import React, { useState } from 'react';

import styled from 'styled-components';

import { Button, Fieldset, Radio, RadioGroup, Textarea } from '@navikt/ds-react';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { FeltState } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import {
    annenVurderingBegrunnelseFeilmeldingId,
    annenVurderingResultatFeilmeldingId,
} from './AnnenVurderingTabell';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { validerAnnenVurdering } from '../../../../context/Vilkårsvurdering/validering';
import {
    useVilkårsvurdering,
    VilkårSubmit,
} from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IGrunnlagPerson } from '../../../../typer/person';
import type {
    IAnnenVurdering,
    IAnnenVurderingConfig,
    IPersonResultat,
} from '../../../../typer/vilkår';
import { Resultat, resultater } from '../../../../typer/vilkår';
import { StyledVStack } from '../GeneriskVilkår/VilkårTabellRadEndre';

interface IProps {
    person: IGrunnlagPerson;
    annenVurderingConfig: IAnnenVurderingConfig;
    annenVurdering: FeltState<IAnnenVurdering>;
    visFeilmeldinger: boolean;
    toggleForm: (visAlert: boolean) => void;
    redigerbartAnnenVurdering: FeltState<IAnnenVurdering>;
    settRedigerbartAnnenVurdering: (redigerbartAnnenVurdering: FeltState<IAnnenVurdering>) => void;
    settEkspandertAnnenVurdering: (ekspandertAnnenVurdering: boolean) => void;
}

const Knapperad = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
`;

const AnnenVurderingRadEndre: React.FC<IProps> = ({
    person,
    annenVurderingConfig,
    visFeilmeldinger,
    toggleForm,
    redigerbartAnnenVurdering,
    settRedigerbartAnnenVurdering,
    settEkspandertAnnenVurdering,
}) => {
    const { vilkårsvurdering, putAnnenVurdering, vilkårSubmit, settVilkårSubmit } =
        useVilkårsvurdering();

    const { vurderErLesevisning, settÅpenBehandling } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    const [visFeilmeldingerForEttVilkår, settVisFeilmeldingerForEttVilkår] = useState(false);

    const validerOgSettRedigerbartAnnenVurdering = (
        endretAnnenVurdering: FeltState<IAnnenVurdering>
    ) => {
        settRedigerbartAnnenVurdering(validerAnnenVurdering(endretAnnenVurdering));
    };

    const radioOnChange = (resultat: Resultat) => {
        validerOgSettRedigerbartAnnenVurdering({
            ...redigerbartAnnenVurdering,
            verdi: {
                ...redigerbartAnnenVurdering.verdi,
                resultat: {
                    ...redigerbartAnnenVurdering.verdi.resultat,
                    verdi: resultat,
                },
            },
        });
    };

    const skalViseFeilmeldinger = () => {
        return visFeilmeldinger || visFeilmeldingerForEttVilkår;
    };

    const onClickFerdig = () => {
        const validert = redigerbartAnnenVurdering.valider(redigerbartAnnenVurdering);

        const vilkårsvurderingForPerson = vilkårsvurdering.find(
            (personResultat: IPersonResultat) => personResultat.personIdent === person.personIdent
        );

        lagreResultat(validert, vilkårsvurderingForPerson);
    };

    const lagreResultat = (
        validert: FeltState<IAnnenVurdering>,
        vilkårsvurderingForPerson: IPersonResultat | undefined
    ) => {
        if (vilkårsvurderingForPerson && validert.valideringsstatus === Valideringsstatus.OK) {
            const promise = putAnnenVurdering(redigerbartAnnenVurdering);
            håndterEndringPåVilkårsvurdering(promise);
        } else {
            settRedigerbartAnnenVurdering(validert);
            settVisFeilmeldingerForEttVilkår(true);
        }
    };

    const håndterEndringPåVilkårsvurdering = (promise: Promise<Ressurs<IBehandling>>) => {
        promise
            .then((oppdatertBehandling: Ressurs<IBehandling>) => {
                settVilkårSubmit(VilkårSubmit.NONE);
                if (oppdatertBehandling.status === RessursStatus.SUKSESS) {
                    settVisFeilmeldingerForEttVilkår(false);
                    settÅpenBehandling(oppdatertBehandling);
                    settEkspandertAnnenVurdering(false);
                } else if (
                    oppdatertBehandling.status === RessursStatus.FEILET ||
                    oppdatertBehandling.status === RessursStatus.FUNKSJONELL_FEIL ||
                    oppdatertBehandling.status === RessursStatus.IKKE_TILGANG
                ) {
                    settVisFeilmeldingerForEttVilkår(true);
                    settRedigerbartAnnenVurdering({
                        ...redigerbartAnnenVurdering,
                        valideringsstatus: Valideringsstatus.FEIL,
                        feilmelding: oppdatertBehandling.frontendFeilmelding,
                    });
                } else {
                    settVisFeilmeldingerForEttVilkår(true);
                    settRedigerbartAnnenVurdering({
                        ...redigerbartAnnenVurdering,
                        valideringsstatus: Valideringsstatus.FEIL,
                        feilmelding:
                            'En ukjent feil har oppstått, vi har ikke klart å lagre endringen.',
                    });
                }
            })
            .catch(() => {
                settVilkårSubmit(VilkårSubmit.NONE);
                settRedigerbartAnnenVurdering({
                    ...redigerbartAnnenVurdering,
                    valideringsstatus: Valideringsstatus.FEIL,
                    feilmelding:
                        'En ukjent feil har oppstått, vi har ikke klart å lagre endringen.',
                });
                settVisFeilmeldingerForEttVilkår(true);
            });
    };

    return (
        <Fieldset
            error={redigerbartAnnenVurdering.feilmelding || undefined}
            errorPropagation={false}
            legend={'Skjema for å gjøre vurderingen'}
            hideLegend
        >
            <StyledVStack
                $lesevisning={erLesevisning}
                $vilkårResultat={redigerbartAnnenVurdering.verdi.resultat.verdi}
            >
                <RadioGroup
                    readOnly={erLesevisning}
                    value={resultater[redigerbartAnnenVurdering.verdi.resultat.verdi]}
                    legend={
                        annenVurderingConfig.spørsmål
                            ? annenVurderingConfig.spørsmål(person.type.toLowerCase())
                            : annenVurderingConfig.beskrivelse
                    }
                    error={
                        redigerbartAnnenVurdering.verdi.resultat.valideringsstatus ===
                            Valideringsstatus.FEIL && skalViseFeilmeldinger()
                            ? redigerbartAnnenVurdering.verdi.resultat.feilmelding
                            : ''
                    }
                    errorId={annenVurderingResultatFeilmeldingId(redigerbartAnnenVurdering.verdi)}
                >
                    <Radio
                        value={'Ja'}
                        name={`${redigerbartAnnenVurdering.verdi.type}_${redigerbartAnnenVurdering.verdi.id}`}
                        checked={
                            redigerbartAnnenVurdering.verdi.resultat.verdi === Resultat.OPPFYLT
                        }
                        onChange={() => radioOnChange(Resultat.OPPFYLT)}
                    >
                        {'Ja'}
                    </Radio>
                    <Radio
                        value={'Nei'}
                        name={`${redigerbartAnnenVurdering.verdi.type}_${redigerbartAnnenVurdering.verdi.id}`}
                        checked={
                            redigerbartAnnenVurdering.verdi.resultat.verdi === Resultat.IKKE_OPPFYLT
                        }
                        onChange={() => radioOnChange(Resultat.IKKE_OPPFYLT)}
                    >
                        {'Nei'}
                    </Radio>
                </RadioGroup>

                <Textarea
                    readOnly={erLesevisning}
                    value={redigerbartAnnenVurdering.verdi.begrunnelse.verdi}
                    id={annenVurderingBegrunnelseFeilmeldingId(redigerbartAnnenVurdering.verdi)}
                    label={'Begrunnelse (valgfri)'}
                    className={'begrunnelse-textarea'}
                    placeholder={'Begrunn hvorfor det er gjort endringer på annen vurdering'}
                    error={
                        redigerbartAnnenVurdering.verdi.begrunnelse.valideringsstatus ===
                            Valideringsstatus.FEIL && skalViseFeilmeldinger()
                            ? redigerbartAnnenVurdering.verdi.begrunnelse.feilmelding
                            : ''
                    }
                    onChange={(event: React.FocusEvent<HTMLTextAreaElement>) => {
                        validerOgSettRedigerbartAnnenVurdering({
                            ...redigerbartAnnenVurdering,
                            verdi: {
                                ...redigerbartAnnenVurdering.verdi,
                                begrunnelse: {
                                    ...redigerbartAnnenVurdering.verdi.begrunnelse,
                                    verdi: event?.target.value,
                                },
                            },
                        });
                    }}
                />

                {!erLesevisning && (
                    <Knapperad>
                        <div>
                            <Button
                                onClick={onClickFerdig}
                                size="medium"
                                variant="secondary"
                                loading={vilkårSubmit === VilkårSubmit.PUT}
                                disabled={vilkårSubmit === VilkårSubmit.PUT}
                            >
                                Ferdig
                            </Button>
                            <Button
                                style={{ marginLeft: '1rem' }}
                                onClick={() => toggleForm(false)}
                                size="medium"
                                variant="tertiary"
                            >
                                Avbryt
                            </Button>
                        </div>
                    </Knapperad>
                )}
            </StyledVStack>
        </Fieldset>
    );
};

export default AnnenVurderingRadEndre;
