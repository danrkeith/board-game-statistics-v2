import type { User } from '../types';
import { apiPut, returnDataFrom } from './api-utils';
import { jsonToUser, type JsonUser } from './users-api-utils';

interface EditUserAuthoritiesRequest {
    id: number;
    authorities: Set<string>;
}

const apiEditUserAuthorities = (jwt: string, body: EditUserAuthoritiesRequest): Promise<User> =>
    returnDataFrom<JsonUser>(() => apiPut({ endpoint: `/users/${body.id}/authorities`, jwt, body: Array.from(body.authorities) }))
        .then(jsonToUser);

export { apiEditUserAuthorities };
