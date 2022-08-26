import React, { useEffect, useState } from 'react';

import deepEqual from 'deep-equal';
import styled from 'styled-components';

import { AutomaticSystem, People, Settings } from '@navikt/ds-icons';
import { BodyShort, Table } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import VilkårResultatIkon from '../../../../ikoner/VilkårResultatIkon';
import type { IGrunnlagPerson } from '../../../../typer/person';
import { ToggleNavn } from '../../../../typer/toggles';
import type { IVilkårConfig, IVilkårResultat } from '../../../../typer/vilkår';
import { Resultat, uiResultat } from '../../../../typer/vilkår';
import { datoformat, formaterIsoDato } from '../../../../utils/formatter';
import { periodeToString } from '../../../../utils/kalender';
import { alleRegelverk } from '../../../../utils/vilkår';
import { vilkårFeilmeldingId } from './VilkårTabell';
import VilkårTabellRadEndre from './VilkårTabellRadEndre';

interface IProps {
    person: IGrunnlagPerson;
    vilkårFraConfig: IVilkårConfig;
    vilkårResultat: FeltState<IVilkårResultat>;
    visFeilmeldinger: boolean;
    settFokusPåKnapp: () => void;
}

const BeskrivelseCelle = styled(BodyShort)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 20rem;
`;

const VurderingCelle = styled.div`
    display: flex;
    svg {
        margin-right: 1rem;
    }
`;

const FlexDiv = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    > div:nth-child(n + 2) {
        padding-left: 0.5rem;
    }
`;

const VilkårTabellRad: React.FC<IProps> = ({
    person,
    vilkårFraConfig,
    vilkårResultat,
    visFeilmeldinger,
    settFokusPåKnapp,
}) => {
    const { toggles } = useApp();
    const { erLesevisning, åpenBehandling, aktivSettPåVent } = useBehandling();

    const hentInitiellEkspandering = () =>
        erLesevisning() || vilkårResultat.verdi.resultat.verdi === Resultat.IKKE_VURDERT;

    const [ekspandertVilkår, settEkspandertVilkår] = useState(hentInitiellEkspandering());
    const [redigerbartVilkår, settRedigerbartVilkår] =
        useState<FeltState<IVilkårResultat>>(vilkårResultat);

    useEffect(() => {
        settEkspandertVilkår(hentInitiellEkspandering());
    }, [aktivSettPåVent]);

    const periodeErTom =
        !redigerbartVilkår.verdi.periode.verdi.fom && !redigerbartVilkår.verdi.periode.verdi.tom;

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
            togglePlacement="right"
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
                    settEkspandertVilkår={settEkspandertVilkår}
                    settFokusPåKnapp={settFokusPåKnapp}
                    lesevisning={erLesevisning()}
                />
            }
        >
            <Table.DataCell>
                <VurderingCelle>
                    <VilkårResultatIkon
                        resultat={vilkårResultat.verdi.resultat.verdi}
                        width={20}
                        height={20}
                    />
                    <BodyShort>{uiResultat[vilkårResultat.verdi.resultat.verdi]}</BodyShort>
                </VurderingCelle>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort>
                    {periodeErTom ? '-' : periodeToString(vilkårResultat.verdi.periode.verdi)}
                </BodyShort>
            </Table.DataCell>
            <Table.DataCell>
                <BeskrivelseCelle children={vilkårResultat.verdi.begrunnelse.verdi} />
            </Table.DataCell>
            <Table.DataCell>
                {toggles[ToggleNavn.brukEøs] &&
                    (redigerbartVilkår.verdi.vurderesEtter ? (
                        <FlexDiv>
                            {alleRegelverk[redigerbartVilkår.verdi.vurderesEtter].symbol}
                            <div>{alleRegelverk[redigerbartVilkår.verdi.vurderesEtter].tekst}</div>
                        </FlexDiv>
                    ) : (
                        <FlexDiv>
                            <Settings width={24} height={24} viewBox={'0 0 24 24'} />
                            <div>Generell vurdering</div>
                        </FlexDiv>
                    ))}
            </Table.DataCell>
            <Table.DataCell>
                <FlexDiv>
                    {vilkårResultat.verdi.erAutomatiskVurdert ? (
                        <AutomaticSystem
                            width={24}
                            height={24}
                            aria-labelledby={'Automatisk Vurdering'}
                            viewBox={'0 0 24 24'}
                        />
                    ) : (
                        <People
                            width={24}
                            height={24}
                            aria-labelledby={'ManuellVurdering'}
                            viewBox={'0 0 24 24'}
                        />
                    )}
                    <div>
                        {åpenBehandling.status === RessursStatus.SUKSESS &&
                        vilkårResultat.verdi.erVurdert
                            ? vilkårResultat.verdi.behandlingId === åpenBehandling.data.behandlingId
                                ? 'Vurdert i denne behandlingen'
                                : `Vurdert ${formaterIsoDato(
                                      vilkårResultat.verdi.endretTidspunkt,
                                      datoformat.DATO_FORKORTTET
                                  )}`
                            : ''}
                    </div>
                </FlexDiv>
            </Table.DataCell>
        </Table.ExpandableRow>
    );
};

export default VilkårTabellRad;
