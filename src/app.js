import express from 'express';  
import path from 'path';

const app = express();

app.set('views', path.resolve('views'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('home');
});

app.use(express.static(path.resolve('public')));

export default app; 