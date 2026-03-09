import type { User } from '../types';
import { apiDelete, apiGet, returnDataFrom } from './api-utils';

const baseEndpoint = '/users';

const apiGetMe = (jwt: string) =>
    returnDataFrom<User>(() => apiGet({endpoint: `${baseEndpoint}/me`, jwt}));

const apiGetUsers = (jwt: string) =>
    returnDataFrom<User[]>(() => apiGet({endpoint: baseEndpoint, jwt}));

const apiDeleteUser = (jwt: string, id: number) =>
    apiDelete({endpoint: `${baseEndpoint}/${id}`, jwt});

export { apiGetMe, apiGetUsers, apiDeleteUser };
