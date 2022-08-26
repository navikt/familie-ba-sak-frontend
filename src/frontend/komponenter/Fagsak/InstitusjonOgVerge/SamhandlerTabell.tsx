import React from 'react';

import type { ISamhandlerInfo } from '../../../typer/samhandler';

export const SamhandlerTabell: React.FC<{ samhandler: ISamhandlerInfo }> = ({ samhandler }) => {
    return (
        <>
            <table className="tabell">
                <thead>
                    <tr>
                        <th colSpan={2}>Opplysninger om institusjon</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Institusjonnavn</td>
                        <td>{samhandler.navn}</td>
                    </tr>
                    <tr>
                        <td>Organisasjonsnummer</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>TSS-ident</td>
                        <td>{samhandler.tssEksternId}</td>
                    </tr>
                    <tr>
                        <td>Adresse</td>
                        <td>
                            <div>
                                {samhandler.adresser.map(adresse => (
                                    <>
                                        {adresse.adresseType}: <br />
                                        {adresse.adresselinjer} {adresse.postNr} {adresse.postSted}
                                    </>
                                ))}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};
