import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultInventory, type InventoryItem } from "../data/carData";
import type { Job, Query } from "../utils/excelUtils";

// Local prototype only; this is not authentication and is not imported by the public app.

const STORAGE_KEY_INV = "manoj-inventory";
const STORAGE_KEY_QUERIES = "manoj-queries";
const STORAGE_KEY_JOBS = "manoj-jobs";

type Tab = "dashboard" | "inventory" | "queries" | "jobs";

type InventoryForm = {
  name: string;
  category: string;
  stock: string;
  unit: string;
  minStock: string;
  costPerUnit: string;
};

const emptyInventoryForm: InventoryForm = {
  name: "",
  category: "",
  stock: "",
  unit: "Pieces",
  minStock: "",
  costPerUnit: "",
};

const sampleQueries: Query[] = [
  {
    id: "q1",
    customerName: "Rahul Sharma",
    phone: "9876543210",
    carModel: "Maruti Swift",
    issue: "Clutch slipping at high RPM",
    status: "new",
    date: new Date(Date.now() - 3600000).toISOString(),
    notes: "",
  },
  {
    id: "q2",
    customerName: "Priya Verma",
    phone: "9811223344",
    carModel: "Hyundai i20",
    issue: "AC not cooling properly",
    status: "quoted",
    date: new Date(Date.now() - 86400000).toISOString(),
    notes: "Check gas pressure, compressor, cooling coil, and leakage.",
  },
];

const sampleJobs: Job[] = [
  {
    id: "j1",
    customerName: "Suresh Kumar",
    carModel: "Toyota Innova",
    regNo: "DL-4C-AB-1234",
    services: "Full Service, Brake Pads",
    estimatedCost: 5400,
    status: "in-progress",
    dateIn: "2026-07-10",
    dateOut: "2026-07-11",
  },
  {
    id: "j2",
    customerName: "Neha Gupta",
    carModel: "Hyundai Creta",
    regNo: "DL-3A-XY-5678",
    services: "Clutch Overhaul",
    estimatedCost: 8500,
    status: "completed",
    dateIn: "2026-07-08",
    dateOut: "2026-07-09",
  },
];

const statusStyles: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-300",
  "in-progress": "bg-amber-500/15 text-amber-300",
  done: "bg-emerald-500/15 text-emerald-300",
  quoted: "bg-purple-500/15 text-purple-300",
  pending: "bg-orange-500/15 text-orange-300",
  completed: "bg-emerald-500/15 text-emerald-300",
  delivered: "bg-slate-500/15 text-slate-300",
};

