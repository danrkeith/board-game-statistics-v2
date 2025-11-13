type Authority = 'MANAGE_USERS';

interface User {
    id: number;
    email: string;
    authorities: Authority[];
}

export type { User };
