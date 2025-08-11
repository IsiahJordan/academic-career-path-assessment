const express=require('express');
const mysql = require('mysql');
const cors = require('cors');
const body_parser = require('body-parser');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');

const bcrypt = require('bcrypt');
const saltRounds = 10; // This determines the complexity of the hashing. You can adjust this value as needed.

//initializing

const app = express()
app.use(cors());
app.use(express.json());
app.use(body_parser.json());


const db= mysql.createConnection({
	host: "localhost",
	user: 'root',
	passwords:'',
	database:'acpa'
})

//create api
//for sign up
app.post('/signup', async (req, res)=> {
	const hashedPassword = await bcrypt.hash(req.body.password, 13);
	console.log('Hashed Password Length:', hashedPassword.length);

	// Log the hashed password before inserting into the database
	console.log('Hashed Password During Registration:', hashedPassword);


	const sql = "INSERT INTO user_accounts (firstName,lastName,gender,city,email,password,role,status) VALUES (?)";
	const values = [
		req.body.firstname,
		req.body.lastname,
		req.body.gender,
		req.body.city,
		req.body.email,
		hashedPassword,
		req.body.role,
		req.body.status
	]
	db.query(sql, [values],(err,data) => {
		if(err){
			return res.json("Error");
		} 
		return res.json(data);
		// if(data.length > 0){
		// 	return res.json("Login Success"); 
		// }else{
		// 	return res.json("not found"); 
		// }
		
    }) 
})

// For Login
app.post('/login',(req, res)=> {
	const sql = "SELECT userID, firstname, lastname, gender, city, email, role, status, password FROM user_accounts WHERE email = ? AND password = ? ";
	
	db.query(sql, [req.body.email , req.body.password],(err,data) => {
		if(err){
			return res.json("Error");
		} 
		
		if(data.length > 0){
			console.log(data);
            return res.json({ status: "success", data: data });
			
		}else{
			return res.json("failed"); 
		}
		
    }) 
})


//Create assessment post
app.post('/createAssessment',(req, res)=> {
const sql = "INSERT INTO assessments ( subjectID, description, assessment_title) VALUES (?)";
	const values = [
 		req.body.subjectID,
 		req.body.Description,
		req.body.title,
 	]
 	db.query(sql, [values],(err,data) => {
 		if(err){
 			return res.json("Error");
		}
 		return res.json(data);	
     }); 

	
});

app.post('/createAssessment/insert',(req, res)=> {
	const getLatestAssessmentId = 'SELECT MAX(assessmentID) AS latestID FROM assessments;';

	db.query(getLatestAssessmentId, (err, result) => {
	if (err) {
		console.error(err);
		res.status(500).send('Error saving questions');
		return;
	}

	const latestID = result[0].latestID;

	const questions = req.body.questions;
	let completedInsertions = 0;

	for (const question of questions) {
	const questionValues = [
	latestID,
	question.Question,
	question.Correct_Ans,
	question.Incorrect1,
	question.Incorrect2,
	question.Incorrect3
	];

    const questionQuery = 'INSERT INTO assessment_questions (assessmentID, questions, correct_answer, incorrect1, incorrect2, incorrect3) VALUES (?, ?, ?, ?, ?, ?);';

    db.query(questionQuery, questionValues, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving questions');
        return;
      }
      completedInsertions++;
      if (completedInsertions === questions.length) {
        res.status(200).send('Assessment created successfully');
      }
    });
  }
})
})

//Get Assessments
app.get('/assessments',(req, res)=>{
	const sql = "SELECT * FROM assessments"

	db.query(sql,(err,data) => {
		if(err){
			return res.json("Error");
		} 
		return res.json(data);
    }) 
});


//Get Assessment Questions
app.get('/assessments/questions/:assessmentID', (req, res) => {
	const assessmentID = req.params.assessmentID;
	const getOpenedAssessmentId = 'SELECT * FROM assessment_questions WHERE assessmentID = ?';
  
	db.query(getOpenedAssessmentId, [assessmentID], (err, data) => {
	  if (err) {
		console.error(err);
		res.status(500).send('Error retrieving questions');
		return;
	  }
	  console.log(assessmentID)
	  // Send the retrieved data as a response
	  res.json(data);
	});
  });


//Post Test Result
app.post('/assessments/testResults',(req, res)=> {
	const sql = "INSERT INTO results ( userId, testId, testScore) VALUES (?)";
		const values = [
			 req.body.userID,
			 req.body.assessmentID,
			 req.body.testScore,
		 ]
		 db.query(sql, [values],(err,data) => {
			 if(err){
				 return res.json("Error");
			}
			 return res.json(data);	
		 }); 
	});






//--------------------By rion----------------------------

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'acpa.educ.ph@gmail.com', // replace with your Gmail email
        pass: 'haxf hbwc unsv rpqy' // replace with your Gmail password
    },
});

const otpStorage = {};

