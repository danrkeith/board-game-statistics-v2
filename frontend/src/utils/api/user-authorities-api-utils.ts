import type { Authority, User } from '../types';
import { apiGet, apiPut, returnDataFrom } from './api-utils';

interface EditUserAuthoritiesRequest {
    id: number;
    authorities: Set<string>;
}

const apiGetUserAuthorities = (jwt: string, id: number): Promise<Set<Authority>> =>
    returnDataFrom<Authority[]>(() => apiGet({ endpoint: `/users/${id}/authorities`, jwt }))
        .then(authorities => new Set(authorities));

const apiEditUserAuthorities = (jwt: string, body: EditUserAuthoritiesRequest): Promise<Set<Authority>> =>
    returnDataFrom<Authority[]>(() => apiPut({ endpoint: `/users/${body.id}/authorities`, jwt, body: Array.from(body.authorities) }))
        .then(authorities => new Set(authorities));

export { apiGetUserAuthorities, apiEditUserAuthorities };
