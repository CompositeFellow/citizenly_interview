const fs = require('fs');

const resultsFilePath = './raw/rawResults.json';


async function finalize() {
    fs.readFile(resultsFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        return;
      }
  
      const jsonData = JSON.parse(data);
      const uniqueR = new Set(jsonData.map((result) => result.race));
      const races = Array.from(uniqueR);
      const finalResults = races.map((race) => {
        const candidates = jsonData.filter((result) => result.race === race);
        const winner = candidates.reduce((highestVotes, current) => (current.percentVoteTotal > highestVotes.percentVoteTotal ? current : highestVotes));
        return winner; // Add this line to collect the winners
      });
  
      // Convert the result to a JSON string
      const resultJSON = JSON.stringify(finalResults);
  
      // Write the JSON string to the finalResult.json file
      fs.writeFile('./results/finalResults.json', resultJSON, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing to finalResult.json:', writeErr);
        } else {
          console.log('Result saved to finalResult.json');
        }
      });
    });
  }

module.exports = finalize;
