import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import {
    Alert,
    BodyLong,
    Button,
    Heading,
    HStack,
    Modal,
    Spacer,
    Switch,
    Table,
    VStack,
} from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import ValutakursTabellRad from './ValutakursTabellRad';
import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { useEøs } from '../../../../context/Eøs/EøsContext';
import { type IBehandling, VurderingsstrategiForValutakurser } from '../../../../typer/behandling';
import {
    EøsPeriodeStatus,
    type IRestValutakurs,
    Vurderingsform,
} from '../../../../typer/eøsPerioder';
import { ToggleNavn } from '../../../../typer/toggles';

const ValutakurserContainer = styled.div`
    margin-top: 5rem;
`;

const StyledTable = styled(Table)`
    margin-top: 2rem;

    & fieldset.skjemagruppe {
        margin-bottom: 1.5rem;
    }
`;

const StyledAlert = styled(Alert)`
    margin-top: 1rem;
`;

const StyledHeaderCell = styled(Table.HeaderCell)`
    &:nth-of-type(2) {
        width: 11rem;
    }

    &:nth-of-type(3) {
        width: 7.5rem;
    }

    &:nth-of-type(4) {
        width: 14rem;
    }

    &:nth-of-type(5) {
        width: 2.25rem;
    }
`;

interface IProps {
    valutakurser: IRestValutakurs[];
    åpenBehandling: IBehandling;
    visFeilmeldinger: boolean;
}

