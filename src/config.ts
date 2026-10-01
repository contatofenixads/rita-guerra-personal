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
 *
 * REGRAS: nenhum campo abaixo pode ser preenchido com suposição.
 * Tudo que estiver como string vazia renderiza um marcador claro
 * de "informação a confirmar" na página, e a seção correspondente
 * deixa de prometer o que não foi confirmado.
 *
 * Campos a aguardar da Rita:
 *  - formato / duracao: como o programa funciona no tempo
 *  - incluso: lista do que está entregue na compra
 *  - preco / pagamento: valor e condições
 *  - bonus: apenas se existirem
 *  - garantia: apenas se existir
 *  - linkCompra: link de checkout (Hotmart/Kiwify/etc.)
 */
export const VERAO = {
  formato: '',
  duracao: '',
  incluso: [] as string[],
  preco: '',
  pagamento: '',
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
    title: 'PROJETO VERÃO — Rita Guerra | Programa de entrada',
    description:
      'O PROJETO VERÃO é o programa de entrada da personal trainer Rita Guerra: treino estruturado e acompanhamento para começar de vez. Veja como participar.',
  },
};
