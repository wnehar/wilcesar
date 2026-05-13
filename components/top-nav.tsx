"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";

export function TopNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (pathname === "/auth") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[90] flex justify-end items-center gap-3 px-4 sm:px-6 py-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        {user ? (
          <>
            <Link
              href="/profil"
              className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/90 hover:text-white px-3 py-2 rounded-full border border-white/15 bg-black/40 backdrop-blur-md hover:border-white/35 transition-colors"
            >
              Profil
            </Link>
            <button
              type="button"
              onClick={logout}
              className="text-xs sm:text-sm font-bold tracking-widest uppercase text-silver hover:text-white px-3 py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-md transition-colors"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth?mode=login"
              className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/90 hover:text-white px-3 py-2 rounded-full border border-white/15 bg-black/40 backdrop-blur-md hover:border-white/35 transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/auth?mode=signup"
              className="text-xs sm:text-sm font-bold tracking-widest uppercase text-black bg-white hover:bg-silver px-3 py-2 rounded-full transition-colors"
            >
              Créer un compte
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
