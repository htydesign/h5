// var video_1 = document.getElementById("video_1");
var video_2 = document.getElementById("video_2");
var browser = {
	versions: function() {
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

// var loader = new window.PxLoader();
// var fileList = [
// 	// 'video/01.mp4',
// 	'images/loading.jpg',
// 	'images/01.jpg',
// 	'images/06.jpg'
// ];

// // 把图片添加到数组中
// for(var i = 0; i < fileList.length; i++) {
// 	loader.addImage(fileList[i]);

// }

// //加载的进度...
// loader.addProgressListener(function(e) {
// 	var percent = Math.round((e.completedCount / e.totalCount) * 100);
// 	console.log(percent);
// 	$("#loading").find(".percent").html(percent+"%");
// });

// var isStart = false;

// 加载完成执行...
// loader.addCompletionListener(function() {

// 	$('#loading').fadeOut();
// 	$('.video-box').show();

// 	setTimeout(function(){
// 		$(".percent1").hide();
// 		$(".percent2").show();
// 	},1000)
// 	setTimeout(function(){
// 		$(".percent2").hide();
// 		$(".percent3").show();
// 	},2000)
// 	setTimeout(function(){
// 		$(".percent3").hide();
// 		$(".percent4").show();
// 	},3000)

// 	setTimeout(function(){
// 		$("#afterLoading").hide();
// 		$(".page-1").show();
// 			video_1.pause();
// 		click1();
// 	},4000);

// 	// 第一次交互，点击摄像头开始播放视频
// 	function click1(){
// 		$(".click_box1").click(function(){	

// 			$(".page-1").remove();
// 			video_1.play();

// 			video_1.ontimeupdate = function () {
// 		        var vTime1 = video_1.currentTime;
// 				console.log(vTime1);
// 				if(vTime1>74.5){
// 					$(".video_1").remove();
// 					video_1.pause();
					
// 					$(".thelast").show();
// 				}
// 		    };

// 		})
// 	}

// });


// 开始加载loader...
// loader.start();

document.onreadystatechange = loading; 
function loading(){
	$('#loading').fadeOut();
	$('.video-box').show();

	if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
		$(".page-1").css("background","url(images/01.jpg) center center no-repeat");
		// $(".load,.first").css("top","458px");
		$(".load,.first").css("margin-top","-100px");
	}
	else if(browser.versions.android) {
		$(".page-1").css("background","url(images/02.jpg) center top no-repeat");
		$(".load,.first").css("top","388px");
	}

	setTimeout(function(){
		$(".percent").text("10%");
	},1000);
	setTimeout(function(){
		$(".percent").text("40%");
	},2000);
	setTimeout(function(){
		$(".percent").text("70%");
	},3000);
	setTimeout(function(){
		$(".percent").text("100%");
	},3800);

	setTimeout(function(){
		$("#afterLoading").hide();
		$(".page-1").show();
			// video_1.pause();
			video_2.pause();
		click1();
	},4000);

	// 第一次交互，点击摄像头开始播放视频
	function click1(){
		$(".click_box1").on("click",function(){
			// $(".page-1").remove();
			// video_1.play();
			$(".video_2").show();
			$(".page-1").remove();
			video_2.play();


			// if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
			// 	// alert("ios");

			// 	// alert(window.screen.height);

			// 	$(".video_1").show();
			// 	$(".page-1").remove();
			// 	video_1.play();

			// 	// iphone 6 || iphone 6 plus
			// 	// if(window.screen.height == 667 || window.screen.height == 736){
			// 	// 	$(".video_2").show();
			// 	// 	$(".page-1").remove();					
			// 	// 	video_2.play();
			// 	// }
			// 	// else{
			// 	// 	$(".video_1").show();
			// 	// 	$(".page-1").remove();
			// 	// 	video_1.play();
			// 	// }

			// } else if(browser.versions.android) {
			// 	// alert("android");
			// 	$(".video_2").show();
			// 	$(".page-1").remove();
			// 	video_2.play();
			// }


			// video_1.ontimeupdate = function () {
		 //        var vTime1 = video_1.currentTime;
			// 	console.log(vTime1);
			// 	if(vTime1>78.0){

			// 		$(".thelast").show();
			// 		$(".video_1").remove();
					
			// 		video_1.pause();
					
			// 	}
		 //    };

		    


		})
	}
}

			video_2.ontimeupdate = function () {
		        var vTime2 = video_2.currentTime;
				console.log(vTime2);
				if(vTime2>78.0){

					$(".thelast").show();
					$(".video_2").remove();

					video_2.pause();
					
					
				}
		    };

// 监听播放时间
// function getCurrentvideo_1Position() {
// 	video_1.ontimeupdate = function () {
//         var vTime1 = video_1.currentTime;
// 		console.log(vTime1);
//     };
//     video_2.ontimeupdate = function () {
//         var vTime2 = video_2.currentTime;
// 		console.log(vTime2);
//     };
//     video_3.ontimeupdate = function () {
//         var vTime3 = video_3.currentTime;
// 		console.log(vTime3);
//     };
//     video_4.ontimeupdate = function () {
//         var vTime4 = video_4.currentTime;
// 		console.log(vTime4);
//     };
//     video_5.ontimeupdate = function () {
//         var vTime5 = video_5.currentTime;
// 		console.log(vTime5);
//     };
// };
// getCurrentvideo_1Position();

