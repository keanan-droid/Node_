import { Pool } from "pg"
import { config } from 'dotenv'
config()

export class DBConfig{

    constructor(){
        this.pool = new Pool({
            connectionString: process.env.DB_URL
        })
    }

    getPool(){
        return this.pool;
    }
}