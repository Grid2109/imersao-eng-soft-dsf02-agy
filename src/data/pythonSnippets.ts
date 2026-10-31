export interface CodeComponentExplanation {
  id: string;
  name: string;
  tag: string;
  badgeColor: string;
  lines: number[];
  shortDesc: string;
  deepExplanation: string;
  beginnerPitfall: string;
  codeSnippet: string;
}

export const BASIC_CALCULATOR_CODE = `# ============================================================
# CALCULADORA BÁSICA EM PYTHON (Para Iniciantes)
# Realiza as quatro operações: Soma, Subtração, Multiplicação e Divisão
# ============================================================

print("=" * 40)
print("     CALCULADORA SIMPLES EM PYTHON")
print("=" * 40)

# 1. Entrada de dados pelo usuário
# Usamos float() para permitir tanto números inteiros (5) quanto decimais (5.5)
num1 = float(input("Digite o primeiro número: "))

print("Operações disponíveis:")
print("  +  -> Soma")
print("  -  -> Subtração")
print("  *  -> Multiplicação")
print("  /  -> Divisão")
print("  %  -> Porcentagem")

operacao = input("Escolha a operação (+, -, *, /, %): ").strip()
num2 = float(input("Digite o segundo número: "))

# 2. Estrutura condicional para calcular o resultado
if operacao == "+":
    resultado = num1 + num2
    print(f"\\nResultado: {num1} + {num2} = {resultado}")

elif operacao == "-":
    resultado = num1 - num2
    print(f"\\nResultado: {num1} - {num2} = {resultado}")

elif operacao == "*":
    resultado = num1 * num2
    print(f"\\nResultado: {num1} * {num2} = {resultado}")

elif operacao == "/":
    # Regra fundamental: divisão por zero não existe na matemática!
    if num2 == 0:
        print("\\nErro: Não é possível dividir um número por zero!")
    else:
        resultado = num1 / num2
        print(f"\\nResultado: {num1} / {num2} = {resultado}")

elif operacao == "%":
    # Cálculo de porcentagem: num2% de num1 (ex: 15% de 200 = 30)
    resultado = (num1 * num2) / 100
    print(f"\\nResultado: {num2}% de {num1} = {resultado}")

else:
    print(f"\\nOperação inválida '{operacao}'! Escolha +, -, *, / ou %.")

print("=" * 40)
print("Fim do cálculo. Obrigado por usar a calculadora!")
`;

export const MODULAR_CALCULATOR_CODE = `# ============================================================
# CALCULADORA MODULAR COM FUNÇÕES E REPETIÇÃO
# Estrutura recomendada para evolução nos estudos de Python
# ============================================================

def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a diferença entre dois números."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto de dois números."""
    return a * b

def dividir(a, b):
    """Retorna a divisão entre dois números, tratando divisão por zero."""
    if b == 0:
        return "Erro: Divisão por zero não é permitida!"
    return a / b

def calcular_porcentagem(valor, taxa):
    """Calcula a taxa percentual de um valor (ex: taxa% de valor)."""
    return (valor * taxa) / 100

def exibir_menu():
    print("\\n" + "=" * 35)
    print("      MENU DA CALCULADORA")
    print("=" * 35)
    print("1. Somar (+)")
    print("2. Subtrair (-)")
    print("3. Multiplicar (*)")
    print("4. Dividir (/)")
    print("5. Porcentagem (%)")
    print("6. Sair do programa")
    print("=" * 35)

# Loop principal: mantém a calculadora aberta até o usuário escolher sair
while True:
    exibir_menu()
    opcao = input("Escolha uma opção (1 a 6): ").strip()

    if opcao == "6":
        print("Encerrando a calculadora... Até logo!")
        break

    if opcao not in ("1", "2", "3", "4", "5"):
        print("Opção inválida! Digite um número de 1 a 6.")
        continue

    try:
        n1 = float(input("Digite o 1º número: "))
        n2 = float(input("Digite o 2º número: "))
    except ValueError:
        print("Erro: Entrada inválida! Por favor, digite números válidos.")
        continue

    if opcao == "1":
        print(f"Resultado: {n1} + {n2} = {somar(n1, n2)}")
    elif opcao == "2":
        print(f"Resultado: {n1} - {n2} = {subtrair(n1, n2)}")
    elif opcao == "3":
        print(f"Resultado: {n1} * {n2} = {multiplicar(n1, n2)}")
    elif opcao == "4":
        resp = dividir(n1, n2)
        if isinstance(resp, str):
            print(resp)
        else:
            print(f"Resultado: {n1} / {n2} = {resp}")
    elif opcao == "5":
        resultado = calcular_porcentagem(n1, n2)
        print(f"Resultado: {n2}% de {n1} = {resultado}")
`;

