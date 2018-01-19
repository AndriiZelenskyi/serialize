export function parseJsonPropertyName(fullName: string): string[] {
    return fullName.split('.');
}

export function setPropertyToJson(json: Object, propertyAddress: string[], value: any): Object {
    const copyOfAddress = propertyAddress.map(v => '' + v);
    const lastAddress = copyOfAddress.pop();
    const tObject = copyOfAddress.reduce((pV: {[k: string]: any}, cV) => {
        if (pV[cV] === undefined) {
            pV[cV] = {};
        }
        return pV[cV];
    }, json);
    if (lastAddress) {
        tObject[lastAddress] = value;
    }
    return json;
}

export function getPropertyOfJson(json: Object, propertyAddress: string[]): Object | null {
    const copyOfAddress = propertyAddress.map(v => '' + v);
    const lastAddress = copyOfAddress.pop();
    const reduce: { [k: string]: any } = copyOfAddress.reduce((pV: { [k: string]: any }, cV) => {
        if (pV[cV] === undefined) {
            pV[cV] = {};
        }
        return pV[cV];
    }, json);
    return reduce[lastAddress || ''] || null;
}