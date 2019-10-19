import { Serializer } from './serializer';

export class ProfileSerializer<T> implements Serializer<T> {
  constructor(private profiles: { default: Serializer<T> } & { [key: string]: Serializer<T> }) {}

  deserialize(json: Object, profileKey: string = 'default'): T | null {
    const serializer = this.profiles[profileKey];
    if (serializer === undefined) {
      throw new Error('Cannot find serializer for profile: ' + profileKey);
    }
    return serializer.deserialize(json);
  }

  serialize(model: T, profileKey: string = 'default'): Object | null {
    const serializer = this.profiles[profileKey];
    if (serializer === undefined) {
      throw new Error('Cannot find serializer for profile: ' + profileKey);
    }
    return serializer.serialize(model);
  }
}

export function profile<T>(profiles: { default: Serializer<T> } & { [key: string]: Serializer<T> }): ProfileSerializer<T> {
  return new ProfileSerializer<T>(profiles);
}
