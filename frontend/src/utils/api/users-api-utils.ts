import type { User } from '../types';
import { apiDelete, apiGet, apiPost, apiPut, returnDataFrom, returnVoidFrom } from './api-utils';

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

const apiGetUsers = (jwt: string): Promise<User[]> =>
    returnDataFrom<User[]>(() => apiGet({ endpoint: baseEndpoint, jwt }));

const apiCreateUser = (userData: CreateUserRequest): Promise<User> =>
    returnDataFrom<User>(() => apiPost({ endpoint: `${baseEndpoint}`, body: userData }));

const apiGetMe = (jwt: string): Promise<User> =>
    returnDataFrom<User>(() => apiGet({ endpoint: `${baseEndpoint}/me`, jwt }));

const apiEditMe = (jwt: string, body: EditMeRequest): Promise<User> =>
    returnDataFrom<User>(() => apiPut({ endpoint: `${baseEndpoint}/me`, jwt, body }));

const apiEditUser = (jwt: string, body: EditUserRequest): Promise<User> =>
    returnDataFrom<User>(() => apiPut({ endpoint: `${baseEndpoint}/${body.id}`, jwt, body: {
        firstName: body.firstName,
        lastName: body.lastName,
    } }));

const apiDeleteUser = (jwt: string, id: number): Promise<void> =>
    returnVoidFrom(() => apiDelete({ endpoint: `${baseEndpoint}/${id}`, jwt }));

export { apiGetUsers, apiCreateUser, apiGetMe, apiEditMe, apiEditUser, apiDeleteUser };
