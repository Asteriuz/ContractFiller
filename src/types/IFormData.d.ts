// types.ts
export interface IFormFiancaData {
  // Dono
  nome_dono: string;
  rg_dono: string;
  orgao_rg_dono: string;
  cpf_dono: string;
  cep_dono: string;
  logradouro_dono: string;
  numero_dono: string;
  complemento_dono?: string;
  bairro_dono: string;
  cidade_dono: string;
  estado_dono: string;

  // Inquilino
  nome_inquilino: string;
  rg_inquilino: string;
  orgao_rg_inquilino: string;
  cpf_inquilino: string;
  estado_civil: string;
  profissao: string;
  cep_inquilino: string;
  logradouro_inquilino: string;
  numero_inquilino: string;
  complemento_inquilino?: string;
  bairro_inquilino: string;
  cidade_inquilino: string;
  estado_inquilino: string;

  // Dados do Imóvel
  cidade_imovel: string;
  cep_imovel: string;
  logradouro_imovel: string;
  numero_imovel: string;
  complemento_imovel?: string;
  bairro_imovel: string;
  estado_imovel: string;

  // Detalhes do Contrato
  dia_pagamento_aluguel: string;
  dia_pagamento_escrito: string;
  inicio_locacao: string;
  inicio_mes_locacao: string;
  fim_locacao: string;
  fim_mes_locacao: string;
  numero_luz_enel: string;
  data_seguro_fianca: string;
  dia_assinatura: string;
  mes_assinatura: string;
  valor_aluguel: string;
  valor_aluguel_escrito: string;
}

export interface IFormCaucaoData {
  // Dono
  nome_dono: string;
  rg_dono: string;
  orgao_rg_dono: string;
  cpf_dono: string;
  cep_dono: string;
  logradouro_dono: string;
  numero_dono: string;
  complemento_dono?: string;
  bairro_dono: string;
  cidade_dono: string;
  estado_dono: string;

  // Inquilino
  nome_inquilino: string;
  rg_inquilino: string;
  orgao_rg_inquilino: string;
  cpf_inquilino: string;
  estado_civil: string;
  profissao: string;
  cep_inquilino: string;
  logradouro_inquilino: string;
  numero_inquilino: string;
  complemento_inquilino?: string;
  bairro_inquilino: string;
  cidade_inquilino: string;
  estado_inquilino: string;

  // Dados do Imóvel
  cidade_imovel: string;
  cep_imovel: string;
  logradouro_imovel: string;
  numero_imovel: string;
  complemento_imovel?: string;
  bairro_imovel: string;
  estado_imovel: string;

  // Detalhes do Contrato
  dia_pagamento_aluguel: string;
  dia_pagamento_escrito: string;
  numero_luz_enel: string;
  inicio_locacao: string;
  inicio_mes_locacao: string;
  fim_locacao: string;
  fim_mes_locacao: string;
  dia_assinatura: string;
  mes_assinatura: string;
  valor_aluguel: string;
  valor_aluguel_escrito: string;
}
