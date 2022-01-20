/**
 * 2022京东炸年兽活动AutoJS辅助
 * Author：Hao
 * Data：2022/1/20
 * Versions: 3.1
 * GitHub:https://github.com/Cool-baby/autojs
 */
//京东app名
var appName = "com.jingdong.app.mall";
// 需要完成的任务列表
var TASK_LIST = ["浏览领", "浏览并关注8s", "城城", "浏览8秒", "浏览8s", "累计浏览", "浏览并关注可得2000", "浏览可得", "入会", "浏览并关注可得", "去首页浮层进入", "小程序", "浏览5个品牌墙店铺", "浏览活动", "品牌墙店铺", "逛晚会页", "玩AR游戏可得", "去组队可得","下单商品可得"];
// 过渡操作
var PASS_LIST = ['请选择要使用的应用', '我知道了', '取消', "京口令已复制"];
// 判断停留时间
var JUDGE_TIME = 0;
// 定时器
var interval;
// 已完成序号
var finished_task_num = new Array();
// 当前序号
var current_task_num = 0;
// 浏览就返回标记
var isBackFlag = false;
// 小程序标记
var isXcx = false;
// 活动按钮indexInParent值
var huodong_indexInParent_num = 9;
// 记录活动页面头部坐标
var headerXY;
// 记录是否没任务做了
var check_flag;
// 品牌墙任务标记
var isBackgroud = false;


/**
 * 启动京东app
 */
function start() 
{
    auto.waitFor()
    if (launch(appName)) 
    {
        console.info("作者:Cool-baby");
        console.info("时间:2022-1-19");
        console.info("GitHub:https://github.com/Cool-baby")
        console.info("启动京东APP");
        console.info("注意：第一次打开JD可能会弹窗，需配合手动关闭影响任务进行的弹窗！");
    }
    console.show();
}
start();
sleep(5000);


/**
 * 关键调用在此
 */
 while (true) {

    check_flag = 0;

    enterActivity();//进入做任务界面，防走丢

    recoverApp();//检测是否卡顿

    var flag = getNeedSelector();//找任务

    if(viewTask(flag) == 0)
        if(viewProduct())
        {
            check_flag = 1;
        }

    if((check_flag == 1) && (flag != true))
    {
        console.info("我滴任务完成啦！");
        //break;
    }
}


/**
 * 点击
 * @param {横坐标} x
 * @param {纵坐标} y
 */
function randomClick(x, y) 
{
    var rx = random(0, 5);
    var ry = random(0, 5);
 
    click(x + rx, y + ry);
    sleep(2000);
    return true;
}


/**
 * 进入做任务界面
 */
function enterActivity() 
{
    console.info("准备进入任务界面");
    if (!textContains("累计任务奖励").exists()) 
    {
        sleep(1000);
        if (textContains("累计任务奖励").exists()) 
        {
            console.info("已经在任务界面");
            sleep(300);
            headerXY = id("a96").findOne().bounds();
        } 
        else 
        {
            if (desc("浮层活动").exists()) 
            {
                console.info("点击浮层活动");
                var huodong = desc("浮层活动").findOne().bounds();
                randomClick(huodong.centerX(), huodong.centerY());
                sleep(2500);
                //点两次，防止浮层缩进去，然后无法进入活动界面
                if (desc("浮层活动").exists()) 
                {
                    console.info("点击浮层活动");
                    var huodong = desc("浮层活动").findOne().bounds();
                    randomClick(huodong.centerX(), huodong.centerY());
                    sleep(3000);
                }
            }
            
            // 获取进入做任务界面的控件
            var button = className('android.view.View')
                .depth(14)
                .indexInParent(huodong_indexInParent_num)
                .drawingOrder(0)
                .clickable();
            if (button.exists()) {
                console.info("点击进入做任务界面")
                //var rect = button.findOne().bounds();
                //var rect = [831,1416,1062,1635];
                //console.info(rect)
                //console.info(rect.centerX(), rect.centerY())
                randomClick(946, 1525);//此处我根据荣耀v20找的点
                sleep(1000);
                headerXY = id("a96").findOne().bounds();
            } 
            else 
            {
                console.info("找不到任务界面按钮")
                console.info("无法自动进入做任务界面，请手动进入！");
            }
            
            if (textContains("累计任务奖励").exists()) 
            {
                console.info("已成功进入任务界面");
                sleep(500);
                headerXY = id("a96").findOne().bounds();
            } 
            else 
            {
                console.info("找不到任务界面按钮")
                console.info("无法自动进入做任务界面，请手动进入！");
            }
        }
        sleep(1000);
    }
}


/**
 * 获取需要进行的控件
 * @returns
 */
