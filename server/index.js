const express = require('express')
const uuid = require('uuid').v4;
const app = express();
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const userDB = require('./db/userqueries');
const cartDB = require('./db/cartqueries');
const passport = require('passport');
const LocalStrategy = require('passport-local');
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}


 // Enable Cross Origin Resource Sharing to all origins by default
app.use(cors());

// Configure local strategy to be use for local login
passport.use(new LocalStrategy(
  { usernameField: 'email' },
   async (email, password, done) => {
     try {
      console.log('inside passport');
       const user =  await userDB.authenticateUser({ email: email, password : password});
       console.log('Local strategy returned true');
       console.log(user);
       return done(null, user);
     } catch(err) {
      console.log('Local strategy returned false');
       return done(err);
     }
   }
 ));
  // Transforms raw string of req.body into JSON
  app.use(bodyParser.json());

// Creates a session
app.use(
  session({  
  
    secret: process.env.SESSION_SECRET || "session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 ,
      secure:false
    },
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

 // Initialize passport
 app.use(passport.initialize());  
 app.use(passport.session());
 
 // Set method to serialize data to store in cookie
 passport.serializeUser((user, done) => {
  console.log('serializing');
  done(null, user.id);
 });
 
 // Set method to deserialize data stored in cookie and attach to req.user
 passport.deserializeUser((id, done) => {
  console.log('deserializing');
  done(null, id);
  // const user = ausers[0].id === id ? users[0] : false; 
 // done(null, user);
 });

 

app.get('/api/auth/logout', (request, response) => {
  request.logout();
  response.redirect('/');
})



 
 /*  Login Endpoint*/
  app.post('/api/auth/login',async  (req, res, next) => {
    console.log('Inside POST /login callback')
    passport.authenticate('local', (err, user, info) => {
      console.log('Inside passport.authenticate() callback');
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      req.login(user,async  (err) => {
        console.log('Inside req.login() callback')
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`);
        
        const userCart = await cartDB.createCartAsync(req.user.id);
        console.log(userCart);
        return res.status(200).send({id : req.user.id,isAuthenticated : true,cart:userCart});
      })
    })(req, res, next);
  })
  /*  Check auth*/
  app.get('/api/authrequired', async (req, res) => {
    console.log('Inside GET /authrequired callback')
    console.log(`User authenticated? ${req.user}`);
    console.log(req.session);
    console.log(`User authenticated? ${(req.session)}`);
    if(req.isAuthenticated()  ) {
      const userCart = await cartDB.createCartAsync(req.user);
      console.log(userCart);
      return res.status(200).send({id : req.user,isAuthenticated : true,cart:userCart});
    } else {
      console.log('invalid');
      res.status(401).send(false);
    }
  })
const userRouter = require('./routes/user');
app.use('/api/users',userRouter);
    
const cartRouter = require('./routes/cart');
app.use('/api/cart',cartRouter);
const productRouter = require('./routes/product');
app.use('/api/products',productRouter);
const orderRouter = require('./routes/order');
app.use('/api/orders',orderRouter);

const swaggerUi = require('swagger-ui-express');
//const yaml = require('js-yaml');
//const fs = require('fs');
//const path = require('path');

// Loading via yml.safeLoad to avoid errors with special characters during processing
//const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(__dirname, './swagger.yml'), 'utf8'));
const swaggerDocument = require('./swagger.json');

  // Serves Swagger API documentation to /docs url
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
  }

  app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})