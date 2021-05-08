import express from 'express';
import cors from 'cors';

import ROUTER from '~/src/routes';
import getEnv from './utils/getEnv';

const APP = express();
const PORT = getEnv('PORT') || 8080;

APP.use(express.json());
APP.use(cors());
APP.use(ROUTER);

APP.listen(PORT, () => {
	console.log(`⚡️ Server is running at https://localhost:${PORT}`);
});

export default APP;
