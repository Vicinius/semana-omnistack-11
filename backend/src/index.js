const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

/* 

*Rota/Recurso:


*Métodos http: 
Get: buscar/listar uma informação do back-end
Post: criar uma informação no back-end
Put: alterar uma informação no back-end
Delete: deletar uma informação no back-end

Tipos de parâmetros:

Query: Parâmetros nomeados, enviados na rota
após "?" (filtros, paginação...) users=?, usar 
& para agrupar parâmetros
Route Params: parâmetros utilizados para identificar recursos
Request Body: Corpo da requisição

*Banco de dados relacionais: MySQL, SQLite, Oracle
Microsoft SQL Server.
Não relacionais: MongoDB, CouchDB, etc...

Driver: SELECT * FROM users
Query Builder: table('users').select('*').where()

*/

 