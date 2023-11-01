# My Code for the Data Integrity Engineer Position at Citizenly

## How to Use
```
npm install
``` 
to install dependencies, then

```
npm start
```
to run.  The app will ask you for a race, enter a valid race and it will return the winner object in the format requested.

| :zap:    If you need a test race you can copy paste from the rawResults.json file in the raw folder. 
|-----------------------------------------|

## Assumptions
1. I assumed the goal was to only return Races and not Measures.  The challenge language doesn't fit well  measures.  An example is a levy or bond where something on the ballot candidate might be approved, yes, levy yes, levy.....yes, or maintained.  I tried to remove these where I could.  
2. I assumed Citizenly wanted the data in the correct spot on the output, but were not concerned with the field consistency for this exercise.  By this I mean sometimes a city will be in ALL CAPS and sometimes in CamelCase.  These would be easy fixes with more time.  



## Method
1. The project downloads 2 CSVs available from [here](https://results.vote.wa.gov/results/20221108/export.html) both files download to the raw folder.

2. Each CSV is processed through a node stream pipeline where it is spruced and then appened to a rawResults.json file in the raw folder.

3. The raw json is finalized, the winners of each race is deterimined and added to the finalResults.json file in the results folder

4. The program runs a small cli interface to ask the user what race it wants data results.(if you need something to copy paste here, a good spot is the rawResults.json file in the raw folder.)

| :zap:    If you need a test race you can copy paste from the rawResults.json file in the raw folder. 
|-----------------------------------------|

## Why
After reviewing the website and the data I thought it was best to use the CSV and spruce the data from that point.  I did this for a few reasons.

1. Only 2 CSVs you need to get all required information.  This means only 2 points of failure during the extraction or aquasition phase.  I also considered the possibility this might be used during a live election.  If so you would want to wait for offical results before . injesting data and County level results are more likely to be inacurate.  

2. I looked around to many other state election data websites and many of them publish in CSV.  This means the code can likely be refactored and resused.  I can also imagine a scenario where the csv can be labeled by state and Ciitizenly can download multiple state csv's to a folder before processing in bulk.  

3. By using the CSVs you can use the same code to gather election data for any year/month.  You just need to change the ```electionString``` value in the ```helper.js``` file.  In the future a script could also be written to create an array of all available strings based on the elections [here](https://www.sos.wa.gov/elections/data-research/election-results-and-voters-pamphlets).  This makes robust testing easier later on. 


## Conclusion
I had a great time putting this code together.  Thank you for the opportunity and your time.  There are places in the code where I would love to add testing, better error handling, or optimizations but I was running low on time.  

I would love to discuss the code further and how I can be a valuable team member.  

| :zap:    the rawResults.json file must exist, if you accidently delete it please recreate a blank one.
|-----------------------------------------|