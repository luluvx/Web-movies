module.exports = app => {
    require('./home.routes')(app);
   require('./person.routes')(app);
    require('./movie.routes')(app);
}