import 'express-serve-static-core';
import { AuthPayload } from '../middleware/auth.js';

declare module 'express-serve-static-core' {
	interface Request {
		user?: AuthPayload;
	}
}
