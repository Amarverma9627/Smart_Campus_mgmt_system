import React from "react";

export default function LoadingSpinner({ size = "sm" }) {
  const sizeClass =
    size === "lg"
      ? "h-8 w-8"
      : size === "md"
      ? "h-6 w-6"
      : "h-4 w-4";

  return (
    <div
      className={
        "inline-block animate-spin rounded-full border-2 border-slate-300 border-t-transparent text-slate-600 " +
        sizeClass
      }
      role="status"
    >
      <span className="sr-only">Loading</span>
    </div>
  );
}