function getNeedSelector() 
{
    var allSelector = className('android.view.View')
    .depth(19)
    .indexInParent(3)
    .drawingOrder(0)
    .clickable()
    .find();
//console.info("allselectos: ",allSelector)
for (let index = 0; index < allSelector.length; index++) 
{
    //console.info("index: ",index)
    for (var i = 0; i < TASK_LIST.length; i++) 
    {
        // 获取具有需要完成任务字符串的控件集合
        var list = allSelector[index].parent().findByText(TASK_LIST[i]);
        //console.info("list: ",list)
        // 如果长度大于0则表示存在该控件
        if (list.size() > 0) 
        {
            // 获取不在序列中的序号
            if (finished_task_num.indexOf(index) < 0) 
            {
                console.info("当前已完成序列：", finished_task_num)
                current_task_num = index;
            } 
            else 
            {
                continue;
            }

            // 如果是浏览就返回的任务，将标记设为true
            isBackFlag = (TASK_LIST[i].indexOf("浏览可得") >= 0 || TASK_LIST[i].indexOf("浏览并关注可得") >= 0 || TASK_LIST[i].indexOf("玩AR游戏可得") >= 0 || TASK_LIST[i].indexOf("去组队可得") >= 0) ? true : false;
            // 如果是小程序任务，将小程序标记设为true
            isXcx = (TASK_LIST[i].indexOf("小程序") >= 0) ? true : false;
            // 如果是品牌墙任务，将背景墙任务标记为true
            isBackgroud = (TASK_LIST[i].indexOf("品牌墙") >= 0) ? true : false;
            var rect = allSelector[current_task_num].bounds();
            if (text("累计任务奖励").exists()) {
                console.info("去完成任务，当前任务序列：", current_task_num)
                randomClick(rect.centerX(), rect.centerY());
                return true;
            }
        }
    }
}
}


/**
 * 去完成任务
 * [url=home.php?mod=space&uid=952169]@Param[/url] {是否点击任务标识} flag
 */
 function viewTask(flag) 
 {
    var res = 0;
    // 根据坐标点击任务，判断哪些需要进行
    sleep(2000);
    var timeout = 15
    var timestart = new Date().getTime();
    console.info("开始时间:" + timestart)
    var timenow = new Date().getTime();
    while (true && flag) {
        timenow = new Date().getTime();
        if((timenow - timestart) / 1000 > timeout)
        {
            console.info("结束时间:" + timenow)
            break;
        }
        if (text("天天都能领").exists() || text("有机会得大额现金").exists() || text("邀请新朋友 更快赚现金").exists()) {
            console.info("进入城城领现金");
            console.info("城城分现金已结束");
            // 将当前任务序号添加到列表中，防止后续点到
            finished_task_num[finished_task_num.length] = current_task_num;
            viewAndFollow();
            sleep(500);
            // 重置计时
            JUDGE_TIME = 0;
        }
        else if ((textStartsWith("获得").exists() && textEndsWith("爆竹").exists()) || text("已浏览").exists() || text("浏览完成").exists()) 
        {
            console.info("任务完成，返回");
            viewAndFollow();
            sleep(500);
            // 重置计时
            JUDGE_TIME = 0;
            break;
        } 
        else if (text("已达上限").exists()) 
        {
            console.info("任务已达上限,切换已完成按钮");
            // 将当前任务序号添加到列表中，防止后续点到
            finished_task_num[finished_task_num.length] = current_task_num;
            viewAndFollow();
            sleep(500);
            // 重置计时
            JUDGE_TIME = 0;
            res = 1;
            break;
        }  
        else if (textContains('当前页点击浏览4个').exists() || textContains('当前页浏览加购').exists() || textContains('当前页点击浏览4个商品领爆竹').exists() || textContains('当前页浏览加购4个商品领爆竹').exists()) 
        {
        console.info("当前为加入购物车任务或浏览商品任务");
        // 重置计时
        JUDGE_TIME = 0;
        break;
        } 
        else if (textContains('会员授权协议').exists() || textContains('会员福利专享').exists()) 
        {
            console.info("不加会员，切换已完成");
            // 将当前任务序号添加到列表中，防止后续点到
            finished_task_num[finished_task_num.length] = current_task_num;
            viewAndFollow();
            // 重置计时
            JUDGE_TIME = 0;
            break;
        } 
        else if (textContains('欢迎下次再来~').exists()) 
        {
            console.info("城城分现金已结束，切换已完成");
            // 将当前任务序号添加到列表中，防止后续点到
            finished_task_num[finished_task_num.length] = current_task_num;
            viewAndFollow();
            // 重置计时
            JUDGE_TIME = 0;
            break;
        }
        else if (textContains('￥').exists() || textContains('好货特卖').exists()) 
        {
            console.info("不买东西，切换已完成");
            // 将当前任务序号添加到列表中，防止后续点到
            finished_task_num[finished_task_num.length] = current_task_num;
            viewAndFollow();
            // 重置计时
            JUDGE_TIME = 0;
            break;
        }
        else if (text("互动种草城").exists()) 
        {
            console.info("当前为互动种草城任务");
            // 重置计时
            JUDGE_TIME = 0;
            if (interactionGrassPlanting()) 
            {
                back();
                break;
            }
            break;
        } 
        else if ((text("到底了，没有更多了～").exists() && !text("消息").exists() && !text("扫啊扫").exists() && !(textStartsWith("当前进度").exists() && textEndsWith("10").exists())) || isBackgroud)
        {
            console.info("到底了，没有更多了～");
            sleep(1000);
            // 重置计时
            JUDGE_TIME = 0;
            var count = 0;
            while (count <= 5) {
                if (undefined === headerXY) {
                    headerXY = id("a96").findOne().bounds();
                }
                // var rightx = headerXY.right;
                // var righty = headerXY.bottom + 300;
                var rightx = 180;
                var righty = 1540;
                while (click(rightx, righty)) {
                    console.info("尝试点击坐标：", rightx, righty);
                    count = count + 1;
                    sleep(6000);
                    if (!text("下拉有惊喜").exists()) {
                        if (id("aqw").click()) {
                            sleep(2000);
                            console.info("尝试返回", count);
                            back();
                            break;
                        }
                    } else {
                        righty = righty + 237;
                    }
                    if(righty >= 900) {
                        break;
                    }
                }
            }
            isBackgroud = false;
            swipe(807, 314, 807, 414, 1);
            sleep(2000);
            break;
        } 
        else if (text("消息").exists() && text("扫啊扫").exists()) 
        {
            console.warn("因为某些原因回到首页，重新进入活动界面");
            enterActivity();
        } 
        else if (text("天天都能领").exists()) 
        {
            sleep(2000);
            console.info("天天都能领");
            // 重置计时
            JUDGE_TIME = 0;
            var button = className('android.view.View')
                .depth(16)
                .indexInParent(3)
                .drawingOrder(0)
                .clickable().findOne().bounds();
            if (randomClick(button.centerX(), button.centerY())) {
                sleep(1000);
                console.log("点我收下");
                if (back()) {
                    break;
                }
            }
        } 
        else if (isBackFlag) 
        {
            console.info("进入浏览就返回任务");
            //sleep(1000);
            viewAndFollow();
            isBackFlag = false;
            break;
        } 
        else if (isXcx) 
        {
            console.info("进入小程序任务");
            // 重置计时
            JUDGE_TIME = 0;
            sleep(2000);
            back();
            sleep(2000);
            let trytime = 0;
            if(textContains("确定").exists())
            {
                print("小程序签名未通过")
                textContains("确定").click()
                sleep(1000);
            }
            while (!textContains("当前进度").exists() && trytime < 5) {
                back();
                sleep(1000);
                trytime++;
            }
 
            isXcx = false;
            break;
        } 
        else 
        {
            if (recoverApp()) 
            {
                break;
            }
        }
    }
    if ((timenow - timestart) > (timeout * 1000)) 
    {
        console.info("界面超时了")
        viewAndFollow();
    }
    return res;
}


