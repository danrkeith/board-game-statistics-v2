type Authority = 'MANAGE_USERS';

interface User {
    email: string;
    authorities: Authority[];
}

export type { User };