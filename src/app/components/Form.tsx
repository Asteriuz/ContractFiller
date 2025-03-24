"use client";

import { useState } from "react";
import FloatingInput from "./FormLayout/FloatingInput";

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { OwnerSection } from "./FormSections/OwnerSection";
import { TenantSection } from "./FormSections/TenantSection";
import { PropertySection } from "./FormSections/PropertySection";
import { ContractDetailsSection } from "./FormSections/ContractDetailsSection";
import { FaBug, FaFileAlt, FaFileSignature } from "react-icons/fa";
import { IFormFiancaData } from "@/types/IFormData";
import formatDate from "../utils/formatDate";
import { debugFiancaData } from "../utils/debugFiancaData";

let PizZipUtils: { getBinaryContent?: any; default?: any } | null = null;
if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [nomeArquivo, setNomeArquivo] = useState("contrato-locacao");
  const [tipoContrato, setTipoContrato] = useState<"Fianca" | "Caucao">(
    "Fianca",
  );

  const [formFiancaData, setFormFiancaData] = useState<IFormFiancaData>({
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
    dia_pagamento_aluguel: "",
    dia_pagamento_escrito: "",
    numero_luz_enel: "",
    inicio_locacao: "",
    inicio_mes_locacao: "",
    fim_locacao: "",
    fim_mes_locacao: "",
    dia_assinatura: "",
    mes_assinatura: "",
    data_seguro_fianca: "",
    valor_aluguel: "",
    valor_aluguel_escrito: "",
  });

  const handleDebugFill = () => {
    switch (tipoContrato) {
      case "Fianca":
        setNomeArquivo("debug-contrato-fianca");
        setFormFiancaData({ ...formFiancaData, ...debugFiancaData });
        break;
      case "Caucao":
        setNomeArquivo("debug-contrato-caucao");
        console.log("Caução ainda não implementado");
        break;
    }
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

    formFiancaData.inicio_locacao = formatDate(formFiancaData.inicio_locacao);
    formFiancaData.fim_locacao = formatDate(formFiancaData.fim_locacao);
    formFiancaData.data_seguro_fianca = formatDate(
      formFiancaData.data_seguro_fianca,
    );

    formFiancaData.valor_aluguel = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(formFiancaData.valor_aluguel.replaceAll(".", "").replaceAll(",", ".")));

    let templatePath = "/ContractFiller/templateFianca.docx";
    switch (tipoContrato) {
      case "Fianca":
        templatePath = "/ContractFiller/templateFianca.docx";
        break;
      case "Caucao":
        templatePath = "/ContractFiller/templateCaucao.docx";
        break;
    }

    loadFile(templatePath, function (error: any, content: PizZip.LoadData) {
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
        doc.render(formFiancaData);
      } catch (error) {
        console.error("Error rendering the document", error);
        setIsLoading(false);
      }

      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const filename = `${formatFileName(nomeArquivo)}.docx`;

      saveAs(out, filename);
      setIsLoading(false);
    });
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
          value={nomeArquivo}
          onChange={(e) => setNomeArquivo(e.target.value)}
        />
        <p className="mt-2 text-sm text-gray-500">
          O arquivo será salvo como:{" "}
          <strong>{formatFileName(nomeArquivo)}.docx</strong>
        </p>
      </div>

      <div className="space-y-6">
        <OwnerSection
          formData={formFiancaData}
          setFormData={setFormFiancaData}
        />
        <TenantSection
          formData={formFiancaData}
          setFormData={setFormFiancaData}
        />
        <PropertySection
          formData={formFiancaData}
          setFormData={setFormFiancaData}
        />
        <ContractDetailsSection
          formData={formFiancaData}
          setFormData={setFormFiancaData}
        />

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
