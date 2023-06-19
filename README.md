# TCP File System (Client and Server)

## Exemplo de uso

Execute o servidor:
```
npm --prefix packages/server install; # Instala as dependências do sistema
npm --prefix packages/server run start:dev; # Inicia a execução do servidor
```

Compile e execute o cliente:
```
npm --prefix packages/client install # Instala as dependências do sistema
npm --prefix packages/client run build # Builda o cliente
node packages/client/build/index.js help # Lista os comandos disponíveis
node packages/client/build/index.js --version # Exibe a versão do CLI
node packages/client/build/index.js ls # Lista os diretórios e arquivos criados/salvos no servidor
node packages/client/build/index.js mkdir <path-to-create> # Cria um novo diretório com o nome informado
node packages/client/build/index.js rm <path-to-remove> # Remove o diretório passado como argumento 
node packages/client/build/index.js save <complete-path-to-file> <path-to-save.extension> # Salva um arquivo do servidor
```

