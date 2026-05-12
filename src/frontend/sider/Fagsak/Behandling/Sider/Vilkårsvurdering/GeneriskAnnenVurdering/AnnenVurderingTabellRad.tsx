import { useState } from 'react';

import { useErLesevisning } from '@hooks/useErLesevisning';
import type { IGrunnlagPerson } from '@typer/person';
import type { IAnnenVurdering, IAnnenVurderingConfig } from '@typer/vilkår';
import { Resultat, resultatVisningsnavn } from '@typer/vilkår';
import deepEqual from 'deep-equal';

import { PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, Table } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';

import AnnenVurderingRadEndre from './AnnenVurderingRadEndre';
import { annenVurderingFeilmeldingId } from './AnnenVurderingTabell';
import Styles from './AnnenVurderingTabellRad.module.css';
import VilkårResultatIkon from '../../../../../../ikoner/VilkårResultatIkon';

interface Props {
    person: IGrunnlagPerson;
    annenVurderingConfig: IAnnenVurderingConfig;
    annenVurdering: FeltState<IAnnenVurdering>;
    visFeilmeldinger: boolean;
}

export function AnnenVurderingTabellRad({ person, annenVurderingConfig, visFeilmeldinger, annenVurdering }: Props) {
    const erLesevisning = useErLesevisning();

    const [ekspandertAnnenVurdering, settEkspandertAnnenVurdering] = useState(
        erLesevisning || annenVurdering.verdi.resultat.verdi === Resultat.IKKE_VURDERT
    );
    const [redigerbartAnnenVurdering, settRedigerbartAnnenVurdering] =
        useState<FeltState<IAnnenVurdering>>(annenVurdering);

    const toggleForm = (visAlert: boolean) => {
        if (ekspandertAnnenVurdering && visAlert && !deepEqual(annenVurdering, redigerbartAnnenVurdering)) {
            alert('Vurderingen har endringer som ikke er lagret!');
        } else {
            settEkspandertAnnenVurdering(!ekspandertAnnenVurdering);
            settRedigerbartAnnenVurdering(annenVurdering);
        }
    };

    return (
        <Table.ExpandableRow
            open={ekspandertAnnenVurdering}
            togglePlacement={'right'}
            onOpenChange={() => toggleForm(true)}
            id={annenVurderingFeilmeldingId(annenVurdering.verdi)}
            content={
                <AnnenVurderingRadEndre
                    person={person}
                    annenVurderingConfig={annenVurderingConfig}
                    annenVurdering={annenVurdering}
                    visFeilmeldinger={visFeilmeldinger}
                    toggleForm={toggleForm}
                    redigerbartAnnenVurdering={redigerbartAnnenVurdering}
                    settRedigerbartAnnenVurdering={settRedigerbartAnnenVurdering}
                    settEkspandertAnnenVurdering={settEkspandertAnnenVurdering}
                />
            }
        >
            <Table.DataCell>
                <HStack justify={'start'} align={'center'} gap={'space-6'} wrap={false}>
                    <VilkårResultatIkon resultat={annenVurdering.verdi.resultat.verdi} />
                    <BodyShort>{resultatVisningsnavn[annenVurdering.verdi.resultat.verdi]}</BodyShort>
                </HStack>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort className={Styles.beskrivelse}>{annenVurdering.verdi.begrunnelse.verdi}</BodyShort>
            </Table.DataCell>
            <Table.DataCell>
                {annenVurdering.verdi.erVurdert && (
                    <HStack justify={'start'} align={'center'} gap={'space-6'} wrap={false}>
                        <PersonIcon title={'Manuell vurdering'} className={Styles.ikon} />
                        <BodyShort>Vurdert i denne behandlingen</BodyShort>
                    </HStack>
                )}
            </Table.DataCell>
        </Table.ExpandableRow>
    );
}
