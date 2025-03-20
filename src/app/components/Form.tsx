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

let PizZipUtils: { getBinaryContent?: any; default?: any } | null = null;
if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Dados do Arquivo
    nome_arquivo: "contrato-locacao",

    // Dono
    nome_dono: "",
    rg_dono: "",
    orgao_rg_dono: "",
    cpf_dono: "",
    endereco_dono: "",
    cep_dono: "",

    // Inquilino
    nome_inquilino: "",
    rg_inquilino: "",
    orgao_rg_inquilino: "",
    cpf_inquilino: "",
    estado_civil: "",
    profissao: "",
    endereco_inquilino: "",
    cep_inquilino: "",

    // Dados do Imóvel
    endereco_imovel: "",
    cidade_imovel: "",
    cep_imovel: "",

    // Detalhes do Contrato
    dia_pagamento: "",
    dia_pagamento_escrito: "",
    numero_luz_enel: "",
    inicio_locacao: "",
    fim_locacao: "",
    dia_assinatura: "",
    mes_assinatura: "",
    valor_pagamento: "",
    valor_escrito: "",
  });

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
    callback: (error: any, content: PizZip.LoadData) => void
  ) {
    if (PizZipUtils && PizZipUtils.getBinaryContent) {
      PizZipUtils.getBinaryContent(url, callback);
    } else {
      console.error(
        "PizZipUtils is not loaded or getBinaryContent is unavailable."
      );
    }
  }

  const generateDocx = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    loadFile(
      "/ContractMaker/template.docx",
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
      }
    );
  };

  return (
    <form
      onSubmit={generateDocx}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-8 my-12"
    >
      <div className="flex items-center justify-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Formulário do Contrato
        </h2>
        <FaFileSignature className="text-4xl text-gray-800" />
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
        <p className="text-sm text-gray-500 mt-2">
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
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          Preencher Automaticamente
          <FaBug className="inline-block ml-2" />
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            "Gerando..."
          ) : (
            <div className="flex items-center justify-center">
              Gerar o Contrato
              <FaFileAlt className="inline-block ml-2" />
            </div>
          )}
        </button>
      </div>
    </form>
  );
}
