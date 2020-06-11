const { validationResult } = require('express-validator');
const uuidv1 = require('uuidv1')
const crypto = require('crypto');
const file = require('fs');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

const signup = (req , res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({ error : errors.array()[0].msg })
    }
    let obj = {};
    const { name , email , pass } = req.body ;
    let password = pass + "";
    file.exists('users.json', exists => {
        let salt= 0 ;
        if(exists)
         {
            //  console.log("File Exists");
             file.readFile('users.json', (error , data) => {
                 if(error)
                  {
                      return res.status(400).json({ error});
                  }
                  obj = JSON.parse(data);
                  if(obj[email])
                   {
                       return res.status(400).json({ error : "Email is already registerd"})
                   }
                   salt = uuidv1();
                   let encrypassword = crypto.createHmac("sha256",salt)
                              .update(password)
                              .digest("hex");
                   
                  obj = { ...obj , [email] : {
                      name , encrypassword , salt
                  }}
                  file.writeFile('users.json',JSON.stringify(obj),() => {
                      return res.status(200).json({success : 'successfully signed up'})
                  })
             })
         }
         else {
            //  console.log("File Not exists ");
             salt = uuidv1();
             let encrypassword = crypto.createHmac("sha256",salt)
                        .update(password)
                        .digest("hex");
             obj = { [email] : { name , encrypassword , salt}};
             file.writeFile('users.json',JSON.stringify(obj),() => {
                return res.status(200).json({success : 'successfully signed up'})
            })
         }
    })
}

const signin = (req , res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({ error : errors.array()[0].msg })
    }
    const { email , pass} = req.body ;
    let password = pass + "";
    file.exists('users.json',exists => {
        if(!exists)
         {
             return res.status(400).json({ error : "User with this email doesn't exist"})
         }
         file.readFile('users.json',(err , data) => {
             if(err)
              {
                  return res.status(400).json({ error : "Server Error Occured" })
              }
              let obj = JSON.parse(data);
              obj = obj[email];
            //   console.log(obj);
              const { name , salt , encrypassword } = obj;
              if(!obj)
               {
                   return res.status(400).json({ error : "User with this email doesn't exist" })
               }
              if(crypto.createHmac("sha256",salt).update(password).digest("hex") !== encrypassword)
               {
                   return res.status(400).json({ error : "Email or Password is wrong"});
               }
               const token = jwt.sign({ email  },"24377H",{ expiresIn : "1d"});
               const user = { name , email};
               return res.status(200).json({ token , user });
         })
    })
}

const isSignedIn =  expressJWT({ secret : "24377H" , userProperty : 'auth'})

const isAuthorized = (  req ,res , next) => {
       
        const auth = req.profile.email && req.auth.email && req.profile.email == req.auth.email
        if(!auth)
         {
             return res.status(401).json({ error : "ACCESS DENIED"})
         }
        next();
}

module.exports = { signup , signin , isSignedIn ,isAuthorized };