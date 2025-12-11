import React, { useState } from "react";

const typeOptions = ["LAB", "HALL", "EQUIPMENT", "FACILITY"];

export default function ResourceTable({
  resources,
  onCreate,
  onUpdate,
  onDelete,
}) {
  const emptyForm = {
    id: null,
    name: "",
    description: "",
    resourceType: "LAB",
    location: "",
    capacity: "",
    isAvailable: true,
  };

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const startEdit = (r) => {
    setEditingId(r.id);
    setForm({
      id: r.id,
      name: r.name,
      description: r.description || "",
      resourceType: r.resourceType,
      location: r.location || "",
      capacity: r.capacity || "",
      isAvailable: r.isAvailable,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        resourceType: form.resourceType,
        location: form.location,
        capacity: form.capacity ? Number(form.capacity) : null,
        isAvailable: form.isAvailable,
      };

      if (editingId) {
        await onUpdate(editingId, payload);
      } else {
        await onCreate(payload);
      }
      cancelEdit();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
        Resources
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4 grid gap-3 lg:grid-cols-5">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Name"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/70 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/70 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
        />
        <select
          name="resourceType"
          value={form.resourceType}
          onChange={handleChange}
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/70 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
        >
          {typeOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          min={0}
          placeholder="Capacity"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/70 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
        />
        <div className="flex items-center justify-between gap-2">
          <label className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              name="isAvailable"
              checked={form.isAvailable}
              onChange={handleChange}
              className="h-3 w-3"
            />
            Available
          </label>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {editingId
              ? saving
                ? "Updating..."
                : "Update"
              : saving
              ? "Adding..."
              : "Add"}
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-500 dark:border-slate-700">
            <tr>
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Type</th>
              <th className="px-2 py-2">Location</th>
              <th className="px-2 py-2">Capacity</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {resources.map((r) => (
              <tr key={r.id} className="text-[11px]">
                <td className="px-2 py-2">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    {r.name}
                  </p>
                  {r.description && (
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {r.description}
                    </p>
                  )}
                </td>
                <td className="px-2 py-2 text-slate-600 dark:text-slate-300">
                  {r.resourceType}
                </td>
                <td className="px-2 py-2 text-slate-600 dark:text-slate-300">
                  {r.location || "-"}
                </td>
                <td className="px-2 py-2 text-slate-600 dark:text-slate-300">
                  {r.capacity ?? "-"}
                </td>
                <td className="px-2 py-2">
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                      r.isAvailable
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {r.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="px-2 py-2 text-right">
                  <div className="inline-flex items-center gap-1">
                    <button
                      onClick={() => startEdit(r)}
                      className="rounded-md border border-slate-200 px-2 py-1 text-[10px] text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(r.id)}
                      className="rounded-md border border-rose-200 px-2 py-1 text-[10px] text-rose-600 hover:bg-rose-50 dark:border-rose-500/60 dark:text-rose-300 dark:hover:bg-rose-950/40"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {resources.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-2 py-4 text-center text-[11px] text-slate-500"
                >
                  No resources found. Use the form above to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
