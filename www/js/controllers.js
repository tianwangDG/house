angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$rootScope) {

    $scope.sliders = [
      {id:1,title:'slider1',src:'img/sliders/slider1.jpg'},
      {id:2,title:'slider2',src:'img/sliders/slider2.jpg'},
      {id:3,title:'slider3',src:'img/sliders/slider3.jpg'},
      {id:4,title:'slider4',src:'img/sliders/slider4.jpg'}
    ];

    $scope.fcData = [
      {id:1,name:'皇庭壹号',zt:'毛坯',qy:'东城区',zj:500000,fx:'三房',thumbnail:'img/lp/lp2.jpg'},
      {id:2,name:'东莞人家',zt:'简装',qy:'南城区',zj:1800000,fx:'两房',thumbnail:'img/lp/lp1.jpg'},
      {id:3,name:'来座山',zt:'简装',qy:'东城区',zj:2200000,fx:'一房',thumbnail:'img/lp/lp2.jpg'},
      {id:4,name:'御湾国际',zt:'简装',qy:'南城区',zj:2700000,fx:'一房',thumbnail:'img/lp/lp1.jpg'},
      {id:5,name:'东城中心',zt:'毛坯',qy:'东城区',zj:1900000,fx:'五房',thumbnail:'img/lp/lp2.jpg'},
      {id:6,name:'帝景花园',zt:'清水',qy:'南城区',zj:2800000,fx:'一房',thumbnail:'img/lp/lp1.jpg'},
      {id:7,name:'北大一号',zt:'精装',qy:'万江区',zj:1550000,fx:'两房',thumbnail:'img/lp/lp2.jpg'},
      {id:8,name:'万江首府',zt:'精装',qy:'万江区',zj:400000,fx:'四房',thumbnail:'img/lp/lp1.jpg'},
      {id:9,name:'帝景国际',zt:'毛坯',qy:'万江区',zj:1080000,fx:'三房',thumbnail:'img/lp/lp2.jpg'},
      {id:10,name:'万佳花园',zt:'毛坯',qy:'南城区',zj:500000,fx:'四房',thumbnail:'img/lp/lp1.jpg'},
      {id:11,name:'水岸华庭',zt:'毛坯',qy:'厚街区',zj:1000000,fx:'三房',thumbnail:'img/lp/lp2.jpg'},
      {id:12,name:'常平首府',zt:'豪装',qy:'厚街区',zj:700000,fx:'三房',thumbnail:'img/lp/lp1.jpg'},
      {id:13,name:'都市华府',zt:'清水',qy:'南城区',zj:1800000,fx:'两房',thumbnail:'img/lp/lp2.jpg'},
      {id:14,name:'东方华府',zt:'清水',qy:'东城区',zj:2300000,fx:'五房',thumbnail:'img/lp/lp1.jpg'},
      {id:15,name:'皇庭国际',zt:'豪装',qy:'万江区',zj:1300000,fx:'两房',thumbnail:'img/lp/lp2.jpg'},
      {id:16,name:'碧湖东岸',zt:'豪装',qy:'市辖区',zj:1000000,fx:'三房',thumbnail:'img/lp/lp1.jpg'}
    ];

    $scope.ztItem = [
      {id:1,lx:'zt',name:'毛坯'},
      {id:2,lx:'zt',name:'清水'},
      {id:3,lx:'zt',name:'简装'},
      {id:4,lx:'zt',name:'精装'},
      {id:5,lx:'zt',name:'豪装'}
    ];
    $scope.qyItem = [
      {id:1,lx:'qy',name:'不限'},
      {id:2,lx:'qy',name:'市辖区'},
      {id:3,lx:'qy',name:'东城区'},
      {id:4,lx:'qy',name:'南城区'},
      {id:5,lx:'qy',name:'万江区'},
      {id:6,lx:'qy',name:'厚街区'}
    ];
    $scope.zjItem = [
      {id:1,lx:'zj',name:'100万以下'},
      {id:2,lx:'zj',name:'100-150万'},
      {id:3,lx:'zj',name:'150-200万'},
      {id:4,lx:'zj',name:'200-250万'},
      {id:5,lx:'zj',name:'250-300万'}
    ];
    $scope.fxItem = [
      {id:1,lx:'fx',name:'一房'},
      {id:2,lx:'fx',name:'两房'},
      {id:3,lx:'fx',name:'三房'},
      {id:4,lx:'fx',name:'四房'},
      {id:5,lx:'fx',name:'五房'}
    ];
    $scope.tsItem = [
      {id:1,lx:'ts',name:'不限'},
      {id:2,lx:'ts',name:'精装修'},
      {id:3,lx:'ts',name:'带花园'},
      {id:4,lx:'ts',name:'近地铁'},
      {id:5,lx:'ts',name:'带飘窗'},
      {id:6,lx:'ts',name:'不限购'}
    ];
    $scope.smItem = [
      {id:1,lx:'sm',name:'不限'},
      {id:2,lx:'sm',name:'即将开盘'},
      {id:3,lx:'sm',name:'排卡中'},
      {id:4,lx:'sm',name:'在售'},
      {id:5,lx:'sm',name:'售罄'}
    ];
    $scope.filterType = [
      {id:1,lx:'zt',name:'状态'},
      {id:2,lx:'qy',name:'区域'},
      {id:3,lx:'zj',name:'总价'},
      {id:4,lx:'fx',name:'房型'},
      {id:5,lx:'ts',name:'特色'},
      {id:6,lx:'sm',name:'售卖状态'},
    ];


    $scope.getFilterFactor = function($filterFactor){
      switch($filterFactor){
        case 'zt':
          $scope.items = $scope.ztItem;
          break;
        case 'qy':
          $scope.items = $scope.qyItem;
          break;
        case 'zj':
          $scope.items = $scope.zjItem;
          break;
        case 'fx':
          $scope.items = $scope.fxItem;
          break;
      }
      return $scope.items;
    }



    $scope.result = $scope.fcData;

    $scope.showFilterBox = false;
    $scope.showMoreFilterBox = false;
    $scope.arrowType = 'ion-arrow-up-b';

    $scope.showFilter = function($id,$filterFactor,$index){
      $scope.showMoreFilterBox = false;
      if(!$scope.showFilterBox){
        $scope.showFilterBox = !$scope.showFilterBox;
        $scope.items = $scope.getFilterFactor($filterFactor);
        $scope.key = $id;
      }else if($scope.showFilterBox && $scope.key == $id){
        $scope.showFilterBox = false;
        $scope.key = null;
      }else{
        $scope.items = $scope.getFilterFactor($filterFactor);
        $scope.key = $id;
      }

    }




    $scope.showMoreFilter = function($filterFactor) {
      $scope.showFilterBox = false;

      $scope.showMoreFilterBox = !$scope.showMoreFilterBox;

      $scope.moreItems = $scope.tsItem;

      $scope.moreFilterItem = function($filterFactor) {
        switch ($filterFactor) {
          case 'ts':
            $scope.moreItems = $scope.tsItem;
            break;
          case 'sm':
            $scope.moreItems = $scope.smItem;
            break;
        }
      }

    }



    $scope.filterZt = function($lx,$index){
      switch($lx) {
        case 'zt':
          $scope.result = [];
          switch ($index){
            case 1:
              $scope.fcData.forEach(function(e){
                if(e.zt == '毛坯'){
                  $scope.result.push(e);
                }
              })
              break;
            case 2:
              $scope.fcData.forEach(function(e){
                if(e.zt == '清水'){
                  $scope.result.push(e);
                }
              })
              break;
            case 3:
              $scope.fcData.forEach(function(e){
                if(e.zt == '简装'){
                  $scope.result.push(e);
                }
              })
              break;
            case 4:
              $scope.fcData.forEach(function(e){
                if(e.zt == '精装'){
                  $scope.result.push(e);
                }
              })
              break;
            case 5:
              $scope.fcData.forEach(function(e){
                if(e.zt == '豪装'){
                  $scope.result.push(e);
                }
              })
              break;
          }
          $scope.showFilterBox = false;
          $scope.showMoreFilterBox = false;
          break;

        case 'qy':
          $scope.result = [];
          switch ($index){
            case 1:
              $scope.result = $scope.fcData;
              break;
            case 2:
              $scope.fcData.forEach(function(e){
                if(e.qy == '市辖区'){
                  $scope.result.push(e);
                }
              })
              break;
            case 3:
              $scope.fcData.forEach(function(e){
                if(e.qy == '东城区'){
                  $scope.result.push(e);
                }
              })
              break;
            case 4:
              $scope.fcData.forEach(function(e){
                if(e.qy == '南城区'){
                  $scope.result.push(e);
                }
              })
              break;
            case 5:
              $scope.fcData.forEach(function(e){
                if(e.qy == '万江区'){
                  $scope.result.push(e);
                }
              })
              break;
            case 6:
              $scope.fcData.forEach(function(e){
                if(e.qy == '厚街区'){
                  $scope.result.push(e);
                }
              })
              break;
          }
          $scope.showFilterBox = false;
          $scope.showMoreFilterBox = false;
          break;

        case 'zj':
          $scope.result = [];
          switch ($index){
            case 5:
              $scope.fcData.forEach(function(e){
                if(e.zj > 2500000){
                  $scope.result.push(e);
                }
              })
              break;
            case 4:
              $scope.fcData.forEach(function(e){
                if(e.zj > 2000000 && e.zj <= 2500000){
                  $scope.result.push(e);
                }
              })
              break;
            case 3:
              $scope.fcData.forEach(function(e){
                if(e.zj > 1500000 && e.zj <= 2000000){
                  $scope.result.push(e);
                }
              })
              break;
            case 2:
              $scope.fcData.forEach(function(e){
                if(e.zj> 1000000 && e.zj <= 1500000){
                  $scope.result.push(e);
                }
              })
              break;
            case 1:
              $scope.fcData.forEach(function(e){
                if(e.zj < 1000000){
                  $scope.result.push(e);
                }
              })
              break;
          }
          $scope.showFilterBox = false;
          $scope.showMoreFilterBox = false;
          break;

        case 'fx':
          $scope.result = [];
          switch ($index){
            case 1:
              $scope.fcData.forEach(function(e){
                if(e.fx == '一房'){
                  $scope.result.push(e);
                }
              })
              break;
            case 2:
              $scope.fcData.forEach(function(e){
                if(e.fx == '两房'){
                  $scope.result.push(e);
                }
              })
              break;
            case 3:
              $scope.fcData.forEach(function(e){
                if(e.fx == '三房'){
                  $scope.result.push(e);
                }
              })
              break;
            case 4:
              $scope.fcData.forEach(function(e){
                if(e.fx == '四房'){
                  $scope.result.push(e);
                }
              })
              break;
            case 5:
              $scope.fcData.forEach(function(e){
                if(e.fx == '五房'){
                  $scope.result.push(e);
                }
              })
              break;
          }
          $scope.showFilterBox = false;
          $scope.showMoreFilterBox = false;
          break;

      }
      console.log($scope.result);

    }





  })

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope,$ionicHistory){
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
})

