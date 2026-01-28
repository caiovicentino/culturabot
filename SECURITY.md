# Politica de Seguranca - CulturaBuilder

Se voce acredita ter encontrado um problema de seguranca no CulturaBuilder, por favor reporte de forma privada.

## Como Reportar

- Email: `contato@culturabuilder.com`
- O que incluir: passos para reproducao, avaliacao de impacto e (se possivel) um PoC minimo.

## Orientacoes Operacionais

Para modelo de ameacas e orientacoes de hardening (incluindo `culturabuilder security audit --deep` e `--fix`), consulte:

- `https://docs.culturabuilder.com/gateway/security`

### Seguranca da Interface Web

A interface web do CulturaBuilder e destinada apenas para uso local. **Nao** exponha na internet publica; ela nao esta preparada para exposicao publica.

## Requisitos de Runtime

### Versao do Node.js

O CulturaBuilder requer **Node.js 22.12.0 ou posterior** (LTS). Esta versao inclui patches de seguranca importantes:

- CVE-2025-59466: Vulnerabilidade DoS em async_hooks
- CVE-2026-21636: Vulnerabilidade de bypass no modelo de permissoes

Verifique sua versao do Node.js:

```bash
node --version  # Deve ser v22.12.0 ou posterior
```

### Seguranca Docker

Ao executar o CulturaBuilder em Docker:

1. A imagem oficial roda como usuario nao-root (`node`) para reduzir a superficie de ataque
2. Use a flag `--read-only` quando possivel para protecao adicional do filesystem
3. Limite as capacidades do container com `--cap-drop=ALL`

Exemplo de execucao Docker segura:

```bash
docker run --read-only --cap-drop=ALL \
  -v culturabuilder-data:/app/data \
  culturabuilder/culturabuilder:latest
```

## Varredura de Seguranca

Este projeto usa `detect-secrets` para deteccao automatizada de segredos no CI/CD.
Consulte `.detect-secrets.cfg` para configuracao e `.secrets.baseline` para o baseline.

Execute localmente:

```bash
pip install detect-secrets==1.5.0
detect-secrets scan --baseline .secrets.baseline
```
