import type { User } from '../types';
import { apiPost, returnDataFrom } from './api-utils';

const baseEndpoint = '/auth';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    jwt: string;
    expiresIn: number;
}

interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const apiLogin = (credentials: LoginRequest): Promise<LoginResponse> =>
    returnDataFrom<LoginResponse>(() => apiPost({ endpoint: `${baseEndpoint}/login`, body: credentials }));

const apiRegister = (userData: RegisterRequest): Promise<User> =>
    returnDataFrom<User>(() => apiPost({ endpoint: `${baseEndpoint}/register`, body: userData }));

export { apiLogin, apiRegister };
