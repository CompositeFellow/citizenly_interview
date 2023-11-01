const fs = require('fs');
const executeCountyPipeline = require('./transformCounty');
const executeStatePipeline = require('./transformState');
const finalize = require('./finalize');
const searchJson = require('./search');


async function runPipelines() {
  try {
    await executeCountyPipeline();
    console.log('county pipeline is done.');
    await executeStatePipeline();
    console.log('state pipeline is done.');
    await finalize();
    console.log('final results done')
    searchJson()
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

runPipelines()

