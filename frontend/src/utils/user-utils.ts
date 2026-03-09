import type { User } from './types';

const fullName = (user: User) =>
    user.firstName
        ? user.lastName
            ? user.firstName + ' ' + user.lastName
            : user.firstName
        : '';

export { fullName };
