const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./model/todo');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json({error: err}));

})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    console.log(id);
    TodoModel.findByIdAndUpdate({_id:id}, {done: true} )
    .then(result => res.json(result))
    .catch(err => res.json({error: err}));

})

app.delete('/delete/:id', (req, res) =>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json({error: err}));
})


mongoose.connect('mongodb://127.0.0.1:27017/test');

app.post('/add', (req, res) => {
    const task = req.body.task;
    // Rest of your code here
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(error => res.json({error: error}));
});


app.listen(5000, () => {
    console.log('Server has started on port 5000');
})