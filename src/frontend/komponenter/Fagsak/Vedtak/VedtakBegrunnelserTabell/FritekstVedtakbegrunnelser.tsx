import React from 'react';

import KnappBase from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import { FamilieInput } from '@navikt/familie-form-elements';
import { FeltState, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { IFagsak } from '../../../../typer/fagsak';
import { IRestPostFritekstVedtakBegrunnelser } from '../../../../typer/vedtak';
import { Vedtaksperiode } from '../../../../typer/vedtaksperiode';
import useFritekstVedtakBegrunnelser from './useFritekstVedtakBegrunnelser';

interface IProps {
    vedtaksperiode: Vedtaksperiode;
}

const FritekstVedtakbegrunnelser: React.FC<IProps> = ({ vedtaksperiode }) => {
    const { erLesevisning } = useBehandling();
    const { fritekster, settFritekster, leggTilFritekst, onSubmit } = useFritekstVedtakBegrunnelser(
        vedtaksperiode
    );

    console.log(Object.keys(fritekster));
    return (
        <SkjemaGruppe>
            {Object.keys(fritekster).map((fritekstId: string, index) => {
                return (
                    <FamilieInput
                        key={fritekstId}
                        value={fritekster[fritekstId].verdi}
                        feil={fritekster[fritekstId].feilmelding ?? undefined}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            settFritekster({
                                ...fritekster,
                                [fritekstId]: fritekster[fritekstId].valider({
                                    ...fritekster[fritekstId],
                                    verdi: event.target.value,
                                }),
                            });
                        }}
                        erLesevisning={erLesevisning()}
                        id={`kulepunkt-${index}`}
                        label={'Fritekst'}
                        bredde={'XL'}
                        placeholder={'Kulepunkt'}
                    />
                );
            })}

            <KnappBase onClick={leggTilFritekst}>Legg til</KnappBase>

            <KnappBase onClick={onSubmit}>Lagre</KnappBase>
        </SkjemaGruppe>
    );
};

export default FritekstVedtakbegrunnelser;
