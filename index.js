'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const expressHandlebars = require('express-handlebars');

//cau hinh public static folder
app.use(express.static(__dirname + '/public'));

//cau hinh su dung express-handlebars
app.engine('hbs', expressHandlebars.engine ({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'layout'
}));
app.set('view engine','hbs');
// Error: ENOENT: no such file or directory, open '/Users/cps/Downloads/Git_repo/ptudw-21880291views/layouts/layout.hbs' 
// lỗi do thiếu /views

//routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/:page', (req, res) => {
    res.render(req.params.page);
});
//
// app.set('view', __dirname + '/view');

// khoi dong web server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
