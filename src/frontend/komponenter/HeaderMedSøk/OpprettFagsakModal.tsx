import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import {
    Alert,
    BodyShort,
    Button,
    HStack,
    Modal,
    ReadMore,
    Select,
    TextField,
    VStack,
} from '@navikt/ds-react';
import type { ISøkeresultat } from '@navikt/familie-header';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useAppContext } from '../../context/AppContext';
import { useOpprettFagsak } from '../../hooks/useOpprettFagsak';
import type { IBaseFagsak } from '../../typer/fagsak';
import { FagsakType } from '../../typer/fagsak';
import type { IPersonInfo } from '../../typer/person';
import type { ISamhandlerInfo } from '../../typer/samhandler';
import { hentAktivBehandlingPåMinimalFagsak } from '../../utils/fagsak';
import { formaterIdent, formaterNavnAlderOgIdent } from '../../utils/formatter';
import { SamhandlerTabell } from '../Samhandler/SamhandlerTabell';
import { useSamhandlerSkjema } from '../Samhandler/useSamhandler';

const kulepunkt = `\u2022` + '   ';

function utledHeading(harNormalFagsak: undefined | boolean) {
    return harNormalFagsak
        ? 'Opprett fagsak for institusjon eller enslig mindreårig'
        : 'Opprett fagsak';
}

function utledUndertittel(harFagsak: boolean) {
    let text = '';
    if (harFagsak) {
        text += 'Personen har allerede en tilknyttet fagsak. ';
    }
    text += `Ønsker du å opprette ${harFagsak ? 'ny' : ''} fagsak for denne personen?`;
    return text;
}

function formaterSøkeresultat(søkeresultat: ISøkeresultat | undefined): string {
    return (søkeresultat?.navn || '') + formaterIdent(søkeresultat?.ident || '');
}

interface Props {
    lukkModal: () => void;
    søkeresultat?: ISøkeresultat | undefined;
    personInfo?: IPersonInfo;
    fagsakerPåBruker?: IBaseFagsak[];
}

const fagsakTypeOptions = [
    {
        value: FagsakType.NORMAL,
        label: 'Velg',
    },
    {
        value: FagsakType.INSTITUSJON,
        label: 'Institusjon',
    },
    {
        value: FagsakType.BARN_ENSLIG_MINDREÅRIG,
        label: 'Enslig mindreårig',
    },
];

