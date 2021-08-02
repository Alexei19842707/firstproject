const fs = require('fs');
const path = require('path');


let args = process.argv.slice(2);

var _getAllFilesFromFolder = function(dir) {

  var filesystem = require("fs");
  var results = [];

  filesystem.readdirSync(dir).forEach(function(file) {

      file = dir+'/'+file;
      var stat = filesystem.statSync(file);

      if (stat && stat.isDirectory()) {
        results.push(file);
      }

  });

  return results;

};

let jsFileAnswer = fs.readFileSync(path.resolve(__dirname, './main.js'), 'utf8');

const test_cases = _getAllFilesFromFolder(`test_data/${args[0]}/test_cases`);

for (let i = 0; i < test_cases.length; i++){

  let testFile = `test_data/${args[0]}/test_cases/test_case_${i}/input.txt`;
  let testFileData = fs.readFileSync(path.resolve(__dirname, testFile), 'utf8').split("\n");
  testFileData = JSON.stringify(testFileData);

  let resultFile = `test_data/${args[0]}/test_cases/test_case_${i}/output.txt`;
  let resultFileData = fs.readFileSync(path.resolve(__dirname, resultFile), 'utf8').split("\n");
  resultFileData = JSON.stringify(resultFileData);


  jsFile = `
  var testData = ${testFileData}
  var resultData = ${resultFileData}
  var userData = []
  alert = function(a){userData.push(String(a))};
  var prompt = function(){return testData.shift()};
  ` + jsFileAnswer + `
  console.log(userData)
  console.log(resultData)
  if (JSON.stringify(resultData) != JSON.stringify(userData)) {
    throw new Error("данные не совпали");
  }

  `

  eval(jsFile);
}
