const express = require('express');
const routes = require('./controllers/index');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
require('dotenv').config();

// set up sequelize connection
const sequelize = require('./config/connection');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;



// Create session and connect to SequelizeStore
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    // Session expiries after 1 hour
    // 3600000/1000 seconds = 3600 seconds/ 60 minutes = 1 hour
    maxAge: 3600000
  },
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Initialize and Set handlebars to default engine
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Connect front end HTML to JS and CSS public
app.use(express.static(path.join(__dirname, 'public')));
// Connect to the controllers folder
app.use(routes);

sequelize.sync({ force: false }).then(()=> {
  app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});

