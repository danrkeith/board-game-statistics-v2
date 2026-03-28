import type { User } from './types';

const fullName = (user: User) =>
    user.firstName
        ? user.lastName
            ? user.firstName + ' ' + user.lastName
            : user.firstName
        : null;

const title = (user: User) =>
    fullName(user) ?? `User ${user.id}`;

export { fullName, title };
