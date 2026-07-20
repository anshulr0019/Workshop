import * as XLSX from "xlsx";
import type { InventoryItem } from "../data/carData";

export type Query = {
  id: string;
  customerName: string;
  phone: string;
  carModel: string;
  issue: string;
  status: "new" | "in-progress" | "quoted" | "done";
  date: string;
  notes: string;
};

export type Job = {
  id: string;
  customerName: string;
  carModel: string;
  regNo: string;
  services: string;
  estimatedCost: number;
  status: "pending" | "in-progress" | "completed" | "delivered";
  dateIn: string;
  dateOut: string;
};

const normalizeSheetName = (name: string) => name.trim().toLowerCase();

const getSheet = (workbook: XLSX.WorkBook, expectedName: string) => {
  const match = workbook.SheetNames.find(
    (name) => normalizeSheetName(name) === normalizeSheetName(expectedName)
  );
  return match ? workbook.Sheets[match] : undefined;
};

const toNumber = (value: unknown, fallback = 0) => {
  const numeric = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
};

const toString = (value: unknown) => (value ?? "").toString().trim();

export const exportToExcel = (
  inventory: InventoryItem[],
  queries: Query[],
  jobs: Job[]
) => {
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(inventory), "Inventory");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(queries), "Queries");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(jobs), "Jobs");
  const fileName = `manoj-automobile-${new Date().toISOString().split("T")[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName, { compression: true });
};

export const importFromExcel = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const errors: string[] = [];

  const inventorySheet = getSheet(workbook, "Inventory");
  const queriesSheet = getSheet(workbook, "Queries");
  const jobsSheet = getSheet(workbook, "Jobs");

  const inventoryRows = inventorySheet
    ? XLSX.utils.sheet_to_json<Record<string, unknown>>(inventorySheet, { defval: "" })
    : [];
  const queryRows = queriesSheet
    ? XLSX.utils.sheet_to_json<Record<string, unknown>>(queriesSheet, { defval: "" })
    : [];
  const jobRows = jobsSheet
    ? XLSX.utils.sheet_to_json<Record<string, unknown>>(jobsSheet, { defval: "" })
    : [];

  if (!inventorySheet) errors.push("Missing sheet: Inventory");
  if (!queriesSheet) errors.push("Missing sheet: Queries");
  if (!jobsSheet) errors.push("Missing sheet: Jobs");

  const inventory: InventoryItem[] = inventoryRows
    .map((row, index) => {
      const name = toString(row.name || row.Name);
      if (!name) { errors.push(`Inventory row ${index + 2} missing name.`); return null; }
      return {
        id: toString(row.id || row.ID || `inv-${Date.now()}-${index}`),
        name,
        category: toString(row.category || row.Category || "General"),
        stock: toNumber(row.stock || row.Stock),
        unit: toString(row.unit || row.Unit || "pcs"),
        minStock: toNumber(row.minStock || row.MinStock || row["Min Stock"]),
        costPerUnit: toNumber(row.costPerUnit || row.CostPerUnit || row["Cost Per Unit"]),
        lastUpdated: toString(row.lastUpdated || row.LastUpdated || new Date().toISOString()),
      } as InventoryItem;
    })
    .filter(Boolean) as InventoryItem[];

  const queries: Query[] = queryRows
    .map((row, index) => {
      const customerName = toString(row.customerName || row["Customer Name"]);
      const carModel = toString(row.carModel || row["Car Model"]);
      const issue = toString(row.issue || row.Issue);
      if (!customerName || !carModel || !issue) {
        errors.push(`Query row ${index + 2} missing required fields.`); return null;
      }
      return {
        id: toString(row.id || row.ID || `q-${Date.now()}-${index}`),
        customerName, phone: toString(row.phone || row.Phone), carModel, issue,
        status: (toString(row.status || row.Status || "new")) as Query["status"],
        date: toString(row.date || row.Date || new Date().toISOString()),
        notes: toString(row.notes || row.Notes),
      } as Query;
    })
    .filter(Boolean) as Query[];

  const jobs: Job[] = jobRows
    .map((row, index) => {
      const customerName = toString(row.customerName || row["Customer Name"]);
      const carModel = toString(row.carModel || row["Car Model"]);
      if (!customerName || !carModel) {
        errors.push(`Job row ${index + 2} missing required fields.`); return null;
      }
      return {
        id: toString(row.id || row.ID || `j-${Date.now()}-${index}`),
        customerName, carModel,
        regNo: toString(row.regNo || row["Reg No"] || row["Reg Number"]),
        services: toString(row.services || row.Services),
        estimatedCost: toNumber(row.estimatedCost || row["Estimated Cost"]),
        status: (toString(row.status || row.Status || "pending")) as Job["status"],
        dateIn: toString(row.dateIn || row["Date In"]),
        dateOut: toString(row.dateOut || row["Date Out"]),
      } as Job;
    })
    .filter(Boolean) as Job[];

  return { inventory, queries, jobs, errors };
};