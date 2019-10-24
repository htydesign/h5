window.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);

var browser = {
    versions: function () {
        var u = navigator.userAgent,
			app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

//淡入
function fadeIn(obj) {
    obj.style.display = "block";
    setTimeout(function () {
        obj.classList.remove("fadeOut");
        obj.classList.remove("fadeIn");
        obj.classList.add("fadeIn");
    }, 100);
}

//淡出
function fadeOut(obj) {
    obj.classList.remove("fadeIn");
    obj.classList.add("fadeOut");
    setTimeout(function () {
        obj.style.display = "none";
    }, 400);
}

//用户分数
var userScore = 0;

//正确答案
var rightAnswers = [2, 0, 1, 2, 1, 0, 0, 0, 1, 3];

var imgUrl_1 = "images/img-03.png"; //正确图标
var imgUrl_2 = "images/img-02.png"; //错误图标

var bgMusic = document.querySelector('.background-music');
var oMusicIcon = document.querySelector('.music-icon');
var oMusicPlay = document.querySelector('.music-icon span:nth-of-type(1)');
var oMusicPause = document.querySelector('.music-icon span:nth-of-type(2)');
var isUserPauseMusic = false;

oMusicIcon.addEventListener('click', function () {
    if (bgMusic.paused) {
        bgMusic.play();
        bgMusic.volume = 0.5;
        oMusicPlay.style.display = "block";
        oMusicPause.style.display = "none";
        isUserPauseMusic = false;
    } else {
        bgMusic.pause();
        oMusicPlay.style.display = "none";
        oMusicPause.style.display = "block";
        
        isUserPauseMusic=true;
    }
}, false);

var startTime = new Date().getTime();
var endTime = 0;
var dis = 0;
var time = 0;
var nT = 3000;

var loader = new PxLoader();

for (var i = 0; i < fileList.length; i++) {
    loader.addData(fileList[i]);
}

loader.addProgressListener(function (e) {
    var percent = Math.round((e.compvaredCount / e.totalCount) * 100);
});

loader.addCompletionListener(function (e) {
    endTime = new Date().getTime();
    dis = endTime - startTime;
    if (dis < nT) {
        time = nT - dis;
        startHtml5(time);
    } else {
        startHtml5(time);
    }
});

loader.start();

function startHtml5(t) {

    setTimeout(function () {
        var oLoading = document.querySelector('.loading');

        fadeOut(oLoading);

        if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
            audioAutoPlay();
        }
        //播放第一个视频
        playFirstVideo();

    }, t);

}

function audioAutoPlay() {
    $('.index').hide();
    $('.start-video').css({
        "display": "block",
        "opacity": "1"
    });
    $(".start-video .video")[0].play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        $(".start-video .video")[0].play();
    }, false);
}

function playFirstVideo() {

    var oStartBottom = document.querySelector('.index');

    var oStartVideoContainer = document.querySelector('.start-video');

    var oStartVideo = document.querySelector('.start-video video');

    var oAnswerContainer = document.querySelector('.answer');

    var oAnswerBegin = document.querySelector('.answer-btn span');

    var oAnswerBox = document.querySelector('.answer-box');

    var oStartLight = document.querySelector('.light1');

    var isfinish = false;

    //点击开始播放视频
    oStartBottom.addEventListener('click', function () {

        fadeIn(oStartVideoContainer);

        oStartVideo.play();

        oStartVideo.style["object-position"] = "0px 0px";
        
       fadeOut(oStartBottom);

    }, false);

    //视频播放结束-->显示答题封面
    oStartVideo.addEventListener('ended', function () {

        fadeOut(oStartVideoContainer);
//      fadeIn(oAnswerContainer);
		oAnswerContainer.style.display="block";
		oAnswerContainer.style.opacity=1;
        oStartVideo.pause();

        isfinish = true;

    }, false);

    oStartVideo.addEventListener("x5videoenterfullscreen", function () {
        //alert('进入全屏');
        oStartLight.style.display = "none";
    }, false);

    oStartVideo.addEventListener("x5videoexitfullscreen", function () {
        //alert('退出全屏');
        if (isfinish) {
            oStartLight.style.display = "none";
        } else {
            oStartLight.style.display = "block";
        }
    }, false);

    oStartLight.addEventListener('click', function () {
        oStartVideo.play();
    }, false);

    //答题封面点击开始答题
    oAnswerBegin.addEventListener('click', function () {

        fadeIn(oAnswerBox);


        bgMusic.play();
        bgMusic.volume = 0.5;

        oMusicIcon.style.display = "block";

    }, false);
}

