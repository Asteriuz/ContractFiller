"use client";

import { useEffect, useState } from "react";
import FloatingInput from "./FormLayout/FloatingInput";

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { OwnerSection } from "./FormSections/OwnerSection";
import { TenantSection } from "./FormSections/TenantSection";
import { PropertySection } from "./FormSections/PropertySection";
import { ContractDetailsSection } from "./FormSections/ContractDetailsSection";
import {
  FaBug,
  FaFileAlt,
  FaFileContract,
  FaFileSignature,
  FaShieldAlt,
} from "react-icons/fa";
import { IFormCaucaoData, IFormFiancaData } from "@/types/IFormData";
import formatDate, { formatDateExtenso } from "../utils/formatDate";
import { debugCaucaoData, debugFiancaData } from "../utils/debugData";

let PizZipUtils: { getBinaryContent?: any; default?: any } | null = null;
if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [nomeArquivo, setNomeArquivo] = useState("contrato-locacao");
  const [tipoContrato, setTipoContrato] = useState<"Fianca" | "Caucao" | "">(
    "",
  );

  const [formFiancaData, setFormFiancaData] = useState<IFormFiancaData>({
    form_tipo: "fianca",
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

  const [formCaucaoData, setFormCaucaoData] = useState<IFormCaucaoData>({
    // Dono
    form_tipo: "caucao",
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
    valor_aluguel: "",
    valor_aluguel_escrito: "",
    valor_caucao: "",
    valor_caucao_escrito: "",
    data_seguro_caucao: "",
    data_assinatura: "",
  });

  useEffect(() => {
    if (tipoContrato === "Fianca") {
      Object.entries(formFiancaData).forEach(([key, value]) => {
        if (value === undefined) {
          console.warn(`Undefined field detected in formFiancaData: ${key}`);
        }
      });
    } else {
      Object.entries(formCaucaoData).forEach(([key, value]) => {
        if (value === undefined) {
          console.warn(`Undefined field detected in formCaucaoData: ${key}`);
        }
      });
    }
  }, [formFiancaData, formCaucaoData, tipoContrato]);

  const handleDebugFill = () => {
    switch (tipoContrato) {
      case "Fianca":
        setNomeArquivo("debug-contrato-fianca");
        setFormFiancaData({ ...formFiancaData, ...debugFiancaData });
        break;
      case "Caucao":
        setNomeArquivo("debug-contrato-caucao");
        setFormCaucaoData({ ...formCaucaoData, ...debugCaucaoData });
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

    if (tipoContrato === "Fianca") {
      formFiancaData.inicio_locacao = formatDate(formFiancaData.inicio_locacao);
      formFiancaData.fim_locacao = formatDate(formFiancaData.fim_locacao);

      if (formFiancaData.data_seguro_fianca) {
        formFiancaData.data_seguro_fianca = formatDate(
          formFiancaData.data_seguro_fianca,
        );
      } else {
        formFiancaData.data_seguro_fianca = "";
      }

      formFiancaData.valor_aluguel = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(
        Number(
          formFiancaData.valor_aluguel.replaceAll(".", "").replaceAll(",", "."),
        ),
      );
    } else {
      formCaucaoData.inicio_locacao = formatDate(formCaucaoData.inicio_locacao);
      formCaucaoData.fim_locacao = formatDate(formCaucaoData.fim_locacao);

      formCaucaoData.valor_aluguel = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(
        Number(
          formCaucaoData.valor_aluguel.replaceAll(".", "").replaceAll(",", "."),
        ),
      );

      // change data_assinatura from dd-mm-yyyy to dd de mm de yyyy
      if (formCaucaoData.data_assinatura) {
        formCaucaoData.data_assinatura = formatDateExtenso(formCaucaoData.data_assinatura);w
      }
    }

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
        doc.render(tipoContrato === "Fianca" ? formFiancaData : formCaucaoData);
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

      <div className="mb-8">
        <div className={`border-b border-gray-300 pb-6`}>
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-source-serif text-xl font-semibold text-gray-700">
              Tipo de Contrato
            </h3>
            <FaShieldAlt className="text-2xl text-gray-700" />
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="tipo_contrato"
                  value="Fianca"
                  className="peer hidden"
                  checked={tipoContrato === "Fianca"}
                  onChange={() => setTipoContrato("Fianca")}
                />
                <div className="rounded-lg border-2 border-gray-200 bg-white p-4 text-center transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-1 peer-checked:ring-blue-300">
                  <span className="text-md block font-medium text-gray-600 peer-checked:text-blue-700">
                    Fiança
                  </span>
                </div>
              </label>

              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="tipo_contrato"
                  value="Caucao"
                  className="peer hidden"
                  checked={tipoContrato === "Caucao"}
                  onChange={() => setTipoContrato("Caucao")}
                />
                <div className="rounded-lg border-2 border-gray-200 bg-white p-4 text-center transition-all peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:ring-1 peer-checked:ring-green-300">
                  <span className="text-md block font-medium text-gray-600 peer-checked:text-green-700">
                    Caução
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {tipoContrato === "Fianca" ? (
          <>
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
          </>
        ) : tipoContrato === "Caucao" ? (
          <>
            <OwnerSection
              formData={formCaucaoData}
              setFormData={setFormCaucaoData}
            />
            <TenantSection
              formData={formCaucaoData}
              setFormData={setFormCaucaoData}
            />
            <PropertySection
              formData={formCaucaoData}
              setFormData={setFormCaucaoData}
            />
            <ContractDetailsSection
              formData={formCaucaoData}
              setFormData={setFormCaucaoData}
            />
          </>
        ) : null}

        {tipoContrato && (
          <>
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
          </>
        )}
      </div>
    </form>
  );
}
