/**
 * Created by wlw on 15-2-1.
 */

var teacher_str = '<tr>' +
    '<th>工号</th>' +
    '<td><input name="uid" /></td>' +
    '</tr>' +
    '<tr>' +
    '<th>姓名</th>' +
    '<td><input name="uname" /></td>' +
    '</tr>' +
    '<th>密码</th>' +
    '<td><input name="password"/></td>' +
    '</tr>' +
    '<th>卡号</th>' +
    '<td><input name="card_number"/></td>' +
    '</tr>' +
    '<tr>' +
    '<th>实验中心代码</th>' +
    '<td><input name="lcid"/></td>' +
    '</tr>'

var list = [
    '<table>' +
    '<tr>' +
    '<th>学号</th>' +
    '<td><input type ="text" name="uid" /></td>' +
    '</tr>' +
    '<tr>' +
    '<th>姓名</th>' +
    '<td><input name="uname"/></td>' +
    '</tr>' +
    '<tr>' +
    '<th>密码</th>' +
    '<td><input name="password"/></td>' +
    '</tr>' +
    '<tr>' +
    '<th>卡号</th>' +
    '<td><input name="card_number"/></td>' +
    '</tr>' +
    '<tr>' +
    '<th>院系编号</th>' +
    '<td><input name="did"/></td>' +
    '</tr>' +
    '<tr>' +
    '<th>年级（以“入学年份 （本/研）”的形式）<th>' +
    '</td><input name="grade"/></td>' +
    '</tr>' +
    '</table>',

    '<table>' +
    teacher_str +
    '</table>',

    '<table>' +
    '<tr>' +
    '<th>实验室编码</th>' +
    '<td><input name="lid" /></td>' +
    '</tr>' +
    '<tr>' +
    '<th>实验室名称</th>' +
    '<td><input name="lname" /></td>' +
    '</tr>' +
    '<tr>' +
    '<th>实验中心编码</th>' +
    '<td><input name="lcid" /></td>' +
    '</tr>' +
    '<tr>' +
    '<th>可容纳人数</th>' +
    '<td><input name="lnumber" /></td>' +
    '</table>',

    '<table>' +
    '<tr>' +
    '<th>实验中心编码</th>' +
    '<td><input name="lcid" /></td>' +
    '</tr>' +
    '<tr>' +
    '<th>实验中心名称</th>' +
    '<td><input name="lcname" /></td>' +
    '</tr>' +
    '</table>',

    '<table>' +
    '<tr>' +
    '<th>院系编码</th>' +
    '<td><input name="did" /></td>' +
    '</tr>' +
    '<tr>' +
    '<th>院系名称</th>' +
    '<td><input name="dname" /></td>' +
    '</tr>' +
    '</table>',

    '<table>' +
    teacher_str +
    '</table>'
];

var one_url_list = [
    '/add_user/one_student/',
    '/add_user/one_teacher/',
    '/add/one_lab/',
    '/add/one_lab_center/',
    '/add/one_department/',
    '/add/one_admin/'
];

var STATIC = '/static';

var download_url = [
    STATIC + '/xlsx/add_student_list.xlsx',
    STATIC + '/xlsx/add_teacher_list.xlsx',
    STATIC + '/xlsx/add_lab_list.xlsx',
    STATIC + '/xlsx/add_lab_center_list.xlsx',
    STATIC + '/xlsx/add_department_list.xlsx',
    STATIC + '/xlsx/add_admin_list.xlsx'
];

var generate_one_line = function (val) {
    console.log("generate one line");
    var one_line = list[val];
    var $one_item = $('#one_item form .change_field');
    $one_item.empty();
    $one_item.append(one_line);
    console.log("action changed");
    $('#one_item form').attr("action", one_url_list[val]);
};

var generate_list_url = function (val) {
    var list_url = [
        '/add_user/student_list/',
        '/add_user/teacher_list/',
        '/add/lab_list/',
        '/add/lab_center_list/',
        '/add/department_list/',
        '/add/admin_list/'
    ];
    var url = list_url[val];
    $('#list_item form').attr("action", url);
    $('#download').attr("href", download_url[val]);
};

var generate = function (val) {
    generate_one_line(val);
    generate_list_url(val);

    table_add_class();
};

options = {
    dataType: 'json',
    success: function (data) {
        if (data['result'] == 'success') {
            confirm("添加成功");
        } else {
            confirm(data['msg']);
        }
    },
    error: function () {
        alert("网络异常，请稍后再试");
    }
};

$(document).ready(function () {

    var $cato = $('#catagory');
    generate($cato.val());

    $cato.selectmenu({
        change: function () {
        var val = $(this).val();
        generate(val);
        }
    });

    $(document).on('submit', '#one_form', function () {
        $(this).ajaxSubmit(options);
        return false;
    });

    $(document).on('submit', '#list_form', function () {
        $(this).ajaxSubmit(options);
        return false;
    });
});