import { Serializer } from './serializer';

function stripIsoTime(isoString: string): string {
    return isoString.replace(/T.*/, '');
}

export class LocalDateSerializer implements Serializer<Date> {
    public serialize(date: Date): string {
        const timezoneOffset = new Date().getTimezoneOffset() * 60000;
        const localIsoString = new Date(date.getTime() - timezoneOffset).toISOString();

        return stripIsoTime(localIsoString);
    }

    public deserialize(value: string): Date {
        return new Date(stripIsoTime(value));
    }
}
