import { Suspense } from "react";
import CollapsibleSidebarClient from "./CollapsibleSidebarClient";

function SidebarSkeleton() {
  return (
    <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg"></div>
  );
}

export default function CollapsibleSidebar() {
  // Extract product categories from text_blocks
  const sections = [
    {
      name: "OIL & GAS Piping Systems",
      subCategories: [
        "NG Factory Pipelines and SKIDS Installation",
        "LNG STORAGE TANKS AND SYSTEM INSTALLATION",
        "NITROGEN & OXYGEN GENERATORS",
      ],
    },
    {
      name: "Dairy & Food",
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
      name: "Consulting & Services",
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

  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <CollapsibleSidebarClient sections={sections} />
    </Suspense>
  );
}

