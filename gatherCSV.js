const axios = require('axios');
const fs = require('fs');
const helper = require('./helper')

const baseURL = 'https://results.vote.wa.gov/results/'
const stateCSV = '_AllState.csv'
const countyCSV = '_AllCounties.csv'


const stateURL = baseURL + helper.electionString + '/export/' + helper.electionString + stateCSV
const countyURL = baseURL + helper.electionString + '/export/' + helper.electionString + countyCSV



async function downloadCSV(url, fileName) {
  try {
    const response = await axios.get(url);
    const csvData = response.data;
    fs.writeFileSync(fileName, csvData, 'utf-8');
    console.log(`${fileName} downloaded successfully.`);
  } catch (error) {
    console.error(`Error downloading ${fileName}: ${error.message}`);
  }
}


downloadCSV(stateURL, './raw/stateResultsAll.csv');
downloadCSV(countyURL, './raw/countyResultsAll.csv');
