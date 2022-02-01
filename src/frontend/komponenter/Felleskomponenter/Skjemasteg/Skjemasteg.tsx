import * as React from 'react';
import { useEffect } from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Feilmelding, Innholdstittel } from 'nav-frontend-typografi';

import { hentDataFraRessurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { settPåVentÅrsaker } from '../../../typer/behandling';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import { ISide, sider } from '../Venstremeny/sider';

interface IProps {
    className?: string;
    forrigeKnappTittel?: string;
    forrigeOnClick?: () => void;
    nesteKnappTittel?: string;
    nesteOnClick?: () => void;
    senderInn: boolean;
    tittel: string;
    maxWidthStyle?: string;
    skalViseNesteKnapp?: boolean;
    skalViseForrigeKnapp?: boolean;
    feilmelding?: string;
}

const Container = styled.div<{ maxWidthStyle: string }>`
    padding: 2rem;
    max-width: ${({ maxWidthStyle }) => maxWidthStyle};
`;

const StyledInnholdstittel = styled(Innholdstittel)`
    padding-bottom: 1rem;
`;

const StyledFeilmelding = styled(Feilmelding)`
    margin-top: 1rem;
`;

const StyledAlertStripe = styled(AlertStripe)`
    margin: 2rem 2rem 0 2rem;
    width: fit-content;
`;

const Navigering = styled.div`
    margin: 4rem 0 1rem;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    button:not(:first-child) {
        margin-right: 1rem;
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
    const history = useHistory();
    const { forrigeÅpneSide, åpenBehandling } = useBehandling();
    const settPåVent = hentDataFraRessurs(åpenBehandling)?.settPåVent;

    useEffect(() => {
        const element = document.getElementById('skjemasteg');

        const index: number = Object.values(sider).findIndex((side: ISide) =>
            history.location.pathname.includes(side.href)
        );
        const forrigeSide: ISide | undefined = Object.values(sider)[index - 1];

        if (element && forrigeSide && forrigeÅpneSide?.href.includes(forrigeSide.href)) {
            element.scrollIntoView({ block: 'start' });
        }
    }, [forrigeÅpneSide]);

    return (
        <>
            {settPåVent && (
                <StyledAlertStripe type="info">
                    Behandlingen er satt på vent. Årsak: {settPåVentÅrsaker[settPåVent.årsak]}.
                    Frist: {formaterIsoDato(settPåVent.frist, datoformat.DATO)}. Fortsett behandling
                    via menyen.
                </StyledAlertStripe>
            )}
            <Container id={'skjemasteg'} className={className} maxWidthStyle={maxWidthStyle}>
                <StyledInnholdstittel children={tittel} />

                {children}

                {feilmelding !== '' && <StyledFeilmelding>{feilmelding}</StyledFeilmelding>}

                <Navigering>
                    {nesteOnClick && skalViseNesteKnapp && (
                        <Knapp
                            type={'hoved'}
                            spinner={senderInn}
                            disabled={senderInn}
                            onClick={() => {
                                if (!senderInn) {
                                    nesteOnClick();
                                }
                            }}
                            mini={true}
                            children={nesteKnappTittel ?? 'Neste'}
                        />
                    )}
                    {forrigeOnClick && skalViseForrigeKnapp && (
                        <Knapp
                            onClick={() => {
                                forrigeOnClick();
                            }}
                            mini={true}
                            children={forrigeKnappTittel ?? 'Forrige'}
                        />
                    )}
                </Navigering>
            </Container>
        </>
    );
};

export default Skjemasteg;
