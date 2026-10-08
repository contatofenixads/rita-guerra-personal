import { useEffect } from 'react';
import { WHATSAPP_URL, INSTAGRAM_URL, CREF, SEO, VERAO } from './config';
import { Icon, Eyebrow, CtaPrimary, CtaWhats, MiniDepo, Marquee, useRoute, hrefTo } from './ui';
import ProjetoVerao from './ProjetoVerao';
import { useSiteContent } from './content';
import logoHeader from './assets/logo-header.png';
import logoFooter from './assets/logo-footer.png';
import heroImg from './assets/rita-escadaria.jpg';
import ritaSobre from './assets/rita-sobre.jpg';
import antesDepois1 from './assets/antes-depois-1.jpg';
import antesDepois2 from './assets/antes-depois-2.jpg';
import antesDepois3 from './assets/antes-depois-3.jpg';
import antesDepois4 from './assets/antes-depois-4.jpg';
import resultadoGluteo from './assets/resultado-gluteo.jpg';
import resultado3Meses from './assets/resultado-3meses.jpg';
import pvHeroPraia from './assets/pv-hero-praia.jpg';
import pvBannerHome from './assets/pv-banner-home.jpg';

/* ---------- cabeçalho ---------- */

function Header({ salesMode = false }: { salesMode?: boolean }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href={salesMode ? hrefTo('') : '#topo'} className="header-logo" aria-label="Rita Guerra — Personal Trainer">
          <img src={logoHeader} alt="Rita Guerra — Personal Trainer" />
        </a>
        {!salesMode && (
          <nav className="header-nav" aria-label="Navegação principal">
            <a href="#como-funciona">Como funciona</a>
            <a href="#servicos">Serviços</a>
            <a href="#resultados">Resultados</a>
            <a href="#sobre">Sobre</a>
            <a href="#faq">FAQ</a>
          </nav>
        )}
        {salesMode ? (
          <a className="btn btn-whats btn-sm" href={hrefTo('')}>
            {Icon.arrow} Voltar ao site
          </a>
        ) : (
          <a className="btn btn-primary btn-sm" href="#contato">
            Agendar conversa
          </a>
        )}
      </div>
    </header>
  );
}

/* ---------- seções da HOME ---------- */

