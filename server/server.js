const express = require('express');
const cors = require('cors');
const data = require('./data.json');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

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

const findProduct = (id) => {
   return data.products.find((product) => product.id === id);
}

const filterProducts = (queryParams) => {
   let filteredProducts = data.products;
   if(!queryParams) return filterProducts;
   if(typeof queryParams === 'object') {
      for(let key in queryParams) {
         if(queryParams.hasOwnProperty(key)) {
            switch(key) {
               case 'q':
                  filteredProducts = filteredProducts.filter( (product) => product.name.toLowerCase().includes(queryParams[key].toLowerCase()));
               break;
               case 'category':
                  filteredProducts = filteredProducts.filter( (product) => product.category === queryParams[key]);
               break;
               case 'minPrice':
                  filteredProducts = filteredProducts.filter( (product) => product.price >= queryParams[key]);
               break;
               case 'maxPrice':
                  filteredProducts = filteredProducts.filter( (product) => product.price <= queryParams[key]);
               break;
               case 'color':
                  if(typeof queryParams[key] === 'object') {
                     filteredProducts = filteredProducts.filter( (product) => {
                        for(let color of queryParams[key]) {
                           if(product.data.colors.indexOf(color) !== -1) return true;
                        }
                        return false;
                     });
                  } else {
                     filteredProducts = filteredProducts.filter( (product) => product.data.colors.indexOf(queryParams[key]) !== -1);
                  }
               break;
            }
         }
      }
   }

   return filteredProducts;
};

app.get('/products', (req, res) => {
   const filteredProducts = filterProducts(req.query);
   console.log(req.query);
   if(filteredProducts.length === 0) {
      res.status(400).send(`Products not found`);
   } else {
      res.json(filteredProducts);
   }
})

app.get('/products/:id', (req, res) => {
   const currentParams = req.params;
   const currentProduct = data.products.find((item) => item.id === currentParams.id);

   if(currentProduct) {
      res.json(currentProduct);
   } else {
      res.status(400).send(`Product with id ${currentParams.id} is not found`);
   }
});

app.get('/products/:id/amount', (req, res) => {
   const params = req.params;
   const product = findProduct(params.id);

   if(product) {
      res.json(product.amount);
   } else {
      res.status(400).send(`Product with id ${params.id} does not exist`);
   }
});

app.post('/cart', (req, res) => {
   try {
      //req.body = object(personalData, address, products)

      const dataFileRead = fs.readFileSync(path.join(__dirname, 'data.json') ,'utf8');
      const data = JSON.parse(dataFileRead);
      data.cart.concat(req.body);

      req.body.products.forEach((el) => {
         const currentProduct = findProduct(el.id);
      });
      fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(data));
   } catch(err) {
      console.log('Error')
   }
});

const startServer = (port) => {
   console.log('Server is working on port ' + port);
   app.listen(port);
};

startServer(4800);