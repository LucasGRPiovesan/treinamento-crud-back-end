
# Treinamento Back-End

## Instruções iniciais

Para utilização das dependências configuradas no package.json, execute o comando:
```
// OBS: certifique-se de que está na pasta raiz do projeto
npm install
```

Para subir a aplicação, execute o comando:
```
npm start
```

Configure corretamente a conexão com seu banco de dados local MySQL a no arquivos index.js dentro de routes:
```
const conn = mysql.createConnection({
    host: 'localhost',
    database: 'nome_do_banco',
    user: 'seu_usuario',
    password: 'sua_senha (se houver)'
});
```

## CRUD básico com base no que foi apresentado em treinamento

Listagem de funcionários e dependentes:

```
GET: http://localhost:<porta>/routes/<funcionarios, dependentes>/listar
```

Cadastro de funcionários:

```
POST: http://localhost:<porta>/routes/funcionarios/cadastrar

// Payload (dados) em formato JSON
{
    "nome": nome_do_funcionario
}
```

Cadastro de dependentes:

```
POST: http://localhost:<porta>/routes/dependentes/cadastrar

// Payload (dados) em formato JSON
{
    "id_funcionario": id_funcionario,
    "nome": nome_do_dependente
}
```

Atualização de funcionários:

```
PATCH: http://localhost:<porta>/routes/funcionarios/alterar/<id_funcionario>

// Payload (atualização) em formato JSON
{
    "nome": nome_do_funcionario
}
```

Atualização de dependentes:

```
PATCH: http://localhost:<porta>/routes/dependentes/alterar/<id_dependente>

// Payload (atualização) em formato JSON
{
    "id_funcionario": id_funcionario,
    "nome": nome_do_dependente
}
```

Exclusão de funcionários e dependentes:

```
DELETE: http://localhost:<porta>/routes/<funcionarios, dependentes>/excluir/<id_funcionario, id_dependente>
```
