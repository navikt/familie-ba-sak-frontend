import { useBehandlingId } from '@hooks/useBehandlingId';
import { useHentFiltreringsresultater } from '@hooks/useHentFiltreringsresultater';
import VilkårResultatIkon from '@ikoner/VilkårResultatIkon';
import { BodyShort, ErrorMessage, List, LocalAlert, VStack } from '@navikt/ds-react';
import { Filtreringsregel, filtreringsregler } from '@typer/fødselshendelser';

export function Filtreringsreglerliste() {
    const behandlingId = useBehandlingId();

    const { data: filtreringsresultater, error: filtreringsresultaterError } =
        useHentFiltreringsresultater(behandlingId);

    if (filtreringsresultaterError) {
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
