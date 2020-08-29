const createError = require('http-errors');
const express = require('express');

const bobyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const qrcode = require('qrcode');


// init app
const app = express();

// set the template engine
app.set('view engine', 'ejs');

//fetch data from the reuqest
app.use(bobyParser.json());
app.use(bobyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// loading the Get page
app.get('/',(req, res)=>{
  res.render('qrcode', {data:''});
});

// loading the post page
app.post('/', (req, res)=>{
  console.log(req.body.info);
    qrcode.toDataURL(req.body.info, {errorCorrectionLevel: 'H'}, (err, url)=>{
        console.log(url);
        res.render('qrcode', {data:url});
    })
});

// catch 404 and forward to error handler
app.use((req, res, next)=>{
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//Assign port
const PORT  = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server is Starting on htpp://localhost:${PORT}`));
