"use client";

import { useState } from "react";
import FloatingInput from "./FloatingInput";
import numeroParaExtenso from "../utils/numeroParaExtenso";

export default function Form() {
  const [formData, setFormData] = useState({
    nome_arquivo: "contrato-locacao",
    nome_dono: "",
    rg_dono: "",
    orgao_rg_dono: "",
    cpf_dono: "",
    endereco_dono: "",
    cep_dono: "",
    nome_inquilino: "",
    rg_inquilino: "",
    orgao_rg_inquilino: "",
    cpf_inquilino: "",
    estado_civil: "",
    profissao: "",
    endereco_inquilino: "",
    cep_inquilino: "",
    endereco_imovel: "",
    cidade_imovel: "",
    cep_imovel: "",
    dia_pagamento: "",
    dia_pagamento_escrito: "",
    valor_pagamento: "",
    valor_escrito: "",
    numero_luz_enel: "",
    inicio_locacao: "",
    fim_locacao: "",
    dia_assinatura: "",
    mes_assinatura: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleDebugFill = () => {
    const debugData = {
      nome_arquivo: "debug-contrato",
      nome_dono: "João Silva Santos",
      rg_dono: "12.345.678-9",
      orgao_rg_dono: "SSP/SP",
      cpf_dono: "123.456.789-00",
      endereco_dono: "Rua das Flores, 123 - Centro, São Paulo/SP",
      cep_dono: "01234-567",
      nome_inquilino: "Maria Oliveira Souza",
      rg_inquilino: "98.765.432-1",
      orgao_rg_inquilino: "SSP/RJ",
      cpf_inquilino: "987.654.321-00",
      estado_civil: "Casado",
      profissao: "Engenheira Civil",
      endereco_inquilino: "Avenida Brasil, 456 - Jardins, Rio de Janeiro/RJ",
      cep_inquilino: "21000-000",
      endereco_imovel: "Rua Teste, 789 - Moema, São Paulo/SP",
      cidade_imovel: "São Paulo",
      cep_imovel: "04500-000",
      dia_pagamento: "5",
      dia_pagamento_escrito: numeroParaExtenso(5),
      numero_luz_enel: "1234567890",
      inicio_locacao: "2024-01-01",
      fim_locacao: "2025-12-31",
      dia_assinatura: "15",
      mes_assinatura: "janeiro"
    };

    setFormData(debugData);
    console.log("Formulário preenchido com dados de teste");
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-docx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;


      const filename = `${formData.nome_arquivo
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9çÇãÃõÕáÁéÉíÍóÓúÚâÂêÊîÎôÔûÛ ]/g, '_')
        .replace(/\s+/g, '_')}.docx`;

      a.download = filename;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 my-12"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Formulário do Contrato
      </h2>

      <div className="mb-8">
        <FloatingInput
          id="nome_arquivo"
          label="Nome do arquivo"
          value={formData.nome_arquivo}
          onChange={(e) => setFormData({ ...formData, nome_arquivo: e.target.value })}
        />
        <p className="text-sm text-gray-500 mt-2">
          O arquivo será salvo como: {
            formData.nome_arquivo
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^a-zA-Z0-9çÇãÃõÕáéíóúâêîôûÀÈÌÒÙ ]/g, '_')
              .replace(/\s+/g, '_')
              .replace(/_+/g, '_')
              .trim()
          }.docx
        </p>
      </div>

      <div className="space-y-6">
        {/* Seção do Dono */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Dono do Imóvel
          </h3>
          <div className="space-y-4">
            <FloatingInput
              id="nome_dono"
              label="Nome completo"
              value={formData.nome_dono}
              onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, nome_dono: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                id="rg_dono"
                label="RG"
                value={formData.rg_dono}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, rg_dono: e.target.value })}
              />
              <FloatingInput
                id="orgao_rg_dono"
                label="Órgão Emissor"
                value={formData.orgao_rg_dono}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, orgao_rg_dono: e.target.value })}
              />
            </div>
            <FloatingInput
              id="cpf_dono"
              label="CPF"
              value={formData.cpf_dono}
              onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, cpf_dono: e.target.value })}
            />
            <FloatingInput
              id="cep_dono"
              label="CEP"
              value={formData.cep_dono}
              onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, cep_dono: e.target.value })}
            />
            <FloatingInput
              id="endereco_dono"
              label="Endereço completo"
              value={formData.endereco_dono}
              onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, endereco_dono: e.target.value })}
            />
          </div>
        </div>

        {/* Seção do Inquilino */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Inquilino
          </h3>
          <div className="space-y-4">
            <FloatingInput
              id="nome_inquilino"
              label="Nome completo"
              value={formData.nome_inquilino}
              onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, nome_inquilino: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                id="rg_inquilino"
                label="RG"
                value={formData.rg_inquilino}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, rg_inquilino: e.target.value })}
              />
              <FloatingInput
                id="orgao_rg_inquilino"
                label="Órgão Emissor"
                value={formData.orgao_rg_inquilino}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, orgao_rg_inquilino: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                id="cpf_inquilino"
                label="CPF"
                value={formData.cpf_inquilino}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, cpf_inquilino: e.target.value })}
              />
              <select
                required
                className="w-full px-4 py-3 text-gray-700 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.estado_civil}
                onChange={(e) => setFormData({ ...formData, estado_civil: e.target.value })}
              >
                <option value="">Estado Civil</option>
                <option value="Solteiro">Solteiro(a)</option>
                <option value="Casado">Casado(a)</option>
                <option value="Divorciado">Divorciado(a)</option>
                <option value="Viúvo">Viúvo(a)</option>
              </select>
            </div>
            <FloatingInput
              id="profissao"
              label="Profissão"
              value={formData.profissao}
              onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, profissao: e.target.value })}
            />
            <FloatingInput
              id="cep_inquilino"
              label="CEP"
              value={formData.cep_inquilino}
              onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, cep_inquilino: e.target.value })}
            />
            <FloatingInput
              id="endereco_inquilino"
              label="Endereço completo"
              value={formData.endereco_inquilino}
              onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, endereco_inquilino: e.target.value })}
            />
          </div>
        </div>

        {/* Seção do Imóvel */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Dados do Imóvel
          </h3>
          <div className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                id="cep_imovel"
                label="CEP do imóvel"
                value={formData.cep_imovel}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, cep_imovel: e.target.value })}
              />
              <FloatingInput
                id="cidade_imovel"
                label="Cidade"
                value={formData.cidade_imovel}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, cidade_imovel: e.target.value })}
              />
            </div>
            <FloatingInput
              id="endereco_imovel"
              label="Endereço completo do imóvel"
              value={formData.endereco_imovel}
              onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, endereco_imovel: e.target.value })}
            />
          </div>
        </div>

        {/* Seção de Detalhes do Contrato */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Detalhes do Contrato
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                    dia_pagamento_escrito: numeroParaExtenso(numero)
                  });
                }
                }
              />
              <FloatingInput
                id="numero_luz_enel"
                label="Número da luz (ENEL)"
                value={formData.numero_luz_enel}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, numero_luz_enel: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                id="inicio_locacao"
                label="Início da Locação"
                type="date"
                value={formData.inicio_locacao}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, inicio_locacao: e.target.value })}
              />
              <FloatingInput
                id="fim_locacao"
                label="Fim da Locação"
                type="date"
                value={formData.fim_locacao}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, fim_locacao: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                id="dia_assinatura"
                label="Dia da assinatura"
                type="number"
                min="1"
                max="31"
                value={formData.dia_assinatura}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, dia_assinatura: e.target.value })}
              />
              <select
                required
                className="w-full px-4 py-3 text-gray-700 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.mes_assinatura}
                onChange={(e) => setFormData({ ...formData, mes_assinatura: e.target.value })}
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
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDebugFill}
          className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 mt-2"
        >
          Preencher Automaticamente (Debug)
        </button>


        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 mt-2"
          disabled={isLoading}
        >
          {isLoading ? "Gerando..." : "Gerar o Contrato 📄"}
        </button>
      </div>
    </form>
  );
}
