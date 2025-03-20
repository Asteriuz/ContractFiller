import { FormData } from "@/types/FormData";
import { Section } from "./Section";
import FloatingInput from "../FormLayout/FloatingInput";
import { TwoColumnGrid } from "../FormLayout/TwoColumnGrid";
import { FaCrown } from "react-icons/fa";

interface OwnerSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const OwnerSection = ({ formData, setFormData }: OwnerSectionProps) => (
  <Section
    title="Dono do Imóvel"
    icon={<FaCrown className="text-3xl text-orange-500" />}
  >
    <FloatingInput
      id="nome_dono"
      label="Nome completo"
      value={formData.nome_dono}
      onChange={(e) => setFormData({ ...formData, nome_dono: e.target.value })}
    />
    <TwoColumnGrid>
      <FloatingInput
        id="rg_dono"
        label="RG"
        value={formData.rg_dono}
        onChange={(e) => setFormData({ ...formData, rg_dono: e.target.value })}
        mask={{
          delimiters: [".", ".", "-"],
          blocks: [2, 3, 3, 1],
          numericOnly: true,
        }}
      />
      <FloatingInput
        id="orgao_rg_dono"
        label="Órgão Emissor"
        value={formData.orgao_rg_dono}
        onChange={(e) =>
          setFormData({ ...formData, orgao_rg_dono: e.target.value })
        }
      />
    </TwoColumnGrid>
    <FloatingInput
      id="cpf_dono"
      label="CPF"
      value={formData.cpf_dono}
      onChange={(e) => setFormData({ ...formData, cpf_dono: e.target.value })}
      mask={{
        delimiters: [".", ".", "-"],
        blocks: [3, 3, 3, 2],
        numericOnly: true,
      }}
    />
    <FloatingInput
      id="cep_dono"
      label="CEP"
      value={formData.cep_dono}
      onChange={(e) => setFormData({ ...formData, cep_dono: e.target.value })}
      mask={{
        delimiters: ["-", "-"],
        blocks: [5, 3],
        numericOnly: true,
      }}
    />
    <FloatingInput
      id="endereco_dono"
      label="Endereço completo"
      value={formData.endereco_dono}
      onChange={(e) =>
        setFormData({ ...formData, endereco_dono: e.target.value })
      }
    />
  </Section>
);
