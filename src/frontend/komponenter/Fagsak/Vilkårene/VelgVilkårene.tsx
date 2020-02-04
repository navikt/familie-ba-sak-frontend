import * as React from 'react';
import { IFagsak } from '../../../typer/fagsak';
import { useHistory } from 'react-router';
import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import { CheckboksPanel, RadioPanelGruppe, Checkbox, CheckboksPanelGruppe, TextareaControlled } from 'nav-frontend-skjema';


interface IProps {
    fagsak: IFagsak;
}

const VelgVilkårene: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const history = useHistory();
    const [fyltvilkår, settFyltvilkår]= React.useState(true);
    const [seksjon2Tikket, settSeksjon2Tikket]= React.useState(false);
    const [seksjon4Tikket, settSeksjon4Tikket]= React.useState(false);
    const [seksjon11Tikket, settSeksjon11Tikket]= React.useState(false);
    const [begrunnelse, settBegrunnelse]= React.useState('');

    return (
        <div className={'vilkårene'}>
            <Systemtittel children={'Inngangsvilkår'} />

            <br/>
            <RadioPanelGruppe
                name={'inngangsvilkår'}
                legend={'Inngangsvikår for barnetrygd'}
                radios={[
                    { label: 'Inngangsvilkårene er oppfylt', value: 'oppfylt'},
                    { label: 'Inngangsvilkårene er ikke oppfylt', value: 'ikkeoppfylt'},
                ]}
                checked={fyltvilkår? 'oppfylt': 'ikkeoppfylt'}
                onChange={(evt:{}, value: string)=>{
                    settFyltvilkår(value==='oppfylt')
                }}
            />

            <br/>
            <CheckboksPanelGruppe
                    legend={'Velg hjemler for vurderingen'}
                    checkboxes={[
                        {
                            checked: seksjon2Tikket,
                            label: '§2,under 18 år, bor med søker',
                            value: 'seksjon2',
                        },
                        {
                            checked: seksjon4Tikket,
                            label: '§4,bosatt i riket',
                            value: 'seksjon4',
                        },
                        {
                            checked: seksjon11Tikket,
                            label: '§11,støndadsperiode',
                            value: 'seksjon11',
                        },
                    ]}
                    onChange={(event: React.SyntheticEvent<EventTarget>, value?: string) => {
                        if(value=== 'seksjon2'){
                            settSeksjon2Tikket(!seksjon2Tikket)
                        }else if(value=== 'seksjon4'){
                            settSeksjon4Tikket(!seksjon4Tikket)
                        }else if(value=== 'seksjon11'){
                            settSeksjon11Tikket(!settSeksjon11Tikket)
                        }
                    }}
            />

            <br/>
            <TextareaControlled 
                label={'Begrunnelse'}
                maxLength={0}
                defaultValue={begrunnelse}
                onBlur={(evt:any)=>{
                    settBegrunnelse(evt.target.value)
                }}
            />
            
            <br/>
            <div className={'fastsett__navigering'}>
                <Knapp
                    type={'hoved'}
                    onClick={() => {
                        history.push(`/fagsak/opprett`);
                    }}
                    children={'Tilbake'}
                />
                <Knapp
                    type={'hoved'}
                    onClick={() => {
                    }}
                    children={'Neste'}
                />
            </div>
        </div>
    );
}

export default VelgVilkårene;