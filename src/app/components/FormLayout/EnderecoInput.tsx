import FloatingInput from "./FloatingInput";
import { IFormCaucaoData, IFormFiancaData } from "@/types/IFormData";
import { useState } from "react";
import { estados } from "@/app/utils/estados";

interface EnderecoInputProps {
  formData: IFormFiancaData | IFormCaucaoData;
  setFormData: React.Dispatch<
    React.SetStateAction<IFormFiancaData | IFormCaucaoData>
  >;
  prefix: "dono" | "inquilino" | "imovel";
}

type AddressField =
  | "cep"
  | "logradouro"
  | "numero"
  | "complemento"
  | "bairro"
  | "cidade"
  | "estado";

const EnderecoInput = ({
  formData,
  setFormData,
  prefix,
}: EnderecoInputProps) => {
  const [loading, setLoading] = useState(false);
  const [cepError, setCepError] = useState("");

  const getField = (field: AddressField): keyof IFormFiancaData =>
    `${field}_${prefix}` as keyof IFormFiancaData;

  const handleCepChange = async (cep: string) => {
    const rawCep = cep.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, [getField("cep")]: cep }));

    if (rawCep.length === 8) {
      setLoading(true);
      setCepError("");
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${rawCep}/json/`,
        );
        const data = await response.json();

        if (data.erro) {
          setCepError("CEP não encontrado");
        } else {
          setFormData((prev) => ({
            ...prev,
            [getField("logradouro")]: data.logradouro,
            [getField("cidade")]: data.localidade,
            [getField("bairro")]: data.bairro,
            [getField("estado")]: data.uf,
          }));
        }
      } catch (error) {
        setCepError("Erro ao buscar CEP");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <FloatingInput
          id={getField("cep")}
          label="CEP"
          value={formData[getField("cep") as keyof typeof formData]}
          onChange={(e) => handleCepChange(e.target.value)}
          mask={{
            delimiters: ["-"],
            blocks: [5, 3],
            numericOnly: true,
          }}
        />
        {cepError && (
          <p className="mt-1 px-2 text-sm text-red-500">{cepError}</p>
        )}
      </div>

      <FloatingInput
        id={getField("logradouro")}
        label="Logradouro"
        value={formData[getField("logradouro") as keyof typeof formData]}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            [getField("logradouro")]: e.target.value,
          }))
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FloatingInput
          id={getField("numero")}
          label="Número"
          value={formData[getField("numero") as keyof typeof formData]}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [getField("numero")]: e.target.value,
            }))
          }
        />
        <FloatingInput
          id={getField("complemento")}
          label="Complemento (Opcional)"
          value={formData[getField("complemento") as keyof typeof formData]}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [getField("complemento")]: e.target.value,
            }))
          }
          required={false}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FloatingInput
          id={getField("cidade")}
          label="Cidade"
          value={formData[getField("cidade") as keyof typeof formData]}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [getField("cidade")]: e.target.value,
            }))
          }
        />

        <div className="relative">
          <select
            aria-label="Estado"
            required
            className="h-full w-full rounded-lg border border-gray-300 px-2.5 py-3 text-gray-700 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            value={formData[getField("estado") as keyof typeof formData]}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [getField("estado")]: e.target.value,
              }))
            }
          >
            <option value="">Estado</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>

        <FloatingInput
          id={getField("bairro")}
          label="Bairro"
          value={formData[getField("bairro") as keyof typeof formData]}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [getField("bairro")]: e.target.value,
            }))
          }
        />
      </div>
    </div>
  );
};

export default EnderecoInput;
