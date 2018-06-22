$(() => {
    const crypto = require('crypto')
    const http = require('http');
    const utf8 = require('utf8');

    var appKey = "69e6363e2180c1bf";
    var appSecret = "CNgE5NeHaNt9N6sof9Z7nFgOj8fl5bbM";
    var salt = new Date().getTime();

    function getmd5(field) {
        var md5sum = crypto.createHash('md5');
        md5sum.update(field);
        str = md5sum.digest('hex');
        return str;
    }
    

    function translate() {
        var question =  $('#quest1').val();
        var tempstr = appKey + question + salt + appSecret;
        console.log(tempstr)
        var sign = md5(tempstr);
        console.log(sign);
        console.log((appKey + question + salt + appSecret))
        console.log(utf8.encode(question))
        console.log(question);
        var req = http.request("http://openapi.youdao.com/api?q=" + encodeURI(question) + "&from=zh-CHS&to=EN&appKey=" + appKey + "&salt="+ salt +"&sign=" + sign, function (res) {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(data);
                let result = JSON.parse(data);
                console.log(result);
                let translateStr = ''
                result.translation.forEach(e => {
                    translateStr += e + ";\n"
                })
                $("#home").text(translateStr);
                let explainStr = '';
                result.basic.explains.forEach(e => {
                    explainStr += e + ";" + "\n";
                })
                $("#profile").text(explainStr);
                $("#url").attr('href',result.webdict.url);
            });
        });
        req.on('error', function (err) {
            console.log(err);
        })
        req.end();
    }
    $("#btn-1").click(function() {
        translate();
    })
    console.log("llllllllllllllllllll");
})