// 微信、支付宝音频Hack方案  
; void function (win, doc, undefined) {  
    // 原理：调用链中的某个事件被标识为用户事件而非系统事件  
    // 进而导致浏览器以为是用户触发播放而允许播放  
    Audio.prototype._play = Audio.prototype.play;  
    HTMLAudioElement.prototype._play = HTMLAudioElement.prototype.play;  
  
    function wxPlay(audio) {  
        /// <summary>  
        /// 微信播放Hack  
        /// </summary>  
        /// <param name="audio" type="Audio">音频对象</param>  
  
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {  
            audio._play();  
        });  
    }  
  
    function alipayPlay(audio) {  
        /// <summary>  
        /// 支付宝播放Hack  
        /// </summary>  
        /// <param name="audio" type="Audio">音频对象</param>  
  
        AlipayJSBridge.call('getNetworkType', function (result) {  
            audio._play();  
        });  
    }  
  
    function play() {  
        var self = this;  
  
        self._play();  
  
        try {  
            wxPlay(self);  
        } catch (ex) {  
            document.addEventListener("WeixinJSBridgeReady", function evt() {  
                wxPlay(self);  
                document.removeEventListener("WeixinJSBridgeReady", evt, false);  
            }, false);  
        }  
  
        try {  
            alipayPlay(self);  
        } catch (ex) {  
            document.addEventListener('AlipayJSBridgeReady', function evt() {  
                alipayPlay(self);  
                document.removeEventListener("AlipayJSBridgeReady", evt, false);  
            }, false);  
        }  
    }  
  
    Audio.prototype.play = play;  
    HTMLAudioElement.prototype.play = play;  
}(window, document);  