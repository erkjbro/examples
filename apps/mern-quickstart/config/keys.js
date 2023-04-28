import { keys as testKeys } from './keys_test.js';
import { keys as devKeys } from './keys_dev.js';

const keys = process.env.NODE_ENV === 'test' ? testKeys : devKeys;

export { keys };
