function github(githubfile, savefile) {
    let url = "https://raw.fastgit.org/" + githubfile;
    res = http.get(url);
    if (res.statusCode != 200) {
        toast("请求失败");
    }
    files.writeBytes("/sdcard/1/" + savefile, res.body.bytes());
    toast("下载成功");
}
github("lllrrr3/jdns/main/jd_choujiang.js", "jd_choujiang.js");
github("lllrrr3/jdns/main/start.js", "start.js");
github("lllrrr3/jdns/main/start_jd.js", "start_jd.js");
github("lllrrr3/jdns/main/ui.js", "ui.js");
github("lllrrr3/jdns/main/version", "version");
