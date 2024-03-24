'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const expressHandlebars = require('express-handlebars');
const { route } = require('./routes/indexRouter');

//cau hinh public static folder
app.use(express.static(__dirname + '/public'));

//cau hinh su dung express-handlebars
app.engine('hbs', expressHandlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));
app.set('view engine', 'hbs');
// Error: ENOENT: no such file or directory, open '/Users/cps/Downloads/Git_repo/ptudw-21880291views/layouts/layout.hbs' 
// lỗi do thiếu /views

//routes
app.use('/', require('./routes/indexRouter'));
app.use('/products', require('./routes/productsRouter'));

app.use ((req, res, next) => {
    res.status(404).render('error',{ message:'File not Found!'});
})

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).render('error', { message:'Internal Server Error!'});
})
// khoi dong web server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
