// Azure Blob Storage helpers

// SAS URL for the shared pakmon container (same as pakmon-supplier)
const AZURE_SAS_URL = process.env.AZURE_SAS_URL || "https://pakmon.blob.core.windows.net/pakmon?sp=racwdl&st=2026-01-05T08:42:31Z&se=2030-12-31T16:57:31Z&spr=https&sv=2024-11-04&sr=c&sig=VDn7ZB931YrJDYORMvPbyRUEBbgMlv%2BhdcyFxgiYg%2Bc%3D";

// Extract SAS token part (everything after the ?)
const SAS_TOKEN = AZURE_SAS_URL.includes('?') ? AZURE_SAS_URL.split('?')[1] : '';

/**
 * Generates a "signed URL" by appending the SAS token to the base blob URL.
 * Since the SAS token is long-lived and contains full container permissions,
 * we can simply append it to any blob in the container.
 */
export function getAzureSignedUrl(blobUrl: string): string {
    if (!blobUrl) return '';
    if (!SAS_TOKEN) return blobUrl;

    // Avoid double appending
    if (blobUrl.includes('?')) {
        return blobUrl;
    }

    return `${blobUrl}?${SAS_TOKEN}`;
}
