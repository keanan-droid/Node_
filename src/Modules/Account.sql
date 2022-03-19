CREATE Account TABLE(
    acc_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(89) NOT NULL UNIQUE,
    password VARCHAR(89) NOT NULL,
    username VARCHAR(89) NOT NULL UNIQUE
);

CREATE ISDONE TYPE Enum(
    "T",
    "F"
);

Create Task TABLE(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(89),
    acc_owner INTEGER REFERENCES ACCOUNT(acc_id) NOT NULL,
    due_date DATE NOT NULL,
    task ISDONE NOT NULL
);