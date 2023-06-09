const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const sequelize = require('./util/database');
const express = require('express');
const path = require('path');
const cors = require('cors');
const Expense = require('./models/expense');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/user', userRoutes);
app.use('/', expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));