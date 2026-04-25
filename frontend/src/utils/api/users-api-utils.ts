import type { User } from '../types';
import { apiDelete, apiGet, apiPost, apiPut, returnDataFrom } from './api-utils';

const baseEndpoint = '/users';

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

interface EditUserAuthoritiesRequest {
    id: number;
    authorities: Set<string>;
}

const apiGetUsers = (jwt: string) =>
    returnDataFrom<User[]>(() => apiGet({ endpoint: baseEndpoint, jwt }));

const apiCreateUser = (userData: CreateUserRequest): Promise<User> =>
    returnDataFrom<User>(() => apiPost({ endpoint: `${baseEndpoint}`, body: userData }));

const apiGetMe = (jwt: string) =>
    returnDataFrom<User>(() => apiGet({ endpoint: `${baseEndpoint}/me`, jwt }));

const apiEditMe = (jwt: string, body: EditMeRequest) =>
    returnDataFrom<User>(() => apiPut({ endpoint: `${baseEndpoint}/me`, jwt, body }));

const apiEditUser = (jwt: string, body: EditUserRequest) =>
    returnDataFrom<User>(() => apiPut({ endpoint: `${baseEndpoint}/${body.id}`, jwt, body: {
        firstName: body.firstName,
        lastName: body.lastName,
    } }));

const apiDeleteUser = (jwt: string, id: number) =>
    apiDelete({ endpoint: `${baseEndpoint}/${id}`, jwt });

const apiEditUserAuthorities = (jwt: string, body: EditUserAuthoritiesRequest) =>
    returnDataFrom<User>(() => apiPut({ endpoint: `${baseEndpoint}/${body.id}/authorities`, jwt, body: Array.from(body.authorities) }));

export { apiGetUsers, apiCreateUser, apiGetMe, apiEditMe, apiEditUser, apiDeleteUser, apiEditUserAuthorities };
