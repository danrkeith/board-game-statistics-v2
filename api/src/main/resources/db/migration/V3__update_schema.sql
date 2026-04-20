ALTER TABLE public.user_authorities
    DROP CONSTRAINT ch__user_authorities__authority;

ALTER TABLE public.user_authorities
    ADD CONSTRAINT ch__user_authorities__authority CHECK (
        authority IN ('GRANT_AUTHORITIES', 'MANAGE_USERS', 'MANAGE_GROUPS', 'MANAGE_GROUP_MEMBERSHIPS')
    );
