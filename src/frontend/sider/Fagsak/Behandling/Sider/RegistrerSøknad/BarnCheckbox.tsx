import * as React from 'react';

import { BodyShort, Button, Checkbox, HStack } from '@navikt/ds-react';

import Slett from '../../../../../ikoner/Slett';
import {
    sjekkGjelderEnsligMindreårig,
    sjekkGjelderInstitusjon,
    sjekkGjelderSkjermetBarn,
} from '../../../../../typer/fagsak';
import type { IBarnMedOpplysningerBackend } from '../../../../../typer/søknad';
import { hentBarnMedLøpendeUtbetaling } from '../../../../../utils/fagsak';
import { formaterIdent, hentAlderSomString } from '../../../../../utils/formatter';
import { useFagsakContext } from '../../../FagsakContext';
import { useBehandlingContext } from '../../context/BehandlingContext';

interface Props {
    barn: IBarnMedOpplysningerBackend;
}

export function BarnCheckbox({ barn }: Props) {
    const { fagsak } = useFagsakContext();
    const { vurderErLesevisning } = useBehandlingContext();

    const erLesevisning = vurderErLesevisning();

    const harLøpendeUtbetaling = hentBarnMedLøpendeUtbetaling(fagsak).has(barn.ident);
    const gjelderInstitusjon = sjekkGjelderInstitusjon(fagsak);
    const gjelderEnsligMindreårig = sjekkGjelderEnsligMindreårig(fagsak);
    const gjelderSkjermetBarn = sjekkGjelderSkjermetBarn(fagsak);

    const navn = barn.navn ?? 'Navn ukjent';
    const alder = hentAlderSomString(barn.fødselsdato);
    const ident = formaterIdent(barn.ident);

    const navnOgIdentTekst = `${navn} (${alder}) | ${ident} ${harLøpendeUtbetaling ? '(løpende)' : ''}`;

    if (erLesevisning || gjelderInstitusjon || gjelderEnsligMindreårig || gjelderSkjermetBarn) {
        return <BodyShort>{navnOgIdentTekst}</BodyShort>;
    }

    return (
        <HStack gap={'space-8'}>
            <Checkbox value={barn.ident}>{navnOgIdentTekst}</Checkbox>
            {barn.manueltRegistrert && (
                <Button variant={'tertiary'} size={'small'} onClick={() => console.log(barn)} icon={<Slett />}>
                    Fjern barn
                </Button>
            )}
        </HStack>
    );
}
