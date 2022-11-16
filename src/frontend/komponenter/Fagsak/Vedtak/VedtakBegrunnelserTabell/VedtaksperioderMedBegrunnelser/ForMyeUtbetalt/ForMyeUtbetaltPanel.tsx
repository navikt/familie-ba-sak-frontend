import React, { useState } from 'react';

import styled, { css } from 'styled-components';

import { Delete } from '@navikt/ds-icons';
import { Alert, Button, Label } from '@navikt/ds-react';
import type { ISODateString } from '@navikt/familie-form-elements';
import { FamilieDatovelger, FamilieInput } from '@navikt/familie-form-elements';

import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../../typer/vedtaksperiode';
import { datoformatNorsk } from '../../../../../../utils/formatter';
import { useVedtaksperiodeMedBegrunnelser } from '../../Context/VedtaksperiodeMedBegrunnelserContext';
import Utbetalingsresultat from '../../Felles/Utbetalingsresultat';
import EkspanderbartBegrunnelsePanel from '../EkspanderbartBegrunnelsePanel';

interface IProps {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
}

const baseSkjemaelementStyle = css`
    margin-bottom: 1.5rem;
`;

const FlexDiv = styled.div`
    ${baseSkjemaelementStyle}
    margin-top: 0.5rem;
    width: 23rem;
    display: flex;
    justify-content: space-between;
`;

const StyledFamilieInput = styled(FamilieInput)`
    ${baseSkjemaelementStyle};
    width: 7.5rem;
    .navds-label {
        width: 18rem;
    }
    .navds-text-field__input {
        width: 11rem;
    }
`;

const AvbrytKnapp = styled(Button)`
    margin: 0.5rem 1rem 0.5rem 1rem;
`;

const Knapperad = styled.div`
    width: 100%;
    position: relative;
    display: inline-block;
`;

const KnappHøyre = styled(Button)`
    float: right;
    margin: 0.5rem 1rem 0.5rem 1rem;
`;

const ForMyeUtbetaltPanel: React.FC<IProps> = ({ vedtaksperiodeMedBegrunnelser }) => {
    const { erPanelEkspandert, onPanelClose } = useVedtaksperiodeMedBegrunnelser();
    const [fomDato, settFomDato] = useState<ISODateString | undefined>();
    const [tomDato, settTomDato] = useState<ISODateString | undefined>();
    const [beløp, settBeløp] = useState<string | undefined>();

    const leggTilPeriode = () => {
        console.log('');
    };
    const avbryt = () => {
        console.log('');
    };

    return (
        <EkspanderbartBegrunnelsePanel
            vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
            åpen={erPanelEkspandert}
            onClick={() => onPanelClose(true)}
        >
            <Utbetalingsresultat
                utbetalingsperiodeDetaljer={
                    vedtaksperiodeMedBegrunnelser.utbetalingsperiodeDetaljer
                }
            />
            <Label>Angi periode med feilutbetalt beløp</Label>

            <FlexDiv>
                <FamilieDatovelger
                    allowInvalidDateSelection={false}
                    limitations={{
                        maxDate: new Date().toISOString(),
                    }}
                    erLesesvisning={false}
                    id={`for-mye-utbetalt-fom`}
                    label={'F.o.m'}
                    placeholder={datoformatNorsk.DATO}
                    onChange={(dato?: ISODateString) => {
                        settFomDato(dato);
                    }}
                    valgtDato={fomDato}
                />
                <FamilieDatovelger
                    allowInvalidDateSelection={false}
                    limitations={{
                        maxDate: new Date().toISOString(),
                    }}
                    erLesesvisning={false}
                    id={`for-mye-utbetalt-tom`}
                    label={'T.o.m'}
                    placeholder={datoformatNorsk.DATO}
                    onChange={(dato?: ISODateString) => {
                        settTomDato(dato);
                    }}
                    valgtDato={tomDato}
                />
            </FlexDiv>
            <StyledFamilieInput
                label={'Hvor mye er utbetalt feil i perioden?'}
                id={'korrigering-belop'}
                type={'number'}
                value={beløp}
                onChange={changeEvent => settBeløp(changeEvent.target.value)}
                error={''}
                erLesevisning={false}
            />
            <Alert variant="info" style={{ marginBottom: '1.5rem' }} inline>
                Husk å sende melding til NØS
            </Alert>

            <Knapperad>
                <Button
                    onClick={leggTilPeriode}
                    variant={'primary'}
                    // loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                    // disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                >
                    {'Legg til periode'}
                </Button>
                <AvbrytKnapp
                    id={'avbryt'}
                    size={'small'}
                    onClick={avbryt}
                    variant={'tertiary'}
                    loading={false}
                    disabled={false}
                >
                    Avbryt
                </AvbrytKnapp>
                <KnappHøyre
                    id={'fjern-for-mye-utbetalt-periode'}
                    size={'small'}
                    onClick={avbryt}
                    variant={'tertiary'}
                    loading={false}
                    disabled={false}
                    icon={<Delete />}
                >
                    Fjern
                </KnappHøyre>
            </Knapperad>

            {/*{genererteBrevbegrunnelser.status === RessursStatus.SUKSESS &&*/}
            {/*    genererteBrevbegrunnelser.data.length > 0 && (*/}
            {/*        <>*/}
            {/*            <Label>Begrunnelse(r)</Label>*/}
            {/*            <ul>*/}
            {/*                {genererteBrevbegrunnelser.data.map(*/}
            {/*                    (begrunnelse: string, index: number) => (*/}
            {/*                        <li key={`begrunnelse-${index}`}>*/}
            {/*                            <BodyShort children={begrunnelse}/>*/}
            {/*                        </li>*/}
            {/*                    )*/}
            {/*                )}*/}
            {/*            </ul>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*{genererteBrevbegrunnelser.status === RessursStatus.FEILET && (*/}
            {/*    <>*/}
            {/*        <ErrorMessage>{genererteBrevbegrunnelser.frontendFeilmelding}</ErrorMessage>*/}
            {/*    </>*/}
            {/*)}*/}
        </EkspanderbartBegrunnelsePanel>
    );
};
export default ForMyeUtbetaltPanel;
