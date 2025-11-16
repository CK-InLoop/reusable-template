/**
 * Maps external image URLs from details.txt to local /assets/ paths
 */
export function getLocalImagePath(externalUrl: string): string {
  // Extract filename from URL
  const urlParts = externalUrl.split("/");
  const filename = urlParts[urlParts.length - 1];

  // Handle special cases and variations
  const imageMap: Record<string, string> = {
    "pakmon-energy-efficient-equipment-manufacturing-l.l.c-logo.jpg":
      "/assets/pakmon-energy-efficient-equipment-manufacturing-l.l.c-logo-4.jpg",
    "main-page-1.jpg": "/assets/main-page-1-2.jpg",
    "application-93.jpg": "/assets/application-93.jpg",
    "application-94.jpg": "/assets/application-94-2.jpg",
    "application-95.jpg": "/assets/application-95.jpg",
    "products-32.jpg": "/assets/products-32.jpg",
    "application-70.jpg": "/assets/application-70.jpg",
    "application-71.jpg": "/assets/application-71-2.jpg",
    "application-72.jpg": "/assets/application-72.jpg",
    "application-75.jpg": "/assets/application-75.jpg",
    "application-76.jpg": "/assets/application-76.jpg",
    "application-73.jpg": "/assets/application-73.jpg",
    "application-74.jpg": "/assets/application-74-2.jpg",
    "corporate-7.jpg": "/assets/corporate-7.jpg",
    "corporate-2.jpg": "/assets/corporate-2.jpg",
    "corporate-91.jpg": "/assets/corporate-91.jpg",
    "corporate-3.jpg": "/assets/corporate-3.jpg",
    "products-4.jpg": "/assets/products-4.jpg",
    "products-77.jpg": "/assets/products-77-1.jpg",
    "products-78.jpg": "/assets/products-78-1.jpg",
    "products-96.jpg": "/assets/products-96-1.jpg",
    "turn-key-water-treatment-systems-35.jpg":
      "/assets/turn-key-water-treatment-systems-35.jpg",
    "products-23.jpg": "/assets/products-23-1.jpg",
    "products-24.jpg": "/assets/products-24.jpg",
    "products-25.jpg": "/assets/products-25.jpg",
    "products-26.jpg": "/assets/products-26-1.jpg",
    "products-28.jpg": "/assets/products-28-1.jpg",
    "products-29.jpg": "/assets/products-29-1.jpg",
    "products-30.jpg": "/assets/products-30-1.jpg",
    "products-31.jpg": "/assets/products-31.jpg",
    "electrical-instrumentation-control-division-environmental-process-equipment-division-service-value-added-engineering-division.png":
      "/assets/electrical-instrumentation-control-division-environmental-process-equipment-division-service-value-added-engineering-division.png",
  };

  // Return mapped path if exists, otherwise try to construct from filename
  if (imageMap[filename]) {
    return imageMap[filename];
  }

  // Fallback: try to use filename directly in /assets/
  return `/assets/${filename}`;
}

/**
 * Get local image path with fallback
 */
export function getImagePath(
  externalUrl: string | undefined,
  fallback?: string
): string {
  if (!externalUrl) {
    return fallback || "/assets/main-page-1-2.jpg";
  }
  return getLocalImagePath(externalUrl);
}

