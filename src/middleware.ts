import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Temporariamente, considera o usuário como logado
  const logado = true;

  if (logado) {
    const url = request.nextUrl.clone();
    const pathname = url.pathname;
    const searchParams = url.searchParams;

    // Regra: Se URL é /cadastro?pa=true → permite acesso à /cadastro (fica em /cadastro)
    if (pathname === "/cadastro" && searchParams.get("pa") === "true") {
      // Permite que a página /cadastro seja acessada
      return NextResponse.next();
    }

    // Regra: Se URL é / ou /cadastro (sem pa=true) → redirecionar para /dashboard
    if (pathname === "/" || pathname === "/cadastro") {
      url.pathname = "/dashboard";
      url.search = ""; // Remove os parâmetros de query
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configuração para definir em quais rotas o middleware deve ser executado
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png).*)",
  ],
};
