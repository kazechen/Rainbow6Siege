let xhr = new XMLHttpRequest;
xhr.open('get','https://kazechen.github.io/Rainbow6Siege/files/operators_six.json',true);
xhr.send(null);

let dataArr = [];
xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        dataArr = JSON.parse(this.responseText);
        operatorList(dataArr);
      }
    }
};

var html = "";
function operatorList(dataArr) {
  var orgs = ["S.A.S" ,"FBI SWAT", "GIGN", "Spetsnaz", "GSG 9", "JTF2", "SEALs", "BOPE", "SAT", "GEO", "SDU", "GROM", "707th", "CBRN"];
  var operators = new Vue({
    el: '#operators',
    data: {
      items: dataArr

    },
    components: {

    },
    computed: {
      filterPosition_ATK: function() {
        return this.items.filter(function(item) {
          return item.Position === "Attacker"
        });
      },
      filterPosition_DEF: function() {
        return this.items.filter(function(item) {
          return item.Position === "Defender"
        });
      }
    }
  })
} //func operatorList



//電競相關
var eSports = new Vue({
  el: '#eSports_links',
  data: {
    title: '電競相關',
    links: [
      {name: '官方中文轉播', url:'http://www.ubisoft.com.tw/'},
      {name: '職業電競賽程', url:'https://support.ubi.com/zh-TW/'},
      {name: '職業電競隊伍', url:'https://rainbow6.ubisoft.com/siege/en-us/home/'}
    ]
  }
})

//遊戲社群
var social = new Vue({
  el: '#social_links',
  data: {
    title: '遊戲社群',
    links: [
      {name: '巴哈姆特討論區', url:'https://forum.gamer.com.tw/A.php?bsn=1054'},
      {name: 'Facebook社團', url:'https://www.facebook.com/groups/778765848917490/'},
      {name: '百度貼吧', url:'https://tieba.baidu.com/f?kw=%B2%CA%BA%E7%C1%F9%BA%C5'},
      {name: 'Reddit 論壇', url:'https://www.reddit.com/r/Rainbow6/'}
    ]
  }
})

//官方網站
var official = new Vue({
  el: '#official_links',
  data: {
    title: '官方網站',
    links: [
      {name: '遊戲官網', url:'https://rainbow6.ubisoft.com/siege/en-us/home/'},
      {name: 'Ubisoft 官方網站', url:'http://www.ubisoft.com.tw/'},
      {name: 'Ubisoft 客戶服務', url:'https://support.ubi.com/zh-TW/'},
      {name: 'Facebook 粉絲頁', url:'https://zh-tw.facebook.com/Ubisoft.TWN/'},
      {name: 'Youtube 頻道', url:'https://www.youtube.com/channel/UCxXbnxNte0RkAbAVceWgwNA'}
    ]
  }
})

$('.nav-tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$(function(){
  var nowYear = new Date().getFullYear();
  $("#home").on("click","#operators a",function(e){
    var index = e.currentTarget.dataset.index;
    var htmlStr = `
      <div>
        <p>
          所屬單位：${dataArr[index].Org} (${dataArr[index].Org_country})
        </p>
        <p>
          真實姓名：${dataArr[index].Realname}
        </p>
        <p>
          出生日期：${dataArr[index].Birthday} (${nowYear - dataArr[index].Birthday.slice(0, 4)}歲)
        </p>
        <hr>
        <p>
          護　　甲：${dataArr[index].Armor}
        </p>
        <p>
          速　　度：${dataArr[index].Speed}
        </p>
        <p>
          特殊技能：${dataArr[index].Device}
        </p>
        特殊描述：${dataArr[index].Device_Description}<br>
        <hr>
        <p>
          主武器：${dataArr[index].Primary}
        </p>
        <p>
          次要武器：${dataArr[index].Secondary}
        </p>
        <p>
          裝　備：${dataArr[index].Gadget}
        </p>
      </div>
    `;
    //modal-title
    document.querySelector('.modal-title').innerHTML = `
      <img src="images/${dataArr[index].img_url}_icon.png"> ${dataArr[index].Nickname} <span class="name_zh">( ${dataArr[index].Nickname_zh} )</span>
    `;
    //modal-body
    document.querySelector('.modal-body').innerHTML = htmlStr;
    console.log(e.currentTarget.dataset.index);
    console.log(e.target);
  });

  function sideView() {
    if($(window).width() < 992) {
      $("#external").append($(".side"));
    } else {
      $(".right-side").prepend($(".side"));
    }
  }
  sideView()
  $(window).resize(function() {
    sideView()
  });

  $(window).scroll(function(event) {
    /* Act on the event */
    if($(this).scrollTop() > 80) {
      $('.go-top a').fadeIn();
    } else {
      $('.go-top a').fadeOut(800);
    }
  });

});
