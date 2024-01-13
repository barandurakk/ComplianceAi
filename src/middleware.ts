import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AppConfig } from './utils/AppConfig';
import {  setDefaultRole } from './server/actions/_authActions';

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

export default authMiddleware({
  publicRoutes: (req: NextRequest) => ['/', '/sign-in', '/sign-out'].includes(req.nextUrl.pathname),

  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },

  // eslint-disable-next-line consistent-return
  afterAuth: async (auth, req) => {

    const isAuth = Boolean(auth.userId)
    console.log('isAuth: ', isAuth)
    const userId = auth.userId

    console.log('currUrl: ', req.nextUrl.pathname)

    if(!isAuth){
      // Handle users who aren't authenticated
      if ( !auth.isPublicRoute) {
        return redirectToSignIn({ returnBackUrl: req.url });
      }

      //If user not auth but route is public
      if ( auth.isPublicRoute) {
        return NextResponse.next();
      }
    }

    //MEMBERS
    const role =  auth?.sessionClaims?.metadata?.role
    console.log('role: ', role)
    if(!role){
      await setDefaultRole(userId)
    }

     //If user auth but try to  reach public route
     if (isAuth && auth.isPublicRoute) {
      console.log('Its public only, redirecting..')
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },

});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
