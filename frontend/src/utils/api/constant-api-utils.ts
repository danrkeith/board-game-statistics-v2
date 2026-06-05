import type { Authority } from '../types';
import { apiGet, returnDataFrom } from './api-utils';

const apiGetAuthorityPrerequisites = (jwt: string): Promise<Map<Authority, Set<Authority>>> =>
    returnDataFrom<Record<Authority, Authority[]>>(() => apiGet({ endpoint: '/constants/user-authority-prerequisites', jwt }))
        .then(record => new Map(
            Object.entries(record).map(
                ([authority, prerequisites]) => [
                    authority as Authority,
                    new Set(prerequisites),
                ] as const),
        ),
        );

export { apiGetAuthorityPrerequisites };