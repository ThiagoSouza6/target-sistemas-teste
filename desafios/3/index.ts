import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const MULTA_AO_DIA = 0.025;

function parseData(texto: string): Date | null {
  const partes = texto.trim().split(/[\/\-]/);
  if (partes.length !== 3) return null;

  const [dia, mes, ano] = partes.map(Number);
  if (!dia || !mes || !ano) return null;

  const data = new Date(ano, mes - 1, dia);
  if (data.getFullYear() !== ano || data.getMonth() !== mes - 1 || data.getDate() !== dia) {
    return null;
  }

  return data;
}

function diasDeAtraso(vencimento: Date, hoje = new Date()): number {
  const inicioHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  const inicioVencimento = new Date(
    vencimento.getFullYear(),
    vencimento.getMonth(),
    vencimento.getDate()
  );

  const diff = inicioHoje.getTime() - inicioVencimento.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

function formatar(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

async function main() {
  const rl = createInterface({ input: stdin, output: stdout });

  const valor = Number((await rl.question("Valor: ")).replace(",", "."));
  const vencimento = parseData(await rl.question("Data de vencimento (dd/mm/aaaa): "));
  rl.close();

  if (Number.isNaN(valor) || valor < 0) {
    console.log("Valor inválido.");
    process.exit(1);
  }

  if (!vencimento) {
    console.log("Data inválida.");
    process.exit(1);
  }

  const dias = diasDeAtraso(vencimento);
  const juros = valor * MULTA_AO_DIA * dias;
  const total = valor + juros;

  console.log(`\nDias em atraso: ${dias}`);
  console.log(`Juros (2,5% ao dia): ${formatar(juros)}`);
  console.log(`Valor original: ${formatar(valor)}`);
  console.log(`Valor atualizado: ${formatar(total)}`);
}

main();
