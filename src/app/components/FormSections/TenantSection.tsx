import { IFormData } from "@/types/IFormData";
import { Section } from "./Section";
import FloatingInput from "../FormLayout/FloatingInput";
import { TwoColumnGrid } from "../FormLayout/TwoColumnGrid";
import { FaUser } from "react-icons/fa";
import EnderecoInput from "../FormLayout/EnderecoInput";

interface TenantSectionProps {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

export const TenantSection = ({
  formData,
  setFormData,
}: TenantSectionProps) => (
  <Section
    title="Inquilino"
    icon={<FaUser className="text-3xl text-blue-500" />}
  >
    <FloatingInput
      id="nome_inquilino"
      label="Nome completo"
      value={formData.nome_inquilino}
      onChange={(e) =>
        setFormData({ ...formData, nome_inquilino: e.target.value })
      }
    />

    <TwoColumnGrid>
      <FloatingInput
        id="rg_inquilino"
        label="RG"
        value={formData.rg_inquilino}
        onChange={(e) =>
          setFormData({ ...formData, rg_inquilino: e.target.value })
        }
        mask={{
          delimiters: [".", ".", "-"],
          blocks: [2, 3, 3, 1],
          numericOnly: true,
        }}
      />
      <FloatingInput
        id="orgao_rg_inquilino"
        label="Órgão Emissor"
        value={formData.orgao_rg_inquilino}
        onChange={(e) =>
          setFormData({ ...formData, orgao_rg_inquilino: e.target.value })
        }
      />
    </TwoColumnGrid>

    <TwoColumnGrid>
      <FloatingInput
        id="cpf_inquilino"
        label="CPF"
        value={formData.cpf_inquilino}
        onChange={(e) =>
          setFormData({ ...formData, cpf_inquilino: e.target.value })
        }
        mask={{
          delimiters: [".", ".", "-"],
          blocks: [3, 3, 3, 2],
          numericOnly: true,
        }}
      />
      <select
        aria-label="Estado Civil"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-transparent focus:ring-2 focus:ring-blue-500"
        value={formData.estado_civil}
        onChange={(e) =>
          setFormData({ ...formData, estado_civil: e.target.value })
        }
      >
        <option value="" className="">
          Estado Civil
        </option>
        <option value="Solteiro">Solteiro(a)</option>
        <option value="Casado">Casado(a)</option>
        <option value="Divorciado">Divorciado(a)</option>
        <option value="Viúvo">Viúvo(a)</option>
      </select>
    </TwoColumnGrid>

    <FloatingInput
      id="profissao"
      label="Profissão"
      value={formData.profissao}
      onChange={(e) => setFormData({ ...formData, profissao: e.target.value })}
    />

    <EnderecoInput
      formData={formData}
      setFormData={setFormData}
      prefix="inquilino"
    />
  </Section>
);
