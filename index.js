const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
// const Agent = require('socks5-https-client/lib/Agent');
// const s5_config = {
//     agentClass: Agent,
//     agentOptions: {
//         socksHost: '127.0.0.1',
//         socksPort: 10808
//     }
// }


const search_item = JSON.parse(fs.readFileSync('./asset/series.json').toString());


const avmoo_search = (bango) => {
    return 'https://avmoo.host/cn/search/' + bango ;
}


const result_fd = fs.openSync('./output/prefix_table.json','as');
fs.writeFileSync(result_fd, '{');

var index_item = 0;
search_item.forEach(item => {
    index_item += 1;
    const series = item.series;
    const num = item.num;
    const bango = item.series + '-' + item.num;
    // console.log(index_item);
    setTimeout((index) => {
        console.log(index);
        request(avmoo_search(bango), (error, response, body) => {
            if (error) {
                console.log(error);
                return;
            }

            if (response.statusCode == 200) {
                const page = cheerio.load(body);
                // console.log(page);
                const photo_frames = page('.photo-frame');
                // console.log(photo_frames);
                const photo_frame = cheerio.load(photo_frames[0]);
                // console.log(photo_frame.html());
                const img_link = photo_frame('img').attr('src');
                // console.log(img_link);
        
                const postfix = series.toLowerCase() + num.padStart(5,'0');
                const filed = img_link.split(/\/{1,2}/)[4];
                const prefix = filed.substr(0,filed.length - postfix.length);

                console.log('记录成功：\t' + prefix + '\t' + postfix);

                const result_item = '"' + series.toLowerCase() + '":"' + prefix + '"';
                fs.writeFileSync(result_fd, result_item);
                if (index<search_item.length) {
                    fs.writeFileSync(result_fd, ',');
                } else {
                    fs.writeFileSync(result_fd, '}');
                    fs.closeSync(result_fd);
                }
            } else {
                console.log(response.statusCode);
            }
        });
    }, 10000*index_item, index_item, result_fd);
});




