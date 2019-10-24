var fileList = [
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
	"images/img-12.jpg",
	"images/img-13.png",
	"images/img-14.png",
	"images/img-15.png",
	"images/img-16.png",
	"images/img-17.png",
	"images/img-18.png",
	"images/img-19.jpg",
	"images/img-20.jpg",
	"images/img-21.png",
	"images/img-22.jpg",
	"images/img-23.png",
	"images/img-24.jpg",
	"images/img-25.png",
	"images/img-26.png",
	"images/img-27.png",
	"images/img-28.png",
	"images/img-30.png",
	"images/img-32.png",
	"images/img-33.png",
	"images/img-34.png",
	"images/img-35.png",
	"images/img-36.png",
	"images/img-37.png",
	"images/img-38.png",
	"images/img-39.png",
	"images/img-40.png",
	"images/img-41.png",
	"images/img-42.png",
	"images/img-43.png",
	"images/img-44.png",
	"images/img-45.png",
	"images/img-46.png",
	"images/img-47.png",
	"images/img-48.png",
	"images/img-49.png",
	"images/img-50.png",
	"images/img-51.png",
	"images/img-52.png",
	"images/img-53.png",
	"images/img-54.png",
	"images/img-55.png",
	"images/img-56.png",
	"images/img-57.png",
	"images/img-58.png",
	"images/img-59.png",
	"images/img-61.png",
	"images/img-62.png",
	"images/img-63.png",
	"images/img-64.png",
	"images/img-65.png",
	"images/img-66.png",
	"images/bomb.png",
	"images/goods/common/1.png",
	"images/goods/common/2.png",
	"images/goods/common/3.png",
	"images/goods/common/4.png",
	"images/goods/keting/1.png",
	"images/goods/keting/2.png",
	"images/goods/keting/3.png",
	"images/goods/keting/4.png",
	"images/goods/keting/5.png",
	"images/goods/keting/6.png",
	"images/goods/keting/7.png",
	"images/goods/keting/8.png",
	"images/goods/keting/9.png",
	"images/goods/keting/10.png",
	"images/goods/product/1.png",
	"images/goods/product/2.png",
	"images/goods/product/3.png",
	"images/goods/product/4.png",
	"images/goods/product/5.png",
	"images/goods/product/6.png",
	"images/goods/product/7.png",
	"images/goods/product/8.png",
	"images/goods/product/9.png",
	"images/goods/product/10.png",
	"images/goods/woshi/1.png",
	"images/goods/woshi/2.png",
	"images/goods/woshi/3.png",
	"images/goods/woshi/4.png",
	"images/goods/woshi/5.png",
	"images/goods/woshi/6.png",
	"images/goods/woshi/7.png",
	"images/goods/woshi/8.png",
	"images/goods/woshi/9.png",
	"images/goods/woshi/10.png",
	"images/goods/yangtai/1.png",
	"images/goods/yangtai/2.png",
	"images/goods/yangtai/3.png",
	"images/goods/yangtai/4.png",
	"images/goods/yangtai/5.png",
	"images/goods/yangtai/6.png",
	"images/goods/yangtai/7.png",
	"images/goods/yangtai/8.png",
	"images/goods/yangtai/9.png",
	"images/goods/yangtai/10.png",
	"images/goods/yangtai/11.png"

];

