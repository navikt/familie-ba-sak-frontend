export interface IVerge {
    navn: string;
    adresse: string;
    ident?: string;
}

export interface IInstitusjon {
    navn?: string;
    orgNummer?: string;
    tssEksternId?: string;
}

export interface IRegistrerInstitusjonOgVerge {
    vergeInfo?: IVerge;
    institusjonInfo?: IInstitusjon;
}
