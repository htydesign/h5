var time = 0;
var pause = true;
var finish = true;
var set_timer;
var d = new Array(10);

var d_direct = new Array(
	[0], 
	[2, 4], 
	[1, 3, 5], 
	[2, 6], 
	[1, 5, 7], 
	[2, 4, 6, 8], 
	[3, 5, 9], 
	[4, 8], 
	[5, 7, 9], 
	[6, 8]
);
var d_posXY = new Array(
	[0], 
	[0, 0], 
	[146, 0], 
	[292, 0], 
	[0, 146], 
	[146, 146], 
	[292, 146], 
	[0, 292], 
	[146, 292], 
	[292, 292]
);
//大DIV编号的位置
d[1] = 1;
d[2] = 2;
d[3] = 3;
d[4] = 4;
d[5] = 5;
d[6] = 6;
d[7] = 7;
d[8] = 8;
d[9] = 0;

var oldArr = d.concat();

function move(id) {
	if(!finish) {
		var i = 1;
		for(i = 1; i < 10; ++i) {
			if(d[i] == id) {
				break;
			}
		}
		var target_d = 0;
		target_d = whereCanTo(i);

		if(target_d != 0) {
			d[i] = 0;
			d[target_d] = id;
			document.getElementById("d" + id).style.left = d_posXY[target_d][0] + "px";
			document.getElementById("d" + id).style.top = d_posXY[target_d][1] + "px";
		}
		var finish_flag = true;

		for(var k = 1; k <= 9; ++k) {
			if(k != 9) {
				if(d[k] != k) {
					finish_flag = false;					
					break;
				}
				//console.log(k);
			}
		}
		if(finish_flag == true) {
			//console.log(111);
			if(!pause) {
				start();
				finish = true;
			}
			setTimeout(function() {
				document.getElementById("d9").className = 'd9';
				$('.frame').fadeOut();
				$('.g-btn').fadeOut();				
				setTimeout(function(){
					//bgMusic_1.volume=1;
					$('.g-h3').show();
					$('.sudoku-info p').show().html('你已启动安全装置');
					setTimeout(function(){
						$('.sudoku').addClass('active');
						$('.game').css({'opacity':0});
						$('.box').css({'opacity':0});
						$('.game-bg').css({'opacity':0});
						$('.g-container').css({'opacity':0});
						setTimeout(function(){
							$('.sudoku-box').css({'backgroundColor':'#ffffff'});	
							$('.sudoku').fadeOut(500,function(){
									$(this).remove();
								});
								$('.show-chip').show();
//							setTimeout(function(){
//								
//							},500);
						},500);						
					},2000);
				},500);
			}, 1000);
		}
	}
}

function whereCanTo(cur_div) {
	
	var j = 0;
	var move_flag = false;
	for(j = 0; j < d_direct[cur_div].length; ++j) {
		if(d[d_direct[cur_div][j]] == 0) {
			move_flag = true;
			slideMusic.play();
			break;
		}
	}
	if(move_flag == true) {
		return d_direct[cur_div][j];
	} else {
		return 0;
	}
	
}

function timer() {
	time += 1;
	var min = parseInt(time / 60);
	var sec = time % 60;
}

function start() {
	if(pause) {
		pause = false;
		set_timer = setInterval(timer, 1000);
	} else {
		pause = true;
		clearInterval(set_timer);
	}
}

function reset() {
	finish=false;
	time = 0;
	random_d();
	if(pause) {
		start();
	}
	document.getElementById("d9").className = 'target';
	$('.frame').show();
}

function random_d() {
	for(var i = 9; i > 1; --i) {		
		var to = parseInt(Math.random() * (i - 1) + 1); 		
		if(d[i] != 0) {
			document.getElementById("d" + d[i]).style.left = d_posXY[to][0] + "px";
			document.getElementById("d" + d[i]).style.top = d_posXY[to][1] + "px";
		}		
		if(d[to] != 0) {
			document.getElementById("d" + d[to]).style.left = d_posXY[i][0] + "px";
			document.getElementById("d" + d[to]).style.top = d_posXY[i][1] + "px";
		}		
		var tem = d[to];
		d[to] = d[i];
		d[i] = tem;	
	}
//	document.getElementById("d" + d[6]).style.left = d_posXY[9][0] + "px";
//	document.getElementById("d" + d[6]).style.top = d_posXY[9][1] + "px";
//	var tem = d[9];
//	d[9] = d[6];
//	d[6] = tem;
}

function restore() {
	for(var i = 1; i < oldArr.length; i++) {
		if(i!=9){
			document.getElementById("d" + i).style.left = d_posXY[i][0] + "px";
			document.getElementById("d" + i).style.top = d_posXY[i][1] + "px";		
		}	
	}
	document.getElementById("d9").className = 'd9';
	$('.frame').fadeOut();
	setTimeout(function(){	
		//$('.g-h2').hide();
		//bgMusic_1.volume=1;
		$('.g-h3').show();
		$('.sudoku-info p').show().html('你已启动安全装置');
		setTimeout(function(){
			$('.sudoku').addClass('active');	
			$('.game').css({'opacity':0});
			$('.box').css({'opacity':0});
			$('.game-bg').css({'opacity':0});
			$('.g-container').css({'opacity':0});
			setTimeout(function(){
				$('.sudoku-box').css({'backgroundColor':'#ffffff'});
				$('.sudoku').fadeOut(500,function(){
						$(this).remove();
					});
					$('.show-chip').show();
//				setTimeout(function(){
//					
//				},500);
			},500);		
		},3000);
	},500);
}
//点击重置按钮
$('.reset').on('touchstart',function(){
	reset();
});
//点击帮助按钮，显示金大立
$('.help').on('touchstart',function(){
	$('.g-btn').fadeOut();
	$('.g-h1').fadeIn();
});
//再次点击金大立，帮助用户拼图
$('.g-h1').on('touchstart',function(){
	//$('.g-h2').fadeIn();
	$(this).fadeOut();
	$('.sudoku-info p').fadeOut();
	restore();
});

