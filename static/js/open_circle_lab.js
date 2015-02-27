/**
 * Created by wlw on 15-2-26.
 */

var lab_select = "";

var get_week_day_select = function () {
    var day = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    var val = [0, 1, 2, 3, 4, 5, 6];

    var line = '<select name="weekday" class="number_menu">';
    for (var i in day) {
        line += "<option value=" + val[i] + ">" + day[i] + "</option>";
    }

    line += "</select>";

    return line;
};

var get_lab_c = function (lcid) {
    console.log(lcid);
    $.ajax({
        url: '/get_lab_by_lcid/',
        data: {
            lcid: lcid
        },
        type: 'get',
        dataType: 'json',
        success: function (data) {
            console.log('data:' + data);
            lab_select = '<select class="selectmenu number_menu" name="lid">';
            for (var i in data) {
                console.log(data[i]['lid'] + ': ' + data[i]['lname']);
                lab_select += '<option value="' + data[i]['lid'] + '">' +
                data[i]['lname'] +
                '</option>';
            }
            lab_select += '</select>';
            console.log("c");
            console.log("complete");
        },
        error: function () {
            console.log("error");
        }
    });

    console.log("lab_select:" + lab_select);
    return lab_select;
};

$(document).ready(function () {

    var $clcid = $("#c_lcid");
    get_lab_c($clcid.val());
    add_no_empty();

    $clcid.selectmenu({
        change: function (event, ui) {
            get_lab_c($(this).val());
            console.log("lab_select:" + lab_select);
            $(".detail_circle_line").remove();
        }
    });

    $('#add_circle').click(function () {
        var one_line =
            '<tr class="detail_circle_line">' +
            "<td>" + lab_select + "</td>" +
            "<td>" + get_week_day_select() + "</td>" +
            "<td>" + create_time('begin_time') + "</td>" +
            "<td>" + create_time('end_time') + "</td>" +
            '<td><input type="button" class="button delete_one_detail" value="删除"/></td>' +
            '<td></td>' +
            '</tr>';

        $('#circle table').append(one_line);
        add_number_menu();
        add_no_empty();
        $('.button').button();
    });

    $('#circle_form').submit(function () {
        $(this).ajaxSubmit({
            beforeSubmit: function (arr, $form, options) {
                for (var i in arr) {
                    console.log(arr[i]);
                }
                var begin_week_number = get_input('begin_week_number', arr)[0];
                var end_week_number = get_input('end_week_number', arr)[0];

                if (Number(begin_week_number) >= Number(end_week_number)) {
                    alert("结束的周应在开始的周之后");
                    return false;
                }

                var lid_list = get_input('lid', arr);
                var weekday_list = get_input('weekday', arr);
                var begin_time_list = get_input('begin_time', arr);
                var end_time_list = get_input('end_time', arr);

                for (var i = 0; i < lid_list.length; ++i) {
                    if (Number(begin_time_list[i]) >= Number(end_time_list[i])) {
                        alert("开始时间应在结束时间之后");
                    }
                    for (var j = 0; j < i; ++j) {
                        if (lid_list[i] == lid_list[j] && weekday_list[i] == weekday_list[j]) {
                            if (Number(begin_time_list[i]) < Number(end_time_list[j]) &&
                                Number(end_time_list[i]) > Number(begin_time_list[j])) {
                                alert("第" + i + "行与第" + j + "行存在时间上的冲突");
                                return false;
                            }
                        }
                    }
                }

                return true;
            },
            dataType: 'json',
            success: function (data) {
                success_handler_g(data, "你的开放计划已提交，请等待管理员审核", false);
            },
            error: function () {
                error_handler_g();
            }
        });
        return false;
    });
});