/**
 * 浏览商品/加购商品
 * 实现效果类似，固只需一个方法
 */
function viewProduct() 
 {
    var viewProductFlag = 1;
    if (textContains('当前页点击浏览4个商品领爆竹').exists() || textContains('当前页浏览加购4个商品领爆竹').exists()) 
    {
        log("当前页点击浏览或加购4个商品领爆竹");
        const productList = className('android.view.View').depth(15).indexInParent(4).clickable(true).find();
        var count = 0;
        for (index = 0; index < productList.length; index++) 
        {
            if (count == 4) 
            {
                if (back()) 
                {
                    sleep(3000)
                    break;
                }
            }
            if (productList[index].click()) 
            {
                // 重置计时
                JUDGE_TIME = 0;
                log("浏览商品任务:正在浏览第" + (index + 1) + "个商品");
                sleep(2000);
                while (true) 
                {
                    if (text("购物车").exists() && back()) 
                    {
                        viewProductFlag = 0;
                        count = count + 1;
                        sleep(2000);
                        if (!text("购物车").exists()) 
                        {
                            break;
                        }
                    }
                }
            }
        }
    }
    //console.info("viewProductFlag:",viewProductFlag);
    if(viewProductFlag)
    {
        return true;
    }
}


/**
 * 自动判断程序是否卡顿，恢复方法
 * 判断依据：1.不在活动界面 2.停留某个界面长达30s
 * @returns
 */
 function recoverApp() 
 {
    if (!text("当前进度").exists() && JUDGE_TIME > 30) 
    {
        if (back()) 
        {
            // 计时器重置
            JUDGE_TIME = 0;
            console.warn("停留某个页面超过30s,自动返回，重置定时器。");
            return true;
        }
    } 
    else 
    {
        return false;
    }
}


/**
 * 互动种草城
 */
 function interactionGrassPlanting() {
    var count = 0;
    while (true) {
        if (className('android.view.View').indexInParent(4).depth(14).findOne().click()) {
            // 重置计时
            JUDGE_TIME = 0;
            console.info("去逛逛");
            sleep(2000);
            if (back()) {
                sleep(2000);
                count = count + 1;
                if (count == 5) {
                    return true;
                }
            }
        }
    }

}


/**
 * 返回
 */
function viewAndFollow() 
{
    trytime = 0;
    while (!textContains("当前进度").exists() && trytime < 10) 
    {
        back();
        sleep(1000);
        trytime++;
    }
}
