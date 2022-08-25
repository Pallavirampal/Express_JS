const express = require('express');
const app = express();

const batches = [
    {name:'batch-1',endpoint:'/batch/1'},
    {name:'batch-2',endpoint:'/batch/2'},
    {name:'batch-3',endpoint:'/batch/3'}
];


const batchInfo = [
    {
        id:1,
        name:'batch-1',
        strenghts:22,
        subjects:['English,Hindi,Punjabi'],
        students:[
            {name:'Rishabh',age:22,gender:'Male'},
            {name:'Pallavi',age:25,gender:'Female'},
            {name:'Dhruv',age:22,gender:'Male'}
        ]
    },
    {
        id:2,
        name:'batch-2',
        strenghts:22,
        subjects:['English,Hindi,Punjabi'],
        students:[
            {name:'Sanvi',age:22,gender:'Female'},
            {name:'Rishabh',age:22,gender:'Male'},
            {name:'karan',age:22,gender:'Male'}
        ]
    },
    {
        id:3,
        name:'batch-3',
        strenghts:22,
        subjects:['English,Hindi,Punjabi'],
        students:[
            {name:'Sanvi',age:22,gender:'Female'},
            {name:'Rishabh',age:22,gender:'Male'},
            {name:'Rishabh',age:22,gender:'Male'}
        ]
    }
];
app.get('/',(req,res)=>{
    res.send('API is running successfully')
});

app.get('/batches',(req,res)=>{
    res.send(batches);
    // res.send({message:'Hello cyberbuddies',
    // endpoints:{
    //     batches:'/batch'
    // }});
});

app.get('/batch/:id',(req,res)=>{
    //res.send(req.params);
    //res.send(req.params.id);
    // res.send(batchInfo[req.params.num-1]);

    //if we waant to check paraemter id
    
    const course = batchInfo.find(c => c.id === parseInt(req.params.id));

    // console.log(course);
    // res.send(course)
    if(course === undefined){
        res.status(404).send({status:400,message:'not found'})
    }
    res.send(course);
});
app.delete('/batch/:id',(req,res)=>{

    //data get
    const course = batchInfo.find(c => c.id === parseInt(req.params.id));
    //else error throw
    if(!course) return res.status(404).send({status:404,message:'not found'});
    
    //deleinf the batch

    const index = batchInfo.indexOf(course);
    batchInfo.splice(index,1)
    batches.splice(index,1);                       
    // batchInfo.splice(course,1);
    //sending the response
    // res.send(batchInfo)
    res.send(batches);
});


app.post('/batches',(req,res)=>{
    const newbatch = {
        name:"batch-" + (batches.length + 1),
        endpoint :'/batch/'+(batches.length +1)
    }

    const newInfo = {
        id: batches.length + 1,
        name:"batch-" + (batches.length + 1),
        strenghts: req.body.strenght,
        subjects: req.body.subjects,
        students: req.body.students
    }
    batches.push(newbatch);
    // batchInfo.push(newInfo);
    res.send(batches);
});
//abov can also write as
// 
// if(course === undefined){
    //     res.status(404).send({status:400,message:'not found'})
    // }
    // res.send(course);

// app.post('/batch/:id',(req,res)=>{

// });
const PORT = process.env.PORT || 3000;
app.listen(PORT,console.log(`listening to the PORT ${PORT}`));

