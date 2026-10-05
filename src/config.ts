/**
 * Configuração central do site.
 *
 * PENDÊNCIAS (preencher quando a Rita enviar):
 *  - whatsappNumber: número no formato internacional, apenas dígitos.
 *    Ex.: "5521999999999". Enquanto estiver vazio, os botões de WhatsApp
 *    apontam para a seção de contato (#contato).
 *  - cref: só preencher com o número real. Enquanto vazio, a linha de
 *    credenciais não exibe o CREF (nada é inventado).
 */
export const whatsappNumber = '';

export const WHATSAPP_URL = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      'Oi, Rita! Vim pelo site e quero saber mais sobre o acompanhamento.',
    )}`
  : '#contato';

export const WHATSAPP_URL_VERAO = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      'Oi, Rita! Vim pelo site e quero saber mais sobre o PROJETO VERÃO.',
    )}`
  : '#verao-investimento';

export const INSTAGRAM_URL = 'https://www.instagram.com/ritaquerrapersonal';

export const CREF = '';

/**
 * PROJETO VERÃO — página de vendas.
 * Dados oficiais do produto (referência fornecida pela Rita).
 * Campos vazios permanecem como pendência — nada é inventado.
 */
export const VERAO = {
  formato: 'Protocolo de treino completo em PDF',
  duracao: '90 dias',
  precoAnterior: 'R$ 97,00',
  preco: 'R$ 47,00',
  pagamento: 'Pagamento único',
  acesso: 'Acesso imediato e vitalício',
  incluso: [
    '90 dias de treino completo',
    '4 treinos semanais (A, B, C e D)',
    'Orientações de cardio (mín. 20 minutos por dia)',
    'Metas diárias de alimentação, água, sono e autocuidado',
    'Guia de execução dos exercícios (com fotos e explicações)',
    'Estratégia de progressão de carga',
    'Checklist de acompanhamento',
    'Material em PDF, organizado e de fácil uso',
  ],
  bonus: [] as string[],
  garantia: '',
  linkCompra: '',
};

export const SEO = {
  home: {
    title: 'Rita Guerra — Personal Trainer | Treino individual e acompanhamento',
    description:
      'Treinos individualizados com acompanhamento próximo da personal trainer Rita Guerra. Presencial e online, com treino no app, vídeos de execução e ajustes na sua rotina.',
  },
  verao: {
    title: 'PROJETO VERÃO — Rita Guerra | Protocolo de treino de 90 dias',
    description:
      'O PROJETO VERÃO é um plano de treino completo de 90 dias da personal trainer Rita Guerra: treinos estruturados, orientações de cardio, metas diárias e material em PDF.',
  },
};
