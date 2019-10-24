//设置菜单导航
//设置菜单导航
function setNav() {

	var oNav = document.getElementById('nav');
	var oUl = oNav.getElementsByTagName('ul')[0];
	var aNavLi = oUl.getElementsByTagName('li');

	var oLists = document.getElementById('lists');
	var aDivLi = $('.sub_box');

	var aA = [];
	var oTimer = null;
	var i = 0;
	for (i = 0; i < aNavLi.length; i++) {
		aA.push(aNavLi[i].getElementsByTagName('a')[0]);
	}

	for (i = 0; i < aNavLi.length; i++) {
		aA[i].miaovIndex = i;
		aA[i].onmouseover = function() {

			if (oTimer) {
				clearTimeout(oTimer);
				oTimer = null;
			}
			for (i = 0; i < aNavLi.length; i++) {
				aDivLi[i].style.display = 'none';
			}
			aA[this.miaovIndex].className = 'nav_on';
			aDivLi[this.miaovIndex].style.display = 'block';

		};
		aA[i].onmouseout = function() {
			var index = this.miaovIndex;
			aA[this.miaovIndex].className = '';

			oTimer = setTimeout(
				function() {
					aDivLi[index].style.display = 'none';

					oTimer = null;
				}, 300
			);
		};
		aDivLi[i].miaovIndex = i;
		aDivLi[i].onmouseover = function() {
			aNavLi[this.miaovIndex].className = 'nav_on';

			if (oTimer) {
				clearTimeout(oTimer);
				oTimer = null;
			}
		};
		aDivLi[i].onmouseout = function() {
			aNavLi[this.miaovIndex].className = '';
			var index = this.miaovIndex;
			oTimer = setTimeout(
				function() {
					aDivLi[index].style.display = 'none';
					oTimer = null;
				}, 300
			);
		}
	}
	

}

//设置产品中心ul的宽度
function setProPageUl() {

	var oProPageBox = document.getElementById('pro_page_box');
	var aProPageUl = oProPageBox.getElementsByTagName('ul');
	var aProPageLi = aProPageUl[0].getElementsByTagName('li');
	for (var i = 0; i < aProPageUl.length; i++) {
		aProPageUl[i].style.width = (aProPageLi[0].offsetWidth + 10) * 5 + 'px';
	}
}

//设置产品中心内页1 ul的宽度
function setProTypeUl() {
	var oProTypeImages = document.getElementById('pro_type_images');
	var aProTypeUl = oProTypeImages.getElementsByTagName('ul')[0];
	var aProTypeLi = aProTypeUl.getElementsByTagName('li');

	aProTypeUl.style.width = (aProTypeLi[0].offsetWidth + 12) * 4 + 'px';

}



function setMap(){
	// 百度地图API功能
	var sContent ="Shenzhen litematrix lighting Technologies Co..Ltd<br/>Block2,Hongtu lndustrial Park,Xixiang,Bao’an District,Shenzhen,China";
	var map = new BMap.Map("l-map");
	
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	var point = new BMap.Point(113.873226, 22.629338);
	map.centerAndZoom(point, 25);
	var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
	map.openInfoWindow(infoWindow,point); //开启信息窗口
	
}






