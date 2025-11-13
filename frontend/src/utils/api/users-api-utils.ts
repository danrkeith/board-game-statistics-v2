import type { User } from '../types';
import { apiGet, returnDataFrom } from './api-utils';

const baseEndpoint = '/users';

const apiGetMe = (jwt: string) =>
    returnDataFrom<User>(() => apiGet(baseEndpoint + '/me', jwt));

export { apiGetMe };
