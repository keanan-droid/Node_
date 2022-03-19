import { config } from 'dotenv';
import { DBConfig } from '../Config/db.config'
import { genSalt, hash } from 'bcrypt'
import { compare } from 'bcrypt';
config()

export class AuthController {

    async signup(request, response){
        const pool = new DBConfig().getPool();

        const { email, password, username } = request.body;

        if (!email || !password || !username) {
            return response
            .status(400)
            .json({ msg: "All fields are required to create account"});
        }


        try {
            const salt = await genSalt(18)
            const hashedPassword = password
            const query = {
                text: "INSERT INTO Account (email, password, username) VALUES ($1, $2, $3)",
                values: [email, hashedPassword, username],
            };
            const pgClient = await pool.connect();
            await pgClient.query(query);
            pgClient.release();
            return response.status(201).json({ msg: "Account created" });
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    async signin(request, response) {
        const { email, password, username } = request.body;

        if (!email || !password || !username) {
            return response
            .status(400)
            .json({ msg: "All fields are required to login"});
        }

        const query = {
            text: "SELECT * FROM Account WHERE email = $1",
            values: [email],
        };

        const pool = new DBConfig().getPool();

        try {
            const pgClient = await pool.connect();
            const account = await (await pgClient.query(query)).rows[0];
            
            if (!account) {
                return response
                .status(404)
                .json({ msg: "Account with this email does not exist" });
            }

            const isValidPassword = await compare(password, account.password);

            if (!isValidPassword) {
                return response.status(401).json({ msg: "Invalid credentials" });
            }

            const token_payload = {
                email: account.email,
            }

            const token = sign(token_payload, process.env.token_secret, {
                 expiresIn: '10d',
                })

        } catch (error) {
            return response.status(500).json(error);
        }
    }

    // async update(req, res) {
    //     const { email, password, username } = request.body;

    //     if (!email || !password || !username) {
    //         return response
    //         .status(400)
    //         .json({ msg: "All fields are required to login"});
    //     }
    // }
}