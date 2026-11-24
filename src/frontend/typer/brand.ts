declare const brand: unique symbol;

export type Brand<T extends number | string, B extends string> = T & { readonly [brand]: B };

type RemoveBrand<T> = T extends Brand<number, string> ? number : T extends Brand<string, string> ? string : T;

export type NoBrand<T> = { [K in keyof T]: RemoveBrand<T[K]> };

export interface BrandedIdFactory<B extends string> {
    erGyldig: (id: number) => id is Brand<number, B>;
    fra: (id: number) => Brand<number, B>;
}

export function lagBrandedIdFactory<B extends string>(navn: B): BrandedIdFactory<B> {
    const feltnavn = navn.charAt(0).toLowerCase() + navn.slice(1);

    function erGyldig(id: number): id is Brand<number, B> {
        return Number.isSafeInteger(id) && id > 0;
    }

    return {
        erGyldig,
        fra: (id: number): Brand<number, B> => {
            if (!erGyldig(id)) {
                throw new Error(`Ugyldig ${feltnavn}: ${id}`);
            }
            return id;
        },
    };
}
