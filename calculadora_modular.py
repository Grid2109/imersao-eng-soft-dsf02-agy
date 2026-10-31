# ============================================================
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
    print("\n" + "=" * 35)
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
