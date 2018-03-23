/**
 * Created by wangbiaozy on 2018/3/22.
 */
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
$(function () {
    //签到日期表
    var calUtil = {
        getDaysInMonth : function(iMonth, iYear){
            var dPrevDate = new Date(iYear, iMonth, 0);
            return dPrevDate.getDate();
        },
        buildCal : function(iYear, iMonth) {
            var aMonth = new Array();
            aMonth[0] = new Array(7);
            aMonth[1] = new Array(7);
            aMonth[2] = new Array(7);
            aMonth[3] = new Array(7);
            aMonth[4] = new Array(7);
            aMonth[5] = new Array(7);
            aMonth[6] = new Array(7);
            var dCalDate = new Date(iYear, iMonth - 1, 1);
            var iDayOfFirst = dCalDate.getDay();
            var iDaysInMonth = calUtil.getDaysInMonth(iMonth, iYear);
            var iVarDate = 1;
            $('#curYear').text(iYear);
            $('#curMonth').text(iMonth < 10 ? '0'+iMonth : iMonth);
            var d, w;
            aMonth[0][0] = "日";
            aMonth[0][1] = "一";
            aMonth[0][2] = "二";
            aMonth[0][3] = "三";
            aMonth[0][4] = "四";
            aMonth[0][5] = "五";
            aMonth[0][6] = "六";
            for (d = iDayOfFirst; d < 7; d++) {
                aMonth[1][d] = iVarDate;
                iVarDate++;
            }
            for (w = 2; w < 7; w++) {
                for (d = 0; d < 7; d++) {
                    if (iVarDate <= iDaysInMonth) {
                        aMonth[w][d] = iVarDate;
                        iVarDate++;
                    }
                }
            }
            return aMonth;
        },
        ifHasSigned : function(signList,day){
            var signed = false;
            $.each(signList,function(index,item){
                if(item.signDay === day) {
                    signed = true;
                    return false;
                }
            });
            return signed ;
        },
        drawCal : function(iYear, iMonth ,signList) {
            var myMonth = calUtil.buildCal(iYear, iMonth);
            var htmls = new Array();
            htmls.push("<table class='table'>");
            htmls.push("<tr>");
            htmls.push("<th>" + myMonth[0][0] + "</th>");
            htmls.push("<th>" + myMonth[0][1] + "</th>");
            htmls.push("<th>" + myMonth[0][2] + "</th>");
            htmls.push("<th>" + myMonth[0][3] + "</th>");
            htmls.push("<th>" + myMonth[0][4] + "</th>");
            htmls.push("<th>" + myMonth[0][5] + "</th>");
            htmls.push("<th>" + myMonth[0][6] + "</th>");
            htmls.push("</tr>");
            var d, w;
            for (w = 1; w < 7; w++) {
                htmls.push("<tr>");
                for (d = 0; d < 7; d++) {
                    var ifHasSigned = calUtil.ifHasSigned(signList,myMonth[w][d]);
                    if(ifHasSigned){
                        htmls.push("<td class='on'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "<i></i></td>");
                    } else {
                        htmls.push("<td>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
                    }
                }
                htmls.push("</tr>");
            }
            htmls.push("</table>");
            return htmls.join('');
        },
        signFn: function () {
            var today = new Date().getDate(),
                $dateList = $('.table').find('td');
            for(var i=0; i<$dateList.length; i++){
                var dateNum = parseInt($dateList[i].innerText),
                flag = false;
                for(var j=0; j<signList.length; j++){
                    today === signList[j].signDay ? flag = false : flag = true;
                }
                if(dateNum === today && flag) {
                    signList.push({"signDay":today});
                    str = calUtil.drawCal(date.getFullYear(),date.getMonth() + 1,signList);
                    $("#calendar").html(str);
                    showMask();
                    showSignPopup();
                    $('#signDays').text(signList.length < 10 ? '0'+signList.length : signList.length);
                    $('#signBtn').addClass('act');
                }
            }
            if(signList.length >= 1 && signList.length < 5){
                $('#gift_1').addClass('tt');
            }else if(signList.length >= 5 && signList.length < 15){
                $('#gift_2').addClass('tt');
            }else if(signList.length >= 15){
                $('#gift_3').addClass('tt');
            }
        }
    };


    var date = new Date();
    var signList=[{"signDay":10},{"signDay":11}]; //用户已签到日期（当月）
    var str = calUtil.drawCal(date.getFullYear(),date.getMonth() + 1,signList);
    $("#calendar").html(str);
    $('#signDays').text(signList.length < 10 ? '0'+signList.length : signList.length);
    //点击签到按钮
    $('#signBtn').on('click',function () {
        calUtil.signFn();
    });
    //点击日期表格签到
    $('.table').on('click','td',function () {
        var curTdText = parseInt($(this).context.innerText),
            today = new Date().getDate();
        if(curTdText === today){
            calUtil.signFn();
        }
});


    //领取奖励按钮
    //奖励1
    $('#gift_1').on('click',function () {
        if($(this).hasClass('tt') && !$(this).hasClass('active')){
            showGiftPopup();
            $(this).addClass('active');
        }
    });
    //奖励2
    $('#gift_2').on('click',function () {
        if($(this).hasClass('tt') && !$(this).hasClass('active')){
            showGiftPopup();
            $(this).addClass('active');
        }
    });
    //奖励1
    $('#gift_3').on('click',function () {
        if($(this).hasClass('tt') && !$(this).hasClass('active')){
            showGiftPopup();
            $(this).addClass('active');
        }
    });
    //领取奖励弹窗确定按钮
    $('#popup_gift_btn').on('click',function () {
        hideGiftPopup();
    });
    //首页活动规则跳转
    $('#ruleBtn').on('click',function () {
        $('.firPage').hide();
        $('.rule').show();
    });
    //活动规则页返回按钮
    $('#backBtn').on('click',function () {
        $('.rule').hide();
        $('.firPage').show();
    });


    //显示签到成功弹窗
    function showSignPopup() {
        $('.popup_sign').show();
        showMask();
    }
    //显示领取奖励弹窗
    function showGiftPopup() {
        $('.popup_gift').show();
        showMask();
    }
    //关闭签到弹窗
    function hideSignPopup() {
        $('.popup_sign').hide();
        hideMask();
    }
    //关闭领取奖励弹窗
    function hideGiftPopup() {
        $('.popup_gift').hide();
        hideMask();
    }
    //签到弹窗关闭按钮
    $('#popup_sign_btn').on('click',function () {
        hideSignPopup();
    });
    //显示遮罩层
    function showMask(){
        $("#mask").css("height",$(document).height());
        $("#mask").css("width",$(document).width());
        $("#mask").show();
    }
    //隐藏遮罩层
    function hideMask(){
        $("#mask").hide();
    }

});