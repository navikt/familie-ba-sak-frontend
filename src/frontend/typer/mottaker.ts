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
