# 🤖 AGENTS.md — Engenharia de Prompt com Google Antigravity & Método GCCD

> **Projeto:** Calculadora em Python (Terminal CLI & Interface Gráfica iOS)  
> **Contexto:** Imersão de Engenharia de Software com IA — **Alura & Google Startups**  
> **Evolução:** Do Desafio 01 (Calculadora 4 Operações Básicas) ao **Desafio 02 (Porcentagem, Testes e Engenharia Agente)**  
> **Agente de IA Utilizado:** Google Antigravity

---

## 🧭 Introdução ao Método GCCD

O método **GCCD** é uma estrutura de excelência para Engenharia de Prompt projetada para orientar agentes de Inteligência Artificial de forma precisa, previsível e profissional no ciclo de desenvolvimento de software:

* **G — Goal (Objetivo):** O que deve ser alcançado com clareza cristalina (qual a entrega principal).
* **C — Context (Contexto):** O cenário do projeto, o papel do agente, quem é o usuário e quais tecnologias compõem o ecossistema.
* **C — Constraints (Restrições):** Regras de negócio, o que **não** pode ser alterado, requisitos de segurança, padrões de arquitetura e limites de execução.
* **D — Data & Deliverables (Dados e Entregáveis):** Os insumos fornecidos, exemplos de entrada/saída, formato da resposta esperada e artefatos de código a gerar.

Abaixo registramos a jornada iterativa do **Desafio 02**, onde um desenvolvedor iniciante guiou o agente **Google Antigravity** passo a passo, transformando 3 prompts inicialmente simples em especificações de nível de engenharia profissional.

---

## 📌 Prompt 1: Análise e Onboarding Estrutural do Projeto

### 💬 Prompt Simples Original (Enviado pelo Usuário):
```text
Tenho um projeto de calculadora em Python que realiza as quatro operações matemáticas básicas. Estou começando a aprender programação e quero entender como os arquivos e as funções estão organizados. Analise o projeto e explique sua estrutura de maneira simples.
```

### 🎯 Aplicação no Método GCCD:

| Dimensão GCCD | Especificação para o Agente |
| :--- | :--- |
| **G (Goal / Objetivo)** | Analisar o repositório existente, identificar todos os scripts e componentes, e fornecer uma explicação pedagógica sobre a organização e funcionamento de cada arquivo e função. |
| **C (Context / Contexto)** | O usuário é um desenvolvedor iniciante participando da Imersão IA (Alura & Google Startups). O projeto é o Desafio 1 contendo scripts Python simples e uma aplicação web de apoio visual (React 19 + TypeScript + Vite). |
| **C (Constraints / Restrições)** | Não modificar nenhum código nesta etapa. Usar linguagem simples, acessível e sem jargões desnecessários. Diferenciar claramente o código linear do modular. |
| **D (Data & Deliverables / Entregáveis)** | Leitura de `calculadora.py`, `calculadora_modular.py` e `src/`; tabela resumo de diretórios; explicação detalhada do papel de `input()`, `float()`, `if/elif/else`, divisão por zero e das funções `somar`, `subtrair`, `multiplicar`, `dividir` e `exibir_menu`. |

### ⚡ Resposta & Ação do Agente Antigravity:
1. Varreu o repositório e mapeou a dualidade do projeto: lógica de terminal em Python e simulador gráfico no estilo iPhone em React.
2. Explicou linha por linha o script básico sequencial ([calculadora.py](calculadora.py)).
3. Explicou a evolução arquitetural para o script modular ([calculadora_modular.py](calculadora_modular.py)) com funções `def` e loop `while True`.
4. Forneceu a tabela completa dos arquivos do ecossistema e instruções imediatas de execução no terminal.

---

## 📌 Prompt 2: Implementação da Nova Operação de Porcentagem (%)

### 💬 Prompt Simples Original (Enviado pelo Usuário):
```text
Agora quero adicionar uma funcionalidade para calcular porcentagens. Implemente essa operação mantendo as funcionalidades existentes e explique quais alterações foram realizadas no código.
```

### 🎯 Aplicação no Método GCCD:

