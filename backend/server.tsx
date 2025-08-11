const express=require('express');
const mysql = require('mysql');
const cors = require('cors');

//initializing

const app = express()
app.use(express.json());
app.use(cors())

const db= mysql.createConnection({
	host: "localhost",
	user: 'root',
	passwords:'',
	database:'casestudy'
})

//create api
//app.get('/',(re, res) => {

	//return res.json("From backend side");
//})

app.post('/admin',(req, res)=> {
	const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
	
	db.query(sql, [req.body.email,req.body.password],(err,data)=> {
		if(err) return res.json("Error");
		if(data.length > 0){
			return res.json("Login Success"); 
		}else{
			return res.json("not found"); 
		}
		
    }) 
})

app.listen(8081, ()=>{
	console.log("listening");
})