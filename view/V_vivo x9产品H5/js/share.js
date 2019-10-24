
//微信分享jdk
var appId, timestamp, nonceStr, signature;
var jurl = "http://wx.wutaiwei.com/ajax/wxfxajax.aspx";
var ur = encodeURIComponent(location.href);
$.get(jurl, { "ur": ur }, function(data) {
    if (data.state == "100") {
        appId = data.appid;
        timestamp = data.js_timestamp;
        nonceStr = data.js_nonceStr;
        signature = data.js_signature;
        wxJDKAuthorize();
    }
}, "json");

function wxJDKAuthorize() {
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'openLocation',
            'getLocation',
            'scanQRCode'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function() {
        var imgUrl = 'http://sztest.toprand.com.cn/yxy/vivo_x9_more_h5_1115_03/images/picture.jpg';  //分享后展示的一张图片
        var lineLink = 'http://sztest.toprand.com.cn/yxy/vivo_x9_more_h5_1115_03/index.html'; // 点击分享后跳转的页面地址
        var shareTitle = '彭于晏带你看X9，面对面传授自拍秘诀！';  // 分享后的标题
        var descContent = "彭于晏的自拍神器原来是它";  // 分享后的描述信息

        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: shareTitle, // 分享标题
            link: lineLink, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
                _hmt.push(["_trackEvent", "分享到朋友圈", "分享到朋友圈success"]);
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: shareTitle, // 分享标题
            desc: descContent, // 分享描述
            link: lineLink, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
                // 用户确认分享后执行的回调函数
                // _hmt.push(["_trackEvent", "发给朋友", "发给朋友success"]);
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });

        //获取“分享到QQ”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQQ({
            title: shareTitle, // 分享标题
            desc: descContent, // 分享描述
            link: lineLink, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
                // _hmt.push(["_trackEvent", "分享到QQ", "分享到QQ success"]);
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
        //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        wx.onMenuShareWeibo({
            title: shareTitle, // 分享标题
            desc: descContent, // 分享描述
            link: lineLink, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
                _hmt.push(["_trackEvent", "分享到腾讯微博", "分享到腾讯微博success"]);
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
        //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQZone({
            title: shareTitle, // 分享标题
            desc: descContent, // 分享描述
            link: lineLink, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
                _hmt.push(["_trackEvent", "分享到QQ空间", "分享到QQ空间success"]);
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });

    });

    wx.error(function(res) {
        //config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
        //对于SPA可以在这里更新签名。
    });
}