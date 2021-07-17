create table `group` (
	id bigint primary key auto_increment,
	name varchar(200) not null,
	created_at timestamp default current_timestamp()
	updated_at timestamp default current_timestamp() on update current_timestamp()
);
create index group_name on group(name);