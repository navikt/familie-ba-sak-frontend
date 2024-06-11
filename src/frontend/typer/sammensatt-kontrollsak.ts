export interface IRestSammensattKontrollsak {
    id: number;
    behandlingId: number;
    fritekst: string;
}

export interface IRestOpprettSammensattKontrollsak {
    behandlingId: number;
    fritekst: string;
}
