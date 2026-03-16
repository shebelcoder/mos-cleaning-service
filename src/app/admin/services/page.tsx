"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

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
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Services & Pricing</h1>
        <button
          onClick={() => { setShowAdd(true); setError(""); }}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>}

      {/* Add Service Form */}
      {showAdd && (
        <form onSubmit={handleAdd} className="mb-6 bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">New Service</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Service Name</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g. Deep Cleaning"
                value={addForm.name}
                onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Base Price ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="150"
                value={addForm.basePrice}
                onChange={(e) => setAddForm({ ...addForm, basePrice: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
              <textarea
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                placeholder="Short description of the service"
                value={addForm.description}
                onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition"
            >
              {saving ? "Saving…" : "Add Service"}
            </button>
            <button
              type="button"
              onClick={() => { setShowAdd(false); setAddForm(emptyForm); setError(""); }}
              className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Services List */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading services…</p>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-500 text-sm">
          No services yet. Add your first one above.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          {services.map((s) =>
            editId === s.id ? (
              <form key={s.id} onSubmit={handleEdit} className="p-4 bg-blue-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                    <input
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Base Price ($)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                      value={editForm.basePrice}
                      onChange={(e) => setEditForm({ ...editForm, basePrice: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                    <textarea
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium disabled:opacity-50 transition"
                  >
                    <Check size={14} /> Save
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditId(null); setError(""); }}
                    className="inline-flex items-center gap-1 border border-gray-300 text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-lg text-sm font-medium transition"
                  >
                    <X size={14} /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div key={s.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">{s.name}</span>
                    {!s.isActive && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5 truncate">{s.description}</p>
                </div>
                <span className="font-bold text-blue-600 text-sm whitespace-nowrap">${s.basePrice.toFixed(2)}</span>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    title={s.isActive ? "Deactivate" : "Activate"}
                    onClick={() => toggleActive(s)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs transition ${
                      s.isActive
                        ? "bg-green-50 text-green-600 hover:bg-green-100"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    <Check size={14} />
                  </button>
                  <button
                    title="Edit"
                    onClick={() => startEdit(s)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleDelete(s.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <Trash2 size={14} />
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
