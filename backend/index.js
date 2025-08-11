const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const mysql = require('mysql');


const port = 5000;

const app = express();
app.use(cors());

const dbConnection = mysql.createConnection({
  
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'acpa'
});

app.use(body_parser.json());

/*********************/
/* All Select Tables */
/*********************/

app.post('/app/account/userId', (req, res) => {
  const userId = req.body["userId"];
  const query = "SELECT CONCAT(lastName, ', ', firstName) AS 'username' FROM accounts WHERE userId = ?";
  dbConnection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });

});


app.post('/app/sugg/test', (req, res) => {
  const userID = req.body["userId"];
  const query = "SELECT assessments.assessment_title AS 'title', results.testScore AS 'score' FROM results INNER JOIN assessments ON results.testId = assessments.assessmentID WHERE results.userId = ?";
  dbConnection.query(query, [userID], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });

});


app.post('/app/sugg/course', (req, res) => {
  const userID = req.body["userId"];
  const query = "SELECT * FROM courses S INNER JOIN recommendations R ON R.courseId = S.courseId WHERE R.userId = ?";

  dbConnection.query(query, [userID], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });

});

app.post('/app/sugg/results', (req, res) => {
  const userId = req.body["userId"];
  
  const query = "INSERT INTO recommendations (userId, score, courseId, testId) SELECT R.userID, (R.testScore * C.scoreMetric / 100) AS `Percentage`, C.courseId, C.testId FROM results R INNER JOIN course_metric C ON C.testId = R.testId INNER JOIN tests T ON T.testId = R.testId WHERE R.userId = ? AND T.status = 'Active' AND NOT EXISTS ( SELECT 1 FROM recommendations WHERE recommendations.userId = R.userID AND recommendations.courseId = C.courseId AND recommendations.testId = C.testId ) ORDER BY `Percentage` DESC";
  dbConnection.query(query, [userId], (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  } else {
    res.json(results);
  }
});
});

app.post('/app/sugg/update/schools', (req, res) => {
  const userId = req.body["userId"];
  const query = "UPDATE recommendations AS r JOIN schools AS s ON r.courseId = s.courseId SET r.schoolId = s.schoolId WHERE r.userId = ?";
   dbConnection.query(query, [userId], (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');

  } else {
    res.json(results);
  }

});


});

app.post('/app/sugg/update/career', (req, res) => {
  const userId = req.body["userId"];
  const query = "UPDATE recommendations AS r JOIN careers AS s ON r.courseId = s.courseId SET r.careerId = s.careerId WHERE r.userId = ?";
   dbConnection.query(query, [userId], (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');

  } else {
    res.json(results);
  }

});


});


app.post('/app/sugg/school', (req, res) => {
  const userId = req.body["userId"];
  const query = "SELECT * FROM schools S INNER JOIN recommendations R ON R.schoolId = S.schoolId WHERE R.userId = ?";
  dbConnection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });


});
  
app.post('/app/sugg/career', (req, res) => {
  const userId = req.body["userId"];

  const query = "SELECT * FROM careers S INNER JOIN recommendations R ON R.careerId = S.careerId WHERE R.userId = ?";
  dbConnection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });


});


app.get('/app/adash/account', (req, res) => {
  const query = "SELECT CONCAT(lastName, ', ', firstName) AS 'username' FROM accounts LIMIT 5";
  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });

});

app.get('/app/report/stats/career', (req, res) => {
   const query = "SELECT  COUNT(R.careerId) AS 'id', C.careerName AS 'name' FROM recommendations R INNER JOIN careers C ON C.careerId = R.careerId GROUP BY C.careerName";
   dbConnection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  

});

app.post('/app/account/user', (req, res) => {
  const userId = req.body["userId"];
  const query = "SELECT CONCAT(lastName, ', ', firstName) AS 'username' FROM accounts WHERE userId = ?";
  dbConnection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });

});

app.get('/app/report/stats/schools', (req, res) => {
  const query = "SELECT COUNT(R.schoolId) AS 'id', S.schoolName AS 'name' FROM recommendations R INNER JOIN schools S ON S.schoolId = R.schoolId GROUP BY S.schoolName";

  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });

});

app.get('/app/adash/logs', (req, res) => {
  const query = "SELECT action, date FROM logs ORDER BY date LIMIT 1";
  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });

});

app.get('/app/adash/test', (req, res) => {
  const query = "SELECT T.title AS 'title', R.testScore AS 'score'  FROM tests T LEFT JOIN results R ON R.testId = T.testId WHERE status = 'Active' GROUP BY T.title";
  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });

});


