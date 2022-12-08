const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

const recipes = [
  {
    id: "1",
    title: "Sunday Sauce",
    img: "wie das wohl geht?",
    categories: [123, 123],
    ingredients: ["500g Hack", "100g Tomatenpaste"],
    steps: ["Braten", "würzen mit nelken"],
    comments: [{ userName: "Hans", comment: "Das war gut!" }],
    ratings: [1, 3, 5]
  }
];

const categories = [
  { id: 123, title: "Deutsche Küche", subtitle: "Entdecke deftige, deutsche Gerichte", img: "wie das wohl geht?" }
]

const users = []

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Welcome to my recipe club')
})
// Get all recipes endpoint
app.get('/recipes', (req, res) => {
  res.status(200).json(recipes);
})
// Get all categories endpoint
app.get('/categories', (req, res) => {
  res.status(200).json(categories);
})
// Post to register endpoint
app.post('/register', (req, res) => {
  let newUser = req.body;
  newUser.id = uuid.v4();
  users.push(newUser);
  res.status(201).send(newUser);
})
// Post to login endpoint
app.post('/login', (req, res) => {
  let user = req.body;
  for (let i = 0; i < users.length; i++) {
    if (users[i].firstName === user.firstName && users[i].password === user.password) {
      let logggedInUser = users[i];
      logggedInUser.token = '123';
      res.status(200).send(logggedInUser);
    } else {
      res.status(500).send(error);
    }
  }
})
// Post to add a favorite recipe
app.post('/fav', (req, res) => {
  let userId = req.body.userId;
  let recipeIdToAdd = req.body.recipeId;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userId) {
      let user = users[i];
      user.favRecipes.push(recipeIdToAdd);
      res.status(200).send(user);
    } else {
      res.status(500).send(error);
    }
  }
})
// Get favorite recipes of user
app.get('/fav', (req, res) => {
  let userId = req.body.userId;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userId) {
      let user = users[i];
      let favRecipes = user.favRecipes;
      res.status(200).send(favRecipes);
    } else {
      res.status(500).send(error);
    }
  }
})
// Post a new recipe
app.post('/recipes', (req, res) => {
  let newRecipe = req.body;
  newRecipe.id = uuid.v4();
  recipes.push(newRecipe);
  res.status(201).send(newRecipe);
})




app.listen(8080, () => {
  console.log('Server is running');
});