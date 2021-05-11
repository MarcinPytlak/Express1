const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
app.engine('handlebars', hbs({extname :'handlebars', layoutsDir: './views', defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.post('/contact/send-message', (req, res) => {
    const { author, sender, title, picture, message } = req.body;
    console.log(picture);
    if(author && sender && title && picture && message) {
        res.render('contact', { pictureName: req.body.picture, isSent: true });
    }
    else {
        res.render('contact', { isError: true });
    }
  });

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});