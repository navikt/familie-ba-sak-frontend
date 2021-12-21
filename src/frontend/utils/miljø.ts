export const erProd = () =>
    window.location.host === 'barnetrygd.nais.adeo.no' ||
    window.location.host === 'barnetrygd.intern.nav.no';

export const hentSideHref = (pathname: string) => pathname.split('/')[4];
