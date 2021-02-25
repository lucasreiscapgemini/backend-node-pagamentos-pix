const app = require('./app');

app.listen(process.env.PORT || 3000, () => { console.log(`Executando servidor na porta: ${process.env.PORT || 3000}`)})