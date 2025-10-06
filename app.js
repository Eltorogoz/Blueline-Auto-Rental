import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import { setupDatabase, getDbConnection } from './database.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');


setupDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening at port ${port}`);
    });
  })
  .catch(err => console.error("DB setup error:", err));

// ROUTES
// Home page - Kris
app.get("/", (req, res) => { 
  res.render('pages/index', { title: "Blue Line Car Rental" });
});

// About page - Kris
app.get("/about", (req, res) => {
  res.render("pages/about", { title: "About Blue Line" });
});

// Product page - Dez
app.get("/products", (req, res) => {
  getDbConnection()
    .then((db) => db.all('SELECT * FROM products'))
      .then((cars) => {
        res.render('pages/products', { 
          data: cars, 
          title: "Our Vehicles"
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

// Contact page - Dez
app.get("/contact", (req, res) => {
  res.render("pages/contact", { title: "Contact Us" });
});
