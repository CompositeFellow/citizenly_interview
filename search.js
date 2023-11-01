const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function searchJson() {
  rl.question('Enter the string you want to search for: ', (searchString) => {
    try {
      const jsonData = JSON.parse(fs.readFileSync('./results/finalResults.json', 'utf8'));
      const foundRace = jsonData.filter(result => result.race === searchString);

      if (foundRace.length > 0) {
        console.log('Found result:');
        foundRace.forEach((result) => {
            const {role,name,county,place,district,election_year,party_affiliation,office_position,district_misc} = result
            const winner = {role,name,county,place,district,election_year,party_affiliation,office_position,district_misc}
          console.log(winner);
        });
      } else {
        console.log('No results found with the race you entered.');
      }

      rl.question('Do you want to search for another object? (y/n): ', (answer) => {
        if (answer.toLowerCase() === 'y') {
          searchJson();
        } else {
          console.log('Search ended thank you for using the app.');
          rl.close();
        }
      });
    } catch (error) {
      console.error('Error reading or parsing the JSON file:', error);
      rl.close();
    }
  });
}

module.exports = searchJson;
