# chat server

REQUIREMENTS
-- npm package --
1. nodemon: devtools
2. socket.io: websocket
3. express: http server
4. cors: cors
5. mongodb: for mongodb (http://mongodb.github.io/node-mongodb-native/)
6. crypto: make room unique
7. sequelize, mysql2: mysql connection, orm
-- ui tools --
1. compass: mongo ui
-- db --
mongo database: chat
mysql

MYSQL TABLE
-- group --
1. name varchar(200) not null unique
2. id bigint primary key
this table has relation many to many with user(signin project)

-- user-group --
0. id primary key not null auto increment
1. user_id bigint FK user.id index
2. group_id bigint FK group.id index
3. is_approve not null default false

DOCUMENTATIONS

NOTES
1. monggose schema is collection(table)