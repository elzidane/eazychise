// ─── Auth helpers (localStorage-based for demo/lomba) ──────────────────
export type UserRole = "franchisee" | "franchisor";

export type User = {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  savedFranchises: string[];
  searchHistory: string[];
};

const USERS_KEY = "eazychise_users";
const CURRENT_USER_KEY = "eazychise_current_user";

function getUsers(): Record<string, User & { password: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, User & { password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function register(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}): { success: boolean; error?: string } {
  const users = getUsers();
  const emailKey = data.email.toLowerCase().trim();

  if (users[emailKey]) {
    return { success: false, error: "Email sudah terdaftar. Silakan masuk." };
  }

  users[emailKey] = {
    name: data.name.trim(),
    email: emailKey,
    phone: data.phone.trim(),
    password: data.password,
    role: data.role,
    createdAt: new Date().toISOString(),
    savedFranchises: [],
    searchHistory: [],
  };

  saveUsers(users);
  return { success: true };
}

export function login(email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getUsers();
  const emailKey = email.toLowerCase().trim();
  const found = users[emailKey];

  if (!found) {
    return { success: false, error: "Akun tidak ditemukan. Silakan daftar terlebih dahulu." };
  }

  if (found.password !== password) {
    return { success: false, error: "Password salah. Silakan coba lagi." };
  }

  // Store current user (without password)
  const { password: _, ...userWithoutPassword } = found;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

  return { success: true, user: userWithoutPassword };
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getUser() !== null;
}

export function saveFranchise(franchiseName: string) {
  const user = getUser();
  if (!user) return;

  if (!user.savedFranchises.includes(franchiseName)) {
    user.savedFranchises.push(franchiseName);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    // Also update in users store
    const users = getUsers();
    const emailKey = user.email.toLowerCase();
    if (users[emailKey]) {
      users[emailKey].savedFranchises = user.savedFranchises;
      saveUsers(users);
    }
  }
}

export function removeSavedFranchise(franchiseName: string) {
  const user = getUser();
  if (!user) return;

  user.savedFranchises = user.savedFranchises.filter(f => f !== franchiseName);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

  const users = getUsers();
  const emailKey = user.email.toLowerCase();
  if (users[emailKey]) {
    users[emailKey].savedFranchises = user.savedFranchises;
    saveUsers(users);
  }
}

export function addSearchHistory(query: string) {
  const user = getUser();
  if (!user) return;

  user.searchHistory = [query, ...user.searchHistory.filter(q => q !== query)].slice(0, 10);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

  const users = getUsers();
  const emailKey = user.email.toLowerCase();
  if (users[emailKey]) {
    users[emailKey].searchHistory = user.searchHistory;
    saveUsers(users);
  }
}
