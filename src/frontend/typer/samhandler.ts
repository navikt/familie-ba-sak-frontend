export interface ISøkSamhandlerInfoRequest {
    navn: string;
}

export interface ISamhandlerInfoRequest {
    orgnr: string;
}

export interface ISamhandlerAdresse {
    adresselinjer: string[];
    postNr: string;
    postSted: string;
    adresseType: string;
}

export interface ISamhandlerInfo {
    tssEksternId: string;
    navn: string;
    adressser: ISamhandlerAdresse[];
}