export function OpprettFagsakModal({
    lukkModal,
    søkeresultat,
    personInfo,
    fagsakerPåBruker,
}: Props) {
    const navigate = useNavigate();

    const {
        mutate: opprettFagsak,
        isPending: isOpprettFagsakPending,
        isError: isOpprettFagsakError,
        error: opprettFagsakError,
    } = useOpprettFagsak({
        onSuccess: data => {
            onClose();
            const aktivBehandling = hentAktivBehandlingPåMinimalFagsak(data);
            if (aktivBehandling) {
                navigate(`/fagsak/${data.id}/${aktivBehandling.behandlingId}`);
            } else {
                navigate(`/fagsak/${data.id}/saksoversikt`);
            }
        },
    });

    const [bruker, settBruker] = useState(personInfo);
    const { hentPerson } = useAppContext();
    const harFagsak = (fagsakerPåBruker?.length || 0) > 0;
    const harNormalFagsak = fagsakerPåBruker?.some(
        fagsak => fagsak.fagsakType === FagsakType.NORMAL
    );
    const [fagsakType, settFagsakType] = useState<FagsakType>(
        harNormalFagsak ? FagsakType.INSTITUSJON : FagsakType.NORMAL
    );

    const [feilmelding, settFeilmelding] = useState('');
    const [valgtSamhandler, settValgtSamhandler] = useState<ISamhandlerInfo | undefined>(undefined);
    const [spinner, settSpinner] = useState(false);
    const { onSubmitWrapper, samhandlerSkjema } = useSamhandlerSkjema(
        () => {
            settFeilmelding('');
            settSpinner(false);
        },
        error => {
            settFeilmelding(error);
            settSpinner(false);
        }
    );

    const onClose = () => {
        settFagsakType(FagsakType.NORMAL);
        settFeilmelding('');
        settValgtSamhandler(undefined);
        lukkModal();
    };

    useEffect(() => {
        if (bruker === undefined && søkeresultat) {
            hentPerson(søkeresultat.ident).then(personRessurs => {
                if (personRessurs.status === RessursStatus.SUKSESS) {
                    settBruker(personRessurs.data);
                }
            });
        }
    }, [søkeresultat]);

    useEffect(() => {
        if (samhandlerSkjema.submitRessurs.status === RessursStatus.SUKSESS) {
            settValgtSamhandler(samhandlerSkjema.submitRessurs.data);
            settFeilmelding('');
        }
    }, [samhandlerSkjema.submitRessurs.status]);

    const valgAvFagsakType = () => (
        <VStack gap={'4'}>
            <Select
                label={'Fagsaktype'}
                size={'small'}
                value={fagsakTypeOptions.find(option => option.value === fagsakType)?.value}
                onChange={event => {
                    settFagsakType(
                        Object.values(FagsakType).find(type => type === event.target.value) ||
                            FagsakType.NORMAL
                    );
                }}
            >
                {fagsakTypeOptions
                    .filter(valg => (harNormalFagsak ? valg.value !== FagsakType.NORMAL : true))
                    .map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
            </Select>
            {fagsakType === FagsakType.INSTITUSJON && (
                <HStack gap={'4'} paddingBlock={'space-16'} align={'end'}>
                    <TextField
                        {...samhandlerSkjema.felter.orgnr.hentNavInputProps(
                            samhandlerSkjema.visFeilmeldinger
                        )}
                        id={'hent-samhandler'}
                        label={'Organisasjonsnummer'}
                        size={'small'}
                        onChange={event =>
                            samhandlerSkjema.felter.orgnr.validerOgSettFelt(
                                event.target.value.replaceAll(' ', '')
                            )
                        }
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                onSubmitWrapper();
                            }
                        }}
                    />
                    <div>
                        <Button
                            children={'Hent institusjon'}
                            size={'small'}
                            variant={'secondary'}
                            loading={spinner}
                            onClick={() => {
                                if (
                                    samhandlerSkjema.felter.orgnr.valideringsstatus !==
                                    Valideringsstatus.FEIL
                                ) {
                                    settSpinner(true);
                                }
                                onSubmitWrapper();
                            }}
                        />
                    </div>
                </HStack>
            )}
            {fagsakType === FagsakType.INSTITUSJON && valgtSamhandler !== undefined && (
                <SamhandlerTabell samhandler={valgtSamhandler} />
            )}
        </VStack>
    );

    return (
        <Modal
            open={true}
            onClose={onClose}
            header={{ heading: utledHeading(harNormalFagsak), size: 'medium' }}
            portal={true}
            width={'35rem'}
        >
            <Modal.Body>
                <VStack gap={'4'}>
                    <BodyShort>{utledUndertittel(harFagsak)}</BodyShort>
                    {bruker ? (
                        <BodyShort>{kulepunkt + formaterNavnAlderOgIdent(bruker)}</BodyShort>
                    ) : (
                        <BodyShort>{kulepunkt + formaterSøkeresultat(søkeresultat)}</BodyShort>
                    )}
                    {harNormalFagsak ? (
                        valgAvFagsakType()
                    ) : (
                        <ReadMore
                            header={'Søker er en institusjon eller enslig mindreårig'}
                            defaultOpen={false}
                            onClick={() => {
                                if (fagsakType !== FagsakType.NORMAL) {
                                    settFagsakType(FagsakType.NORMAL);
                                }
                            }}
                        >
                            {valgAvFagsakType()}
                        </ReadMore>
                    )}
                    {feilmelding && <Alert variant={'error'}>{feilmelding}</Alert>}
                    {isOpprettFagsakError && (
                        <Alert variant={'error'}>{opprettFagsakError.message}</Alert>
                    )}
                </VStack>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    key={'Bekreft'}
                    variant={'primary'}
                    onClick={() => {
                        const personIdent = søkeresultat?.ident || personInfo?.personIdent;
                        if (personIdent) {
                            opprettFagsak({
                                personIdent: personIdent,
                                fagsakType: fagsakType,
                                institusjon: valgtSamhandler
                                    ? {
                                          orgNummer: valgtSamhandler.orgNummer,
                                          tssEksternId: valgtSamhandler.tssEksternId,
                                      }
                                    : null,
                            });
                        }
                    }}
                    disabled={isOpprettFagsakPending}
                    loading={isOpprettFagsakPending}
                >
                    Opprett fagsak
                </Button>
                <Button key={'avbryt'} variant={'tertiary'} onClick={onClose}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
