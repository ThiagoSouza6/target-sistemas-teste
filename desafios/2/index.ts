import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { fileURLToPath } from "node:url";

type Produto = {
  codigoProduto: number;
  descricaoProduto: string;
  estoque: number;
};

type Movimentacao = {
  id: number;
  descricao: string;
  codigoProduto: number;
  quantidade: number;
};

const arquivo = join(dirname(fileURLToPath(import.meta.url)), "estoque.json");
const { estoque } = JSON.parse(readFileSync(arquivo, "utf-8")) as { estoque: Produto[] };

let proximoId = 1;
const movimentacoes: Movimentacao[] = [];

function buscarProduto(codigo: number): Produto | undefined {
  return estoque.find((item) => item.codigoProduto === codigo);
}

function lancar(codigoProduto: number, descricao: string, quantidade: number): number {
  const produto = buscarProduto(codigoProduto);
  if (!produto) throw new Error("Produto não encontrado.");
  if (quantidade === 0) throw new Error("Quantidade deve ser diferente de zero.");
  if (produto.estoque + quantidade < 0) throw new Error("Estoque insuficiente.");

  produto.estoque += quantidade;
  movimentacoes.push({
    id: proximoId++,
    descricao,
    codigoProduto,
    quantidade,
  });

  return produto.estoque;
}

function listarEstoque() {
  console.log("\nEstoque atual:");
  for (const item of estoque) {
    console.log(`  ${item.codigoProduto} - ${item.descricaoProduto}: ${item.estoque}`);
  }
}

async function main() {
  const rl = createInterface({ input: stdin, output: stdout });

  console.log("Movimentação de estoque");
  console.log("Digite a quantidade positiva para entrada e negativa para saída.");
  console.log("Deixe o código em branco para sair.\n");

  listarEstoque();

  while (true) {
    const codigoTexto = (await rl.question("\nCódigo do produto: ")).trim();
    if (!codigoTexto) break;

    const codigo = Number(codigoTexto);
    const produto = buscarProduto(codigo);
    if (!produto) {
      console.log("Produto não encontrado.");
      continue;
    }

    const descricao = (await rl.question("Descrição da movimentação (entrada/saída): ")).trim();
    const quantidade = Number(await rl.question("Quantidade: "));

    try {
      const saldo = lancar(codigo, descricao || "movimentação", quantidade);
      const ultima = movimentacoes[movimentacoes.length - 1];
      console.log(`Movimentação #${ultima.id} registrada.`);
      console.log(`Estoque final de ${produto.descricaoProduto}: ${saldo}`);
    } catch (erro) {
      console.log(erro instanceof Error ? erro.message : "Erro ao lançar movimentação.");
    }
  }

  rl.close();
  listarEstoque();
}

main();
