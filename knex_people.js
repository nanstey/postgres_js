const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: settings
})

// knex.select().from('famous_people')
//   .then( function(rows) {
//     for (let i = 0; i < rows.length; i++){
//       console.log(rows[i]);
//     }
//   });
// console.log(results);

let name = process.argv[2];
getFamousPeopleByName(name);


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

// getFamousPeopleByName(name, (result) => {
//   let rows = result.rows.length;
//   console.log(`Found ${rows} person(s) by the name '${name}':`)
//   for (let i = 0; i < rows; i++){
//     let row = result.rows[i];
//     let d = new Date(row.birthdate).toDateString()
//     console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born ${d}`);
//   }
// });


// function getFamousPeopleByName(name, callback){
//   client.connect((err) => {
//     if (err) {
//       return console.error("Connection Error", err);
//     }
//     console.log('Searching ...');
//     client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text;", [name], (err, result) => {
//       if (err) {
//         return console.error("error running query", err);
//       }
//       callback(result);
//       client.end();
//     });
//   });
// }

