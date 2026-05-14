
# 🐶 Best Friend

Aplicação web em Next.js para listar raças de cachorros, pesquisar com tolerância a erro usando Fuse.js, filtrar resultados e abrir uma página de detalhes de cada raça.

## ⚙️ Decisões Técnicas
### 🌎 Uso exclusivo do idioma inglês

A aplicação foi desenvolvida utilizando apenas dados em inglês porque a API utilizada, na versão gratuita, não disponibiliza suporte para tradução automática dos conteúdos para PT-BR.
Além disso, manter os dados no idioma original evitou inconsistências e reduziu a necessidade de tratamentos adicionais no backend.

### 🖼️ Não utilização de imagens das raças

O projeto não utiliza imagens das raças porque o campo `reference_image_id`, responsável por identificar as imagens na API, retornava `null` na maior parte das requisições feitas utilizando o plano gratuito.
Como isso causaria uma experiência inconsistente, foi decidido não depender desse recurso.

### 🔄 Normalização dos dados da API

Os dados retornados pela API possuíam formatos inconsistentes entre as raças, principalmente nos campos de peso, altura e expectativa de vida.
Por isso, foi necessário realizar um processo de normalização para padronizar as informações antes de utilizá-las na aplicação.

#### 📌 Exemplos de inconsistências encontradas:

- Alguns pesos vinham no formato:
--> `Male: 30 - 40; Female: 25 - 35`
- Outros vinham apenas como:
--> `20 - 27`

Para manter um padrão único na interface e facilitar filtros e buscas, foi decidido utilizar apenas os valores principais em formato métrico (`metric`) e extrair apenas uma faixa padronizada dos dados.

### 🧩 Separação entre dados da API e modelo interno

Foi criada uma tipagem específica para os dados recebidos da API antes de convertê-los para o modelo utilizado pela aplicação.
Isso permitiu:

- ✅ maior controle sobre os dados recebidos;
- ✅ redução de inconsistências;
- ✅ melhor manutenção do código;
- ✅ facilidade para aplicar normalizações e validações.

### ⚡ Estratégia de cache

Foi implementado cache nas requisições utilizando revalidação periódica para evitar múltiplas chamadas desnecessárias à API externa.
Essa abordagem melhora:

- 🚀 desempenho;
- ⏱️ tempo de carregamento;
- 😊 experiência do usuário;
- 💸 consumo da API gratuita.

### 🔍 Busca tolerante a erros

A busca foi planejada para ser mais amigável ao usuário, tolerando pequenas diferenças de digitação.
Isso melhora a experiência de pesquisa e reduz falhas causadas por erros simples ao escrever o nome das raças.

### 🎯 Filtros simplificados

Os filtros foram limitados a informações mais relevantes para navegação:

- 📏 porte;
- ⌛ expectativa de vida.

A decisão de não adicionar ordenações excessivas foi feita para manter a interface simples e objetiva.

## 📋 Requisitos

- ✅ Node.js instalado.
- ✅ npm instalado junto com o Node.js.
- ✅ Chave da API de cachorros.

## 🚀 Como Rodar Localmente

### 1️⃣ Clone o repositorio:

```bash
git clone https://github.com/kakeiko/Best-friend-Front
cd best-friend
```

### 2️⃣ Instale as dependencias:

```bash
npm install
```

### 3️⃣ Crie um arquivo `.env` na raiz do projeto com as variaveis abaixo:

```env
API_LINK_INFO=<url-da-api-de-racas>
API_KEY=<sua-chave-da-api>
```

Exemplo de `API_LINK_INFO`:

```env
API_LINK_INFO=https://api.thedogapi.com/v1/breeds
```

### 4️⃣ Rode o servidor de desenvolvimento:

```bash
npm run dev
```

### 5️⃣ Abra o navegador em:

```text
http://localhost:3000
```
