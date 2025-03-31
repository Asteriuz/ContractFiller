import { IFormFiancaData, IFormCaucaoData } from "@/types/IFormData";

function isCaucao(
  formData: IFormFiancaData | IFormCaucaoData,
): formData is IFormCaucaoData {
  return formData.form_tipo === "caucao";
}

function isFianca(
  formData: IFormFiancaData | IFormCaucaoData,
): formData is IFormFiancaData {
  return formData.form_tipo === "fianca";
}

export { isCaucao, isFianca };
