import dotenv from 'dotenv';

export default function getEnv(variable: string) {
	dotenv.config();

	return process.env[variable];
}
