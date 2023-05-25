import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } from '$env/static/private';
import knex from 'knex';

export const db = knex({
	client: 'mysql2',
	connection: {
		host: DB_HOST,
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_DATABASE
	}
});
