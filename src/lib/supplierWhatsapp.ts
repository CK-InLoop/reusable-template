export type ShareableSupplier = {
  id: string;
  name?: string | null;
  companyName?: string | null;
  email?: string | null;
  phone?: string | null;
  contactPhone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
  gstNumber?: string | null;
  description?: string | null;
  category?: string | null;
  subCategory?: string | null;
};

export type ShareableProduct = {
  id: string;
  supplierId?: string | null;
  name?: string | null;
  title?: string | null;
  category?: string | null;
  description?: string | null;
  shortDescription?: string | null;
  fullDescription?: string | null;
  specifications?: string | null;
  price?: number | null;
  priceRange?: string | null;
  capacity?: string | null;
  unit?: string | null;
  minOrderQty?: number | null;
  availability?: string | null;
  tags?: string[] | null;
};

function clean(value: unknown) {
  if (value === null || value === undefined || value === "") return "";
  return String(value).replace(/\s+/g, " ").trim();
}

function addLine(lines: string[], label: string, value: unknown) {
  const text = clean(value);
  if (text) lines.push(`${label}: ${text}`);
}

export function getSupplierDisplayName(supplier: ShareableSupplier) {
  return clean(supplier.companyName || supplier.name) || "Supplier";
}

export function buildSupplierWhatsAppMessage(
  supplier: ShareableSupplier,
  products: ShareableProduct[] = [],
  baseUrl?: string,
) {
  const supplierName = getSupplierDisplayName(supplier);
  const lines = [
    "Hello, I'd like to enquire about this supplier.",
    "",
    "*Supplier details*",
    `Company: ${supplierName}`,
  ];

  if (supplier.name && clean(supplier.name) !== clean(supplier.companyName)) {
    addLine(lines, "Contact name", supplier.name);
  }
  addLine(lines, "Category", supplier.category);
  addLine(lines, "Subcategory", supplier.subCategory);
  addLine(lines, "Email", supplier.email);
  addLine(lines, "Phone", supplier.phone);
  if (clean(supplier.contactPhone) !== clean(supplier.phone)) {
    addLine(lines, "Contact phone", supplier.contactPhone);
  }
  addLine(
    lines,
    "Address",
    [supplier.address, supplier.city, supplier.state, supplier.pincode]
      .map(clean)
      .filter(Boolean)
      .join(", "),
  );
  addLine(lines, "GST number", supplier.gstNumber);
  addLine(lines, "About", supplier.description);

  if (baseUrl) {
    addLine(lines, "Supplier page", `${baseUrl}/suppliers/${encodeURIComponent(supplier.id)}`);
  }

  lines.push("", `*Products (${products.length})*`);

  if (products.length === 0) {
    lines.push("No products are currently listed for this supplier.");
  } else {
    products.forEach((product, index) => {
      const productName = clean(product.title || product.name) || `Product ${index + 1}`;
      lines.push("", `*${index + 1}. ${productName}*`);
      addLine(lines, "Category", product.category);
      addLine(lines, "Short description", product.shortDescription);
      addLine(lines, "Description", product.description);
      addLine(lines, "Full description", product.fullDescription);
      addLine(lines, "Specifications", product.specifications);
      addLine(lines, "Price", product.price);
      addLine(lines, "Price range", product.priceRange);
      addLine(
        lines,
        "Capacity",
        [product.capacity, product.unit].map(clean).filter(Boolean).join(" "),
      );
      addLine(
        lines,
        "Minimum order",
        [product.minOrderQty, product.unit].map(clean).filter(Boolean).join(" "),
      );
      addLine(lines, "Availability", product.availability);
      addLine(lines, "Tags", product.tags?.join(", "));

      if (baseUrl && product.supplierId) {
        addLine(
          lines,
          "Product page",
          `${baseUrl}/suppliers/${encodeURIComponent(product.supplierId)}/products/${encodeURIComponent(product.id)}`,
        );
      }
    });
  }

  return lines.join("\n");
}

export function buildSupplierWhatsAppUrl(
  whatsappDigits: string,
  supplier: ShareableSupplier,
  products: ShareableProduct[] = [],
  baseUrl?: string,
) {
  return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
    buildSupplierWhatsAppMessage(supplier, products, baseUrl),
  )}`;
}
