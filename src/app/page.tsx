import React from "react";
import { Dashboard } from "@/modules/dashboard";
import { Authentication } from "@/modules/authentication";

export default function page() {
  return (
    <main className="m-10">
      <Dashboard />
      <Authentication />
    </main>
  );
}
