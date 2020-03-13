import { Serializer } from './serializer';

export class LocalDateTimeSerializer implements Serializer<Date> {
    public serialize(dateTime: Date): string {
        const timezoneOffset = new Date().getTimezoneOffset() * 60000;
        const localIsoString = new Date(dateTime.getTime() - timezoneOffset).toISOString();

        return localIsoString.slice(0, -1);
    }

    public deserialize(value: string): Date {
        return new Date(value);
    }
}
