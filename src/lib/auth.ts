import * as SecureStore from 'expo-secure-store';

const ACCOUNTS_KEY = 'fateful-moment.accounts.v1';

type Account = {
  email: string;
  name: string;
  password: string;
};

type AccountMap = Record<string, Account>;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function readAccounts(): Promise<AccountMap> {
  const serialized = await SecureStore.getItemAsync(ACCOUNTS_KEY);
  if (!serialized) return {};

  try {
    return JSON.parse(serialized) as AccountMap;
  } catch {
    return {};
  }
}

export async function registerAccount({ name, email, password }: Omit<Account, 'email'> & { email: string }) {
  const accounts = await readAccounts();
  const normalizedEmail = normalizeEmail(email);
  if (accounts[normalizedEmail]) return { ok: false as const, reason: 'exists' as const };

  accounts[normalizedEmail] = { name: name.trim(), email: normalizedEmail, password };
  await SecureStore.setItemAsync(ACCOUNTS_KEY, JSON.stringify(accounts));
  return { ok: true as const };
}

export async function signInWithAccount(email: string, password: string) {
  const accounts = await readAccounts();
  const account = accounts[normalizeEmail(email)];
  if (!account) return { ok: false as const, reason: 'not-found' as const };
  if (account.password !== password) return { ok: false as const, reason: 'wrong-password' as const };
  return { ok: true as const, account };
}
