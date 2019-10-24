//----------------------------------机场------------------------------------

//第一个场景--机场
var data_scene_1 = [
	{name:"feiji-02" ,w:1024 ,h:1024 ,x:-16 ,y:1140 ,z:510,mi:1 } 
];

//8个飞机
var scene_1_plane=[
	{name:"feiji-01-right-01" ,w:768 ,h:384 ,x:555 ,y:365 ,z:-500 ,mi:1},
	{name:"feiji-01-right-02" ,w:768 ,h:384 ,x:555 ,y:1050 ,z:-500 ,mi:1},
	{name:"feiji-01-right-03" ,w:768 ,h:384 ,x:555 ,y:1750 ,z:-500 ,mi:1},
	{name:"feiji-01-right-04" ,w:768 ,h:384 ,x:555 ,y:2500 ,z:-500 ,mi:1},
	{name:"feiji-01-left-001" ,w:768 ,h:384 ,x:-555 ,y:365 ,z:-500 ,mi:-1},
	{name:"feiji-01-left-002" ,w:768 ,h:384 ,x:-555 ,y:1050 ,z:-500 ,mi:-1},
	{name:"feiji-01-left-003" ,w:768 ,h:384 ,x:-555 ,y:1750 ,z:-500 ,mi:-1},
	{name:"feiji-01-left-004" ,w:768 ,h:384 ,x:-555 ,y:2500 ,z:-500 ,mi:-1}
];

//航站楼
var scene_1_floor=[
	{name:"hangzhanlou-right" ,w:1640 ,h:820 ,x:820 ,y:3950 ,z:-370 ,mi:-1},
	{name:"hangzhanlou-left" ,w:1640 ,h:820 ,x:-820 ,y:3950 ,z:-370,mi:1 }
];

//地面
var scene_1_dimian=[
	{name:"jichangdimian" ,w:5000 ,h:7500 ,x:0 ,y:3350 ,z:-660,mi:1 },
	{name:"jichangdimian-002" ,w:5000 ,h:500 ,x:0 ,y:4400 ,z:-582,mi:1 }
];
//线条
var scene_1_xiantiao=[
	{name:"xiantiao-right-001" ,w:2000 ,h:10 ,x:1255 ,y:365 ,z:-581,mi:1 },
	{name:"xiantiao-right-002" ,w:2000 ,h:10 ,x:1255 ,y:1050 ,z:-581,mi:1 },
	{name:"xiantiao-right-003" ,w:2000 ,h:10 ,x:1255 ,y:1750 ,z:-581,mi:1 },
	{name:"xiantiao-right-004" ,w:2000 ,h:10 ,x:1255 ,y:2500 ,z:-581,mi:1 },
	{name:"xiantiao-right-005" ,w:2000 ,h:10 ,x:1255 ,y:3250 ,z:-581,mi:1 },
	{name:"xiantiao-z-001" ,w:3500 ,h:10 ,x:250 ,y:3000 ,z:-581,mi:1 },
	{name:"xiantiao-z-002" ,w:3500 ,h:10 ,x:50 ,y:3000 ,z:-581,mi:1 },
	{name:"xiantiao-z-003" ,w:3500 ,h:10 ,x:0 ,y:3000 ,z:-581,mi:1 }
];



//----------------------------------地铁------------------------------------

//第二个场景--地铁
var data_scene_2 = [	
	{name:"malu" ,w:5000 ,h:15000 ,x:0 ,y:12650 ,z:-582,mi:1 },
	{name:"tiegui" ,w:500 ,h:4000 ,x:0 ,y:6465 ,z:-581,mi:1 },
	{name:"ditie" ,w:160 ,h:640 ,x:0 ,y:4864 ,z:-275,mi:1 },
	{name:"dongfangmingzhu" ,w:615 ,h:2458 ,x:0 ,y:8465 ,z:735,mi:1 } 
];

//楼
var scene_2_floor = [
	{name:"scene-02-right-001" ,w:1024 ,h:1024 ,x:480 ,y:5310 ,z:-100,mi:-1 },
	{name:"scene-02-right-002" ,w:1024 ,h:1024 ,x:480 ,y:7631 ,z:-108,mi:-1 },
	{name:"lunduntaqiao-left" ,w:1024 ,h:1024 ,x:-512 ,y:6558 ,z:-80,mi:1 },
];
//

