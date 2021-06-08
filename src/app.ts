import express from 'express';
import cors from 'cors';

import ROUTER from '@src/routes';
import getEnv from '@utils/get-env';

const APP = express();
const PORT = getEnv('PORT') || 8080;

APP.use(express.json());
APP.use(cors());
APP.use(ROUTER);

// prevent test to listen to a existing port
if (process.env.NODE_ENV !== 'test') {
	APP.listen(PORT, () => {
		console.log(`⚡️ Server is running at http://localhost:${PORT}`);
	});
}

export default APP;
