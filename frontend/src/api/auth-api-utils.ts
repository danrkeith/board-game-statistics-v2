import { apiPost, isErrorResponse, type ErrorResponse } from './api-utils';

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
    apiPost(baseEndpoint + '/login', credentials)
        .then((res: Response) => res.json())
        .then((data: LoginResponse | ErrorResponse) => {
            if (isErrorResponse(data)) {
                throw new Error(data.message);
            }

            return data;
        });

export { apiLogin };
