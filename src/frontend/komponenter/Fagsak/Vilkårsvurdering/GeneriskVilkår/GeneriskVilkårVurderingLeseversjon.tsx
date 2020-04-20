import React from 'react';
import { IFelt } from '../../../../typer/felt';
import { IVilkårResultat, Resultat, IVilkårConfig } from '../../../../typer/vilkår';
import { IPerson } from '../../../../typer/person';
import { Element, Normaltekst } from 'nav-frontend-typografi';

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
            <div className={'lese-element'}>
                <Element>
                    {vilkårFraConfig.spørsmål
                        ? vilkårFraConfig.spørsmål(person.type.toLowerCase())
                        : ''}
                </Element>
                <Normaltekst>
                    {vilkårResultat.verdi.resultat.verdi === Resultat.JA
                        ? 'Ja'
                        : vilkårResultat.verdi.resultat.verdi === Resultat.NEI
                        ? 'Nei'
                        : Error('TODO: Håndter - skal ikke skje?')}
                </Normaltekst>
            </div>
            <div className={'lese-element'}>
                <div className={'fastsett-periode__flex'}>
                    <div className={'lese-element'}>
                        <Element children={'F.o.m.'} />
                        <Normaltekst children={vilkårResultat.verdi.periode.verdi.fom ?? '-'} />
                    </div>
                    <div className={'lese-element'}>
                        <Element children={'T.o.m.'} />
                        <Normaltekst children={vilkårResultat.verdi.periode.verdi.tom ?? '-'} />
                    </div>
                </div>
            </div>
            <div className={'lese-element'}>
                <Element children={'Begrunnelse'} />
                <Normaltekst children={vilkårResultat.verdi.begrunnelse.verdi} />
            </div>
        </div>
    );
};

export default GeneriskVilkårVurderingLeseversjon;