interface Props {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: Props) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState(false);

  const [tab, setTab] = useState<Tab>("dashboard");
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [queries, setQueries] = useState<Query[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  const [showManageInventory, setShowManageInventory] = useState(false);
  const [showInventoryForm, setShowInventoryForm] = useState(false);
  const [editingInventoryId, setEditingInventoryId] = useState<string | null>(
    null,
  );
  const [inventoryForm, setInventoryForm] =
    useState<InventoryForm>(emptyInventoryForm);
  const [showInventoryConfirm, setShowInventoryConfirm] = useState(false);

  const [showAddQuery, setShowAddQuery] = useState(false);
  const [editingQueryNotesId, setEditingQueryNotesId] = useState<string | null>(
    null,
  );
  const [queryNotesDraft, setQueryNotesDraft] = useState("");

  const [showAddJob, setShowAddJob] = useState(false);

  const [newQuery, setNewQuery] = useState<Partial<Query>>({
    status: "new",
    notes: "",
  });

  const [newJob, setNewJob] = useState<Partial<Job>>({
    status: "pending",
    estimatedCost: 0,
  });

  useEffect(() => {
    const savedInventory = localStorage.getItem(STORAGE_KEY_INV);
    const savedQueries = localStorage.getItem(STORAGE_KEY_QUERIES);
    const savedJobs = localStorage.getItem(STORAGE_KEY_JOBS);

    setInventory(savedInventory ? JSON.parse(savedInventory) : defaultInventory);
    setQueries(savedQueries ? JSON.parse(savedQueries) : sampleQueries);
    setJobs(savedJobs ? JSON.parse(savedJobs) : sampleJobs);
  }, []);

  const saveInventory = useCallback((data: InventoryItem[]) => {
    setInventory(data);
    localStorage.setItem(STORAGE_KEY_INV, JSON.stringify(data));
  }, []);

  const saveQueries = useCallback((data: Query[]) => {
    setQueries(data);
    localStorage.setItem(STORAGE_KEY_QUERIES, JSON.stringify(data));
  }, []);

  const saveJobs = useCallback((data: Job[]) => {
    setJobs(data);
    localStorage.setItem(STORAGE_KEY_JOBS, JSON.stringify(data));
  }, []);

  const handleLogin = () => {
    if (import.meta.env.DEV && password === "LOCAL DEMO") {
      setAuthed(true);
      setPassword("");
      setPwError(false);
      return;
    }

    setPwError(true);
  };

  const openAddInventory = () => {
    setEditingInventoryId(null);
    setInventoryForm(emptyInventoryForm);
    setShowInventoryForm(true);
  };

  const openEditInventory = (item: InventoryItem) => {
    setEditingInventoryId(item.id);

    setInventoryForm({
      name: item.name,
      category: item.category,
      stock: String(item.stock),
      unit: item.unit,
      minStock: String(item.minStock),
      costPerUnit: String(item.costPerUnit),
    });

    setShowInventoryForm(true);
  };

  const askToSaveInventory = () => {
    if (
      !inventoryForm.name.trim() ||
      !inventoryForm.category.trim() ||
      inventoryForm.stock === "" ||
      !inventoryForm.unit.trim() ||
      inventoryForm.minStock === ""
    ) {
      alert("Please fill Item Name, Category, Stock, Unit, and Minimum Stock.");
      return;
    }

    if (
      Number(inventoryForm.stock) < 0 ||
      Number(inventoryForm.minStock) < 0 ||
      Number(inventoryForm.costPerUnit || 0) < 0
    ) {
      alert("Stock, minimum stock, and cost cannot be negative.");
      return;
    }

    setShowInventoryConfirm(true);
  };

  const saveInventoryItem = () => {
    const now = new Date().toISOString();

    const itemData = {
      name: inventoryForm.name.trim(),
      category: inventoryForm.category.trim(),
      stock: Number(inventoryForm.stock),
      unit: inventoryForm.unit.trim(),
      minStock: Number(inventoryForm.minStock),
      costPerUnit: Number(inventoryForm.costPerUnit || 0),
      lastUpdated: now,
    };

    if (editingInventoryId) {
      saveInventory(
        inventory.map((item) =>
          item.id === editingInventoryId ? { ...item, ...itemData } : item,
        ),
      );
    } else {
      const newItem: InventoryItem = {
        id: `inv-${Date.now()}`,
        ...itemData,
      };

      saveInventory([newItem, ...inventory]);
    }

    setShowInventoryConfirm(false);
    setShowInventoryForm(false);
    setEditingInventoryId(null);
    setInventoryForm(emptyInventoryForm);
  };

  const updateQueryStatus = (id: string, status: Query["status"]) => {
    saveQueries(
      queries.map((query) =>
        query.id === id ? { ...query, status } : query,
      ),
    );
  };

  const saveQueryNotes = (id: string) => {
    saveQueries(
      queries.map((query) =>
        query.id === id ? { ...query, notes: queryNotesDraft.trim() } : query,
      ),
    );

    setEditingQueryNotesId(null);
    setQueryNotesDraft("");
  };

  const updateJobStatus = (id: string, status: Job["status"]) => {
    saveJobs(
      jobs.map((job) => (job.id === id ? { ...job, status } : job)),
    );
  };

  const addQuery = () => {
    if (!newQuery.customerName || !newQuery.carModel || !newQuery.issue) {
      alert("Please add customer name, car model, and customer issue.");
      return;
    }

    const query: Query = {
      id: `q-${Date.now()}`,
      customerName: newQuery.customerName.trim(),
      phone: newQuery.phone?.trim() || "",
      carModel: newQuery.carModel.trim(),
      issue: newQuery.issue.trim(),
      notes: newQuery.notes?.trim() || "",
      status: (newQuery.status || "new") as Query["status"],
      date: new Date().toISOString(),
    };

    saveQueries([query, ...queries]);
    setNewQuery({ status: "new", notes: "" });
    setShowAddQuery(false);
  };

  const addJob = () => {
    if (!newJob.customerName || !newJob.carModel) {
      alert("Please add customer name and car model.");
      return;
    }

    const job: Job = {
      id: `j-${Date.now()}`,
      customerName: newJob.customerName.trim(),
      carModel: newJob.carModel.trim(),
      regNo: newJob.regNo?.trim() || "",
      services: newJob.services?.trim() || "",
      estimatedCost: Number(newJob.estimatedCost || 0),
      status: (newJob.status || "pending") as Job["status"],
      dateIn: newJob.dateIn || new Date().toISOString().split("T")[0],
      dateOut: newJob.dateOut || "",
    };

    saveJobs([job, ...jobs]);
    setNewJob({ status: "pending", estimatedCost: 0 });
    setShowAddJob(false);
  };

  const stats = useMemo(() => {
    const lowStock = inventory.filter((item) => item.stock <= item.minStock);

    const totalValue = inventory.reduce(
      (total, item) => total + item.stock * item.costPerUnit,
      0,
    );

    const openQueries = queries.filter(
      (query) => query.status === "new" || query.status === "in-progress",
    ).length;

    const activeJobs = jobs.filter(
      (job) => job.status === "pending" || job.status === "in-progress",
    ).length;

    const completedRevenue = jobs
      .filter(
        (job) => job.status === "completed" || job.status === "delivered",
      )
      .reduce((total, job) => total + job.estimatedCost, 0);

    return {
      lowStock,
      totalValue,
      openQueries,
      activeJobs,
      completedRevenue,
    };
  }, [inventory, queries, jobs]);

  const inputClass =
    "mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-base text-white outline-none placeholder:text-slate-600 focus:border-orange-400";

  const buttonClass =
    "rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-400 active:scale-[0.98]";

  if (!authed) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95 p-5 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/20 text-2xl">
            🚗
          </div>

          <h1 className="mt-5 text-2xl font-semibold text-white">
            Admin Access
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manoj Automobile management dashboard
          </p>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleLogin();
            }}
            className={`${inputClass} ${
              pwError ? "border-red-500" : ""
            }`}
          />

          {pwError && (
            <p className="mt-2 text-sm text-red-400">
              Incorrect password. Please try again.
            </p>
          )}

          <button
            onClick={handleLogin}
            className={`mt-4 w-full ${buttonClass}`}
          >
            Login to Dashboard
          </button>

          <button
            onClick={onClose}
            className="mt-3 w-full rounded-xl border border-white/10 py-3 text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-950 pb-24 text-white">
      {showInventoryConfirm && (
        <div className="fixed inset-0 z-[10020] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-orange-500/30 bg-slate-900 p-6 shadow-2xl">
            <p className="text-xl font-semibold text-white">
              Confirm Inventory Change
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              {editingInventoryId
                ? `Save changes to ${inventoryForm.name}?`
                : `Add ${inventoryForm.name} to inventory?`}
            </p>

            <div className="mt-5 rounded-xl bg-slate-950/70 p-3 text-sm text-slate-300">
              <p>
                Stock:{" "}
                <span className="font-semibold text-white">
                  {inventoryForm.stock} {inventoryForm.unit}
                </span>
              </p>
              <p className="mt-1">
                Minimum stock:{" "}
                <span className="font-semibold text-white">
                  {inventoryForm.minStock}
                </span>
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowInventoryConfirm(false)}
                className="rounded-xl border border-white/10 py-3 text-sm font-semibold text-slate-300"
              >
                Cancel
              </button>

              <button onClick={saveInventoryItem} className={buttonClass}>
                Confirm Save
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 text-xl">
              🚗
            </div>

            <div>
              <p className="text-base font-semibold text-white">
                Manoj Automobile
              </p>
              <p className="text-xs text-slate-400">Admin Dashboard</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setAuthed(false)}
              className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Logout
            </button>

            <button
              onClick={onClose}
              className="hidden rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white sm:block"
            >
              Close
            </button>
          </div>
        </div>

        <div className="mx-auto hidden max-w-6xl gap-2 px-6 pb-4 md:flex">
          {[
            ["dashboard", "Dashboard"],
            ["inventory", "Parts Stock"],
            ["queries", "Enquiries"],
            ["jobs", "Jobs"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setTab(value as Tab)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                tab === value
                  ? "bg-orange-500 text-white"
                  : "border border-white/10 text-slate-300 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-5 px-4 py-5 sm:px-6 sm:py-8">
        {tab === "dashboard" && (
          <section className="space-y-5">
            <div>
              <p className="text-sm text-slate-400">Manoj Automobile</p>
              <h2 className="mt-1 text-2xl font-semibold">Today&apos;s Work</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                {
                  label: "Open Enquiries",
                  value: stats.openQueries,
                  icon: "📩",
                  color: "text-blue-300",
                },
                {
                  label: "Active Jobs",
                  value: stats.activeJobs,
                  icon: "🔧",
                  color: "text-orange-300",
                },
                {
                  label: "Low Stock",
                  value: stats.lowStock.length,
                  icon: "⚠️",
                  color: "text-red-300",
                },
                {
                  label: "Completed Amount",
                  value: `₹${stats.completedRevenue.toLocaleString("en-IN")}`,
                  icon: "💰",
                  color: "text-emerald-300",
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                >
                  <p className="text-xl">{card.icon}</p>
                  <p className={`mt-3 text-xl font-semibold ${card.color}`}>
                    {card.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{card.label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => {
                  setTab("queries");
                  setShowAddQuery(true);
                }}
                className={`${buttonClass} w-full`}
              >
                + New Enquiry
              </button>

              <button
                onClick={() => {
                  setTab("jobs");
                  setShowAddJob(true);
                }}
                className="w-full rounded-xl border border-orange-400/40 bg-orange-500/10 px-4 py-3 text-sm font-semibold text-orange-200 transition hover:bg-orange-500/20"
              >
                + New Job
              </button>
            </div>

            {stats.lowStock.length > 0 && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                <p className="font-semibold text-red-200">Low stock alert</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {stats.lowStock.map((item) => (
                    <span
                      key={item.id}
                      className="rounded-full border border-red-400/30 px-3 py-1 text-xs text-red-100"
                    >
                      {item.name}: {item.stock} {item.unit} left
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {tab === "inventory" && (
          <section className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">View-only stock list</p>
                <h2 className="mt-1 text-2xl font-semibold">Parts Inventory</h2>
              </div>

              <button
                onClick={() => setShowManageInventory((current) => !current)}
                className="rounded-xl border border-orange-400/40 bg-orange-500/10 px-3 py-2 text-xs font-semibold text-orange-200"
              >
                {showManageInventory ? "Done Managing" : "Manage Inventory"}
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-400">Total inventory value</p>
                  <p className="mt-1 text-2xl font-semibold text-orange-300">
                    ₹{stats.totalValue.toLocaleString("en-IN")}
                  </p>
                </div>

                <p className="text-right text-xs text-slate-500">
                  {inventory.length} items
                </p>
              </div>
            </div>

            {showManageInventory && (
              <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-4">
                <p className="font-semibold text-orange-200">
                  Manage Inventory
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Changes here update your stock list. Please check details
                  before saving.
                </p>

                <button
                  onClick={openAddInventory}
                  className={`mt-4 w-full ${buttonClass}`}
                >
                  + Add New Item
                </button>
              </div>
            )}

            {showInventoryForm && (
              <div className="rounded-2xl border border-orange-500/30 bg-slate-900 p-4">
                <h3 className="text-lg font-semibold text-orange-200">
                  {editingInventoryId ? "Edit Inventory Item" : "Add New Item"}
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="text-xs text-slate-400">
                    Part Name *
                    <input
                      value={inventoryForm.name}
                      onChange={(event) =>
                        setInventoryForm({
                          ...inventoryForm,
                          name: event.target.value,
                        })
                      }
                      placeholder="Example: Engine Oil"
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Category *
                    <input
                      value={inventoryForm.category}
                      onChange={(event) =>
                        setInventoryForm({
                          ...inventoryForm,
                          category: event.target.value,
                        })
                      }
                      placeholder="Example: Oils"
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Current / Opening Stock *
                    <input
                      type="number"
                      min="0"
                      inputMode="numeric"
                      value={inventoryForm.stock}
                      onChange={(event) =>
                        setInventoryForm({
                          ...inventoryForm,
                          stock: event.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Unit *
                    <select
                      value={inventoryForm.unit}
                      onChange={(event) =>
                        setInventoryForm({
                          ...inventoryForm,
                          unit: event.target.value,
                        })
                      }
                      className={inputClass}
                    >
                      <option value="Pieces">Pieces</option>
                      <option value="Bottles">Bottles</option>
                      <option value="Sets">Sets</option>
                      <option value="Litres">Litres</option>
                      <option value="Kg">Kg</option>
                      <option value="Boxes">Boxes</option>
                    </select>
                  </label>

                  <label className="text-xs text-slate-400">
                    Minimum Stock Alert *
                    <input
                      type="number"
                      min="0"
                      inputMode="numeric"
                      value={inventoryForm.minStock}
                      onChange={(event) =>
                        setInventoryForm({
                          ...inventoryForm,
                          minStock: event.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Cost Per Unit (optional)
                    <input
                      type="number"
                      min="0"
                      inputMode="numeric"
                      value={inventoryForm.costPerUnit}
                      onChange={(event) =>
                        setInventoryForm({
                          ...inventoryForm,
                          costPerUnit: event.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </label>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setShowInventoryForm(false);
                      setEditingInventoryId(null);
                      setInventoryForm(emptyInventoryForm);
                    }}
                    className="rounded-xl border border-white/10 py-3 text-sm font-semibold text-slate-300"
                  >
                    Cancel
                  </button>

                  <button onClick={askToSaveInventory} className={buttonClass}>
                    Review & Save
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-white/10 bg-slate-900 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <p>Item</p>
                <p>Stock</p>
              </div>

              {inventory.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-400">
                  No inventory items yet. Open Manage Inventory to add one.
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {inventory.map((item) => {
                    const isLow = item.stock <= item.minStock;
                    const isCritical = item.stock <= item.minStock * 0.5;

                    return (
                      <div
                        key={item.id}
                        className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate font-semibold text-white">
                              {item.name}
                            </p>

                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                isCritical
                                  ? "bg-red-500/20 text-red-300"
                                  : isLow
                                    ? "bg-amber-500/20 text-amber-300"
                                    : "bg-emerald-500/20 text-emerald-300"
                              }`}
                            >
                              {isCritical
                                ? "Critical"
                                : isLow
                                  ? "Low"
                                  : "OK"}
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-slate-400">
                            {item.category} · Minimum: {item.minStock}{" "}
                            {item.unit}
                          </p>

                          {showManageInventory && (
                            <button
                              onClick={() => openEditInventory(item)}
                              className="mt-3 rounded-lg border border-orange-400/30 bg-orange-500/10 px-3 py-2 text-xs font-semibold text-orange-200"
                            >
                              Edit Item
                            </button>
                          )}
                        </div>

                        <div className="text-right">
                          <p
                            className={`text-xl font-semibold ${
                              isCritical
                                ? "text-red-300"
                                : isLow
                                  ? "text-amber-300"
                                  : "text-white"
                            }`}
                          >
                            {item.stock}
                          </p>
                          <p className="text-xs text-slate-400">{item.unit}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {tab === "queries" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">Customer enquiries</p>
                <h2 className="text-2xl font-semibold">Enquiries</h2>
              </div>

              <button
                onClick={() => setShowAddQuery(true)}
                className={buttonClass}
              >
                + Add
              </button>
            </div>

            {showAddQuery && (
              <div className="rounded-2xl border border-orange-500/30 bg-slate-900 p-4">
                <h3 className="text-lg font-semibold text-orange-200">
                  New Enquiry
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="text-xs text-slate-400">
                    Customer Name *
                    <input
                      value={newQuery.customerName || ""}
                      onChange={(event) =>
                        setNewQuery({
                          ...newQuery,
                          customerName: event.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Phone Number
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={newQuery.phone || ""}
                      onChange={(event) =>
                        setNewQuery({ ...newQuery, phone: event.target.value })
                      }
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Car Model *
                    <input
                      value={newQuery.carModel || ""}
                      onChange={(event) =>
                        setNewQuery({
                          ...newQuery,
                          carModel: event.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Customer Issue *
                    <input
                      value={newQuery.issue || ""}
                      onChange={(event) =>
                        setNewQuery({ ...newQuery, issue: event.target.value })
                      }
                      placeholder="Example: AC not cooling"
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400 sm:col-span-2">
                    Mechanic Description / Work Notes
                    <textarea
                      rows={5}
                      value={newQuery.notes || ""}
                      onChange={(event) =>
                        setNewQuery({ ...newQuery, notes: event.target.value })
                      }
                      placeholder="Write inspection details, work to be done, required parts, customer instructions, or anything important about this car."
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Status
                    <select
                      value={newQuery.status || "new"}
                      onChange={(event) =>
                        setNewQuery({
                          ...newQuery,
                          status: event.target.value as Query["status"],
                        })
                      }
                      className={inputClass}
                    >
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="quoted">Quoted</option>
                      <option value="done">Done</option>
                    </select>
                  </label>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setShowAddQuery(false);
                      setNewQuery({ status: "new", notes: "" });
                    }}
                    className="rounded-xl border border-white/10 py-3 text-sm font-semibold text-slate-300"
                  >
                    Cancel
                  </button>

                  <button onClick={addQuery} className={buttonClass}>
                    Save Enquiry
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {queries.map((query) => (
                <div
                  key={query.id}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">
                        {query.customerName}
                      </p>
                      <p className="mt-1 text-sm text-slate-300">
                        {query.carModel}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[query.status]
                      }`}
                    >
                      {query.status}
                    </span>
                  </div>

                  {query.phone && (
                    <p className="mt-2 text-sm text-slate-400">{query.phone}</p>
                  )}

                  <p className="mt-3 text-sm text-slate-300">
                    <span className="text-slate-500">Customer issue: </span>
                    {query.issue}
                  </p>

                  <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Mechanic Description / Work Notes
                      </p>

                      {editingQueryNotesId !== query.id && (
                        <button
                          onClick={() => {
                            setEditingQueryNotesId(query.id);
                            setQueryNotesDraft(query.notes || "");
                          }}
                          className="text-xs font-semibold text-orange-300"
                        >
                          Edit Notes
                        </button>
                      )}
                    </div>

                    {editingQueryNotesId === query.id ? (
                      <>
                        <textarea
                          rows={5}
                          value={queryNotesDraft}
                          onChange={(event) =>
                            setQueryNotesDraft(event.target.value)
                          }
                          placeholder="Write what work needs to be done, inspection details, required parts, or customer instructions."
                          className={inputClass}
                        />

                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <button
                            onClick={() => {
                              setEditingQueryNotesId(null);
                              setQueryNotesDraft("");
                            }}
                            className="rounded-xl border border-white/10 py-2.5 text-xs font-semibold text-slate-300"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={() => saveQueryNotes(query.id)}
                            className="rounded-xl bg-orange-500 py-2.5 text-xs font-semibold text-white"
                          >
                            Save Notes
                          </button>
                        </div>
                      </>
                    ) : (
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                        {query.notes || "No mechanic notes added yet."}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                    {(["new", "in-progress", "quoted", "done"] as Query["status"][])
                      .filter((status) => status !== query.status)
                      .map((status) => (
                        <button
                          key={status}
                          onClick={() => updateQueryStatus(query.id, status)}
                          className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-orange-500/40 hover:text-orange-200"
                        >
                          Mark {status}
                        </button>
                      ))}

                    {query.phone && (
                      <a
                        href={`https://wa.me/91${query.phone}?text=${encodeURIComponent(
                          `Hello ${query.customerName}, this is Manoj Automobile regarding your ${query.carModel}.`,
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-center text-xs font-semibold text-emerald-200"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "jobs" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">Vehicles in workshop</p>
                <h2 className="text-2xl font-semibold">Jobs</h2>
              </div>

              <button
                onClick={() => setShowAddJob(true)}
                className={buttonClass}
              >
                + New Job
              </button>
            </div>

            {showAddJob && (
              <div className="rounded-2xl border border-orange-500/30 bg-slate-900 p-4">
                <h3 className="text-lg font-semibold text-orange-200">
                  New Job Card
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="text-xs text-slate-400">
                    Customer Name *
                    <input
                      value={newJob.customerName || ""}
                      onChange={(event) =>
                        setNewJob({
                          ...newJob,
                          customerName: event.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Car Model *
                    <input
                      value={newJob.carModel || ""}
                      onChange={(event) =>
                        setNewJob({
                          ...newJob,
                          carModel: event.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Registration Number
                    <input
                      value={newJob.regNo || ""}
                      onChange={(event) =>
                        setNewJob({ ...newJob, regNo: event.target.value })
                      }
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Services / Work
                    <input
                      value={newJob.services || ""}
                      onChange={(event) =>
                        setNewJob({ ...newJob, services: event.target.value })
                      }
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Estimated Cost
                    <input
                      type="number"
                      min="0"
                      inputMode="numeric"
                      value={newJob.estimatedCost || ""}
                      onChange={(event) =>
                        setNewJob({
                          ...newJob,
                          estimatedCost: Number(event.target.value),
                        })
                      }
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Date In
                    <input
                      type="date"
                      value={newJob.dateIn || ""}
                      onChange={(event) =>
                        setNewJob({ ...newJob, dateIn: event.target.value })
                      }
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Expected Delivery
                    <input
                      type="date"
                      value={newJob.dateOut || ""}
                      onChange={(event) =>
                        setNewJob({ ...newJob, dateOut: event.target.value })
                      }
                      className={inputClass}
                    />
                  </label>

                  <label className="text-xs text-slate-400">
                    Status
                    <select
                      value={newJob.status || "pending"}
                      onChange={(event) =>
                        setNewJob({
                          ...newJob,
                          status: event.target.value as Job["status"],
                        })
                      }
                      className={inputClass}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </label>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setShowAddJob(false);
                      setNewJob({ status: "pending", estimatedCost: 0 });
                    }}
                    className="rounded-xl border border-white/10 py-3 text-sm font-semibold text-slate-300"
                  >
                    Cancel
                  </button>

                  <button onClick={addJob} className={buttonClass}>
                    Create Job
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{job.customerName}</p>
                      <p className="mt-1 text-sm text-slate-300">
                        {job.carModel}
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyles[job.status]
                        }`}
                      >
                        {job.status}
                      </span>

                      <p className="mt-2 text-sm font-semibold text-orange-300">
                        ₹{job.estimatedCost.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-400">
                    <p>
                      <span className="text-slate-500">Reg No: </span>
                      {job.regNo || "Not added"}
                    </p>

                    <p>
                      <span className="text-slate-500">Date In: </span>
                      {job.dateIn}
                    </p>

                    <p className="col-span-2">
                      <span className="text-slate-500">Work: </span>
                      {job.services || "Not added"}
                    </p>

                    {job.dateOut && (
                      <p className="col-span-2">
                        <span className="text-slate-500">
                          Expected Delivery:{" "}
                        </span>
                        {job.dateOut}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                    {(
                      [
                        "pending",
                        "in-progress",
                        "completed",
                        "delivered",
                      ] as Job["status"][]
                    )
                      .filter((status) => status !== job.status)
                      .map((status) => (
                        <button
                          key={status}
                          onClick={() => updateJobStatus(job.id, status)}
                          className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-orange-500/40 hover:text-orange-200"
                        >
                          Mark {status}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-slate-950/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-4">
          {[
            ["dashboard", "⌂", "Home"],
            ["inventory", "📦", "Stock"],
            ["queries", "💬", "Enquiries"],
            ["jobs", "🔧", "Jobs"],
          ].map(([value, icon, label]) => (
            <button
              key={value}
              onClick={() => setTab(value as Tab)}
              className={`flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold transition ${
                tab === value
                  ? "bg-orange-500/15 text-orange-300"
                  : "text-slate-400"
              }`}
            >
              <span className="text-lg">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}