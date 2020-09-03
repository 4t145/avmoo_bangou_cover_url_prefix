
const request = require('request');
const cheerio = require('cheerio');
const Agent = require('socks5-https-client/lib/Agent');
const s5_config = {
    agentClass: Agent,
    agentOptions: {
        socksHost: '127.0.0.1',
        socksPort: 10808
    }
}

const series = 'stars';
const num = '171';
const bango = series + '-' + num;
const avmoo_search = (bango) => {
    return 'https://avmoo.host/cn/search/' + bango ;
}


// const re_url = new RegExp(/https:\/\/jp.netcdn.space\/digital\/video\/(.+)\/.+/);
request(avmoo_search(bango), s5_config, (error, response, body) => {

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
        console.log(postfix);
        const filed = img_link.split(/\/{1,2}/)[4];
        console.log(filed);
        const prefix = filed.substr(0,filed.length - postfix.length);
        console.log(prefix);
    }
})