| Dimensão GCCD | Especificação para o Agente |
| :--- | :--- |
| **G (Goal / Objetivo)** | Implementar o cálculo de porcentagem na calculadora, preservando integralmente as quatro operações prévias (soma, subtração, multiplicação e divisão) e a proteção contra divisão por zero. |
| **C (Context / Contexto)** | Evolução do projeto do Desafio 01 para o Desafio 02 da Imersão Alura & Google Startups. O código deve continuar servindo como material pedagógico de alta legibilidade. |
| **C (Constraints / Restrições)** | Não quebrar o fluxo linear de `calculadora.py` nem a estrutura funcional de `calculadora_modular.py`. Não utilizar bibliotecas externas complexas. Tratar entradas inválidas e manter a sintaxe de *f-strings*. Manter os arquivos do ecossistema sincronizados. |
| **D (Data & Deliverables / Entregáveis)** | Edição contígua de `calculadora.py` adicionando `%` no menu e condicional; edição de `calculadora_modular.py` adicionando a função `calcular_porcentagem(valor, taxa)`, opção 5 no menu e opção 6 para sair; atualização dos trechos em `src/data/pythonSnippets.ts`; explicação didática das alterações e da fórmula matemática aplicada: $\frac{\text{valor} \times \text{taxa}}{100}$. |

### ⚡ Resposta & Ação do Agente Antigravity:
1. Formulou a regra matemática: `(num1 * num2) / 100` (ex: 15% de 200 = 30.0).
2. Atualizou [calculadora.py](calculadora.py) com a nova opção `%` e bloco condicional.
3. Atualizou [calculadora_modular.py](calculadora_modular.py) com a função dedicada `def calcular_porcentagem(valor, taxa)`, menu de 6 opções e validação de loop.
4. Sincronizou `pythonSnippets.ts` para que a interface web refletisse o mesmo código dos scripts.
5. Apresentou um relatório didático detalhando cada linha alterada.

---

## 📌 Prompt 3: Testes de Qualidade e Validação Cruzada (Terminal + Interface Gráfica)

### 💬 Prompt Simples Original (Enviado pelo Usuário):
```text
Agora teste a aplicação e verifique os resultados tanto no terminal interativo quanto na interface gráfica
```

### 🎯 Aplicação no Método GCCD:

| Dimensão GCCD | Especificação para o Agente |
| :--- | :--- |
| **G (Goal / Objetivo)** | Executar testes completos de validação de ponta a ponta na lógica matemática e garantir a integração funcional da porcentagem tanto no terminal interativo quanto na interface gráfica. |
| **C (Context / Contexto)** | Etapa de homologação e garantia de qualidade (QA) do Desafio 02 antes da publicação no GitHub. O ambiente Windows possui atalhos de execução e ambiente Node.js. |
| **C (Constraints / Restrições)** | Validar todos os cenários matemáticos (operações regulares, casos de borda com divisão por zero e números decimais). Caso o ambiente local tenha restrições de sandbox ou interpretador, criar scripts de teste automatizado e validar compilação estática (`vite build`). |
| **D (Data & Deliverables / Entregáveis)** | Script de testes automatizados com relatório tabular PASS/FAIL; atualização de `InteractiveTerminal.tsx` para incluir o botão `%` na calculadora iOS, atalho de teste rápido (preset) `200 % 15 (15%)` e compatibilidade total com o Console CLI; geração do bundle de produção do Vite com 0 erros. |

### ⚡ Resposta & Ação do Agente Antigravity:
1. Escreveu e executou bateria de testes automatizados em script Node.js cobrindo:
   * Soma (15 + 25 = 40)
   * Subtração (50 - 18 = 32)
   * Multiplicação (7.5 * 4 = 30)
   * Divisão (100 / 4 = 25)
   * Divisão por Zero tratada (42 / 0 = Erro tratado)
   * Porcentagem (15% de 200 = 30, 50% de 80 = 40, 10% de 55.5 = 5.55)
   * **Resultado: 100% PASS (SUCESSO TOTAL)**.
2. Adaptou a interface gráfica iOS em [InteractiveTerminal.tsx](src/components/InteractiveTerminal.tsx):
   * Adicionou o botão `%` na linha superior (estilo clássico iOS).
   * Adicionou o botão de preset rápido `200 % 15 (15%)`.
   * Atualizou o inspetor de execução de código Python em tempo real.
   * Habilitou atalho pelo teclado físico.
3. Atualizou o Console CLI simulado nos modos Básico e Modular.
4. Compilou a aplicação web com `npm run build` gerando os artefatos em `dist/` com 0 erros.

---

## 🏆 Lições Aprendidas na Imersão

1. **Iteração Curta e Guiada:** Conduzir o agente de IA passo a passo (um objetivo por prompt) produz resultados substancialmente mais confiáveis do que um prompt monolítico gigantesco.
2. **Engenharia Reversa com GCCD:** Mesmo quando o usuário formula um prompt curto e informal no dia a dia, estruturá-lo mentalmente (ou formalmente) nos 4 eixos do GCCD garante que o agente nunca ignore restrições críticas nem altere trechos indevidos.
3. **Validação Híbrida (Terminal + GUI):** Ao evoluir um software, a verificação deve abranger tanto a camada de lógica pura (Python/CLI) quanto a camada de experiência do usuário (UI/UX).
