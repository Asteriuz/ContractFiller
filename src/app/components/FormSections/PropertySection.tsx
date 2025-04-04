import { IFormFiancaData } from "@/types/IFormData";
import { Section } from "./Section";
import FloatingInput from "../FormLayout/FloatingInput";
import { TwoColumnGrid } from "../FormLayout/TwoColumnGrid";
import { FaHome } from "react-icons/fa";
import EnderecoInput from "../FormLayout/EnderecoInput";

interface PropertySectionProps {
  formData: IFormFiancaData;
  setFormData: React.Dispatch<React.SetStateAction<IFormFiancaData>>;
}

export const PropertySection = ({
  formData,
  setFormData,
}: PropertySectionProps) => (
  <Section
    title="Dados do Imóvel"
    icon={<FaHome className="text-3xl text-green-500" />}
  >
    <EnderecoInput
      formData={formData}
      setFormData={setFormData}
      prefix="imovel"
    />
  </Section>
);
