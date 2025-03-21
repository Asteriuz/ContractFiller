import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;

  icon?: ReactNode;
}

export const Section = ({ title, icon, children }: SectionProps) => (
  <div className={`border-b pb-6 border-gray-300`}>
    <div className="mb-5 flex items-center justify-between">
      <h3 className="font-source-serif text-xl font-semibold text-gray-700">
        {title}
      </h3>
      {icon}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);
