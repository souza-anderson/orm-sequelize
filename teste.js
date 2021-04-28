const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('sequelize-teste', 'root', '', {
  dialect: 'mysql',
  host: '127.0.0.1'
})

const Pessoa = sequelize.define('Pessoa', {
  nome: DataTypes.STRING,
  nascimento: DataTypes.DATE
})

const Usuario = sequelize.define('Usuario', {
  usuario: DataTypes.STRING,
  senha: DataTypes.STRING
})

const Projeto = sequelize.define('Projeto', {
  nome: DataTypes.STRING
})

Pessoa.hasOne(Usuario)
Usuario.belongsTo(Pessoa)
Pessoa.hasMany(Projeto)
Projeto.belongsTo(Pessoa)

testeDB =  async() => {
  await sequelize.sync()

  const pessoa = await Pessoa.create({
    nome: 'Anderson Souza',
    nascimento: '1991-07-31'
  })

  const usuario = await Usuario.create({
    usuario: 'anderson.souza',
    senha: '123456'
  })

  usuario.setPessoa(pessoa)

  const usuarios = await Usuario.findAll({ 
    include: [
      { model: Pessoa }
    ] 
  })
  // const pessoas = await Promise.all(usuarios.map( async u => {
  //     return await u.getPessoa()
  // }))
  console.log(usuarios)
}
testeDB()

