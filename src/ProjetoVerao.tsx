import { useState } from 'react';
import { VERAO, INSTAGRAM_URL, whatsappNumber } from './config';
import { hrefTo } from './ui';
import logoHeader from './assets/logo-header.png';
import logoFooter from './assets/logo-footer.png';
import heroImg from './assets/hero.jpg';
import treino2 from './assets/treino-2.jpg';
import ritaEscadaria from './assets/rita-escadaria.jpg';
import antesDepois1 from './assets/antes-depois-1.jpg';
import antesDepois2 from './assets/antes-depois-2.jpg';
import antesDepois4 from './assets/antes-depois-4.jpg';

/* ============================================================
   PROJETO VERÃO — página de vendas (estilos próprios "pv-")
   Conteúdo oficial do produto conforme referência fornecida.
   ============================================================ */

const PV_NAV = [
  { label: 'Sobre', anchor: 'o-que-e' },
  { label: 'O Projeto', anchor: 'o-que-receber' },
  { label: 'Como Funciona', anchor: 'como-funciona-pv' },
  { label: 'Garantia', anchor: 'verao-investimento' },
  { label: 'Dúvidas', anchor: 'verao-faq' },
];

const pvLink = (anchor: string) => hrefTo('projeto-verao', anchor);

/* destino do CTA de compra: checkout oficial → WhatsApp → contato */
const WHATS_MSG = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Oi, Rita! Quero meu PROJETO VERÃO.')}`
  : '';
const buyHref = VERAO.linkCompra || WHATS_MSG || hrefTo('', 'contato');

function PvBtn({ children }: { children: React.ReactNode }) {
  return (
    <a className="pv-btn" href={buyHref}>
      {children} <span aria-hidden="true">→</span>
    </a>
  );
}

/* ---------- ícones específicos da página (stroke fino) ---------- */

const PvIc = {
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19.5 13.6 12 21l-7.5-7.4A5.2 5.2 0 1 1 12 6.3a5.2 5.2 0 1 1 7.5 7.3Z" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-8 8H4l2.2-2.6A8 8 0 1 1 21 12Z" />
      <path d="M8.5 10.5h7M8.5 13.5h4" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1H9V4ZM9 10h6M9 14h6M9 18h3" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 3 2.7 5.8 6.3.7-4.7 4.2 1.3 6.3L12 16.9 6.4 20l1.3-6.3L3 9.5l6.3-.7Z" />
    </svg>
  ),
  dumbbell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 12h8M3.5 9v6M6.5 7v10M20.5 9v6M17.5 7v10" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4M8 14h3" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4h2l2.4 12h11.2L21 8H6" />
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="17.5" cy="20" r="1.4" />
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11M7 11l5 5 5-5M4 20h16" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2h8l5 5v15H6V2Z" />
      <path d="M14 2v5h5M9 13h6M9 17h6" />
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 7c-1.2-1.8-4-2.3-5.8-.6C3.6 8.9 4 13.6 7 16.9c1.7 1.9 3.4 2.9 5 2.1 1.6.8 3.3-.2 5-2.1 3-3.3 3.4-8 .8-10.5C16 4.7 13.2 5.2 12 7Z" />
      <path d="M12 7c0-2 1-3.5 3-4" />
    </svg>
  ),
  drop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
    </svg>
  ),
  lotus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20c-4.5 0-8-2.5-9-6 2-.8 4-.6 5.5.3C9 11 10 8 12 5.5c2 2.5 3 5.5 3.5 8.8 1.5-.9 3.5-1.1 5.5-.3-1 3.5-4.5 6-9 6Z" />
      <path d="M8.5 14.3c1.2.6 2.3 1.4 3.5 2.5 1.2-1.1 2.3-1.9 3.5-2.5" />
    </svg>
  ),
};

/* ---------- header da página ---------- */

function PvHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="pv-header">
      <div className="container pv-header-inner">
        <a href={pvLink('topo')} className="pv-logo" onClick={() => setOpen(false)}>
          <img src={logoHeader} alt="Rita Guerra — Personal Trainer" />
        </a>
        <nav className={`pv-nav${open ? ' pv-nav-open' : ''}`} aria-label="Navegação do Projeto Verão">
          {PV_NAV.map((n) => (
            <a key={n.anchor} href={pvLink(n.anchor)} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="pv-btn pv-btn-sm pv-header-cta" href={pvLink('verao-investimento')}>
          Quero começar
        </a>
        <button
          className="pv-burger"
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function PvHero() {
  return (
    <section className="pv-hero" id="topo">
      <div className="pv-hero-grid">
        <div className="pv-hero-copy">
          <p className="pv-hero-kicker">P R O J E T O</p>
          <h1 className="pv-hero-title">
            Verão
            <span className="pv-hero-sun" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M13 32a11 11 0 0 1 22 0" />
                <path d="M24 11v7M9 20l5.5 4M39 20l-5.5 4M4 32h7M37 32h7" />
              </svg>
            </span>
          </h1>
          <p className="pv-hero-sub">
            Um plano de treino completo para transformar o seu corpo até o final do ano.
          </p>
          <PvBtn>Quero meu Projeto Verão</PvBtn>
        </div>
        <div className="pv-hero-media">
          <img
            src={heroImg}
            alt="Rita Guerra, personal trainer, ao ar livre em dia de sol"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- faixa de diferenciais ---------- */

function PvFaixa() {
  const itens = [
    { ic: PvIc.chart, l1: 'Treino', l2: 'estruturado' },
    { ic: PvIc.target, l1: 'Progressão', l2: 'de carga' },
    { ic: PvIc.chat, l1: 'Orientações', l2: 'de cardio' },
    { ic: PvIc.clipboard, l1: 'Metas', l2: 'diárias' },
    { ic: PvIc.star, l1: '90 dias', l2: 'de programa' },
  ];
  return (
    <section className="pv-faixa" aria-label="Diferenciais do Projeto Verão">
      <div className="container pv-faixa-grid">
        {itens.map((i) => (
          <div className="pv-faixa-item" key={i.l1 + i.l2}>
            <span className="pv-faixa-ic">{i.ic}</span>
            <p>
              {i.l1}
              <br />
              {i.l2}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- o que é ---------- */

function PvOQueE() {
  return (
    <section className="pv-section" id="o-que-e">
      <div className="container pv-narrow">
        <h2 className="pv-h2">
          O que é o Projeto Verão? <span className="pv-h2-line" aria-hidden="true" />
        </h2>
        <p className="pv-lead">
          Um protocolo de treino completo e prático, com tudo o que você precisa para ter uma rotina
          estruturada, evoluir nos treinos e chegar ao final do ano com mais confiança no seu corpo.
        </p>
      </div>
    </section>
  );
}

/* ---------- o que você vai receber ---------- */

function PvReceber() {
  return (
    <section className="pv-section pv-bg-sand" id="o-que-receber">
      <div className="container pv-split">
        <div>
          <h2 className="pv-h2">
            O que você vai receber? <span className="pv-h2-line" aria-hidden="true" />
          </h2>
          <ul className="pv-check-list">
            {VERAO.incluso.map((item) => (
              <li key={item}>
                <span className="pv-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="pv-receber-visual" aria-hidden="true">
          <div className="pv-cover">
            <img src={treino2} alt="" loading="lazy" decoding="async" />
            <div className="pv-cover-overlay">
              <span className="pv-cover-kicker">Projeto</span>
              <span className="pv-cover-verao">Verão</span>
              <span className="pv-cover-sub">Protocolo de treino · 90 dias</span>
            </div>
          </div>
          <div className="pv-sheet pv-sheet-1">
            <span className="pv-sheet-title">Treino A</span>
            <span className="pv-skel w70" />
            <span className="pv-skel w55" />
            <span className="pv-skel w62" />
          </div>
          <div className="pv-sheet pv-sheet-2">
            <span className="pv-sheet-title">Checklist diário</span>
            <span className="pv-skel w60" />
            <span className="pv-skel w48" />
            <span className="pv-skel w66" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- para quem é ---------- */

function PvParaQuem() {
  const itens = [
    { ic: PvIc.dumbbell, t: 'Para quem quer voltar a treinar e ter uma rotina estruturada.' },
    { ic: PvIc.target, t: 'Para quem já treina e quer evoluir com um programa completo.' },
    { ic: PvIc.calendar, t: 'Para quem quer chegar no final do ano se sentindo melhor com o próprio corpo.' },
    { ic: PvIc.user, t: 'Para quem busca praticidade, sem precisar montar o treino do zero.' },
  ];
  return (
    <section className="pv-section pv-bg-vinho" id="para-quem">
      <div className="container">
        <h2 className="pv-h2 pv-h2-claro">
          Para quem é? <span className="pv-h2-line" aria-hidden="true" />
        </h2>
        <div className="pv-quem-grid">
          {itens.map((i) => (
            <article className="pv-quem-card" key={i.t}>
              <span className="pv-quem-ic">{i.ic}</span>
              <p>{i.t}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- como funciona ---------- */

function PvComoFunciona() {
  const etapas = [
    { n: '1', ic: PvIc.cart, t: 'Você compra', d: 'Acesse o pagamento de forma segura.' },
    {
      n: '2',
      ic: PvIc.download,
      t: 'Recebe o acesso',
      d: 'Receba imediatamente o acesso e o material por e-mail e na área de cliente.',
    },
    { n: '3', ic: PvIc.file, t: 'Começa o projeto', d: 'Comece o treinamento com o material organizado.' },
  ];
  return (
    <section className="pv-section" id="como-funciona-pv">
      <div className="container">
        <h2 className="pv-h2">
          Como funciona? <span className="pv-h2-line" aria-hidden="true" />
        </h2>
        <div className="pv-etapas">
          {etapas.map((e) => (
            <div className="pv-etapa" key={e.n}>
              <span className="pv-etapa-ic">{e.ic}</span>
              <h3>
                {e.n}. {e.t}
              </h3>
              <p>{e.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- estrutura do treino ---------- */

function PvEstrutura() {
  const treinos = [
    { l: 'Treino A', t: 'Inferiores', d: 'glúteos e pernas' },
    { l: 'Treino B', t: 'Superiores', d: 'costas, ombros e braços' },
    { l: 'Treino C', t: 'Inferiores', d: 'variações' },
    { l: 'Treino D', t: 'Superiores', d: 'variações' },
  ];
  return (
    <section className="pv-section pv-bg-sand" id="estrutura">
      <div className="container">
        <h2 className="pv-h2">
          Estrutura do treino <span className="pv-h2-line" aria-hidden="true" />
        </h2>
        <p className="pv-sub-h2">Um protocolo completo, pensado para te fazer evoluir.</p>
        <div className="pv-treinos">
          {treinos.map((t) => (
            <article className="pv-treino" key={t.l}>
              <span className="pv-treino-l">{t.l}</span>
              <span className="pv-treino-t">{t.t}</span>
              <span className="pv-treino-d">({t.d})</span>
            </article>
          ))}
        </div>
        <div className="pv-nota-5x">
          <span className="pv-nota-ic" aria-hidden="true">
            {PvIc.calendar}
          </span>
          <div>
            <strong>Também funciona para 5x na semana</strong>
            <p>
              Você pode seguir o protocolo A, B, C e D ou repetir o Treino A no quinto dia, conforme
              sua rotina e disponibilidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- orientações completas ---------- */

function PvOrientacoes() {
  const itens = [
    { ic: PvIc.heart, t: 'Cardio', d: 'Mín. 20 min por dia (com opções)' },
    { ic: PvIc.apple, t: 'Alimentação', d: 'Metas práticas e realistas' },
    { ic: PvIc.drop, t: 'Hidratação', d: 'Pelo menos 2 litros de água' },
    { ic: PvIc.moon, t: 'Sono', d: '8 horas por noite' },
    { ic: PvIc.lotus, t: 'Autocuidado', d: 'Um momento diário para você' },
  ];
  return (
    <section className="pv-section" id="orientacoes">
      <div className="container">
        <h2 className="pv-h2">
          Orientações completas <span className="pv-h2-line" aria-hidden="true" />
        </h2>
        <div className="pv-orient-grid">
          {itens.map((i) => (
            <div className="pv-orient" key={i.t}>
              <span className="pv-orient-ic">{i.ic}</span>
              <h3>{i.t}</h3>
              <p>{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- material organizado ---------- */

function PvMaterial() {
  const sheets = [
    { t: 'Treino A', s: 'Inferiores' },
    { t: 'Orientações de cardio', s: 'com opções' },
    { t: 'Metas da semana', s: 'práticas e realistas' },
    { t: 'Checklist diário', s: 'de acompanhamento' },
  ];
  return (
    <section className="pv-section pv-bg-sand" id="material">
      <div className="container">
        <h2 className="pv-h2">
          Material organizado e prático <span className="pv-h2-line" aria-hidden="true" />
        </h2>
        <div className="pv-material-grid">
          {sheets.map((s) => (
            <article className="pv-material" key={s.t}>
              <span className="pv-material-title">{s.t}</span>
              <span className="pv-material-sub">{s.s}</span>
              <span className="pv-skel w80" />
              <span className="pv-skel w65" />
              <span className="pv-skel w72" />
              <span className="pv-skel w58" />
              <span className="pv-material-tag">PDF</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- resultados reais ---------- */

function PvResultados() {
  const fotos = [
    {
      img: antesDepois1,
      alt: 'Antes e depois de aluna da Rita Guerra após três meses de acompanhamento',
    },
    { img: antesDepois2, alt: 'Antes e depois de aluna com evolução visível na definição' },
    { img: antesDepois4, alt: 'Antes e depois de aluna com mudança de contorno corporal' },
  ];
  return (
    <section className="pv-section pv-dark" id="resultados-pv">
      <div className="container pv-split">
        <div>
          <h2 className="pv-h2 pv-h2-claro">Resultados reais vêm de consistência.</h2>
          <p className="pv-lead pv-lead-claro">
            O Projeto Verão te dá o direcionamento que você precisa para manter o foco, evoluir nos
            treinos e chegar no final do ano com mais resultado.
          </p>
        </div>
        <div className="pv-result-fotos">
          {fotos.map((f) => (
            <img key={f.img} src={f.img} alt={f.alt} loading="lazy" decoding="async" />
          ))}
        </div>
      </div>
      <div className="container">
        <p className="pv-result-note">
          Antes e depois reais de alunas, publicados com autorização. Resultados variam de pessoa
          para pessoa — o que sustenta o progresso é a consistência.
        </p>
      </div>
    </section>
  );
}

/* ---------- investimento ---------- */

function PvInvestimento() {
  return (
    <section className="pv-section" id="verao-investimento">
      <div className="container">
        <div className="pv-invest">
          <div className="pv-preco-bloco">
            <h2 className="pv-h2">
              Investimento <span className="pv-h2-line" aria-hidden="true" />
            </h2>
            <p className="pv-preco-antigo">De {VERAO.precoAnterior}</p>
            <p className="pv-preco">{VERAO.preco}</p>
            <p className="pv-preco-cond">
              {VERAO.pagamento}
              <br />
              {VERAO.acesso}
            </p>
          </div>
          <ul className="pv-check-list pv-inclui">
            {VERAO.incluso.map((item) => (
              <li key={item}>
                <span className="pv-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="pv-invest-cta">
          <PvBtn>Quero meu Projeto Verão</PvBtn>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function PvFaq() {
  const faqs = [
    {
      q: 'Por quanto tempo terei acesso?',
      a: 'O acesso é vitalício: você faz o pagamento uma única vez e o material fica disponível para você sempre.',
    },
    {
      q: 'Preciso ter experiência para fazer o projeto?',
      a: 'Não. O material inclui o guia de execução dos exercícios, com fotos e explicações, para você treinar com clareza desde o primeiro dia.',
    },
    {
      q: 'Posso fazer em qualquer academia?',
      a: 'Sim. O protocolo é entregue em PDF, pensado para treinos de academia — você segue o material onde treinar.',
    },
    {
      q: 'E se eu não puder treinar 4x na semana?',
      a: 'O protocolo foi montado em 4 treinos semanais (A, B, C e D), mas também funciona para quem treina 5x por semana — repetindo o Treino A no quinto dia. Como o material é seu, você organiza as sessões conforme a sua rotina.',
    },
    {
      q: 'Como recebo o material?',
      a: 'Imediatamente após o pagamento, por e-mail e também na área de cliente.',
    },
    {
      q: 'Para quem o Projeto Verão não é indicado?',
      a: 'Para quem procura atalho ou promessa milagrosa. O projeto entrega estrutura, direcionamento e material completo — os resultados vêm da sua consistência nos treinos.',
    },
  ];
  return (
    <section className="pv-section pv-bg-sand" id="verao-faq">
      <div className="container pv-narrow">
        <h2 className="pv-h2">
          Dúvidas frequentes <span className="pv-h2-line" aria-hidden="true" />
        </h2>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA final ---------- */

function PvFinal() {
  return (
    <section className="pv-final" id="contato">
      <img className="pv-final-bg" src={ritaEscadaria} alt="" loading="lazy" decoding="async" />
      <div className="pv-final-overlay" />
      <div className="container pv-final-inner">
        <h2>
          Disciplina hoje,
          <br />
          resultados amanhã.
        </h2>
        <PvBtn>Quero meu Projeto Verão</PvBtn>
        <img
          className="pv-final-logo"
          src={logoFooter}
          alt="Rita Guerra — Personal Trainer"
          loading="lazy"
          decoding="async"
        />
        <p className="pv-final-insta">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram · @ritaquerrapersonal
          </a>
        </p>
      </div>
    </section>
  );
}

/* ---------- página ---------- */

export default function ProjetoVerao() {
  return (
    <div className="pv-page">
      <PvHeader />
      <main>
        <PvHero />
        <PvFaixa />
        <PvOQueE />
        <PvReceber />
        <PvParaQuem />
        <PvComoFunciona />
        <PvEstrutura />
        <PvOrientacoes />
        <PvMaterial />
        <PvResultados />
        <PvInvestimento />
        <PvFaq />
        <PvFinal />
      </main>
    </div>
  );
}
