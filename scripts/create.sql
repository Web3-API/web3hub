create table users (
  id bigserial not null,
  username varchar,
  github_id varchar,
  github_token varchar,
  primary key(id),
  UNIQUE(username),
  UNIQUE(github_id)
);
create table addresses_types (
  id bigserial not null,
  name varchar not null,
  primary key(id)
);
create table addresses (
  id bigserial not null,
  address varchar not null,
  fk_user_id bigint not null,
  fk_address_type_id bigint not null,
  UNIQUE(address),
  primary key(id),
  constraint fk_addresses_user foreign key (fk_user_id) references users(id),
  constraint fk_addresses_address_type foreign key (fk_address_type_id) references addresses_types(id)
);
create table organizations (
  id bigserial not null,
  name varchar not null,
  location varchar,
  primary key(id)
);
create table user_organizations (
  id bigserial not null,
  fk_user_id bigint not null,
  fk_organization_id bigint not null,
  primary key(id),
  constraint fk_user_organizations_user foreign key (fk_user_id) references users(id),
  constraint fk_user_organizations_org foreign key (fk_organization_id) references organizations(id)
);
create table apis (
  id bigserial not null,
  name varchar not null,
  description varchar not null,
  subtext varchar not null,
  icon varchar not null,
  visible boolean default true,
  fk_owner_id bigint not null not null,
  fk_organization_id bigint,
  primary key(id),
  constraint fk_api_owner foreign key (fk_owner_id) references users(id),
  constraint fk_api_organization foreign key (fk_organization_id) references organizations(id)
);
create table uri_types (
  id bigserial not null,
  name varchar not null,
  type varchar not null,
  UNIQUE(name),
  primary key(id)
);
create table api_uris (
  id bigserial not null,
  uri varchar not null,
  fk_api_id bigint not null,
  fk_uri_type_id bigint not null,
  primary key(id),
  constraint fk_api_uris_type foreign key (fk_uri_type_id) references uri_types(id)
);
create table starred_apis (
  id bigserial not null,
  fk_user_id bigint not null,
  fk_api_id bigint not null,
  constraint fk_starred_api_user foreign key (fk_user_id) references users(id),
  constraint fk_starred_api_api foreign key (fk_api_id) references apis(id)
);
insert into addresses_types (name)
values ('ethereum');
insert into uri_types (name, type)
values ('ens', 'pointer');
insert into uri_types (name, type)
values ('ipfs', 'storage');