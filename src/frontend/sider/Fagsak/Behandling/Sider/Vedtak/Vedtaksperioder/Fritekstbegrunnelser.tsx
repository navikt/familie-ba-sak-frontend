import { type ChangeEvent, useId } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { HentGenererteBrevbegrunnelserQueryKeyFactory } from '@hooks/useHentGenererteBrevbegrunnelser';
import { HentVedtaksperioderQueryKeyFactory } from '@hooks/useHentVedtaksperioder';
import { useOppdaterVedtaksperiodeMedBegrunnelserIsPending } from '@hooks/useOppdaterVedtaksperiodeMedBegrunnelserIsPending';
import { useOppdaterVedtaksperiodeMedFritekster } from '@hooks/useOppdaterVedtaksperiodeMedFritekster';
import { useQueryClient } from '@tanstack/react-query';
import { type IBehandling, utledSøkersMålform } from '@typer/behandling';
import { målform } from '@typer/søknad';
import { genererIdBasertPåAndreFritekstKulepunkter, lagInitiellFritekst } from '@utils/fritekstfelter';
import { hentFrontendFeilmelding } from '@utils/ressursUtils';
import classNames from 'classnames';

import { ExternalLinkIcon, PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import {
    BodyLong,
    Button,
    Fieldset,
    Heading,
    HelpText,
    HGrid,
    HStack,
    Label,
    Link,
    Tag,
    Textarea,
    VStack,
} from '@navikt/ds-react';

import Styles from './Fritekstbegrunnelser.module.css';
import { useVedtaksperiodeContext } from './VedtaksperiodeContext';

export const MAKS_LENGDE_FRITEKST = 350;
const MAKS_ANTALL_KULEPUNKT = 3;
const KLARSPRÅK_URL = 'https://navno.sharepoint.com/sites/intranett-kommunikasjon/SitePages/Spr%C3%A5k.aspx';

export function Fritekstbegrunnelser() {
    const { skjema, kanSendeSkjema, onPanelClose, vedtaksperiodeMedBegrunnelser } = useVedtaksperiodeContext();

    const queryClient = useQueryClient();
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();
    const fieldsetId = useId();
    const oppdaterVedtaksperiodeMedBegrunnelserIsPending = useOppdaterVedtaksperiodeMedBegrunnelserIsPending(
        vedtaksperiodeMedBegrunnelser.id
    );

    const {
        mutate: oppdaterVedtaksperiodeMedFritekster,
        isPending: oppdaterVedtaksperiodeMedFriteksterIsPending,
        error: oppdaterVedtaksperiodeMedFriteksterError,
    } = useOppdaterVedtaksperiodeMedFritekster(vedtaksperiodeMedBegrunnelser.id, {
        onSuccess: async vedtaksperioderMedBegrunnelser => {
            await queryClient.invalidateQueries({
                queryKey: HentGenererteBrevbegrunnelserQueryKeyFactory.vedtaksperiode(vedtaksperiodeMedBegrunnelser.id),
            });
            queryClient.setQueryData(
                HentVedtaksperioderQueryKeyFactory.behandling(behandling.behandlingId),
                vedtaksperioderMedBegrunnelser
            );
            onPanelClose(false); // TODO : Kan vi fjerne denne? Sjekk med funskjonelle
        },
    });

    function onChangeFritekst(event: ChangeEvent<HTMLTextAreaElement>, fritekstId: number) {
        return skjema.felter.fritekster.validerOgSettFelt([
            ...skjema.felter.fritekster.verdi.map(mapFritekst => {
                if (mapFritekst.verdi.id === fritekstId) {
                    return mapFritekst.valider({
                        ...mapFritekst,
                        verdi: {
                            ...mapFritekst.verdi,
                            tekst: event.target.value,
                        },
                    });
                } else {
                    return mapFritekst;
                }
            }),
        ]);
    }

    function onOppdaterVedtaksperiodeMedFritekster() {
        if (!kanSendeSkjema()) {
            return;
        }
        const fritekster = skjema.felter.fritekster.verdi.map(fritekst => fritekst.verdi.tekst);
        oppdaterVedtaksperiodeMedFritekster({ fritekster });
    }

    function onSlettFritekst(fritekstId: number) {
        skjema.felter.fritekster.validerOgSettFelt([
            ...skjema.felter.fritekster.verdi.filter(mapFritekst => mapFritekst.verdi.id !== fritekstId),
        ]);
    }

    function onLeggTilFritekst() {
        skjema.felter.fritekster.validerOgSettFelt([
            ...skjema.felter.fritekster.verdi,
            lagInitiellFritekst(
                '',
                genererIdBasertPåAndreFritekstKulepunkter(skjema.felter.fritekster),
                MAKS_LENGDE_FRITEKST
            ),
        ]);
    }

    function onAvbryt() {
        onPanelClose(false);
    }

    if (!vedtaksperiodeMedBegrunnelser.fritekster.length && !skjema.felter.fritekster.verdi.length) {
        return (
            <>
                {!erLesevisning && (
                    <VStack gap={'space-8'}>
                        <FritekstHeader behandling={behandling} />
                        <div>
                            <Button
                                variant={'tertiary'}
                                size={'small'}
                                onClick={onLeggTilFritekst}
                                icon={<PlusCircleIcon />}
                                disabled={oppdaterVedtaksperiodeMedBegrunnelserIsPending}
                            >
                                Legg til fritekst
                            </Button>
                        </div>
                    </VStack>
                )}
            </>
        );
    }

    const erMaksAntallKulepunkter = skjema.felter.fritekster.verdi.length >= MAKS_ANTALL_KULEPUNKT;

    return (
        <VStack gap={'space-8'}>
            <FritekstHeader behandling={behandling} htmlFor={fieldsetId} />
            <Fieldset
                id={fieldsetId}
                legend={'Fritekst til kulepunkt i brev'}
                hideLegend={true}
                error={
                    (skjema.visFeilmeldinger && hentFrontendFeilmelding(skjema.submitRessurs)) ??
                    oppdaterVedtaksperiodeMedFriteksterError?.message
                }
            >
                {erLesevisning ? (
                    <ul>
                        {skjema.felter.fritekster.verdi.map(fritekst => (
                            <li>{fritekst.verdi.tekst}</li>
                        ))}
                    </ul>
                ) : (
                    <VStack gap={'space-16'}>
                        {skjema.felter.fritekster.verdi.map(fritekst => {
                            const fritekstId = fritekst.verdi.id;
                            return (
                                <HGrid columns={'5fr 1fr'} align={'center'}>
                                    <Textarea
                                        label={`Kulepunkt ${fritekstId}`}
                                        value={fritekst.verdi.tekst}
                                        onChange={event => onChangeFritekst(event, fritekstId)}
                                        error={skjema.visFeilmeldinger && fritekst.feilmelding}
                                        maxLength={MAKS_LENGDE_FRITEKST}
                                        readOnly={
                                            oppdaterVedtaksperiodeMedFriteksterIsPending ||
                                            oppdaterVedtaksperiodeMedBegrunnelserIsPending
                                        }
                                        /* eslint-disable-next-line jsx-a11y/no-autofocus */
                                        autoFocus={true}
                                        hideLabel={true}
                                        resize={true}
                                    />
                                    <Button
                                        aria-label={'Fjern fritekst'}
                                        variant={'tertiary'}
                                        size={'small'}
                                        onClick={() => onSlettFritekst(fritekstId)}
                                        icon={<TrashIcon />}
                                        className={classNames({
                                            [Styles.slettFritekstKnapp]: !oppdaterVedtaksperiodeMedFriteksterIsPending,
                                        })}
                                        disabled={
                                            oppdaterVedtaksperiodeMedFriteksterIsPending ||
                                            oppdaterVedtaksperiodeMedBegrunnelserIsPending
                                        }
                                    >
                                        Fjern
                                    </Button>
                                </HGrid>
                            );
                        })}
                    </VStack>
                )}
            </Fieldset>
            {!erMaksAntallKulepunkter && !erLesevisning && (
                <div>
                    <Button
                        variant={'tertiary'}
                        size={'small'}
                        onClick={onLeggTilFritekst}
                        icon={<PlusCircleIcon />}
                        disabled={
                            oppdaterVedtaksperiodeMedFriteksterIsPending ||
                            oppdaterVedtaksperiodeMedBegrunnelserIsPending
                        }
                    >
                        Legg til fritekst
                    </Button>
                </div>
            )}
            {!erLesevisning && (
                <HStack align={'center'} justify={'space-between'} paddingBlock={'space-8 space-0'}>
                    <Button
                        variant={'primary'}
                        size={'small'}
                        onClick={onOppdaterVedtaksperiodeMedFritekster}
                        loading={oppdaterVedtaksperiodeMedFriteksterIsPending}
                        disabled={oppdaterVedtaksperiodeMedBegrunnelserIsPending}
                    >
                        Lagre
                    </Button>
                    <Button
                        variant={'tertiary'}
                        size={'small'}
                        onClick={onAvbryt}
                        disabled={
                            oppdaterVedtaksperiodeMedFriteksterIsPending ||
                            oppdaterVedtaksperiodeMedBegrunnelserIsPending
                        }
                    >
                        Avbryt
                    </Button>
                </HStack>
            )}
        </VStack>
    );
}

function FritekstHeader({ behandling, htmlFor }: { behandling: IBehandling; htmlFor?: string }) {
    return (
        <HStack gap={'space-8'} align={'center'} justify={'space-between'}>
            <HStack gap={'space-8'} align={'center'} justify={'center'} wrap={false}>
                <Label htmlFor={htmlFor}>Fritekst til kulepunkt i brev</Label>
                <HelpText placement={'top-start'}>
                    <BodyLong size={'small'} spacing>
                        Brev som sendes ut bør være så kortfattede og presise som mulig.
                        <Link target={'_blank'} rel={'noopener noreferrer'} href={KLARSPRÅK_URL}>
                            Se retningslinjer for klarspråk.
                            <ExternalLinkIcon fontSize={'1.3rem'} />
                        </Link>
                    </BodyLong>
                    <Heading level={'3'} size={'xsmall'}>
                        Eksempler på formulering:
                    </Heading>
                    <BodyLong size={'small'} spacing={true} className={Styles.italics}>
                        Barnevernet har bekreftet at de overtok omsorgen for barnet mars 2021
                    </BodyLong>
                    <BodyLong size={'small'} className={Styles.italics}>
                        Opplysningene fra Folkeregisteret viser at barnet ikke bor sammen med deg
                    </BodyLong>
                </HelpText>
            </HStack>
            <Tag variant={'outline'} data-color={'neutral'} size={'small'}>
                Skriv {målform[utledSøkersMålform(behandling)].toLowerCase()}
            </Tag>
        </HStack>
    );
}
