import React from 'react';

import KnappBase from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import { FamilieInput } from '@navikt/familie-form-elements';
import { FeltState, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { IFagsak } from '../../../../typer/fagsak';
import { Vedtaksperiode } from '../../../../typer/vedtaksperiode';
import { IRestPostFritekstVedtakBegrunnelse } from '../../../../typer/vedtak';

interface IProps {
    vedtaksperiode: Vedtaksperiode;
}

const FritekstVedtakbegrunnelser: React.FC<IProps> = ({ vedtaksperiode }) => {
    const { fagsak, settFagsak } = useFagsakRessurser();
    const { erLesevisning } = useBehandling();
    const initialFelt = useFelt<string>({
        verdi: '',
        valideringsfunksjon: (felt: FeltState<string>) => ok(felt),
    });
    const { skjema, onSubmit } = useSkjema<
        {
            fritekst: string;
        },
        IFagsak
    >({
        felter: {
            fritekst: initialFelt,
        },
        skjemanavn: 'fritekster',
    });

    return (
        <SkjemaGruppe>
            <FamilieInput
                {...initialFelt.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={erLesevisning()}
                id={'hent-person'}
                label={'Fritekst'}
                bredde={'XL'}
                placeholder={'Kulepunkt'}
            />

            <KnappBase
                onClick={() => {
                    if (fagsak.status === RessursStatus.SUKSESS) {
                        onSubmit<IRestPostFritekstVedtakBegrunnelse>(
                            {
                                method: 'POST',
                                url: `/familie-ba-sak/api/fagsaker/${fagsak.data.id}/vedtak/begrunnelser/fritekst`,
                                data: {
                                    fom: vedtaksperiode.periodeFom,
                                    tom: vedtaksperiode.periodeTom,
                                    fritekst: skjema.felter.fritekst.verdi,
                                    vedtaksperiodetype: vedtaksperiode.vedtaksperiodetype,
                                },
                            },
                            (ressurs: Ressurs<IFagsak>) => {
                                settFagsak(ressurs);
                            }
                        );
                    }
                }}
            >
                Lagre
            </KnappBase>
        </SkjemaGruppe>
    );
};

export default FritekstVedtakbegrunnelser;
