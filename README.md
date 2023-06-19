# TCP File System (Client and Server)

# Exemplo de uso

Execute o servidor:
```
npm --prefix packages/server install;
npm --prefix packages/server run start:dev;
```

Compile e execute o cliente:
```
npm --prefix packages/client install
node packages/client/build/index.js help
node packages/client/build/index.js --version
node packages/client/build/index.js ls
node packages/client/build/index.js mkdir example
node packages/client/build/index.js rm example
node packages/client/build/index.js save
node packages/client/build/index.js save <complete-path-to-file> <path-to-save.extension>
```

