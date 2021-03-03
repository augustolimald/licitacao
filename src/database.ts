import mysql, { Connection } from 'mysql2';

class Database {
	private connection: Connection;
	
	constructor() {
		this.connection = mysql.createConnection({
			host: process.env.DATABASE_HOST,
			port: parseInt(process.env.DATABASE_PORT),
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_SCHEMA,
		});
	}

	async connect(): Promise<boolean> {
		return new Promise(resolve => {
			this.connection.connect(err => {
				resolve(!err);
			});
		})
		
	}

	getConnection(): Connection {
		return this.connection;
	}
}

export default new Database();