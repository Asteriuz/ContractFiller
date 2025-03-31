interface FormBase {
  form_tipo: "fianca" | "caucao";
  // Common properties
  nome_dono: string;
  rg_dono: string;
  orgao_rg_dono: string;
  cpf_dono: string;
  cep_dono: string;
  logradouro_dono: string;
  numero_dono: string;
  complemento_dono: string;
  bairro_dono: string;
  cidade_dono: string;
  estado_dono: string;

  nome_inquilino: string;
  rg_inquilino: string;
  orgao_rg_inquilino: string;
  cpf_inquilino: string;
  estado_civil: string;
  profissao: string;
  cep_inquilino: string;
  logradouro_inquilino: string;
  numero_inquilino: string;
  complemento_inquilino: string;
  bairro_inquilino: string;
  cidade_inquilino: string;
  estado_inquilino: string;

  cep_imovel: string;
  logradouro_imovel: string;
  numero_imovel: string;
  bairro_imovel: string;
  cidade_imovel: string;
  estado_imovel: string;

  dia_pagamento_aluguel: string;
  dia_pagamento_escrito: string;
  numero_luz_enel: string;
  inicio_locacao: string;
  inicio_mes_locacao: string;
  fim_locacao: string;
  fim_mes_locacao: string;

  valor_aluguel: string;
  valor_aluguel_escrito: string;
}

interface IFormFiancaData extends FormBase {
  form_tipo: string;
  data_seguro_fianca?: string;
  complemento_imovel?: string;
  dia_assinatura?: string;
  mes_assinatura?: string;
}

interface IFormCaucaoData extends FormBase {
  form_tipo: string;
  data_seguro_caucao?: string;
  valor_caucao?: string;
  valor_caucao_escrito?: string;
  complemento_imovel?: string;
  data_assinatura?: string;
}

export type FormData = IFormFiancaData | IFormCaucaoData;
