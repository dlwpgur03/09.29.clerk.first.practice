import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// 공개할 경로를 정의합니다: 메인 페이지, 로그인, 회원가입
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, request) => {
  // 공개 경로가 아니라면, 인증 상태를 확인합니다.
  if (!isPublicRoute(request)) {
    const { userId } = auth();
    // 로그인하지 않은 사용자는 로그인 페이지로 리디렉션합니다.
    if (!userId) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('redirect_url', request.url);
      return NextResponse.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*) ", "/", "/(api|trpc)(.*)"],
};
