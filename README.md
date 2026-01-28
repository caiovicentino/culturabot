<div align="center">
  <br />
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="assets/logo-culturabuilder.svg" />
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-culturabuilder.svg" />
    <img src="assets/logo-culturabuilder.svg" alt="Cultura Builder" width="420" />
  </picture>
  <br />
  <br />
</div>

<h3 align="center">A maior comunidade de builders do Brasil</h3>

<p align="center">
  <a href="https://github.com/caiovicentino/culturabot/stargazers"><img src="https://img.shields.io/github/stars/caiovicentino/culturabot?style=for-the-badge&color=F59E0B" alt="GitHub Stars"></a>
  <a href="https://culturabuilder.com"><img src="https://img.shields.io/badge/Comunidade-2.000%2B%20builders-8B5CF6?style=for-the-badge" alt="Membros da Comunidade"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/Licen%C3%A7a-MIT-22C55E?style=for-the-badge" alt="Licenca MIT"></a>
</p>

<p align="center">
  <a href="https://culturabuilder.com">Website</a> &middot;
  <a href="https://docs.culturabuilder.com">Docs</a> &middot;
  <a href="https://docs.culturabuilder.com/start/getting-started">Primeiros Passos</a> &middot;
  <a href="https://github.com/caiovicentino/culturabot">GitHub</a>
</p>

---

## Sobre o CulturaBuilder

**CulturaBuilder** e a maior comunidade de builders do Brasil -- uma plataforma educacional que ensina **Vibe Coding** e inteligencia artificial para profissionais de todas as areas. Aqui, voce nao precisa saber programar para criar tecnologia. Voce aprende a ser o **arquiteto** que guia a inteligencia artificial para construir aplicacoes reais.

Com mais de **2.000 builders ativos**, a comunidade reune pessoas de backgrounds diversos -- direito, marketing, design, administracao e muito mais -- todas construindo produtos reais com IA.

O **CulturaBot** e o assistente de IA da comunidade. Ele funciona nos canais que voce ja usa (WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, Microsoft Teams, WebChat) e esta pronto para ajudar voce na sua jornada como builder.

---

## O que voce vai aprender

| Modulo | Descricao |
|---|---|
| **Vibe Coding** | Metodologia onde voce constroi aplicacoes atraves de conversas estrategicas com IA -- sem escrever codigo linha por linha. |
| **Inteligencia Artificial Aplicada** | Domine as ferramentas de IA generativa (Claude, ChatGPT, Gemini) para criar produtos, automatizar processos e resolver problemas reais. |
| **Construcao sem Codigo** | Aprenda a criar aplicacoes completas usando IA como seu co-piloto de desenvolvimento -- do zero ao deploy. |
| **Arquitetura de Produtos** | Pense como um arquiteto de software: defina escopo, planeje funcionalidades e orquestre a IA para executar. |
| **Deploy e Producao** | Coloque seus projetos no ar com infraestrutura cloud real usando os creditos AWS e NVIDIA da comunidade. |

---

## Para quem e

O CulturaBuilder foi criado para **profissionais nao-tecnicos** que querem se tornar criadores de tecnologia. **70% dos nossos alunos** vem de areas como:

- **Direito** -- Advogados criando automacoes juridicas e legal tech
- **Marketing** -- Profissionais construindo ferramentas de analise e automacao de campanhas
- **Design** -- Designers expandindo para product design com IA generativa
- **Administracao** -- Gestores criando dashboards, bots e sistemas internos
- **Empreendedorismo** -- Fundadores validando MVPs e produtos digitais com velocidade

**Nenhuma experiencia em programacao e necessaria.** Se voce sabe conversar, voce sabe fazer Vibe Coding.

---

## Recursos da Comunidade

### Mentorias Semanais ao Vivo

Sessoes ao vivo com mentores de **Fortune 500** -- executivos e especialistas que passaram por empresas como **Samsung**, **Microsoft**, **Nestle** e **L'Oreal**, alem de fundadores com exits e premiacoes.

### Creditos de Infraestrutura

Mais de **R$20.000+ em creditos cloud** distribuidos para a comunidade:
- **AWS** -- Compute, storage, databases e servicos gerenciados
- **NVIDIA** -- GPU cloud para projetos de IA e machine learning

### Certificados em Blockchain

Seus certificados de conclusao sao **registrados em blockchain** -- imutaveis, verificaveis globalmente e a prova de fraude.