app.get('/app/archive', (req,res) => {
  const query = "SELECT * FROM archives";
  dbConnection.query(query, (err, results) => {
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
  dbConnection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  
});

app.post('/app/profile/pdata', (req, res) => {
  const userID = req.body["userId"];

  const query = "SELECT * FROM accounts WHERE userId = ?";
  dbConnection.query(query, [userID], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  
});


app.get('/app/inbox', (req, res) => {
  //const userID = req.body["userId"];

  const query = "SELECT * FROM messages WHERE status != 'Archived'";
  dbConnection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  
});

app.post('/app/inbox/single', (req, res) => {
  const messageID = req.body["userId"];
  console.log(messageID);

  const query = "SELECT * FROM messages WHERE messageId= ?";
  dbConnection.query(query, [messageID], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  
});


app.get('/app/user', (req, res) => {
  //const userID = req.body["userId"];

  const query = "SELECT userId AS 'User ID', CONCAT(firstName, ' ',  lastName) AS 'User Name', email AS 'Email', status AS 'Status'  FROM accounts";
  dbConnection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  
});

app.get('/app/logs', (req, res) => {
  //const userID = req.body["userId"];

  const query = "SELECT logId, userId, action, classId, date FROM logs";
  dbConnection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  
});

app.get('/app/report/score', (req, res) => {
   const query = "SELECT AVG(testScore) AS 'Average' FROM results";
   dbConnection.query(query, (err, results) => { 
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  

});

app.get('/app/report/test', (req, res) => {
   const query = "SELECT COUNT(T.testId), T.title FROM tests T INNER JOIN results R ON R.testId = T.testId WHERE T.status = 'Active' GROUP BY T.title";
   dbConnection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  

});

app.get('/app/report/career', (req, res) => {
   const query = "SELECT  COUNT(R.careerId), C.careerName FROM recommendations R INNER JOIN careers C ON C.careerId = R.careerId GROUP BY C.careerName ORDER BY COUNT(R.careerId) DESC LIMIT 3";
   dbConnection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  

});

app.get('/app/report/schools', (req, res) => {
   const query = "SELECT COUNT(R.schoolId), S.schoolName FROM recommendations R INNER JOIN schools S ON S.schoolId = R.schoolId GROUP BY S.schoolName ORDER BY COUNT(R.schoolId) DESC LIMIT 3";
   dbConnection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results)
      }
    });  

});

/**********************/
/* All Updates Tables */
/**********************/

app.post('/app/account/restore/0', (req,res) => {
  const userID = req.body["User ID"];
    const query = "UPDATE accounts SET status = 'Active' WHERE userId = ?";
    console.log(userID["User ID"]);
    // Update
    dbConnection.query(query, [userID], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  
  });


// Update Accounts
app.post('/app/archive/restore/0', (req,res) => {
  const userID = req.body["archiveId"];
  const classID = req.body["classId"]
  console.log(req)
  if (classID == "message"){
    const query = "UPDATE messages SET status = 'Pending' WHERE archiveId = ?";
    // Update
    dbConnection.query(query, [userID], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  
  }
  else if (classID == "account"){
    const query = "UPDATE accounts SET status = 'Active' WHERE archiveId = ?";
    // Update
    dbConnection.query(query, [userID], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  
  }

});


app.post('/app/account/archive', (req,res) => {
  const userID = req.body["User ID"];
  console.log("test");
  
  const query = "UPDATE accounts SET status = 'Archived' WHERE userId = ?";
    // Update
    dbConnection.query(query, [userID], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  
});



app.post('/app/message/answ', (req,res) => {
  const userID = req.body["row"];
  
  const query = "UPDATE messages SET status = 'Answered' WHERE messageId = ?";
    // Update
    dbConnection.query(query, [userID], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  
});

app.post('/app/messages/archive', (req,res) => {
  const userID = req.body["messageId"];
  const query = "UPDATE messages SET status = 'Archived' WHERE messageId = ?";
    // Update
    dbConnection.query(query, [userID], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  
});


/*********************/
/* All Delete Tables */
/*********************/

// Remove from archives
app.post('/app/archive/restore/1', (req, res) => {
  const archiveID = req.body["Admin ID"];
  console.log(archiveID);

  const query = "DELETE FROM archives WHERE archiveId = ?";

  // Remove Archive
  dbConnection.query(query, [archiveID], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });

});

app.post('/app/account/restore/1', (req, res) => {
  const archiveID = req.body["User ID"];

  const query = "DELETE FROM archives WHERE objectId = ? AND classId = 'account'";

  // Remove Archive
  dbConnection.query(query, [archiveID], (err, results) => {
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



app.post('/app/archive/account', (req, res) => {
  const userId = req.body["userId"];
  const classId = req.body["classId"];
  const objectId = req.body["objectId"];

  const query = "INSERT INTO archives (userId, objectId, classId, date) VALUES (?, ?, ?, NOW())";
    // Update
    dbConnection.query(query, [userId, objectId, classId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  
});


app.post('/app/logs/push', (req, res) => {
  const userID = req.body["userId"];
  const action = req.body["action"];
  const classId = req.body["classId"];

  const query = "INSERT INTO logs (userId, action, classId, date) VALUES (?, ?, ?, NOW())";
  dbConnection.query(query, [userID, action, classId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });  
});

app.post('/app/message/send', (req, res) => {
  const subject = req.body["subject"];
  const message = req.body["message"];
  const userID = req.body["userID"];

  const query = "INSERT INTO messages (userId, subject, message, status) VALUES (?, ?, ?, 'Pending')";
  dbConnection.query(query, [userID, subject, message], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });


});

app.post('/app/archive/message', (req, res) => {
  const subject = req.body["subject"];
  const message = req.body["message"];
  const userID = req.body["userId"];
  const messageId = req.body["messageId"];
  const date = req.body["date"];

  const query = "INSERT INTO archives (userId, objectId, classId, date) VALUES (?, ?, ?, ?)"
  dbConnection.query(query, [userID, messageId, 'message', date], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });


});
app.listen(port, () => {
  console.log("Listening...");
});

// Handle errors
dbConnection.on('error', (err) => {
  console.error('MySQL connection error:', err);
});

// Close the connection when the Node.js process exits
process.on('exit', () => {
  connection.end();
});
