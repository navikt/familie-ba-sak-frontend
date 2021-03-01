import React, { useState } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';

import {
    FamilieKnapp,
    FamilieRadioGruppe,
    FamilieTextareaControlled,
} from '@navikt/familie-form-elements';
import { FeltState, Valideringsstatus } from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { validerAnnenVurdering } from '../../../../context/Vilkårsvurdering/validering';
import {
    useVilkårsvurdering,
    VilkårSubmit,
} from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { IFagsak } from '../../../../typer/fagsak';
import { IGrunnlagPerson } from '../../../../typer/person';
import {
    IAnnenVurdering,
    IAnnenVurderingConfig,
    IPersonResultat,
    Resultat,
    resultater,
} from '../../../../typer/vilkår';
import {
    annenVurderingBegrunnelseFeilmeldingId,
    annenVurderingResultatFeilmeldingId,
} from './AnnenVurderingTabell';

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

const Container = styled.div`
    max-width: 30rem;
    border-left: 1px solid ${navFarger.navBlaLighten20};
    padding-left: 2rem;
    .skjemagruppe.radiogruppe {
        margin-bottom: 0 !important;
    }
    .begrunnelse-textarea {
        min-height: 8rem !important;
    }
`;

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
    const {
        vilkårsvurdering,
        putAnnenVurdering,
        vilkårSubmit,
        settVilkårSubmit,
    } = useVilkårsvurdering();

    const { erLesevisning } = useBehandling();
    const { settFagsak } = useFagsakRessurser();
    const leseVisning = erLesevisning();

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

    const håndterEndringPåVilkårsvurdering = (promise: Promise<Ressurs<IFagsak>>) => {
        promise
            .then((oppdatertFagsak: Ressurs<IFagsak>) => {
                settVilkårSubmit(VilkårSubmit.NONE);
                if (oppdatertFagsak.status === RessursStatus.SUKSESS) {
                    settVisFeilmeldingerForEttVilkår(false);
                    settFagsak(oppdatertFagsak);
                    settEkspandertAnnenVurdering(false);
                } else if (
                    oppdatertFagsak.status === RessursStatus.FEILET ||
                    oppdatertFagsak.status === RessursStatus.FUNKSJONELL_FEIL ||
                    oppdatertFagsak.status === RessursStatus.IKKE_TILGANG
                ) {
                    settVisFeilmeldingerForEttVilkår(true);
                    settRedigerbartAnnenVurdering({
                        ...redigerbartAnnenVurdering,
                        valideringsstatus: Valideringsstatus.FEIL,
                        feilmelding: oppdatertFagsak.frontendFeilmelding,
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
        <SkjemaGruppe
            feil={redigerbartAnnenVurdering.feilmelding || undefined}
            utenFeilPropagering={true}
        >
            <Container>
                <FamilieRadioGruppe
                    erLesevisning={leseVisning}
                    verdi={resultater[redigerbartAnnenVurdering.verdi.resultat.verdi]}
                    legend={
                        annenVurderingConfig.spørsmål
                            ? annenVurderingConfig.spørsmål(person.type.toLowerCase())
                            : annenVurderingConfig.beskrivelse
                    }
                    feil={
                        redigerbartAnnenVurdering.verdi.resultat.valideringsstatus ===
                            Valideringsstatus.FEIL && skalViseFeilmeldinger()
                            ? redigerbartAnnenVurdering.verdi.resultat.feilmelding
                            : ''
                    }
                    feilmeldingId={annenVurderingResultatFeilmeldingId(
                        redigerbartAnnenVurdering.verdi
                    )}
                >
                    <Radio
                        label={'Ja'}
                        name={`${redigerbartAnnenVurdering.verdi.type}_${redigerbartAnnenVurdering.verdi.id}`}
                        checked={
                            redigerbartAnnenVurdering.verdi.resultat.verdi === Resultat.OPPFYLT
                        }
                        onChange={() => radioOnChange(Resultat.OPPFYLT)}
                    />
                    <Radio
                        label={'Nei'}
                        name={`${redigerbartAnnenVurdering.verdi.type}_${redigerbartAnnenVurdering.verdi.id}`}
                        checked={
                            redigerbartAnnenVurdering.verdi.resultat.verdi === Resultat.IKKE_OPPFYLT
                        }
                        onChange={() => radioOnChange(Resultat.IKKE_OPPFYLT)}
                    />
                </FamilieRadioGruppe>

                <FamilieTextareaControlled
                    tekstLesevisning={''}
                    erLesevisning={leseVisning}
                    defaultValue={redigerbartAnnenVurdering.verdi.begrunnelse.verdi}
                    id={annenVurderingBegrunnelseFeilmeldingId(redigerbartAnnenVurdering.verdi)}
                    label={'Begrunnelse (valgfri)'}
                    textareaClass={'begrunnelse-textarea'}
                    placeholder={'Begrunn hvorfor det er gjort endringer på vilkåret.'}
                    value={redigerbartAnnenVurdering.verdi.begrunnelse.verdi}
                    feil={
                        redigerbartAnnenVurdering.verdi.begrunnelse.valideringsstatus ===
                            Valideringsstatus.FEIL && skalViseFeilmeldinger()
                            ? redigerbartAnnenVurdering.verdi.begrunnelse.feilmelding
                            : ''
                    }
                    onBlur={(event: React.FocusEvent<HTMLTextAreaElement>) => {
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

                <Knapperad>
                    <div>
                        <FamilieKnapp
                            erLesevisning={leseVisning}
                            onClick={onClickFerdig}
                            mini={true}
                            type={'standard'}
                            spinner={vilkårSubmit === VilkårSubmit.PUT}
                            disabled={vilkårSubmit === VilkårSubmit.PUT}
                        >
                            Ferdig
                        </FamilieKnapp>
                        <FamilieKnapp
                            style={{ marginLeft: '1rem' }}
                            erLesevisning={leseVisning}
                            onClick={() => toggleForm(false)}
                            mini={true}
                            type={'flat'}
                        >
                            Avbryt
                        </FamilieKnapp>
                    </div>
                </Knapperad>
            </Container>
        </SkjemaGruppe>
    );
};

export default AnnenVurderingRadEndre;
