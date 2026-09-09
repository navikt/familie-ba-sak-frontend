import { useBehandling } from '@hooks/useBehandling';
import { useFagsakId } from '@hooks/useFagsakId';
import { useHentFiltreringsresultater } from '@hooks/useHentFiltreringsresultater';
import { BodyShort, ErrorMessage, List, LocalAlert, VStack } from '@navikt/ds-react';
import { BehandlingSteg } from '@typer/behandling';
import { Filtreringsregel, filtreringsregler } from '@typer/fødselshendelser';
import { useNavigate } from 'react-router';

import VilkårResultatIkon from '../../../../../ikoner/VilkårResultatIkon';
import Skjemasteg from '../Skjemasteg';

const Filtreringsregler = () => {
    const fagsakId = useFagsakId();
    const behandling = useBehandling();
    const navigate = useNavigate();

    return (
        <Skjemasteg
            skalViseForrigeKnapp={false}
            tittel={'Filtreringsregler'}
            nesteOnClick={() => {
                navigate(`/fagsak/${fagsakId}/${behandling.behandlingId}/vilkaarsvurdering`);
            }}
            maxWidthStyle={'80rem'}
            senderInn={false}
            steg={BehandlingSteg.FILTRERING_AUTOMATISK_BEHANDLING}
        >
            <Filtreringsreglerliste behandlingId={behandling.behandlingId} />
        </Skjemasteg>
    );
};

function Filtreringsreglerliste({ behandlingId }: { behandlingId: number }) {
    const { data: filtreringsresultater, error: filtreringsresultaterError } =
        useHentFiltreringsresultater(behandlingId);

    if (filtreringsresultaterError && filtreringsresultater === undefined) {
        return (
            <LocalAlert status={'error'}>
                <LocalAlert.Header>
                    <LocalAlert.Title>En teknisk feil oppstod.</LocalAlert.Title>
                </LocalAlert.Header>
                <LocalAlert.Content>
                    <VStack gap={'space-16'}>
                        Klarte ikke å hente inn filtreringsreglene.
                        <ErrorMessage>{filtreringsresultaterError.message}</ErrorMessage>
                    </VStack>
                </LocalAlert.Content>
            </LocalAlert>
        );
    }

    if (filtreringsresultater === undefined) {
        return null;
    }

    return (
        <List>
            {Object.keys(Filtreringsregel).map(filtreringsregel => {
                const filtreringsresultat = filtreringsresultater.find(it => it.filtreringsregel === filtreringsregel);

                if (!filtreringsresultat) return null;

                return (
                    <List.Item
                        aria-hidden
                        icon={<VilkårResultatIkon resultat={filtreringsresultat.resultat} />}
                        key={filtreringsregel}
                    >
                        <BodyShort>{filtreringsregler[filtreringsresultat.filtreringsregel]}</BodyShort>
                    </List.Item>
                );
            })}
        </List>
    );
}

export default Filtreringsregler;
