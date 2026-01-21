import * as React from 'react';

import styled from 'styled-components';

import {
    BodyShort,
    Button,
    Detail,
    Fieldset,
    Heading,
    Label,
    Radio,
    RadioGroup,
    Stack,
    Textarea,
    VStack,
} from '@navikt/ds-react';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useAppContext } from '../../../../../../context/AppContext';
import ØyeGrå from '../../../../../../ikoner/ØyeGrå';
import ØyeGrønn from '../../../../../../ikoner/ØyeGrønn';
import ØyeRød from '../../../../../../ikoner/ØyeRød';
import type { IBehandling } from '../../../../../../typer/behandling';
import { TotrinnskontrollBeslutning } from '../../../../../../typer/totrinnskontroll';
import { Datoformat, isoStringTilFormatertString } from '../../../../../../utils/dato';
import { hentFrontendFeilmelding } from '../../../../../../utils/ressursUtils';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import { KontrollertStatus } from '../../../Sider/sider';

interface Props {
    innsendtVedtak: Ressurs<IBehandling>;
    sendInnVedtak: (beslutning: TotrinnskontrollBeslutning, begrunnelse: string, egetVedtak: boolean) => void;
}

export function Totrinnskontrollskjema({ innsendtVedtak, sendInnVedtak }: Props) {
    const { behandling, trinnPåBehandling } = useBehandlingContext();
    const { innloggetSaksbehandler } = useAppContext();

    const [beslutning, settBeslutning] = React.useState<TotrinnskontrollBeslutning>(
        TotrinnskontrollBeslutning.IKKE_VURDERT
    );
    const [begrunnelse, settBegrunnelse] = React.useState<string>('');

    const senderInn = innsendtVedtak.status === RessursStatus.HENTER;

    const totrinnskontroll = behandling.totrinnskontroll;

    const saksbehandler = totrinnskontroll?.saksbehandler ?? 'UKJENT SAKSBEHANDLER';
    const opprettetTidspunkt = totrinnskontroll?.opprettetTidspunkt ?? undefined;

    const egetVedtak = totrinnskontroll?.saksbehandlerId === innloggetSaksbehandler?.navIdent;

    return (
        <Fieldset
            error={hentFrontendFeilmelding(innsendtVedtak)}
            legend={
                egetVedtak ? (
                    <Heading size={'medium'} level={'2'}>
                        Totrinnskontroll
                    </Heading>
                ) : (
                    <BodyShort>Kontrollér opplysninger og faglige vurderinger som er gjort</BodyShort>
                )
            }
        >
            <VStack gap="4" marginBlock="0 6">
                <RadioGroup value={beslutning} legend={''}>
                    {egetVedtak ? (
                        <VStack gap="4" marginBlock="0 4">
                            <div>
                                <BodyShort>
                                    {isoStringTilFormatertString({
                                        isoString: opprettetTidspunkt,
                                        tilFormat: Datoformat.DATO_FORLENGET_MED_TID,
                                        defaultString: 'UKJENT OPPRETTELSESTIDSPUNKT',
                                    })}
                                </BodyShort>
                                <BodyShort>{saksbehandler}</BodyShort>
                            </div>
                            <Detail>Vedtaket er sendt til godkjenning</Detail>
                        </VStack>
                    ) : (
                        <>
                            <Label spacing>Kontrollerte trinn</Label>
                            {Object.entries(trinnPåBehandling).map(([_, trinn], index) => {
                                return (
                                    <TrinnStatus
                                        kontrollertStatus={trinn.kontrollert}
                                        navn={`${index + 1}. ${trinn.navn}`}
                                    />
                                );
                            })}
                            <br />
                        </>
                    )}
                    <Stack gap="0 6" direction={{ xs: 'column', sm: 'row' }} wrap={false}>
                        <Radio
                            value={TotrinnskontrollBeslutning.GODKJENT}
                            name={'totrinnskontroll'}
                            className="totrinnskontroll-radio"
                            onChange={() =>
                                beslutning === TotrinnskontrollBeslutning.GODKJENT
                                    ? settBeslutning(TotrinnskontrollBeslutning.IKKE_VURDERT)
                                    : settBeslutning(TotrinnskontrollBeslutning.GODKJENT)
                            }
                            disabled={senderInn || egetVedtak}
                        >
                            Godkjent
                        </Radio>
                        <Radio
                            value={TotrinnskontrollBeslutning.UNDERKJENT}
                            name={'totrinnskontroll'}
                            className="totrinnskontroll-radio"
                            onClick={() =>
                                beslutning === TotrinnskontrollBeslutning.UNDERKJENT
                                    ? settBeslutning(TotrinnskontrollBeslutning.IKKE_VURDERT)
                                    : settBeslutning(TotrinnskontrollBeslutning.UNDERKJENT)
                            }
                            disabled={senderInn}
                        >
                            Vurdér på nytt
                        </Radio>
                    </Stack>
                </RadioGroup>
                {beslutning === TotrinnskontrollBeslutning.UNDERKJENT && (
                    <Textarea
                        label={''}
                        defaultValue={begrunnelse}
                        value={begrunnelse}
                        placeholder={'Begrunnelse'}
                        onChange={event => settBegrunnelse(event.target.value)}
                    />
                )}
            </VStack>

            <Button
                variant={'primary'}
                loading={senderInn}
                size={'small'}
                onClick={() => {
                    if (!senderInn) {
                        sendInnVedtak(
                            beslutning,
                            beslutning === TotrinnskontrollBeslutning.UNDERKJENT ? begrunnelse : '',
                            egetVedtak
                        );
                    }
                }}
                children={
                    egetVedtak
                        ? 'Underkjenn eget vedtak'
                        : beslutning === TotrinnskontrollBeslutning.UNDERKJENT
                          ? 'Send til saksbehandler'
                          : 'Godkjenn vedtaket'
                }
            />
        </Fieldset>
    );
}

const Trinn = styled.div`
    display: flex;

    svg {
        margin-right: 1rem;
    }
`;

const TrinnStatus: React.FC<{
    kontrollertStatus: KontrollertStatus;
    navn: string;
}> = ({ kontrollertStatus, navn }) => {
    return (
        <Trinn>
            {kontrollertStatus === KontrollertStatus.IKKE_KONTROLLERT && <ØyeGrå height={24} width={24} />}

            {kontrollertStatus === KontrollertStatus.KONTROLLERT && <ØyeGrønn height={24} width={24} />}

            {kontrollertStatus === KontrollertStatus.MANGLER_KONTROLL && <ØyeRød height={24} width={24} />}
            <BodyShort>{navn}</BodyShort>
        </Trinn>
    );
};
