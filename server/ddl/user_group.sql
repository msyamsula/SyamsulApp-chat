CREATE table `user_group` (
	id bigint primary key auto_increment,
	user_id bigint not null ,
	group_id bigint not null,
	foreign key (user_id) references `user`(id),
	foreign key (group_id) references `group`(id)
);
create index user_group_user_id_index on `user_group`(user_id);
create index user_group_group_id_index on `user_group`(group_id);