.controller('testCtrl', function($scope){
  $scope.test = 'test...';
})

.controller('houseCtrl', function($scope,$ionicHistory){
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
})

.controller('houseDetailCtrl', function($scope, $ionicHistory){
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
})

.controller('houseSjtCtrl', function($scope, $ionicHistory){
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
})

.controller('houseZslCtrl', function($scope, $ionicHistory, $ionicScrollDelegate){
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

  $scope.options = {
    loop: true,
    effect: 'slide',
    speed: 500,
    spaceBetween:30,
    slidesPerView:2,
    initialSlide:0,
    slidesPerColumn:1,
    slidesPerColumnFill:'column',
    slidesPerGroup:1,
    centeredSlides:true,
    slidesOffsetBefore:0,
    slidesOffsetAfter:0,
    paginationHide:false,
    pagination: '.swiper-pagination',
    paginationClickable: true,
  }

  $scope.sliderArr = [
    {id:1,img:'img/house/hxt/hxt1.png',name:'户型A:4室2厅2卫 164平米',price:'700万',label:'大户型+朝南+低价',ld:'15栋'},
    {id:2,img:'img/house/hxt/hxt2.png',name:'户型B:3室2厅2卫 104平米',price:'580万',label:'小户型+朝东+高性价比',ld:'5栋'},
    {id:3,img:'img/house/hxt/hxt3.png',name:'户型C:4室2厅2卫 124平米',price:'705万',label:'中户型+朝东+低价',ld:'4栋'},
    {id:4,img:'img/house/hxt/hxt1.png',name:'户型D:3室2厅2卫 94平米',price:'608万',label:'大户型+朝南+低价',ld:'6栋'},
    {id:5,img:'img/house/hxt/hxt2.png',name:'户型E:5室3厅2卫 264平米',price:'1408万',label:'小户型+朝北+低价',ld:'3栋'},
    {id:6,img:'img/house/hxt/hxt3.png',name:'户型F:4室2厅2卫 134平米',price:'300万',label:'中户型+朝南+高性价比',ld:'11栋'},
    {id:7,img:'img/house/hxt/hxt1.png',name:'户型G:3室1厅1卫 89平米',price:'160万',label:'大户型+朝东+低价',ld:'1栋'},
    {id:8,img:'img/house/hxt/hxt2.png',name:'户型H:3室1厅2卫 98平米',price:'600万',label:'小户型+朝南+高性价比',ld:'7'},
    {id:9,img:'img/house/hxt/hxt3.png',name:'户型I:3室2厅2卫 100平米',price:'500万',label:'中户型+朝东+高性价比',ld:'5栋'}
  ];

  $scope.$watch('slider', function(nv, ov) {
    //console.log($scope.slider);
    //$scope.test = $scope.slider;
    //console.log($scope.test);
    //
    //console.log(ov);
  });


  $scope.onSliderShow = function($index){
    console.log($index);
  }

  setTimeout(function(){
    $scope.$broadcast('scroll.resize');
  }, 2000);

  $scope.map = {
    id:1,
    ld:[
      {lid:1,ldh:'1栋',sales:'在售',x:548,y:453,hx:[{hid:1,title:'4室2厅2卫'},{hid:2,title:'3室2厅2卫'},{hid:3,title:'2室1厅1卫'}]},
      {lid:2,ldh:'2栋',sales:'售完',x:830,y:700,hx:[{hid:1,title:'3室1厅2卫'},{hid:2,title:'4室2厅3卫'},{hid:3,title:'3室2厅2卫'}]},
      {lid:3,ldh:'3栋',sales:'在售',x:900,y:960,hx:[{hid:1,title:'5室2厅3卫'},{hid:2,title:'3室1厅2卫'},{hid:3,title:'4室2厅1卫'}]}
    ],
    px:1600,
    py:1249,
  };

  $scope.ldLabels = [];

  //$scope.map.ld.forEach(function(ld){
  //  let label = `<div class="ldLabel" style="top:${ld.y};left:${ld.x};">${ld.ldh}</div>`;
  //  console.log(label);
  //  $scope.ldLabels.push(label);
  //});



  $scope.changeXY = function(x,y){
    $ionicScrollDelegate.scrollTo(x,y);
  }





})

.controller('houseZbCtrl', function($scope, $ionicHistory){
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
})

.controller('hqyhCtrl',function($scope, $ionicHistory){
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
});







