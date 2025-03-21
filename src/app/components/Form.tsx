"use client";

import { useState } from "react";
import FloatingInput from "./FormLayout/FloatingInput";
import numeroParaExtenso from "../utils/numeroParaExtenso";

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { OwnerSection } from "./FormSections/OwnerSection";
import { TenantSection } from "./FormSections/TenantSection";
import { PropertySection } from "./FormSections/PropertySection";
import { ContractDetailsSection } from "./FormSections/ContractDetailsSection";
import { FaBug, FaFileAlt, FaFileSignature } from "react-icons/fa";
import getMonthName from "../utils/getMonthName";
import { IFormData } from "@/types/IFormData";
import formatDate from "../utils/formatDate";

let PizZipUtils: { getBinaryContent?: any; default?: any } | null = null;
if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<IFormData>({
    // Dados do Arquivo
    nome_arquivo: "contrato-locacao",

    // Dono
    nome_dono: "",
    rg_dono: "",
    orgao_rg_dono: "",
    cpf_dono: "",
    cep_dono: "",
    logradouro_dono: "",
    numero_dono: "",
    complemento_dono: "",
    bairro_dono: "",
    cidade_dono: "",
    estado_dono: "",

    // Inquilino
    nome_inquilino: "",
    rg_inquilino: "",
    orgao_rg_inquilino: "",
    cpf_inquilino: "",
    estado_civil: "",
    profissao: "",
    cep_inquilino: "",
    logradouro_inquilino: "",
    numero_inquilino: "",
    complemento_inquilino: "",
    bairro_inquilino: "",
    cidade_inquilino: "",
    estado_inquilino: "",

    // Dados do Imóvel
    cep_imovel: "",
    logradouro_imovel: "",
    numero_imovel: "",
    complemento_imovel: "",
    bairro_imovel: "",
    cidade_imovel: "",
    estado_imovel: "",

    // Detalhes do Contrato
    dia_pagamento: "",
    dia_pagamento_escrito: "",
    numero_luz_enel: "",
    inicio_locacao: "",
    inicio_mes_locacao: "",
    fim_locacao: "",
    fim_mes_locacao: "",
    dia_assinatura: "",
    mes_assinatura: "",
    valor_pagamento: "",
    valor_escrito: "",
  });

  const handleDebugFill = () => {
    const debugData = {
      ...formData,
      nome_arquivo: "debug-contrato",

      nome_dono: "João Silva Santos",
      rg_dono: "12.345.678-9",
      orgao_rg_dono: "SSP/SP",
      cpf_dono: "123.456.789-00",
      cep_dono: "01234-567",
      logradouro_dono: "Rua Teste",
      numero_dono: "123",
      complemento_dono: "Apto 456",
      bairro_dono: "Centro",
      cidade_dono: "São Paulo",
      estado_dono: "SP",

      nome_inquilino: "Maria Oliveira Souza",
      rg_inquilino: "98.765.432-1",
      orgao_rg_inquilino: "SSP/RJ",
      cpf_inquilino: "987.654.321-00",
      estado_civil: "Casado",
      profissao: "Engenheira Civil",
      endereco_inquilino: "Avenida Brasil, 456 - Jardins, Rio de Janeiro/RJ",
      cep_inquilino: "98765-432",
      logradouro_inquilino: "Avenida Brasil",
      numero_inquilino: "789",
      complemento_inquilino: "Casa 2",
      bairro_inquilino: "Jardim das Flores",
      cidade_inquilino: "Campinas",
      estado_inquilino: "SP",

      cep_imovel: "12345-678",
      logradouro_imovel: "Avenida Principal",
      numero_imovel: "123",
      bairro_imovel: "Jardim das Flores",
      cidade_imovel: "Campinas",
      estado_imovel: "SP",

      dia_pagamento: "5",
      dia_pagamento_escrito: numeroParaExtenso(5),
      numero_luz_enel: "1234567890",
      inicio_locacao: "2024-01-01",
      inicio_mes_locacao: getMonthName(1).toUpperCase(),
      fim_locacao: "2025-12-31",
      fim_mes_locacao: getMonthName(12).toUpperCase(),
      dia_assinatura: "15",
      mes_assinatura: "janeiro",
      valor_pagamento: "1500",
      valor_escrito: "Mil e quinhentos reais",
    };

    setFormData(debugData);
    console.log("Formulário preenchido com dados de teste");
  };

  function formatFileName(fileName: string) {
    return fileName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9çÇãÃõÕáéíóúâêîôûÀÈÌÒÙ ]/g, "_")
      .replace(/\s+/g, "_")
      .replace(/_+/g, "_")
      .trim();
  }

  function loadFile(
    url: string,
    callback: (error: any, content: PizZip.LoadData) => void,
  ) {
    if (PizZipUtils && PizZipUtils.getBinaryContent) {
      PizZipUtils.getBinaryContent(url, callback);
    } else {
      console.error(
        "PizZipUtils is not loaded or getBinaryContent is unavailable.",
      );
    }
  }

  const generateDocx = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    formData.inicio_locacao = formatDate(formData.inicio_locacao);
    formData.fim_locacao = formatDate(formData.fim_locacao);

    formData.valor_pagamento = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(formData.valor_pagamento));

    loadFile(
      "/ContractFiller/template.docx",
      function (error: any, content: PizZip.LoadData) {
        if (error) {
          console.error("Error loading the file", error);
          return;
        }

        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          linebreaks: true,
          paragraphLoop: true,
        });

        try {
          doc.render(formData);
        } catch (error) {
          console.error("Error rendering the document", error);
          setIsLoading(false);
        }

        const out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        const filename = formatFileName(formData.nome_arquivo) + ".docx";

        saveAs(out, filename);
        setIsLoading(false);
      },
    );
  };

  return (
    <form
      onSubmit={generateDocx}
      className="mx-auto mb-12 max-w-2xl rounded-lg bg-white p-4 shadow-lg md:p-8"
    >
      <div className="mb-8 flex items-center justify-center gap-4">
        <h2 className="font-source-serif text-center text-3xl font-bold text-gray-800">
          Formulário do Contrato
        </h2>
        <FaFileSignature className="hidden text-4xl text-gray-800 md:block" />
      </div>

      <div className="mb-8">
        <FloatingInput
          id="nome_arquivo"
          label="Nome do arquivo"
          value={formData.nome_arquivo}
          onChange={(e) =>
            setFormData({ ...formData, nome_arquivo: e.target.value })
          }
        />
        <p className="mt-2 text-sm text-gray-500">
          O arquivo será salvo como:{" "}
          <strong>{formatFileName(formData.nome_arquivo)}.docx</strong>
        </p>
      </div>

      <div className="space-y-6">
        <OwnerSection formData={formData} setFormData={setFormData} />
        <TenantSection formData={formData} setFormData={setFormData} />
        <PropertySection formData={formData} setFormData={setFormData} />
        <ContractDetailsSection formData={formData} setFormData={setFormData} />

        <button
          type="button"
          onClick={handleDebugFill}
          className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-red-700"
        >
          Preencher Automaticamente
          <FaBug className="ml-2 inline-block" />
        </button>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? (
            "Gerando..."
          ) : (
            <div className="flex items-center justify-center">
              Gerar o Contrato
              <FaFileAlt className="ml-2 inline-block" />
            </div>
          )}
        </button>
      </div>
    </form>
  );
}
