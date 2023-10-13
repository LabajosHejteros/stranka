const express = require('express'); // Import frameworku Express
const app = express(); // Vytvoření instance aplikace Express
const port = 3000; // Port, na kterém server běží


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const path = require('path'); // Import knihovny path pro práci s cestami k souborům
const ejs = require('ejs'); // Import šablony EJS pro renderování HTML


app.set('view engine', 'ejs'); // Nastavuje templating engine na EJS (Embedded JavaScript).
app.set('views', path.join(__dirname, 'views')); //  Nastavuje cestu pro hledání šablon (views).

// Spuštění serveru na zvoleném portu
app.listen(port, () => {
    console.log(`Server běží na portu ${port}`);
  });



app.get('/menu', (req, res) => { 
  res.render('menu'); // menu.ejs
});


//git add -A
//git commit -m "co jsem udělal"
//git push -u origin main