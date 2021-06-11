import express from 'express';
import cors from 'cors';

import { getCorsOptions } from './utils/get-cors-options';

import StoresController from './controllers/stores_controller';

const ROUTER = express.Router();
var CORS_OPTIONS = getCorsOptions();

ROUTER.get('/', (_, res) => {
  res.json({ success: true })
});

ROUTER.get('/md/:store/:acronym', cors(CORS_OPTIONS), StoresController.find);
ROUTER.post('/md/:store/:acronym', cors(CORS_OPTIONS), StoresController.create);
ROUTER.patch('/md/:store/:acronym', cors(CORS_OPTIONS), StoresController.update);
ROUTER.delete('/md/:store/:acronym', cors(CORS_OPTIONS), StoresController.delete);

export default ROUTER;