export const BASIC_COMPONENTS_EXPLANATION: CodeComponentExplanation[] = [
  {
    id: "input",
    name: "A função input()",
    tag: "Entrada de Dados",
    badgeColor: "bg-blue-900/40 text-blue-300 border-blue-700/50",
    lines: [12, 20, 21],
    shortDesc: "Pausa o programa e espera o usuário digitar algo pelo teclado no terminal.",
    deepExplanation:
      "Em Python, a função input() exibe uma mensagem na tela e aguarda o usuário digitar um valor e pressionar 'Enter'. Qualquer dado capturado por input() sempre chega ao Python no formato de TEXTO (string / str), mesmo que você digite apenas algarismos como '10'.",
    beginnerPitfall:
      "Atenção: Se você fizer num1 = input() e num2 = input(), e depois num1 + num2, ao digitar 5 e 2 o resultado será '52' (concatenação de texto) e não 7! Por isso precisamos converter para número com float() ou int().",
    codeSnippet: `nome = input("Qual é o seu nome? ")
# '5' (texto) != 5 (número)`,
  },
  {
    id: "float",
    name: "Conversão com float()",
    tag: "Tipagem / Cast",
    badgeColor: "bg-emerald-900/40 text-emerald-300 border-emerald-700/50",
    lines: [12, 21],
    shortDesc: "Transforma a string recebida do teclado em um número com casas decimais.",
    deepExplanation:
      "Python possui diferentes tipos de dados. 'int' representa números inteiros (como 1, 42, -7). Já 'float' representa números decimais (como 3.14, 0.5, 10.0). Usamos float(input(...)) porque uma calculadora deve conseguir somar tanto 10 quanto 4.75 sem quebrar.",
    beginnerPitfall:
      "Em Python, números decimais usam PONTO (.) e não vírgula (,). Digitar '5.5' funciona, mas digitar '5,5' gera um erro ValueError.",
    codeSnippet: `numero = float("10.5")  # Vira o float 10.5
# 10 + 5.5 = 15.5`,
  },
  {
    id: "if_elif_else",
    name: "Condicionais: if, elif, else",
    tag: "Controle de Fluxo",
    badgeColor: "bg-amber-900/40 text-amber-300 border-amber-700/50",
    lines: [24, 28, 32, 36, 44],
    shortDesc: "Permite ao Python tomar decisões lógicas dependendo do que o usuário digitou.",
    deepExplanation:
      "'if' (se) testa a primeira condição. Se for verdadeira, executa o bloco indentado. Se não for, passa para os 'elif' (senão se), que testam outras opções em sequência. O 'else' (senão) é o plano de contingência final: só executa se nenhuma das opções anteriores tiver sido satisfeita.",
    beginnerPitfall:
      "Lembre-se da indentação (os 4 espaços à esquerda dentro de cada bloco) e dos dois-pontos (:) no final da linha da condição!",
    codeSnippet: `if operacao == "+":
    # executa se for +
elif operacao == "-":
    # executa se for -
else:
    # executa se for qualquer outra coisa`,
  },
  {
    id: "zero_division",
    name: "Tratamento de Divisão por Zero",
    tag: "Segurança Matemática",
    badgeColor: "bg-rose-900/40 text-rose-300 border-rose-700/50",
    lines: [38, 39, 40, 41, 42],
    shortDesc: "Evita que o programa encerre bruscamente com um ZeroDivisionError.",
    deepExplanation:
      "Na matemática pura, dividir por zero é uma operação indefinida. Se o Python tentar fazer '10 / 0', o interpretador trava e exibe 'ZeroDivisionError: division by zero'. Antes de efetuar a divisão, testamos se o divisor (num2) é igual a 0.",
    beginnerPitfall:
      "Use '==' (dois sinais de igual) para comparar valores! Um único '=' serve para atribuir valor a uma variável.",
    codeSnippet: `if num2 == 0:
    print("Não é possível dividir por zero!")
else:
    resultado = num1 / num2`,
  },
  {
    id: "f_strings",
    name: "F-Strings (Formatação de Texto)",
    tag: "Saída Elegante",
    badgeColor: "bg-purple-900/40 text-purple-300 border-purple-700/50",
    lines: [26, 30, 34, 42],
    shortDesc: "Permite inserir variáveis diretamente dentro do texto usando chaves { }.",
    deepExplanation:
      "Introduzidas no Python 3.6, as f-strings (format strings) são a forma mais moderna e legível de juntar texto com variáveis. Basta colocar a letra 'f' antes das aspas de abertura e colocar as variáveis entre chaves {}.",
    beginnerPitfall:
      "Não esqueça a letra f minúscula antes das aspas! Sem o f, o Python exibirá literalmente '{num1} + {num2}' na tela.",
    codeSnippet: `total = 15.0
print(f"O total da conta é: R$ {total}")
# Imprime: O total da conta é: R$ 15.0`,
  },
];

export const CHALLENGES = [
  {
    id: "potencia",
    title: "Desafio 1: Adicionar Exponenciação (Potência)",
    desc: "Como permitir que o usuário calcule potências (ex: 2 elevado a 3 = 8)?",
    hint: "Em Python, o operador de potência é dois asteriscos (**). Por exemplo, 2 ** 3 resulta em 8.",
    solution: `elif operacao == "**" or operacao == "^":
    resultado = num1 ** num2
    print(f"\\nResultado: {num1} ** {num2} = {resultado}")`,
  },
  {
    id: "virgula",
    title: "Desafio 2: Aceitar Vírgula ou Ponto Decimal",
    desc: "No Brasil usamos '5,5', mas o Python puro espera '5.5'. Como aceitar vírgula sem dar ValueError no terminal?",
    hint: "A interface web já trata isso por conveniência de UX, mas o script 'calculadora.py' no terminal ainda usa float(input()) puro e quebra ao digitar vírgula. Use .replace(',', '.') antes da conversão!",
    solution: `entrada = input("Digite o número: ").replace(",", ".")
num1 = float(entrada)`,
  },
  {
    id: "duas_casas",
    title: "Desafio 3: Limitar para 2 Casas Decimais",
    desc: "Ao dividir 10 por 3, o resultado é 3.3333333333333335. Como deixar bonitinho?",
    hint: "Dentro da f-string, adicione :.2f após a variável. Exemplo: {resultado:.2f}",
    solution: `print(f"\\nResultado formatado: {resultado:.2f}")
# 10 / 3 será exibido como: 3.33`,
  },
];
