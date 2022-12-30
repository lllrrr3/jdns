function github(githubfile, savefile) {
    let url = "https://raw.fastgit.org/" + githubfile;
    res = http.get(url);
    if (res.statusCode != 200) {
        toast("请求失败");
    }
    files.writeBytes("/sdcard/1/" + savefile, res.body.bytes());
    toast("下载成功");
}
//github("MonsterNone/tmall-miao/master/jd_choujiang.js", "jd_choujiang.js");
//github("MonsterNone/tmall-miao/master/start.js", "start.js");
//github("MonsterNone/tmall-miao/master/start_jd.js", "start_jd.js");
//github("MonsterNone/tmall-miao/master/ui.js", "ui.js");
//github("MonsterNone/tmall-miao/master/version", "version");
github("ljt0515/618/main/version", "version");
github("ljt0515/618/main/tb_hc.js", "tb_hc.js");
github("ljt0515/618/main/zns_zs.js", "zns_zs.js");
github("lllrrr3/jdns/main/update.js", "update.js");
github("lllrrr3/jdns/main/join.js", "join.js");
github("lllrrr3/jdns/main/help1.js", "help1.js");
github("lllrrr3/jdns/main/helpnew1.js", "helpnew1.js");
github("lllrrr3/jdns/main/help2.js", "help2.js");
github("omxmo/xb/main/zrw_jdrw.js", "zrw_jdrw.js");
github("omxmo/xb/main/zrw_tmrw.js", "zrw_tmrw.js");
