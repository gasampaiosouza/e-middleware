import express from 'express';
import cors from 'cors';

import { getCorsOptions } from './utils/getCorsOptions';

import StoresController from 'controllers/StoresController';

const ROUTER = express.Router();
var CORS_OPTIONS = getCorsOptions();

const Stores = new StoresController();

ROUTER.get('/md/:store/:acronym', cors(CORS_OPTIONS), Stores.index);

export default ROUTER;
