import React, { useEffect, useState } from 'react';

import { Collapse } from 'react-collapse';
import styled from 'styled-components';

import { AddCircle, ExpandFilled, CollapseFilled } from '@navikt/ds-icons';
import { Alert, Button } from '@navikt/ds-react';
import { NavdsSpacing14, NavdsSpacing8 } from '@navikt/ds-tokens/dist/tokens';
import type { FeltState } from '@navikt/familie-skjema';
import { hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import {
    useVilkårsvurdering,
    VilkårSubmit,
} from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import type { IBehandling } from '../../../typer/behandling';
import { BehandlingÅrsak } from '../../../typer/behandling';
import { PersonType } from '../../../typer/person';
import type { IPersonResultat, IVilkårConfig, IVilkårResultat } from '../../../typer/vilkår';
import { vilkårConfig, Resultat, annenVurderingConfig, VilkårType } from '../../../typer/vilkår';
import IkonKnapp, { IkonPosisjon } from '../../Felleskomponenter/IkonKnapp/IkonKnapp';
import PersonInformasjon from '../../Felleskomponenter/PersonInformasjon/PersonInformasjon';
import GeneriskAnnenVurdering from './GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import GeneriskVilkår from './GeneriskVilkår/GeneriskVilkår';
import Registeropplysninger from './Registeropplysninger/Registeropplysninger';

interface IVilkårsvurderingSkjema {
    visFeilmeldinger: boolean;
}

const PersonLinje = styled.div`
    display: flex;
    justify-content: space-between;
    position: -webkit-sticky;
    position: sticky;
    top: -1px;
    z-index: 3;
    background-color: white;
    padding: ${NavdsSpacing8} 0;
`;

const IndentertInnhold = styled.div`
    padding-left: ${NavdsSpacing14};
`;

const VilkårDiv = styled.div`
    display: flex;
    align-items: center;

    a.lenke span {
        margin-left: 10px;
    }
`;

const VilkårsvurderingSkjema: React.FunctionComponent<IVilkårsvurderingSkjema> = ({
    visFeilmeldinger,
}) => {
    const { vilkårsvurdering, settVilkårSubmit, postVilkår } = useVilkårsvurdering();
    const {
        erLesevisning,
        erMigreringsbehandling,
        settÅpenBehandling,
        aktivSettPåVent,
        åpenBehandling,
    } = useBehandling();

    const kanLeggeTilUtvidetVilkår =
        erMigreringsbehandling ||
        hentDataFraRessurs(åpenBehandling)?.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
        hentDataFraRessurs(åpenBehandling)?.årsak === BehandlingÅrsak.TEKNISK_ENDRING ||
        hentDataFraRessurs(åpenBehandling)?.årsak === BehandlingÅrsak.KLAGE;

    const personHarIkkevurdertVilkår = (personResultat: IPersonResultat) =>
        personResultat.vilkårResultater.some(
            vilkårResultatFelt => vilkårResultatFelt.verdi.resultat.verdi === Resultat.IKKE_VURDERT
        );

    const hentEkspantdertePersoner = () =>
        vilkårsvurdering.reduce(
            (personMapEkspandert, personResultat) => ({
                ...personMapEkspandert,
                [personResultat.personIdent]:
                    erLesevisning() || personHarIkkevurdertVilkår(personResultat),
            }),
            {}
        );

    const [personErEkspandert, settPersonErEkspandert] = useState<{ [key: string]: boolean }>(
        hentEkspantdertePersoner()
    );

    useEffect(() => {
        settPersonErEkspandert(hentEkspantdertePersoner());
    }, [aktivSettPåVent]);

    const leggTilVilkårUtvidet = (personIdent: string) => {
        const promise = postVilkår(personIdent, VilkårType.UTVIDET_BARNETRYGD);
        promise.then((oppdatertBehandling: Ressurs<IBehandling>) => {
            settVilkårSubmit(VilkårSubmit.NONE);
            if (oppdatertBehandling.status === RessursStatus.SUKSESS) {
                settÅpenBehandling(oppdatertBehandling);
            }
        });
    };

    return (
        <>
            {vilkårsvurdering.map((personResultat: IPersonResultat, index: number) => {
                const andreVurderinger = personResultat.andreVurderinger;
                const harUtvidet = personResultat.vilkårResultater.find(
                    vilkårResultat =>
                        vilkårResultat.verdi.vilkårType === VilkårType.UTVIDET_BARNETRYGD
                );
                return (
                    <div
                        key={`${index}_${personResultat.person.fødselsdato}`}
                        id={`${index}_${personResultat.person.fødselsdato}`}
                    >
                        <PersonLinje>
                            <PersonInformasjon person={personResultat.person} somOverskrift />

                            {!erLesevisning() &&
                                personErEkspandert[personResultat.personIdent] &&
                                personResultat.person.type === PersonType.SØKER &&
                                !harUtvidet &&
                                kanLeggeTilUtvidetVilkår && (
                                    <VilkårDiv>
                                        <IkonKnapp
                                            erLesevisning={erLesevisning()}
                                            id={`${index}_${personResultat.person.fødselsdato}__legg-til-vilkår-utvidet`}
                                            onClick={() =>
                                                leggTilVilkårUtvidet(personResultat.personIdent)
                                            }
                                            label={`Legg til vilkår utvidet barnetrygd`}
                                            mini={true}
                                            ikonPosisjon={IkonPosisjon.VENSTRE}
                                            ikon={
                                                <AddCircle title="Legg til vilkår utvidet barnetrygd" />
                                            }
                                        />
                                    </VilkårDiv>
                                )}

                            <Button
                                id={`vis-skjul-vilkårsvurdering-${index}_${personResultat.person.fødselsdato}}`}
                                variant="tertiary"
                                onClick={() =>
                                    settPersonErEkspandert({
                                        ...personErEkspandert,
                                        [personResultat.personIdent]:
                                            !personErEkspandert[personResultat.personIdent],
                                    })
                                }
                            >
                                {personErEkspandert[personResultat.personIdent] ? (
                                    <>
                                        Skjul vilkårsvurdering
                                        <CollapseFilled />
                                    </>
                                ) : (
                                    <>
                                        Vis vilkårsvurdering
                                        <ExpandFilled />
                                    </>
                                )}
                            </Button>
                        </PersonLinje>

                        <Collapse isOpened={personErEkspandert[personResultat.personIdent]}>
                            <IndentertInnhold>
                                <>
                                    {personResultat.person.registerhistorikk ? (
                                        <Registeropplysninger
                                            opplysninger={personResultat.person.registerhistorikk}
                                        />
                                    ) : (
                                        <Alert
                                            variant="warning"
                                            children={'Klarte ikke hente registeropplysninger'}
                                        />
                                    )}
                                </>
                                {Object.values(vilkårConfig)
                                    .filter((vc: IVilkårConfig) =>
                                        vc.parterDetteGjelderFor.includes(
                                            personResultat.person.type
                                        )
                                    )
                                    .map((vc: IVilkårConfig) => {
                                        const vilkårResultater: FeltState<IVilkårResultat>[] =
                                            personResultat.vilkårResultater.filter(
                                                (vilkårResultat: FeltState<IVilkårResultat>) =>
                                                    vilkårResultat.verdi.vilkårType === vc.key
                                            );

                                        if (
                                            vilkårResultater.length === 0 &&
                                            personResultat.person.type === PersonType.SØKER
                                        )
                                            return undefined;
                                        // For barn ønsker vi alltid å rendre alle vilkår slik at man evt kan legge til tom periode
                                        else
                                            return (
                                                <GeneriskVilkår
                                                    key={`${index}_${personResultat.person.fødselsdato}_${vc.key}`}
                                                    generiskVilkårKey={`${index}_${personResultat.person.fødselsdato}_${vc.key}`}
                                                    person={personResultat.person}
                                                    vilkårResultater={vilkårResultater}
                                                    vilkårFraConfig={vc}
                                                    visFeilmeldinger={visFeilmeldinger}
                                                />
                                            );
                                    })}
                                {andreVurderinger.length > 0 &&
                                    Object.values(annenVurderingConfig)
                                        .filter(annenVurderingConfig =>
                                            annenVurderingConfig.parterDetteGjelderFor.includes(
                                                personResultat.person.type
                                            )
                                        )
                                        .map(annenVurderingConfig => (
                                            <GeneriskAnnenVurdering
                                                key={`${index}_${personResultat.person.fødselsdato}_${annenVurderingConfig.key}`}
                                                person={personResultat.person}
                                                andreVurderinger={personResultat.andreVurderinger}
                                                annenVurderingConfig={annenVurderingConfig}
                                                visFeilmeldinger={visFeilmeldinger}
                                            />
                                        ))}
                            </IndentertInnhold>
                        </Collapse>
                    </div>
                );
            })}
        </>
    );
};

export default VilkårsvurderingSkjema;
