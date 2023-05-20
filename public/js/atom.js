thaiMonth_arr = {
  0: "มกราคม",
  1: "กุมภาพันธ์",
  2: "มีนาคม",
  3: "เมษายน",
  4: "พฤษภาคม",
  5: "มิถุนายน",
  6: "กรกฎาคม",
  7: "สิงหาคม",
  8: "กันยายน",
  9: "ตุลาคม",
  10: "พฤศจิกายน",
  11: "ธันวาคม",
};

var sum = 0;
$(document).on("change", "input,textarea", function (e) {
  setlocalstorage();
});
function forceSelectReward(id) {
  var val = $('input[name="reward"]:checked').val();
  if (typeof val === "undefined" || typeof val === "null" || val=="") {    
    alert("กรุณาเลือกของรางวัล");
    return false;
  }
  section_select(id)
}
function setInput() {
  fillinpuit("firstName");
  fillinpuit("lastName");
  fillinpuit("tel");
  fillinpuit("shopname");
  fillinpuit("des");
  /*if (localStorage.getItem("reward")) {
    var reward = localStorage.getItem("reward");
    var reward_obj = $('input[value="' + reward + '"]');
    var id = reward_obj.attr("id");
    $("#" + id).prop("checked", true);
    //console.log(id);
    set_selected_reward($("." + id + "_button"), id + "_button");
    set_selected_reward_outer(
      $("." + $("#" + id).attr("button_parent")),
      $("#" + id).attr("button_parent")
    );
  }*/
}
function fillinpuit(name) {
  if (localStorage.getItem(name)) {
    $("#" + name).val(localStorage.getItem(name));
  }
}
function setlocalstorage() {
  localStorage.setItem("firstName", $("#firstName").val());
  localStorage.setItem("lastName", $("#lastName").val());
  localStorage.setItem("tel", $("#tel").val());
  if($("#shopname").val()){
    localStorage.setItem("shopname", $("#shopname").val());
  }  
  localStorage.setItem("des", $("#des").val());
  //localStorage.setItem("reward", $('input[name="reward"]:checked').val());
}

function renderstagerun(point) {
  $(".text_point_number").html(point);
  let point_min = 0;
  let point_max = 0;
  let getmax = true;
  Object.keys(stagerun_point_to_progress).forEach((key) => {
    if (point >= key) {
      point_min = key;
      point_max = key;
    } else if (point > point_min && point < key) {
      if (getmax) {
        point_max = key;
        getmax = false;
      }
    }
  });
  let progress = 0;
  if (point_min < point_max) {
    let bt1 = point_max - point_min;
    let bt2 =
      stagerun_point_to_progress[point_max] -
      stagerun_point_to_progress[point_min];
    let bt3 = bt2 / bt1;
    progress = (stagerun_point_to_progress[point_min] + bt3) * 100;
  } else {
    progress = stagerun_point_to_progress[point_min] * 100;
  }
  $(".graph_stage_run").css("width", progress - 3 + "%");
  $(".graph_stage_run_mobile").css("height", progress + "%");
}

function selectreward1(id) {
  let price = toFloat($("#" + id).attr("price"));
  if (price <= sum) {
    $("#" + id).prop("checked", true);
    set_selected_reward($("." + id + "_button"), id + "_button");
  }
  console.log($('input[name="reward"]:checked').val());
  setlocalstorage();
}

function selectreward2(id) {
  let price = toFloat($("#" + id).attr("price"));
  if (price <= sum) {
    $("#" + id).prop("checked", true);
    set_selected_reward($("." + id + "_button"), id + "_button");
    set_selected_reward_outer(
      $("." + $("#" + id).attr("button_parent")),
      $("#" + id).attr("button_parent")
    );
    var myModalEl = document.getElementById($("#" + id).attr("mo_id"));
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  }
  console.log($('input[name="reward"]:checked').val());
  setlocalstorage();
}

function set_selected_reward(obj, cls) {
  if (obj.hasClass("selected_btn")) {
    $("input[type=radio][name=reward]").prop('checked', false);
    validreward(false, true);
    return false;
  }
  validreward(false, true);
  obj.attr("class", "selected_btn select_button w-inline-block " + cls);
  obj.html(`
            <div class="btn_text_check_block">
              <div class="upload_btn_text">เลือกชิงรางวัลนี้</div>
            </div>
            <div class="arrow_block"><img src="/img/Check_icon.svg" loading="lazy" alt=""></div>
            `);
}

function set_selected_reward_outer(obj, cls) {
  if (obj.hasClass("selected_btn")) {
    $("input[type=radio][name=reward]").prop('checked', false);
    validreward(false, true);
    return false;
  }
  obj.attr("class", "selected_btn select_button w-inline-block " + cls);
  obj.html(`
            <div class="btn_text_check_block">
              <div class="upload_btn_text">เลือกชิงรางวัลนี้</div>
            </div>
            <div class="arrow_block"><img src="/img/Check_icon.svg" loading="lazy" alt=""></div>
            `);
}

function validupload() {
  if ($(".fileupload").length <= 0) {
    alert("Please select a file to upload");
    return false;
  }
  for (var i = 0; i < $(".fileupload").length; i++) {
    let cur = $(".fileupload").eq(i)[0];
    if (!cur.files[0]) {
      alert("Please select a file to upload");
      return false;
    }
  }
  return true;
}

