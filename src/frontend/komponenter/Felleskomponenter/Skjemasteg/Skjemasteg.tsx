import * as React from 'react';
import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Innholdstittel } from 'nav-frontend-typografi';

import { Alert, Button, ErrorMessage } from '@navikt/ds-react';
import {
    NavdsSpacing4,
    NavdsSpacing6,
    NavdsSpacing8,
    NavdsSpacing10,
    NavdsSpacing24,
} from '@navikt/ds-tokens/dist/tokens';
import { hentDataFraRessurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { BehandlingSteg, settPåVentÅrsaker } from '../../../typer/behandling';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
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
    padding: ${NavdsSpacing10};
    max-width: ${({ maxWidthStyle }) => maxWidthStyle};
`;

const StyledErrorMessage = styled(ErrorMessage)`
    margin-top: ${NavdsSpacing4};
`;

const StyledAlert = styled(Alert)`
    margin: ${NavdsSpacing8} ${NavdsSpacing8} 0 ${NavdsSpacing8};
    width: fit-content;
`;

const Navigering = styled.div`
    margin: ${NavdsSpacing24} 0 ${NavdsSpacing4};
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    button:not(:first-child) {
        margin-right: ${NavdsSpacing6};
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
        erLesevisning,
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
                    {formaterIsoDato(erBehandlingSattPåVent.frist, datoformat.DATO)}. Fortsett
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
                <Innholdstittel children={tittel} />

                {children}

                {feilmelding !== '' && <StyledErrorMessage>{feilmelding}</StyledErrorMessage>}

                <Navigering>
                    {nesteOnClick &&
                        skalViseNesteKnapp &&
                        (!erLesevisning() || kanGåVidereILesevisning) && (
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
