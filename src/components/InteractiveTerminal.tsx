import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  RotateCcw,
  Terminal as TerminalIcon,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Delete,
  Equal,
  Calculator as CalculatorIcon,
  Play,
  CornerDownLeft,
} from "lucide-react";

interface TerminalProps {
  mode: "basic" | "modular";
}

interface TerminalLine {
  id: string;
  type: "stdout" | "stdin" | "error" | "success" | "banner";
  text: string;
}

export const InteractiveTerminal: React.FC<TerminalProps> = ({ mode }) => {
  // View mode: 'calculator' (real visual calculator) or 'terminal' (raw console)
  const [viewMode, setViewMode] = useState<"calculator" | "terminal">("calculator");

  // Calculator State
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [num1, setNum1] = useState<number | null>(null);
  const [num2, setNum2] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resultado, setResultado] = useState<number | null>(null);
  const [isNewEntry, setIsNewEntry] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastExecutedPython, setLastExecutedPython] = useState<string | null>(null);
  const [activeStepText, setActiveStepText] = useState<string>(
    'Passo 1: Digite o primeiro número (num1 = float(input()))'
  );

  // Classic Terminal State (for the CLI view)
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [cliStep, setCliStep] = useState<number>(1);
  const [cliInputVal, setCliInputVal] = useState<string>("");
  const [cliVariables, setCliVariables] = useState<{
    num1?: number;
    num2?: number;
    operacao?: string;
    opcaoMenu?: string;
  }>({});
  const cliInputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Reset calculator to clean state
  const resetCalculator = useCallback(() => {
    setDisplayValue("0");
    setNum1(null);
    setNum2(null);
    setOperation(null);
    setResultado(null);
    setIsNewEntry(true);
    setErrorMessage(null);
    setLastExecutedPython(null);
    setActiveStepText("Passo 1: Digite o 1º número (num1 = float(input()))");
  }, []);

  // Reset CLI
  const resetCli = useCallback(() => {
    setCliStep(1);
    setCliInputVal("");
    setCliVariables({});
    if (mode === "basic") {
      setHistory([
        { id: "b1", type: "banner", text: "========================================" },
        { id: "b2", type: "banner", text: "     CALCULADORA SIMPLES EM PYTHON      " },
        { id: "b3", type: "banner", text: "========================================" },
        { id: "p1", type: "stdout", text: "Digite o primeiro número: " },
      ]);
    } else {
      setHistory([
        { id: "m1", type: "banner", text: "===================================" },
        { id: "m2", type: "banner", text: "       MENU DA CALCULADORA        " },
        { id: "m3", type: "banner", text: "===================================" },
        { id: "m4", type: "stdout", text: "1. Somar (+)" },
        { id: "m5", type: "stdout", text: "2. Subtrair (-)" },
        { id: "m6", type: "stdout", text: "3. Multiplicar (*)" },
        { id: "m7", type: "stdout", text: "4. Dividir (/)" },
        { id: "m8", type: "stdout", text: "5. Porcentagem (%)" },
        { id: "m9", type: "stdout", text: "6. Sair do programa" },
        { id: "m10", type: "banner", text: "===================================" },
        { id: "mp1", type: "stdout", text: "Escolha uma opção (1 a 6): " },
      ]);
    }
  }, [mode]);

  useEffect(() => {
    resetCalculator();
    resetCli();
  }, [mode, resetCalculator, resetCli]);

  useEffect(() => {
    if (viewMode === "terminal") {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, cliStep, viewMode]);

  // Handle digit click
  const handleDigit = (digit: string) => {
    setErrorMessage(null);

    // Se um cálculo acabou de ser concluído, digitar um novo dígito inicia uma nova conta
    if (resultado !== null) {
      setNum1(null);
      setNum2(null);
      setOperation(null);
      setResultado(null);
      setDisplayValue(digit);
      setIsNewEntry(false);
      setActiveStepText("Editando num1: float(input(...))");
      return;
    }

    if (isNewEntry) {
      setDisplayValue(digit);
      setIsNewEntry(false);
    } else {
      if (displayValue === "0" && digit !== ".") {
        setDisplayValue(digit);
      } else {
        // Prevent multiple decimals
        if (digit === "." && displayValue.includes(".")) return;
        // Max 14 characters to fit display nicely
        if (displayValue.length >= 14) return;
        setDisplayValue(displayValue + digit);
      }
    }

    if (operation === null) {
      setActiveStepText("Editando num1: float(input(...))");
    } else {
      setActiveStepText("Editando num2: float(input(...))");
    }
  };

  // Handle decimal dot
  const handleDecimal = () => {
    setErrorMessage(null);
    if (resultado !== null) {
      setNum1(null);
      setNum2(null);
      setOperation(null);
      setResultado(null);
      setDisplayValue("0.");
      setIsNewEntry(false);
      return;
    }
    if (isNewEntry) {
      setDisplayValue("0.");
      setIsNewEntry(false);
    } else if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  // Handle Backspace
  const handleBackspace = () => {
    if (errorMessage || resultado !== null) {
      resetCalculator();
      return;
    }
    if (isNewEntry || displayValue.length <= 1) {
      setDisplayValue("0");
      setIsNewEntry(true);
    } else {
      setDisplayValue(displayValue.slice(0, -1));
    }
  };

  // Handle Operator (+, -, *, /)
  const handleOperator = (op: string) => {
    setErrorMessage(null);

    // Se o usuário já calculou um resultado e pressiona um operador, usa o resultado como novo num1
    if (resultado !== null) {
      const prevRes = resultado;
      setNum1(prevRes);
      setOperation(op);
      setNum2(null);
      setResultado(null);
      setIsNewEntry(true);
      setLastExecutedPython(
        `num1 = ${prevRes}\noperacao = "${op}"\n# Continuando cálculo com o resultado anterior...`
      );
      setActiveStepText(`Passo 2: operacao = "${op}". Agora digite o segundo número.`);
      return;
    }

    const currentNum = parseFloat(displayValue);

    // If an operation was already chosen and the user enters another without '=', compute first
    if (num1 !== null && operation !== null && !isNewEntry) {
      executeCalculation(op);
      return;
    }

    setNum1(currentNum);
    setOperation(op);
    setNum2(null);
    setIsNewEntry(true);
    setLastExecutedPython(
      `num1 = ${currentNum}\noperacao = "${op}"\n# Aguardando segundo número (num2)...`
    );
    setActiveStepText(`Passo 2: operacao = "${op}". Agora digite o segundo número.`);
  };

  // Execute calculation (reflects Python if/elif/else or functions)
  const executeCalculation = (nextOp: string | null = null) => {
    if (num1 === null || operation === null) {
      return;
    }

    const secondNum = parseFloat(displayValue);
    setNum2(secondNum);

    let result: number | null = null;
    let pythonTrace = "";

    if (operation === "+") {
      result = num1 + secondNum;
      pythonTrace =
        mode === "basic"
          ? `if operacao == "+":\n    resultado = ${num1} + ${secondNum}\n    # resultado: ${result}`
          : `def somar(a, b): return a + b\nresultado = somar(${num1}, ${secondNum})\n# resultado: ${result}`;
    } else if (operation === "-") {
      result = num1 - secondNum;
      pythonTrace =
        mode === "basic"
          ? `elif operacao == "-":\n    resultado = ${num1} - ${secondNum}\n    # resultado: ${result}`
          : `def subtrair(a, b): return a - b\nresultado = subtrair(${num1}, ${secondNum})\n# resultado: ${result}`;
    } else if (operation === "*") {
      result = num1 * secondNum;
      pythonTrace =
        mode === "basic"
          ? `elif operacao == "*":\n    resultado = ${num1} * ${secondNum}\n    # resultado: ${result}`
          : `def multiplicar(a, b): return a * b\nresultado = multiplicar(${num1}, ${secondNum})\n# resultado: ${result}`;
    } else if (operation === "/") {
      if (secondNum === 0) {
        setErrorMessage("Erro: Divisão por zero não é permitida!");
        setDisplayValue("Erro: Div/0");
        setIsNewEntry(true);
        setLastExecutedPython(
          mode === "basic"
            ? `elif operacao == "/":\n    if num2 == 0:\n        print("Erro: Não é possível dividir um número por zero!")`
            : `def dividir(a, b):\n    if b == 0:\n        return "Erro: Divisão por zero não é permitida!"`
        );
        setActiveStepText("❌ Erro detectado no Python: ZeroDivisionError evitado com if num2 == 0!");
        setResultado(null);
        return;
      } else {
        result = num1 / secondNum;
        pythonTrace =
          mode === "basic"
            ? `elif operacao == "/":\n    resultado = ${num1} / ${secondNum}\n    # resultado: ${result}`
            : `def dividir(a, b): return a / b\nresultado = dividir(${num1}, ${secondNum})\n# resultado: ${result}`;
      }
    } else if (operation === "%") {
      result = (num1 * secondNum) / 100;
      pythonTrace =
        mode === "basic"
          ? `elif operacao == "%":\n    resultado = (${num1} * ${secondNum}) / 100\n    # resultado: ${secondNum}% de ${num1} = ${result}`
          : `def calcular_porcentagem(valor, taxa):\n    return (valor * taxa) / 100\nresultado = calcular_porcentagem(${num1}, ${secondNum})\n# resultado: ${secondNum}% de ${num1} = ${result}`;
    }

    if (result !== null) {
      // Format nicely (avoid float precision glitches like 0.1 + 0.2 = 0.30000000000000004)
      const formattedResult =
        Number.isInteger(result)
          ? String(result)
          : parseFloat(result.toFixed(8)).toString();

      setDisplayValue(formattedResult);
      setLastExecutedPython(pythonTrace);
      setActiveStepText(
        operation === "%"
          ? `✅ print(f"Resultado: {num2}% de {num1} = {resultado}") -> ${formattedResult}`
          : `✅ print(f"Resultado: {num1} ${operation} {num2} = {resultado}") -> ${formattedResult}`
      );
      setResultado(result);

      if (nextOp) {
        setNum1(result);
        setOperation(nextOp);
        setNum2(null);
        setResultado(null);
        setIsNewEntry(true);
      } else {
        // Importante: preserva num1 original (ex: 2) e num2 original (ex: 2)
        // NÃO sobrescreve num1 com o resultado!
        setIsNewEntry(true);
      }
    }
  };

  // Keyboard support for physical typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if focus is on CLI input
      if (document.activeElement === cliInputRef.current) return;

      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === "." || e.key === ",") {
        e.preventDefault();
        handleDecimal();
      } else if (["+", "-", "*", "/", "%"].includes(e.key)) {
        e.preventDefault();
        handleOperator(e.key);
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        executeCalculation();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === "Escape") {
        e.preventDefault();
        resetCalculator();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displayValue, num1, operation, isNewEntry, errorMessage]);

  // Quick preset runner
  const runPreset = (n1: number, op: string, n2: number) => {
    resetCalculator();
    setDisplayValue(String(n1));
    setNum1(n1);
    setOperation(op);
    setIsNewEntry(true);

    setTimeout(() => {
      setDisplayValue(String(n2));
      setNum2(n2);
      setTimeout(() => {
        if (op === "/" && n2 === 0) {
          setErrorMessage("Erro: Divisão por zero não é permitida!");
          setDisplayValue("Erro: Div/0");
          setLastExecutedPython(
            `elif operacao == "/":\n    if num2 == 0:\n        print("Erro: Não é possível dividir um número por zero!")`
          );
          setActiveStepText("❌ Erro evitado: if num2 == 0 foi acionado no código Python!");
          setNum1(null);
          setOperation(null);
        } else {
          let res = 0;
          if (op === "+") res = n1 + n2;
          if (op === "-") res = n1 - n2;
          if (op === "*") res = n1 * n2;
          if (op === "/") res = n1 / n2;
          if (op === "%") res = (n1 * n2) / 100;

          const formatted = Number.isInteger(res) ? String(res) : parseFloat(res.toFixed(8)).toString();
          setDisplayValue(formatted);
          setLastExecutedPython(
            op === "%"
              ? `# Executou o cálculo de porcentagem:\nresultado = (${n1} * ${n2}) / 100  # = ${formatted}\nprint(f"Resultado: {num2}% de {num1} = {resultado}")`
              : `# Executou o bloco:\nif operacao == "${op}":\n    resultado = ${n1} ${op} ${n2}  # = ${formatted}\n    print(f"Resultado: {resultado}")`
          );
          setActiveStepText(
            op === "%"
              ? `✅ Cálculo de porcentagem: ${n2}% de ${n1} = ${formatted}`
              : `✅ Cálculo realizado com sucesso: ${n1} ${op} ${n2} = ${formatted}`
          );
          setNum1(n1);
          setNum2(n2);
          setOperation(op);
          setResultado(res);
          setIsNewEntry(true);
        }
      }, 250);
    }, 200);
  };

  // Helper for operation label
  const getOpSymbol = (op: string | null) => {
    if (!op) return "";
    if (op === "*") return "×";
    if (op === "/") return "÷";
    if (op === "%") return "%";
    return op;
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-[#090a0f] overflow-hidden shadow-[0_0_50px_-15px_rgba(6,182,212,0.12)]">
      {/* Top Header Bar - Minimalist Dark Mode */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d0f17] border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
            <CalculatorIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs md:text-sm text-neutral-100 tracking-tight">
                Calculadora Interativa
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.2)]">
                Neon Dark
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Reflete a execução do código Python em tempo real
            </p>
          </div>
        </div>

        {/* View Mode Switcher & Reset */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#07080c] rounded-lg p-0.5 border border-white/[0.08] text-xs">
            <button
              onClick={() => setViewMode("calculator")}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === "calculator"
                  ? "bg-neutral-800/90 text-cyan-300 font-medium shadow-[0_0_10px_rgba(6,182,212,0.25)] border border-cyan-500/30"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
              title="Interface visual de calculadora com botões"
            >
              <CalculatorIcon className="w-3 h-3 text-cyan-400" />
              <span>Calculadora</span>
            </button>
            <button
              onClick={() => setViewMode("terminal")}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === "terminal"
                  ? "bg-neutral-800/90 text-amber-300 font-medium shadow-[0_0_10px_rgba(245,158,11,0.2)] border border-amber-500/30"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
              title="Modo texto clássico (terminal Python)"
            >
              <TerminalIcon className="w-3 h-3 text-amber-400" />
              <span>Console CLI</span>
            </button>
          </div>

          <button
            onClick={() => {
              resetCalculator();
              resetCli();
            }}
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/[0.08] hover:border-cyan-500/40 transition cursor-pointer shadow-sm hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            title="Reiniciar Calculadora"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset Fast Actions */}
      <div className="px-4 py-2 bg-[#0c0d14] border-b border-white/[0.06] flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-neutral-400 text-[11px] font-medium flex items-center gap-1 mr-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Testar contas:
        </span>
        <button
          onClick={() => runPreset(15, "+", 25)}
          className="px-2 py-0.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-white/[0.08] hover:border-cyan-500/40 font-mono text-[11px] transition cursor-pointer hover:shadow-[0_0_8px_rgba(6,182,212,0.2)]"
        >
          15 + 25
        </button>
        <button
          onClick={() => runPreset(50, "-", 18)}
          className="px-2 py-0.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-white/[0.08] hover:border-cyan-500/40 font-mono text-[11px] transition cursor-pointer hover:shadow-[0_0_8px_rgba(6,182,212,0.2)]"
        >
          50 - 18
        </button>
        <button
          onClick={() => runPreset(7.5, "*", 4)}
          className="px-2 py-0.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-white/[0.08] hover:border-cyan-500/40 font-mono text-[11px] transition cursor-pointer hover:shadow-[0_0_8px_rgba(6,182,212,0.2)]"
        >
          7.5 * 4
        </button>
        <button
          onClick={() => runPreset(100, "/", 4)}
          className="px-2 py-0.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-white/[0.08] hover:border-cyan-500/40 font-mono text-[11px] transition cursor-pointer hover:shadow-[0_0_8px_rgba(6,182,212,0.2)]"
        >
          100 / 4
        </button>
        <button
          onClick={() => runPreset(200, "%", 15)}
          className="px-2 py-0.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-white/[0.08] hover:border-cyan-500/40 font-mono text-[11px] transition cursor-pointer hover:shadow-[0_0_8px_rgba(6,182,212,0.2)]"
        >
          200 % 15 (15%)
        </button>
        <button
          onClick={() => runPreset(42, "/", 0)}
          className="px-2 py-0.5 rounded-md bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-500/30 hover:border-rose-400 font-mono text-[11px] transition cursor-pointer shadow-[0_0_8px_rgba(244,63,94,0.15)]"
          title="Ver o tratamento de if num2 == 0 em ação"
        >
          42 / 0 (Divisão por zero)
        </button>
      </div>

      {/* Main Body: Calculator View or CLI View */}
      {viewMode === "calculator" ? (
        <div className="p-4 flex-1 flex flex-col justify-between gap-5">
          {/* Authentic iPhone iOS Calculator Chassis */}
          <div className="bg-black border border-neutral-800/80 rounded-[2.5rem] p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col gap-4 max-w-[360px] mx-auto w-full">
            {/* Top iOS Minimalist Speaker & Indicator Bar */}
            <div className="flex items-center justify-between px-1 text-[11px] text-neutral-500 font-sans">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] uppercase font-medium tracking-wider text-neutral-400">
                  Python 3.12
                </span>
              </div>
              <div className="w-12 h-1 bg-neutral-800 rounded-full"></div>
              <span className="text-[10px] text-neutral-500 font-mono">iOS Style</span>
            </div>

            {/* iOS Display Area */}
            <div className="flex flex-col justify-end px-2 pt-2 pb-1 min-h-[110px] select-all">
              {/* Formula & Python Variable Status Ticker */}
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-1">
                <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-[13px]">
                  {num1 !== null && (
                    <span className="text-neutral-300">
                      num1: <strong className="text-white font-medium">{num1}</strong>
                    </span>
                  )}
                  {operation !== null && (
                    <span className="text-[#ff9f0a] font-bold">
                      {getOpSymbol(operation)}
                    </span>
                  )}
                  {num2 !== null && (
                    <span className="text-neutral-300">
                      num2: <strong className="text-white font-medium">{num2}</strong>
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-neutral-600 font-sans">
                  {resultado !== null
                    ? `resultado`
                    : operation !== null
                    ? `segundo número`
                    : `primeiro número`}
                </div>
              </div>

              {/* Huge iPhone Crisp Readout */}
              <div className="text-right">
                <div
                  className={`font-sans font-light tracking-tight text-white select-all transition-all duration-150 ${
                    errorMessage
                      ? "text-rose-400 text-2xl md:text-3xl"
                      : displayValue.length > 10
                      ? "text-3xl md:text-4xl"
                      : displayValue.length > 7
                      ? "text-4xl md:text-5xl"
                      : "text-5xl md:text-6xl"
                  }`}
                >
                  {displayValue}
                </div>
              </div>
            </div>

            {/* iPhone iOS Circular Button Grid */}
            <div className="grid grid-cols-4 gap-3 sm:gap-3.5">
              {/* Row 1: AC, Backspace, %, Division */}
              <button
                onClick={resetCalculator}
                className="w-full aspect-square rounded-full bg-[#a5a5a5] hover:bg-[#d4d4d2] active:bg-[#e5e5e5] text-black font-normal text-xl sm:text-2xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
                title="Limpar tudo (All Clear)"
              >
                AC
              </button>
              <button
                onClick={handleBackspace}
                className="w-full aspect-square rounded-full bg-[#a5a5a5] hover:bg-[#d4d4d2] active:bg-[#e5e5e5] text-black flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
                title="Apagar dígito"
              >
                <Delete className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => handleOperator("%")}
                className={`w-full aspect-square rounded-full text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none ${
                  operation === "%"
                    ? "bg-white text-[#ff9f0a] font-bold"
                    : "bg-[#a5a5a5] hover:bg-[#d4d4d2] active:bg-[#e5e5e5] text-black font-normal"
                }`}
                title="Porcentagem (%)"
              >
                %
              </button>
              <button
                onClick={() => handleOperator("/")}
                className={`w-full aspect-square rounded-full text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none ${
                  operation === "/"
                    ? "bg-white text-[#ff9f0a] font-bold"
                    : "bg-[#ff9f0a] hover:bg-[#ffb03a] active:bg-[#cc7f08] text-white font-medium"
                }`}
                title="Divisão (/)"
              >
                ÷
              </button>

              {/* Row 2: 7, 8, 9, Multiplication */}
              <button
                onClick={() => handleDigit("7")}
                className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#525252] active:bg-[#666666] text-white font-light text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
              >
                7
              </button>
              <button
                onClick={() => handleDigit("8")}
                className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#525252] active:bg-[#666666] text-white font-light text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
              >
                8
              </button>
              <button
                onClick={() => handleDigit("9")}
                className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#525252] active:bg-[#666666] text-white font-light text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
              >
                9
              </button>
              <button
                onClick={() => handleOperator("*")}
                className={`w-full aspect-square rounded-full text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none ${
                  operation === "*"
                    ? "bg-white text-[#ff9f0a] font-bold"
                    : "bg-[#ff9f0a] hover:bg-[#ffb03a] active:bg-[#cc7f08] text-white font-medium"
                }`}
                title="Multiplicação (*)"
              >
                ×
              </button>

              {/* Row 3: 4, 5, 6, Subtraction */}
              <button
                onClick={() => handleDigit("4")}
                className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#525252] active:bg-[#666666] text-white font-light text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
              >
                4
              </button>
              <button
                onClick={() => handleDigit("5")}
                className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#525252] active:bg-[#666666] text-white font-light text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
              >
                5
              </button>
              <button
                onClick={() => handleDigit("6")}
                className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#525252] active:bg-[#666666] text-white font-light text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
              >
                6
              </button>
              <button
                onClick={() => handleOperator("-")}
                className={`w-full aspect-square rounded-full text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none ${
                  operation === "-"
                    ? "bg-white text-[#ff9f0a] font-bold"
                    : "bg-[#ff9f0a] hover:bg-[#ffb03a] active:bg-[#cc7f08] text-white font-medium"
                }`}
                title="Subtração (-)"
              >
                −
              </button>

              {/* Row 4: 1, 2, 3, Addition */}
              <button
                onClick={() => handleDigit("1")}
                className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#525252] active:bg-[#666666] text-white font-light text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
              >
                1
              </button>
              <button
                onClick={() => handleDigit("2")}
                className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#525252] active:bg-[#666666] text-white font-light text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
              >
                2
              </button>
              <button
                onClick={() => handleDigit("3")}
                className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#525252] active:bg-[#666666] text-white font-light text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
              >
                3
              </button>
              <button
                onClick={() => handleOperator("+")}
                className={`w-full aspect-square rounded-full text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none ${
                  operation === "+"
                    ? "bg-white text-[#ff9f0a] font-bold"
                    : "bg-[#ff9f0a] hover:bg-[#ffb03a] active:bg-[#cc7f08] text-white font-medium"
                }`}
                title="Soma (+)"
              >
                +
              </button>

              {/* Row 5: Invert sign, 0, Decimal dot, Equals */}
              <button
                onClick={() => {
                  if (displayValue !== "0" && !errorMessage) {
                    setDisplayValue(
                      displayValue.startsWith("-")
                        ? displayValue.slice(1)
                        : "-" + displayValue
                    );
                  }
                }}
                className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#525252] active:bg-[#666666] text-white font-light text-xl sm:text-2xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
                title="Inverter sinal (+/-)"
              >
                ±
              </button>
              <button
                onClick={() => handleDigit("0")}
                className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#525252] active:bg-[#666666] text-white font-light text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
              >
                0
              </button>
              <button
                onClick={handleDecimal}
                className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#525252] active:bg-[#666666] text-white font-normal text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
                title="Ponto decimal"
              >
                .
              </button>
              <button
                onClick={() => executeCalculation()}
                className="w-full aspect-square rounded-full bg-[#ff9f0a] hover:bg-[#ffb03a] active:bg-[#cc7f08] text-white font-medium text-2xl sm:text-3xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow cursor-pointer select-none"
                title="Calcular (Executa o código Python)"
              >
                <Equal className="w-6 h-6 stroke-[3]" />
              </button>
            </div>

            {/* Bottom Python Status Note */}
            <div className="pt-2 border-t border-neutral-900 text-center text-[11px] text-neutral-500 font-mono">
              <span>{activeStepText}</span>
            </div>
          </div>

          {/* Real-time Python Code Execution Box */}
          <div className="bg-[#0e0f14] rounded-2xl border border-neutral-800/80 p-3.5 flex flex-col gap-2 shadow-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-300 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Como o Python processa agora:</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                {mode === "basic" ? "if / elif / else" : "funções def"}
              </span>
            </div>

            <div className="bg-black rounded-xl p-3 font-mono text-xs text-emerald-400 border border-neutral-800/80 overflow-x-auto min-h-[52px] flex items-center shadow-inner">
              {lastExecutedPython ? (
                <pre className="whitespace-pre-wrap leading-relaxed">
                  {lastExecutedPython}
                </pre>
              ) : (
                <span className="text-neutral-600 italic">
                  Clique nos botões da calculadora para ver a execução do código Python aqui.
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Classic Terminal CLI View */
        <div
          className="flex-1 p-4 font-mono text-xs md:text-sm overflow-y-auto space-y-1.5 selection:bg-sky-500/30 min-h-[320px]"
          onClick={() => cliInputRef.current?.focus()}
        >
          <div className="text-neutral-500 text-xs mb-2 pb-2 border-b border-neutral-900 flex justify-between">
            <span>Python 3.12.0 (Interactive CLI Terminal)</span>
            <span>UTF-8</span>
          </div>

          {history.map((line) => {
            if (line.type === "stdin") {
              return (
                <div key={line.id} className="text-sky-300 font-semibold pl-2">
                  &gt; {line.text}
                </div>
              );
            }
            if (line.type === "error") {
              return (
                <div key={line.id} className="text-rose-400 bg-rose-950/30 p-2 rounded border border-rose-900/40">
                  {line.text}
                </div>
              );
            }
            if (line.type === "success") {
              return (
                <div
                  key={line.id}
                  className="text-emerald-300 font-bold bg-emerald-950/30 p-2.5 rounded border border-emerald-900/40 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{line.text}</span>
                </div>
              );
            }
            if (line.type === "banner") {
              return (
                <div key={line.id} className="text-neutral-500 tracking-wider">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={line.id} className="text-neutral-200 whitespace-pre-wrap">
                {line.text}
              </div>
            );
          })}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!cliInputVal.trim()) return;
              const val = cliInputVal.trim();
              setCliInputVal("");

              if (mode === "basic") {
                if (cliStep === 1) {
                  const parsed = parseFloat(val.replace(",", "."));
                  if (isNaN(parsed)) {
                    setHistory((prev) => [
                      ...prev,
                      { id: Math.random().toString(), type: "stdin", text: val },
                      { id: Math.random().toString(), type: "error", text: "ValueError: digite um número válido." },
                      { id: Math.random().toString(), type: "stdout", text: "Digite o primeiro número: " },
                    ]);
                    return;
                  }
                  setCliVariables({ num1: parsed });
                  setCliStep(2);
                  setHistory((prev) => [
                    ...prev,
                    { id: Math.random().toString(), type: "stdin", text: val },
                    { id: Math.random().toString(), type: "stdout", text: "Operações disponíveis:\n  +  -> Soma\n  -  -> Subtração\n  *  -> Multiplicação\n  /  -> Divisão\n  %  -> Porcentagem\n\nEscolha a operação (+, -, *, /, %): " },
                  ]);
                } else if (cliStep === 2) {
                  if (!["+", "-", "*", "/", "%"].includes(val)) {
                    setHistory((prev) => [
                      ...prev,
                      { id: Math.random().toString(), type: "stdin", text: val },
                      { id: Math.random().toString(), type: "error", text: "Operação inválida! Escolha +, -, *, / ou %." },
                      { id: Math.random().toString(), type: "stdout", text: "Escolha a operação (+, -, *, /, %): " },
                    ]);
                    return;
                  }
                  setCliVariables((prev) => ({ ...prev, operacao: val }));
                  setCliStep(3);
                  setHistory((prev) => [
                    ...prev,
                    { id: Math.random().toString(), type: "stdin", text: val },
                    { id: Math.random().toString(), type: "stdout", text: "Digite o segundo número: " },
                  ]);
                } else if (cliStep === 3) {
                  const parsed2 = parseFloat(val.replace(",", "."));
                  if (isNaN(parsed2)) {
                    setHistory((prev) => [
                      ...prev,
                      { id: Math.random().toString(), type: "stdin", text: val },
                      { id: Math.random().toString(), type: "error", text: "ValueError: digite um número válido." },
                      { id: Math.random().toString(), type: "stdout", text: "Digite o segundo número: " },
                    ]);
                    return;
                  }
                  const n1 = cliVariables.num1!;
                  const op = cliVariables.operacao!;
                  let out = "";
                  let isErr = false;
                  if (op === "+") out = `Resultado: ${n1} + ${parsed2} = ${n1 + parsed2}`;
                  if (op === "-") out = `Resultado: ${n1} - ${parsed2} = ${n1 - parsed2}`;
                  if (op === "*") out = `Resultado: ${n1} * ${parsed2} = ${n1 * parsed2}`;
                  if (op === "/") {
                    if (parsed2 === 0) {
                      out = "Erro: Não é possível dividir um número por zero!";
                      isErr = true;
                    } else {
                      out = `Resultado: ${n1} / ${parsed2} = ${n1 / parsed2}`;
                    }
                  }
                  if (op === "%") out = `Resultado: ${parsed2}% de ${n1} = ${(n1 * parsed2) / 100}`;

                  setCliStep(4);
                  setHistory((prev) => [
                    ...prev,
                    { id: Math.random().toString(), type: "stdin", text: val },
                    { id: Math.random().toString(), type: isErr ? "error" : "success", text: out },
                    { id: Math.random().toString(), type: "banner", text: "========================================" },
                    { id: Math.random().toString(), type: "stdout", text: "Fim do cálculo. Pressione Enter para recomeçar." },
                  ]);
                } else {
                  resetCli();
                }
              } else {
                // Modo modular
                if (cliStep === 1) {
                  if (val === "6") {
                    setHistory((prev) => [
                      ...prev,
                      { id: Math.random().toString(), type: "stdin", text: val },
                      { id: Math.random().toString(), type: "stdout", text: "Encerrando a calculadora... Até logo!" },
                    ]);
                    setCliStep(99);
                    return;
                  }
                  if (!["1", "2", "3", "4", "5"].includes(val)) {
                    setHistory((prev) => [
                      ...prev,
                      { id: Math.random().toString(), type: "stdin", text: val },
                      { id: Math.random().toString(), type: "error", text: "Opção inválida! Digite um número de 1 a 6." },
                      { id: Math.random().toString(), type: "stdout", text: "Escolha uma opção (1 a 6): " },
                    ]);
                    return;
                  }
                  setCliVariables({ opcaoMenu: val });
                  setCliStep(2);
                  setHistory((prev) => [
                    ...prev,
                    { id: Math.random().toString(), type: "stdin", text: val },
                    { id: Math.random().toString(), type: "stdout", text: "Digite o 1º número: " },
                  ]);
                } else if (cliStep === 2) {
                  const parsed = parseFloat(val.replace(",", "."));
                  if (isNaN(parsed)) {
                    setHistory((prev) => [
                      ...prev,
                      { id: Math.random().toString(), type: "stdin", text: val },
                      { id: Math.random().toString(), type: "error", text: "Erro: Entrada inválida! Por favor, digite números válidos." },
                      { id: Math.random().toString(), type: "stdout", text: "Digite o 1º número: " },
                    ]);
                    return;
                  }
                  setCliVariables((prev) => ({ ...prev, num1: parsed }));
                  setCliStep(3);
                  setHistory((prev) => [
                    ...prev,
                    { id: Math.random().toString(), type: "stdin", text: val },
                    { id: Math.random().toString(), type: "stdout", text: "Digite o 2º número: " },
                  ]);
                } else if (cliStep === 3) {
                  const parsed2 = parseFloat(val.replace(",", "."));
                  if (isNaN(parsed2)) {
                    setHistory((prev) => [
                      ...prev,
                      { id: Math.random().toString(), type: "stdin", text: val },
                      { id: Math.random().toString(), type: "error", text: "Erro: Entrada inválida! Por favor, digite números válidos." },
                      { id: Math.random().toString(), type: "stdout", text: "Digite o 2º número: " },
                    ]);
                    return;
                  }
                  const n1 = cliVariables.num1!;
                  const opt = cliVariables.opcaoMenu!;
                  let out = "";
                  let isErr = false;
                  if (opt === "1") out = `Resultado: ${n1} + ${parsed2} = ${n1 + parsed2}`;
                  if (opt === "2") out = `Resultado: ${n1} - ${parsed2} = ${n1 - parsed2}`;
                  if (opt === "3") out = `Resultado: ${n1} * ${parsed2} = ${n1 * parsed2}`;
                  if (opt === "4") {
                    if (parsed2 === 0) {
                      out = "Erro: Divisão por zero não é permitida!";
                      isErr = true;
                    } else {
                      out = `Resultado: ${n1} / ${parsed2} = ${n1 / parsed2}`;
                    }
                  }
                  if (opt === "5") out = `Resultado: ${parsed2}% de ${n1} = ${(n1 * parsed2) / 100}`;

                  setHistory((prev) => [
                    ...prev,
                    { id: Math.random().toString(), type: "stdin", text: val },
                    { id: Math.random().toString(), type: isErr ? "error" : "success", text: out },
                    { id: Math.random().toString(), type: "banner", text: "===================================" },
                    { id: Math.random().toString(), type: "stdout", text: "Escolha uma opção (1 a 6): " },
                  ]);
                  setCliStep(1);
                  setCliVariables({});
                } else {
                  resetCli();
                }
              }
            }}
            className="flex items-center gap-1.5 pt-1"
          >
            <span className="text-emerald-400 font-bold">&gt;</span>
            <input
              ref={cliInputRef}
              type="text"
              value={cliInputVal}
              onChange={(e) => setCliInputVal(e.target.value)}
              placeholder="Digite aqui e pressione Enter..."
              className="flex-1 bg-transparent text-emerald-300 font-mono focus:outline-none placeholder:text-neutral-600 text-xs md:text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="px-2 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-xs flex items-center gap-1 transition cursor-pointer"
            >
              <CornerDownLeft className="w-3 h-3" />
              Enviar
            </button>
          </form>

          <div ref={terminalEndRef} />
        </div>
      )}

      {/* Footer Info */}
      <div className="px-4 py-2.5 bg-neutral-900 border-t border-neutral-800 text-xs text-neutral-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Suporta teclado físico (0-9, +, -, *, /, Enter, Backspace)</span>
        </div>
        <div className="text-neutral-500 text-[11px]">
          {mode === "basic" ? "Modo: if / elif / else" : "Modo: Funções def"}
        </div>
      </div>
    </div>
  );
};
