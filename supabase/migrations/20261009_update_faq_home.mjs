import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://supabase-api-prod.verdent.ai/p/pd621910a817772fc297a';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoyMTA2OTI3ODcxLCJpYXQiOjE3OTEzMDg2NzEsImlzcyI6InN1cGFiYXNlIiwicHJvamVjdF9yZWYiOiJwZDYyMTkxMGE4MTc3NzJmYzI5N2EiLCJyb2xlIjoiYW5vbiJ9.JCTz670QpxtwjhIZK98DRAG6WosnJyJLZILDtgGoZ3w';

const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

const faqHome = [
  { page: 'home', pergunta: 'O acompanhamento é online ou presencial?', resposta: 'Os dois! Para quem é da região de Araruama/RJ, temos a opção presencial. Para quem é de fora, a consultoria é 100% online, com o mesmo cuidado, organização e acompanhamento.', ordem: 1 },
  { page: 'home', pergunta: 'Quais são as formas de pagamento?', resposta: 'O pagamento pode ser feito via Pix, cartão de crédito ou débito. Também trabalho com planos recorrentes e opções de assinatura para quem prefere parcelar e manter o acompanhamento contínuo.', ordem: 2 },
  { page: 'home', pergunta: 'Preciso ter experiência na academia?', resposta: 'Não. Eu recebo alunas que nunca treinaram e outras que já treinam há anos. O treino é montado de acordo com o seu nível, confiança e histórico. Ninguém começa do lugar errado aqui.', ordem: 3 },
  { page: 'home', pergunta: 'E se eu precisar viajar ou passar por uma semana corrida?', resposta: 'A vida acontece. Quando surgir algum imprevisto, você me avisa e eu reorganizo o treino para que você continue evoluindo, sem culpa e sem perder o ritmo.', ordem: 4 },
  { page: 'home', pergunta: 'Como é feito o acompanhamento durante a semana?', resposta: 'Você me envia os treinos executados, tira dúvidas e recebe feedbacks diretos. Seu treino não fica parado no tempo: conforme você evolui, eu vou ajustando o que for necessário.', ordem: 5 },
  { page: 'home', pergunta: 'Você também monta dieta?', resposta: 'Não. Sou personal trainer e meu papel é cuidar do seu treino com excelência. Para questões nutricionais, eu indico nutricionistas de confiança que compartilham da mesma visão de saúde e equilíbrio.', ordem: 6 },
];

async function main() {
  const { error: delErr } = await supabase.from('faq_itens').delete().eq('page', 'home');
  if (delErr) {
    console.error('Erro ao limpar FAQ home:', delErr);
    process.exit(1);
  }
  const { error: insErr } = await supabase.from('faq_itens').insert(faqHome.map((f) => ({ ...f, publicado: true })));
  if (insErr) {
    console.error('Erro ao inserir FAQ home:', insErr);
    process.exit(1);
  }
  console.log('FAQ home atualizada com sucesso.');
}

main();
