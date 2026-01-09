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
        { name: "PROJECTS", isHeading: true },
        { name: "NG FACTORY PIPELINES AND SKIDS INSTALLATIONS" },
        { name: "LNG STORAGE TANKS AND SYSTEM INSTALLATIONS" },
        { name: "NITROGEN & OXYGEN GENERATORS" },
        { name: "PRODUCTS", isHeading: true },
        { name: "Pipes" },
        { name: "Valves & Fittings" },
        { name: "Flexible connections" },
        { name: "Filters" },
        { name: "Pressure Regulators" },
        { name: "Gas Meters" },
        { name: "Solenoid valves" },
        { name: "GAS SKIDS / PRMS" },
        { name: "LNG/LPG STORAGE TANKS and systems" },
      ],
    },
    {
      name: "Dairy & Food",
      subCategories: [
        { name: "PROJECTS", isHeading: true },
        { name: "DAIRY PLANTS" },
        { name: "WATER TREATMENT PLANTS" },
        { name: "CIP PLANTS" },
        { name: "PILOT PLANT / MINI PLANT" },
        { name: "FACTORY RELOCATIONS" },
        { name: "SS STORAGE TANKS & MIXERS" },
        { name: "CLEANING STATIONS" },
        { name: "IBC DOSING STATIONS" },
        { name: "PLATFORMS" },
        { name: "SS PIPINGS" },
        { name: "PRODUCTS", isHeading: true },
        { name: "SS DRAINS" },
        { name: "SS Valve & Fittings" },
        { name: "Flexible connections" },
        { name: "pumps" },
      ],
    },
    {
      name: "Industrial",
      subCategories: [
        { name: "PROJECTS", isHeading: true },
        { name: "HOME & PERSONAL CARE PLANTS" },
        { name: "SULPHONATION PLANT" },
        { name: "LAB PLANT" },
        { name: "TANK FARMS" },
        { name: "UTILITY & pipings" },
        { name: "READY FACTORIES TO BUY FOR BUSINESS INVESTMENTS" },
        { name: "PRODUCTS", isHeading: true },
        { name: "FANS" },
        { name: "NITROGEN / OXYGEN GENERATORS" },
        { name: "BOILERS" },
        { name: "PUMPS" },
        { name: "FILTRATION SYSTEMS" },
        { name: "LIQUID DOSING SYSTEMS" },
      ],
    },
    {
      name: "Consulting & Services",
      subCategories: [
        { name: "SERVICES", isHeading: true },
        { name: "AMC contracts" },
        { name: "FAN Balance and Monitoring" },
        { name: "Thermal inspections" },
        { name: "Vibration checks" },
        { name: "Central Lubrication system" },
        { name: "Tightening checks" },
        { name: "6S Trainings" },
        { name: "TPM" },
        { name: "Focused Improvements" },
        { name: "Autonomus Maintenance" },
        { name: "Planned Maintenance" },
        { name: "Energy Savings RISK ASSESMENT" },
        { name: "COST Reductions" },
        { name: "Early Equipment Management" },
        { name: "HSE Risk Assessments and Predictions" },
        { name: "Efficiency monitoring-FOL" },
        { name: "Low cost Automations" },
        { name: "SUPPLY CHAIN - RAW MATERIALS" },
      ],
    },
  ];

  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <CollapsibleSidebarClient sections={sections} />
    </Suspense>
  );
}

