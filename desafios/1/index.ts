import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type Venda = { vendedor: string; valor: number };

function comissaoDaVenda(valor: number): number {
  if (valor < 100) return 0;
  if (valor < 500) return valor * 0.01;
  return valor * 0.05;
}

function formatar(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const arquivo = join(dirname(fileURLToPath(import.meta.url)), "vendas.json");
const { vendas } = JSON.parse(readFileSync(arquivo, "utf-8")) as { vendas: Venda[] };

const porVendedor: Record<string, { vendas: number; total: number; comissao: number }> = {};

for (const venda of vendas) {
  const registro = porVendedor[venda.vendedor] ?? {
    vendas: 0,
    total: 0,
    comissao: 0,
  };

  registro.vendas += 1;
  registro.total += venda.valor;
  registro.comissao += comissaoDaVenda(venda.valor);
  porVendedor[venda.vendedor] = registro;
}

console.log("Comissão por vendedor\n");

for (const [vendedor, dados] of Object.entries(porVendedor)) {
  console.log(`${vendedor}`);
  console.log(`  Vendas: ${dados.vendas}`);
  console.log(`  Total vendido: ${formatar(dados.total)}`);
  console.log(`  Comissão: ${formatar(dados.comissao)}\n`);
}
