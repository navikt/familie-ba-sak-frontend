import * as React from 'react';
import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Alert, Button, ErrorMessage, Heading } from '@navikt/ds-react';
import {
    ASpacing4,
    ASpacing6,
    ASpacing8,
    ASpacing10,
    ASpacing24,
} from '@navikt/ds-tokens/dist/tokens';
import { hentDataFraRessurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { BehandlingSteg, settPåVentÅrsaker } from '../../../typer/behandling';
import { Datoformat, formaterIsoDato } from '../../../utils/formatter';
import { behandlingErEtterSteg } from '../../../utils/steg';
import type { ISide } from '../Venstremeny/sider';
import { sider } from '../Venstremeny/sider';

interface IProps {
    className?: string;
    forrigeKnappTittel?: string;
    forrigeOnClick?: () => void;
    nesteKnappTittel?: string;
    nesteOnClick?: () => void;
    senderInn: boolean;
    tittel: string | React.ReactNode;
    maxWidthStyle?: string;
    skalViseNesteKnapp?: boolean;
    skalViseForrigeKnapp?: boolean;
    feilmelding?: string;
    steg: BehandlingSteg;
}

const Container = styled.div<{ maxWidthStyle: string }>`
    position: relative;
    padding: ${ASpacing10};
    max-width: ${({ maxWidthStyle }) => maxWidthStyle};
`;

const StyledErrorMessage = styled(ErrorMessage)`
    margin-top: ${ASpacing4};
`;

const StyledAlert = styled(Alert)`
    margin: ${ASpacing8} ${ASpacing8} 0 ${ASpacing8};
    width: fit-content;
`;

const Navigering = styled.div`
    margin: ${ASpacing24} 0 ${ASpacing4};
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    button:not(:first-child) {
        margin-right: ${ASpacing6};
    }
`;

const Skjemasteg: React.FunctionComponent<IProps> = ({
    children,
    className,
    forrigeKnappTittel,
    forrigeOnClick,
    nesteKnappTittel,
    nesteOnClick,
    senderInn,
    tittel,
    maxWidthStyle = '40rem',
    skalViseNesteKnapp = true,
    skalViseForrigeKnapp = true,
    feilmelding = '',
}) => {
    const location = useLocation();
    const {
        forrigeÅpneSide,
        åpenBehandling,
        vurderErLesevisning,
        erBehandleneEnhetMidlertidig,
        erBehandlingAvsluttet,
    } = useBehandling();
    const erBehandlingSattPåVent = hentDataFraRessurs(åpenBehandling)?.aktivSettPåVent;

    useEffect(() => {
        const element = document.getElementById('skjemasteg');

        const index: number = Object.values(sider).findIndex((side: ISide) =>
            location.pathname.includes(side.href)
        );
        const forrigeSide: ISide | undefined = Object.values(sider)[index - 1];

        if (element && forrigeSide && forrigeÅpneSide?.href.includes(forrigeSide.href)) {
            element.scrollIntoView({ block: 'start' });
        }
    }, [forrigeÅpneSide]);

    const kanGåVidereILesevisning = behandlingErEtterSteg(
        BehandlingSteg.VURDER_TILBAKEKREVING,
        hentDataFraRessurs(åpenBehandling)
    );
    return (
        <>
            {erBehandlingSattPåVent && (
                <StyledAlert variant="info">
                    Behandlingen er satt på vent. Årsak:{' '}
                    {settPåVentÅrsaker[erBehandlingSattPåVent.årsak]}. Frist:{' '}
                    {formaterIsoDato(erBehandlingSattPåVent.frist, Datoformat.DATO)}. Fortsett
                    behandling via menyen.
                </StyledAlert>
            )}

            {erBehandleneEnhetMidlertidig && !erBehandlingAvsluttet && (
                <StyledAlert variant="warning">
                    Denne behandlingen er låst fordi vi ikke har klart å sette behandlende enhet. Du
                    må endre dette i menyen før du kan fortsette.
                </StyledAlert>
            )}

            <Container id={'skjemasteg'} className={className} maxWidthStyle={maxWidthStyle}>
                <Heading size={'large'} level={'1'} children={tittel} spacing />

                {children}

                {feilmelding !== '' && <StyledErrorMessage>{feilmelding}</StyledErrorMessage>}

                <Navigering>
                    {nesteOnClick &&
                        skalViseNesteKnapp &&
                        (!vurderErLesevisning() || kanGåVidereILesevisning) && (
                            <Button
                                loading={senderInn}
                                disabled={senderInn}
                                onClick={() => {
                                    if (!senderInn) {
                                        nesteOnClick();
                                    }
                                }}
                                children={nesteKnappTittel ?? 'Neste steg'}
                            />
                        )}
                    {forrigeOnClick && skalViseForrigeKnapp && (
                        <Button
                            onClick={() => {
                                forrigeOnClick();
                            }}
                            variant="secondary"
                            children={forrigeKnappTittel ?? 'Forrige steg'}
                        />
                    )}
                </Navigering>
            </Container>
        </>
    );
};

export default Skjemasteg;
