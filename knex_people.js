const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: settings
})


let name = process.argv[2];
getFamousPeopleByName(name);
knex.destroy();

function getFamousPeopleByName(name){
  console.log('Searching...')
  knex.select().from('famous_people')
    .where('first_name', '=', name).orWhere('last_name', '=', name)
    .then( function(rows){
      printResults(rows);
    });
}

function printResults(rows){
  console.log(`Found ${rows.length} person(s) by the name '${name}':`)
  for (let i = 0; i < rows.length; i++){
    let row = rows[i];
    let d = new Date(row.birthdate).toDateString()
    console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born ${d}`);
  }
}

