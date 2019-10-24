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

function $A(obj) {
	return document.querySelector(obj);
}


var scene; //场景
var camera; //照相机
var renderer; //渲染器
var controls; //控制器
var stage = document.getElementById("stage"); //场景容器
var iOS;
var iosdir=1;
var len = 0;
var ro = 1;
if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
	iOS = true;
	iosdir=1;
	len =0.75;
	ro = 2;
}

var iosRotation=0;

var window_Width = window.innerWidth; //屏幕宽度
var window_Height = window.innerHeight; //屏幕高度

var oContainer = new THREE.Object3D(); //总容器
var wallContainer = new THREE.Object3D(); //墙壁
var qinzi = new THREE.Object3D(); //亲子
var wuzhe = new THREE.Object3D(); //舞者
var chengshi = new THREE.Object3D(); //城市
var hunsha = new THREE.Object3D(); //婚纱
var shishang = new THREE.Object3D(); //时尚
var fengjing = new THREE.Object3D(); //风景
var meishi = new THREE.Object3D(); //美食
var daomangquan = new THREE.Object3D(); //导盲犬
var yundong = new THREE.Object3D(); //运动
var xuezhiqian = new THREE.Object3D(); //薛之谦

var imagesContainer=new THREE.Object3D(); //存放点击图片区域

var hint = new THREE.Object3D();

var qinzi_wall = new THREE.Object3D(); //亲子
var wuzhe_wall = new THREE.Object3D(); //舞者
var chengshi_wall = new THREE.Object3D(); //城市
var hunsha_wall = new THREE.Object3D(); //婚纱
var shishang_wall = new THREE.Object3D(); //时尚
var fengjing_wall = new THREE.Object3D(); //风景
var meishi_wall = new THREE.Object3D(); //美食
var daomangquan_wall = new THREE.Object3D(); //导盲犬
var yundong_wall = new THREE.Object3D(); //运动
var xuezhiqian_wall = new THREE.Object3D(); //薛之谦

var arr = [qinzi, wuzhe, chengshi, hunsha, shishang, fengjing, meishi, daomangquan, yundong, xuezhiqian];
var arr_wall = [qinzi_wall, wuzhe_wall, chengshi_wall, hunsha_wall, shishang_wall, fengjing_wall, meishi_wall, daomangquan_wall, yundong_wall, xuezhiqian_wall];

var plane=[];

var getOrientation = null; //定义一个重力感应对象

var raycaster;
var _touch;

var startY = 0; //手指按下的开始位置
var moveY = 0; //手指滑动的距离-->场景内
var moveY2 = 0; //手指滑动的距离-->在海报页
var endY=0;
var timer = null; //手指按下定时器

var isUserTouch = false; //默认用户没有触摸
var isClick = false; //是否是点击，而不是滑动
var isShow = false; //是否可以显示图片
var isSlideVertical = true; //用户是否可以上下滑动
var isSlideHorizontal = false; //是否可以左右滑动
var isBottom = false; //是否到达底部--》海报页
var openNewWorld = false; //打开新世纪
var direction = 0; //在场景中 上滑--》1，下滑--》 -1
var isb=false;//海报定帧页，默认是没有滑到底部
var transY=0;
var tn=0;
var addevent=document.getElementById("addevent");
var posterBox=document.querySelector('.poster-box');
var isStart=false;

var isSlide=false;

var n = 0; //用户当前滑动的次数
var total = 9; //主题数 0-9

var aalpha = 0; //接收重力感应对象传回来的数值
var agamma=0;
var abeta = 0;

var isTouch=false;

var cameraY=0;

var oShowImage = document.getElementById('showImage');
var oClose = document.getElementById('close');
var left_icon = document.getElementById('left_icon');
var right_icon = document.getElementById('right_icon');

var loading = document.getElementById('loading');
var loadingProgress = document.getElementById('loadingProgress');
var oHint = document.getElementById('hint');
var box = document.getElementById("box_ul")
var poster = document.getElementById('poster');
var share_btn = document.getElementById('share_btn');
var share = document.getElementById('share');

var lw=parseInt(window_Width*0.95);
var oMusic = document.getElementById("music");
document.querySelector('.box').style.width=lw+'px';

oHint.addEventListener('touchstart', function(e) {
	e.preventDefault();
	oHint.className = 'section hint fade-out';
	setTimeout(function() {
		oHint.style.display = 'none';
		isClick = true;
		isStart=true;
		setTimeout(function(){
			if(!iOS){
				oMusic.play();
			}
		},500);
	}, 500);
}, false)

