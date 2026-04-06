type Authority = 'MANAGE_USERS';

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    authorities: Authority[];
}

export type { Authority, User };
