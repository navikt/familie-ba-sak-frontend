import type { ReactNode } from 'react';
import React, { useState } from 'react';

import styled from 'styled-components';

import { TrashIcon } from '@navikt/aksel-icons';
import { Button, Fieldset, Label, Radio, RadioGroup, Select, Textarea, VStack } from '@navikt/ds-react';
import { ABorderDefault, ABorderWarning, ASurfaceAction } from '@navikt/ds-tokens/dist/tokens';
import type { FeltState } from '@navikt/familie-skjema';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import AvslagSkjema from './AvslagSkjema';
import { UtdypendeVilkårsvurderingMultiselect } from './UtdypendeVilkårsvurderingMultiselect';
import VelgPeriode from './VelgPeriode';
import { vilkårBegrunnelseFeilmeldingId, vilkårFeilmeldingId, vilkårResultatFeilmeldingId } from './VilkårTabell';
import type { IBehandling } from '../../../../../../typer/behandling';
import { BehandlingÅrsak } from '../../../../../../typer/behandling';
import type { IGrunnlagPerson } from '../../../../../../typer/person';
import { PersonType } from '../../../../../../typer/person';
import type { IPersonResultat, IVilkårConfig, IVilkårResultat } from '../../../../../../typer/vilkår';
import { Regelverk, Resultat, ResultatBegrunnelse, VilkårType } from '../../../../../../typer/vilkår';
import { alleRegelverk } from '../../../../../../utils/vilkår';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import { validerVilkår } from '../validering';
import { useVilkårsvurderingContext, VilkårSubmit } from '../VilkårsvurderingContext';

interface IProps {
    person: IGrunnlagPerson;
    vilkårFraConfig: IVilkårConfig;
    vilkårResultat: FeltState<IVilkårResultat>;
    visFeilmeldinger: boolean;
    lesevisning: boolean;
    redigerbartVilkår: FeltState<IVilkårResultat>;
    toggleForm: (visAlert: boolean) => void;
    settRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
    settEkspandertVilkår: (ekspandertVilkår: boolean) => void;
    settFokusPåKnapp: () => void;
}

export const StyledVStack = styled(VStack)<{ $lesevisning: boolean; $vilkårResultat: Resultat }>`
    max-width: 30rem;
    border-left: 0.125rem solid
        ${props => {
            if (props.$lesevisning) {
                return ABorderDefault;
            }
            if (props.$vilkårResultat === Resultat.IKKE_VURDERT) {
                return ABorderWarning;
            }
            return ASurfaceAction;
        }};
    padding-left: 2rem;
    margin-left: -3rem;
`;

