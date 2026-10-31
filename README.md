# 🐍 Calculadora Python — Evolução Desafio 02 (Alura & Google Startups)

Uma aplicação educacional moderna desenvolvida durante a **Imersão de Engenharia de Software com IA**, promovida pela **Alura** em parceria oficial com o **Google Startups**.

Esta versão representa a **evolução completa do Desafio 01 para o Desafio 02**, onde o projeto da calculadora em Python foi expandido com uma nova funcionalidade matemática (**Cálculo de Porcentagem**), novos testes automatizados de garantia de qualidade e suporte integrado na **interface gráfica inspirada no iPhone (iOS)** e no **console CLI em tempo real**, tudo desenvolvido através de co-criação acelerada por agente de Inteligência Artificial (**Google Antigravity**).

<p align="left">
  <a href="https://calculatora-py-iniciantes.netlify.app" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Acessar_Aplicação-Online_no_Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Deploy no Netlify">
  </a>
  <img src="https://img.shields.io/badge/Desafio_02-Evolução_com_IA-8A2BE2?style=for-the-badge&logo=google&logoColor=white" alt="Desafio 2">
  <img src="https://img.shields.io/badge/Agente-Google_Antigravity-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white" alt="Google Antigravity">
  <img src="https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python 3">
  <img src="https://img.shields.io/badge/Design-iPhone_iOS-black?style=for-the-badge&logo=apple&logoColor=white" alt="iOS Design">
</p>

