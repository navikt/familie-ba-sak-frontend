import { useEffect, useState } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import type { IGrunnlagPerson } from '@typer/person';
import type { IVilkårConfig, IVilkårResultat } from '@typer/vilkår';
import { Resultat, resultatVisningsnavn } from '@typer/vilkår';
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

    const vilkårResultatVerdi = vilkårResultat.verdi.resultat.verdi;
    const vilkårResultatbegrunnelse = vilkårResultat.verdi.resultatBegrunnelse;

    const hentInitiellEkspandering = () => erLesevisning || vilkårResultatVerdi === Resultat.IKKE_VURDERT;

    const [ekspandertVilkår, settEkspandertVilkår] = useState(hentInitiellEkspandering());
    const [redigerbartVilkår, settRedigerbartVilkår] = useState<FeltState<IVilkårResultat>>(vilkårResultat);

    const aktivSettPåVent = behandling.aktivSettPåVent;

    useEffect(() => {
        settEkspandertVilkår(hentInitiellEkspandering());
    }, [aktivSettPåVent]);

    const periodeErTom = !redigerbartVilkår.verdi.periode.verdi.fom && !redigerbartVilkår.verdi.periode.verdi.tom;

    const toggleForm = (visAlert: boolean) => {
        if (ekspandertVilkår && visAlert && !deepEqual(vilkårResultat, redigerbartVilkår)) {
            alert('Vurderingen har endringer som ikke er lagret!');
        } else {
            settEkspandertVilkår(!ekspandertVilkår);
            settRedigerbartVilkår(vilkårResultat);
        }
    };

    return (
        <Table.ExpandableRow
            open={ekspandertVilkår}
            togglePlacement={'right'}
            onOpenChange={() => toggleForm(true)}
            id={vilkårFeilmeldingId(vilkårResultat.verdi)}
            content={
                <VilkårTabellRadEndre
                    key={`${vilkårResultat.verdi.id}-${ekspandertVilkår ? 'ekspandert' : 'lukket'}`}
                    person={person}
                    vilkårFraConfig={vilkårFraConfig}
                    vilkårResultat={vilkårResultat}
                    visFeilmeldinger={visFeilmeldinger}
                    toggleForm={toggleForm}
                    redigerbartVilkår={redigerbartVilkår}
                    settRedigerbartVilkår={settRedigerbartVilkår}
                    settEkspandertVilkår={settEkspandertVilkår}
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
