# Deploy na Vercel

O projeto está configurado para ser importado pela raiz do repositório. O arquivo `vercel.json` instala e compila o app React que está em `frontend/`, publica `frontend/build` e mantém as rotas do `BrowserRouter` funcionando após recarregar a página.

## Pelo painel da Vercel

1. Envie esta versão para um repositório Git.
2. Na Vercel, escolha **Add New > Project** e importe o repositório.
3. Mantenha **Root Directory** na raiz do repositório.
4. Não adicione variáveis de ambiente: esta versão é totalmente estática.
5. Clique em **Deploy**. Os comandos e o diretório de saída serão lidos de `vercel.json`.

## Validação local equivalente

```powershell
corepack yarn --cwd frontend install --frozen-lockfile
corepack yarn --cwd frontend build
```

O conteúdo pronto para publicação será gerado em `frontend/build`.

## Observações

- A newsletter é demonstrativa e não envia nem armazena dados.
- O checkout e o WhatsApp ainda usam conteúdo ilustrativo; substitua o número placeholder antes da publicação comercial.
- As rotas `/blog`, `/assinaturas`, `/nosso-proposito` e `/produtos/:slug` usam fallback para `index.html` na Vercel.
