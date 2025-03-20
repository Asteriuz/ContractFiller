import { FormData } from "@/types/FormData";
import { Section } from "./Section";
import FloatingInput from "../FormLayout/FloatingInput";
import { TwoColumnGrid } from "../FormLayout/TwoColumnGrid";

interface PropertySectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const PropertySection = ({
  formData,
  setFormData,
}: PropertySectionProps) => (
  <Section title="Dados do Imóvel">
    <TwoColumnGrid>
      <FloatingInput
        id="cep_imovel"
        label="CEP do imóvel"
        value={formData.cep_imovel}
        onChange={(e) =>
          setFormData({ ...formData, cep_imovel: e.target.value })
        }
        mask={{
          delimiters: ["-", "-"],
          blocks: [5, 3],
          numericOnly: true,
        }}
      />
      <FloatingInput
        id="cidade_imovel"
        label="Cidade"
        value={formData.cidade_imovel}
        onChange={(e) =>
          setFormData({ ...formData, cidade_imovel: e.target.value })
        }
      />
    </TwoColumnGrid>

    <FloatingInput
      id="endereco_imovel"
      label="Endereço completo do imóvel"
      value={formData.endereco_imovel}
      onChange={(e) =>
        setFormData({ ...formData, endereco_imovel: e.target.value })
      }
    />
  </Section>
);
