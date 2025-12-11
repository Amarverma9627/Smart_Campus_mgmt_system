import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content area */}
        <div className="flex min-h-screen flex-1 flex-col lg:ml-64">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
