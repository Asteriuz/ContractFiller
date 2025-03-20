// components/Section.tsx
import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({ title, children, className }: SectionProps) => (
  <div className={`border-b pb-6 ${className}`}>
    <h3 className="text-xl font-semibold mb-4 text-gray-700">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);