import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 공개할 경로를 정의합니다: 메인 페이지, 로그인, 회원가입
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, request) => {
  // 공개 경로가 아니라면, 보호 처리(로그인 강제)합니다.
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*) ", "/", "/(api|trpc)(.*)"],
};