const Knapperad = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
`;

const VilkårTabellRadEndre: React.FC<IProps> = ({
    person,
    vilkårFraConfig,
    vilkårResultat,
    visFeilmeldinger,
    toggleForm,
    redigerbartVilkår,
    settRedigerbartVilkår,
    settEkspandertVilkår,
    settFokusPåKnapp,
    lesevisning,
}) => {
    const { vilkårsvurdering, putVilkår, deleteVilkår, vilkårSubmit, settVilkårSubmit } = useVilkårsvurderingContext();

    const { behandling, settÅpenBehandling, gjelderEnsligMindreårig, gjelderInstitusjon } = useBehandlingContext();
    const årsakErSøknad = behandling.årsak === BehandlingÅrsak.SØKNAD;

    const [visFeilmeldingerForEttVilkår, settVisFeilmeldingerForEttVilkår] = useState(false);

    const validerOgSettRedigerbartVilkår = (endretVilkår: FeltState<IVilkårResultat>) => {
        settRedigerbartVilkår(validerVilkår(endretVilkår, { person }));
    };

    const radioOnChange = (resultat: Resultat | ResultatBegrunnelse) => {
        validerOgSettRedigerbartVilkår({
            ...redigerbartVilkår,
            verdi: {
                ...redigerbartVilkår.verdi,
                resultat: {
                    ...redigerbartVilkår.verdi.resultat,
                    verdi: resultat === ResultatBegrunnelse.IKKE_AKTUELT ? Resultat.OPPFYLT : resultat,
                },
                resultatBegrunnelse: resultat === ResultatBegrunnelse.IKKE_AKTUELT ? resultat : null,
                erEksplisittAvslagPåSøknad: false,
                avslagBegrunnelser: {
                    ...redigerbartVilkår.verdi.avslagBegrunnelser,
                    verdi: [],
                },
            },
        });
    };
    const skalViseFeilmeldinger = () => {
        return visFeilmeldinger || visFeilmeldingerForEttVilkår;
    };

    const onClickVilkårFerdig = () => {
        const validertVilkår = redigerbartVilkår.valider(redigerbartVilkår, {
            person,
        });

        const vilkårsvurderingForPerson = vilkårsvurdering.find(
            (personResultat: IPersonResultat) => personResultat.personIdent === person.personIdent
        );

        lagreVilkår(validertVilkår, vilkårsvurderingForPerson);
        settFokusPåKnapp();
    };

    const lagreVilkår = (
        validertVilkår: FeltState<IVilkårResultat>,
        vilkårsvurderingForPerson: IPersonResultat | undefined
    ) => {
        if (vilkårsvurderingForPerson && validertVilkår.valideringsstatus === Valideringsstatus.OK) {
            const promise = putVilkår(vilkårsvurderingForPerson, redigerbartVilkår);
            håndterEndringPåVilkårsvurdering(promise);
        } else {
            settRedigerbartVilkår(validertVilkår);
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
                    settEkspandertVilkår(false);
                } else if (
                    oppdatertBehandling.status === RessursStatus.FEILET ||
                    oppdatertBehandling.status === RessursStatus.FUNKSJONELL_FEIL ||
                    oppdatertBehandling.status === RessursStatus.IKKE_TILGANG
                ) {
                    settVisFeilmeldingerForEttVilkår(true);
                    settRedigerbartVilkår({
                        ...redigerbartVilkår,
                        valideringsstatus: Valideringsstatus.FEIL,
                        feilmelding: oppdatertBehandling.frontendFeilmelding,
                    });
                } else {
                    settVisFeilmeldingerForEttVilkår(true);
                    settRedigerbartVilkår({
                        ...redigerbartVilkår,
                        valideringsstatus: Valideringsstatus.FEIL,
                        feilmelding: 'En ukjent feil har oppstått, vi har ikke klart å lagre endringen.',
                    });
                }
            })
            .catch(() => {
                settVilkårSubmit(VilkårSubmit.NONE);
                settRedigerbartVilkår({
                    ...redigerbartVilkår,
                    valideringsstatus: Valideringsstatus.FEIL,
                    feilmelding: 'En ukjent feil har oppstått, vi har ikke klart å lagre endringen.',
                });
                settVisFeilmeldingerForEttVilkår(true);
            });
    };

    const erBegrunnelsePåkrevd = (): boolean =>
        redigerbartVilkår.verdi.vilkårType === VilkårType.UTVIDET_BARNETRYGD ||
        (redigerbartVilkår.verdi.vurderesEtter === Regelverk.NASJONALE_REGLER &&
            redigerbartVilkår.verdi.utdypendeVilkårsvurderinger.verdi.length > 0) ||
        (redigerbartVilkår.verdi.vurderesEtter === Regelverk.EØS_FORORDNINGEN &&
            person.type === PersonType.SØKER &&
            redigerbartVilkår.verdi.vilkårType === VilkårType.BOSATT_I_RIKET);

    const visRegelverkValg = (): boolean =>
        !gjelderEnsligMindreårig &&
        !gjelderInstitusjon &&
        [VilkårType.BOR_MED_SØKER, VilkårType.BOSATT_I_RIKET, VilkårType.LOVLIG_OPPHOLD].includes(
            vilkårFraConfig.key as VilkårType
        );

    return (
        <Fieldset
            legend={'Endre vilkår'}
            hideLegend={true}
            error={redigerbartVilkår.feilmelding !== '' ? redigerbartVilkår.feilmelding : undefined}
            errorPropagation={false}
        >
            <StyledVStack $lesevisning={lesevisning} $vilkårResultat={vilkårResultat.verdi.resultat.verdi} gap="4">
                {visRegelverkValg() && (
                    <Select
                        readOnly={lesevisning}
                        value={
                            redigerbartVilkår.verdi.vurderesEtter ? redigerbartVilkår.verdi.vurderesEtter : undefined
                        }
                        label={'Vurderes etter'}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                            settRedigerbartVilkår({
                                ...redigerbartVilkår,
                                verdi: {
                                    ...redigerbartVilkår.verdi,
                                    vurderesEtter: event.target.value as Regelverk,
                                },
                            });
                        }}
                    >
                        {Object.entries(alleRegelverk).map(
                            ([regelverk, { tekst }]: [string, { tekst: string; symbol: ReactNode }]) => {
                                return (
                                    <option
                                        key={regelverk}
                                        aria-selected={vilkårResultat.verdi.vurderesEtter === regelverk}
                                        value={regelverk}
                                    >
                                        {tekst}
                                    </option>
                                );
                            }
                        )}
                    </Select>
                )}
                <RadioGroup
                    readOnly={lesevisning}
                    value={
                        redigerbartVilkår.verdi.resultatBegrunnelse
                            ? redigerbartVilkår.verdi.resultatBegrunnelse
                            : redigerbartVilkår.verdi.resultat.verdi
                    }
                    legend={
                        <Label>
                            {vilkårFraConfig.spørsmål ? vilkårFraConfig.spørsmål(person.type.toLowerCase()) : ''}
                        </Label>
                    }
                    error={
                        redigerbartVilkår.verdi.resultat.valideringsstatus === Valideringsstatus.FEIL &&
                        skalViseFeilmeldinger()
                            ? redigerbartVilkår.verdi.resultat.feilmelding
                            : ''
                    }
                    errorId={vilkårResultatFeilmeldingId(redigerbartVilkår.verdi)}
                    onChange={(val: Resultat | ResultatBegrunnelse) => radioOnChange(val)}
                >
                    <Radio
                        value={
                            redigerbartVilkår.verdi.vilkårType === VilkårType.GIFT_PARTNERSKAP
                                ? Resultat.IKKE_OPPFYLT
                                : Resultat.OPPFYLT
                        }
                        name={`${redigerbartVilkår.verdi.vilkårType}_${redigerbartVilkår.verdi.id}`}
                    >
                        Ja
                    </Radio>
                    <Radio
                        value={
                            redigerbartVilkår.verdi.vilkårType === VilkårType.GIFT_PARTNERSKAP
                                ? Resultat.OPPFYLT
                                : Resultat.IKKE_OPPFYLT
                        }
                        name={`${redigerbartVilkår.verdi.vilkårType}_${redigerbartVilkår.verdi.id}`}
                    >
                        Nei
                    </Radio>
                    {redigerbartVilkår.verdi.vilkårType === VilkårType.LOVLIG_OPPHOLD &&
                        redigerbartVilkår.verdi.vurderesEtter === Regelverk.EØS_FORORDNINGEN && (
                            <Radio
                                value={ResultatBegrunnelse.IKKE_AKTUELT}
                                name={`${redigerbartVilkår.verdi.vilkårType}_${redigerbartVilkår.verdi.id}`}
                            >
                                Ikke aktuelt
                            </Radio>
                        )}
                </RadioGroup>
                <UtdypendeVilkårsvurderingMultiselect
                    redigerbartVilkår={redigerbartVilkår}
                    validerOgSettRedigerbartVilkår={validerOgSettRedigerbartVilkår}
                    erLesevisning={lesevisning}
                    personType={person.type}
                    feilhåndtering={
                        redigerbartVilkår.verdi.utdypendeVilkårsvurderinger.valideringsstatus ===
                            Valideringsstatus.FEIL && skalViseFeilmeldinger()
                            ? redigerbartVilkår.verdi.utdypendeVilkårsvurderinger.feilmelding
                            : ''
                    }
                />
                {redigerbartVilkår.verdi.resultat.verdi === Resultat.IKKE_OPPFYLT && årsakErSøknad && (
                    <AvslagSkjema
                        redigerbartVilkår={redigerbartVilkår}
                        settRedigerbartVilkår={settRedigerbartVilkår}
                        visFeilmeldinger={skalViseFeilmeldinger()}
                        settVisFeilmeldingerForEttVilkår={settVisFeilmeldingerForEttVilkår}
                    />
                )}
                <VelgPeriode
                    redigerbartVilkår={redigerbartVilkår}
                    validerOgSettRedigerbartVilkår={validerOgSettRedigerbartVilkår}
                    visFeilmeldinger={skalViseFeilmeldinger()}
                />
                <Textarea
                    readOnly={lesevisning}
                    value={redigerbartVilkår.verdi.begrunnelse.verdi}
                    id={vilkårBegrunnelseFeilmeldingId(redigerbartVilkår.verdi)}
                    label={`Begrunnelse ${erBegrunnelsePåkrevd() ? '' : '(valgfri)'}`}
                    className={'begrunnelse-textarea'}
                    placeholder={'Begrunn hvorfor det er gjort endringer på vilkåret.'}
                    error={
                        redigerbartVilkår.verdi.begrunnelse.valideringsstatus === Valideringsstatus.FEIL &&
                        skalViseFeilmeldinger()
                            ? redigerbartVilkår.verdi.begrunnelse.feilmelding
                            : ''
                    }
                    onChange={(event: React.FocusEvent<HTMLTextAreaElement>) => {
                        validerOgSettRedigerbartVilkår({
                            ...redigerbartVilkår,
                            verdi: {
                                ...redigerbartVilkår.verdi,
                                begrunnelse: {
                                    ...redigerbartVilkår.verdi.begrunnelse,
                                    verdi: event?.target.value,
                                },
                            },
                        });
                    }}
                />
                {!lesevisning && (
                    <Knapperad>
                        <div>
                            <Button
                                onClick={onClickVilkårFerdig}
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
                        <Button
                            variant={'tertiary'}
                            onClick={() => {
                                const promise = deleteVilkår(person.personIdent, redigerbartVilkår.verdi.id);
                                håndterEndringPåVilkårsvurdering(promise);
                            }}
                            id={vilkårFeilmeldingId(vilkårResultat.verdi)}
                            loading={vilkårSubmit === VilkårSubmit.DELETE}
                            disabled={vilkårSubmit === VilkårSubmit.DELETE}
                            size={'medium'}
                            icon={<TrashIcon />}
                        >
                            {'Fjern'}
                        </Button>
                    </Knapperad>
                )}
            </StyledVStack>
        </Fieldset>
    );
};

export default VilkårTabellRadEndre;
