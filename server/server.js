import express, { response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import {GoogleGenerativeAI} from "@google/generative-ai"


const gemini_key = "AIzaSyB6LHvWtiUSaqT6zEbaeScUJv6YzOovw8Q"
const genAI = new GoogleGenerativeAI(gemini_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const {Client} = pg;

const client = new Client( {
    user: 'postgres',
    password: 'santo@27',
    host: 'localhost',
    port: 5432,
    database: 'fit_web',
});


   

// await client.connect();


const app = express();
const port = 6000;



app.use(cors());
app.use(bodyParser.json());
client.connect();


app.post('/api/login', (req, res) => {
    const {email, password} = req.body;

    const login = async(email, password) => {
        // await 
        try{
            
            const response = await client.query("SELECT * FROM users WHERE email = $1", [email]);
            if(response  && response.rowCount > 0){
                if(response.rows[0].user_password == password){
                    res.json({user:{email:email}, msg:"Welcome back"});
                }
                else{
                    res.json({user:{email:null}, msg:"Incorrect password"});
                }
            }
            else{
                const response2 = await client.query("INSERT INTO users(email, user_password) VALUES($1, $2)", [email, password])
                res.json({user:{email:email}, msg:"Welcome new user"});
            }
            
        }
        catch(err){
            console.log(err);
        }
        // await client.end()
        
    }

    login(email, password);

    

   

})

app.post('/workout_plan', (req, res) => {
    const data = req.body
    const email = data.email;
    // console.log(email)
    console.log(data);
    const getworkouts = async (email) => {
        try{
            const response = await client.query('SELECT * FROM workouts WHERE email=$1', [email])
            console.log(response)
            if(response){
                res.json({rows:response.rows, nums_rows:response.rowCount})
            }
            
        }

        catch(err){
            console.log(err)
        }
    }
    getworkouts(email)
    
})

app.post('/newworkout', (req, res) => {
    const data = req.body;
    
    const add_workouts = async (data) => {
        try{
            const response = await client.query("INSERT INTO workouts(email, workout, sets, reps, day) VALUES($1, $2, $3, $4, $5)", [data.email, data.name, data.set, data.rep, data.day.toLowerCase()]);
            // return response;
            console.log(response);

        }
        catch(err){
            console.log(err);

        }
        

    }
    add_workouts(data)
    res.json({suc:"success"})
});

app.post("/logWorkout" , (req, res) => {
    const d = new Date();
    const day = d.getDay();
    const logWorkout = async (data) => {
        try{
            const res = await client.query("INSERT INTO workouttrack(workout, weight, set_no, reps, user_email, day) VALUES($1, $2, $3 ,$4, $5, $6)", [data.workout, data.weight, data.set_no, data.rep_count, data.email , day])
        }
        catch(err){
            console.log(err);
        }
    }

    logWorkout(req.body)
    
})

app.post("/workoutdata", (req, res) => {
    const get_workoutdata = async (email, workout) => {
        const response = await client.query("SELECT * FROM workouttrack WHERE user_email = $1 AND workout = $2", [email, workout])
        res.json({response:response});
    }
    get_workoutdata(req.body.email, req.body.workout)
});

app.post("/gemini_prompt", (req, res) => {
    const get_gemini = async (prompt) => {
        var res1 = await model.generateContent(prompt)
        console.log("hey");
        console.log(res1);
        var res2 = await res1.response
        var text = res2.text()
        console.log(text)
        res.json({result:text});
    
    }
    get_gemini(req.body.prompt)
    
})

app.listen(port, ()=> {
    console.log(`listening at port ${port}`);
})



