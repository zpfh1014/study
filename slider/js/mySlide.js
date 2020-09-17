(function($){
    $.fn.myPlugin = function(options){
        // defaults
        var defaults = {
            autoplay : false,
            delay : 2000,
            speed : 500,
            vertical : false,
            infinite : false,
            slidesToShow : 1,
            dots : true,
            fade: false,
        }

        // defaults(기본값), options(사용자 지정 옵션값) merge 후 options 담김
        var options = $.extend({}, defaults, options || {});

        // return : 다른 jQuery 메소드와 함께 자유롭게 체이닝을 사용
        return this.each(function(){
            var el = $(this);
            var $btnPrev = el.find('.btn_prev');
            var $btnNext = el.find('.btn_next');
            var $slideList = el.find('.slide_list');
            var $slideItem = $slideList.children();
            var slideW = $slideItem.width();
            var slideLen = $slideItem.length;
            var curIndex = 0;
            var curSlide = 0;
            var speed = 500;
            var startNum = 0; // start idx
            var show = 1; // show  갯수
            
            
            // slide list width
            $slideList.width(slideW * (slideLen + 2))
            // clone copy
            var firstChild = $slideList.find("li:first-child");
            var lastChild = $slideList.find("li:last-child");
            firstChild.clone().appendTo($slideList);
            lastChild.clone().prependTo($slideList);
            
            
            // btn prev
            function prev() {
                if(curIndex >= 0){
                    $slideList.css({
                        "transition" : speed + "ms",
                        "transform" : "translate3d(-"+ (slideW * curIndex)+"px, 0px, 0px)"
                    });
                }
                if(curIndex === 0){
                    setTimeout(function(){
                        $slideList.css({
                            "transition" : "0ms",
                            "transform" : "translate3d(-"+ (slideW * slideLen) +"px, 0px, 0px)"
                        });
                    }, speed);
                    curIndex = slideLen;
                }
                
                $slideItem.eq(curSlide).removeClass("slide-active");
                $dot.eq(curSlide).attr("data-idx", curSlide).removeClass("on");
                curSlide = --curIndex;
                $slideItem.eq(curSlide).addClass("slide-active");
                $dot.eq(curSlide).attr("data-idx", curSlide).addClass("on");
            }
            
            // btn next
            function next() {
                if(curIndex <= slideLen - 1){
                    $slideList.css({
                        "transition" : options.speed + "ms",
                        "transform" : "translate3d(-"+ (slideW * (curIndex + 2))+"px, 0px, 0px)"
                    });
                }
                if(curIndex === slideLen - 1){
                    setTimeout(function(){
                        $slideList.css({
                            "transition" : "0ms",
                            "transform" : "translate3d(-"+ slideW +"px, 0px, 0px)"
                        });
                    }, options.speed);
                    curIndex = -1;
                }
            
                $slideItem.eq(curSlide).removeClass("slide-active");
                $dot.eq(curSlide).attr("data-idx", curSlide).removeClass("on");
                curSlide = ++curIndex;
                $slideItem.eq(curSlide).addClass("slide-active");
                $dot.eq(curSlide).attr("data-idx", curSlide).addClass("on");
            
            }
            
            // paging
            function paging(){
                var $paging = el.find(".paging");
                var pageChild = "";
            
                for (var i = 0; i < slideLen; i++) {
                    pageChild += '<div class="dot';
                    pageChild += (i === startNum) ? ' on' : '';
                    pageChild += '" data-idx="' + i + '"><a href="#">'+(i+1)+'</a></div>';
                }
                $paging.prepend(pageChild);
                $dot = $paging.children(".dot");
                
            }
            

            // 사용자 options
            var interval = null;
            function autoplay(){
                if(options.autoplay == true){
                    slideStart();
                }else{
                    slideStop();
                }

                function slideStart(){
                    interval = setInterval(function () {
                        $btnNext.trigger("click");
                    }, options.delay);
                }
                function slideStop(){
                    clearInterval(interval)
                }

                el.find(".btn_play").on("click", function(){
                    slideStart();
                });
                el.find(".btn_stop").on("click", function(){
                    slideStop();
                });
            
            }
            autoplay();

            function init(){
                $slideList.css({
                    "transform" : "translate3d(-"+ (slideW * (startNum + 1))+"px, 0px, 0px)"
                });
            
                curIndex = startNum;
                curSlide = curIndex
                $slideItem.eq(curSlide).addClass("slide-active");
            
                paging();
                
            }
            init();
            
            
            $btnPrev.on('click', function(){
                prev();
            })
            $btnNext.on('click', function(){
                next();
            })
            
            $dot.on("click", function(){
                $dot.removeClass("on");
                $(this).addClass("on");
            
                $slideItem.removeClass("slide-active");
                curIndex = Number($(this).attr("data-idx"));
                curSlide = curIndex;
                $slideItem.eq(curSlide).addClass("slide-active");
            
                $slideList.css({
                    "transition" : speed + "ms",
                    "transform" : "translate3d(-"+ (slideW * (curIndex + 1))+"px, 0px, 0px)"
                });
            
            });


        });
    };

    
    
}(jQuery))
