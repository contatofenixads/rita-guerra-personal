import { VERAO, WHATSAPP_URL_VERAO, INSTAGRAM_URL } from './config';
import { Icon, Eyebrow, CtaPrimary, CtaWhats, MiniDepo, Marquee, hrefTo } from './ui';

/* ============================================================
   PROJETO VERÃO — página de vendas (porta de entrada)
   Regra: NADA é inventado. Campos vazios em VERAO (config.ts)
   renderizam marcadores claros de "a confirmar" em vez de
   prometer condições comerciais inexistentes.
   ============================================================ */

function AConfirmar({ children }: { children: React.ReactNode }) {
  return <span className="a-confirmar">{children}</span>;
}

function TopBar() {
  return (
    <div className="verao-topbar">
      <div className="container verao-topbar-inner">
        <span>
          <strong>PROJETO VERÃO</strong> · programa de entrada da Rita Guerra
        </span>
        <a href={hrefTo('')}>Voltar ao site</a>
      </div>
    </div>
  );
}

function VeraoHero() {
  return (
    <section className="verao-hero" id="topo">
      <div className="container verao-hero-inner">
        <Eyebrow>Programa de entrada</Eyebrow>
        <h1>
          PROJETO <em>VERÃO</em>
        </h1>
        <p className="verao-hero-sub">
          O ponto de partida para uma rotina de treino que dura além do verão: treino estruturado
          pela Rita, com acompanhamento de verdade desde a primeira semana.
        </p>
        <div className="verao-hero-fatos">
          <span>
            <strong>Formato:</strong> <AConfirmar>{VERAO.formato || 'a confirmar'}</AConfirmar>
          </span>
          <span>
            <strong>Duração:</strong> <AConfirmar>{VERAO.duracao || 'a confirmar'}</AConfirmar>
          </span>
          <span>
            <strong>Nível:</strong> iniciante e retornantes
          </span>
        </div>
        <div className="hero-ctas">
          <CtaWhats label="Quero participar do Projeto Verão" className="btn-verao" />
          <a className="btn btn-ghost-claro" href={hrefTo('', 'como-funciona')}>
            Como a Rita trabalha
          </a>
        </div>
        <p className="hero-proof">Condições informadas na conversa inicial, sem compromisso.</p>
      </div>
    </section>
  );
}

