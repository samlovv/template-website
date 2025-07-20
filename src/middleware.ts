import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Задаем маршруты
const protectedRoutes = [ "/profile", "/create", "/saved"]; // для авторизованных
const adminRoutes = ["/admin"]; // только для админов

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // 🔒 Проверка авторизации
  const requiresAuth = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (requiresAuth && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔒 Проверка на администратора
  const requiresAdmin = adminRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (requiresAdmin) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/create",
    "/admin",
    "/saved",
  ],
};