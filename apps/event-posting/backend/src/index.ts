import dotenv from 'dotenv';

import { APIServer } from './api-server';

dotenv.config();
await APIServer.start();
