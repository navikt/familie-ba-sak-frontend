export type RegionCode =
    | 'AD'
    | 'AE'
    | 'AF'
    | 'AG'
    | 'AI'
    | 'AL'
    | 'AM'
    | 'AO'
    | 'AQ'
    | 'AR'
    | 'AS'
    | 'AT'
    | 'AU'
    | 'AW'
    | 'AX'
    | 'AZ'
    | 'BA'
    | 'BB'
    | 'BD'
    | 'BE'
    | 'BF'
    | 'BG'
    | 'BH'
    | 'BI'
    | 'BJ'
    | 'BL'
    | 'BM'
    | 'BN'
    | 'BO'
    | 'BQ'
    | 'BR'
    | 'BS'
    | 'BT'
    | 'BV'
    | 'BW'
    | 'BY'
    | 'BZ'
    | 'CA'
    | 'CC'
    | 'CD'
    | 'CF'
    | 'CG'
    | 'CH'
    | 'CI'
    | 'CK'
    | 'CL'
    | 'CM'
    | 'CN'
    | 'CO'
    | 'CR'
    | 'CU'
    | 'CV'
    | 'CW'
    | 'CX'
    | 'CY'
    | 'CZ'
    | 'DE'
    | 'DJ'
    | 'DK'
    | 'DM'
    | 'DO'
    | 'DZ'
    | 'EC'
    | 'EE'
    | 'EG'
    | 'EH'
    | 'ER'
    | 'ES'
    | 'ET'
    | 'FI'
    | 'FJ'
    | 'FK'
    | 'FM'
    | 'FO'
    | 'FR'
    | 'GA'
    | 'GB'
    | 'GD'
    | 'GE'
    | 'GF'
    | 'GG'
    | 'GH'
    | 'GI'
    | 'GL'
    | 'GM'
    | 'GN'
    | 'GP'
    | 'GQ'
    | 'GR'
    | 'GS'
    | 'GT'
    | 'GU'
    | 'GW'
    | 'GY'
    | 'HK'
    | 'HM'
    | 'HN'
    | 'HR'
    | 'HT'
    | 'HU'
    | 'ID'
    | 'IE'
    | 'IL'
    | 'IM'
    | 'IN'
    | 'IO'
    | 'IQ'
    | 'IR'
    | 'IS'
    | 'IT'
    | 'JE'
    | 'JM'
    | 'JO'
    | 'JP'
    | 'KE'
    | 'KG'
    | 'KH'
    | 'KI'
    | 'KM'
    | 'KN'
    | 'KP'
    | 'KR'
    | 'KW'
    | 'KY'
    | 'KZ'
    | 'LA'
    | 'LB'
    | 'LC'
    | 'LI'
    | 'LK'
    | 'LR'
    | 'LS'
    | 'LT'
    | 'LU'
    | 'LV'
    | 'LY'
    | 'MA'
    | 'MC'
    | 'MD'
    | 'ME'
    | 'MF'
    | 'MG'
    | 'MH'
    | 'MK'
    | 'ML'
    | 'MM'
    | 'MN'
    | 'MO'
    | 'MP'
    | 'MQ'
    | 'MR'
    | 'MS'
    | 'MT'
    | 'MU'
    | 'MV'
    | 'MW'
    | 'MX'
    | 'MY'
    | 'MZ'
    | 'NA'
    | 'NC'
    | 'NE'
    | 'NF'
    | 'NG'
    | 'NI'
    | 'NL'
    | 'NO'
    | 'NP'
    | 'NR'
    | 'NU'
    | 'NZ'
    | 'OM'
    | 'PA'
    | 'PE'
    | 'PF'
    | 'PG'
    | 'PH'
    | 'PK'
    | 'PL'
    | 'PM'
    | 'PN'
    | 'PR'
    | 'PS'
    | 'PT'
    | 'PW'
    | 'PY'
    | 'QA'
    | 'RE'
    | 'RO'
    | 'RS'
    | 'RU'
    | 'RW'
    | 'SA'
    | 'SB'
    | 'SC'
    | 'SD'
    | 'SE'
    | 'SG'
    | 'SH'
    | 'SI'
    | 'SJ'
    | 'SK'
    | 'SL'
    | 'SM'
    | 'SN'
    | 'SO'
    | 'SR'
    | 'SS'
    | 'ST'
    | 'SV'
    | 'SX'
    | 'SY'
    | 'SZ'
    | 'TC'
    | 'TD'
    | 'TF'
    | 'TG'
    | 'TH'
    | 'TJ'
    | 'TK'
    | 'TL'
    | 'TM'
    | 'TN'
    | 'TO'
    | 'TR'
    | 'TT'
    | 'TV'
    | 'TW'
    | 'TZ'
    | 'UA'
    | 'UG'
    | 'UM'
    | 'US'
    | 'UY'
    | 'UZ'
    | 'VA'
    | 'VC'
    | 'VE'
    | 'VG'
    | 'VI'
    | 'VN'
    | 'VU'
    | 'WF'
    | 'WS'
    | 'XK'
    | 'YE'
    | 'YT'
    | 'ZA'
    | 'ZM'
    | 'ZW'
    | 'UK'
    | 'EL'
    | 'XU'
    | 'XR'
    | 'XS'
    | 'EU';

