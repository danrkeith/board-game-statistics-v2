import type { Authority, User } from '../types';
import { apiGet, apiPut, returnDataFrom } from './api-utils';

interface EditUserAuthoritiesRequest {
    id: number;
    authorities: Set<string>;
}

const apiGetAuthorityPrerequisites = (jwt: string): Promise<Map<Authority, Set<Authority>>> =>
    returnDataFrom<Record<Authority, Authority[]>>(() => apiGet({ endpoint: '/users/authorities/prerequisites', jwt }))
        .then(record => new Map(
            Object.entries(record).map(
                ([authority, prerequisites]) => [
                    authority as Authority,
                    new Set(prerequisites)
                ] as const)
            )
        );


const apiEditUserAuthorities = (jwt: string, body: EditUserAuthoritiesRequest) =>
    returnDataFrom<User>(() => apiPut({ endpoint: `/users/${body.id}/authorities`, jwt, body: Array.from(body.authorities) }));

export { apiGetAuthorityPrerequisites, apiEditUserAuthorities };
