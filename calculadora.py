# ============================================================
# CALCULADORA BÁSICA EM PYTHON
# Operações: Soma (+), Subtração (-), Multiplicação (*), Divisão (/) e Porcentagem (%)
# ============================================================

print("=" * 40)
print("     CALCULADORA SIMPLES EM PYTHON")
print("=" * 40)

# 1. Entrada de dados pelo usuário
# Usamos float() para aceitar números inteiros (ex: 10) ou decimais (ex: 4.5)
num1 = float(input("Digite o primeiro número: "))

print("\nOperações disponíveis:")
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
    print(f"\nResultado: {num1} + {num2} = {resultado}")

elif operacao == "-":
    resultado = num1 - num2
    print(f"\nResultado: {num1} - {num2} = {resultado}")

elif operacao == "*":
    resultado = num1 * num2
    print(f"\nResultado: {num1} * {num2} = {resultado}")

elif operacao == "/":
    # Regra fundamental: divisão por zero não existe na matemática!
    if num2 == 0:
        print("\nErro: Não é possível dividir um número por zero!")
    else:
        resultado = num1 / num2
        print(f"\nResultado: {num1} / {num2} = {resultado}")

elif operacao == "%":
    # Cálculo de porcentagem: num2% de num1 (ex: 15% de 200 = 30)
    resultado = (num1 * num2) / 100
    print(f"\nResultado: {num2}% de {num1} = {resultado}")

else:
    print(f"\nOperação inválida '{operacao}'! Escolha +, -, *, / ou %.")

print("=" * 40)
print("Fim do cálculo. Obrigado por usar a calculadora!")
