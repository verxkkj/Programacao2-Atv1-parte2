import { ToDo, Item } from "./core.ts";

const file = process.argv[2];
const command = process.argv[3];

if (!file) {
  console.error("Forneça o arquivo.");
  process.exit(1);
}

const todo = new ToDo(file);

if (command === "add") {
  const description = process.argv[4];

  if (!description) {
    console.error("Informe a descrição.");
    process.exit(1);
  }

  const item = new Item(description);
  await todo.addItem(item);

  console.log("Item adicionado.");
  process.exit(0);
}

if (command === "list") {
  const items = await todo.getItems();

  if (items.length === 0) {
    console.log("Lista vazia.");
    process.exit(0);
  }

  items.forEach((item, index) => {
    const status = item.isCompleted() ? "[✔]" : "[ ]";
    console.log(`${index}: ${status} ${item.toJSON().description}`);
  });

  process.exit(0);
}

if (command === "update") {
  const index = Number(process.argv[4]);
  const description = process.argv[5];

  if (isNaN(index) || !description) {
    console.error("Use: update <index> <descrição>");
    process.exit(1);
  }

  const newItem = new Item(description);
  await todo.updateItem(index, newItem);

  console.log("Item atualizado.");
  process.exit(0);
}

if (command === "remove") {
  const index = Number(process.argv[4]);

  if (isNaN(index)) {
    console.error("Use: remove <index>");
    process.exit(1);
  }

  await todo.removeItem(index);

  console.log("Item removido.");
  process.exit(0);
}

if (command === "complete") {
  const index = Number(process.argv[4]);

  if (isNaN(index)) {
    console.error("Use: complete <index>");
    process.exit(1);
  }

  await todo.markItemAsCompleted(index);

  console.log("Item concluído.");
  process.exit(0);
}

if (command === "pending") {
  const index = Number(process.argv[4]);

  if (isNaN(index)) {
    console.error("Use: pending <index>");
    process.exit(1);
  }

  await todo.markItemAsPending(index);

  console.log("Item marcado como pendente.");
  process.exit(0);
}

if (command === "find") {
  const text = process.argv[4];

  if (!text) {
    console.error("Use: find <texto>");
    process.exit(1);
  }

  const items = await todo.findItemByDescription(text);

  if (items.length === 0) {
    console.log("Nenhum item encontrado.");
    process.exit(0);
  }

  items.forEach((item, index) => {
    const status = item.isCompleted() ? "[✔]" : "[ ]";
    console.log(`${index}: ${status} ${item.toJSON().description}`);
  });

  process.exit(0);
}

console.error("Comando inválido.");
process.exit(1);