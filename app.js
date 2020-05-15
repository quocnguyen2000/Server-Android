const express = require('express');
const mongoose = require('mongoose');
const adminRoute = require('./routes/routes.js');
const app = express();
const API = require('./routes/API.js');

app.use(API);
app.use(adminRoute);

app.use(express.static('uploads'));
app.use(express.static('public'));


mongoose.set('useCreateIndex', true);

// app.listen(process.env.PORT || 4000, () => {});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Chạy app với địa chỉ localhost:${PORT}`));

//connect to mongodb
mongoose.connect(
    'mongodb+srv://PS10377_BaiTest:PS10377@cluster0-teyzg.gcp.mongodb.net/test?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => {
        if (err) {
            console.log('Can not connect to mongodb, because ' + err);
        } else {
            console.log('Connect to mongodb successful');
        }
    }
);

//cấu hình handlebars
const expressHbs = require('express-handlebars');
app.engine(
    '.hbs',
    expressHbs({
        defaultLayout: '',
    })
);
app.set('view engine', '.hbs');

app.get('/login',(req,res)=>{
    res.render('SignIn');
});
app.get('/register',(req,res)=>{
    res.render('SignUp');
});
app.get('/tables',(req,res)=>{
    res.render('tables');
});
app.get('/settings',(req,res)=>{
    res.render('settings');
});
app.get('/category',(req,res)=>{
    res.render('category');
});
app.get('/addNhanVien',(req,res)=>{
    res.render('addNhanVien');
});


