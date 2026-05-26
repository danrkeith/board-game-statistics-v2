import type { Authority, User } from '../types';
import { apiDelete, apiGet, apiPost, apiPut, returnDataFrom, returnVoidFrom } from './api-utils';

const baseEndpoint = '/users';

interface JsonUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    authorities: Authority[];
}

interface EditMeRequest {
    firstName: string;
    lastName: string;
}

interface CreateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface EditUserRequest {
    id: number;
    firstName: string;
    lastName: string;
}

const jsonToUser = (json: JsonUser): User => ({
    ...json,
    authorities: new Set(json.authorities),
});

const apiGetUsers = (jwt: string): Promise<User[]> =>
    returnDataFrom<JsonUser[]>(() => apiGet({ endpoint: baseEndpoint, jwt }))
        .then(jsonUsers => jsonUsers.map(jsonToUser));

const apiCreateUser = (userData: CreateUserRequest): Promise<User> =>
    returnDataFrom<JsonUser>(() => apiPost({ endpoint: `${baseEndpoint}`, body: userData }))
        .then(jsonToUser);

const apiGetMe = (jwt: string): Promise<User> =>
    returnDataFrom<JsonUser>(() => apiGet({ endpoint: `${baseEndpoint}/me`, jwt }))
        .then(jsonToUser);

const apiEditMe = (jwt: string, body: EditMeRequest): Promise<User> =>
    returnDataFrom<JsonUser>(() => apiPut({ endpoint: `${baseEndpoint}/me`, jwt, body }))
        .then(jsonToUser);

const apiEditUser = (jwt: string, body: EditUserRequest): Promise<User> =>
    returnDataFrom<JsonUser>(() => apiPut({ endpoint: `${baseEndpoint}/${body.id}`, jwt, body: {
        firstName: body.firstName,
        lastName: body.lastName,
    } }))
        .then(jsonToUser);

const apiDeleteUser = (jwt: string, id: number): Promise<void> =>
    returnVoidFrom(() => apiDelete({ endpoint: `${baseEndpoint}/${id}`, jwt }));

export type { JsonUser };
export { jsonToUser, apiGetUsers, apiCreateUser, apiGetMe, apiEditMe, apiEditUser, apiDeleteUser };