function Hero() {
  const { config } = useSiteContent();
  return (
    <section className="hero" id="topo">
      {config['verao.destaqueHome'] !== 'off' && (
        <a className="verao-flag" href={hrefTo('projeto-verao')}>
          <span className="verao-flag-tag">Novo</span>
          <strong>PROJETO VERÃO</strong> — programa de entrada · conhecer agora
          <span aria-hidden="true">{Icon.arrow}</span>
        </a>
      )}
      <div className="container hero-grid">
        <div className="hero-copy">
          <Eyebrow>Rita Guerra — Personal Trainer · especialista em treinamento feminino</Eyebrow>
          <h1>
            Treino com a sua cara,{' '}
            <em>
              acompanhamento
              <br />
              com a minha.
            </em>
          </h1>
          <p className="hero-sub">
            Sou Rita Guerra. Monto treinos que respeitam a sua rotina, o seu nível e o que você gosta
            de fazer — e acompanho de perto cada evolução, de verdade.
          </p>
          <div className="hero-ctas">
            <CtaPrimary href="#servicos">Quero conhecer o acompanhamento</CtaPrimary>
            <CtaWhats />
          </div>
          <p className="hero-proof">
            {CREF ? `CREF ${CREF} · ` : ''}
            Atendimento presencial e online · Treino no app com vídeos de execução
          </p>
        </div>
        <div className="hero-media">
          <img
            src={heroImg}
            alt="Rita Guerra, personal trainer, em ensaio profissional sentada em escadaria"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

function Valor() {
  const itens = [
    {
      ic: Icon.chat,
      t: 'Nada de ficha de gaveta',
      d: 'Seu treino nasce de uma conversa com você, onde vou avaliar sua rotina, seu histórico e o que gosta de fazer.',
    },
    {
      ic: Icon.adjust,
      t: 'O treino se adapta a você',
      d: 'Semana cansada, viagem, dor que apareceu? O plano se ajusta à sua vida e não ao contrário.',
    },
    {
      ic: Icon.heart,
      t: 'Acompanhamento contínuo',
      d: 'Aqui você terá todo o suporte que precisar para nunca se sentir sozinha e treinando "no escuro".',
    },
  ];
  return (
    <section className="section valor">
      <div className="container">
        <div className="section-head">
          <Eyebrow>Por que diferente</Eyebrow>
          <h2>
            Aqui você não vai apenas emagrecer. Vai <em>amar o corpo que vê no espelho.</em>
          </h2>
          <p className="lead">
            Aqui o treino é pensado para você conseguir definir o seu corpo, sem dietas malucas e
            sem passar horas na academia, com um método eficiente e personalizado.
          </p>
        </div>
        <div className="cards-3">
          {itens.map((i) => (
            <article className="card" key={i.t}>
              <span className="card-ic">{i.ic}</span>
              <h3>{i.t}</h3>
              <p>{i.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  const passos = [
    {
      n: '01',
      t: 'Conversa inicial',
      d: 'Aqui eu entendo seus objetivos, sua rotina e suas preferências. Tudo começa pelo que você precisa e não por uma ficha pronta.',
    },
    {
      n: '02',
      t: 'Estratégia personalizada',
      d: 'A partir disso, estruturo seu treino de acordo com seus objetivos, nível de experiência e rotina, escolhendo exercícios, volume e frequência que façam sentido para você.',
    },
    {
      n: '03',
      t: 'Hora de colocar em prática',
      d: 'Você começa a treinar sabendo o que fazer e como fazer. Meu papel é garantir que o treino não fique apenas no papel, mas seja executado da maneira certa.',
    },
    {
      n: '04',
      t: 'Acompanhamento e evolução',
      d: 'Seu treino não fica parado no tempo. Acompanho sua evolução e, conforme você avança, ajustamos o que for necessário para continuar progredindo.',
    },
  ];
  return (
    <section className="section section-sand" id="como-funciona">
      <div className="container">
        <div className="section-head">
          <Eyebrow>Como funciona</Eyebrow>
          <h2>Um processo simples do primeiro contato ao primeiro resultado</h2>
        </div>
        <ol className="passos">
          {passos.map((p) => (
            <li className="passo" key={p.n}>
              <span className="passo-n">{p.n}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ol>
        <div className="com-funciona-fecho">
          <div className="section-cta">
            <CtaPrimary href="#contato">Começar pela conversa inicial</CtaPrimary>
          </div>
          <MiniDepo quote="Tudo muito prático e fácil de entender, principalmente os vídeos de como realizar cada exercício." />
          <MiniDepo quote="Adoro a diversidade e adoro não ser subestimada por você. Sempre que observava alguma dificuldade, você estudava para resolvê-la." />
        </div>
      </div>
    </section>
  );
}

function ParaQuemE() {
  const itens = [
    {
      t: 'Já tentou treinar sozinha e não conseguiu manter',
      d: 'O problema não foi você, foi um treino que não considerou a sua vida. O treino se adapta à sua rotina.',
    },
    {
      t: 'Tem medo ou insegurança com academia',
      d: 'Começamos no seu ritmo, no seu nível. Ninguém nasce sabendo e eu estou aqui para te passar essa segurança.',
    },
    {
      t: 'Tem rotina imprevisível',
      d: 'Treinos organizados por sessão e não por dia da semana. Faltou hoje? Continua de onde parou sem recomeçar do zero.',
    },
    {
      t: 'Não quer treino genérico de internet',
      d: 'Seu treino nasce de uma conversa e evolui com seus resultados.',
    },
    {
      t: 'Quer ser levada a sério',
      d: 'Aqui ninguém é subestimada. Você treina forte na medida certa, com segurança e acompanhamento.',
    },
  ];
  return (
    <section className="section">
      <div className="container split">
        <div className="section-head">
          <Eyebrow>Para quem é</Eyebrow>
          <h2>
            Feito para você que quer ter <em>constância na academia</em> sem ficar sempre
            recomeçando do zero.
          </h2>
        </div>
        <ul className="check-list">
          {itens.map((i) => (
            <li key={i.t}>
              <span className="check-ic">{Icon.check}</span>
              <div>
                <strong>{i.t}.</strong> {i.d}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="container">
        <div className="com-funciona-fecho">
          <MiniDepo quote="Desde que comecei, seu trabalho tem sido impecável. Ouve e acolhe as nossas necessidades e respeita as limitações." />
        </div>
      </div>
    </section>
  );
}

const IMAGEM_REFS: Record<string, string> = {
  'antes-depois-1': antesDepois1,
  'antes-depois-2': antesDepois2,
  'antes-depois-3': antesDepois3,
  'antes-depois-4': antesDepois4,
  'resultado-gluteo': resultadoGluteo,
  'resultado-3meses': resultado3Meses,
};

function Resultados() {
  const { resultados } = useSiteContent();
  const resultadosFallback = [
    {
      img: antesDepois1,
      alt: 'Comparação antes e depois de aluna da Rita Guerra, vista lateral, após três meses de acompanhamento',
      cap: '3 meses de acompanhamento: “TRÊS MESES E OLHEM ESSE RESULTADO!! Tudo isso apenas com os treinos, sem grandes mudanças na alimentação.”',
    },
    {
      img: antesDepois2,
      alt: 'Antes e depois de aluna em mesma roupa e local, com evolução visível na definição abdominal',
      cap: 'Mesma roupa, mesmo local — evolução de definição no acompanhamento.',
    },
    {
      img: antesDepois3,
      alt: 'Antes e depois de aluna de corpo inteiro na academia, com progressão evidente',
      cap: 'Progresso da aluna no acompanhamento.',
    },
    {
      img: antesDepois4,
      alt: 'Antes e depois de aluna com mudança forte de contorno corporal',
      cap: 'Progresso da aluna no acompanhamento.',
    },
    {
      img: resultadoGluteo,
      alt: 'Publicação da Rita mostrando evolução de bumbum de aluna em três tempos: antes, um mês e três meses',
      cap: '“O objetivo dela era levantar o bumbum — diferença já no primeiro mês.” — Rita',
      story: true,
    },
  ];
  const lista: { img: string; alt: string; cap: string; story?: boolean }[] =
    resultados.length > 0
      ? resultados.map((r) => ({
          img: IMAGEM_REFS[r.imagemRef] ?? antesDepois1,
          alt: r.alt,
          cap: r.legenda,
        }))
      : resultadosFallback;
  const relatos = [
    { n: '-10 kg', d: '“Bati -10kg essa semana… OLHA ESSE OMBRO. A MÃE ESTÁ MAROMBA.” — relato de aluna' },
    { n: '1 mês', d: '“O objetivo dela era levantar o bumbum — diferença já no primeiro mês.” — Rita' },
    { n: 'Costas', d: '“MEU DEUS MULHER, suas costas estão definindo… Obrigada, Ritinha. Sem você não seria possível.” — relato de aluna' },
    { n: 'Do zero', d: '“Eu detestava academia e agora tô começando a gostar… hoje consegui fazer tudo com peso.” — relato de aluna' },
  ];
  return (
    <section className="section section-dark" id="resultados">
      <div className="container">
        <div className="section-head">
          <Eyebrow>Resultados</Eyebrow>
          <h2>Resultados reais.</h2>
          <p className="lead">
            Resultados de mulheres que confiaram no meu método e hoje se sentem mais seguras,
            saudáveis e felizes com o próprio corpo.
          </p>
        </div>
        <Marquee duration="65s" className="res-marquee" label="Resultados de alunas">
          {lista.map((r) => (
            <figure className={`res-card${r.story ? ' res-card-story' : ''}`} role="listitem" key={r.cap}>
              <img src={r.img} alt={r.alt} loading="lazy" decoding="async" />
              <figcaption>{r.cap}</figcaption>
            </figure>
          ))}
        </Marquee>
        <div className="stats">
          {relatos.map((r) => (
            <div className="stat" key={r.n}>
              <span className="stat-n">{r.n}</span>
              <p>{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Depoimentos() {
  const { depoimentos } = useSiteContent();
  const depsFallback = [
    { q: 'Ainda não acredito que consegui evoluir tanto… Ter o seu auxílio deixa tudo mais leve. Seu trabalho é incrível.' },
    { q: 'Desde que comecei, seu trabalho tem sido impecável. Ouve e acolhe as nossas necessidades e respeita as limitações.' },
    { q: 'Tudo muito prático e fácil de entender, principalmente os vídeos de cada exercício… dá para perceber o cuidado na montagem de cada treino.' },
    { q: 'Adoro a diversidade e adoro não ser subestimada por você. Sempre que observava alguma dificuldade, você estudava para resolvê-la.' },
    { q: 'Tô amando os treinos! Tive retorno da nutricionista e, do que mais pediram, foi braço — fiquei super feliz.' },
    { q: 'Passando pra falar que eu AMEI o treino, já fiz uma semana completa com ele. Que treino gostoso.' },
  ];
  const deps: { q: string; who?: string }[] =
    depoimentos.length > 0 ? depoimentos : depsFallback;
  return (
    <section className="section" id="depoimentos">
      <div className="container">
        <div className="section-head">
          <Eyebrow>Depoimentos</Eyebrow>
          <h2>Elas chegaram com a mesma dúvida que você.</h2>
          <p className="lead">Mensagens reais das alunas — sem edição de texto.</p>
        </div>
        <Marquee duration="75s" label="Depoimentos de alunas">
          {deps.map((d, i) => (
            <figure className="dep-card" role="listitem" key={i}>
              <span className="dep-stars" aria-hidden="true">
                {Icon.star}
                {Icon.star}
                {Icon.star}
                {Icon.star}
                {Icon.star}
              </span>
              <blockquote>“{d.q}”</blockquote>
              <figcaption>{d.who || 'Aluna do acompanhamento'}</figcaption>
            </figure>
          ))}
        </Marquee>
        <p className="dep-note">
          Nomes e fotos das alunas são publicados apenas com autorização de cada uma. As citações
          acima são transcrições de mensagens reais recebidas pela Rita.
        </p>
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <section className="section section-marsala" id="sobre">
      <div className="container split">
        <div className="sobre-media">
          <img src={ritaSobre} alt="Rita Guerra sorrindo para a câmera" loading="lazy" decoding="async" />
        </div>
        <div className="section-head">
          <Eyebrow>Sobre a Rita</Eyebrow>
          <h2>
            Prazer, Rita. Eu cuido do seu treino <em>do jeito que você merece.</em>
          </h2>
          <p className="lead">
            Sou personal trainer e, na prática, um pouco mais que isso: sou quem corrige o exercício
            antes de virar lesão, quem ajusta o treino quando sua semana desanda, e quem comemora
            cada evolução com você, mesmo as que você ainda não percebeu.
          </p>
          <p className="lead">
            Trabalho com treino individualizado presencial e online, sempre com o mesmo princípio:
            entender você primeiro, para depois pensar no seu treino.
          </p>
          <a className="text-link" href="#contato">
            Vamos treinar juntas? <span aria-hidden="true">{Icon.arrow}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Metodo() {
  const pilares = [
    {
      ic: Icon.chat,
      t: 'Individualização',
      d: 'Treino desenhado a partir da sua rotina, nível e preferências. O conteúdo é seu — do aquecimento ao último exercício.',
    },
    {
      ic: Icon.check,
      t: 'Execução antes de carga',
      d: 'Movimento bem feito vem primeiro. Vídeo de cada exercício e correção constante para evoluir com segurança.',
    },
    {
      ic: Icon.adjust,
      t: 'Adaptação à vida real',
      d: 'Viagem, semana puxada, equipamento limitado: o treino se reorganiza para você não parar. Faltar não vira desistir.',
    },
    {
      ic: Icon.chart,
      t: 'Acompanhamento próximo',
      d: 'Sua evolução é monitorada de perto e o treino avança quando você está pronta — com ajustes sempre que necessário.',
    },
  ];
  return (
    <section className="section" id="metodo">
      <div className="container">
        <div className="section-head">
          <Eyebrow>Método</Eyebrow>
          <h2>Quatro princípios que sustentam todo treino que eu monto.</h2>
        </div>
        <div className="cards-2x2">
          {pilares.map((p) => (
            <article className="card" key={p.t}>
              <span className="card-ic">{p.ic}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </article>
          ))}
        </div>
        <MiniDepo quote="Adoro a diversidade e adoro não ser subestimada por você." />
      </div>
    </section>
  );
}

function Servicos() {
  const { config } = useSiteContent();
  return (
    <section className="section section-dark" id="servicos">
      <div className="container">
        <div className="section-head">
          <Eyebrow>Serviços</Eyebrow>
          <h2>Escolha o formato que cabe na sua vida.</h2>
          <p className="lead">
            Os planos são montados de acordo com a frequência e o formato que fizerem sentido para
            você — os valores são informados na conversa inicial.
          </p>
        </div>
        <div className="planos">
          <article className="plano plano-destaque">
            <span className="plano-tag">Mais procurado</span>
            <h3>Acompanhamento Online</h3>
            <p className="plano-desc">
              Seu treino no aplicativo, com vídeos de execução, ajustes contínuos e suporte direto
              comigo — de onde você estiver.
            </p>
            <ul>
              <li>{Icon.check} Treino individualizado no app</li>
              <li>{Icon.check} Vídeos de execução de cada exercício</li>
              <li>{Icon.check} Ajustes e evolução do treino</li>
              <li>{Icon.check} Suporte direto com a Rita</li>
            </ul>
            <div className="plano-cta">
              <CtaWhats label="Quero o acompanhamento online" />
              <span className="plano-preco">Valor na conversa inicial</span>
            </div>
          </article>
          <article className="plano">
            <h3>Acompanhamento Presencial</h3>
            <p className="plano-desc">
              Treino ao seu lado, com correção em tempo real e progressão ajustada na hora.
            </p>
            <ul>
              <li>{Icon.check} Sessões individuais</li>
              <li>{Icon.check} Correção de execução em tempo real</li>
              <li>{Icon.check} Progressão planejada</li>
              <li>{Icon.check} Frequência combinada com você</li>
            </ul>
            <div className="plano-cta">
              <CtaWhats label="Quero treinar presencial" />
              <span className="plano-preco">Valor na conversa inicial</span>
            </div>
          </article>
        </div>
        <p className="servicos-foot">
          Não sabe qual é o seu formato? Me chama — a gente descobre juntas.
        </p>
        <a className="verao-banner" href={hrefTo('projeto-verao')} aria-label="Conhecer o Projeto Verão">
          <div className="verao-banner-media">
            <img
              className="verao-banner-foto"
              src={pvBannerHome}
              alt="Rita Guerra na praia, de bikini, em dia de sol"
              loading="lazy"
              decoding="async"
            />
            <div className="verao-banner-shade" aria-hidden="true" />
            <div className="verao-banner-head">
              <span className="verao-banner-kicker">P R O J E T O</span>
              <span className="verao-banner-script">Verão</span>
              <span className="verao-banner-sub">
                Um plano de treino completo para transformar o seu corpo até o final do ano.
              </span>
            </div>
            <ul className="verao-banner-beneficios">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" />
                </svg>
                <span>Treinos completos <em>(4x por semana)</em></span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21c-4.4-3.6-8-6.7-8-10.4C4 7.4 6.4 5 9.2 5c1.2 0 2.2.5 2.8 1.2A3.9 3.9 0 0 1 14.8 5C17.6 5 20 7.4 20 10.6c0 3.7-3.6 6.8-8 10.4Z" />
                </svg>
                <span>Orientação <em>de cardio</em></span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
                  <path d="M3.5 9.5h17M8 3v4M16 3v4" />
                </svg>
                <span>90 dias de <em>programa</em></span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M10 8.8v6.4l5.2-3.2L10 8.8Z" />
                </svg>
                <span>Com vídeo <em>de execução</em></span>
              </li>
            </ul>
          </div>
          <div className="verao-banner-panel">
            <h3>Quer começar agora?</h3>
            <p>
              Um programa pronto para mulheres que querem emagrecer, definir e chegar ao verão se
              sentindo muito melhor com o próprio corpo, sem precisar contratar uma consultoria
              individual.
            </p>
            <p className="verao-banner-preco">{config['verao.preco'] || VERAO.preco}</p>
            <p className="verao-banner-acesso">Acesso imediato</p>
            <span className="verao-banner-cta">
              Quero começar o Projeto Verão <span aria-hidden="true">→</span>
            </span>
            <span className="verao-banner-nota">Programa pronto • Sem acompanhamento individual</span>
          </div>
        </a>
      </div>
    </section>
  );
}

function ProjetoVeraoHome() {
  const entregas = [
    'Treinos completos para você fazer na semana',
    'Orientação de cardio',
    '90 dias de programa',
    'Vídeos das execuções dos exercícios',
    'Metas para você bater por dia de alimentação',
  ];
  return (
    <section className="section section-sand" id="projeto-verao-home">
      <div className="container">
        <div className="section-head">
          <Eyebrow>Projeto Verão</Eyebrow>
          <h2>
            PROJETO VERÃO — <em>um programa pronto de 90 dias.</em>
          </h2>
          <p className="lead">
            Sem consultoria individual e sem enrolação: você recebe o material completo, organizado
            e começa a treinar no seu ritmo, com tudo o que precisa em mãos.
          </p>
        </div>
        <ul className="check-list">
          {entregas.map((e) => (
            <li key={e}>
              <span className="check-ic">{Icon.check}</span>
              <div>
                <strong>{e}.</strong>
              </div>
            </li>
          ))}
        </ul>
        <div className="com-funciona-fecho pv-home-depos">
          <MiniDepo quote="Você é muito atenciosa e muito gentil, eu estou amando e nem comecei." />
          <MiniDepo quote="Eu tô vendo muito resultado com os treinos. Meu bumbum tá crescendo." />
        </div>
        <div className="section-cta" style={{ textAlign: 'center' }}>
          <CtaPrimary href={hrefTo('projeto-verao')}>Quero conhecer o Projeto Verão</CtaPrimary>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { faqHome } = useSiteContent();
  const faqsFallback = [
    {
      q: 'Nunca treinei na vida. Consigo começar?',
      a: 'Consegue — e começa do jeito certo: avaliação do seu nível, exercícios adaptados e execução acompanhada, presencial ou por vídeo.',
    },
    {
      q: 'Como funciona o acompanhamento online?',
      a: 'Você recebe o treino no aplicativo com vídeo de cada exercício, treina quando puder e me envia sua execução e dúvidas. Eu corrijo, ajusto e evoluo o seu treino.',
    },
    {
      q: 'E se eu faltar ou perder dias?',
      a: 'O treino é organizado por sessão, não por data. Faltou? Continua de onde parou. Sem culpa, sem recomeço do zero.',
    },
    {
      q: 'Posso treinar em casa ou só na academia?',
      a: 'O acompanhamento online funciona nos dois cenários: o treino é montado para o ambiente e o material que você tiver disponível.',
    },
    {
      q: 'Quanto custa?',
      a: 'Os valores dependem do formato e da frequência do acompanhamento — por isso são informados na conversa inicial, junto com tudo o que está incluído.',
    },
    {
      q: 'Como faço para começar?',
      a: 'Simples: clica no botão abaixo, me chama no WhatsApp e a gente conversa sobre sua rotina e objetivo. De lá sai o seu plano.',
    },
  ];
  const faqs = faqHome.length > 0 ? faqHome : faqsFallback;
  return (
    <section className="section" id="faq">
      <div className="container container-narrow">
        <div className="section-head">
          <Eyebrow>FAQ</Eyebrow>
          <h2>Dúvidas que chegam antes da primeira aula.</h2>
        </div>
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

function CtaFinal() {
  return (
    <section className="section cta-section" id="contato">
      <div className="container container-narrow cta-final">
        <h2>Sua próxima semana de treino pode ser diferente desta.</h2>
        <p>
          Sem promessa impossível. Uma conversa honesta sobre onde você está — e um treino que
          respeite onde você quer chegar.
        </p>
        <div className="hero-ctas cta-center">
          <CtaWhats label="Quero conversar com a Rita" />
          <CtaPrimary href="#servicos">Relembrar os formatos de acompanhamento</CtaPrimary>
        </div>
        <p className="cta-micro">Resposta pessoal, sem robô · Atendimento presencial e online</p>
      </div>
    </section>
  );
}

function Footer({ salesMode = false }: { salesMode?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img className="footer-logo" src={logoFooter} alt="Rita Guerra — Personal Trainer" loading="lazy" decoding="async" />
          <p className="footer-copy">Treino individualizado com acompanhamento de verdade.</p>
        </div>
        <nav aria-label="Navegação do rodapé">
          {salesMode ? (
            <>
              <a href={hrefTo('')}>Início do site</a>
              <a href={hrefTo('', 'servicos')}>Acompanhamentos</a>
              <a href={hrefTo('', 'sobre')}>Sobre a Rita</a>
            </>
          ) : (
            <>
              <a href="#como-funciona">Como funciona</a>
              <a href="#servicos">Serviços</a>
              <a href="#resultados">Resultados</a>
              <a href="#faq">FAQ</a>
            </>
          )}
        </nav>
        <div className="footer-contato">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram · @ritaquerrapersonal
          </a>
          <a
            href={WHATSAPP_URL}
            target={WHATSAPP_URL.startsWith('http') ? '_blank' : undefined}
            rel={WHATSAPP_URL.startsWith('http') ? 'noreferrer' : undefined}
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="container footer-base">
        <span>© {new Date().getFullYear()} Rita Guerra · Personal Trainer</span>
        <span>Presencial e online</span>
      </div>
    </footer>
  );
}

function MobileBar({ salesMode = false }: { salesMode?: boolean }) {
  return (
    <div className="mobile-bar" role="complementary" aria-label="Ações rápidas">
      {salesMode ? (
        <a className="btn btn-primary" href={hrefTo('projeto-verao', 'verao-investimento')}>
          Quero participar
        </a>
      ) : (
        <a className="btn btn-primary" href="#servicos">
          Ver planos
        </a>
      )}
      <a
        className="btn btn-whats"
        href={WHATSAPP_URL}
        target={WHATSAPP_URL.startsWith('http') ? '_blank' : undefined}
        rel={WHATSAPP_URL.startsWith('http') ? 'noreferrer' : undefined}
      >
        <span className="btn-whats-ic">{Icon.whatsapp}</span>
        WhatsApp
      </a>
    </div>
  );
}

/* ---------- HOME completa ---------- */

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Valor />
        <ComoFunciona />
        <ParaQuemE />
        <Resultados />
        <Depoimentos />
        <Sobre />
        <Metodo />
        <Servicos />
        <ProjetoVeraoHome />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ---------- roteador + SEO ---------- */

export default function App() {
  const route = useRoute();
  const isSales = route.page === 'projeto-verao';

  useEffect(() => {
    const seo = isSales ? SEO.verao : SEO.home;
    document.title = seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', seo.description);
  }, [isSales]);

  useEffect(() => {
    if (route.anchor) {
      const el = document.getElementById(route.anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.page, route.anchor]);

  return (
    <>
      {isSales ? (
        <>
          <ProjetoVerao />
          <Footer salesMode />
          <MobileBar salesMode />
        </>
      ) : (
        <Home />
      )}
    </>
  );
}
