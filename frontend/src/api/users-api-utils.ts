import type { User } from '../model';
import { apiGet, returnDataFrom } from './api-utils';

const baseEndpoint = '/users';

const apiMe = (jwt: string) =>
    returnDataFrom<User>(() => apiGet(baseEndpoint + "/me", jwt));

export { apiMe };
