# TCP File System (Client and Server)
## Principais Funcionalidades
- Criar um diretório no servidor;
- Remover um diretório servidor;
- Listar os diretórios e arquivos salvos no servidor;
- Enviar um arquivo do cliente para salva-lo no servidor;
- Remover arquivo salvo no servidor;


## Exemplo de uso

### 1. Execute o servidor:
-  Rode o comando abaixo para instalar as dependências do sistema:
```
npm --prefix packages/server install
```
- Rode o comando abaixo para iniciar a execução do servidor:
```
npm --prefix packages/server run start:dev
```

### 2. Compile e execute o cliente:

- Rode o comando abaixo para instalar as dependências do sistema:
```
npm --prefix packages/client install
```
- Rode o comando abaixo para buildar o cliente:
```
npm --prefix packages/client run build
```
## 3. Executar os comandos desejados com a CLI
-  Rode o comando abaixo para listar os comandos disponíveis na CLI:
```
node packages/client/build/index.js help
```
-  Rode o comando abaixo para exibir a versão instalada da CLI:
```
node packages/client/build/index.js --version
```
-  Rode o comando abaixo para listar os diretórios e arquivos criados/salvos no servidor:
```
node packages/client/build/index.js ls  
```
-  Rode o comando abaixo para criar um novo diretório com o nome informado:
```
node packages/client/build/index.js mkdir <path-to-create>
```
-  Rode o comando abaixo para remover o diretório passado como argumento:
```
node packages/client/build/index.js rm <path-to-remove>   
```
-  Rode o comando abaixo para salvar um arquivo do servidor:
```
node packages/client/build/index.js save <complete-path-to-file> <path-to-save.extension>
```

