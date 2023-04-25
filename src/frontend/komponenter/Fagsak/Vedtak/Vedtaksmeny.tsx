import * as React from 'react';

import styled from 'styled-components';

import { Calculator, ExpandFilled } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { ASpacing10 } from '@navikt/ds-tokens/dist/tokens';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../typer/behandling';
import { Behandlingstype, BehandlingÅrsak } from '../../../typer/behandling';
import { BehandlingKategori } from '../../../typer/behandlingstema';
import KorrigerEtterbetaling from './KorrigerEtterbetaling/KorrigerEtterbetaling';
import KorrigerVedtak from './KorrigerVedtakModal/KorrigerVedtak';
import EndreEndringstidspunkt from './VedtakBegrunnelserTabell/EndreEndringstidspunkt';

interface IVedtakmenyProps {
    åpenBehandling: IBehandling;
    erBehandlingMedVedtaksbrevutsending: boolean;
    visFeilutbetaltValuta: () => void;
}

const KnappHøyreHjørne = styled(Button)`
    position: absolute;
    top: ${ASpacing10};
    right: ${ASpacing10};
`;

const StyledDropdownMeny = styled(Dropdown.Menu)`
    width: 36ch;
`;

const Vedtaksmeny: React.FunctionComponent<IVedtakmenyProps> = ({
    åpenBehandling,
    erBehandlingMedVedtaksbrevutsending,
    visFeilutbetaltValuta,
}) => {
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    const kanIkkeKorrigereVedtak =
        åpenBehandling.type === Behandlingstype.REVURDERING &&
        [BehandlingÅrsak.KLAGE, BehandlingÅrsak.DØDSFALL_BRUKER].includes(åpenBehandling.årsak);

    return (
        <Dropdown>
            <KnappHøyreHjørne
                forwardedAs={Dropdown.Toggle}
                size="small"
                variant="secondary"
                icon={<ExpandFilled />}
                iconPosition="right"
            >
                Vedtaksmeny
            </KnappHøyreHjørne>
            <StyledDropdownMeny>
                <Dropdown.Menu.List>
                    {erBehandlingMedVedtaksbrevutsending && (
                        <>
                            <KorrigerEtterbetaling
                                erLesevisning={erLesevisning}
                                korrigertEtterbetaling={åpenBehandling.korrigertEtterbetaling}
                                behandlingId={åpenBehandling.behandlingId}
                            />
                            {(!kanIkkeKorrigereVedtak || åpenBehandling.korrigertVedtak) && (
                                <KorrigerVedtak
                                    erLesevisning={erLesevisning}
                                    korrigertVedtak={åpenBehandling.korrigertVedtak}
                                    behandlingId={åpenBehandling.behandlingId}
                                />
                            )}
                        </>
                    )}
                    {åpenBehandling.endringstidspunkt && (
                        <EndreEndringstidspunkt åpenBehandling={åpenBehandling} />
                    )}
                    {åpenBehandling.type === Behandlingstype.REVURDERING &&
                        åpenBehandling.kategori === BehandlingKategori.EØS && (
                            <Dropdown.Menu.List.Item onClick={visFeilutbetaltValuta}>
                                <Calculator />
                                Legg til feilutbetalt valuta og sats
                            </Dropdown.Menu.List.Item>
                        )}
                </Dropdown.Menu.List>
            </StyledDropdownMeny>
        </Dropdown>
    );
};

export default Vedtaksmeny;
