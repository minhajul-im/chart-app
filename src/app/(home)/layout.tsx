import React from "react";
import { BaseLayout } from "@/layouts/base-layout";

export default function layout({ children }: { children: React.ReactNode }) {
  return <BaseLayout>{children}</BaseLayout>;
}
