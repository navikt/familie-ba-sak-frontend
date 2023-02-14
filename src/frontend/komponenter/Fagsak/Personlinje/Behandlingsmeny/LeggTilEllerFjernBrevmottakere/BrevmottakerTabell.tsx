import React from 'react';

import styled from 'styled-components';

import { AddCircle, Delete } from '@navikt/ds-icons';
import { Heading, Button } from '@navikt/ds-react';
import { AFontWeightBold } from '@navikt/ds-tokens/dist/tokens';
import CountryData from '@navikt/land-verktoy';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import useLeggTilFjernBrevmottaker, { mottakerVisningsnavn } from './useLeggTilFjernBrevmottaker';
import type { IRestBrevmottaker } from './useLeggTilFjernBrevmottaker';

const FlexDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

const LeggTilKnapp = styled(Button)`
    margin-top: 1rem;
`;

const StyledDiv = styled.div`
    margin-top: 2.5rem;
`;

const DefinitionList = styled.dl`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 10rem 20rem;
    margin-left: 1rem;

    dt {
        font-weight: ${AFontWeightBold};
    }
    dd {
        margin-left: 0;
    }
`;

interface IProps {
    mottaker: IRestBrevmottaker;
    visLeggTilKnapp: boolean;
    leggTilOnClick: () => void;
}

const BrevmottakerTabell: React.FC<IProps> = ({ mottaker, visLeggTilKnapp, leggTilOnClick }) => {
    const { fjernMottaker } = useLeggTilFjernBrevmottaker();
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();
    const land = CountryData.getCountryInstance('nb').findByValue(mottaker.landkode);

    return (
        <StyledDiv>
            <FlexDiv>
                <Heading size="medium" children={mottakerVisningsnavn[mottaker.type]} />
                {!erLesevisning && (
                    <Button
                        variant={'tertiary'}
                        onClick={() => fjernMottaker(mottaker.id)}
                        loading={false}
                        disabled={false}
                        size={'small'}
                        icon={<Delete />}
                    >
                        {'Fjern'}
                    </Button>
                )}
            </FlexDiv>
            <DefinitionList>
                <dt>Navn</dt>
                <dd>{mottaker.navn}</dd>
                <dt>Adresselinje 1</dt>
                <dd>{mottaker.adresselinje1}</dd>
                <dt>Adresselinje 2</dt>
                <dd>{mottaker.adresselinje2 || '-'}</dd>
                <dt>Postnummer</dt>
                <dd>{mottaker.postnummer}</dd>
                <dt>Poststed</dt>
                <dd>{mottaker.poststed}</dd>
                <dt>Land</dt>
                <dd>{land.label}</dd>
            </DefinitionList>
            {!erLesevisning && visLeggTilKnapp && (
                <LeggTilKnapp
                    variant="tertiary"
                    size="small"
                    icon={<AddCircle />}
                    onClick={leggTilOnClick}
                >
                    Legg til ny mottaker
                </LeggTilKnapp>
            )}
        </StyledDiv>
    );
};

export default BrevmottakerTabell;
