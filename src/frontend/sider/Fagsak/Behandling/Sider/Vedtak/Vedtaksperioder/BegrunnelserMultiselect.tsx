import { type Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { useBehandlingId } from '@hooks/useBehandlingId';
import { useErLesevisning } from '@hooks/useErLesevisning';
import {
    HentGenererteBrevbegrunnelserQueryKeyFactory,
    useHentGenererteBrevbegrunnelser,
} from '@hooks/useHentGenererteBrevbegrunnelser';
import { HentVedtaksperioderQueryKeyFactory } from '@hooks/useHentVedtaksperioder';
import { useOppdaterVedtaksperiodeMedBegrunnelser } from '@hooks/useOppdaterVedtaksperiodeMedBegrunnelser';
import { useOppdaterVedtaksperiodeMedFriteksterIsPending } from '@hooks/useOppdaterVedtaksperiodeMedFriteksterIsPending';
import { useQueryClient } from '@tanstack/react-query';
import type { OptionType } from '@typer/common';
import type { VedtakBegrunnelse, VedtakBegrunnelseType } from '@typer/vedtak';
import { Standardbegrunnelse, vedtakBegrunnelseTyper } from '@typer/vedtak';
import { Vedtaksperiodetype } from '@typer/vedtaksperiode';
import { finnVedtakBegrunnelseType, hentBakgrunnsfarge, hentBorderfarge } from '@utils/vedtakUtils';

import { BodyShort, Box, Label } from '@navikt/ds-react';
import type { ActionMeta, FormatOptionLabelMeta, GroupBase, StylesConfig } from '@navikt/familie-form-elements';
import { FamilieReactSelect } from '@navikt/familie-form-elements';

import { grupperBegrunnelser, mapBegrunnelserTilSelectOptions } from './utils';
import { useVedtaksperiodeContext } from './VedtaksperiodeContext';
import { useAlleBegrunnelserContext } from '../AlleBegrunnelserContext';
import Styles from './BegrunnelserMultiselect.module.css';

const FRITEKST_FEILMELDING =
    'Fritekst kan kun brukes i kombinasjon med en eller flere begrunnelser. Legg til en ny begrunnelse eller fjern friteksten(e).';

const enkeltverdierSomKanSettesAutomatisk = [
    'Standardbegrunnelse$INNVILGET_SATSENDRING',
    Standardbegrunnelse.REDUKSJON_SATSENDRING,
    Standardbegrunnelse.REDUKSJON_UNDER_6_ÅR,
    Standardbegrunnelse.REDUKSJON_UNDER_18_ÅR,
];

export interface StandardbegrunnelserHandlinger {
    tilbakestillKombinertFritekstfeilmelding: () => void;
}

interface Props {
    imperativeRef: Ref<StandardbegrunnelserHandlinger>;
    onSubmitSuccessful: () => void;
}

export function BegrunnelserMultiselect({ imperativeRef, onSubmitSuccessful }: Props) {
    const { vedtaksperiodeMedBegrunnelser } = useVedtaksperiodeContext();

    const { alleBegrunnelser } = useAlleBegrunnelserContext();

    const queryClient = useQueryClient();
    const behandlingId = useBehandlingId();
    const erLesevisning = useErLesevisning();
    const oppdaterVedtaksperioderMedFriteksterIsPending = useOppdaterVedtaksperiodeMedFriteksterIsPending(
        vedtaksperiodeMedBegrunnelser.id
    );

    const [felmelding, settFelmelding] = useState<string | undefined>(undefined);

    useImperativeHandle(imperativeRef, () => ({
        tilbakestillKombinertFritekstfeilmelding: () => settFelmelding(undefined),
    }));

    const {
        data: genererteBrevbegrunnelser,
        isPending: genererteBrevbegrunnelserIsPending,
        error: genererteBrevbegrunnelserError,
    } = useHentGenererteBrevbegrunnelser(vedtaksperiodeMedBegrunnelser.id);

    const {
        mutate: oppdaterVedtaksperiodeMedBegrunnelser,
        isPending: oppdaterVedtaksperiodeMedBegrunnelserIsPending,
        error: oppdaterVedtaksperiodeMedBegrunnelserError,
    } = useOppdaterVedtaksperiodeMedBegrunnelser(vedtaksperiodeMedBegrunnelser.id, {
        onSuccess: async vedtaksperioderMedBegrunnelser => {
            await queryClient.invalidateQueries({
                queryKey: HentGenererteBrevbegrunnelserQueryKeyFactory.vedtaksperiode(vedtaksperiodeMedBegrunnelser.id),
            });
            queryClient.setQueryData(
                HentVedtaksperioderQueryKeyFactory.behandling(behandlingId),
                vedtaksperioderMedBegrunnelser
            );
            onSubmitSuccessful();
        },
    });

    const skalIkkeEditeres = erLesevisning || vedtaksperiodeMedBegrunnelser.type === Vedtaksperiodetype.AVSLAG;
    const grupperteBegrunnelser = grupperBegrunnelser(vedtaksperiodeMedBegrunnelser, alleBegrunnelser);

    const skalAutomatiskUtfylles = useRef(!skalIkkeEditeres);

    useEffect(() => {
        if (!skalAutomatiskUtfylles.current || genererteBrevbegrunnelser === undefined) {
            return;
        }
        skalAutomatiskUtfylles.current = false;
        const harIngenGenererteBrevbegrunnelser = genererteBrevbegrunnelser.length === 0;
        const valgmuligheter = grupperteBegrunnelser.flatMap(gruppe => gruppe.options);
        const harKunEnValgmulighet = valgmuligheter.length === 1;
        const harValgmulighetSomKanAutovelges =
            harKunEnValgmulighet && enkeltverdierSomKanSettesAutomatisk.includes(valgmuligheter[0].value);
        if (harIngenGenererteBrevbegrunnelser && harValgmulighetSomKanAutovelges) {
            onChangeBegrunnelse({
                action: 'select-option',
                option: valgmuligheter[0],
            });
        }
    }, [genererteBrevbegrunnelser, grupperteBegrunnelser]);

    function onChangeBegrunnelse(action: ActionMeta<OptionType>) {
        switch (action.action) {
            case 'select-option':
                if (action.option) {
                    settFelmelding(undefined);
                    oppdaterVedtaksperiodeMedBegrunnelser({
                        standardbegrunnelser: [
                            ...vedtaksperiodeMedBegrunnelser.begrunnelser.map(
                                begrunnelse => begrunnelse.standardbegrunnelse
                            ),
                            action.option?.value as VedtakBegrunnelse,
                        ],
                    });
                }
                break;
            case 'pop-value':
            case 'remove-value':
                if (action.removedValue) {
                    const standardbegrunnelser = [
                        ...vedtaksperiodeMedBegrunnelser.begrunnelser.filter(
                            persistertBegrunnelse =>
                                persistertBegrunnelse.standardbegrunnelse !==
                                (action.removedValue?.value as VedtakBegrunnelse)
                        ),
                    ].map(begrunnelse => begrunnelse.standardbegrunnelse);
                    if (standardbegrunnelser.length === 0 && vedtaksperiodeMedBegrunnelser.fritekster.length > 0) {
                        settFelmelding(FRITEKST_FEILMELDING);
                    } else {
                        oppdaterVedtaksperiodeMedBegrunnelser({ standardbegrunnelser });
                        settFelmelding(undefined);
                    }
                }
                break;
            case 'clear':
                if (vedtaksperiodeMedBegrunnelser.fritekster.length > 0) {
                    settFelmelding(FRITEKST_FEILMELDING);
                } else {
                    oppdaterVedtaksperiodeMedBegrunnelser({ standardbegrunnelser: [] });
                    settFelmelding(undefined);
                }
                break;
            default:
                throw new Error('Ukjent action ved onChange på vedtakbegrunnelser');
        }
    }

    const propSelectStyles: StylesConfig<OptionType, boolean, GroupBase<OptionType>> = {
        container: (provided, props) =>
            Object.assign({}, provided, {
                maxWidth: '50rem',
                zIndex: props.isFocused ? 1000 : 1,
            }),
        groupHeading: provided =>
            Object.assign({}, provided, {
                textTransform: 'none',
            }),
        multiValue: (provided, props) => {
            const currentOption = props.data;
            const vedtakBegrunnelseType: VedtakBegrunnelseType | undefined = finnVedtakBegrunnelseType(
                alleBegrunnelser,
                currentOption.value as VedtakBegrunnelse
            );

            return Object.assign({}, provided, {
                backgroundColor: hentBakgrunnsfarge(vedtakBegrunnelseType),
                border: `1px solid ${hentBorderfarge(vedtakBegrunnelseType)}`,
                borderRadius: '0.5rem',
            });
        },
        multiValueLabel: provided =>
            Object.assign({}, provided, {
                whiteSpace: 'pre-wrap',
                textOverflow: 'hidden',
            }),
    };

    return (
        <FamilieReactSelect
            id={`${vedtaksperiodeMedBegrunnelser.id}`}
            label={'Velg standardtekst i brev'}
            placeholder={'Velg begrunnelse(r)'}
            value={mapBegrunnelserTilSelectOptions(vedtaksperiodeMedBegrunnelser, alleBegrunnelser)}
            propSelectStyles={propSelectStyles}
            isLoading={
                oppdaterVedtaksperioderMedFriteksterIsPending ||
                oppdaterVedtaksperiodeMedBegrunnelserIsPending ||
                genererteBrevbegrunnelserIsPending
            }
            isDisabled={
                skalIkkeEditeres ||
                oppdaterVedtaksperioderMedFriteksterIsPending ||
                oppdaterVedtaksperiodeMedBegrunnelserIsPending ||
                genererteBrevbegrunnelserIsPending
            }
            feil={
                felmelding ??
                oppdaterVedtaksperiodeMedBegrunnelserError?.message ??
                genererteBrevbegrunnelserError?.message
            }
            creatable={false}
            erLesevisning={skalIkkeEditeres}
            isMulti={true}
            onChange={(_, action: ActionMeta<OptionType>) => onChangeBegrunnelse(action)}
            formatOptionLabel={(option: OptionType, formatOptionLabelMeta: FormatOptionLabelMeta<OptionType>) => {
                const vedtakBegrunnelseType = finnVedtakBegrunnelseType(
                    alleBegrunnelser,
                    option.value as VedtakBegrunnelse
                );
                if (formatOptionLabelMeta.context === 'value') {
                    const type = vedtakBegrunnelseTyper[vedtakBegrunnelseType as VedtakBegrunnelseType];
                    return (
                        <BodyShort>
                            <b>{type}</b>: {option.label}
                        </BodyShort>
                    );
                } else {
                    return <BodyShort>{option.label}</BodyShort>;
                }
            }}
            formatGroupLabel={(group: GroupBase<OptionType>) => {
                return (
                    <Box>
                        <Label className={Styles.label}>{group.label}</Label>
                        <hr />
                    </Box>
                );
            }}
            options={grupperteBegrunnelser}
        />
    );
}