export const EØS_COUNTRIES_REGION_CODES: RegionCode[] = [
    'DK',
    'FI',
    'IS',
    'NO',
    'SE',
    'AT',
    'BE',
    'BG',
    'CH', // Not in EEA
    'CY',
    'CZ',
    'DE',
    'EE',
    'ES',
    'FO', // Not in EEA
    'FR',
    'GB', // No longer in EEA
    'GL', // Not in EEA
    'GR',
    'HR',
    'HU',
    'IE',
    'IT',
    'LI',
    'LT',
    'LU',
    'LV',
    'MT',
    'NL',
    'PL',
    'PT',
    'RO',
    'SI',
    'SK',
];

export const ALL_COUNTRIES_REGION_CODES: RegionCode[] = [
    'NO',
    'SE',
    'DK',
    'FI',
    'IS',
    'FO',
    'GL',
    'AX',

    'AD',
    'AE',
    'AF',
    'AG',
    'AI',
    'AL',
    'AM',
    'AO',
    'AQ',
    'AR',
    'AS',
    'AT',
    'AU',
    'AW',
    'AZ',
    'BA',
    'BB',
    'BD',
    'BE',
    'BF',
    'BG',
    'BH',
    'BI',
    'BJ',
    'BL',
    'BM',
    'BN',
    'BO',
    'BQ',
    'BR',
    'BS',
    'BT',
    'BV',
    'BW',
    'BY',
    'BZ',
    'CA',
    'CC',
    'CD',
    'CF',
    'CG',
    'CH',
    'CI',
    'CK',
    'CL',
    'CM',
    'CN',
    'CO',
    'CR',
    'CU',
    'CV',
    'CW',
    'CX',
    'CY',
    'CZ',
    'DE',
    'DJ',
    'DM',
    'DO',
    'DZ',
    'EC',
    'EE',
    'EG',
    'EH',
    'ER',
    'ES',
    'ET',
    'FJ',
    'FK',
    'FM',
    'FR',
    'GA',
    'GB',
    'GD',
    'GE',
    'GF',
    'GG',
    'GH',
    'GI',
    'GM',
    'GN',
    'GP',
    'GQ',
    'GR',
    'GS',
    'GT',
    'GU',
    'GW',
    'GY',
    'HK',
    'HM',
    'HN',
    'HR',
    'HT',
    'HU',
    'ID',
    'IE',
    'IL',
    'IM',
    'IN',
    'IO',
    'IQ',
    'IR',
    'IT',
    'JE',
    'JM',
    'JO',
    'JP',
    'KE',
    'KG',
    'KH',
    'KI',
    'KM',
    'KN',
    'KP',
    'KR',
    'KW',
    'KY',
    'KZ',
    'LA',
    'LB',
    'LC',
    'LI',
    'LK',
    'LR',
    'LS',
    'LT',
    'LU',
    'LV',
    'LY',
    'MA',
    'MC',
    'MD',
    'ME',
    'MF',
    'MG',
    'MH',
    'MK',
    'ML',
    'MM',
    'MN',
    'MO',
    'MP',
    'MQ',
    'MR',
    'MS',
    'MT',
    'MU',
    'MV',
    'MW',
    'MX',
    'MY',
    'MZ',
    'NA',
    'NC',
    'NE',
    'NF',
    'NG',
    'NI',
    'NL',
    'NP',
    'NR',
    'NU',
    'NZ',
    'OM',
    'PA',
    'PE',
    'PF',
    'PG',
    'PH',
    'PK',
    'PL',
    'PM',
    'PN',
    'PR',
    'PS',
    'PT',
    'PW',
    'PY',
    'QA',
    'RE',
    'RO',
    'RS',
    'RU',
    'RW',
    'SA',
    'SB',
    'SC',
    'SD',
    'SG',
    'SH',
    'SI',
    'SJ',
    'SK',
    'SL',
    'SM',
    'SN',
    'SO',
    'SR',
    'SS',
    'ST',
    'SV',
    'SX',
    'SY',
    'SZ',
    'TC',
    'TD',
    'TF',
    'TG',
    'TH',
    'TJ',
    'TK',
    'TL',
    'TM',
    'TN',
    'TO',
    'TR',
    'TT',
    'TV',
    'TW',
    'TZ',
    'UA',
    'UG',
    'UM',
    'US',
    'UY',
    'UZ',
    'VA',
    'VC',
    'VE',
    'VG',
    'VI',
    'VN',
    'VU',
    'WF',
    'WS',
    'XK',
    'YE',
    'YT',
    'ZA',
    'ZM',
    'ZW',
    'UK',
    'EL',
    'XU', // Flyktning
    'XR', // Statsløs
    'XS', // Ukjent
];

