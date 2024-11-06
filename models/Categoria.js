const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definindo o esquema para 'categorias'
const categoriaSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  preco: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  imagem: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Categoria = mongoose.model("categorias", categoriaSchema);
module.exports = Categoria; // Exportando o modelo
