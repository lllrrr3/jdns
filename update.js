function github(githubfile, savefile) {
    let url = "https://raw.fastgit.org/" + githubfile;
    res = http.get(url);
    if (res.statusCode != 200) {
        toast("请求失败");
    }
    files.writeBytes("/sdcard/1/" + savefile, res.body.bytes());
    toast("下载成功");
}
github("MonsterNone/tmall-miao/master/jd_hb.js", "jd_hb.js");
github("MonsterNone/tmall-miao/master/start.js", "start.js");
github("MonsterNone/tmall-miao/master/start_jd.js", "start_jd.js");
github("MonsterNone/tmall-miao/master/tb_huichang.js", "tb_huichang.js");
github("MonsterNone/tmall-miao/master/tb_luck.js", "tb_luck.js");
//github("ljt0515/618/main/version", "version");
//github("ljt0515/618/main/tb_hc.js", "tb_hc.js");
//github("ljt0515/618/main/zns_zs.js", "zns_zs.js");
github("lllrrr3/jdns/main/update.js", "update.js");
//github("lllrrr3/jdns/main/tb.js", "tb.js");
//github("lllrrr3/jdns/main/jd.js", "jd.js");
//github("lllrrr3/jdns/main/help2.js", "help2.js");
//github("omxmo/xb/main/zrw_jdrw.js", "zrw_jdrw.js");
//github("omxmo/xb/main/zrw_tmrw.js", "zrw_tmrw.js");