share_btn.addEventListener('touchstart', function(e) {
	e.preventDefault();
	share.style.display = 'block';
	if(iOS){
		
	}else{
		share.className = 'section share fade-in';
	}
}, false)

share.addEventListener('touchstart', function() {
	
	var tTime=100;
	
	if(iOS){
		tTime=100;
	}else{
		tTime=500;
		share.className = 'section share fade-out';
	}
	setTimeout(function() {
		share.style.display = 'none';
	},tTime);
}, false);

//判断手机横竖屏状态：
function hengshuping() {
	if(window.orientation == 180 || window.orientation == 0) {
		//document.title = `竖屏状态!`;		
		$A('.hsp').style.display = 'none';
	}
	if(window.orientation == 90 || window.orientation == -90) {
		//document.title = `横屏状态!`;				
		$A('.hsp').style.display = 'block';
	}
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
	$A('.hsp p').innerHTML = 'Lock your screen';

} else {
	$A('.hsp p').innerHTML = 'Unlock your automatic rotation';

}

//-----------------------------------------------------------------------------------------------

//左右墙
//var wallSize_1 = {
//	w: 12.2,
//	h: 12.3
//};
////前后墙
//var wallSize_2 = {
//	w: 17.6,
//	h: 12.3
//};

var wallSize_1 = {
	w: 12.2,
	h: 12.3
};
//前后墙
var wallSize_2 = {
	w: 17.6,
	h: 12.3
};

var distance = 0.2; //用户图片与墙壁的距离

var userImages = [{
		name: "1",
		w: 4.58,
		h: 3.5,
		px: wallSize_2.w / 2-distance ,
		py: 0.45,
		pz: -1.7,
		rx: 0,
		ry: Math.PI / 180 * 90,
		rz: 0
	},
	{
		name: "2",
		w: 3.45,
		h: 4.5,
		px: wallSize_2.w / 2 -distance,
		py: 0.35,
		pz: 3.5,
		rx: 0,
		ry: Math.PI / 180 * 90,
		rz: 0
	},
	{
		name: "3",
		w: 4.7,
		h: 3.6,
		px: 5.1,
		py: 0.35,
		pz: wallSize_1.w / 2 - distance,
		rx: 0,
		ry: 0,
		rz: 0
	},
	{
		name: "4",
		w: 3.5,
		h: 4.5,
		px: 0,
		py: 0.4,
		pz: wallSize_1.w / 2 - distance,
		rx: 0,
		ry: 0,
		rz: 0
	},
	{
		name: "5",
		w: 4.7,
		h: 3.6,
		px: -5.1,
		py: 0.35,
		pz: wallSize_1.w / 2 - distance,
		rx: 0,
		ry: 0,
		rz: 0
	},
	{
		name: "6",
		w: 4.7,
		h: 3.6,
		px: -wallSize_2.w / 2 +distance,
		py: 0.35,
		pz: 2.8,
		rx: 0,
		ry: -Math.PI / 180 * 90,
		rz: 0
	}
]

var data = [
	{
		left: "images/background/xuezhiqian/1.jpg",
		front: "images/background/xuezhiqian/2.jpg",
		right: "images/background/xuezhiqian/3.jpg",
		back: "images/background/4.jpg"
	},
	{
		left: "images/background/qinzi/1.jpg",
		front: "images/background/qinzi/2.jpg",
		right: "images/background/qinzi/3.jpg",
		back: "images/background/4.jpg"
	},
	{
		left: "images/background/wuzhe/1.jpg",
		front: "images/background/wuzhe/2.jpg",
		right: "images/background/wuzhe/3.jpg",
		back: "images/background/4.jpg"
	},
	{
		left: "images/background/chengshi/1.jpg",
		front: "images/background/chengshi/2.jpg",
		right: "images/background/chengshi/3.jpg",
		back: "images/background/4.jpg"
	},
	{
		left: "images/background/hunsha/1.jpg",
		front: "images/background/hunsha/2.jpg",
		right: "images/background/hunsha/3.jpg",
		back: "images/background/4.jpg"
	},
	{
		left: "images/background/shishang/1.jpg",
		front: "images/background/shishang/2.jpg",
		right: "images/background/shishang/3.jpg",
		back: "images/background/4.jpg"
	},
	{
		left: "images/background/fengjing/1.jpg",
		front: "images/background/fengjing/2.jpg",
		right: "images/background/fengjing/3.jpg",
		back: "images/background/4.jpg"
	},
	{
		left: "images/background/meishi/1.jpg",
		front: "images/background/meishi/2.jpg",
		right: "images/background/meishi/3.jpg",
		back: "images/background/4.jpg"
	},
	{
		left: "images/background/daomangquan/1.jpg",
		front: "images/background/daomangquan/2.jpg",
		right: "images/background/daomangquan/3.jpg",
		back: "images/background/4.jpg"
	},
	{
		left: "images/background/yundong/1.jpg",
		front: "images/background/yundong/2.jpg",
		right: "images/background/yundong/3.jpg",
		back: "images/background/4.jpg"
	}
];

