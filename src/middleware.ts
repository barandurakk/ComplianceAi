import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AppConfig } from './utils/AppConfig';
import { getRoleByUserId, setDefaultRole } from './server/utils/_actions';

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

export default authMiddleware({
  debug: true,
  publicRoutes: (req: NextRequest) =>
    !req.nextUrl.pathname.includes('/dashboard'),

  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },

  // eslint-disable-next-line consistent-return
  afterAuth: async (auth, req) => {
    
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    
    try{
      const role = await getRoleByUserId(auth.userId)
      if(!role){
        await setDefaultRole(auth.userId)
      }

      return NextResponse.next();
    }catch(err){
      console.error(err)
      return NextResponse.next();
    }
  },

});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
