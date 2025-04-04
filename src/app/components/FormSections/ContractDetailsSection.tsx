import { IFormCaucaoData, IFormFiancaData } from "@/types/IFormData";
import { Section } from "./Section";
import numeroParaExtenso from "@/app/utils/numeroParaExtenso";
import { TwoColumnGrid } from "../FormLayout/TwoColumnGrid";
import FloatingInput from "../FormLayout/FloatingInput";
import extenso from "extenso";
import { FaFileContract } from "react-icons/fa";
import capitalize from "@/app/utils/capitalize";
import getMonthName from "@/app/utils/getMonthName";
import { isCaucao } from "@/app/utils/getFormDataType";
import { useState } from "react";

interface ContractSectionProps {
  formData: IFormFiancaData | IFormCaucaoData;
  setFormData: React.Dispatch<
    React.SetStateAction<IFormFiancaData | IFormCaucaoData>
  >;
}

export function ContractDetailsSection({
  formData,
  setFormData,
}: ContractSectionProps) {
  return (
    <Section
      title="Detalhes do Contrato"
      icon={<FaFileContract className="text-3xl text-purple-500" />}
    >
      <TwoColumnGrid>
        <FloatingInput
          id="dia_pagamento"
          label="Dia PGT do aluguel"
          type="number"
          value={formData.dia_pagamento_aluguel}
          max={31}
          min={1}
          onChange={(e) => {
            const value = e.target.value;
            const numero = parseInt(value);
            setFormData({
              ...formData,
              dia_pagamento_aluguel: value,
              dia_pagamento_escrito: numeroParaExtenso(numero),
            });
          }}
        />
        <FloatingInput
          id="valor_pagamento"
          label="Valor do aluguel (R$)"
          value={formData.valor_aluguel}
          onChange={(e) => {
            const value = e.target.value;
            const numero = parseFloat(
              value.replaceAll(".", "").replaceAll(",", "."),
            );

            let valor_escrito = "";

            try {
              valor_escrito = extenso(numero, {
                mode: "currency",
                currency: { type: "BRL" },
              });
            } catch (error) {
              valor_escrito = "Valor inválido";
            }
            setFormData({
              ...formData,
              valor_aluguel: value,
              valor_aluguel_escrito: valor_escrito,
            });
          }}
          mask={{
            numeral: true,
            numeralDecimalMark: ",",
            delimiter: ".",
            numeralDecimalScale: 2,
          }}
          prefix="R$"
        />
        {/* {!formData.valor_aluguel_escrito ||
      formData.valor_aluguel_escrito.includes("undefined") ? null : (
        <p className="text-sm text-gray-500 -mt-2 mb-2">
          <strong>Extenso:</strong> {formData.valor_aluguel_escrito}
        </p>
      )} */}
      </TwoColumnGrid>

      <TwoColumnGrid>
        <FloatingInput
          id="inicio_locacao"
          label="Início da Locação"
          type="date"
          value={formData.inicio_locacao}
          onChange={(e) =>
            setFormData({
              ...formData,
              inicio_locacao: e.target.value,
              inicio_mes_locacao: getMonthName(
                new Date(e.target.value).getMonth() + 1,
              ).toUpperCase(),
            })
          }
        />
        <FloatingInput
          id="fim_locacao"
          label="Fim da Locação"
          type="date"
          value={formData.fim_locacao}
          onChange={(e) =>
            setFormData({
              ...formData,
              fim_locacao: e.target.value,
              fim_mes_locacao: getMonthName(
                new Date(e.target.value).getMonth() + 1,
              ).toUpperCase(),
            })
          }
        />
      </TwoColumnGrid>
      <TwoColumnGrid>
        <FloatingInput
          id="numero_luz_enel"
          label="Número da luz (ENEL)"
          value={formData.numero_luz_enel}
          onChange={(e) =>
            setFormData({ ...formData, numero_luz_enel: e.target.value })
          }
        />
        {isCaucao(formData) ? (
          <FloatingInput
            id="data_seguro_caucao"
            label="Data Seguro Caução"
            type="date"
            value={formData.data_seguro_caucao}
            onChange={(e) =>
              setFormData({
                ...formData,
                data_seguro_caucao: e.target.value,
              })
            }
          />
        ) : (
          <FloatingInput
            id="data_seguro_fianca"
            label="Data Seguro Fiança"
            type="date"
            value={formData.data_seguro_fianca}
            onChange={(e) =>
              setFormData({
                ...formData,
                data_seguro_fianca: e.target.value,
              })
            }
          />
        )}
      </TwoColumnGrid>

      {isCaucao(formData) && (
        <TwoColumnGrid>
          <FloatingInput
            id="valor_caucao"
            label="Valor do Caução (R$)"
            value={formData.valor_caucao}
            onChange={(e) => {
              const value = e.target.value;
              const numero = parseFloat(
                value.replaceAll(".", "").replaceAll(",", "."),
              );

              let valor_escrito = "";

              try {
                valor_escrito = extenso(numero, {
                  mode: "currency",
                  currency: { type: "BRL" },
                });
              } catch (error) {
                valor_escrito = "Valor inválido";
              }
              setFormData({
                ...formData,
                valor_caucao: value,
                valor_caucao_escrito: valor_escrito,
              });
            }}
            mask={{
              numeral: true,
              numeralDecimalMark: ",",
              delimiter: ".",
              numeralDecimalScale: 2,
            }}
            prefix="R$"
          />
          <FloatingInput
            id="data_assinatura"
            label="Data da assinatura"
            type="date"
            value={formData.data_assinatura}
            onChange={(e) =>
              setFormData({ ...formData, data_assinatura: e.target.value })
            }
          />
        </TwoColumnGrid>
      )}
      {!isCaucao(formData) && (
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
            aria-label="Mês da assinatura"
            required
            className="w-full rounded-lg border border-gray-300 px-2.5 py-3 text-gray-700 focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
      )}
    </Section>
  );
}
