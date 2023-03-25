import { NextResponse } from "next/server";

export default function middleware(req) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next()
  }
  const role = req.cookies.get("supportUserRole");
  if (role === undefined && !req.url.includes('/login')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}