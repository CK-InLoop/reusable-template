import ProductSidebarClient from "./ProductSidebarClient";

export default function ProductSidebar() {
  // Extract product categories from text_blocks
  const sections = [
    {
      name: "Oil",
      subCategories: [
        "NG Factory Pipelines and SKIDS Installation",
        "LNG STORAGE TANKS AND SYSTEM INSTALLATION",
        "NITROGEN & OXYGEN GENERATORS",
      ],
    },
    {
      name: "Dairy",
      subCategories: [
        "Dairy plants",
        "Water treatment plants",
        "CIP Plants",
        "Pilot plant/Mini plant",
        "Factory relocation",
        "SS storage tanks & mixers",
        "Cleaning stations",
        "IBC Dosing Stations",
        "Platforms",
        "SS pipings",
      ],
    },
    {
      name: "Industrial",
      subCategories: [
        "Home and persona care plants",
        "Sulphonation plant",
        "Lab plant",
        "Tank farms",
        "Utility & pipings",
      ],
    },
    {
      name: "Consulting",
      subCategories: [
        "AMC Contracts",
        "Fan Balance and Monitoring",
        "Thermal Inspections",
        "Vibration Checks",
        "Central Lubrication System",
        "Tightening Checks",
        "6S Trainings",
        "TPM (Total Productive Maintenance)",
        "Focused Improvements",
        "Autonomous Maintenance",
        "Planned Maintenance",
        "Energy Savings Risk Assessment",
        "Cost Reductions",
        "Early Equipment Management",
        "HSE Risk Assessments and Predictions",
        "Efficiency Monitoring – FOL",
        "Low Cost Automations",
        "Supply Chain – Raw Materials",
      ],
    },
  ];

  return <ProductSidebarClient sections={sections} />;
}

