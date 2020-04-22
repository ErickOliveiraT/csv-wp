# csv-wp
A simple CSV writer and parser
#### Installation
 ```
$ npm install csv-wp
 ```
#### Usage:
```javascript
const csvwp = require('csv-wp')

 //Optional. These are default values
const options = {
    encoding: 'UTF-8',
    delimiter: ',' //',' or ';'
}

//Print entire .csv file
csvwp.printLines('example.csv', options)

//Returns an Array with all lines
let lines = csvwp.getLines('example.csv', options);

//Returns an Array with the 5th line
let line = csvwp.getSingleLine('example.csv', 5, options);

//Returns .csv header (line 0)
let header = csvwp.getHeader('example.csv', options);

//Returns an Array with a given collumn
let atr = csvwp.getAttribute('example.csv', 'CONTACT', options);

//Find rows by searching a (key,value) pair
let found = csvwp.find('backup.csv', 'CONTACT', 'example@example.com', options);

//Append a row to a .csv file
const data = ['03/24/2020 08:26','Testing','example@example.com','+553298','Verified'];
csvwp.appendRow('example.csv', data, options);

//Write a row to a .csv file (Current data will be overwritten)
const data = ['03/24/2020 08:26','Testing','example@example.com','+553298','Verified'];
csvwp.writeRow('example.csv', data, options);

//Write an entire .csv file with header and body
const header = ['Date','Name','Email','Contact','Status'];
let data = [['24/03/2020 08:26','Name 1','test@test.com','+553298','Verified'],
            ['18/10/2019 11:43','Name 2','mail@mail.com','+553298','Pending']];
csvwp.writeCSV('example.csv', header, data, options);
```