export function enumHelper(enumValues: any) {
    let tmp = [];
    // tslint:disable-next-line:forin
    for (let e in enumValues) {
        let isValueProperty = parseInt(e, 10) >= 0;
        if (isValueProperty) {
            tmp.push(enumValues[e]);
        }
    }
    return tmp;
}