function validreward(actvalid = false, noalert = false) {
  if (actvalid) {
    return true;
  }
  sum = 0;
  for (let i = 0; i < $(".amount").length; i++) {
    let cur = $(".amount").eq(i);
    sum += toFloat(cur.val());
  }
  sum = Math.floor(sum / 1000);
  if (sum < 1 && !noalert) {
    alert("กรุณากรอกยอดรวม ขั้นต่ำ 1000 บาท");
    return false;
  }
  for (let i = 0; i < $("input[price]").length; i++) {
    let cur = $("input[price]").eq(i);
    let price = toFloat(cur.attr("price"));
    if (price > sum) {
      //cur.attr("disabled", "");
      cur.prop("disabled", true);
    } else {
      //cur.removeAttr("disabled");
      cur.prop("disabled", false);
    }
  }
  for (let i = 0; i < $(".select_button").length; i++) {
    let cur = $(".select_button").eq(i);
    let price = toFloat(cur.attr("price"));
    if (price > sum) {
      cur.attr(
        "class",
        "cannot_select_btn select_button w-inline-block " + cur.attr("id")
      );
      cur.html(`<div class="upload_btn_text">พ้อยท์ไม่เพียงพอ</div>`);
    } else {
      cur.attr(
        "class",
        "can_select_btn select_button w-inline-block " + cur.attr("id")
      );
      cur.html(`<div class="upload_btn_text">เลือกชิงรางวัลนี้</div>`);
    }
  }
  for (let i = 0; i < $(".reward_thumbnail img").length; i++) {
    let cur = $(".reward_thumbnail img").eq(i);
    let price = toFloat(cur.attr("price"));
    if (price > sum) {
      cur.addClass("reward_thumbnail_image_grey");
    } else {
      cur.removeClass("reward_thumbnail_image_grey");
    }
  }

  for (let i = 0; i < $(".reward_image_block").length; i++) {
    let cur = $(".reward_image_block").eq(i);
    let price = toFloat(cur.attr("price"));
    if (price > sum) {
      cur.parent().removeClass("bg");
    } else {
      cur.parent().addClass("bg");
    }
  }
  for (let i = 0; i < $(".reward_image_mobile_block").length; i++) {
    let cur = $(".reward_image_mobile_block").eq(i);
    let price = toFloat(cur.attr("price"));
    if (price > sum) {
      cur.parent().removeClass("bg");
    } else {
      cur.parent().addClass("bg");
    }
  }
  return true;
}

function section_select(id, actvalid = false) {
  if (id == "section-2") {
    if (!validupload()) {
      return false;
    }
    if (!validreward(actvalid)) {
      return false;
    }
    $("input[type=radio][name=reward]").prop('checked', false);
    renderstagerun(sum);
  }
  $(".sections").addClass("hide");
  $("#" + id).removeClass("hide");
  setInput();
  $(document).scrollTop(0);
}
$(document).on("change", ".fileupload", function (e) {
  var cur = $(this);
  let reader = new FileReader();
  let file = this.files[0];
  reader.onloadend = function () {
    var dataURL = reader.result;
    var btntxt = cur.parent().parent().parent().find(".upload_btn_text");
    btntxt.html(file.name);
    btntxt.addClass("uploaded_btn_text");
    btntxt.removeClass("upload_btn_text");
    cur.parent().parent().parent().find(".upload_icon_block").remove();
    /*btntxt
      .parent()
      .append(
        `<div class="delete_upload_btn del_slip"><img src="/img/8163020.png" loading="lazy" alt="" class="bin_icon_image"></div>`
      );*/
    btntxt
      .parent()
      .attr("class", "uploaded_stage w-inline-block fileinput-button");
    cur.parent().parent().parent().find(".filename").val(file.name);
  };
  if (file) {
    reader.readAsDataURL(file);
  }
});
var slip_id = 0;

function add_receive() {
  slip_id += 1;
  $.ajax({
    method: "GET",
    url: "/register/template/receive",
    data: {
      id: slip_id,
    },
  })
    .done(function (data) {
      $(".upload-holder").append(data);
    })
    .fail(function (data) {
      alert("template error :" + data["msg"]);
      //window.open("/register/response", "_self");
    });
}
$(document).on("click", ".del_slip", function (e) {
  if (confirm("confirm delete")) {
    $(this)
      .parent()
      .parent()
      .parent()
      .fadeOut("fast", () => {
        $(this).parent().parent().parent().remove();
      });
    add_receive();
  }
});
$(document).on("click", ".close-link-block", function (e) {
  if (confirm("confirm delete")) {
    $(this)
      .parent()
      .parent()
      .fadeOut("fast", () => {
        $(this).parent().parent().remove();
      });
  }
});

$(document).on("click", ".selected_btn", function (e) {
  $("input[type=radio][name=reward]").prop('checked', false);
  //validreward(false, true);
});
function toFloat(dat) {
  let result = parseFloat(dat);
  if (isNaN(result)) {
    result = 0;
  }
  return result;
}

function validinputtxt(){
  for (let i = 0; i < $("input[type=text]").length; i++) {
    let cur = $("input[type=text]").eq(i);
    if (cur.val()=="") {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return false;
    } 
  }
  if ($("#des").val()=="") {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    return false;
  } 
  return true;
}
