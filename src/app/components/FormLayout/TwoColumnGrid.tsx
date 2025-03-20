// components/TwoColumnGrid.tsx
import { ReactNode } from "react";

export const TwoColumnGrid = ({ children }: { children: ReactNode }) => (
  // <div className="grid grid-cols-2 gap-4
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2
  ">{children}</div>
);