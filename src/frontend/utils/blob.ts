function base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

export function opprettPdfBlob(bytes: string) {
    return new Blob([base64ToArrayBuffer(bytes)], { type: 'application/pdf' });
}
