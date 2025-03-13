"use client";

import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
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
    numero_luz_enel: "",
    inicio_locacao: "",
    fim_locacao: "",
    dia_assinatura: "",
    mes_assinatura: "",
  });

  const [isLoading, setIsLoading] = useState(false);

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
      a.download = "generated-document.docx";
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

      <div className="space-y-6">
        {/* Seção do Dono */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Dono do Imóvel
          </h3>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                id="nome_dono"
                required
                className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.nome_dono}
                onChange={(e) => setFormData({ ...formData, nome_dono: e.target.value })}
              />
              <label
                htmlFor="nome_dono"
                className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
              >
                Nome completo
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="RG"
                className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.rg_dono}
                onChange={(e) =>
                  setFormData({ ...formData, rg_dono: e.target.value })
                }
              />
              <input
                type="text"
                required
                placeholder="Órgão Emissor"
                className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.orgao_rg_dono}
                onChange={(e) =>
                  setFormData({ ...formData, orgao_rg_dono: e.target.value })
                }
              />
            </div>
            <input
              type="text"
              required
              placeholder="CPF (000.000.000-00)"
              className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.cpf_dono}
              onChange={(e) =>
                setFormData({ ...formData, cpf_dono: e.target.value })
              }
            />
            <input
              type="text"
              required
              placeholder="CEP"
              className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.cep_dono}
              onChange={(e) =>
                setFormData({ ...formData, cep_dono: e.target.value })
              }
            />
            <input
              type="text"
              required
              placeholder="Endereço completo"
              className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.endereco_dono}
              onChange={(e) =>
                setFormData({ ...formData, endereco_dono: e.target.value })
              }
            />
          </div>
        </div>

        {/* Seção do Inquilino */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Inquilino
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              required
              placeholder="Nome completo"
              className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.nome_inquilino}
              onChange={(e) =>
                setFormData({ ...formData, nome_inquilino: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="RG"
                className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.rg_inquilino}
                onChange={(e) =>
                  setFormData({ ...formData, rg_inquilino: e.target.value })
                }
              />
              <input
                type="text"
                required
                placeholder="Órgão Emissor"
                className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.orgao_rg_inquilino}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    orgao_rg_inquilino: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="CPF (000.000.000-00)"
                className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.cpf_inquilino}
                onChange={(e) =>
                  setFormData({ ...formData, cpf_inquilino: e.target.value })
                }
              />
              <select
                required
                className="w-full px-4 py-3 text-gray-700 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.estado_civil}
                onChange={(e) =>
                  setFormData({ ...formData, estado_civil: e.target.value })
                }
              >
                <option value="">Estado Civil</option>
                <option value="Solteiro">Solteiro(a)</option>
                <option value="Casado">Casado(a)</option>
                <option value="Divorciado">Divorciado(a)</option>
                <option value="Viúvo">Viúvo(a)</option>
              </select>
            </div>
            <input
              type="text"
              required
              placeholder="Profissão"
              className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.profissao}
              onChange={(e) =>
                setFormData({ ...formData, profissao: e.target.value })
              }
            />
            <input
              type="text"
              required
              placeholder="CEP"
              className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.cep_inquilino}
              onChange={(e) =>
                setFormData({ ...formData, cep_inquilino: e.target.value })
              }
            />
            <input
              type="text"
              required
              placeholder="Endereço completo"
              className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.endereco_inquilino}
              onChange={(e) =>
                setFormData({ ...formData, endereco_inquilino: e.target.value })
              }
            />
          </div>
        </div>

        {/* Seção do Imóvel */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Dados do Imóvel
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              required
              placeholder="Endereço completo do imóvel"
              className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.endereco_imovel}
              onChange={(e) =>
                setFormData({ ...formData, endereco_imovel: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="CEP do imóvel"
                className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.cep_imovel}
                onChange={(e) =>
                  setFormData({ ...formData, cep_imovel: e.target.value })
                }
              />
              <input
                type="text"
                required
                placeholder="Cidade"
                className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.cidade_imovel}
                onChange={(e) =>
                  setFormData({ ...formData, cidade_imovel: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Seção de Detalhes do Contrato */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Detalhes do Contrato
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                required
                placeholder="Dia do pagamento (número)"
                className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.dia_pagamento}
                onChange={(e) =>
                  setFormData({ ...formData, dia_pagamento: e.target.value })
                }
              />
              <input
                type="text"
                required
                placeholder="Dia do pagamento (por extenso)"
                className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.dia_pagamento_escrito}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dia_pagamento_escrito: e.target.value,
                  })
                }
              />
            </div>
            <input
              type="text"
              required
              placeholder="Número da luz (ENEL)"
              className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.numero_luz_enel}
              onChange={(e) =>
                setFormData({ ...formData, numero_luz_enel: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                required
                className="w-full px-4 py-3 text-gray-700 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.inicio_locacao}
                onChange={(e) =>
                  setFormData({ ...formData, inicio_locacao: e.target.value })
                }
              />
              <input
                type="date"
                required
                className="w-full px-4 py-3 text-gray-700 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.fim_locacao}
                onChange={(e) =>
                  setFormData({ ...formData, fim_locacao: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                required
                placeholder="Dia da assinatura"
                min="1"
                max="31"
                className="w-full px-4 py-3 text-gray-700 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.dia_assinatura}
                onChange={(e) =>
                  setFormData({ ...formData, dia_assinatura: e.target.value })
                }
              />
              <select
                required
                className="w-full px-4 py-3 text-gray-700 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            </div>
          </div>
        </div>

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
