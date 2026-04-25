const Authorities = ['GRANT_AUTHORITIES', 'MANAGE_USERS', 'MANAGE_GROUPS', 'MANAGE_GROUP_MEMBERSHIPS'] as const;
type Authority = typeof Authorities[number];

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    authorities: Authority[];
}

export { Authorities };
export type { Authority, User };
