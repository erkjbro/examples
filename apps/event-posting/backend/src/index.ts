import dotenv from 'dotenv';

import { APIServer } from './api-server';

dotenv.config();
APIServer.start().then(() => console.log('running'));