> 🌐 **Link da Aplicação no Ar:** [https://calculatora-py-iniciantes.netlify.app](https://calculatora-py-iniciantes.netlify.app)  
> 🤖 **Documentação de Engenharia de Prompt (Método GCCD):** Veja o arquivo [`AGENTS.md`](./AGENTS.md)

---

## 📌 Sumário

- [Visão Geral: O que foi o Desafio 01?](#-visão-geral-o-que-foi-o-desafio-01)
- [A Evolução: O Desafio 02 com Google Antigravity](#-a-evolução-o-desafio-02-com-google-antigravity)
- [Engenharia de Prompt: Método GCCD (`AGENTS.md`)](#-engenharia-de-prompt-método-gccd-agentsmd)
- [Passo a Passo da Evolução: Os 3 Prompts e Seus Resultados](#-passo-a-passo-da-evolução-os-3-prompts-e-seus-resultados)
  - [Passo 1: Análise e Onboarding da Estrutura](#passo-1-análise-e-onboarding-da-estrutura)
  - [Passo 2: Implementação da Operação de Porcentagem (%)](#passo-2-implementação-da-operação-de-porcentagem-)
  - [Passo 3: Testes Cruzados e Validação (Terminal + Interface Gráfica)](#passo-3-testes-cruzados-e-validação-terminal--interface-gráfica)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar no seu Computador](#-como-executar-no-seu-computador)
  - [Executar os Scripts Python no Terminal](#executar-os-scripts-python-no-terminal)
  - [Executar a Aplicação Web Interativa](#executar-a-aplicação-web-interativa)
- [Como Fazer o Deploy da Aplicação no Ar](#-como-fazer-o-deploy-da-aplicação-no-ar-grátis)
- [Créditos e Parceria](#-créditos-e-parceria)

---

## 🎯 Visão Geral: O que foi o Desafio 01?

No **Desafio 01** da Imersão Alura & Google Startups, o objetivo central foi construir a fundação de uma calculadora em Python que realizasse com segurança as **quatro operações matemáticas básicas**:
1. **Soma (`+`)**
2. **Subtração (`-`)**
3. **Multiplicação (`*`)**
4. **Divisão (`/`)** com tratamento rigoroso contra divisão por zero (`ZeroDivisionError`).

O projeto foi entregue com duas abordagens de aprendizagem:
* **Script Sequencial Básico ([`calculadora.py`](calculadora.py)):** Fluxo linear de cima para baixo focado em fixar `input()`, conversão de tipos com `float()`, tomada de decisão com `if/elif/else` e interpolação de strings (*f-strings*).
* **Script Modular com Funções ([`calculadora_modular.py`](calculadora_modular.py)):** Estruturado com funções reutilizáveis (`def`), menu interativo em loop (`while True`) e tratamento de exceções com `try/except ValueError`.
* **Ambiente Educacional Web ([`src/`](src/)):** Interface visual desenvolvida em React 19 e Tailwind CSS inspirada na estética do iPhone (iOS) e com um console CLI interativo.

---

## 🚀 A Evolução: O Desafio 02 com Google Antigravity

No **Desafio 02**, o desafio foi colocar em prática o paradigma de **Engenharia de Software Acelerada por Agentes Autônomos de IA**, utilizando o **Google Antigravity**.

Em vez de alterar arquivos de código manualmente, a evolução do sistema foi conduzida passo a passo por um desenvolvedor em modo de pair programming com o agente:
1. **Onboarding Guiado:** Análise automatizada da arquitetura para quem está começando.
2. **Nova Funcionalidade:** Implementação da operação matemática de **Porcentagem (%)** em ambos os scripts Python e sincronização na interface web.
3. **Garantia de Qualidade (QA):** Bateria de testes automatizados e integração completa nos componentes gráficos (novo botão `%` na calculadora iOS e no console CLI).

---

## 🧠 Engenharia de Prompt: Método GCCD (`AGENTS.md`)

Para garantir clareza e reprodutibilidade, cada um dos 3 comandos passados durante o desenvolvimento foi desdobrado no padrão profissional **GCCD**:

* **G — Goal (Objetivo):** A meta objetiva e acionável.
* **C — Context (Contexto):** Quem é o usuário, quais ferramentas estão ativas e o ecossistema do projeto.
* **C — Constraints (Restrições):** O que **não** pode ser quebrado, segurança matemática e boas práticas.
* **D — Data & Deliverables (Dados e Entregáveis):** Entradas, saídas esperadas, código alterado e relatórios de validação.

> 📖 **Consulte o arquivo completo:** Para ver como cada um dos prompts simples abaixo foi formulado na íntegra segundo a metodologia GCCD, acesse o documento dedicado [`AGENTS.md`](./AGENTS.md).

---

## 👣 Passo a Passo da Evolução: Os 3 Prompts e Seus Resultados

Abaixo está o registro fiel da jornada iterativa com o agente **Google Antigravity**, mostrando exatamente o que foi solicitado e o resultado entregue a cada passo.

---

### Passo 1: Análise e Onboarding da Estrutura

#### 💬 Prompt Inicial Simples:
> *"Tenho um projeto de calculadora em Python que realiza as quatro operações matemáticas básicas. Estou começando a aprender programação e quero entender como os arquivos e as funções estão organizados. Analise o projeto e explique sua estrutura de maneira simples."*

#### ⚡ Resultado e Explicações Trazidas pelo Agente:
O agente realizou a leitura completa do repositório e entregou uma explicação pedagógica dividindo o projeto em duas camadas complementares:

1. **Os Scripts em Python (Lógica Central):**
   * **[`calculadora.py`](calculadora.py):** Código linear explicando a captura de texto com `input()`, a conversão para número decimal com `float()`, o controle de fluxo com `if/elif/else`, a barreira de segurança contra `num2 == 0` na divisão e o formato elegante das *f-strings*.
   * **[`calculadora_modular.py`](calculadora_modular.py):** Conceito de funções reutilizáveis (`def somar`, `def subtrair`, `def multiplicar`, `def dividir`, `def exibir_menu`), o loop contínuo `while True` que mantém a calculadora aberta e a proteção com `try/except ValueError` para evitar travamentos caso o usuário digite texto onde se espera número.
2. **A Aplicação Web Interativa (`src/`):**
   * Explicou que o projeto continha uma interface moderna em React 19 + TypeScript para simular o terminal e uma calculadora no estilo iPhone.
3. **Tabela de Arquivos do Projeto:**
   * Mapeou detalhadamente o papel de cada arquivo na raiz do repositório.

---

### Passo 2: Implementação da Operação de Porcentagem (%)

#### 💬 Prompt Inicial Simples:
> *"Agora quero adicionar uma funcionalidade para calcular porcentagens. Implemente essa operação mantendo as funcionalidades existentes e explique quais alterações foram realizadas no código."*

#### ⚡ Resultado e Explicações Trazidas pelo Agente:
O agente introduziu a regra matemática da porcentagem e realizou alterações cirúrgicas mantendo 100% das 4 operações anteriores:

1. **Lógica Matemática Aplicada:**
   $$\text{Resultado} = \frac{\text{valor} \times \text{taxa}}{100}$$
   *Exemplo:* $15\%$ de $200 = \frac{200 \times 15}{100} = 30.0$.

2. **Alterações no [`calculadora.py`](calculadora.py):**
   * Adicionou `  %  -> Porcentagem` na lista visual de operações.
   * Atualizou o prompt para: `Escolha a operação (+, -, *, /, %): `.
   * Inseriu o bloco condicional da porcentagem:
     ```python
     elif operacao == "%":
         # Cálculo de porcentagem: num2% de num1 (ex: 15% de 200 = 30)
         resultado = (num1 * num2) / 100
         print(f"\nResultado: {num2}% de {num1} = {resultado}")
     ```
   * Atualizou a mensagem de erro do `else`: `Escolha +, -, *, / ou %.`

3. **Alterações no [`calculadora_modular.py`](calculadora_modular.py):**
   * Criou a função dedicada:
     ```python
     def calcular_porcentagem(valor, taxa):
         """Calcula a taxa percentual de um valor (ex: taxa% de valor)."""
         return (valor * taxa) / 100
     ```
   * Atualizou o menu em `exibir_menu()`: adicionou a opção `5. Porcentagem (%)` e deslocou a opção de saída para `6. Sair do programa`.
   * Atualizou a checagem do loop para `if opcao not in ("1", "2", "3", "4", "5"):` e saída no `"6"`.
   * Adicionou o despacho da opção `5` para a função `calcular_porcentagem(n1, n2)`.

4. **Sincronização na Web:** Atualizou `src/data/pythonSnippets.ts` para que os trechos exibidos no navegador permanecessem rigorosamente idênticos aos scripts em disco.

---

### Passo 3: Testes Cruzados e Validação (Terminal + Interface Gráfica)

#### 💬 Prompt Inicial Simples:
> *"Agora teste a aplicação e verifique os resultados tanto no terminal interativo quanto na interface gráfica"*

#### ⚡ Resultado e Explicações Trazidas pelo Agente:
O agente preparou um script de verificação automatizada, testou todos os cenários da matemática da calculadora e adaptou os componentes de tela:

#### 📊 Tabela de Testes Automatizados Executados:
| Teste | Entrada (`num1`, `op`, `num2`) | Saída Obtida | Status |
| :--- | :--- | :--- | :---: |
| **Soma** | `15` $+$ `25` | `40` | ✅ PASS |
| **Subtração** | `50` $-$ `18` | `32` | ✅ PASS |
| **Multiplicação** | `7.5` $\times$ `4` | `30` | ✅ PASS |
| **Divisão** | `100` $\div$ `4` | `25` | ✅ PASS |
| **Divisão por Zero** | `42` $\div$ `0` | `Erro: Divisão por zero não é permitida!` | ✅ PASS |
| **Porcentagem (Cenário 1)** | `200` `%` `15` | `30.0` *(15% de 200)* | ✅ PASS |
| **Porcentagem (Cenário 2)** | `80` `%` `50` | `40.0` *(50% de 80)* | ✅ PASS |
| **Porcentagem (Cenário 3)** | `55.5` `%` `10` | `5.55` *(10% de 55.5)* | ✅ PASS |

#### 📱 Melhorias Implementadas na Interface Gráfica ([`InteractiveTerminal.tsx`](src/components/InteractiveTerminal.tsx)):
1. **Novo Botão `%` na Calculadora iOS:** Integrado na linha superior dos botões da calculadora com a estilização e destaque visual autêntico do iPhone.
2. **Ação Rápida de Teste (Preset):** Adicionado o botão `200 % 15 (15%)` para permitir que o usuário teste a porcentagem com um único clique na tela.
3. **Inspetor de Código em Tempo Real:** Exibe o trecho exato em Python executado no momento da conta de porcentagem.
4. **Console CLI Interativo Atualizado:** O terminal simulado foi ajustado para suportar `%` no modo básico e opções 1 a 6 no modo modular.
5. **Garantia de Build:** Compilação com `vite build` gerando os arquivos de distribuição em `dist/` com **0 erros**.

---

## 📁 Estrutura do Projeto

```text
├── AGENTS.md                      # Engenharia de prompt detalhada com o método GCCD
├── README.md                      # Documentação completa da evolução Desafio 1 -> Desafio 2
├── calculadora.py                 # Script Python sequencial (4 operações + Porcentagem)
├── calculadora_modular.py         # Script Python modular com funções def, menu e repetição
├── index.html                     # Ponto de entrada HTML da aplicação web
├── package.json                   # Dependências do Node.js e scripts de execução
├── tsconfig.json                  # Configuração do compilador TypeScript
├── vite.config.ts                 # Configurações do Vite e Tailwind CSS
└── src/
    ├── App.tsx                    # Layout principal e navegação em abas
    ├── main.tsx                   # Inicialização do React 19
    ├── index.css                  # Estilos globais e Tailwind CSS
    ├── data/
    │   └── pythonSnippets.ts      # Trechos de código Python sincronizados para estudo
    └── components/
        ├── InteractiveTerminal.tsx # Calculadora estilo iOS com botão % e Console CLI
        ├── CodeDisplay.tsx        # Visualizador de código com syntax highlight
        ├── ComponentExplainer.tsx # Explicação pedagógica dos blocos de código
        ├── ExecutionStepper.tsx   # Simulador visual de fluxo de memória
        ├── ChallengesSection.tsx  # Desafios práticos para evolução do aluno
        └── HowToRunGuide.tsx      # Guia de execução passo a passo
```

---

## 💻 Como Executar no seu Computador

### Executar os Scripts Python no Terminal

Abra o PowerShell ou Terminal na pasta do projeto:

```powershell
# 1. Executar a versão básica (com porcentagem):
python calculadora.py

# 2. Executar a versão modular com funções e menu:
python calculadora_modular.py
```

> [!TIP]
> **Instalação do Python no Windows:** Caso o comando `python` abra a loja Microsoft Store, você pode instalar a versão oficial do Python 3.12 diretamente pelo PowerShell com o comando:
> ```powershell
> winget install Python.Python.3.12
> ```

---

### Executar a Aplicação Web Interativa

Para rodar a interface gráfica com o simulador iOS e o console CLI:

1. **Instale as dependências (Node.js 20+ ou 22 LTS):**
   ```bash
   npm install
   ```
2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
3. Acesse o endereço informado no terminal (ex: `http://localhost:5173`).

---

## 🚀 Como Fazer o Deploy da Aplicação no Ar (Grátis)

A aplicação pode ser publicada em segundos nos seguintes provedores gratuitos:

### Opção 1: Netlify (Deploy Oficial)
> 🚀 **Aplicação Publicada:** [https://calculatora-py-iniciantes.netlify.app](https://calculatora-py-iniciantes.netlify.app)

* Conecte seu repositório no [Netlify](https://www.netlify.com).
* **Build command:** `npm run build`
* **Publish directory:** `dist`

### Opção 2: Vercel
* Importe o repositório em [vercel.com](https://vercel.com).
* O framework preset `Vite` é detectado automaticamente. Clique em **Deploy**.

---

## 🤝 Créditos e Parceria

Projeto desenvolvido durante a **Imersão de Engenharia de Software com IA**:
* **Realização:** [Alura](https://www.alura.com.br) & [Google Startups](https://startup.google.com)
* **Agente de Engenharia Autônoma:** Google Antigravity
* **Desenvolvido por:** Alana (Aluna da Imersão IA)
