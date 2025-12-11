import React, { useEffect, useState } from "react";
import MainLayout from "../conponents/layout/MainLayout";
import ResourceTable from "../conponents/resources/ResourceTable";
import {
  getAllResources,
  createResource,
  updateResource,
  deleteResource,
} from "../services/resourceService";

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const loadResources = async () => {
    setLoading(true);
    try {
      const data = await getAllResources();
      setResources(data);
    } catch (e) {
      console.error(e);
      setMsg("Failed to load resources.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleCreate = async (payload) => {
    setMsg("");
    try {
      await createResource(payload);
      setMsg("Resource created successfully.");
      await loadResources();
    } catch (e) {
      console.error(e);
      setMsg("Failed to create resource.");
    }
  };

  const handleUpdate = async (id, payload) => {
    setMsg("");
    try {
      await updateResource(id, payload);
      setMsg("Resource updated successfully.");
      await loadResources();
    } catch (e) {
      console.error(e);
      setMsg("Failed to update resource.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource?")) return;
    setMsg("");
    try {
      await deleteResource(id);
      setMsg("Resource deleted.");
      await loadResources();
    } catch (e) {
      console.error(e);
      setMsg("Failed to delete resource.");
    }
  };

  return (
    <MainLayout>
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Resource Management
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Add, update and manage labs, halls and campus facilities.
        </p>
      </div>

      {msg && (
        <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {msg}
        </div>
      )}

      {loading && (
        <p className="mb-2 text-[11px] text-slate-500">Loading resources…</p>
      )}

      <ResourceTable
        resources={resources}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </MainLayout>
  );
}