//----------------------------------城市------------------------------------

//第三个场景--城市
var data_scene_3 = [
	{name:"scene-03-xiantiao" ,w:10 ,h:12000 ,x:0 ,y:14465 ,z:-581,mi:1 },
	{name:"scene-03-right-001" ,w:768 ,h:1536 ,x:519 ,y:9507 ,z:149,mi:1 },
	{name:"scene-03-right-002" ,w:794 ,h:1587 ,x:555 ,y:12301 ,z:145,mi:1 },
	{name:"scene-03-right-003" ,w:615 ,h:1229 ,x:470 ,y:13809 ,z:18,mi:1 },
	{name:"scene-03-right-004" ,w:1536 ,h:1536 ,x:450 ,y:11002 ,z:176,mi:1 },
	{name:"scene-03-left-001" ,w:768 ,h:768 ,x:-500 ,y:9507 ,z:-268,mi:1 },
	{name:"scene-03-left-002" ,w:768 ,h:1536 ,x:-566 ,y:12301 ,z:166,mi:1 },
	{name:"scene-03-left-003" ,w:768 ,h:1536 ,x:-580 ,y:13809 ,z:157,mi:1 },
	{name:"scene-03-left-004" ,w:1024 ,h:1024 ,x:-673 ,y:11002 ,z:-145,mi:1 },
	{name:"dakucha" ,w:1536 ,h:1536 ,x:80 ,y:15020 ,z:189,mi:1 }
];

var add_scene_3_1=[
	{name:"scene-03-left-001" ,w:500 ,h:500 ,x:1048 ,y:9812 ,z:-268,mi:-1 },
	{name:"scene-03-left-001" ,w:500 ,h:500 ,x:1120 ,y:12350 ,z:-268,mi:-1 },
	{name:"scene-03-left-001" ,w:500 ,h:500 ,x:877 ,y:13927 ,z:-268,mi:-1 },
	{name:"scene-03-left-001" ,w:500 ,h:500 ,x:-966 ,y:9812 ,z:-268,mi:1 },
	{name:"scene-03-left-001" ,w:500 ,h:500 ,x:-810 ,y:14088 ,z:-268,mi:1 },
	{name:"scene-03-right-004" ,w:1536 ,h:1536 ,x:-826 ,y:15252 ,z:176,mi:-1 }
];

//----------------------------------郊区------------------------------------

//第四个场景--郊区
var data_scene_4 = [
	{name:"zhongguodianxin" ,w:512 ,h:216 ,x:425 ,y:15781 ,z:320,mi:1 },
	{name:"zhongguoyidong" ,w:512 ,h:512 ,x:295 ,y:17140 ,z:85,mi:1 },
	{name:"zhongguoliantong" ,w:512 ,h:216 ,x:-419 ,y:17140 ,z:332,mi:1 },
	{name:"feiji-03" ,w:512 ,h:216 ,x:170 ,y:19235 ,z:845,mi:1 }
];

//第一栋楼
var scene_4_floor = [
	{name:"scene-04-right-01" ,w:1024 ,h:1024 ,x:660 ,y:15784 ,z:-127,mi:-1 },
	{name:"scene-04-right-02" ,w:1024 ,h:1024 ,x:655 ,y:17143 ,z:-121,mi:-1 },
	{name:"scene-04-right-03" ,w:1024 ,h:1024 ,x:680 ,y:18704 ,z:-149,mi:-1 }
];

var add_scene_4_1=[
	{name:"scene-03-left-001" ,w:500 ,h:500 ,x:-920 ,y:16303 ,z:-369,mi:1 }
];


//----------------------------------石油------------------------------------

//第五个场景--石油
var data_scene_5 = [
	{name:"scene-05-right-002" ,w:768 ,h:1536 ,x:635 ,y:21571 ,z:160,mi:1 },
	{name:"scene-05-left-002" ,w:1024 ,h:1024 ,x:-692 ,y:21571 ,z:-154,mi:1 },
	{name:"car" ,w:256 ,h:256 ,x:0 ,y:22440 ,z:-446,mi:1 },
];

