// Junta todos os arquivos de conteudo/ em um único dados.json que o site carrega.
// O Netlify roda este script a cada publicação (ver netlify.toml). Não precisa de dependências.
const fs = require("fs");
const path = require("path");
const raiz = path.join(__dirname, "conteudo");
const ler = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const lerPasta = (nome) => {
  const dir = path.join(raiz, nome);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => ler(path.join(dir, f)));
};
const dados = {
  site: ler(path.join(raiz, "site.json")),
  serie: ler(path.join(raiz, "serie.json")),
  juntas: ler(path.join(raiz, "juntas.json")).links || [],
  perfis: lerPasta("perfis").sort((a, b) => (a.cor === "azul" ? -1 : 1)),
  edits: lerPasta("edits").sort((a, b) => (b.data || "").localeCompare(a.data || "")),
  noticias: lerPasta("noticias").sort((a, b) => (b.data || "").localeCompare(a.data || "")),
  geradoEm: new Date().toISOString()
};
fs.writeFileSync(path.join(__dirname, "dados.json"), JSON.stringify(dados));
// cópia em JS para conferir o site abrindo o index.html direto no computador
fs.writeFileSync(path.join(__dirname, "dados.js"), "window.DADOS=" + JSON.stringify(dados) + ";");
console.log(`dados.json gerado: ${dados.noticias.length} notícias, ${dados.edits.length} edits, ${dados.perfis.length} perfis`);
