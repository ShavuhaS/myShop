const express = require('express');
const app = express();
const data = require('./data.json');

app.get('/products', (req, res) => {
   const category = req.query.category;
   if(category) {
      const filteredProducts = data.products.filter((product) => {
         return product.category === category;
      });
      if(filteredProducts.length === 0) {
         res.status(400).send(`There is no products with category ${category}`);
      } else {
         res.json(JSON.stringify(filteredProducts));
      }
   } else {
      res.json(JSON.stringify(data.products));
   }
})

app.get('/products/:id', (req, res) => {
   const currentParams = req.params;
   const currentProduct = data.products.find((item) => item.id === currentParams.id);

   if(currentProduct) {
      res.json(JSON.stringify(currentProduct));
   } else {
      res.status(400).send(`Product with id ${currentParams.id} is not found`);
   }
});

app.get('/news', (req, res) => {
   res.json(data.news);
})

app.get('/news/:id', (req, res) => {
   const params = req.params;
   const currentNews = data.news.find(news => {
      return news.id == params.id;
   })

   if(currentNews) {
      res.json(JSON.stringify(currentNews));
   } else {
      res.status(400).send('News with id ' + params.id + ' is not found');
   }
})

const startServer = (port) => {
   console.log('Server is working on port ' + port);
   app.listen(port);
};

startServer(4800);