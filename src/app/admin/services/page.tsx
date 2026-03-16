"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Check, X, ToggleLeft, ToggleRight } from "lucide-react";

type Service = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  isActive: boolean;
};

const emptyForm = { name: "", description: "", basePrice: "" };

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/services");
    const data = await res.json();
    setServices(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.SyntheticEvent) {
    e.preventDefault();
    setError("");
    if (!addForm.name || !addForm.description || !addForm.basePrice) {
      setError("All fields are required.");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...addForm, basePrice: parseFloat(addForm.basePrice) }),
    });
    setSaving(false);
    if (res.ok) {
      setAddForm(emptyForm);
      setShowAdd(false);
      load();
    } else {
      setError("Failed to add service.");
    }
  }

  function startEdit(s: Service) {
    setEditId(s.id);
    setEditForm({ name: s.name, description: s.description, basePrice: String(s.basePrice) });
    setError("");
  }

  async function handleEdit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!editId) return;
    setError("");
    setSaving(true);
    const res = await fetch(`/api/admin/services/${editId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editForm, basePrice: parseFloat(editForm.basePrice) }),
    });
    setSaving(false);
    if (res.ok) {
      setEditId(null);
      load();
    } else {
      setError("Failed to save changes.");
    }
  }

  async function toggleActive(s: Service) {
    await fetch(`/api/admin/services/${s.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !s.isActive }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this service? This cannot be undone.")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-sky-900">Services & Pricing</h1>
          <p className="text-sky-600 text-sm mt-0.5">Manage the services displayed on your website</p>
        </div>
        <button
          onClick={() => { setShowAdd(true); setError(""); }}
          className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition w-full sm:w-auto"
        >
          <Plus size={16} /> Add New Service
        </button>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {/* Add Service Form */}
      {showAdd && (
        <form onSubmit={handleAdd} className="mb-6 bg-sky-50 border border-sky-200 rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-sky-800 mb-4 text-base">New Service</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-sky-700 mb-1.5">Service Name</label>
              <input
                className="w-full border border-sky-200 bg-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-gray-400"
                placeholder="e.g. Window Cleaning"
                value={addForm.name}
                onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-sky-700 mb-1.5">Base Price ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full border border-sky-200 bg-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-gray-400"
                placeholder="150"
                value={addForm.basePrice}
                onChange={(e) => setAddForm({ ...addForm, basePrice: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-sky-700 mb-1.5">Description</label>
              <textarea
                rows={2}
                className="w-full border border-sky-200 bg-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none placeholder:text-gray-400"
                placeholder="Brief description of the service"
                value={addForm.description}
                onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 sm:flex-none bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 transition"
            >
              {saving ? "Saving…" : "Add Service"}
            </button>
            <button
              type="button"
              onClick={() => { setShowAdd(false); setAddForm(emptyForm); setError(""); }}
              className="flex-1 sm:flex-none border border-sky-200 text-sky-700 hover:bg-sky-100 px-5 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Services List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-sky-600 text-sm">Loading services…</span>
        </div>
      ) : services.length === 0 ? (
        <div className="bg-sky-50 rounded-2xl border border-sky-100 p-10 text-center text-sky-500 text-sm">
          No services yet. Add your first one above.
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((s) =>
            editId === s.id ? (
              /* Edit row */
              <form
                key={s.id}
                onSubmit={handleEdit}
                className="bg-sky-50 border border-sky-300 rounded-2xl p-4 shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-semibold text-sky-700 mb-1">Name</label>
                    <input
                      className="w-full border border-sky-200 bg-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-sky-700 mb-1">Base Price ($)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full border border-sky-200 bg-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                      value={editForm.basePrice}
                      onChange={(e) => setEditForm({ ...editForm, basePrice: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-sky-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      className="w-full border border-sky-200 bg-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-50 transition"
                  >
                    <Check size={14} /> Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditId(null); setError(""); }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 border border-sky-200 text-sky-700 hover:bg-sky-100 px-4 py-2 rounded-xl text-sm font-semibold transition"
                  >
                    <X size={14} /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* Display row */
              <div
                key={s.id}
                className={`bg-white border rounded-2xl px-4 py-4 shadow-sm transition ${
                  s.isActive ? "border-sky-100" : "border-gray-100 opacity-60"
                }`}
              >
                {/* Top row: name + price + actions */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="font-bold text-sky-900 text-sm">{s.name}</span>
                    {!s.isActive && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                        Inactive
                      </span>
                    )}
                  </div>
                  <span className="font-extrabold text-sky-500 text-sm whitespace-nowrap shrink-0">
                    From ${s.basePrice.toFixed(0)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">{s.description}</p>

                {/* Action buttons */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-sky-50">
                  <button
                    onClick={() => toggleActive(s)}
                    title={s.isActive ? "Deactivate" : "Activate"}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                      s.isActive
                        ? "bg-sky-100 text-sky-700 hover:bg-sky-200"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {s.isActive ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                    {s.isActive ? "Active" : "Inactive"}
                  </button>

                  <button
                    onClick={() => startEdit(s)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition"
                  >
                    <Pencil size={13} /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(s.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition ml-auto"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
