const db = require('./db');

const lojas = [
  {
    nome: 'Godfather: Trajes e Acessórios Masculinos',
    logradouro: 'Rua José de Alencar',
    bairro: 'Boa Vista',
    cidade: 'Recife',
    estado: 'Pernambuco',
    telefone: '(81) 98971-9121',
    cep: '50070-030',
  },
  {
    nome: 'Rafael Autopeças',
    logradouro: 'Rua Pedro da Cocada',
    bairro: 'Nova Descoberta',
    cidade: 'Recife',
    estado: 'Pernambuco',
    telefone: '(81) 96344-9076',
    cep: '52191-230',
  },
  {
    nome: 'Casa do Encanador',
    logradouro: 'Avenida Ver. Otacílio Azevedo',
    bairro: 'Vasco da Gama',
    cidade: 'Recife',
    estado: 'Pernambuco',
    telefone: '(81) 98337-7514',
    cep: '52081-550',
  },
  {
    nome: 'Lojão das Vidraças',
    logradouro: 'Avenida Colibri',
    bairro: 'Maranguape I',
    cidade: 'Paulista',
    estado: 'Pernambuco',
    telefone: '(81) 98765-3422',
    cep: '53441-360',
},
{
    nome: 'Cassiopeia: Moda Feminina',
    logradouro: 'Rua Capivara',
    bairro: 'Jatobá',
    cidade: 'Olinda',
    estado: 'Pernambuco',
    telefone: '(81) 98125-7465',
    cep: '53250-110',
},
{
    nome: 'Whinchesters: Ocultismo e Sobrenatural',
    logradouro: 'Avenida Sen. Salgado Filho',
    bairro: 'Candelária',
    cidade: 'Natal',
    estado: 'Rio Grande do Norte',
    telefone: '(84) 91369-4666',
    cep: '59064-630',
},
{
    nome: 'Panificadora da Bica',
    logradouro: 'Rua Arezzo',
    bairro: 'Agamenon Magalhães',
    cidade: 'Igarassu',
    estado: 'Pernambuco',
    telefone: '(81) 97906-7310',
    cep: '53640-146',
},
{
    nome: 'Sports 10: Produtos Esportivos',
    logradouro: 'Rua Bom Nome',
    bairro: 'Ibura',
    cidade: 'Recife',
    estado: 'Pernambuco',
    telefone: '(81) 91017-0709',
    cep: '51230-160',
},
{
    nome: 'Marin Nails',
    logradouro: 'Rua Ananias Lacerda de Andrade',
    bairro: 'Planalto',
    cidade: 'Abreu e Lima',
    estado: 'Pernambuco',
    telefone: '(81) 99363-1010',
    cep: '53550-540',
},
{
    nome: 'Pousada Sosseguin',
    logradouro: 'Avenida Bela Vista',
    bairro: 'Santa Tereza',
    cidade: 'Santa Cruz do Capibaribe',
    estado: 'Pernambuco',
    telefone: '(81) 98909-2014',
    cep: '55190-000',
}
];

const insertStore = (store) => {
    const { nome, logradouro, bairro, cidade, estado, telefone, cep, latitude, longitude } = store;

    const query = `INSERT INTO lojas (nome, logradouro, bairro, cidade, estado, telefone, cep, latitude, longitude) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(query, [nome, logradouro, bairro, cidade, estado, telefone, cep, latitude, longitude], function(err) {
        if (err) {
            console.error("Erro ao inserir loja:", err.message);
        } 
        
        else {
            console.log(`Loja inserida com sucesso! ID: ${this.lastID}`);
        }
    });
};

lojas.forEach(insertStore);