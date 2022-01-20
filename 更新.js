function github(githubfile, savefile) {
    let url = "https://raw.fastgit.org/" + githubfile;
    res = http.get(url);
    if (res.statusCode != 200) {
        toast("请求失败");
    }
    files.writeBytes("/sdcard/1/" + savefile, res.body.bytes());
    toast("下载成功");
}
github("lllrrr3/jdns/main/助力1.js", "助力1.js");
github("lllrrr3/jdns/main/助力2.js", "助力2.js");
github("lllrrr3/jdns/main/炸年兽.js", "炸年兽.js");
github("lllrrr3/jdns/main/main.js", "main.js");
github("lllrrr3/jdns/main/zns2022.js", "zns2022.js");
github("lllrrr3/jdns/main/2022年兽autojs.js", "2022年兽autojs.js");
