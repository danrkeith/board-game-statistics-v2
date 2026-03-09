import type { User } from '../types';
import { apiDelete, apiGet, returnDataFrom } from './api-utils';

const baseEndpoint = '/users';

const apiGetMe = (jwt: string) =>
    returnDataFrom<User>(() => apiGet(`${baseEndpoint}/me`, jwt));

const apiGetUsers = (jwt: string) =>
    returnDataFrom<User[]>(() => apiGet(baseEndpoint, jwt));

const apiDeleteUser = (jwt: string, id: number) =>
    apiDelete(`${baseEndpoint}/${id}`, jwt);

export { apiGetMe, apiGetUsers, apiDeleteUser };
