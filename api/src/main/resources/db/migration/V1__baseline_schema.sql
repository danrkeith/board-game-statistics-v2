CREATE TABLE public.users (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    first_name character varying(255),
    last_name character varying(255),

    CONSTRAINT pk__users PRIMARY KEY (id),
    CONSTRAINT uq__users_email UNIQUE (email)
);

CREATE TABLE public.user_authorities (
    user_id bigint NOT NULL,
    authority character varying(255) NOT NULL,

    CONSTRAINT pk__user_authorities PRIMARY KEY (user_id, authority),
    CONSTRAINT fk__user_authorities__user_id FOREIGN KEY (user_id) REFERENCES public.users(id),
    CONSTRAINT ch__user_authorities__authority CHECK (authority IN ('GRANT_AUTHORITIES', 'MANAGE_USERS', 'MANAGE_GROUPS'))
);

CREATE TABLE public.groups (
    id bigint GENERATED ALWAYS AS IDENTITY,
    name character varying(255),

    CONSTRAINT pk__groups PRIMARY KEY (id)
);

CREATE TABLE public.group_user (
    group_id bigint NOT NULL,
    user_id bigint NOT NULL,

    CONSTRAINT pk__group_user PRIMARY KEY (group_id, user_id),
    CONSTRAINT fk__group_user__group_id FOREIGN KEY (group_id) REFERENCES public.groups(id),
    CONSTRAINT fk__group_user__user_id FOREIGN KEY (user_id) REFERENCES public.users(id)
);
