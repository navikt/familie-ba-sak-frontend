import React, { useState } from 'react';

import styled, { css } from 'styled-components';

import { Delete } from '@navikt/ds-icons';
import { Button, Label } from '@navikt/ds-react';
import type { ISODateString } from '@navikt/familie-form-elements';
import { FamilieDatovelger, FamilieInput } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';

import { datoformatNorsk } from '../../../../../../utils/formatter';
import type { YearMonth } from '../../../../../../utils/kalender';
import EkspanderbartBegrunnelsePanel from '../EkspanderbartBegrunnelsePanel';
import type { ITrekkILøpendeUtbetaling } from './ITrekkILøpendeUtbetaling';
import { useTrekkILøpendeUtbetalingProvider } from './TrekkILøpendeUtbetalingProvider';

interface IProps {
    trekkILøpendeUtbetaling: ITrekkILøpendeUtbetaling;
    fjern: () => void;
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

const TrekkILøpendeUtbetalingPanel: React.FC<IProps> = ({ trekkILøpendeUtbetaling, fjern }) => {
    const { erPanelEkspandert, onPanelClose } = useTrekkILøpendeUtbetalingProvider();
    const [fomDato, settFomDato] = useState<YearMonth | undefined>();
    const [tomDato, settTomDato] = useState<YearMonth | undefined>();
    const [beløp, settBeløp] = useState<string | undefined>();
    const { request } = useHttp();

    const leggTilPeriode = async () => {
        await request<ITrekkILøpendeUtbetaling, void>({
            method: 'POST',
            url: `/familie-ba-sak/api/trekk-i-loepende-utbetaling`,
            data: {
                ...trekkILøpendeUtbetaling,
                fom: fomDato,
                tom: tomDato,
                feilutbetaltBeløp: Number(beløp || 0),
            },
        });
    };
    const avbryt = () => {
        console.log('');
    };

    const periode = {
        fom: fomDato,
        tom: tomDato,
    };

    return (
        <EkspanderbartBegrunnelsePanel
            åpen={erPanelEkspandert}
            onClick={() => onPanelClose(false)} // TODO
            periode={periode}
            skalViseSum={true}
            summer={() => Number(beløp || 0)}
            tittel={undefined}
        >
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
                    onClick={fjern}
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
export default TrekkILøpendeUtbetalingPanel;
