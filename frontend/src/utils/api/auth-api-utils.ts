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

const apiLogin = (credentials: LoginRequest): Promise<LoginResponse> =>
    returnDataFrom<LoginResponse>(() => apiPost({ endpoint: `${baseEndpoint}/login`, body: credentials }));

export { apiLogin };
