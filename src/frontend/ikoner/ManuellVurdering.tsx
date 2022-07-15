import * as React from 'react';

interface IManuellVurdering {
    className?: string;
    height?: number;
    width?: number;
}

const ManuellVurdering: React.FunctionComponent<IManuellVurdering> = ({
    className,
    height = 24,
    width = 24,
}) => {
    return (
        <svg
            aria-labelledby={'ManuellVurdering'}
            className={className}
            height={height}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'ManuellVurdering'}>Manuelt vurdert</title>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(-371 -861)" fill="#3E3832">
                    <g transform="translate(371 861)">
                        <path d="m19.821 13.067c0.1872-0.1872 0.49152-0.1872 0.67872 0l2.4 2.4c0.1872 0.18816 0.1872 0.49152 9.6e-4 0.67776l-6.24 6.24c-0.05376 0.05472-0.12 0.08928-0.18816 0.11136-0.00672 0.00288-0.01152 0.0096-0.0192 0.01152l-3.36 0.96c-0.04416 0.01248-0.08832 0.01824-0.13248 0.01824-0.12576 0-0.24864-0.04896-0.33984-0.14016-0.12384-0.12384-0.16992-0.30432-0.12192-0.47136l0.96-3.36c0.00192-0.00672 0.00864-0.01056 0.01056-0.01728 0.02208-0.06912 0.05568-0.13536 0.11136-0.19008zm-5.664 7.4957-0.49824 1.7453 1.7453-0.4992-1.247-1.2461zm4.0829-4.5571-3.6413 3.6413 1.7213 1.7213 3.6413-3.6413-1.7213-1.7213zm-8.353-15.491c1.463 0 3.2832 0.45504 3.6029 1.7357 0.25728 1.0358-0.13248 2.0429-0.3888 2.6419 0.3552 0.24672 0.57792 0.71136 0.57792 1.2797 0 0.35136-0.0912 0.6864-0.25632 0.94272-0.12576 0.19488-0.288 0.33984-0.47616 0.42912-0.11232 1.6781-0.96384 2.4701-1.4275 2.7802v1.7818c0.59904 0.22176 1.5178 0.61056 2.4115 0.98976 0.8592 0.3648 1.6723 0.70848 1.9939 0.81504l-0.30144 0.91104c-0.35808-0.11808-1.1501-0.45312-2.0669-0.84192-1.0118-0.42912-2.161-0.91584-2.6621-1.0762-0.19872-0.06336-0.33408-0.24864-0.33408-0.45696v-2.4c0-0.19488 0.11712-0.3696 0.2976-0.44352 0.04128-0.01824 1.1424-0.52992 1.1424-2.4365 0-0.26496 0.21504-0.48 0.48-0.48 0.16416 0 0.24-0.30624 0.24-0.5136 0-0.20736-0.07584-0.51456-0.24-0.51456-0.26496 0-0.48-0.21504-0.48-0.48 0-0.15648 0.06048-0.29568 0.16992-0.55008 0.20544-0.47328 0.58656-1.3546 0.38976-2.1466-0.14304-0.57408-1.2902-1.008-2.6707-1.008-1.3795 9.6e-4 -2.5277 0.43392-2.6698 1.008-0.06144 0.24864-0.30336 0.40608-0.56064 0.3552-0.19104-0.03744-0.52704-0.0816-0.6576 0.05856-0.29856 0.32064 0.0288 1.4861 0.13728 1.8691 0.0672 0.24288 0.10176 0.3648 0.10176 0.48192 0 0.19872-0.12192 0.37056-0.29472 0.44352-0.08832 0.22848-0.08832 0.80544 0 1.0339 0.1728 0.072 0.29472 0.24288 0.29472 0.44256 0 1.9066 1.1011 2.4173 1.1482 2.4394 0.17376 0.0768 0.29184 0.25056 0.29184 0.44064v2.4c0 0.19296-0.1152 0.36672-0.29376 0.4416-0.74784 0.31584-1.583 0.59712-2.3904 0.8688-1.4765 0.49824-3.3149 1.1174-3.5146 1.7203-0.31104 0.93312-0.44352 2.4595-0.49536 3.2429h9.5741v0.96h-10.08c-0.13056 0-0.25536-0.0528-0.34464-0.14784-0.0912-0.09312-0.14016-0.21984-0.13536-0.3504 0.00384-0.1056 0.09888-2.5872 0.57024-4.008 0.3504-1.057 2.0976-1.6454 4.1194-2.327 0.68448-0.22944 1.3891-0.46752 2.0304-0.72288v-1.8c-0.47232-0.31584-1.345-1.1299-1.4323-2.8704-0.23616-0.23136-0.36768-0.66336-0.36768-1.247 0-0.3024 0.04032-0.5904 0.11424-0.81216 0.05088-0.15072 0.11424-0.26592 0.18432-0.35328-0.00192-0.00576-0.00288-0.01152-0.0048-0.01728-0.20256-0.72192-0.5808-2.0659 0.0816-2.7811 0.27264-0.29472 0.66528-0.42912 1.1549-0.39936 0.56544-0.97056 2.1398-1.3286 3.4349-1.3286zm10.273 13.571-1.2413 1.2413 1.7213 1.7213 1.2413-1.2413-1.7213-1.7213z" />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default ManuellVurdering;
