import { useState } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useVilkårResultatPanel } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/VilkårResultatPanelerContext';
import type { IGrunnlagPerson } from '@typer/person';
import { type IVilkårConfig, type IVilkårResultat, Resultat, resultatVisningsnavn } from '@typer/vilkår';
import { isoDatoPeriodeTilFormatertString } from '@utils/dato';
import { alleRegelverk } from '@utils/vilkår';
import deepEqual from 'deep-equal';

import { CogIcon, CogRotationIcon, PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, Table, Tooltip } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';

import { vilkårFeilmeldingId } from './VilkårTabell';
import Styles from './VilkårTabellRad.module.css';
import VilkårTabellRadEndre from './VilkårTabellRadEndre';
import VilkårResultatIkon from '../../../../../../ikoner/VilkårResultatIkon';

interface Props {
    person: IGrunnlagPerson;
    vilkårFraConfig: IVilkårConfig;
    vilkårResultat: FeltState<IVilkårResultat>;
    visFeilmeldinger: boolean;
    settFokusPåKnapp: () => void;
}

export function VilkårTabellRad({
    person,
    vilkårFraConfig,
    vilkårResultat,
    visFeilmeldinger,
    settFokusPåKnapp,
}: Props) {
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();

    const id = vilkårResultat.verdi.id;
    const vilkårResultatVerdi = vilkårResultat.verdi.resultat.verdi;
    const vilkårResultatbegrunnelse = vilkårResultat.verdi.resultatBegrunnelse;

    const { erVilkårResultatEkspandert, åpneVilkårResultat, lukkVilkårResultat } = useVilkårResultatPanel(id);

    const [redigerbartVilkår, settRedigerbartVilkår] = useState<FeltState<IVilkårResultat>>(vilkårResultat);

    const periodeErTom = !redigerbartVilkår.verdi.periode.verdi.fom && !redigerbartVilkår.verdi.periode.verdi.tom;

    const toggleForm = (visAlert: boolean) => {
        if (erVilkårResultatEkspandert && visAlert && !deepEqual(vilkårResultat, redigerbartVilkår)) {
            alert('Vurderingen har endringer som ikke er lagret!');
        } else {
            if (erVilkårResultatEkspandert) {
                lukkVilkårResultat();
            } else {
                åpneVilkårResultat();
            }
            settRedigerbartVilkår(vilkårResultat);
        }
    };

    return (
        <Table.ExpandableRow
            key={`${id}-${erVilkårResultatEkspandert ? 'ekspandert' : 'lukket'}`} // Pga. React.Activity ikke fungerer så bra med Aksel her, se https://github.com/navikt/aksel/issues/4971
            open={erVilkårResultatEkspandert}
            togglePlacement={'right'}
            onOpenChange={() => toggleForm(true)}
            id={vilkårFeilmeldingId(vilkårResultat.verdi)}
            content={
                <VilkårTabellRadEndre
                    person={person}
                    vilkårFraConfig={vilkårFraConfig}
                    vilkårResultat={vilkårResultat}
                    visFeilmeldinger={visFeilmeldinger}
                    toggleForm={toggleForm}
                    redigerbartVilkår={redigerbartVilkår}
                    settRedigerbartVilkår={settRedigerbartVilkår}
                    settFokusPåKnapp={settFokusPåKnapp}
                    lesevisning={erLesevisning}
                />
            }
        >
            <Table.DataCell className={Styles.celle}>
                <HStack justify={'start'} align={'center'} gap={'space-6'} wrap={false}>
                    <VilkårResultatIkon
                        resultat={vilkårResultatVerdi}
                        resultatBegrunnelse={vilkårResultatbegrunnelse}
                    />
                    <BodyShort>
                        {vilkårResultatVerdi === Resultat.OPPFYLT && vilkårResultatbegrunnelse
                            ? resultatVisningsnavn[vilkårResultatbegrunnelse]
                            : resultatVisningsnavn[vilkårResultatVerdi]}
                    </BodyShort>
                </HStack>
            </Table.DataCell>
            <Table.DataCell className={Styles.celle}>
                <BodyShort>
                    {periodeErTom ? '-' : isoDatoPeriodeTilFormatertString(vilkårResultat.verdi.periode.verdi)}
                </BodyShort>
            </Table.DataCell>
            <Table.DataCell className={Styles.celle}>
                {vilkårResultat.verdi.begrunnelse.verdi && (
                    <Tooltip content={vilkårResultat.verdi.begrunnelse.verdi} className={Styles.tooltip}>
                        <BodyShort className={Styles.beskrivelse}>{vilkårResultat.verdi.begrunnelse.verdi}</BodyShort>
                    </Tooltip>
                )}
            </Table.DataCell>
            <Table.DataCell className={Styles.celle}>
                <HStack justify={'start'} align={'center'} gap={'space-6'} wrap={false}>
                    {redigerbartVilkår.verdi.vurderesEtter ? (
                        <>
                            {alleRegelverk[redigerbartVilkår.verdi.vurderesEtter].symbol}
                            <BodyShort>{alleRegelverk[redigerbartVilkår.verdi.vurderesEtter].tekst}</BodyShort>
                        </>
                    ) : (
                        <>
                            <CogIcon title={'Generell vurdering'} className={Styles.ikon} />
                            <BodyShort>Generell vurdering</BodyShort>
                        </>
                    )}
                </HStack>
            </Table.DataCell>
            <Table.DataCell className={Styles.celle}>
                <HStack justify={'start'} align={'center'} gap={'space-6'} wrap={false}>
                    {vilkårResultat.verdi.erAutomatiskVurdert ? (
                        <CogRotationIcon title={'Automatisk Vurdering'} className={Styles.ikon} />
                    ) : (
                        <PersonIcon title={'Manuell vurdering'} className={Styles.ikon} />
                    )}
                    <BodyShort>
                        {vilkårResultat.verdi.erVurdert
                            ? vilkårResultat.verdi.behandlingId === behandling.behandlingId
                                ? 'Vurdert i denne behandlingen'
                                : 'Vurdert i tidligere behandling'
                            : ''}
                    </BodyShort>
                </HStack>
            </Table.DataCell>
        </Table.ExpandableRow>
    );
}