export const REGION_CODE_LABELS: Record<RegionCode, string> = {
    AD: 'Andorra',
    AE: 'De forente arabiske emirater',
    AF: 'Afghanistan',
    AG: 'Antigua og Barbuda',
    AI: 'Anguilla',
    AL: 'Albania',
    AM: 'Armenia',
    AO: 'Angola',
    AQ: 'Antarktis',
    AR: 'Argentina',
    AS: 'Amerikansk Samoa',
    AT: 'Østerrike',
    AU: 'Australia',
    AW: 'Aruba',
    AX: 'Åland',
    AZ: 'Aserbajdsjan',
    BA: 'Bosnia-Hercegovina',
    BB: 'Barbados',
    BD: 'Bangladesh',
    BE: 'Belgia',
    BF: 'Burkina Faso',
    BG: 'Bulgaria',
    BH: 'Bahrain',
    BI: 'Burundi',
    BJ: 'Benin',
    BL: 'Saint-Barthélemy',
    BM: 'Bermuda',
    BN: 'Brunei',
    BO: 'Bolivia',
    BQ: 'Bonaire, Sint Eustatius og Saba',
    BR: 'Brasil',
    BS: 'Bahamas',
    BT: 'Bhutan',
    BV: 'Bouvetøya',
    BW: 'Botswana',
    BY: 'Belarus',
    BZ: 'Belize',
    CA: 'Canada',
    CC: 'Kokosøyene',
    CD: 'Kongo-Kinshasa',
    CF: 'Den sentralafrikanske republikk',
    CG: 'Kongo-Brazzaville',
    CH: 'Sveits',
    CI: 'Elfenbenskysten',
    CK: 'Cookøyene',
    CL: 'Chile',
    CM: 'Kamerun',
    CN: 'Kina',
    CO: 'Colombia',
    CR: 'Costa Rica',
    CU: 'Cuba',
    CV: 'Kapp Verde',
    CW: 'Curaçao',
    CX: 'Christmasøya',
    CY: 'Kypros',
    CZ: 'Tsjekkia',
    DE: 'Tyskland',
    DJ: 'Djibouti',
    DK: 'Danmark',
    DM: 'Dominica',
    DO: 'Den dominikanske republikk',
    DZ: 'Algerie',
    EC: 'Ecuador',
    EE: 'Estland',
    EG: 'Egypt',
    EH: 'Vest-Sahara',
    ER: 'Eritrea',
    ES: 'Spania',
    ET: 'Etiopia',
    FI: 'Finland',
    FJ: 'Fiji',
    FK: 'Falklandsøyene',
    FM: 'Mikronesiaføderasjonen',
    FO: 'Færøyene',
    FR: 'Frankrike',
    GA: 'Gabon',
    GB: 'Storbritannia',
    GD: 'Grenada',
    GE: 'Georgia',
    GF: 'Fransk Guyana',
    GG: 'Guernsey',
    GH: 'Ghana',
    GI: 'Gibraltar',
    GL: 'Grønland',
    GM: 'Gambia',
    GN: 'Guinea',
    GP: 'Guadeloupe',
    GQ: 'Ekvatorial-Guinea',
    GR: 'Hellas',
    GS: 'Sør-Georgia og Sør-Sandwichøyene',
    GT: 'Guatemala',
    GU: 'Guam',
    GW: 'Guinea-Bissau',
    GY: 'Guyana',
    HK: 'Hongkong',
    HM: 'Heard- og McDonaldøyene',
    HN: 'Honduras',
    HR: 'Kroatia',
    HT: 'Haiti',
    HU: 'Ungarn',
    ID: 'Indonesia',
    IE: 'Irland',
    IL: 'Israel',
    IM: 'Isle of Man',
    IN: 'India',
    IO: 'Det britiske territoriet i Indiahavet',
    IQ: 'Irak',
    IR: 'Iran',
    IS: 'Island',
    IT: 'Italia',
    JE: 'Jersey',
    JM: 'Jamaica',
    JO: 'Jordan',
    JP: 'Japan',
    KE: 'Kenya',
    KG: 'Kirgisistan',
    KH: 'Kambodsja',
    KI: 'Kiribati',
    KM: 'Komorene',
    KN: 'Saint Kitts og Nevis',
    KP: 'Nord-Korea',
    KR: 'Sør-Korea',
    KW: 'Kuwait',
    KY: 'Caymanøyene',
    KZ: 'Kasakhstan',
    LA: 'Laos',
    LB: 'Libanon',
    LC: 'Saint Lucia',
    LI: 'Liechtenstein',
    LK: 'Sri Lanka',
    LR: 'Liberia',
    LS: 'Lesotho',
    LT: 'Litauen',
    LU: 'Luxembourg',
    LV: 'Latvia',
    LY: 'Libya',
    MA: 'Marokko',
    MC: 'Monaco',
    MD: 'Moldova',
    ME: 'Montenegro',
    MF: 'Saint-Martin',
    MG: 'Madagaskar',
    MH: 'Marshalløyene',
    MK: 'Nord-Makedonia',
    ML: 'Mali',
    MM: 'Myanmar',
    MN: 'Mongolia',
    MO: 'Macao',
    MP: 'Nord-Marianene',
    MQ: 'Martinique',
    MR: 'Mauritania',
    MS: 'Montserrat',
    MT: 'Malta',
    MU: 'Mauritius',
    MV: 'Maldivene',
    MW: 'Malawi',
    MX: 'Mexico',
    MY: 'Malaysia',
    MZ: 'Mosambik',
    NA: 'Namibia',
    NC: 'Ny-Caledonia',
    NE: 'Niger',
    NF: 'Norfolkøya',
    NG: 'Nigeria',
    NI: 'Nicaragua',
    NL: 'Nederland',
    NO: 'Norge',
    NP: 'Nepal',
    NR: 'Nauru',
    NU: 'Niue',
    NZ: 'New Zealand',
    OM: 'Oman',
    PA: 'Panama',
    PE: 'Peru',
    PF: 'Fransk Polynesia',
    PG: 'Papua Ny-Guinea',
    PH: 'Filippinene',
    PK: 'Pakistan',
    PL: 'Polen',
    PM: 'Saint-Pierre og Miquelon',
    PN: 'Pitcairnøyene',
    PR: 'Puerto Rico',
    PS: 'Palestina',
    PT: 'Portugal',
    PW: 'Palau',
    PY: 'Paraguay',
    QA: 'Qatar',
    RE: 'Réunion',
    RO: 'Romania',
    RS: 'Serbia',
    RU: 'Russland',
    RW: 'Rwanda',
    SA: 'Saudi-Arabia',
    SB: 'Salomonøyene',
    SC: 'Seychellene',
    SD: 'Sudan',
    SE: 'Sverige',
    SG: 'Singapore',
    SH: 'Saint Helena, Ascension og Tristan da Cunha',
    SI: 'Slovenia',
    SJ: 'Svalbard og Jan Mayen',
    SK: 'Slovakia',
    SL: 'Sierra Leone',
    SM: 'San Marino',
    SN: 'Senegal',
    SO: 'Somalia',
    SR: 'Surinam',
    SS: 'Sør-Sudan',
    ST: 'São Tomé og Príncipe',
    SV: 'El Salvador',
    SX: 'Sint Maarten',
    SY: 'Syria',
    SZ: 'Eswatini',
    TC: 'Turks- og Caicosøyene',
    TD: 'Tsjad',
    TF: 'De franske sørterritorier',
    TG: 'Togo',
    TH: 'Thailand',
    TJ: 'Tadsjikistan',
    TK: 'Tokelau',
    TL: 'Øst-Timor',
    TM: 'Turkmenistan',
    TN: 'Tunisia',
    TO: 'Tonga',
    TR: 'Tyrkia',
    TT: 'Trinidad og Tobago',
    TV: 'Tuvalu',
    TW: 'Taiwan',
    TZ: 'Tanzania',
    UA: 'Ukraina',
    UG: 'Uganda',
    UM: 'USAs ytre småøyer',
    US: 'USA',
    UY: 'Uruguay',
    UZ: 'Usbekistan',
    VA: 'Vatikanstaten',
    VC: 'Saint Vincent og Grenadinene',
    VE: 'Venezuela',
    VG: 'De britiske Jomfruøyer',
    VI: 'De amerikanske Jomfruøyer',
    VN: 'Vietnam',
    VU: 'Vanuatu',
    WF: 'Wallis og Futuna',
    WS: 'Samoa',
    XK: 'Kosovo',
    YE: 'Jemen',
    YT: 'Mayotte',
    ZA: 'Sør-Afrika',
    ZM: 'Zambia',
    ZW: 'Zimbabwe',

    // Tilpassede / Aliased koder
    UK: 'Storbritannia',
    EL: 'Hellas',
    XU: 'Flyktning',
    XR: 'Statsløs',
    XS: 'Ukjent',
    EU: 'EU',
};
