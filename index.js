const express = require('express'); // Import frameworku Express
const app = express(); // Vytvoření instance aplikace Express
const port = 3000; // Port, na kterém server běží
const mysql = require('mysql');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const path = require('path'); // Import knihovny path pro práci s cestami k souborům
const ejs = require('ejs'); // Import šablony EJS pro renderování HTML
const { error } = require('console');

const db = mysql.createConnection({
  host: '192.168.1.161',
  user: 'filip.labaj',
  password: 'Labajos77',
  database: 'filip.labaj',
  port: 3001 

});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
  // Zde zůstává kontrola přihlašovacích údajů, jak byla uvedena dříve
});

app.post('/register ', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(req.body.username)

  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, result) => {
    if (err) throw err;
    res.send('Registrace úspěšná');
    // Můžete přesměrovat na jinou stránku nebo provést jinou akci po úspěšné registraci
  });
});

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'styles.css')));



app.set('view engine', 'ejs'); // Nastavuje templating engine na EJS (Embedded JavaScript).
app.set('views', path.join(__dirname, 'views')); //  Nastavuje cestu pro hledání šablon (views).
app.use(express.static(path.join(__dirname, 'images')));

// Spuštění serveru na zvoleném portu
app.listen(port, () => {
    console.log(`Server běží na portu ${port}`);
});

app.get('/menu', (req, res) => { 
  res.render('menu'); // menu.ejs
});

//svg
app.get('/svg', (req, res) => {
  const queryPromise = new Promise((resolve, reject) => {
    db.query('SELECT svg_data, style FROM svg_data', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

  queryPromise.then((results) => {
    const svgDataArray = results.map(result => result.svg_data);
    const svgSTYLEArray = results.map(result => result.style);

    res.render('svg.ejs', { svgDataArray, svgSTYLEArray });
  }).catch((error) => {
    throw error;
  });
});

//ROUTA trimesice
app.get('/3month', (req, res) => {

  res.render("3month",{res})
})      
app.post('/3month', function (request, response, next) {
 
  // SQL dotaz pro vložení dat do databáze
  var sql = `INSERT INTO users (predplatne, telefon, email) VALUES ('${request.body.predplatne}','${request.body.telefon}','${request.body.email}')`;
 
  db.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
    response.redirect('/menu'); // Přesměrování na jinou stránku
  });
  
  
})





//git add -A
//git commit -m "co jsem udělal"
//git push -u origin main