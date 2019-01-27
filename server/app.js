let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
// let session = require('express-session');
const joi = require('joi');
app.use(bodyParser.json());
let path = require('path');
allBook = require('./model/book');
User = require('./model/user');

//connect to Mongoose
mongoose.connect('mongodb://localhost/bookproject', { useNewUrlParser: true })
app.use(express.static(path.join(__dirname, '../client')))
app.use(bodyParser.urlencoded({ extended: true }));

function user(req, res, next) {
  // console.log(req.body.name);
  const schema = joi.object().keys({
    name: joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required()
  })
  let check = joi.validate({ name: req.body.name }, schema)
  if (check.error != null) {
    console.log('Invalid userName');
    res.sendStatus(400).end();
  }
  else {
    User.checkUser(req.body.name)
      .then(data => {
        if (data == null) {
          console.log("just wait!! Your registration is processing");
          next();
        }
        else {
          res.send("User already exist").end()
        }
      }).catch(err => {
        res.sendStatus(500);
      })
  }
}

app.post('/signup', user, (req, res) => {
  User.signup(req.body.name)
    .then((result) => {
      res.json(result.name)
    }).catch(err => {
      res.sendStatus(500);
    })
});
app.post('/login', (req, res)=>{
  console.log(typeof name);
  console.log(req.body.name)
  User.checkUser(req.body.name)
  .then(data => {
    if (data.name !== req.body.name) {
      // console.log('name-',data.name)
      res.send("sign up first then login");
    }
    else {
      
      res.json(data.name)
    }
  }).catch(err => {
    res.sendStatus(500);
  })

})

app.use('/api', (req, res, next) => {
  User.checkUser(req.headers.name)
    .then(data => {
      if (data !== null) {
        next();
      }
      else {
        res.send("User is not exist").end()
      }
    }).catch(err => {
      res.sendStatus(500);
    })
});

//Get all books
app.get('/api/books', (req, res) => {
  // console.log(req.headers.name);
  allBook.getBooks()
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.sendStatus(500);
    })

});

//Get book by id
app.get('/api/books/:id', (req, res) => {
  allBook.getBookById(req.params.id)
    .then(result => {
      res.status(200).json(result);
    }).catch(err => {
      res.sendStatus(500);
    })
});


app.get('/api/list/:listType', (req, res) => {
  User.getList(req.headers.name, req.params.listType)
    .then(result => {
      res.status(200).json(result);
    }).catch(err => {
      res.sendStatus(500);
    })
})

app.post('/api/list/:listType', (req, res) => {
  User.addList(req.headers.name, req.params.listType, req.body.isbn)
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.sendStatus(500);
    })
})

app.delete('/api/list/:listType', (req, res) => {
  // console.log('list name---', req.params.listType)
  // console.log(typeof name);
  // console.log('name---', req.headers.name)
  // console.log('isbn no---', req.body.isbn)

  User.deleteList(req.headers.name, req.params.listType, req.body.isbn)
    .then(() => {
      res.sendStatus(200);
    }).catch(err => {
      res.sendStatus(500);
    })
})

app.listen('3000', () => {
  console.log("Server started on port 3000");
})