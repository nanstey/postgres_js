const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let name = process.argv[2];

getFamousPeopleByName(name, (result) => {
  let rows = result.rows.length;
  console.log(`Found ${rows} person(s) by the name '${name}':`)
  for (let i = 0; i < rows; i++){
    let row = result.rows[i];
    let d = new Date(row.birthdate).toDateString()
    console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born ${d}`);
  }
});


function getFamousPeopleByName(name, callback){
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    console.log('Searching ...');
    client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text;", [name], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      callback(result);
      client.end();
    });
  });
}

