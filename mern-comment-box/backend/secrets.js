/*
  Place in .bash_profile: $ export DB_URI=mongodb://<dbuser>:<dbpassword>@ds161529.mlab.com:61529/mern-comment-box 

  This is for setting up a database-as-a-service and protecting access.
  Replace <dbuser> and <dbpassword> with the username and password you
  create through mlab.

  Of course this varies a bit if you're using another service, such as MongoDB Atlas.
*/

const secrets = {
  // dbUri: process.env.DB_URI;
  dbUri: 'mongodb://localhost:27017/mern-comment-box'
};

export const getSecret = key => secrets[key];