//自定义微信分享

var oUrl=window.location.href;

window.shareData = {
	picUrl: "https://static.vivo.com.cn/hd/vivox21lh/images/share.jpg",
	url: oUrl,
	title: "和鹿晗一起打开X21的秘密",
	desc: "或许这个秘密，只有鹿晗和你才知道喔",
	timelineTitle: "和鹿晗一起打开X21的秘密",

	callback: function(type) {
		if(typeof MtaH5 != "undefined") {
			MtaH5.clickStat(type);
		}
	}
};

var aT = ["速度围观！鹿晗即将公开关于21的秘密！","快来和鹿晗一起打开21的秘密！","有个关于21的秘密，鹿晗只想对你说..."];

var oT=aT[parseInt(Math.random() * aT.length)];


var timelineShareData, appmessageShareData;

function refreshShareData() {
	
	timelineShareData = {
		title: oT,
		link: oUrl,
		imgUrl: window.shareData.picUrl,
		success: function() {
			window.shareData.callback("sharetimeline");
		},
		cancel: function() {}
	}

	appmessageShareData = {
		title: window.shareData.title,
		desc: window.shareData.desc,
		link: oUrl,
		imgUrl: window.shareData.picUrl,
		success: function() {
			window.shareData.callback("shareappmessage");
		},
		cancel: function() {}
	}

	wx.ready(function() {

		wx.onMenuShareTimeline(timelineShareData);

		wx.onMenuShareAppMessage(appmessageShareData);

		wx.onMenuShareQQ({
			title: window.shareData.title,
			desc: window.shareData.desc,
			link: oUrl,
			imgUrl: window.shareData.picUrl,
			success: function() {
				shareData.callback("shareqq");
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		});
		wx.onMenuShareWeibo({
			title: window.shareData.title,
			desc: window.shareData.desc,
			link: oUrl,
			imgUrl: window.shareData.picUrl,
			success: function() {
				shareData.callback("shareweibo");
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		});
	})
}
refreshShareData();