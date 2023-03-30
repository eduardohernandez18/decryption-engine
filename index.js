const dic = {
  ' ': '404741404142',
  '.': '4017',
  '-': '4016',
  '/': '4014',
  '(': '404A',
  ')': '404B',
  'A': '4643',
  'B': '4640',
  'C': '4641',
  'D': '4646',
  'E': '4647',
  'F': '4644',
  'G': '4645',
  'H': '464A',
  'I': '464B',
  'J': '4613',
  'K': '4610',
  'L': '4611',
  'M': '4616',
  'N': '4617',
  'O': '4614',
  'P': '4742',
  'Q': '4743',
  'R': '4740',
  'S': '4741',
  'T': '4746',
  'U': '4747',
  'V': '4744',
  'W': '4745',
  'X': '474A',
  'Y': '474B',
  'Z': '4713',
  '0': '4142',
  '1': '4143',
  '2': '4140',
  '3': '4141',
  '4': '4146',
  '5': '4147',
  '6': '4144',
  '7': '4145',
  '8': '414A',
  '9': '414B',
}

const _ = require('lodash');
const XLSX = require('xlsx');

const workbook = XLSX.readFile('data1.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(sheet);

jsonData.forEach(({encoded, decoded}, idx) => {
  if (encoded.length % 4 !== 0) {
    console.log(`row ${idx + 1} is an unkown format!`);
  } else {
    let expectedDecoded = '';
    for (let i = 0; i < encoded.length;) {
      const chunk1 = i + 12 < encoded.length ? encoded.slice(i, i + 12) : undefined;
      const chunk2 = encoded.slice(i, i + 4);
      let k;

      if (chunk1 && (k = _.findKey(dic, (v) => v === chunk1))) {
        expectedDecoded += k, i += 12;
      } else if (k = _.findKey(dic, (v) => v === chunk2)) {
        expectedDecoded += k, i += 4;
      } else {
        console.log('not found in dic: ', chunk2);
        break;
      }
    }
  
    if (expectedDecoded !== decoded) {
      console.log(`row ${idx + 1} wrong! ${encoded} to ${decoded}, expecting: ${expectedDecoded}`);
    }
  }
});
