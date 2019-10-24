//红包
var fileList_redPacket = [
	"images/red-packet/1.png",
	"images/red-packet/2.png",
	"images/red-packet/3.png",
	"images/red-packet/4.png",
	"images/red-packet/5.png",
	"images/red-packet/6.png",
	"images/red-packet/7.png",
	"images/red-packet/8.png",
	"images/red-packet/9.png",
	"images/red-packet/10.png",
	"images/red-packet/11.png",
	"images/red-packet/12.png",
	"images/red-packet/13.png",
	"images/red-packet/14.png",
	"images/red-packet/15.png",
	"images/red-packet/16.png",
	"images/red-packet/17.png",
	"images/red-packet/18.png",
	"images/red-packet/19.png",
	"images/red-packet/20.png",
	"images/red-packet/21.png",
	"images/red-packet/22.png",
	"images/red-packet/23.png",
	"images/red-packet/24.png"
];

//场景1--机场
var fileList_scene_1 = [
	"images/scene-01/feiji-01.png",
	"images/scene-01/feiji-02.png",
	"images/scene-01/scene-01-01.png"
];
//场景2--地铁
var fileList_scene_2 = [
	"images/scene-02/scene-img-01.png",
	"images/scene-02/scene-img-02.png",
	"images/scene-02/scene-img-03.png",
	"images/scene-02/scene-img-04.png",
	"images/scene-02/guidao.png"
];
//场景3--城市
var fileList_scene_3 = [
	"images/scene-03/scene-right-01.png",
	"images/scene-03/scene-right-02.png",
	"images/scene-03/scene-right-03.png",
	"images/scene-03/scene-right-04.png",
	"images/scene-03/scene-left-01.png",
	"images/scene-03/scene-left-02.png",
	"images/scene-03/scene-left-03.png",
	"images/scene-03/scene-left-04.png",
	"images/scene-03/dakucha.png"
];
//场景4--郊区
var fileList_scene_4 = [
	"images/scene-04/light.png",
	"images/scene-04/scene-03-02.png",
	"images/scene-04/scene-03-01.png",
	"images/scene-04/scene-03-04.png",
	"images/scene-04/scene-03-05.png",
	"images/scene-04/scene-03-03.png",
	"images/scene-04/feiji-03.png"
];
//场景5--石油
var fileList_scene_5 = [
	"images/scene-05/scene-05-02.png",
	"images/scene-05/scene-05-04.png",
	"images/scene-05/scene-05-05.png",
	"images/car.png",
	
	"images/scene-05/scene-05-06.png",
	"images/scene-05/scene-05-03.png",
	
	"images/scene-05/scene-05-01.png"
];
//其它
var fileList_other = [
	"images/bg.jpg",
	"images/btn-01.png",
	"images/btn-02.png",
	"images/scene-malu.jpg",
	"images/scene-03/daba.png",
	"images/red-click.jpg",
	"images/redbg.jpg",
	"images/xuehua.png",
	"images/natural.jpg",
	"images/bg2.jpg",
	"images/bg3.jpg",
	"images/play-01.png",
	"images/play-02.png",
	"images/img-01.png",
	"images/img-02.png",
	"images/img-03.png",
	"images/img-04.png",
	"images/img-05.png",
	"images/img-06.png",
	"images/img-07.png",
	"images/img-08.png",
	"images/img-09.png",
	"images/img-10.png",
	"images/img-11.png",
	"images/share.png"
	
];
//描边
var fileList_border = [
	"images/border/scene-01-border-01.png",
	"images/border/hint-01.png",
	
	"images/border/scene-02-border-01.png",
	"images/border/hint-02.png",
	
	"images/border/scene-03-border-01.png",
	"images/border/scene-03-border-03.png",
	"images/border/scene-03-border-02.png",
		
	"images/border/hint-03.png",
	"images/border/hint-04.png",
	
	"images/border/scene-03-border-04---.png",
	
	"images/border/scene-04-border-01.png",
	"images/border/hint-05.png",
	
	"images/border/scene-05-border-01.png",
	"images/border/hint-06.png"
];

var fileList = fileList_redPacket.concat(fileList_scene_1,fileList_scene_2, fileList_scene_3, fileList_scene_4, fileList_scene_5, fileList_other, fileList_border);

//loading-----------------------------------------------
var loader = new window.PxLoader();


for(var i = 0; i < fileList.length; i++) {
	loader.addImage(fileList[i]);
	//console.log(fileList[i]);
}

loader.start();

