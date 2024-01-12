/* eslint-disable @typescript-eslint/consistent-type-imports */

import { ROLES } from './user';

// Use type safe message keys with `next-intl`
type Messages = typeof import('../locales/en.json');
declare interface IntlMessages extends Messages {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: ROLES;
    };
  }
}