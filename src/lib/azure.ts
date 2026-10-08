// Legacy Azure URL support for records that have not yet been migrated to R2.

const AZURE_SAS_URL = process.env.AZURE_SAS_URL?.trim() || '';
const SAS_TOKEN = AZURE_SAS_URL.includes('?') ? AZURE_SAS_URL.split('?')[1] : '';

function isAzureBlobUrl(fileUrl: string): boolean {
  try {
    return new URL(fileUrl).hostname === 'pakmon.blob.core.windows.net';
  } catch {
    return false;
  }
}

/**
 * Azure records still need their SAS token during the transition. Public R2
 * URLs are intentionally returned unchanged and never receive Azure secrets.
 */
export function getAzureSignedUrl(fileUrl: string): string {
  if (!fileUrl || !isAzureBlobUrl(fileUrl) || !SAS_TOKEN || fileUrl.includes('?')) {
    return fileUrl;
  }

  return `${fileUrl}?${SAS_TOKEN}`;
}
