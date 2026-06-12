export async function createSession(kv: KVNamespace): Promise<string> {
  const token = crypto.randomUUID();
  await kv.put(`session:${token}`, '1', { expirationTtl: 86400 });
  return token;
}

export async function validateSession(kv: KVNamespace, token: string): Promise<boolean> {
  try {
    const val = await kv.get(`session:${token}`);
    return val !== null;
  } catch {
    return false;
  }
}

export async function deleteSession(kv: KVNamespace, token: string): Promise<void> {
  try {
    await kv.delete(`session:${token}`);
  } catch { /* ignore */ }
}
