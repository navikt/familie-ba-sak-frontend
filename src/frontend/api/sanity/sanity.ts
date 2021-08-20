import sanityClient from '@sanity/client';

enum Datasett {
    TEST = 'testdata',
    EF = 'ef-brev',
    BA = 'ba-brev',
}

export const sanity = sanityClient({
    projectId: 'xsrv1mh6',
    dataset: Datasett.BA,
    useCdn: true,
});
