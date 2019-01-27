const express = require('express');

const bodyParser = require('body-parser');

const bcrypt = require ('bcrypt-nodejs');

const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(cors())

const database = {
    users:[
        {
            id:'123',
            name:'John',
            email:"johhn@czlon.com",
            password:'cookies',
            entries:0,
            joined: new Date()
        },
        {
            id:'124',
            name:'Sally',
            email:"sallyn@czlon.com",
            password:'bananas',
            entries:0,
            joined: new Date()
        }
    ],
    login:[
        {
            id:'987',
            hash:'',
            email:'johhn@czlon.com'
        }
    ]
}
 
app.get('/', (req, res)=> {
  res.send('database.users')
})

app.post('/signin', (req, res) =>{
    bcrypt.compare("cookies", '$2a$10$StWE/m4qv3nnl5KOaj1a3umBcLFsGiMFR8qzSVwvrR5OL.TaTbfi.', function(err, res) {
        console.log('first guess', res)
    });
    bcrypt.compare("veggies", '$2a$10$StWE/m4qv3nnl5KOaj1a3umBcLFsGiMFR8qzSVwvrR5OL.TaTbfi.', function(err, res) {
        console.log('second guess', res)
    });

    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
            res.json('sukces');
        } else {
            res.status(400).json('error logi in');
        }
    
})
app.post('/register', (req,res)=> {
    const { email, name, password} =req.body;
    /*bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash)
    });*/
    database.users.push({
            id:'125',
            name:name,
            email:email,
            password:password,
            entries:0,
            joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req,res)=>{
    const {id} = req.params;
    let found = false;
    database.users.forEach(user =>{
        if (user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(400).json('not found')
    }
})


app.post('/image', (req,res)=>{
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries ++
            return res.json(user.entries)
        }
    })
    if(!found){
        res.status(400).json("not found")
    }
})


/*
// Load hash from your password DB.

*/
app.listen(3000, ()=>{
    console.log("app is hujs")
})