function Problema() {
  const dores = [
    'Você já baixou treino pronto na internet e abandonou na segunda semana.',
    'Você entra na academia e não sabe por onde começar — e a insegurança fala mais alto.',
    'Você recomeça do zero toda vez que a rotina aperta.',
    'Você quer resultado, mas sem treino genérico e sem achismo.',
  ];
  return (
    <section className="section">
      <div className="container split">
        <div>
          <Eyebrow>Se isso soa familiar</Eyebrow>
          <h2>
            O problema nunca foi falta de vontade. <em>Foi começar sem método.</em>
          </h2>
          <p className="lead">
            A maioria das mulheres que chega até a Rita já tentou — e parou. Não por falta de
            esforço, mas por falta de um plano que respeitasse a vida delas.
          </p>
        </div>
        <ul className="check-list">
          {dores.map((d) => (
            <li key={d}>
              <span className="check-ic check-ic-x" aria-hidden="true">
                ×
              </span>
              <div>{d}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function OQueE() {
  return (
    <section className="section section-sand" id="o-que-e">
      <div className="container">
        <div className="section-head">
          <Eyebrow>O que é</Eyebrow>
          <h2>Um programa de entrada, criado e acompanhado pela Rita.</h2>
          <p className="lead">
            O PROJETO VERÃO foi desenhado para quem quer começar — ou recomeçar — com estrutura: um
            plano de treino organizado, com a mesma metodologia dos acompanhamentos da Rita, em um
            formato pensado para as primeiras semanas de constância.
          </p>
        </div>
        <div className="cards-3">
          <article className="card">
            <span className="card-ic">{Icon.chat}</span>
            <h3>Baseado no seu momento</h3>
            <p>Treino pensado para quem está começando ou voltando, no seu nível atual.</p>
          </article>
          <article className="card">
            <span className="card-ic">{Icon.video}</span>
            <h3>Com execução acompanhada</h3>
            <p>Vídeos de cada exercício e orientação da Rita — você não treina no escuro.</p>
          </article>
          <article className="card">
            <span className="card-ic">{Icon.adjust}</span>
            <h3>Que cabe na sua rotina</h3>
            <p>
              Organizado por sessão, não por data: se a semana apertar, você continua de onde parou.
            </p>
          </article>
        </div>
        <p className="verao-nota">
          <strong>Detalhes do programa (formato, duração e entregas):</strong>{' '}
          <AConfirmar>
            {VERAO.formato && VERAO.duracao
              ? `${VERAO.formato} · ${VERAO.duracao}`
              : 'aguardando confirmação da Rita — pergunte pelo WhatsApp sem compromisso'}
          </AConfirmar>
        </p>
      </div>
    </section>
  );
}

function ParaQuemEVerao() {
  const sim = [
    'Você está começando do zero ou voltando depois de uma pausa.',
    'Você quer um treino estruturado, sem ficar perdida na academia.',
    'Você quer constância — não promessa milagrosa.',
  ];
  const nao = [
    'Você busca atalho, "queima de 7 dias" ou promessa de resultado garantido.',
    'Você procura treino genérico para seguir sozinha, sem acompanhamento.',
  ];
  return (
    <section className="section" id="para-quem">
      <div className="container">
        <div className="section-head">
          <Eyebrow>Para quem é</Eyebrow>
          <h2>Feito para você que quer começar do jeito certo.</h2>
        </div>
        <div className="cards-2x2">
          <article className="card card-sim">
            <h3>É para você que…</h3>
            <ul className="verao-lista">
              {sim.map((s) => (
                <li key={s}>
                  <span className="check-ic">{Icon.check}</span>
                  {s}
                </li>
              ))}
            </ul>
          </article>
          <article className="card card-nao">
            <h3>Não é para você que…</h3>
            <ul className="verao-lista">
              {nao.map((s) => (
                <li key={s}>
                  <span className="check-ic check-ic-x" aria-hidden="true">
                    ×
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function OQueInclui() {
  return (
    <section className="section section-dark" id="inclui">
      <div className="container">
        <div className="section-head">
          <Eyebrow>O que está incluso</Eyebrow>
          <h2>Entregas do programa.</h2>
          {VERAO.incluso.length === 0 && (
            <p className="lead">
              A lista completa de entregas do PROJETO VERÃO está sendo finalizada pela Rita. Enquanto
              isso, chame no WhatsApp para saber exatamente o que está incluído — sem compromisso.
            </p>
          )}
        </div>
        {VERAO.incluso.length > 0 ? (
          <ul className="check-list check-list-largo">
            {VERAO.incluso.map((item) => (
              <li key={item}>
                <span className="check-ic">{Icon.check}</span>
                <div>{item}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="chips">
            <AConfirmar>Formato do treino</AConfirmar>
            <AConfirmar>Duração do programa</AConfirmar>
            <AConfirmar>Materiais e acessos</AConfirmar>
            <AConfirmar>Suporte e acompanhamento</AConfirmar>
          </div>
        )}
        {VERAO.bonus.length > 0 && (
          <div className="bonus-bloco">
            <h3>Bônus</h3>
            <ul>
              {VERAO.bonus.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="section-cta">
          <CtaWhats label="Perguntar o que está incluído" className="btn-verao" />
        </div>
      </div>
    </section>
  );
}

function ComoFuncionaVerao() {
  const passos = [
    {
      n: '01',
      t: 'Chama no WhatsApp',
      d: 'Você manda uma mensagem, a Rita responde pessoalmente e alinha seu momento, objetivo e dúvidas sobre o programa.',
    },
    {
      n: '02',
      t: 'Garante sua vaga',
      d: 'Com as condições alinhadas, você garante sua participação e recebe tudo o que está incluso.',
    },
    {
      n: '03',
      t: 'Começa a treinar',
      d: 'Você recebe o treino estruturado no mesmo padrão dos acompanhamentos da Rita: vídeos, organização por sessão e acompanhamento.',
    },
  ];
  return (
    <section className="section" id="como-comeca">
      <div className="container">
        <div className="section-head">
          <Eyebrow>Como funciona</Eyebrow>
          <h2>Do primeiro contato à primeira semana de treino.</h2>
        </div>
        <ol className="passos passos-3">
          {passos.map((p) => (
            <li className="passo" key={p.n}>
              <span className="passo-n">{p.n}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ol>
        <MiniDepo quote="Tô amando os treinos! Saio morta, hahahaha." />
      </div>
    </section>
  );
}

function ProvasVerao() {
  return (
    <section className="section section-sand" id="provas">
      <div className="container">
        <div className="section-head">
          <Eyebrow>Provas reais</Eyebrow>
          <h2>O método da Rita, na fala das alunas.</h2>
          <p className="lead">
            Mensagens reais recebidas no acompanhamento — o mesmo método por trás do PROJETO VERÃO.
          </p>
        </div>
        <Marquee duration="75s" label="Depoimentos de alunas">
          <figure className="dep-card" role="listitem">
            <span className="dep-stars" aria-hidden="true">
              {Icon.star}
              {Icon.star}
              {Icon.star}
              {Icon.star}
              {Icon.star}
            </span>
            <blockquote>
              “Ainda não acredito que consegui evoluir tanto… Ter o seu auxílio deixa tudo mais
              leve. Seu trabalho é incrível.”
            </blockquote>
            <figcaption>Aluna do acompanhamento</figcaption>
          </figure>
          <figure className="dep-card" role="listitem">
            <span className="dep-stars" aria-hidden="true">
              {Icon.star}
              {Icon.star}
              {Icon.star}
              {Icon.star}
              {Icon.star}
            </span>
            <blockquote>
              “Desde que comecei, seu trabalho tem sido impecável. Ouve e acolhe as nossas
              necessidades e respeita as limitações.”
            </blockquote>
            <figcaption>Aluna do acompanhamento</figcaption>
          </figure>
          <figure className="dep-card" role="listitem">
            <span className="dep-stars" aria-hidden="true">
              {Icon.star}
              {Icon.star}
              {Icon.star}
              {Icon.star}
              {Icon.star}
            </span>
            <blockquote>
              “Passando pra falar que eu AMEI o treino, já fiz uma semana completa com ele. Que
              treino gostoso.”
            </blockquote>
            <figcaption>Aluna do acompanhamento</figcaption>
          </figure>
        </Marquee>
        <p className="dep-note">
          Citações transcritas de mensagens reais. Nomes e fotos são publicados apenas com
          autorização de cada aluna.
        </p>
      </div>
    </section>
  );
}

function Investimento() {
  const temPreco = Boolean(VERAO.preco);
  return (
    <section className="section cta-section" id="verao-investimento">
      <div className="container container-narrow cta-final">
        <Eyebrow>Investimento</Eyebrow>
        {temPreco ? (
          <>
            <h2>{VERAO.preco}</h2>
            {VERAO.pagamento && <p>{VERAO.pagamento}</p>}
          </>
        ) : (
          <>
            <h2>O valor do PROJETO VERÃO</h2>
            <p>
              As condições de investimento (valor, formas de pagamento e o que está incluído) serão
              confirmadas pela Rita. Para receber os valores atuais sem compromisso, chame no
              WhatsApp — a resposta é pessoal.
            </p>
          </>
        )}
        <div className="hero-ctas cta-center">
          <CtaWhats label="Quero os valores do Projeto Verão" className="btn-verao" />
          {VERAO.linkCompra && (
            <CtaPrimary href={VERAO.linkCompra}>Garantir minha vaga agora</CtaPrimary>
          )}
        </div>
        <p className="cta-micro">Resposta pessoal, sem robô · Sem compromisso na primeira conversa</p>
      </div>
    </section>
  );
}

function FaqVerao() {
  const faqs = [
    {
      q: 'Nunca treinei. O Projeto Verão é para mim?',
      a: 'Sim — o programa é uma porta de entrada: ele parte do seu nível atual, com execução acompanhada e treino que se adapta à sua rotina.',
    },
    {
      q: 'O que exatamente está incluído?',
      a: 'A lista completa de entregas está sendo finalizada pela Rita. Chame no WhatsApp para receber o que está incluído na turma atual, sem compromisso.',
    },
    {
      q: 'Quanto custa e como pago?',
      a: 'Os valores e as formas de pagamento são informados pela Rita na conversa inicial, junto com tudo o que está incluído.',
    },
    {
      q: 'E se eu faltar ou perder dias?',
      a: 'O treino é organizado por sessão, não por data. Faltou? Continua de onde parou — sem recomeçar do zero.',
    },
  ];
  return (
    <section className="section" id="verao-faq">
      <div className="container container-narrow">
        <div className="section-head">
          <Eyebrow>FAQ</Eyebrow>
          <h2>Dúvidas sobre o Projeto Verão.</h2>
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

function VeraoCtaFinal() {
  return (
    <section className="section section-dark verao-cta-final">
      <div className="container container-narrow cta-final">
        <h2>O verão passa. A constância que você construir fica.</h2>
        <p>
          Comece com estrutura, acompanhamento e um treino que respeita a sua vida — com quem já
          acompanha mulheres reais todos os dias.
        </p>
        <div className="hero-ctas cta-center">
          <CtaWhats label="Quero participar do Projeto Verão" className="btn-verao" />
          <a className="btn btn-ghost-claro" href={hrefTo('')}>
            Conhecer o acompanhamento completo
          </a>
        </div>
        <p className="cta-micro">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram · @ritaquerrapersonal
          </a>
        </p>
      </div>
    </section>
  );
}

export default function ProjetoVerao() {
  return (
    <>
      <TopBar />
      <main id="verao">
        <VeraoHero />
        <Problema />
        <OQueE />
        <ParaQuemEVerao />
        <OQueInclui />
        <ComoFuncionaVerao />
        <ProvasVerao />
        <Investimento />
        <FaqVerao />
        <VeraoCtaFinal />
      </main>
    </>
  );
}
