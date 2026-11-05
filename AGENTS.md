# ESPECIFICAÇÃO DE ENGENHARIA DE SOFTWARE — MÉTODO GCCD

## [GOAL / OBJETIVO]
Atuar como um Engenheiro de Software e Agente de IA para evoluir a aplicação de Calculadora em Python (Desafio 01 -> Desafio 02) da Imersão Alura & Google Startups, executando em três etapas sequenciais:
1. **Auditoria e Onboarding:** Analisar a arquitetura e explicar a organização de arquivos e funções de forma didática e acessível para iniciantes.
2. **Implementação de Feature:** Adicionar a funcionalidade matemática de cálculo de porcentagem (%) preservando 100% das 4 operações existentes (soma, subtração, multiplicação e divisão tratada).
3. **Garantia de Qualidade (QA):** Testar formalmente a aplicação e validar os resultados tanto no terminal interativo quanto nos componentes visuais da interface gráfica (estilo iOS) e do console CLI.

---

## [CONTEXT / CONTEXTO]
- **Ecossistema:** Projeto de estudos de programação em Python que conta com uma interface web de apoio pedagógico (React 19, TypeScript, Tailwind CSS e Vite).
- **Arquivos-Chave em Python:**
  - `calculadora.py`: Script sequencial linear com entrada de dados via `input()`, conversão com `float()`, tomada de decisão com `if/elif/else` e saída com f-strings.
  - `calculadora_modular.py`: Script modular com funções puras (`def`), menu interativo em loop contínuo (`while True`) e tratamento de exceções com `try/except ValueError`.
- **Arquivos-Chave na Interface Web:**
  - `src/components/InteractiveTerminal.tsx`: Componente que simula a calculadora visual estilo iPhone e o console CLI em tempo real.
  - `src/data/pythonSnippets.ts`: Trechos de código Python sincronizados para estudo.
- **Usuário:** Aluna desenvolvedora Ingrid Lira participando da Imersão IA (Alura & Google Startups).
- **Agente Executor:** Google Antigravity.
- **Deploy de Produção:** [Calculadora Python para Iniciantes](https://imersao-eng-soft-dsf02-agy.vercel.app).

---

## [CONSTRAINTS / RESTRIÇÕES]
- **Preservação de Funcionalidades:** Não quebrar nenhuma das 4 operações matemáticas básicas preexistentes (+, -, *, /).
- **Segurança Matemática:** Divisão por zero (`ZeroDivisionError`) deve obrigatoriamente ser tratada com mensagem preventiva amigável antes de qualquer cálculo, tanto no terminal quanto na interface gráfica.
- **Padrão PEP 8 & Simplicidade:** Não utilizar bibliotecas externas desnecessárias no Python; utilizar apenas a biblioteca padrão. Código limpo, legível e didático para iniciantes.
- **Fórmula Canônica de Porcentagem:** O cálculo percentual deve seguir estritamente:
  $$\text{resultado} = \frac{\text{valor} \times \text{taxa}}{100}$$
- **Paridade Dual Obrigatória:** Qualquer alteração nos scripts Python (`calculadora.py` e `calculadora_modular.py`) deve ser rigorosamente refletida em `src/data/pythonSnippets.ts` e `InteractiveTerminal.tsx`.
- **Compilação Estática:** O build de produção da aplicação web via `npm run build` deve compilar com 0 erros de TypeScript e Vite.

---

## [Done When/ Critério de Conclusão]

### Etapa 1 — Análise e Onboarding Estrutural
- Mapeamento detalhado dos arquivos da raiz do projeto e seus propósitos.
- Explicação didática do fluxo de execução em `calculadora.py` (input, float, if/elif/else, divisão por zero e f-strings).
- Explicação das funções `somar`, `subtrair`, `multiplicar`, `dividir`, `exibir_menu` e do loop `while True` em `calculadora_modular.py`.
- Instruções práticas de teste no terminal para o usuário.

### Etapa 2 — Implementação da Operação de Porcentagem (%)
- **Em `calculadora.py`:**
  - Adicionar `% -> Porcentagem` ao menu exibido no terminal.
  - Atualizar o input de operação para aceitar `%`.
  - Inserir o bloco condicional `elif operacao == "%":` calculando `(num1 * num2) / 100` e imprimindo `Resultado: {num2}% de {num1} = {resultado}`.
  - Atualizar a validação no `else` contemplando `%`.
- **Em `calculadora_modular.py`:**
  - Criar a função pura:
    ```python
    def calcular_porcentagem(valor, taxa):
        """Calcula a taxa percentual de um valor (ex: taxa% de valor)."""
        return (valor * taxa) / 100
    ```
  - Atualizar o menu em `exibir_menu()`: opção 5 para Porcentagem e opção 6 para Sair.
  - Atualizar a validação do loop para aceitar `"5"` e encerrar em `"6"`.
  - Integrar a chamada da função na opção 5.
- **Em `src/data/pythonSnippets.ts`:**
  - Sincronizar as constantes `BASIC_CALCULATOR_CODE` e `MODULAR_CALCULATOR_CODE` com o novo código dos arquivos em disco.

### Etapa 3 — Garantia de Qualidade (QA) & Validação Cruzada
- Executar suite de testes e gerar relatório tabular formal PASS / FAIL para:
  - Soma: 15 + 25 = 40
  - Subtração: 50 - 18 = 32
  - Multiplicação: 7.5 * 4 = 30
  - Divisão: 100 / 4 = 25
  - Divisão por Zero: 42 / 0 -> Erro tratado
  - Porcentagem Cenário 1: 15% de 200 = 30.0
  - Porcentagem Cenário 2: 50% de 80 = 40.0
  - Porcentagem Cenário 3: 10% de 55.5 = 5.55
- **Na Interface Gráfica (`InteractiveTerminal.tsx`):**
  - Adicionar o botão visual `%` na primeira linha da calculadora iOS.
  - Adicionar botão de atalho rápido (preset) `200 % 15 (15%)`.
  - Atualizar o rastreador de execução de código Python em tempo real para exibir o bloco de porcentagem.
  - Atualizar o Console CLI simulado nos modos básico e modular.
- Validar geração bem-sucedida do bundle de produção com `vite build` sem erros.
