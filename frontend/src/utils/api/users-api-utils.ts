import type { User } from '../types';
import { apiDelete, apiGet, apiPut, returnDataFrom } from './api-utils';

const baseEndpoint = '/users';

interface EditUserRequest {
    id: number;
    firstName: string;
    lastName: string;
}

const apiGetMe = (jwt: string) =>
    returnDataFrom<User>(() => apiGet({ endpoint: `${baseEndpoint}/me`, jwt }));

const apiGetUsers = (jwt: string) =>
    returnDataFrom<User[]>(() => apiGet({ endpoint: baseEndpoint, jwt }));

const apiEditUser = (jwt: string, body: EditUserRequest) =>
    returnDataFrom<User>(() => apiPut({ endpoint: `${baseEndpoint}/${body.id}`, jwt, body: {
        firstName: body.firstName,
        lastName: body.lastName
    } }));

const apiDeleteUser = (jwt: string, id: number) =>
    apiDelete({ endpoint: `${baseEndpoint}/${id}`, jwt });

export { apiGetMe, apiGetUsers, apiEditUser, apiDeleteUser };
