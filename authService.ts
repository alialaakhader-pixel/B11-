// Authentication and Gmail Account Sync Service
// Dedicated Owner Security & Score Linking for alialaakhader@gmail.com

export const OWNER_EMAIL = 'alialaakhader@gmail.com';

export interface UserAccount {
  email: string;
  name: string;
  avatar: string;
  isOwner: boolean;
  linkedAt: string;
}

const AUTH_STORAGE_KEY = 'b11_user_account';

export function getCurrentUser(): UserAccount | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const user: UserAccount = JSON.parse(raw);
    // Recalculate isOwner dynamically
    user.isOwner = user.email.toLowerCase().trim() === OWNER_EMAIL.toLowerCase().trim();
    return user;
  } catch {
    return null;
  }
}

export function isOwner(): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  return user.email.toLowerCase().trim() === OWNER_EMAIL.toLowerCase().trim();
}

export function loginWithGmail(email: string, name?: string): UserAccount {
  const cleanEmail = email.toLowerCase().trim();
  const displayName = name?.trim() || cleanEmail.split('@')[0];
  const isOwnerUser = cleanEmail === OWNER_EMAIL.toLowerCase().trim();

  const user: UserAccount = {
    email: cleanEmail,
    name: isOwnerUser ? 'المالك الرسمي (علي)' : displayName,
    avatar: isOwnerUser ? '👑' : '⚽',
    isOwner: isOwnerUser,
    linkedAt: new Date().toLocaleDateString('ar-EG'),
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem('b11_my_player_name', user.name);
  return user;
}

export function logout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
