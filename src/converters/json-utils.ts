export function parseJsonPropertyName(fullName: string): string[] {
    return fullName.split('.');
}

export function setPropertyToJson(json: Object, propertyAddress: string[], value: any): Object {
    let tObject: {[t: string]: any} = json;
    const lastAddress = propertyAddress.pop();
    propertyAddress.forEach((v) => {
        if (tObject[v] === undefined) {
            tObject[v] = {};
        }
        tObject = tObject[v];
    });
    if (lastAddress) {
        tObject[lastAddress] = value;
    }
    return json;
}