//客厅--卧室--阳台--家电节
var mapData = [{
	noEceneElement: [
		{
			src: "keting/4.png",
			w: 247,
			h: 335,
			name: "keting4",
			sumsung: 0,
			score: -1
		},
		{
			src: "keting/5.png",
			w: 278,
			h: 280,
			name: "keting5",
			sumsung: 0,
			score: -1
		},
		{
			src: "keting/6.png",
			w: 185,
			h: 236,
			name: "keting6",
			sumsung: 0,
			score: -1
		},
		{
			src: "keting/7.png",
			w: 262,
			h: 175,
			name: "keting7",
			sumsung: 0,
			score: -1
		},
		{
			src: "keting/10.png",
			w: 215,
			h: 272,
			name: "keting10",
			sumsung: 0,
			score: -1
		}
	],
	sceneElement: [{
			src: "keting/1.png",
			w: 204,
			h: 204,
			name: "keting1",
			sumsung: 0,
			score: 1
		},
		{
			src: "keting/2.png",
			w: 178,
			h: 277,
			name: "keting2",
			sumsung: 0,
			score: 1
		},
		{
			src: "keting/3.png",
			w: 344,
			h: 197,
			name: "keting3",
			sumsung: 0,
			score: 1
		},
		{
			src: "keting/8.png",
			w: 228,
			h: 219,
			name: "keting8",
			sumsung: 0,
			score: 1
		},
		{
			src: "keting/9.png",
			w: 290,
			h: 191,
			name: "keting9",
			sumsung: 0,
			score: 1
		}
	],
	sumsungGoods: [{
			src: "product/1.png",
			w: 288,
			h: 277,
			name: "product1",
			sumsung: 1,
			score: 2
		},
		{
			src: "product/3.png",
			w: 239,
			h: 291,
			name: "product3",
			sumsung: 1,
			score: 2
		},
		{
			src: "product/5.png",
			w: 162,
			h: 281,
			name: "product5",
			sumsung: 1,
			score: 2
		},
		{
			src: "product/8.png",
			w: 151,
			h: 277,
			name: "product8",
			sumsung: 1,
			score: 2
		},
		{
			src: "product/9.png",
			w: 127,
			h: 277,
			name: "product9",
			sumsung: 1,
			score: 2
		}
	],
	LanternFestival: [{
			src: "common/1.png",
			w: 216,
			h: 242,
			name: "common1",
			sumsung: 0,
			score: -5
		},
		{
			src: "common/2.png",
			w: 171,
			h: 286,
			name: "common2",
			sumsung: 0,
			score: 3
		},
		{
			src: "common/3.png",
			w: 217,
			h: 257,
			name: "common3",
			sumsung: 0,
			score: 3
		},
		{
			src: "common/4.png",
			w: 180,
			h: 295,
			name: "common4",
			sumsung: 0,
			score: 3
		}
	]
}, {
	noEceneElement: [
		{
			src: "woshi/1.png",
			w: 190,
			h: 114,
			name: "woshi1",
			sumsung: 0,
			score: -1
		},
		{
			src: "woshi/2.png",
			w: 215,
			h: 272,
			name: "woshi2",
			sumsung: 0,
			score: -1
		},
		{
			src: "woshi/5.png",
			w: 292,
			h: 343,
			name: "woshi3",
			sumsung: 0,
			score: -1
		},
		{
			src: "woshi/8.png",
			w: 277,
			h: 159,
			name: "woshi8",
			sumsung: 0,
			score: -1
		},
		{
			src: "woshi/9.png",
			w: 301,
			h: 238,
			name: "woshi9",
			sumsung: 0,
			score: -1
		}
	],
	sceneElement: [
		{
			src: "woshi/3.png",
			w: 298,
			h: 293,
			name: "woshi3",
			sumsung: 0,
			score: 1
		},
		{
			src: "woshi/4.png",
			w: 218,
			h: 305,
			name: "woshi4",
			sumsung: 0,
			score: 1
		},
		{
			src: "woshi/6.png",
			w: 104,
			h: 236,
			name: "woshi6",
			sumsung: 0,
			score: 1
		},
		{
			src: "woshi/7.png",
			w: 242,
			h: 270,
			name: "woshi7",
			sumsung: 0,
			score: 1
		},
		{
			src: "woshi/10.png",
			w: 237,
			h: 182,
			name: "woshi10",
			sumsung: 0,
			score: 1
		}
	],
	sumsungGoods: [{
			src: "product/2.png",
			w: 395,
			h: 256,
			name: "product2",
			sumsung: 1,
			score: 1
		},
		{
			src: "product/4.png",
			w: 204,
			h: 280,
			name: "product4",
			sumsung: 1,
			score: 1
		},
		{
			src: "product/6.png",
			w: 141,
			h: 282,
			name: "product6",
			sumsung: 1,
			score: 1
		},
		{
			src: "product/8.png",
			w: 151,
			h: 277,
			name: "product8",
			sumsung: 1,
			score: 1
		},
		{
			src: "product/9.png",
			w: 127,
			h: 277,
			name: "product9",
			sumsung: 1,
			score: 1
		}
	],
	LanternFestival: [{
			src: "common/1.png",
			w: 216,
			h: 242,
			name: "common1",
			sumsung: 0,
			score: -5
		},
		{
			src: "common/2.png",
			w: 171,
			h: 286,
			name: "common2",
			sumsung: 0,
			score: 3
		},
		{
			src: "common/3.png",
			sumsung: 0,
			w: 217,
			h: 257,
			name: "common3",
			score: 3
		},
		{
			src: "common/4.png",
			w: 180,
			h: 295,
			name: "common4",
			sumsung: 0,
			score: 3
		}
	]
}, {
	noEceneElement: [
		{
			src: "yangtai/2.png",
			w: 127,
			h: 128,
			name: "yangtai2",
			sumsung: 0,
			score: -1
		},
		{
			src: "yangtai/3.png",
			w: 436,
			h: 162,
			name: "yangtai3",
			sumsung: 0,
			score: -1
		},
		{
			src: "yangtai/5.png",
			w: 226,
			h: 259,
			name: "yangtai5",
			sumsung: 0,
			score: -1
		},
		{
			src: "yangtai/6.png",
			w: 445,
			h: 321,
			name: "yangtai6",
			sumsung: 0,
			score: -1
		},
		{
			src: "yangtai/10.png",
			w: 273,
			h: 171,
			name: "yangtai10",
			sumsung: 0,
			score: -1
		}
	],
	sceneElement: [{
			src: "yangtai/1.png",
			w: 224,
			h: 257,
			name: "yangtai1",
			sumsung: 0,
			score: 1
		},
		{
			src: "yangtai/4.png",
			w: 426,
			h: 158,
			name: "yangtai4",
			sumsung: 0,
			score: 1
		},
		{
			src: "yangtai/7.png",
			w: 268,
			h: 232,
			name: "yangtai7",
			sumsung: 0,
			score: 1
		},
		{
			src: "yangtai/8.png",
			w: 224,
			h: 222,
			name: "yangtai8",
			sumsung: 0,
			score: 1
		},
		{
			src: "yangtai/9.png",
			w: 186,
			h: 223,
			name: "yangtai9",
			sumsung: 0,
			score: 1
		},
		{
			src: "yangtai/11.png",
			w: 273,
			h: 171,
			name: "yangtai11",
			sumsung: 0,
			score: 1
		}
	],
	sumsungGoods: [{
			src: "product/1.png",
			w: 288,
			h: 277,
			name: "product1",
			sumsung: 1,
			score: 2
		},
		{
			src: "product/4.png",
			w: 204,
			h: 280,
			name: "product4",
			sumsung: 1,
			score: 2
		},
		{
			src: "product/5.png",
			w: 162,
			h: 281,
			name: "product5",
			sumsung: 1,
			score: 2
		},
		{
			src: "product/7.png",
			w: 137,
			h: 275,
			name: "product7",
			sumsung: 1,
			score: 2
		},
		{
			src: "product/10.png",
			w: 118,
			h: 280,
			name: "product10",
			sumsung: 1,
			score: 2
		}
	],
	LanternFestival: [{
			src: "common/1.png",
			w: 216,
			h: 242,
			name: "common1",
			sumsung: 0,
			score: -5
		},
		{
			src: "common/2.png",
			w: 171,
			h: 286,
			name: "common2",
			sumsung: 0,
			score: 3
		},
		{
			src: "common/3.png",
			sumsung: 0,
			w: 217,
			h: 257,
			name: "common3",
			score: 3
		},
		{
			src: "common/4.png",
			w: 180,
			h: 295,
			name: "common4",
			sumsung: 0,
			score: 3
		}
	]
}, {
	noEceneElement: [
		{
			src: "jiadianjie/5.png",
			w: 240,
			h: 240,
			name: "jiadianjie5",
			sumsung: 0,
			score: -1
		},{
			src: "jiadianjie/6.png",
			w: 240,
			h: 240,
			name: "jiadianjie6",
			sumsung: 0,
			score: -1
		},{
			src: "jiadianjie/8.png",
			w: 240,
			h: 240,
			name: "jiadianjie8",
			sumsung: 0,
			score: -1
		},{
			src: "jiadianjie/9.png",
			w: 240,
			h: 240,
			name: "jiadianjie9",
			sumsung: 0,
			score: -1
		},{
			src: "jiadianjie/10.png",
			w: 240,
			h: 240,
			name: "jiadianjie10",
			sumsung: 0,
			score: -1
		}
	],
	sceneElement: [{
			src: "jiadianjie/1.png",
			w: 240,
			h: 240,
			name: "jiadianjie1",
			sumsung: 0,
			score: 1
		},
		{
			src: "jiadianjie/2.png",
			w: 240,
			h: 240,
			name: "jiadianjie2",
			sumsung: 0,
			score: 1
		},{
			src: "jiadianjie/1.png",
			w: 240,
			h: 240,
			name: "jiadianjie1",
			sumsung: 0,
			score: 1
		},
		{
			src: "jiadianjie/2.png",
			w: 240,
			h: 240,
			name: "jiadianjie2",
			sumsung: 0,
			score: 1
		},
		{
			src: "jiadianjie/3.png",
			w: 240,
			h: 240,
			name: "jiadianjie3",
			sumsung: 0,
			score: 1
		}
	],
	sumsungGoods: [{
			src: "product/2.png",
			w: 395,
			h: 256,
			name: "product2",
			sumsung: 1,
			score: 2
		},
		{
			src: "product/4.png",
			w: 204,
			h: 280,
			name: "product4",
			sumsung: 1,
			score: 2
		},
		{
			src: "product/6.png",
			w: 141,
			h: 282,
			name: "product6",
			sumsung: 1,
			score: 2
		},
		{
			src: "product/8.png",
			w: 151,
			h: 277,
			name: "product8",
			sumsung: 1,
			score: 2
		},
		{
			src: "product/9.png",
			w: 127,
			h: 277,
			name: "product9",
			sumsung: 1,
			score: 2
		}
	],
	LanternFestival: [{
			src: "common/1.png",
			w: 216,
			h: 242,
			name: "common1",
			sumsung: 0,
			score: -5
		},
		{
			src: "common/2.png",
			w: 171,
			h: 286,
			name: "common2",
			sumsung: 0,
			score: 3
		},
		{
			src: "common/3.png",
			sumsung: 0,
			w: 217,
			h: 257,
			name: "common3",
			score: 3
		},
		{
			src: "common/4.png",
			w: 180,
			h: 295,
			name: "common4",
			sumsung: 0,
			score: 3
		}
	]
}];