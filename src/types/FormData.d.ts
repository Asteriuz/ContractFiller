// types.ts
export interface FormData {
   // Dados do Arquivo
  nome_arquivo: string;

   // Dono
  nome_dono: string;
  rg_dono: string;
  orgao_rg_dono: string;
  cpf_dono: string;
  cep_dono: string;
  endereco_dono: string;

  // Inquilino
  nome_inquilino: string;
  rg_inquilino: string;
  orgao_rg_inquilino: string;
  cpf_inquilino: string;
  estado_civil: string;
  profissao: string;
  cep_inquilino: string;
  endereco_inquilino: string;

  // Dados do Imóvel
  endereco_imovel: string;
  cidade_imovel: string;
  cep_imovel: string;

   // Detalhes do Contrato
  dia_pagamento: string;
  dia_pagamento_escrito: string;
  numero_luz_enel: string;
  inicio_locacao: string;
  inicio_mes_locacao: string;
  fim_locacao: string;
  fim_mes_locacao: string;
  dia_assinatura: string;
  mes_assinatura: string;
  valor_pagamento: string;
  valor_escrito: string;
}
