require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.port || 3001;
const uristring = process.env.MONGO_URI

//mongoose connection
mongoose.connect(uristring, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
	//handle error on first connection
	.catch(err=>console.log('ERROR connecting to mongoDB '+ err));
const db = mongoose.connection;
//handle error after first connection
db.on('error', console.error.bind(console, 'ERROR connecting to mongoDB'));
db.once('open', ()=>console.log('Succeeded connected to mongoDB'));

//schema and model
const taskSchema = new mongoose.Schema({
  title: {type: String, required: true},
  details: String,
  complete: {type: Boolean, default: false},
  modified: {type: Date, default: Date.now}//call Date.now() when no value is passed
});
const Task = mongoose.model('Task', taskSchema);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//endpoints
app.get('/api/getAllTasks', (req, res) => {
  const { sort = 'complete', order = 1 } = req.query;

  Task.find({})
  .sort({ [sort]: order })
  .exec(function(err, tasks){
    if(err){
      handleError(err, res);
    }else{
      res.send(tasks);
    }
  });
});

app.get('/api/searchTasks/', (req, res)=>{
  let { search, sort = 'complete', order = 1 } = req.query;
  search = new RegExp(`${search}`, 'i');

  Task.find({ $or: [ {title: search}, {details: search} ] })
  .sort({ [sort]: order })
  .exec(function(err, tasks){
    if(err){
      handleError(err, res);
    }else{
      res.send(tasks);
    }
  });
});

app.post('/api/createTask', (req, res)=>{
  const task = new Task({
    title: req.body.title, 
    details: req.body.details
  });

  task.save(function(err, task){
    if(err){
      handleError(err, res);
    }else{
      res.send(task);
    }
  });
});

app.put('/api/updateTask/:id', (req, res)=>{
  const {title, details, complete} = req.body;
  
  Task.findOneAndUpdate({_id: req.params.id},//find 
    {title, details, complete, modified: Date.now()},//set 
    //return updated document, run schema validations
    {new: true, runValidators: true}, 
    function(err, task){
      if(err){
        handleError(err, res);
      }else if(task === null){
        res.status(400).send(`Could not find task ${req.params.id}`);
      }else{
        res.send(task);
      }
    });
});

app.delete('/api/deleteTask/:id', (req, res)=>{
  Task.findOneAndDelete({_id: req.params.id}, function(err, task){
    if(err){
      handleError(err, res);
    }else if(task === null){
      res.status(400).send(`Could not find task ${req.params.id}`);
    }else{
      res.send(task);
    }
  });
});

if(process.env.NODE_ENV === 'production'){
  // serve static files (production)
  app.use(express.static('client/build'));

  // send index.html for other routes
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, ()=>console.log(`app listening on port ${PORT}`));

function handleError(err, res){
  if(err._message === 'Task validation failed'){
    res.status(400).send(err.message);
  }else if(err._message === 'Validation failed'){
    res.status(400).send(err.message);
  }else{
    res.status(500).send(err.message);
  }
}