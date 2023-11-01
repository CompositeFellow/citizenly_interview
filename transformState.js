const fs = require('fs');
const csvtojson = require('csvtojson');
const { Transform, pipeline } = require('stream');
const helper = require('./helper')


const stateTransformer = new Transform({
  transform(chunk, enc, callback){
    const result = JSON.parse(chunk);
    if (result.Candidate !== "Repealed" && result.Candidate !== "Maintained"){
        const city = helper.getNextWordAfterCityOf(result.Race)
        const formatedResult = {
        race: result.Race,
        role: helper.extractRole(result.Race),
        name: result.Candidate,
        county: result.County,
        place: (city ? city : (result.County ? result.County : "Statewide")),
        district: helper.findDistrictNumber(result.Race),
        election_year: helper.electionString.substring(0,4),
        // Party is Republican or Democratic, both are 10 chars and equidistant from str start
        party_affiliation: result.Party.substring(9,19),
        office_position: helper.findPositionNumber(result.Race),
        district_misc: 'na',
        votes: result.Votes,
        percentVoteTotal: result.PercentageOfTotalVotes
      }
      this.push(',\n' + JSON.stringify(formatedResult))
    }
    callback()
  },
  flush(callback) {
    // After processing all objects, add the closing square bracket and call the callback
    this.push('\n]'); // Add the closing square bracket
    callback();
  }
})

const toJson = csvtojson({object: true})

const stateStream = fs.createReadStream('./raw/stateResultsAll.csv')
const resultsStream = fs.createWriteStream('./raw/rawResults.json', {flags: 'a'})

async function executeStatePipeline() {
    try {
      await new Promise((resolve, reject) => {
        pipeline(
          stateStream,
          toJson,
          stateTransformer,
          resultsStream,
          (error) => {
            if (error) {
              console.log("Error with state:", error);
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });
    } catch (err) {
      console.log("Error with state ", err);
    }
  }
  
  module.exports = executeStatePipeline;