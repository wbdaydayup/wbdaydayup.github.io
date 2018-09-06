/**
 * Created by Sunshine on 2018/8/6.
 */
$(function(){
    banner();
    initMobileTab();
    /*初始工具提示*/
    $('[data-toggle="tooltip"]').tooltip();
});

function banner(){


    //$.ajax({
    //    type:"get",
    //    url:"datas/data.json",
    //    dataType:"json",
    //    success:function(backData){
    //        //数据缓存
    //        window.data = backData;
    //        (callback&&typeof(callback)==='function')&&callback(window.data);
    //
    //        //渲染部分
    //        var isMobile = $(window).outerWidth()<780?true:false;
    //        var pointBanner = template("pointBanner",{list:backData});
    //        var imgBanner = template("imgBanner",{list:backData,isM:isMobile});
    //        console.log(backData[0].pcUrl);
    //        $('.carousel-indicators').append(pointBanner);
    //        $('.carousel-inner').append(imgBanner);
    //    }
    //});


    function getData(callback){
        if(window.data){
            (callback&&typeof(callback)==='function')&&callback(window.data);
        }else{
            $.ajax({
                type:"get",
                url:"datas/data.json",
                dataType:"json",
                success:function(backData){
                    //数据缓存
                    window.data = backData;
                    (callback&&typeof(callback)==='function')&&callback(window.data);
                }
            });
        }
    }

    $(window).on('resize',function(){
        getData(function(backData){
            //渲染部分
            var isMobile = $(window).outerWidth()<780?true:false;
            var pointBanner = template("pointBanner",{list:backData});
            var imgBanner = template("imgBanner",{list:backData,isM:isMobile});
            console.log(backData[0].pcUrl);
            $('.carousel-indicators').html(pointBanner);
            $('.carousel-inner').html(imgBanner);
        });
    }).trigger('resize');

    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    $('.wjs-banner').on('touchstart',function(e){
        //原生的event和jquery的event不同
        startX = e.originalEvent.touches[0].clientX;

    }).on('touchmove',function(e){
        distanceX = e.originalEvent.touches[0].clientX - startX;
        isMove = true;
    }).on('touchend',function(e){
        if(isMove&&Math.abs(distanceX)>50){
            //左滑，prev
            if(distanceX>0){
                $('.carousel').carousel('prev');
            }
            //右滑,next
            else if(distanceX<0){
                $('.carousel').carousel('next');
            }
            isMove = false;
        }
        startX = 0;
        distanceX = 0;
    });

}

function initMobileTab(){
    var $tabUl = $('.nav-tabs');
    var $tabLiArr = $tabUl.children('li');
    var ulWidth = 0;
    $tabLiArr.each(function(i,item){
        $cureentLi = $(item);
        ulWidth += $cureentLi.outerWidth(true);
    });
    $tabUl.width(ulWidth);

    new IScroll($('.parent-nav')[0],{
        scrollX:true,
        scrollY:false,
        cilck:true
    });


}