firstQuestion();

//第一题
function firstQuestion() {

    var aCheck = document.querySelectorAll('.first .one-check');
    var aCheckImages = document.querySelectorAll('.first .one-check img');

    var aMusicBottm = document.querySelectorAll('.first .one-music');

    var aMusicList = document.querySelectorAll('.music audio');

    var oNext = document.querySelector('.first .q-next');

    var aAnswersBg = document.querySelectorAll('.first .q-info span');

    var aImg = document.querySelectorAll('.first .q-info span b img');

    var oCurrentContainer = document.querySelector('.first');

    var oNextContainer = document.querySelector('.two');

    var n; //用户选择ID

    var isNext = false;

    for (var i = 0; i < aCheck.length; i++) {

        aCheck[i].index = i;

        aCheck[i].addEventListener('click', function () {

            for (var l = 0; l < aCheckImages.length; l++) {

                aCheckImages[l].style.display = "none";

                aAnswersBg[l].classList.remove("active");

                if (l == this.index) {

                    aCheckImages[l].style.display = "block";
                    aAnswersBg[l].classList.add("active");

                }

            }

            n = this.index;

        }, false);

    }

    for (var j = 0; j < aMusicBottm.length; j++) {

        aMusicBottm[j].index = j;

        aMusicBottm[j].addEventListener('click', function () {

            for (var k = 0; k < aMusicList.length; k++) {

                aMusicList[k].currentTime = 0;

                if (k == this.index) {

                    aMusicList[k].play();

                    bgMusic.pause()

                    aMusicList[k].addEventListener('ended', function () {
                        if(!isUserPauseMusic){
                        	bgMusic.play();
                        }
                    }, false);

                } else {

                    aMusicList[k].pause();

                }

            }

        }, false);

    }

    oNext.addEventListener('click', function () {

        $('.start-video .video').remove();

        if (!isNext) {

            isNext = true;

            if(!isUserPauseMusic){
            	bgMusic.play();
            }

            for (var k = 0; k < aMusicList.length; k++) {

                aMusicList[k].pause();

                aMusicList[k].currentTime = 0;

            }

            if (n !== undefined) {
                if (n == rightAnswers[0]) {

                    aImg[n].src = imgUrl_1;
                    userScore = userScore + 10;
                    console.log("答对了", "当前分数：" + userScore);
                } else {

                    aImg[n].src = imgUrl_2;
                    console.log("答错了", "当前分数：" + userScore);
                }
            } else {
                console.log("没有答题", "当前分数：" + userScore);
            }

            setTimeout(function () {
                fadeIn(oNextContainer);
                fadeOut(oCurrentContainer)
            }, 1000);
        }

    }, false);

}

//第2题
setAnswers('.two', '.third', '.two .q-info span', '.two .q-next', '.two .q-info span b img', 1);

//第3题
setAnswers('.third', '.fourth', '.third .q-info span', '.third .q-next', '.third .q-info span b img', 2);

//第4题
setAnswers('.fourth', '.fifth', '.fourth .q-info span', '.fourth .q-next', '.fourth .q-info span b img', 3);

//第5题
setAnswers('.fifth', '.sixth', '.fifth .q-info span', '.fifth .q-next', '.fifth .q-info span b img', 4);

//第6题
setAnswers('.sixth', '.seventh', '.sixth .q-info span', '.sixth .q-next', '.sixth .q-info span b img', 5);

//第7题
setAnswers('.seventh', '.eighth', '.seventh .q-info span', '.seventh .q-next', '.seventh .q-info span b img', 6);

//第8题
setAnswers('.eighth', '.ninth', '.eighth .q-info span', '.eighth .q-next', '.eighth .q-info span b img', 7);

//第9题
setAnswers('.ninth', '.tenth', '.ninth .q-info span', '.ninth .q-next', '.ninth .q-info span b img', 8);

//第10题
setAnswers('.tenth', '.result', '.tenth .q-info span', '.tenth .q-next', '.tenth .q-info span b img', 9);

