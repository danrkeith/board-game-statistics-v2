import type { Authority, User } from '../types';
import { apiGet, apiPut, returnDataFrom } from './api-utils';

interface EditUserAuthoritiesRequest {
    id: number;
    authorities: Set<string>;
}

const apiGetAuthorityPrerequisites = (jwt: string) =>
    returnDataFrom<Record<Authority, Authority[]>>(() => apiGet({ endpoint: '/users/authorities/prerequisites', jwt }));

const apiEditUserAuthorities = (jwt: string, body: EditUserAuthoritiesRequest) =>
    returnDataFrom<User>(() => apiPut({ endpoint: `/users/${body.id}/authorities`, jwt, body: Array.from(body.authorities) }));

export { apiGetAuthorityPrerequisites, apiEditUserAuthorities };
