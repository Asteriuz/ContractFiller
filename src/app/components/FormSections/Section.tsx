// components/Section.tsx
import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export const Section = ({ title, icon, children, className }: SectionProps) => (
  <div className={`border-b pb-6 ${className}`}>
    <div className="mb-5 flex items-center justify-between">
      <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
      {icon}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);