//每个主题的用户图片，和文案

var aImages = [
	{
		theme: "xuezhiqian",
		images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
		txt: ["纵身一跃，如王子归来", "一直想说，爱我的人谢谢你", "方圆几里，就一个焦点", "让自己变得更好，只为了遇见你", "四摄拍照，刚刚好", "一个梦想，一首未完成的歌"]
	},
	{
		theme: "qinzi",
		images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
		txt: ["夕阳无限好，因为你在我身旁", "很快，你就会超越爸爸", "你的怀抱，是我最大的安全感", "爸爸，长大了，我要当歌手", "大脚掌与小脚丫", "爸爸就是我最强的“支柱”"]
	},
	{
		theme: "wuzhe",
		images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
		txt: ["拥抱自我，拥抱梦想，拥抱更美的自己！", "用照片记录每一次演出的成功，有天老了再看看，肯定会感谢今天的自己，那个为梦想充满热情的自己。", "我喜欢为传统的舞蹈加入新鲜的元素，你准备好迎接不一样的“舞蹈大咖”了吗？", "舞蹈的追求是孤单寂寞的，唯有梦想，一直陪伴着我！", "聚光灯背后，是无数次的练习", "因为热爱，生命才有了意义，就算只有一个人在跳舞，人生的舞台也可以十分绚丽。"]
	},
	{
		theme: "chengshi",
		images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
		txt: ["突然闯入的生灵，续写着倔强的梦想", "钢筋包围的城市，处处暗藏着梦想的加速度", "犹如时光隧道，通往希望的前方", "连斑驳的铁锈，都懂得平衡之美.", "冲破束缚的光影，如落地生根的种子，越往下，越有力量", "用脚丈量，一层又一层；用心触及，光明只需一瞬"]
	},
	{
		theme: "hunsha",
		images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
		txt: ["谢谢你，结束我爱情的独角戏。", "只需一眼，你就在我的视野焦点", "繁华都市，哪里都有我们的故事", "拥抱你，等于拥抱了我的余生", "你在我身边，更在我心里", "忍不住偷看你一眼，尽管可以看你一辈子"]
	},
	{
		theme: "shishang",
		images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
		txt: ["优雅", "温柔", "囚鸟", "酷夏", "旧街角女郎", "摩登时代"]
	},
	{
		theme: "fengjing",
		images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
		txt: ["敬畏自然，感受最原始的力量", "那一抹彩色，是生命跳跃的颜色", "那天的故事、那月的记忆、那年的岁月，已随那风斑驳封尘。", "岁月走过的痕迹，是生命最灿烂的时刻", "橱窗将时间全部打捞，散发着故事的味道", "在最靠近天堂的地方，听见自己的声音"]
	},
	{
		theme: "meishi",
		images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
		txt: ["一个小小的拉花，给自己送上一份生活的小惊喜", "许久之后，自己会不会成为一个老板娘，每天把杯子擦的锃亮？", "咖啡中的方糖，溅起少女的青春", "吃上一块洒满可可粉的提拉米苏，想着“什么时候才能遇到一个也喜欢吃甜品的男生呢？”", "一壶柚子茶,倒满一整个夏天的早晨.", "携子之手，与子做吃货"]
	},
	{
		theme: "daomangquan",
		images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
		txt: ["偌大的房间，还好你在身边", "有我在你身边，请放一百个心", "每一步台阶，都有你的保护", "默默守在你的身边，随时等待你的召唤", "你是我最亲密的听众", "想把我唱给你听，只有你懂我的心"]
	},
	{
		theme: "yundong",
		images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
		txt: ["每一次从容，都是对自己最好的尊重", "汗流浃背，是我最美的时刻", "愿我每次出手，都能打败时间", "这是我的擂台，是我人生最精彩的地方", "来吧，我已经准备好了", "再多的阻碍，也挡不住前进的力量"]
	}
];

