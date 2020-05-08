const mongoose = require('mongoose')
const express = require('express')
const userRouter = require('./api/routers/user.router')
const menuRouter = require('./api/routers/menu.router')
const taskRouter = require('./api/routers/task.router')
const app = express();

mongoose.connect('mongodb+srv://123456789:mongodb123456789@pfe-mongodb-b6plb.mongodb.net/pfe_db?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
//mongoose.connect('mongodb://localhost:27017/pfe_db');

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(userRouter);
app.use(menuRouter);
app.use(taskRouter);
app.get("/", (req, res) => {res.send("Hi!")})

const port = process.env.PORT || 3000

app.listen(port);