const express = require('express');
const cors = require('cors');
const { getDataFromParam } = require('./utils');
const { get } = require('http');

const app = express();
app.use(cors())
const port = 3000;

let tasks = []

const addTask = (data)=>{
  tasks.push(data)
}

const sortByPriority = (data1, data2)=>{
  return data1['priority'] - data2['priority']
}

app.get('/tasks',(req, res)=>{
  res.json(tasks)
})

app.get('/tasks/add',(req, res)=>{
  const taskId = getDataFromParam(req, 'taskId', 'int')
  const text = getDataFromParam(req, 'text')
  const priority = getDataFromParam(req, 'priority', 'int')
  const taskToAdd = {taskId, text, priority}
  addTask(taskToAdd)
  res.json(tasks)
})

app.get('/tasks/sort-by-priority',(req, res)=>{
  if(tasks.length){
    tasks.sort(sortByPriority)
  }
  res.json(tasks)
})

app.get('/tasks/edit-priority',(req, res)=>{
  const taskId = getDataFromParam(req, 'taskId', 'int')
  const priority = getDataFromParam(req, 'priority', 'int')

  const updatedTasks = tasks.map((task)=>{
    if(task.taskId === taskId){
      task.priority = priority
    }
    return task
  })

  res.json(updatedTasks)
})

app.get('/tasks/edit-text',(req, res)=>{
  const taskId = getDataFromParam(req, 'taskId', 'int')
  const text = getDataFromParam(req, 'text')

  const updatedTasks = tasks.map((task)=>{
    if(task.taskId === taskId){
      task.text = text
    }
    return task
  })
  tasks = updatedTasks
  res.json(updatedTasks)
})

app.get('/tasks/delete',(req, res)=>{
  const taskId = getDataFromParam(req, 'taskId', 'int')
  const updatedTasks = tasks.filter((task)=> task.taskId !== taskId  )
  tasks = updatedTasks
  res.json(updatedTasks)
})

app.get('/tasks/filter-by-priority',(req, res)=>{
  const priority = getDataFromParam(req, 'priority', 'int')
  const updatedTasks = tasks.filter((task)=> task.priority === priority  )
  tasks = updatedTasks
  res.json(updatedTasks)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