function setAnswers(class1, class2, class3, class4, class5, num) { //num 正确答案的下标

    var oCurrentContainer = document.querySelector(class1); //当前题目

    var oNextContainer = document.querySelector(class2); //下一道题

    var aAnswersList = document.querySelectorAll(class3); //当前题目的答案列表

    var oNext = document.querySelector(class4); //当前题目的下一题按钮

    var aImg = document.querySelectorAll(class5); //当前题目的正确错误图标

    var n; //用户选择ID

    var isNext = false;

    for (var i = 0; i < aAnswersList.length; i++) {

        aAnswersList[i].index = i;

        aAnswersList[i].addEventListener('click', function () {

            for (var l = 0; l < aAnswersList.length; l++) {

                aAnswersList[l].classList.remove("active");

                if (l == this.index) {

                    aAnswersList[l].classList.add("active");

                }

            }

            n = this.index;

        }, false);

    }

    oNext.addEventListener('click', function () {

        if (!isNext) {

            isNext = true;

            if (n !== undefined) {
                if (n == rightAnswers[num]) {

                    aImg[n].src = imgUrl_1;
                    userScore = userScore + 10;
                    console.log("答对了", "当前分数：" + userScore, n, rightAnswers[num]);
                } else {

                    aImg[n].src = imgUrl_2;
                    console.log("答错了", "当前分数：" + userScore, n, rightAnswers[num]);
                }
            } else {
                console.log("没有答题", "当前分数：" + userScore, n, rightAnswers[num]);
            }

            setTimeout(function () {
                fadeIn(oNextContainer);
                fadeOut(oCurrentContainer)
            }, 1000);

            if (class2 == ".result") {

                var scoreImg = document.querySelector('.result h1 img');

                //wxJDKAuthorize(userScore);

                if (userScore == 100) {

                    $('.q-poser p i').css("font-size", "40px");
                    $('.q-poser p').css({
                        "font-size": "38px"
                    });

                    scoreImg.src = "images/img-30.png";

                } else if (userScore >= 60 && userScore <= 90) {

                    scoreImg.src = "images/img-29.png";

                } else if (userScore > 0 && userScore < 60) {

                    scoreImg.src = "images/img-28.png";

                } else if (userScore == 0) {

                    scoreImg.src = "images/img-28.png";

                }

                document.querySelector('.result p i').innerHTML = userScore;
            }
        }

    }, false);

}

var curTime = 0;
var m = 0;

//播放第二个视频
playSecondVideo();

function playSecondVideo() {

    var oBtn = document.querySelector('.result .q-next span');

    var oEndVideoContainer = document.querySelector('.end-video');

    var oEndVideo = document.querySelector('.end-video .video');

    var oEndLight = document.querySelector('.light2');

    var oWelfareContainer = document.querySelector('.welfare');



    var isfinish = false;

    oBtn.addEventListener('click', function () {

        fadeIn(oEndVideoContainer);

        bgMusic.pause();
        oEndVideo.currentTime = 0;

        isfinish = false;
        oEndVideo.play();

        oEndVideo.style["object-position"] = "0px 0px";

        oMusicIcon.style.display = "none";

    }, false);

    //视频播放结束-->显示答题封面
    oEndVideo.addEventListener('ended', function () {

        //fadeOut(oEndVideoContainer);
        //fadeIn(oWelfareContainer);
        isfinish = true;

    }, false);
    oEndVideo.addEventListener('play', function () {

        oEndVideo.ontimeupdate = function () {
            curTime = oEndVideo.currentTime.toFixed(2);

            if (curTime >= 17.00 && m == 0) {
                m = 1;
                //fadeIn(oWelfareContainer);
                oWelfareContainer.style.display="block";
				oWelfareContainer.style.opacity=1;
            }
            if (curTime >= 18.50) {
                isfinish = true;
                oEndVideo.pause();
                bgMusic.play();
                bgMusic.volume = 0.6;
                oMusicIcon.style.display = "block";
                fadeOut(oEndVideoContainer);
                $('.bg').show();
            }
        }

    }, false);

    oEndVideo.addEventListener("x5videoenterfullscreen", function () {
        //alert('进入全屏');
        oEndLight.style.display = "none";
    }, false);

    oEndVideo.addEventListener("x5videoexitfullscreen", function () {
        //alert('退出全屏');
        if (isfinish) {
            oEndLight.style.display = "none";
        } else {
            oEndLight.style.display = "block";
        }

    }, false);

    oEndLight.addEventListener('click', function () {
        oEndVideo.play();
    }, false);

}

