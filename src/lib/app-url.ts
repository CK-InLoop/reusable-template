function withProtocol(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function getAppUrl() {
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (process.env.VERCEL && vercelUrl) return withProtocol(vercelUrl).replace(/\/$/, '');

  return withProtocol(process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, '');
}

export function applyProductionAuthUrl() {
  if (!process.env.VERCEL) return;
  process.env.NEXTAUTH_URL = getAppUrl();
}
