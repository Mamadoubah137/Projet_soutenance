// En mémoire (pour prod, utilise Redis)
export const tokenBlacklist = new Set();

export function blacklistToken(token) {
  tokenBlacklist.add(token);
}

export function isBlacklisted(token) {
  return tokenBlacklist.has(token);
}
