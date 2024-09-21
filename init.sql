CREATE TABLE lb_users (
    id TEXT PRIMARY KEY,
    username TEXT NULL,
    user_fullname TEXT NULL,
    user_picture TEXT NULL
);

CREATE TABLE lb_posts (
    id TEXT PRIMARY KEY,
    at_insta BIGINT NULL,
    post_url TEXT NULL,
    thumb_url TEXT NULL,
    post_text TEXT NULL,
    user_id TEXT NULL REFERENCES lb_users(id) ON DELETE CASCADE
);

CREATE TABLE lb_comments (
    id TEXT PRIMARY KEY,
    at_insta BIGINT NULL,
    comment_text TEXT NULL,
    classification TEXT NULL,
    verified_class BOOL NULL
    post_id TEXT NULL REFERENCES lb_posts(id) ON DELETE CASCADE
);
