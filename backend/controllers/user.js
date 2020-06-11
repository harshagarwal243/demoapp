const fs = require('fs');

const getUserById = (req , res , next , id) => {
     fs.exists('users.json', exists => {
         if(!exists)
          {
              return res.status(400).json({ error : "No user exists with this id"})
          }
          fs.readFile('users.json',(error , data) => {
              if(error)
               {
                   return res.status(400).json({ error });
               }
               let obj = JSON.parse(data);
               obj = obj[id];
               if(!obj)
                {
                    return res.status(400).json({ error : "No user exists with this id"});
                }
                const { name } = obj ;
                req.profile = { email : id ,name  };
                next();
          })
     }) 
}

const getUser = (req , res ) => {
    return res.status(400).json({ user : req.profile })
}

module.exports = { getUserById , getUser}