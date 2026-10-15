# Portal MingmingNepjune: como funciona e como configurar

## O que tem aqui

```
index.html        → o site
obrigado.html     → página "edit enviado" (depois do formulário)
admin/            → painel de administração (abre em SEU-SITE/admin)
conteudo/         → todo o conteúdo em arquivos (o painel edita estes arquivos)
  site.json, serie.json, juntas.json
  perfis/mingming.json, nepjune.json
  noticias/*.json   (uma notícia por arquivo)
  edits/*.json      (um edit por arquivo)
img/              → fotos da faixa do início (img/fotos), ícones e uploads do painel (img/uploads)
build.js          → junta o conteúdo em dados.json (e dados.js) a cada publicação
dados.js          → cópia do conteúdo para conferir o site abrindo o index.html no computador
netlify.toml      → diz ao Netlify para rodar o build.js
```

Você **não precisa mais editar HTML**. Tudo é feito no painel.

---

## Passo a passo (só uma vez)

### 1. Colocar os arquivos no repositório
Apague os arquivos antigos do repositório do site e coloque estes no lugar
(mantendo as pastas). Faça o commit/push. O Netlify vai publicar sozinho.

> Se o seu repositório usa a branch `master` em vez de `main`, abra
> `admin/config.yml` e troque a linha `branch: main` para `branch: master`.

### 2. Ligar o login (Netlify Identity)
No painel do Netlify, no seu site:
1. **Integrations** (ou *Site configuration*) → procure **Identity** → **Enable Identity**.
2. Em **Identity → Registration**, escolha **Invite only** (só quem você convidar entra).
3. Em **Identity → Services → Git Gateway**, clique **Enable Git Gateway**.
4. Na aba **Identity**, clique **Invite users** e convide o seu e-mail.
5. Abra o e-mail, clique em **Accept the invite**: o site abre e pede para você criar uma senha. Depois disso você cai direto no painel.

### 3. Ativar as notificações do formulário de edits (opcional)
Netlify → **Forms** → você verá o formulário `enviar-edit`.
Em **Form notifications**, adicione o seu e-mail para ser avisada a cada envio.

---

## No dia a dia

- **Painel:** `https://portalmmnp.netlify.app/admin`
- **Notícia nova:** Notícias → *Nova notícia* → preencha → **Salvar**.
  Ela entra como *Rascunho*. Mude para **Pronto** e clique **Publicar**.
  Em 1–2 minutos o site atualiza.
- **Edit enviado por fã:** chega em Netlify → *Forms* (e no seu e-mail).
  Se aprovar, vá em Edits dos fãs → *Novo edit*, cole os dados e publique.
  Se não aprovar, é só apagar o envio no Netlify. Nada entra no site sem você.
- **Bios, fotos, curiosidades:** Perfis → Mingming / Nepjune.
- **Fotos da faixa do início, série, links do Pinterest/YouTube, texto do início:** Série, links e site.
  (Em *Site (geral)* → *Faixa de fotos do início* você adiciona, troca e reordena as fotos.)

O fluxo *Rascunho → Em revisão → Pronto* fica na aba **Fluxo de trabalho**
do painel. Só o que você clicar em **Publicar** vai para o ar.

---

## Trocar uma foto "na mão" (pelo bloco de notas)

Pelo painel é mais fácil, mas dá para fazer direto nos arquivos:

1. Salve a foto dentro de `img/fotos/` (ex.: `img/fotos/poster-juliet.jpg`).
   Use nomes sem espaço nem acento.
2. Abra o arquivo de conteúdo no Bloco de Notas (botão direito → *Abrir com*):
   - foto do pôster da série → `conteudo/serie.json`, linha `"capa"`
   - fotos da faixa do início → `conteudo/site.json`, lista `"fotos"`
   - foto de cada atriz → `conteudo/perfis/mingming.json` ou `nepjune.json`, linha `"foto"`
3. Troque só o que está entre aspas, mantendo a barra no começo:
   `"capa": "/img/fotos/poster-juliet.jpg",`
4. Salve (Ctrl+S) e envie para o repositório. O site atualiza sozinho.

Para conferir no computador antes de enviar, o `index.html` usa o `dados.js`,
então faça a mesma troca nele também (Ctrl+F pelo nome da foto antiga).

Se a foto do pôster já tiver o título escrito (pôster oficial), deixe
`"capaTemTitulo": true` no `serie.json` para o site não escrever o nome por cima.

---

## Dúvidas comuns

- **Abri o index.html no computador para conferir**: funciona, mas ele mostra o
  conteúdo do `dados.js` que veio junto, não o que você editou no painel.
  O que vale é o endereço do site (atualiza sozinho a cada publicação).
- **Fiz uma mudança e o site não mudou**: veja em Netlify → *Deploys* se a
  publicação terminou (leva ~1 minuto). Se der erro, o log mostra o motivo.
- **Esqueci a senha**: na tela de login do painel, *Forgot password?*.
