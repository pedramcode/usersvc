db.createUser(
    {
        user: "admin",
        pwd: "abc123",
        roles: [
            {
                role: "readWrite",
                db: "userservice"
            }
        ]
    }
);