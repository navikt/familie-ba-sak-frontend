export const erProd = () => window.location.host === 'barnetrygd.nais.adeo.no';

export const hentSideHref = (pathname: string) => pathname.split('/')[4];
