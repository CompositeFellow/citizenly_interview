const fs = require('fs');
const csvtojson = require('csvtojson');
const { Transform, pipeline } = require('stream');
const helper = require('./helper')

let firstResult = true

const countyTransformer = new Transform({
  transform(chunk, enc, callback){
    const result = JSON.parse(chunk);
    // state results are included in county and must be removed as handling the totals is more efficient with the state csv
    // also removing state or local measures.  The instructions implied only races which means only results with candidates and not measures
    if (
      result.JurisdictionName !== "State Executive" 
      && result.JurisdictionName !== "Federal" 
      && result.JurisdictionName !== "Congressional" 
      && result.JurisdictionName !== "Legislative" 
      && result.JurisdictionName !== "Judicial" 
      && result.Candidate !== "Approved"
      && result.Candidate !== "Rejected"
      // could maybe be refactored with not contains yes or no, but may be dangerous and exclude real names
      && result.Candidate !== "LEVY... YES"
      && result.Candidate !== "LEVY... NO"
      && result.Candidate !== "YES"
      && result.Candidate !== "NO"
      && result.Candidate !== "Yes"
      && result.Candidate !== "No"
      && result.Candidate !== "Yes, Levy"
      && result.Candidate !== "No, Levy"
      ){
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
      // simple formatting to make the file valid JSON, could probably be refactored
      if (firstResult){
        firstResult = false
        this.push('[' + JSON.stringify(formatedResult))
      } else {
        this.push(',\n' + JSON.stringify(formatedResult))
      }
    }
    callback()
  }
})

const toJson = csvtojson({object: true})
const countyStream = fs.createReadStream('./raw/countyResultsAll.csv')
const resultsStream = fs.createWriteStream('./raw/rawResults.json')

async function executeCountyPipeline() {
    try {
      await new Promise((resolve, reject) => {
        pipeline(
          countyStream,
          toJson,
          countyTransformer,
          resultsStream,
          (error) => {
            if (error) {
              console.log("Error with county:", error);
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });
    } catch (err) {
      console.log("Error with county ", err);
    }
  }
  
  module.exports = executeCountyPipeline;
