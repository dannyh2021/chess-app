import express from 'express';
import path from 'path';

// set middleware
const app = express();

const __dirname = path.resolve();

// set port
let port = process.env.PORT;
if (port == null || port == '') {
    port = 3000;
}

// start server
app.listen(port, () => {
    console.log('App listening on port 3000');
});

// send index.html
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/stocks/index.html'));
});

app.get('/main.a5a6ab77e42512e5.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/stocks/main.a5a6ab77e42512e5.js'));
});

app.get('/polyfills.0e091a1864f291df.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/stocks/polyfills.0e091a1864f291df.js'));
});

app.get('/runtime.f98ba85b57538d43.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/stocks/runtime.f98ba85b57538d43.js'))
});