var scene_5_floor = [
	{name:"scene-05-right-001" ,w:563 ,h:1126 ,x:445 ,y:20016 ,z:-58,mi:-1 },
	{name:"scene-05-right-003" ,w:1080 ,h:1080 ,x:800 ,y:23124 ,z:-119,mi:-1 },
	{name:"scene-05-right-004" ,w:1382 ,h:691 ,x:949 ,y:24110 ,z:-236,mi:-1 }
];

var scene_5_shamo=[
	{name:"shamo-dimian" ,w:5000 ,h:6300 ,x:0 ,y:22957 ,z:-581,mi:1 }
];


//第六个场景
var data_scene_6=[
	{name:"beijingchengshi" ,w:2446 ,h:2500 ,x:0 ,y:26107 ,z:669,mi:1 }
];


//提示
var hint_1=[
	{name:"scene-01-border" ,w:1640 ,h:820 ,x:820 ,y:3949 ,z:-370,mi:-1 },
	{name:"scene-01-border" ,w:1640 ,h:820 ,x:-820 ,y:3949 ,z:-370,mi:1 },
	{name:"hint-01" ,w:1024 ,h:512 ,x:0 ,y:3950 ,z:580,mi:1 }
];
var hint_2=[
	{name:"scene-02-border-01" ,w:160 ,h:640 ,x:0 ,y:4863 ,z:-275,mi:1 },
	{name:"hint-02" ,w:1024 ,h:512 ,x:0 ,y:6558 ,z:415,mi:1 }
];
var hint_3=[
	{name:"scene-03-border-01" ,w:794 ,h:1587 ,x:555 ,y:12300 ,z:145,mi:1 },
	{name:"scene-03-border-02" ,w:768 ,h:1536 ,x:-566  ,y:12300 ,z:166,mi:1 },
	{name:"scene-03-border-03" ,w:768 ,h:1536 ,x:-580  ,y:13808 ,z:157,mi:1 },
	{name:"hint-03" ,w:1024*0.8 ,h:512*0.8 ,x:0 ,y:11622 ,z:550,mi:1 },
	{name:"hint-04" ,w:1024 ,h:512 ,x:0 ,y:13788 ,z:555,mi:1 }
];
var hint_4=[
	{name:"scene-03-border-04---" ,w:1024 ,h:1024 ,x:680 ,y:18703 ,z:-149,mi:-1 },
	{name:"scene-03-border-04---" ,w:1024 ,h:1024 ,x:-680 ,y:18703 ,z:-149,mi:1 },
	{name:"scene-04-border-01" ,w:1024,h:1024 ,x:660 ,y:15782 ,z:-127,mi:-1 },
	{name:"scene-04-border-01" ,w:1024,h:1024 ,x:655 ,y:17141 ,z:-121,mi:-1 },
	{name:"scene-04-border-01" ,w:1024,h:1024 ,x:-655 ,y:17141 ,z:-121,mi:1 },
	{name:"hint-05" ,w:1024 ,h:512 ,x:0 ,y:17435 ,z:600,mi:1 }
];
var hint_5=[
	{name:"scene-05-border-01" ,w:1080,h:1080 ,x:800 ,y:23123 ,z:-119,mi:-1 },
	{name:"scene-05-border-01" ,w:1080,h:1080 ,x:-800 ,y:23123 ,z:-119,mi:1 },
	{name:"hint-06" ,w:1024 ,h:512 ,x:0 ,y:22175 ,z:500,mi:1 }
];


//视频提示
var video_hint_2=[
	{name:"play01" ,w:250 ,h:250 ,x:0 ,y:3780 ,z:-350,mi:1 },
	{name:"play02" ,w:250 ,h:250 ,x:0 ,y:3778 ,z:-350,mi:1 }
];
var video_hint_1=[
	{name:"play01" ,w:250 ,h:250 ,x:0 ,y:18667 ,z:-400,mi:1 },
	{name:"play02" ,w:250 ,h:250 ,x:0 ,y:18665 ,z:-400,mi:1 }
];
var video_hint_3=[
	{name:"play01" ,w:60 ,h:60 ,x:0 ,y:4464 ,z:-50,mi:1 },
	{name:"play02" ,w:60 ,h:60 ,x:0 ,y:4462 ,z:-50,mi:1 }
];

























