/**
 * Persistance locale (démo) — pas de serveur, données dans le navigateur.
 */

export type ZUser = {
  email: string;
  password: string;
  prenom: string;
  nom: string;
  createdAt: string;
};

export type ZReservation = {
  id: string;
  userEmail: string;
  type: "stage" | "vehicule";
  titre: string;
  sousTitre: string;
  montantEuros: number;
  statut: "confirmée";
  createdAt: string;
  meta: Record<string, unknown>;
};

export type PendingReservationPayload = {
  type: "stage" | "vehicule";
  titre: string;
  sousTitre: string;
  montantEuros: number;
  meta: Record<string, unknown>;
  guestEmailHint?: string;
};

const USERS = "zenturo_users_v1";
const SESSION = "zenturo_session_v1";
const RESERVATIONS = "zenturo_reservations_v1";
const GATE = "zenturo_gate_done_v1";
const PENDING_SESSION = "zenturo_pending_reservation";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function isGateDone(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(GATE) === "1";
}

export function setGateDone(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(GATE, "1");
}

export function getUsers(): ZUser[] {
  if (typeof window === "undefined") return [];
  return safeParse<ZUser[]>(localStorage.getItem(USERS), []);
}

function saveUsers(users: ZUser[]) {
  localStorage.setItem(USERS, JSON.stringify(users));
}

export function registerUser(
  prenom: string,
  nom: string,
  email: string,
  password: string
): { ok: true } | { ok: false; error: string } {
  const e = email.trim().toLowerCase();
  if (!e || !password) return { ok: false, error: "Email et mot de passe requis." };
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === e)) {
    return { ok: false, error: "Un compte existe déjà avec cet email." };
  }
  users.push({
    email: e,
    password,
    prenom: prenom.trim(),
    nom: nom.trim(),
    createdAt: new Date().toISOString(),
  });
  saveUsers(users);
  setSessionEmail(e);
  consumePendingIntoUser(e);
  return { ok: true };
}

export function loginUser(
  email: string,
  password: string
): { ok: true } | { ok: false; error: string } {
  const e = email.trim().toLowerCase();
  const users = getUsers();
  const u = users.find(
    (x) => x.email.toLowerCase() === e && x.password === password
  );
  if (!u) return { ok: false, error: "Email ou mot de passe incorrect." };
  setSessionEmail(u.email);
  consumePendingIntoUser(u.email);
  return { ok: true };
}

export function logoutUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION);
}

export function getSessionEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION);
}

export function setSessionEmail(email: string): void {
  localStorage.setItem(SESSION, email.trim().toLowerCase());
}

export function getUserByEmail(email: string): ZUser | null {
  const e = email.trim().toLowerCase();
  return getUsers().find((u) => u.email.toLowerCase() === e) ?? null;
}

export function getReservationsForEmail(email: string): ZReservation[] {
  const all = safeParse<ZReservation[]>(
    localStorage.getItem(RESERVATIONS),
    []
  );
  return all
    .filter((r) => r.userEmail.toLowerCase() === email.trim().toLowerCase())
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

function saveAllReservations(list: ZReservation[]) {
  localStorage.setItem(RESERVATIONS, JSON.stringify(list));
}

export function addReservationForEmail(
  email: string,
  partial: Omit<ZReservation, "id" | "userEmail" | "createdAt">
): ZReservation {
  const all = safeParse<ZReservation[]>(
    localStorage.getItem(RESERVATIONS),
    []
  );
  const r: ZReservation = {
    ...partial,
    id: `r_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    userEmail: email.trim().toLowerCase(),
    createdAt: new Date().toISOString(),
  };
  all.push(r);
  saveAllReservations(all);
  return r;
}

export function setPendingReservation(p: PendingReservationPayload): void {
  sessionStorage.setItem(PENDING_SESSION, JSON.stringify(p));
}

export function getPendingReservation(): PendingReservationPayload | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(PENDING_SESSION);
  if (!raw) return null;
  return safeParse<PendingReservationPayload | null>(raw, null);
}

export function clearPendingReservation(): void {
  sessionStorage.removeItem(PENDING_SESSION);
}

export function consumePendingIntoUser(email: string): void {
  const pending = getPendingReservation();
  if (!pending) return;
  addReservationForEmail(email, {
    type: pending.type,
    titre: pending.titre,
    sousTitre: pending.sousTitre,
    montantEuros: pending.montantEuros,
    statut: "confirmée",
    meta: pending.meta ?? {},
  });
  clearPendingReservation();
}

export function recordReservationAfterPayment(
  emailConnected: string | null,
  guestEmail: string | undefined,
  data: Omit<ZReservation, "id" | "userEmail" | "createdAt" | "statut">
): void {
  if (emailConnected) {
    addReservationForEmail(emailConnected, {
      ...data,
      statut: "confirmée",
    });
    return;
  }
  setPendingReservation({
    type: data.type,
    titre: data.titre,
    sousTitre: data.sousTitre,
    montantEuros: data.montantEuros,
    meta: data.meta ?? {},
    guestEmailHint: guestEmail?.trim().toLowerCase() || undefined,
  });
}
