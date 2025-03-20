import { FormData } from "@/types/FormData";
import { Section } from "./Section";
import numeroParaExtenso from "@/app/utils/numeroParaExtenso";
import { TwoColumnGrid } from "../FormLayout/TwoColumnGrid";
import FloatingInput from "../FormLayout/FloatingInput";
import extenso from "extenso";

interface ContractSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const ContractDetailsSection = ({
  formData,
  setFormData,
}: ContractSectionProps) => (
  <Section title="Detalhes do Contrato">
    <TwoColumnGrid>
      <FloatingInput
        id="dia_pagamento"
        label="Dia do pagamento"
        type="number"
        value={formData.dia_pagamento}
        max={31}
        min={1}
        onChange={(e) => {
          const value = e.target.value;
          const numero = parseInt(value);
          setFormData({
            ...formData,
            dia_pagamento: value,
            dia_pagamento_escrito: numeroParaExtenso(numero),
          });
        }}
      />
      <FloatingInput
        id="numero_luz_enel"
        label="Número da luz (ENEL)"
        value={formData.numero_luz_enel}
        onChange={(e) =>
          setFormData({ ...formData, numero_luz_enel: e.target.value })
        }
      />
    </TwoColumnGrid>

    <TwoColumnGrid>
      <FloatingInput
        id="inicio_locacao"
        label="Início da Locação"
        type="date"
        value={formData.inicio_locacao}
        onChange={(e) =>
          setFormData({ ...formData, inicio_locacao: e.target.value })
        }
      />
      <FloatingInput
        id="fim_locacao"
        label="Fim da Locação"
        type="date"
        value={formData.fim_locacao}
        onChange={(e) =>
          setFormData({ ...formData, fim_locacao: e.target.value })
        }
      />
    </TwoColumnGrid>

    <TwoColumnGrid>
      <FloatingInput
        id="dia_assinatura"
        label="Dia da assinatura"
        type="number"
        min="1"
        max="31"
        value={formData.dia_assinatura}
        onChange={(e) =>
          setFormData({ ...formData, dia_assinatura: e.target.value })
        }
      />
      <select
        required
        className="w-full px-2.5 py-3 text-gray-700 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={formData.mes_assinatura}
        onChange={(e) =>
          setFormData({ ...formData, mes_assinatura: e.target.value })
        }
      >
        <option value="">Mês da assinatura</option>
        <option value="janeiro">Janeiro</option>
        <option value="fevereiro">Fevereiro</option>
        <option value="março">Março</option>
        <option value="abril">Abril</option>
        <option value="maio">Maio</option>
        <option value="junho">Junho</option>
        <option value="julho">Julho</option>
        <option value="agosto">Agosto</option>
        <option value="setembro">Setembro</option>
        <option value="outubro">Outubro</option>
        <option value="novembro">Novembro</option>
        <option value="dezembro">Dezembro</option>
      </select>
    </TwoColumnGrid>

    <TwoColumnGrid>
      <FloatingInput
        id="valor_pagamento"
        label="Valor do pagamento"
        type="number"
        value={formData.valor_pagamento}
        onChange={(e) => {
          const value = e.target.value;
          const numero = parseInt(value);
          setFormData({
            ...formData,
            valor_pagamento: value,
            valor_escrito: extenso(numero, { mode: "currency" }),
          });
        }}
      />
      <FloatingInput
        id="valor_escrito"
        label="Valor por extenso"
        value={formData.valor_escrito}
        readOnly
      />
    </TwoColumnGrid>
  </Section>
);
