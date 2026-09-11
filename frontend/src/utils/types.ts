const Authorities = ['MANAGE_USERS', 'GRANT_AUTHORITIES'] as const;
type Authority = typeof Authorities[number];

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}

export { Authorities };
export type { Authority, User };
