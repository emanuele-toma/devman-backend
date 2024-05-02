import { authControllers } from './auth';
import { rootControllers } from './root';

export const CONTROLLERS = {
  root: rootControllers,
  auth: authControllers,
} as const;
