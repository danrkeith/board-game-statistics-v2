ALTER TABLE public.user_authorities
    DROP CONSTRAINT ch__user_authorities__authority;

DELETE FROM public.user_authorities
WHERE authority NOT IN ('MANAGE_USERS', 'GRANT_AUTHORITIES');

ALTER TABLE public.user_authorities
    ADD CONSTRAINT ch__user_authorities__authority CHECK (
        authority IN ('MANAGE_USERS', 'GRANT_AUTHORITIES')
    );

DROP TABLE public.group_membership_permissions;

DROP TABLE public.group_memberships;

DROP TABLE public.groups;