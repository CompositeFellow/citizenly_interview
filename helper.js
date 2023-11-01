// Changing this string allows you to choose the election to pull the data from
// Later this can be refactored by pulling all possible elections from https://www.sos.wa.gov/elections/data-research/election-results-and-voters-pamphlets 
// then the user can choose the election or we could iterate over all elections to pull all data
const electionString ='20221108'

function findDistrictNumber(inputStr) {
    const regex = /(?:district|dist|dist\sno)[A-Z0-9]*\s+(\d+)/i;
    const match = inputStr.match(regex);

    return match ? match[1] : null;
}

function findPositionNumber(inputStr) {
    // Define a regular expression to search for "pos," "position," or "pos." followed by a number
    // or "#" followed by a number(s) at the end of the string
    const regex = /(?:pos|position|pos\.)\s*(\d+)|#(\d+)$/i;
    const matches = inputStr.match(regex);

    if (matches) {
      if (matches[1]) {
        return matches[1];
      }
      if (matches[2]) {
        return matches[2];
      }
    }

    return null;
  }
  
  // Example usage:
  const inputString = "I am given a string like this NORTH FRANKLIN SCHOOL DISTRICT NO. J51-162 Director, Position 3, #5";
  const positionNumber = findPositionNumber(inputString);
  console.log(positionNumber); // Output: "5"
  

function getNextWordAfterCityOf(inputStr) {
    const regex = /city of (\w+)/i;
    const match = inputStr.match(regex);

    return match ? match[1] : null;
}
  
function extractRole(inputStr) {
    // Define regular expressions to find "position" or "district" and remove them
    const positionRegex = /(position|pos)\s+\d+/i;
    const districtRegex = /(district|dist|dist\sno)\s+\d+/i;

    let role = inputStr.replace(positionRegex, '').replace(districtRegex, '');
    role = role.trim();

    return role;
}

module.exports = {
    electionString,
    findDistrictNumber,
    findPositionNumber,
    getNextWordAfterCityOf,
    extractRole,
}
  