const Valutakurser: React.FC<IProps> = ({ valutakurser, åpenBehandling, visFeilmeldinger }) => {
    const { erValutakurserGyldige } = useEøs();
    const { toggles } = useApp();
    const { settÅpenBehandling } = useBehandling();
    const { request } = useHttp();
    const månedligValutajusteringToggleErSlåttPå = toggles[ToggleNavn.månedligValutajustering];
    const kanOverstyreAutomatiskeValutakurser =
        toggles[ToggleNavn.kanOverstyreAutomatiskeValutakurser];

    const gjenopprettAutomatiskeValutakurserModalRef = React.useRef<HTMLDialogElement>(null);

    const hentNesteVurderingsstrategi = (
        vurderingsstrategiForValutakurser: VurderingsstrategiForValutakurser | null
    ): VurderingsstrategiForValutakurser => {
        switch (vurderingsstrategiForValutakurser) {
            case VurderingsstrategiForValutakurser.AUTOMATISK:
                return VurderingsstrategiForValutakurser.MANUELL;
            case VurderingsstrategiForValutakurser.MANUELL:
                return VurderingsstrategiForValutakurser.AUTOMATISK;
            case null:
                return VurderingsstrategiForValutakurser.MANUELL;
        }
    };

    const visGjenopprettAutomatiskeValutakurserModal = () => {
        gjenopprettAutomatiskeValutakurserModalRef.current?.showModal();
    };

    const endreVurderingsstrategiForValutakurser = () => {
        const nesteVurderingsstrategi = hentNesteVurderingsstrategi(
            åpenBehandling.vurderingsstrategiForValutakurser
        );

        request<undefined, IBehandling>({
            method: 'PUT',
            url: `/familie-ba-sak/api/differanseberegning/valutakurs/behandlinger/${åpenBehandling.behandlingId}/endre-vurderingsstrategi-til/${nesteVurderingsstrategi}`,
            påvirkerSystemLaster: true,
        }).then((response: Ressurs<IBehandling>) => {
            if (response.status === RessursStatus.SUKSESS) {
                settÅpenBehandling(response);
            }
        });
    };

    const finnesValutaperioderSomKanSkjules =
        valutakurser.length > 1 && månedligValutajusteringToggleErSlåttPå;
    const [visAlleValutaperioder, setVisAlleValutaperioder] = useState(false);
    const erValutakursSomErVurdertAutomatisk = valutakurser.some(
        restValutakurs => restValutakurs.vurderingsform == Vurderingsform.AUTOMATISK
    );

    const erManuellVurderingsstrategiForValutakurser =
        åpenBehandling.vurderingsstrategiForValutakurser ===
        VurderingsstrategiForValutakurser.MANUELL;

    return (
        <ValutakurserContainer>
            <HStack gap="3" wrap={false}>
                <Heading spacing size="medium" level="3">
                    Valuta
                </Heading>
                <Spacer />
                <VStack gap="2">
                    {finnesValutaperioderSomKanSkjules && (
                        <Switch
                            size="small"
                            position="left"
                            id={'vis-alle-valuta-perioder'}
                            checked={visAlleValutaperioder}
                            onChange={() => {
                                setVisAlleValutaperioder(
                                    forrigeVisAlleValutaperioder => !forrigeVisAlleValutaperioder
                                );
                            }}
                        >
                            Vis alle valutaperioder
                        </Switch>
                    )}
                    {kanOverstyreAutomatiskeValutakurser &&
                        (erManuellVurderingsstrategiForValutakurser ||
                            erValutakursSomErVurdertAutomatisk) && (
                            <Button
                                size="xsmall"
                                variant={
                                    erManuellVurderingsstrategiForValutakurser
                                        ? 'danger'
                                        : 'primary'
                                }
                                onClick={() =>
                                    erManuellVurderingsstrategiForValutakurser
                                        ? visGjenopprettAutomatiskeValutakurserModal()
                                        : endreVurderingsstrategiForValutakurser()
                                }
                                id={'endre-vurderingsstrategi-for-valutakurser'}
                            >
                                {erManuellVurderingsstrategiForValutakurser
                                    ? 'Gjenopprett automatiske valutakurser'
                                    : 'Overstyr automatiske valutakurser'}
                            </Button>
                        )}
                </VStack>
            </HStack>
            {!erValutakurserGyldige() && (
                <StyledAlert
                    variant={'warning'}
                    fullWidth
                    children={
                        'For perioder som skal differanseberegnes, må valutakursdato registeres'
                    }
                />
            )}
            <StyledTable>
                <Table.Header>
                    <Table.Row>
                        <StyledHeaderCell scope="col">Barn</StyledHeaderCell>
                        <StyledHeaderCell scope="col">Periode</StyledHeaderCell>
                        <StyledHeaderCell scope="col">Valutakursdato</StyledHeaderCell>
                        <StyledHeaderCell scope="col">Valuta</StyledHeaderCell>
                        <StyledHeaderCell></StyledHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {valutakurser
                        .filter(
                            (valutakurs, index) =>
                                index === 0 ||
                                valutakurs.status !== EøsPeriodeStatus.OK ||
                                !månedligValutajusteringToggleErSlåttPå ||
                                visAlleValutaperioder
                        )
                        .map(valutakurs => (
                            <ValutakursTabellRad
                                key={`${valutakurs.barnIdenter.map(barn => `${barn}-`)}-${
                                    valutakurs.fom
                                }-${valutakurs.tom}`}
                                valutakurs={valutakurs}
                                åpenBehandling={åpenBehandling}
                                visFeilmeldinger={visFeilmeldinger}
                            />
                        ))}
                </Table.Body>
            </StyledTable>

            <Modal
                ref={gjenopprettAutomatiskeValutakurserModalRef}
                header={{ heading: 'Gjenopprett automatiske valutakurser' }}
            >
                <Modal.Body>
                    <BodyLong>
                        Er du sikker på at du vil gjenopprette de automatiske valutakursene? Alle
                        manuelle endringer du har gjort i valutakursene denne behandlingen vil bli
                        slettet.
                    </BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        onClick={() => {
                            endreVurderingsstrategiForValutakurser();
                            gjenopprettAutomatiskeValutakurserModalRef.current?.close();
                        }}
                    >
                        Gjenopprett automatiske valutakurser
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => gjenopprettAutomatiskeValutakurserModalRef.current?.close()}
                    >
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </ValutakurserContainer>
    );
};

export default Valutakurser;
