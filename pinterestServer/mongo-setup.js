var db = connect("mongodb://admin:admin@localhost:27017/pinterest?authSource=admin")

db.createUser(
    {
        user: "pinterest-server",
        pwd: "admin",
        roles: [{ role: "readWrite", db: "orbis" }]
    }
)
db.createRole(
    {
        role: "api-role",
        privileges: [
            {
                resource: { db: "pinterest", collection: "users" }, actions: ["collStats"
                    , "convertToCapped"
                    , "createCollection"
                    , "dbHash"
                    , "dbStats"
                    , "dropCollection"
                    , "createIndex"
                    , "dropIndex"
                    , "find"
                    , "insert"
                    , "killCursors"
                    , "listIndexes"
                    , "listCollections"
                    , "remove"
                    , "renameCollectionSameDB"
                    , "update"]
            },
            {
                resource: { db: "pinterest", collection: "etftransferorders" }, actions: ["collStats"
                    , "convertToCapped"
                    , "createCollection"
                    , "dbHash"
                    , "dbStats"
                    , "dropCollection"
                    , "createIndex"
                    , "dropIndex"
                    , "find"
                    , "insert"
                    , "killCursors"
                    , "listIndexes"
                    , "listCollections"
                    , "remove"
                    , "renameCollectionSameDB"
                    , "update"]
            }
        ],
        roles: [
            { role: "read", db: "pinterest" }
        ]
    }
)

db.createUser(
    {
        user: "pinterest-server",
        pwd: "admin",
        roles: [{ role: "api-role", db: "pinterest" }]
    }
)
