const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: settings
})

insertName(process.argv[2], process.argv[3], process.argv[4]);
knex.destroy();

function insertName(firstname, lastname, birthdate){

  let date = new Date(birthdate);

  knex('famous_people').insert({
    first_name: firstname,
    last_name: lastname,
    birthdate: date })
  .catch(function(error) {
    console.error(error);
  });
}