//领取福利
getWelfare();

function getWelfare() {

    var regex = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

    var oSubBtn = document.querySelector('.get span');

    var oGetContainer = document.querySelector('.get');

    var oValue = document.querySelector('.user-phone');

    var oShare = document.querySelector('.share');

    var oAgen = document.querySelector('.agen span');

    var oText = document.querySelector('.agen h1');

    oSubBtn.addEventListener('click', function () {

        if (regex.test(oValue.value)) {

            fadeIn(oShare);
            fadeOut(oGetContainer);
            oText.innerHTML = "领取成功"; //如果已经领取过，则显示   已领取过

            //$.ajax({
            //    "url": "/ajax/smssendajax.aspx",            //    "type": "POST",            //    "cache": "false",            //    "dataType": "json",            //    "data": {
            //        "tp": "1",            //        "tel": oValue.value
            //    }, success: function (data) {
            //        fadeIn(oShare);            //        fadeOut(oGetContainer);            //        if (data.state == "100") {            //            //data.CardNumber            //            oText.innerHTML = "福利领取成功，您的专属<br>优惠码正以短信的形式<br>发送到手机"; //如果已经领取过，则显示   已领取过            //        }            //        else {
            //            oText.innerHTML = "领取失败，请稍候再来领取";
            //        }
            //    }
            //});

        } else {
            alert("请输入正确的手机号码");
        }

    }, false);

    oAgen.addEventListener('click', function () {

        userScore = 0;
        curTime = 0;
        m = 0;

        var aQ = document.querySelectorAll('.question');

        for (var i = 0; i < aQ.length; i++) {
            if (i == 0) {
                aQ[i].style.display = "block";
            } else {
                aQ[i].style.display = "none";
            }
            aQ[i].classList.remove('fadeOut');
            aQ[i].classList.remove('fadeIn');

        }
        oGetContainer.classList.remove('fadeOut');
        oGetContainer.style.display = "block";

        var ocheck = document.querySelectorAll(".one-check img");
        for (var t = 0; t < ocheck.length; t++) {
            ocheck[t].style.display = "none";
        }

        var ev = document.querySelector('.end-video');
        ev.classList.remove('fadeIn', 'fadeOut');
        ev.style.display = "none";

        var we = document.querySelector('.welfare');
        we.classList.remove('fadeIn');
        we.style.display = "none";

        var sh = document.querySelector('.share');
        sh.classList.remove('fadeIn');
        sh.style.display = "none";

        var bImg = document.querySelectorAll('.question b img');

        for (var j = 0; j < bImg.length; j++) {
            bImg[j].src = "";
        }

        var aActiv = document.querySelectorAll('.question .q-info span');
        for (var k = 0; k < aActiv.length; k++) {
            aActiv[k].className = "";
        }
        $('.bg').hide();
        //第1题
        firstQuestion();

        //第2题
        setAnswers('.two', '.third', '.two .q-info span', '.two .q-next', '.two .q-info span b img', 1);

        //第3题
        setAnswers('.third', '.fourth', '.third .q-info span', '.third .q-next', '.third .q-info span b img', 2);

        //第4题
        setAnswers('.fourth', '.fifth', '.fourth .q-info span', '.fourth .q-next', '.fourth .q-info span b img', 3);

        //第5题
        setAnswers('.fifth', '.sixth', '.fifth .q-info span', '.fifth .q-next', '.fifth .q-info span b img', 4);

        //第6题
        setAnswers('.sixth', '.seventh', '.sixth .q-info span', '.sixth .q-next', '.sixth .q-info span b img', 5);

        //第7题
        setAnswers('.seventh', '.eighth', '.seventh .q-info span', '.seventh .q-next', '.seventh .q-info span b img', 6);

        //第8题
        setAnswers('.eighth', '.ninth', '.eighth .q-info span', '.eighth .q-next', '.eighth .q-info span b img', 7);

        //第9题
        setAnswers('.ninth', '.tenth', '.ninth .q-info span', '.ninth .q-next', '.ninth .q-info span b img', 8);

        //第10题
        setAnswers('.tenth', '.result', '.tenth .q-info span', '.tenth .q-next', '.tenth .q-info span b img', 9);

    }, false);

}