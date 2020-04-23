import React from 'react';
import { IFelt } from '../../../../typer/felt';
import { IVilkårResultat, Resultat, IVilkårConfig } from '../../../../typer/vilkår';
import { IPerson } from '../../../../typer/person';
import Lesefelt from '../../../Felleskomponenter/InputMedLesevisning/Lesefelt';

interface IProps {
    person: IPerson;
    vilkårFraConfig: IVilkårConfig;
    vilkårResultat: IFelt<IVilkårResultat>;
}

const GeneriskVilkårVurderingLeseversjon: React.FC<IProps> = ({
    person,
    vilkårFraConfig,
    vilkårResultat,
}) => {
    return (
        <div className={'generisk-vilkår__ekspandert'}>
            <Lesefelt
                label={
                    vilkårFraConfig.spørsmål
                        ? vilkårFraConfig.spørsmål(person.type.toLowerCase())
                        : ''
                }
                verdi={
                    vilkårResultat.verdi.resultat.verdi === Resultat.JA
                        ? 'Ja'
                        : vilkårResultat.verdi.resultat.verdi === Resultat.NEI
                        ? 'Nei'
                        : '' // TODO: Unøvendig å sjekke NEI?
                }
            />
            <div className={'fastsett-periode__flex'}>
                <Lesefelt label={'F.o.m.'} verdi={vilkårResultat.verdi.periode.verdi.fom ?? '-'} />
                <Lesefelt label={'T.o.m.'} verdi={vilkårResultat.verdi.periode.verdi.tom ?? '-'} />
            </div>
            <Lesefelt label={'Begrunnelse'} verdi={vilkårResultat.verdi.begrunnelse.verdi} />
        </div>
    );
};

export default GeneriskVilkårVurderingLeseversjon;
