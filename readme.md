# Desafio Target Sistemas

![Target Sistemas Logo](./logo_target.png)

Pré-requisito: Node.js instalado e digite `npm install` no terminal.

## 1 Programa para cálculo de comissão

[Veja o código do desafio 1](./desafios/1/index.ts)

- Vendas abaixo de R$100,00 não geram comissão
- Vendas abaixo de R$500,00 geram 1% de comissão
- A partir de R$500,00 geram 5% de comissão

```json
{
  "vendas": [
    { "vendedor": "João Silva", "valor": 90 },
    { "vendedor": "João Silva", "valor": 500.1 },
    { "vendedor": "Maria Souza", "valor": 2100.4 }
  ]
}
```

```bash
npx tsx desafios/1/index.ts
```

O programa lê `desafios/1/vendas.json` e imprime o total vendido e a comissão de cada vendedor.

## 2 Programa para lançar movimentações de estoque

[Veja o código do desafio 2](./desafios/2/index.ts)

- Um número identificador único
- Uma descrição para identificar o tipo da movimentação realizada

```json
{
  "estoque": [
    {
      "codigoProduto": 101,
      "descricaoProduto": "Caneta Azul",
      "estoque": 150
    }
  ]
}
```

```bash
npx tsx desafios/2/index.ts
```

Informe o código do produto, a descrição da movimentação e a quantidade. Quantidade positiva dá entrada; negativa dá saída. Deixe o código em branco para sair.

## 3 Programa para calcular juros a partir da data e do valor

[Veja o código do desafio 3](./desafios/3/index.ts)

Multa de 2,5% ao dia sobre o valor original, contada a partir da data de vencimento até a data de hoje. Se a data ainda não venceu, os juros são R$ 0,00.

```bash
npx tsx desafios/3/index.ts
```

O programa pede dois dados:

1. **Valor** — use ponto ou vírgula (ex: `1000` ou `1500,50`)
2. **Data de vencimento** — no formato `dd/mm/aaaa` (ex: `01/10/2026`)

Exemplo de uso:

```text
Valor: 1000
Data de vencimento (dd/mm/aaaa): 01/10/2026
```

Saída esperada (com 7 dias de atraso):

```text
Dias em atraso: 7
Juros (2,5% ao dia): R$ 175,00
Valor original: R$ 1.000,00
Valor atualizado: R$ 1.175,00
```
