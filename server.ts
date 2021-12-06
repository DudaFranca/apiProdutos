const express = require('express')
const app = express()

app.use(express.json())

var Sequelize = require('sequelize'); // Cria uma variavel e atribui a ela o valor do sequelize
// Cria a variavel connection e areibui o Sequelize com as informações do banco
var connection = new Sequelize('crud_protudos', 'root', '', {  // var connection = new Sequelize('nome_do_banco', 'usuario', 'senha', {
    host: 'localhost', // host: 'local_onde_o_servidor_está_rodando
    dialect: 'mysql' // dialect: 'banco de dados que está sendo usado'
})
var conexao = connection.authenticate() // Cria uma variavel para conexão e iguala ela a conexão com o banco. connection = variavel com as informações do banco. authenticate() = função que faz a conexão com o banco 
    .then(function() { // Varifica se a conexão está ok
        console.log('Estabelecida conexão com o banco de dados');
    })
    .catch(function(erro) { // Varifica se a conexão deu erro
        console.log('Erros ao estabelecer a conexão com banco de dados');
    });

// Cria a tabela no banco e atribui ela a uma variavel
var Produtos = connection.define('produtos', { // variavel_que_quarda_os_valores_da_tabela = variavel_com_informações_do_banco.função_que_define_a_tebela('nome_da_tabela')
    nome: Sequelize.STRING, // nome_da_coluna: Sequelize.TIPO (String, int, text)
    descricao: Sequelize.TEXT,
    preco: Sequelize.STRING,
    categoria: Sequelize.STRING
})

// Conteudo a ser salvo
connection.sync().then(function() {
    Produtos.findOrCreate({ // Seleciona a tabela produtos verifica se as informações que ele deseja criar já está no banco. Se sim, ele passa direto sem salvar. Se não, ele cria
        where: { 
            nome:  'Livro', // Valor à ser atribuido as colunas
            descricao: 'Livro infantil',
            preco: 10,
            categoria: 'livro',
        }
    })
}).catch(() => {
    console.log('Erro'); // Se ele tiver algum problema com a tabela dá erro
})

connection.sync().then(function(){
    Produtos.findAll().then(function(produtos){   // Olha tudo que está cadastrado na tabela produtos     
        console.log('============= Produtos =============');
        produtos.forEach(produto => {
            console.log("Nome: " + produto.nome);
            console.log("Descrição: " + produto.descricao);
            console.log("Preço: " + produto.preco);
            console.log("Categoria: " + produto.categoria);
            console.log('_________________________________________');
            
        });
    });
                //   {where: {categoria: 'coisa', preco: 20}} -> filtrar 2 (filtra por 2 colunas)
    Produtos.findAll({where: {id: [1, 3]}}).then(function(produtos){    // Olha o que está na tabela produtos e filtra por id  
        console.log('============= Filtro Categoria =============');
        produtos.forEach(produto => {
            console.log("Nome: " + produto.nome);
            console.log("Descrição: " + produto.descricao);
            console.log("Preço: " + produto.preco);
            console.log("Categoria: " + produto.categoria);
            console.log('_________________________________________');
        });
    });
    Produtos.findByPk(25).then(function(produtos){       // filtra pela chave primaria  
        console.log('============= Filtro PK =============');
            console.log("Nome: " + produtos.nome);
            console.log("Descrição: " + produtos.descricao);
            console.log("Preço: " + produtos.preco);
            console.log("Categoria: " + produtos.categoria);
        console.log('_________________________________________');
    });

    // ESSE EU NÃO CONSEGUI FAZER, MAS TBM É UM FILTRO
    // Produtos.findAndCountAll({where: {nome: 'teste 1'}}).then(function(produtos){  
    //     console.log(produtos.nome);
             
    //     console.log('============= Filtro Categoria =============');
    //     produtos.forEach(produto => {
    //         console.log("Nome: " + produto.nome);
    //         console.log("Descrição: " + produto.descricao);
    //         console.log("Preço: " + produto.preco);
    //         console.log("Categoria: " + produto.categoria);
    //         console.log('_________________________________________');
    //     });
    // });
});
app.listen(3333, () => console.log("Servidor executando na porta 3333"))
