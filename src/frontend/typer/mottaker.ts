export interface IVerge {
    navn: string;
    postaddresse: IPostaddresse;
}

export interface IInstitusjon {
    navn: string;
    orgNummer: string;
    tss?: string;
    postaddresse?: IPostaddresse;
}

interface IPostaddresse {
    addresse: string;
    postnummer: string;
    sted: string;
}

export interface IRegistrerMottaker {
    navn?: string;
    adresse: string;
    postNummer: string;
    ident?: string;
    orgNummer: string;
    tsr: string;
}
