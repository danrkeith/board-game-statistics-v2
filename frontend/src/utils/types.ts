type Authority = 'GRANT_AUTHORITIES' | 'MANAGE_USERS' | 'MANAGE_GROUPS' | 'MANAGE_GROUP_MEMBERSHIPS';

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    authorities: Authority[];
}

export type { Authority, User };