### Repositorio de Conhecimento

Centenas de horas de conteudo gravado: workshops, frameworks, templates e materiais de referencia disponiveis 24/7.

### Reconhecimento de Projetos

Sistema de votacao comunitaria onde os melhores projetos recebem destaque e oportunidades de investimento.

---

## Instalacao

Runtime: **Node >= 22**.

```bash
npm install -g culturabuilder@latest
# ou: pnpm add -g culturabuilder@latest

culturabuilder onboard --install-daemon
```

O assistente de configuracao (wizard) guia voce pelo setup do gateway, workspace, canais e skills.

### Quick Start

```bash
# Iniciar o onboarding completo
culturabuilder onboard --install-daemon

# Iniciar o gateway
culturabuilder gateway --port 18789 --verbose

# Enviar uma mensagem
culturabuilder message send --to +5511999999999 --message "Ola do CulturaBuilder!"

# Conversar com o assistente
culturabuilder agent --message "Me ajude a criar meu primeiro projeto" --thinking high
```

### Build a partir do codigo-fonte

```bash
git clone https://github.com/caiovicentino/culturabot.git
cd culturabot

pnpm install
pnpm ui:build
pnpm build

pnpm culturabuilder onboard --install-daemon

# Dev loop (auto-reload)
pnpm gateway:watch
```

### Atualizacao

```bash
culturabuilder update --channel stable
# ou: culturabuilder update --channel beta
```

Verifique a saude do sistema com `culturabuilder doctor`.

---

## Canais de Comunicacao

Conecte-se com a comunidade CulturaBuilder nos canais oficiais:

| Canal | Link |
|---|---|
| **Website** | [culturabuilder.com](https://culturabuilder.com) |
| **WhatsApp** | Comunidade exclusiva para membros |
| **Telegram** | Grupo de discussao e networking |
| **Slack** | Workspace colaborativo por projetos |
| **Discord** | Canais tematicos e voice chats |
| **Twitter/X** | [@culturabuilder](https://twitter.com/culturabuilder) |
| **LinkedIn** | [culturabuilder](https://linkedin.com/company/culturabuilder) |
| **Instagram** | [@culturabuilder](https://instagram.com/culturabuilder) |
| **Email** | [hello@culturabuilder.com](mailto:hello@culturabuilder.com) |

O CulturaBot esta disponivel em **WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, Microsoft Teams e WebChat** -- escolha o canal que preferir.

---

## Como Contribuir

Contribuicoes sao bem-vindas! A comunidade CulturaBuilder acredita no poder do open source.

### Passos para contribuir

1. **Fork** este repositorio
2. Crie uma **branch** para sua feature:
   ```bash
   git checkout -b feature/minha-contribuicao
   ```
3. Faca suas alteracoes e **commit**:
   ```bash
   git commit -m "feat: descricao da contribuicao"
   ```
4. **Push** para sua branch:
   ```bash
   git push origin feature/minha-contribuicao
   ```
5. Abra um **Pull Request** descrevendo suas alteracoes

### Diretrizes

- Siga os padroes de codigo existentes (TypeScript strict, ESLint, Prettier)
- Escreva testes para novas funcionalidades
- Documente alteracoes relevantes
- Seja respeitoso nas interacoes com outros contribuidores
- Commits em ingles seguindo [Conventional Commits](https://www.conventionalcommits.org/)

---

## Licenca

Este projeto esta licenciado sob a **MIT License** -- veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  <br />
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="assets/logo-culturabuilder.svg" />
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-culturabuilder.svg" />
    <img src="assets/logo-culturabuilder.svg" alt="Cultura Builder" width="200" />
  </picture>
  <br />
  <br />
  <p>
    Feito com dedicacao pela comunidade <a href="https://culturabuilder.com"><strong>CulturaBuilder</strong></a>
  </p>
  <p>
    <a href="https://culturabuilder.com">culturabuilder.com</a> &middot;
    <a href="https://twitter.com/culturabuilder">Twitter</a> &middot;
    <a href="https://instagram.com/culturabuilder">Instagram</a> &middot;
    <a href="https://linkedin.com/company/culturabuilder">LinkedIn</a>
  </p>
  <p>
    <sub>Transformando profissionais em criadores de tecnologia atraves do Vibe Coding e IA.</sub>
  </p>
</div>
