DROP TABLE group_user;

CREATE TABLE public.group_memberships (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    group_id bigint NOT NULL,
    user_id bigint NOT NULL,

    CONSTRAINT pk__group_user PRIMARY KEY (id),
    CONSTRAINT fk__group_user__group_id FOREIGN KEY (group_id) REFERENCES public.groups(id),
    CONSTRAINT fk__group_user__user_id FOREIGN KEY (user_id) REFERENCES public.users(id)
);


CREATE TABLE public.group_membership_permissions (
    group_membership_id bigint NOT NULL,
    permission character varying(255) NOT NULL,

    CONSTRAINT pk__group_membership_permissions PRIMARY KEY (group_membership_id, permission),
    CONSTRAINT fk__group_membership_permissions__group_membership_id FOREIGN KEY (group_membership_id) REFERENCES public.group_memberships(id),
    CONSTRAINT ch__group_membership_permissions__permission CHECK (permission IN ('MANAGE_MEMBERS'))
);