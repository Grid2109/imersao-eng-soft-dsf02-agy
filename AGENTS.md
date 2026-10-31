# 🤖 AGENTS.md — Catálogo de Prompts Profissionais & Diretrizes de Agente (Método GCCD)

> **Projeto:** Calculadora em Python (Terminal CLI & Interface Gráfica iOS)  
> **Contexto:** Imersão de Engenharia de Software com IA — **Alura & Google Startups**  
> **Agente de IA:** Google Antigravity  
> **Aluna Desenvolvedora:** Ingrid Lira  
> **Deploy de Produção:** [Calculadora Python para Iniciantes](https://imersao-eng-soft-dsf02-agy.vercel.app)

---

## 🎯 Propósito deste Arquivo

Diferente do `README.md` (que é a vitrine e o guia de uso para **humanos**), o **`AGENTS.md`** é o documento técnico voltado para **Agentes de IA e Engenheiros de Software**. 

Ele documenta as especificações profissionais completas construídas sob o framework **GCCD**, demonstrando como pedidos simples e coloquiais de um desenvolvedor são traduzidos em **prompts estruturados de nível de engenharia** com alto determinismo e zero ambiguidade.

---

## 🧭 O Framework Operacional GCCD

Cada prompt profissional neste documento segue os 4 pilares rigorosos da engenharia de prompt moderna:

* **G — Goal (Objetivo):** O que deve ser construído ou analisado com metas explícitas e mensuráveis.
* **C — Context (Contexto):** O cenário do sistema, stack tecnológica, nível do usuário e arquitetura do repositório.
* **C — Constraints (Restrições):** O que **não** pode ser alterado, regras de segurança matemática e invariantes do código.
* **D — Data & Deliverables (Dados e Entregáveis):** Formato exato do código, assinaturas de funções, testes e explicações esperadas.

---

## 📋 Catálogo de Prompts Profissionais (Desafio 02)

---

### 🔹 Prompt Profissional 01: Análise e Onboarding Arquitetural

* **Entrada Simples do Desenvolvedor:**
  > *"Tenho um projeto de calculadora em Python que realiza as quatro operações matemáticas básicas. Estou começando a aprender programação e quero entender como os arquivos e as funções estão organizados. Analise o projeto e explique sua estrutura de maneira simples."*

```markdown
### 🎯 ESPECIFICAÇÃO DE ENGENHARIA — PROMPT 01 (MÉTODO GCCD)

[GOAL / OBJETIVO]
Realizar uma auditoria técnica e onboarding estrutural do repositório existente, identificando o papel de cada arquivo e componente, fornecendo uma explicação didática, clara e estruturada para um desenvolvedor iniciante sobre o fluxo de execução das 4 operações matemáticas fundamentais.

[CONTEXT / CONTEXTO]
O repositório é parte do Desafio 01 da Imersão IA (Alura & Google Startups). O ecossistema possui duas abordagens complementares:
1. Scripts em Python puro para execução em terminal (calculadora.py e calculadora_modular.py).
2. Uma aplicação web de apoio pedagógico (React 19, TypeScript, Vite e Tailwind CSS) que simula visualmente uma calculadora no estilo iOS e um console CLI interativo.

[CONSTRAINTS / RESTRIÇÕES]
- NÃO alterar nenhum arquivo de código-fonte nesta etapa de análise.
- Utilizar linguagem didática, sem jargões desnecessários, explicando os conceitos fundamentais (input, float, condicionais if/elif/else, divisão por zero e f-strings).
- Contrastar de forma nítida o paradigma de script linear (sequencial) versus o paradigma modular com funções (def) e loop de repetição (while True).

[DATA & DELIVERABLES / ENTREGÁVEIS]
- Tabela resumo de todos os arquivos e diretórios da raiz do projeto.
- Análise linha a linha das operações em `calculadora.py`.
- Análise das funções `somar`, `subtrair`, `multiplicar`, `dividir` e `exibir_menu` em `calculadora_modular.py`.
- Instruções imediatas de teste no terminal para o usuário.
```

---

### 🔹 Prompt Profissional 02: Implementação da Operação de Porcentagem (%)

* **Entrada Simples do Desenvolvedor:**
  > *"Agora quero adicionar uma funcionalidade para calcular porcentagens. Implemente essa operação mantendo as funcionalidades existentes e explique quais alterações foram realizadas no código."*

```markdown
### 🎯 ESPECIFICAÇÃO DE ENGENHARIA — PROMPT 02 (MÉTODO GCCD)

[GOAL / OBJETIVO]
Projetar e implementar a funcionalidade matemática de cálculo de porcentagem na calculadora, preservando integralmente todas as quatro operações pré-existentes (soma, subtração, multiplicação e divisão) e a proteção contra divisão por zero.

[CONTEXT / CONTEXTO]
Evolução técnica do Desafio 01 para o Desafio 02. O projeto serve como material de estudos de programação. Portanto, o código produzido precisa seguir os mais altos padrões de legibilidade do Python (PEP 8) e manter a sincronia entre os scripts Python e os snippets exibidos na interface web.

[CONSTRAINTS / RESTRIÇÕES]
- Não quebrar o fluxo linear existente em `calculadora.py`.
- Não quebrar a arquitetura baseada em funções puras em `calculadora_modular.py`.
- Não utilizar bibliotecas externas ou imports desnecessários; utilizar apenas Python Standard Library.
- Tratar entradas inválidas mantendo as mensagens de erro amigáveis existentes.
- Garantir a sincronização do arquivo `src/data/pythonSnippets.ts` para que a interface React reflita exatamente o mesmo código Python dos arquivos em disco.

[DATA & DELIVERABLES / ENTREGÁVEIS]
- Fórmula matemática implementada: resultado = (valor * taxa) / 100.
- Alteração em `calculadora.py`:
  * Adição de "% -> Porcentagem" no menu impresso.
  * Atualização do input de escolha de operação para aceitar "%".
  * Bloco `elif operacao == "%":` com f-string: `Resultado: {num2}% de {num1} = {resultado}`.
  * Validação no `else` contemplando o símbolo "%".
- Alteração em `calculadora_modular.py`:
  * Criação da função dedicada: `def calcular_porcentagem(valor, taxa): return (valor * taxa) / 100`.
  * Menu atualizado: opção 5 para Porcentagem e opção 6 para Sair.
  * Controle de loop `while True` e tupla de validação atualizada: `("1", "2", "3", "4", "5")`.
- Relatório de diff detalhando todas as linhas alteradas e criadas.
```

---

### 🔹 Prompt Profissional 03: Garantia de Qualidade & Validação Cruzada (Terminal + GUI)

* **Entrada Simples do Desenvolvedor:**
  > *"Agora teste a aplicação e verifique os resultados tanto no terminal interativo quanto na interface gráfica"*

```markdown
### 🎯 ESPECIFICAÇÃO DE ENGENHARIA — PROMPT 03 (MÉTODO GCCD)

[GOAL / OBJETIVO]
Executar um ciclo completo de Testes de Qualidade (QA), validando o comportamento matemático da nova operação de porcentagem e das operações herdadas, tanto na camada de script/terminal quanto nos componentes interativos da interface gráfica (calculadora iOS e console CLI).

[CONTEXT / CONTEXTO]
Etapa de homologação antes da publicação em produção. O repositório possui uma interface em React 19 + TypeScript (`InteractiveTerminal.tsx`) que simula a execução do Python em tempo real e scripts Python que rodam no shell do sistema operacional.

[CONSTRAINTS / RESTRIÇÕES]
- Cobrir 100% das operações matemáticas em casos de teste formais (números inteiros, decimais e casos de borda como divisão por zero).
- Caso o ambiente local tenha restrições de sandbox ou interpretador, criar scripts de teste automatizado verificáveis e executar a validação estática de tipos (`vite build`).
- Manter compatibilidade de navegação e teclado físico (teclas 0-9, operadores e tecla `%`).

[DATA & DELIVERABLES / ENTREGÁVEIS]
- Execução de script de teste com relatório tabular com status formal PASS / FAIL para:
  * Soma: 15 + 25 = 40
  * Subtração: 50 - 18 = 32
  * Multiplicação: 7.5 * 4 = 30
  * Divisão: 100 / 4 = 25
  * Divisão por Zero: 42 / 0 -> Erro tratado
  * Porcentagem Cenário 1: 15% de 200 = 30.0
  * Porcentagem Cenário 2: 50% de 80 = 40.0
  * Porcentagem Cenário 3: 10% de 55.5 = 5.55
- Atualização do componente `src/components/InteractiveTerminal.tsx`:
  * Inclusão do botão visual `%` na primeira linha da calculadora iOS.
  * Inclusão do botão de preset rápido `200 % 15 (15%)` para teste instantâneo com 1 clique.
  * Atualização da caixa de rastreio de código Python em tempo real.
  * Atualização do Console CLI simulado nos modos básico e modular.
- Geração bem-sucedida do bundle de produção via `npm run build` com 0 erros de compilação.
```

---

## 🛡️ Invariantes Arquiteturais para Agentes Futuros

Qualquer Agente Autônomo de IA (Google Antigravity, Cursor, Claude Code, Copilot) que for trabalhar neste repositório em desafios subsequentes **DEVE** respeitar as seguintes regras inegociáveis:

1. **Paridade Dual Obrigatória:** Nunca alterar scripts Python (`calculadora.py` ou `calculadora_modular.py`) sem refletir o código correspondente em `src/data/pythonSnippets.ts` e `InteractiveTerminal.tsx`.
2. **Segurança Matemática:** Divisão por zero (`ZeroDivisionError`) deve ser tratada preventivamente em todas as camadas (CLI e GUI).
3. **Fórmula Canônica de Porcentagem:** O cálculo de porcentagem neste projeto segue estritamente a relação de taxa percentual:  
   $$\text{resultado} = \frac{\text{valor} \times \text{taxa}}{100}$$
4. **Foco Pedagógico:** Não introduzir complexidades que prejudiquem o entendimento de alunos iniciantes.