var fileList = [
	"images/other/img-01.png",
	"images/other/img-loading.jpg",
	"images/other/logo.png",
	"images/background/4.jpg",
	"images/background/qinzi/1.jpg",
	"images/background/qinzi/2.jpg",
	"images/background/qinzi/3.jpg",
	"images/background/wuzhe/1.jpg",
	"images/background/wuzhe/2.jpg",
	"images/background/wuzhe/3.jpg",
	"images/background/chengshi/1.jpg",
	"images/background/chengshi/2.jpg",
	"images/background/chengshi/3.jpg",
	"images/background/hunsha/1.jpg",
	"images/background/hunsha/2.jpg",
	"images/background/hunsha/3.jpg",
	"images/background/shishang/1.jpg",
	"images/background/shishang/2.jpg",
	"images/background/shishang/3.jpg",
	"images/background/fengjing/1.jpg",
	"images/background/fengjing/2.jpg",
	"images/background/fengjing/3.jpg",
	"images/background/meishi/1.jpg",
	"images/background/meishi/2.jpg",
	"images/background/meishi/3.jpg",
	"images/background/daomangquan/1.jpg",
	"images/background/daomangquan/2.jpg",
	"images/background/daomangquan/3.jpg",
	"images/background/yundong/1.jpg",
	"images/background/yundong/2.jpg",
	"images/background/yundong/3.jpg",
	"images/background/xuezhiqian/1.jpg",
	"images/background/xuezhiqian/2.jpg",
	"images/background/xuezhiqian/3.jpg",
	"images/big/qinzi/1.jpg",
	"images/big/qinzi/2.jpg",
	"images/big/qinzi/3.jpg",
	"images/big/qinzi/4.jpg",
	"images/big/qinzi/5.jpg",
	"images/big/qinzi/6.jpg",
	"images/big/wuzhe/1.jpg",
	"images/big/wuzhe/2.jpg",
	"images/big/wuzhe/3.jpg",
	"images/big/wuzhe/4.jpg",
	"images/big/wuzhe/5.jpg",
	"images/big/wuzhe/6.jpg",
	"images/big/chengshi/1.jpg",
	"images/big/chengshi/2.jpg",
	"images/big/chengshi/3.jpg",
	"images/big/chengshi/4.jpg",
	"images/big/chengshi/5.jpg",
	"images/big/chengshi/6.jpg",
	"images/big/hunsha/1.jpg",
	"images/big/hunsha/2.jpg",
	"images/big/hunsha/3.jpg",
	"images/big/hunsha/4.jpg",
	"images/big/hunsha/5.jpg",
	"images/big/hunsha/6.jpg",
	"images/big/shishang/1.jpg",
	"images/big/shishang/2.jpg",
	"images/big/shishang/3.jpg",
	"images/big/shishang/4.jpg",
	"images/big/shishang/5.jpg",
	"images/big/shishang/6.jpg",
	"images/big/fengjing/1.jpg",
	"images/big/fengjing/2.jpg",
	"images/big/fengjing/3.jpg",
	"images/big/fengjing/4.jpg",
	"images/big/fengjing/5.jpg",
	"images/big/fengjing/6.jpg",
	"images/big/meishi/1.jpg",
	"images/big/meishi/2.jpg",
	"images/big/meishi/3.jpg",
	"images/big/meishi/4.jpg",
	"images/big/meishi/5.jpg",
	"images/big/meishi/6.jpg",
	"images/big/daomangquan/1.jpg",
	"images/big/daomangquan/2.jpg",
	"images/big/daomangquan/3.jpg",
	"images/big/daomangquan/4.jpg",
	"images/big/daomangquan/5.jpg",
	"images/big/daomangquan/6.jpg",
	"images/big/yundong/1.jpg",
	"images/big/yundong/2.jpg",
	"images/big/yundong/3.jpg",
	"images/big/yundong/4.jpg",
	"images/big/yundong/5.jpg",
	"images/big/yundong/6.jpg",
	"images/big/xuezhiqian/1.jpg",
	"images/big/xuezhiqian/2.jpg",
	"images/big/qinzi/3.jpg",
	"images/big/xuezhiqian/4.jpg",
	"images/big/xuezhiqian/5.jpg",
	"images/big/xuezhiqian/6.jpg"
];