// Endpoint to send OTP to the user's email
app.post('/sendOTP', (req, res) => {
    const { email } = req.body;
    console.log('Sent OTP to email:', email);
    // Generate a random OTP
    const otp = speakeasy.totp({
        secret: speakeasy.generateSecret().base32,
        encoding: 'base32',
    });

    // Save the OTP in the in-memory storage
    otpStorage[email] = otp;

    // Email configuration
    const mailOptions = {
        from: 'funtaskmoto@gmail.com',
        to: email,
        subject: 'Your OTP',
        text: `Your OTP is: ${otp}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending OTP email:', error.message);
            return res.json({ status: 'error', message: 'Error sending OTP email' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.json({ status: 'success', message: 'OTP sent successfully' });
        }
    });
});


// Endpoint to verify OTP 
app.post('/VerifyOTP', (req, res) => {
    const { email, otp } = req.body;
    console.log('Received OTP verification request for email:', email, 'with OTP:', otp);
    if (otpStorage[email] === otp) {
        // OTP is correct
        delete otpStorage[email]; // Remove the OTP from storage after successful verification
        return res.json('success');
    } else {
        // OTP is incorrect
        return res.json('failed');
    }
});


app.post('/CheckEmail', (req, res) => {
    const { EmailAcc } = req.body;
    const sql = "SELECT * FROM user_accounts WHERE email = ?";

    db.query(sql, [EmailAcc], (err, data) => {
        if (err) {
            console.error('Error checking email:', err.message);
            return res.json("error");
        }

        if (data.length > 0) {
            // Email already exists
            return res.json("exists");
        } else {
            // Email doesn't exist
            return res.json("not_exists");
        }
    });
});

app.post('/ResetPassword', (req, res) => {
    const { EmailAcc, NewPassword } = req.body;
    const sql = "UPDATE user_accounts SET password = ? WHERE email = ?";
    console.log('SQL Query:', sql);
	console.log('Values:', [NewPassword, EmailAcc]);
	console.log('Email to reset password:', EmailAcc);
    db.query(sql, [NewPassword, EmailAcc], (err, data) => {
        if (err) {
            console.error('Error during password reset:', err.message);
            return res.json({ status: 'error', message: 'Error during password reset. Please try again later.' });
        }

        console.log('Password changed successfully');
        return res.json({ status: 'success', message: 'Password reset successful' });
    });
});


//--------------------By jordi---------------------

app.get('/app/archive', (req,res) => {
	const query = "SELECT * FROM archives";
	db.query(query, (err, results) => {
	  if (err) {
		console.error('Error executing query:', err);
		res.status(500).send('Internal Server Error');
	  } else {
		res.json(results);
	  }
	});
  });


  app.get('/app/profile/data', (req, res) => {
	//const userID = req.body["userId"];
	const query = "SELECT * FROM accounts WHERE userId = 11";
	db.query(query, (err, results) => {
		if (err) {
		  console.error('Error executing query:', err);
		  res.status(500).send('Internal Server Error');
		} else {
		  res.json(results);
		}
	  });  
  });


  app.get('/app/profile/inbox', (req, res) => {
	//const userID = req.body["userId"];
	const query = "SELECT * FROM messages";
	db.query(query, (err, results) => {
		if (err) {
		  console.error('Error executing query:', err);
		  res.status(500).send('Internal Server Error');
		} else {
		  res.json(results);
		}
	  });  
  });


  /**********************/
/* All Updates Tables */
/**********************/

// Update Accounts
app.post('/app/archive/restore/0', (req,res) => {
	const userID = req.body["userId"];
	const classID = req.body["classId"];
  
	if (classID == "account"){
	  const query = "UPDATE accounts SET status = 'Active' WHERE userId = ?";
	  // Update
	  db.query(query, [userID], (err, results) => {
		if (err) {
		  console.error('Error executing query:', err);
		  res.status(500).send('Internal Server Error');
		} else {
		  res.json(results);
		}
	  });  
	}
  });



  /*********************/
/* All Delete Tables */
/*********************/

// Remove from archives
app.post('/app/archive/restore/1', (req, res) => {
	const archiveID = req.body["archiveId"];
  
	const query = "DELETE FROM archives WHERE archiveId = ?";
  
	// Remove Archive
	db.query(query, [archiveID], (err, results) => {
	  if (err) {
		console.error('Error executing query:', err);
		res.status(500).send('Internal Server Error');
	  } else {
		res.json(results);
	  }
	});
  
  });


  /*********************/
/* All Insert Tables */
/*********************/

app.post('/app/message/send', (req, res) => {
	const subject = req.body["subject"];
	const message = req.body["message"];
	const userID = req.body["userID"];
  
	const query = "INSERT INTO messages (userId, subject, message, status) VALUES (?, ?, ?, 'Pending')"
	db.query(query, [userID, subject, message], (err, results) => {
	  if (err) {
		console.error('Error executing query:', err);
		res.status(500).send('Internal Server Error');
	  } else {
		res.json(results);
	  }
	});
  
  
  });

  // Handle errors
db.on('error', (err) => {
	console.error('MySQL connection error:', err);
  });

// Close the connection when the Node.js process exits
process.on('exit', () => {
	connection.end();
  });


//----------------------------------------------


app.listen(8081, ()=>{
	console.log("listening");
})
