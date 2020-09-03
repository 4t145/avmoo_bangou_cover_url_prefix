const fs = require('fs');
const { match } = require('assert');

const codes = JSON.parse(fs.readFileSync('codes.json').toString());
var series_collection = new Map();

codes.forEach(bangou => {
    const [series, num] = bangou.split('-');
    if (num == undefined) {
        return;
    }
    // console.log(series);
    if(series_collection.has(series)) {
        max_num = series_collection.get(series);
        if ( max_num < num) {
            series_collection.set(series, num);
        }
    } else {
        series_collection.set(series, num);
    }
});
// console.log(series_collection);

let series_array = new Array();
for (let[key, value] of series_collection) {
    series_array.push({
        'series': key,
        'num': value
    })
}

const series_json = JSON.stringify(series_array);
const fd = fs.openSync('./series.json','w');
console.log(series_json);
fs.writeFileSync(fd, series_json);
fs.closeSync(fd);


