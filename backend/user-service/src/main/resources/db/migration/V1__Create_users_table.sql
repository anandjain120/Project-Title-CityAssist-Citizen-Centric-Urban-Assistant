CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_medical_flags (
    user_id VARCHAR(255) NOT NULL,
    flag VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, flag),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_commute_patterns (
    user_id VARCHAR(255) NOT NULL,
    pattern VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, pattern),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_notification_preferences (
    user_id VARCHAR(255) NOT NULL,
    preference_key VARCHAR(255) NOT NULL,
    preference_value VARCHAR(255),
    PRIMARY KEY (user_id, preference_key),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_alert_preferences (
    user_id VARCHAR(255) NOT NULL,
    alert_key VARCHAR(255) NOT NULL,
    alert_value VARCHAR(255),
    PRIMARY KEY (user_id, alert_key),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

