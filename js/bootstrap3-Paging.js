/**
 * Created by xueaohui on 2016/8/28.
 */

function paging(id, all, size,callback) {
    if (size > all) {
        console.error("paging 中 size(3-N)<=all");
        size = all;
    }
    if(size < 3){
        console.error("paging 中 size(3-N)<=all");
        size = 3;
    }
    if(all <= 0){
        all = 0;
        size = 0;
    }
    var obj = new Object();
    obj.allPageNum = all;// 全部页码
    obj.curPageNum = 1;// 当前页面号码
    obj.startPageNum = 1;//开始页面号码
    obj.navSize = size; //最多有多少个导航按钮
    obj.id = id; //选择器的id
    obj.setAllPageNum = function(allNumber){
        obj.allPageNum = allNumber;
    };
    /*创建分页*/
    obj.createPagination = function () {
        obj.initPagination();

        $(obj.id+" li").each(function () {
            if ($(this).children().text() == obj.curPageNum) {
                //console.log("初始化:" + obj.curPageNum);
                $(this).addClass("active");
                $(this).siblings().removeClass("active");
            }
        });

        obj.pagingOnclick();
        callback();
    };
    /*初始化分页*/
    obj.initPagination = function () {
        $(obj.id).html('' +
            '<li class="pre-btn"><a href="#" >上一页</a></li>' +
            '<li class="disabled"><a href="#" class="pre-sign " >...</a></li>' +
            "<li class='disabled'><a href='#' class='next-sign '  >...</a></li>" +
            '<li class="next-btn"><a href="#" >下一页</a></li>' +
            '');
        for (var i = 1; i <= obj.navSize; i++) {
            $("<li class='page-nums'><a href='#' class='page-num" + i + "'>" + i + "</a></li>").insertBefore($(".next-sign").parent());
        }
        obj.togglePreAndNextButton();

    };

    /*添加click事件*/
    obj.pagingOnclick = function () {
        $(obj.id+" .page-nums").click(function () {
            obj.curPageNum = $(this).text();
            obj.changePageNumber();
            obj.togglePreAndNextButton();
        });
        $(".pre-btn").click(function(){
            obj.prePage();
        });
        $(".next-btn").click(function(){
            obj.nextPage();
        })

    };

    obj.changePageNumber = function () {
        console.log("当前点击的页码是" + obj.curPageNum + "页码/2" + Math.ceil(obj.navSize / 2));
        obj.togglePreAndNextButton();
        obj.startPageNum = obj.curPageNum - Math.floor(obj.navSize / 2);
        if (obj.curPageNum <= Math.ceil(obj.navSize / 2)) {
            obj.startPageNum = 1;
        } else if (obj.curPageNum >= obj.allPageNum - Math.floor(obj.navSize / 2)) {
            obj.startPageNum = obj.allPageNum - obj.navSize + 1;
        }
        for (var i = 1; i <= obj.navSize; i++) {
            $(".page-num" + i).text(obj.startPageNum + i - 1);
            console.log("当前改变是" + $(".page-num" + i).text());
        }

        for (var i = 1; i <= obj.navSize; i++) {
            if ($(".page-num" + i).text() == obj.curPageNum) {
                $(".page-num" + i).parent().addClass("active");
                $(".page-num" + i).parent().siblings().removeClass("active");
            }
        }
        //调用事件
        callback();
    };

    //管理上一页下一页按钮
    obj.togglePreAndNextButton = function () {
        if (obj.curPageNum == 1) {
            $(".pre-btn").addClass('disabled');
        } else {
            $(".pre-btn").removeClass('disabled');
        }
        if (obj.curPageNum == obj.allPageNum) {
            $(".next-btn").addClass('disabled');
        } else {
            $(".next-btn").removeClass('disabled');
        }
    };

    /*上一页*/
    obj.prePage = function () {
        //console.log("当前开始页码为:" + obj.startPageNum + "向前改变页码至--" + obj.curPageNum);
        obj.curPageNum = parseInt(obj.curPageNum) - 1;
        if(obj.curPageNum <= 0){
            obj.curPageNum = 1;
        }
        obj.changePageNumber();
    };

    /*下一页*/
    obj.nextPage = function () {
        obj.curPageNum = parseInt(obj.curPageNum) + 1;
        //console.log("当前开始页码为:" + obj.startPageNum + "向后改变页码至--" + obj.curPageNum);

        if(obj.curPageNum > obj.allPageNum){
            obj.curPageNum = obj.allPageNum;
        }
        obj.changePageNumber();
    };
    return obj;
}