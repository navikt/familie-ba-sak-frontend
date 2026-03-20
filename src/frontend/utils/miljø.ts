const env = import.meta.env.MODE;

export const erLokal = (): boolean => ['lokal', 'hybrid', 'lokalt-mot-preprod'].includes(env);
export const erPreprod = (): boolean => env === 'preprod';
export const erProd = (): boolean => env === 'prod';

export const hentSideHref = (pathname: string) => pathname.split('/')[4];
