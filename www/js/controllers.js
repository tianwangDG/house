angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$rootScope,$state,$http) {
    $scope.goToMemberInfo = function(){
      $state.go('memberInfo');
    };

    $scope.sliders = [
      {id:1,title:'slider1',src:'img/sliders/slider1.jpg'},
      {id:2,title:'slider2',src:'img/sliders/slider2.jpg'},
      {id:3,title:'slider3',src:'img/sliders/slider3.jpg'},
      {id:4,title:'slider4',src:'img/sliders/slider4.jpg'}
    ];

            
    $http.get("http://house_server").success(function(response){
    $scope.result = response["data"]["fcData"];
    $scope.ztItem = response["data"]["ztItem"];
    $scope.qyItem = response["data"]["qyItem"];
    $scope.zjItem = response["data"]["zjItem"];
    $scope.fxItem = response["data"]["fxItem"];
    $scope.tsItem = response["data"]["tsItem"];
    $scope.smItem = response["data"]["smItem"];
    $scope.filterType = response["data"]["filterType"];

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
        $http.get("http://house_server/home/house?name="+$lx+"&value="+$index).success(function(response){
            $scope.result=response["data"];
            $scope.showFilterBox = false;
            $scope.showMoreFilterBox = false;
        });
    }
    });


  })





.controller('ChatsCtrl', function($scope, $ionicModal, $ionicHistory, $ionicPopup, $state) {



    $scope.active_content = 'booked';
    $scope.setActiveContent = function(active_content){
      $scope.active_content = active_content;
    }

    $scope.jdr = {
      name:'胡景欢',
      phone:'18603045126'
    };

    $scope.bookLpArray = [
      {id:1,name:'皇庭壹号',zt:'毛坯',qy:'东城区',zj:500000,fx:'三房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
      {id:2,name:'东莞人家',zt:'简装',qy:'南城区',zj:1800000,fx:'两房',thumbnail:'img/lp/lp1.jpg',isChecked:false},
      {id:3,name:'来座山',zt:'简装',qy:'东城区',zj:2200000,fx:'一房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
      {id:4,name:'御湾国际',zt:'简装',qy:'南城区',zj:2700000,fx:'一房',thumbnail:'img/lp/lp1.jpg',isChecked:false},
      {id:5,name:'东城中心',zt:'毛坯',qy:'东城区',zj:1900000,fx:'五房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
      {id:6,name:'帝景花园',zt:'清水',qy:'南城区',zj:2800000,fx:'一房',thumbnail:'img/lp/lp1.jpg',isChecked:false},
      {id:7,name:'北大一号',zt:'精装',qy:'万江区',zj:1550000,fx:'两房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
      {id:8,name:'万江首府',zt:'精装',qy:'万江区',zj:400000,fx:'四房',thumbnail:'img/lp/lp1.jpg',isChecked:false},
      {id:9,name:'帝景国际',zt:'毛坯',qy:'万江区',zj:1080000,fx:'三房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
      {id:10,name:'万佳花园',zt:'毛坯',qy:'南城区',zj:500000,fx:'四房',thumbnail:'img/lp/lp1.jpg',isChecked:false},
      {id:11,name:'水岸华庭',zt:'毛坯',qy:'厚街区',zj:1000000,fx:'三房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
      {id:12,name:'常平首府',zt:'豪装',qy:'厚街区',zj:700000,fx:'三房',thumbnail:'img/lp/lp1.jpg',isChecked:false},
      {id:13,name:'都市华府',zt:'清水',qy:'南城区',zj:1800000,fx:'两房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
      {id:14,name:'东方华府',zt:'清水',qy:'东城区',zj:2300000,fx:'五房',thumbnail:'img/lp/lp1.jpg',isChecked:false},
      {id:15,name:'皇庭国际',zt:'豪装',qy:'万江区',zj:1300000,fx:'两房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
      {id:16,name:'碧湖东岸',zt:'豪装',qy:'市辖区',zj:1000000,fx:'三房',thumbnail:'img/lp/lp1.jpg',isChecked:false}
    ];

    $scope.bookLpName = $scope.bookLpArray[0].name;

    //选择预约楼盘
    $ionicModal.fromTemplateUrl('bookLpModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.BookLpModal = modal;
    })
    $scope.openBookLpModal = function() {
      $scope.BookLpModal.show();
    }
    $scope.closeBookLpModal = function() {
      return $scope.BookLpModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.BookLpModal.remove();
    });

    $scope.selectBookLp = function(selectedLp){
      //console.log(selectedHy);
      $scope.bookLpName = selectedLp;
      return $scope.BookLpModal.hide();
    }



    $scope.cancelBook = function(){
      var cancelBook = $ionicPopup.confirm({
        title: '',
        template: '<p style="text-align: center;">确定取消此次预约？</p>',
        buttons:[
          {text:'取消', type:'button-positive'},
          {text:'确定', type:'button-default'}
        ]
      });

      cancelBook.then(function(res) {
        if(res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    }

    $scope.pklp = [];
    $scope.pkBtn = false;

    $scope.getPKLP = function(gzlp){
      //console.log(gzlp.isChecked);
      //console.log(gzlp.id);
      //console.log(gzlp.name);

      if(gzlp.isChecked){

        if($scope.pklp.length > 2){
          var lpCompare = $ionicPopup.alert({
            title: '',
            template: '<p style="text-align: center;">最多只能对比三个楼盘？</p>',
            buttons:[
              {text:'确定', type:'button-default'}
            ]
          });
          lpCompare.then(function(){
            gzlp.isChecked = false;
          })
        }else{
          $scope.pklp.push(gzlp.id);
        }

      }else{
        var index = $scope.pklp.indexOf(gzlp.id);
        $scope.pklp.splice(index,1);
      }

      //console.log($scope.pklp);

    }

    $scope.$watch('pklp.length', function(){
      if($scope.pklp.length > 1){
        $scope.pkBtn = true;
      }else{
        $scope.pkBtn = false;
      }
    });


    $scope.pk = function(pklp){
      $state.go('pk',{param:pklp});
    }

})


.controller('pkCtrl', function($scope,$ionicHistory,$stateParams){
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

    $scope.active_content = 'fwhx';
    $scope.setActiveContent = function(active_content){
      $scope.active_content = active_content;
    }



    console.log($stateParams.param);

    $scope.compareFields = [
      {id:1,field:"参考价格"},
      {id:2,field:"交楼状态"},
      {id:3,field:"最早交楼"},
      {id:4,field:"产权年限"},
      {id:5,field:"规划户数"},
      {id:6,field:"规划车位"},
      {id:7,field:"容积率"},
      {id:8,field:"绿化率"},
      {id:9,field:"水电燃气"},
      {id:10,field:"开发商"}
    ];

    $scope.comparePt = [
      {id:1,field:"距离中心"},
      {id:2,field:"距离轻轨"},
      {id:3,field:"距离学校"},
      {id:4,field:"距离医院"},
      {id:5,field:"距离市场"},
    ];

    $scope.pklp = [
      {id:1,name:'皇庭壹号',zt:'毛坯',qy:'东城区',zj:500000,fx:'三房',thumbnail:'img/lp/lp1.jpg',isChecked:false,lpPrice:'7000元',jzjl:'2016年9月',cqnx:'70年',ghhs:'1500',ghcw:'1200',rjl:'5.32',lhl:'30%',sdrq:'民水民电',develop:'正德集团',jlzx:'0.8km',jlqg:'3km','jlxx':'0.6km',jlyy:'2.0km',jlsc:'0.4km'},
      {id:7,name:'北大一号',zt:'精装',qy:'万江区',zj:1550000,fx:'两房',thumbnail:'img/lp/lp2.jpg',isChecked:false,lpPrice:'6000元',jzjl:'2015年8月',cqnx:'50年',ghhs:'2500',ghcw:'2200',rjl:'5.32',lhl:'35%',sdrq:'商业用途',develop:'富盈集团',jlzx:'0.9km',jlqg:'3.2km','jlxx':'1.2km',jlyy:'2.2km',jlsc:'1.4km'},
      {id:9,name:'帝景国际',zt:'毛坯',qy:'万江区',zj:1080000,fx:'三房',thumbnail:'img/lp/lp1.jpg',isChecked:false,lpPrice:'7800元',jzjl:'2016年1月',cqnx:'60年',ghhs:'1800',ghcw:'1000',rjl:'5.32',lhl:'40%',sdrq:'民水民电',develop:'万科地产',jlzx:'0.6km',jlqg:'2.3km','jlxx':'0.5km',jlyy:'2.3km',jlsc:'4.4km'}
    ];


    $scope.hxxx = [
      {id:1,img:'img/house/hxt/hxt1.png',name:'户型A:4室2厅2卫 164平米',price:'700万',label:'大户型+朝南+低价',ldId:1,title:'户型A',ldName:'57栋',dy:'3单元',cs:'25层',mj:'246平米'},
      {id:2,img:'img/house/hxt/hxt2.png',name:'户型B:3室2厅2卫 104平米',price:'580万',label:'小户型+朝东+高性价比',ldId:3,title:'户型B',ldName:'5栋',dy:'2单元',cs:'20层',mj:'156平米'},
      {id:3,img:'img/house/hxt/hxt3.png',name:'户型C:4室2厅2卫 124平米',price:'705万',label:'中户型+朝东+低价',ldId:2,title:'户型C',ldName:'7栋',dy:'1单元',cs:'15层',mj:'237平米'},
      {id:4,img:'img/house/hxt/hxt1.png',name:'户型D:3室2厅2卫 94平米',price:'608万',label:'大户型+朝南+低价',ldId:1,title:'户型D',ldName:'9栋',dy:'1单元',cs:'28层',mj:'323平米'},
      {id:5,img:'img/house/hxt/hxt2.png',name:'户型E:5室3厅2卫 264平米',price:'1408万',label:'小户型+朝北+低价',ldId:1,title:'户型E',ldName:'10栋',dy:'3单元',cs:'22层',mj:'113平米'},
      {id:6,img:'img/house/hxt/hxt3.png',name:'户型F:4室2厅2卫 134平米',price:'300万',label:'中户型+朝南+高性价比',ldId:2,title:'户型F',ldName:'8栋',dy:'2单元',cs:'21层',mj:'132平米'},
      {id:7,img:'img/house/hxt/hxt1.png',name:'户型G:3室1厅1卫 89平米',price:'160万',label:'大户型+朝东+低价',ldId:3,title:'户型G',ldName:'4栋',dy:'2单元',cs:'20层',mj:'136平米'},
      {id:8,img:'img/house/hxt/hxt2.png',name:'户型H:3室1厅2卫 98平米',price:'600万',label:'小户型+朝南+高性价比',ldId:3,title:'户型H',ldName:'2栋',dy:'1单元',cs:'19层',mj:'205平米'},
      {id:9,img:'img/house/hxt/hxt3.png',name:'户型I:3室2厅2卫 100平米',price:'500万',label:'中户型+朝东+高性价比',ldId:2,title:'户型I',ldName:'3栋',dy:'3单元',cs:'21层',mj:'116平米'}
    ];

    $scope.hxPKA = [
        {id:1,img:'img/house/hxt/hxt1.png',name:'户型A:4室2厅2卫 164平米',price:'700万',label:'大户型+朝南+低价',ldId:1,title:'户型A',ldName:'57栋',dy:'3单元',cs:'25层',mj:'246平米'},
        {id:2,img:'img/house/hxt/hxt2.png',name:'户型B:3室2厅2卫 104平米',price:'580万',label:'小户型+朝东+高性价比',ldId:3,title:'户型B',ldName:'5栋',dy:'2单元',cs:'20层',mj:'156平米'},
        {id:3,img:'img/house/hxt/hxt3.png',name:'户型C:4室2厅2卫 124平米',price:'705万',label:'中户型+朝东+低价',ldId:2,title:'户型C',ldName:'7栋',dy:'1单元',cs:'15层',mj:'237平米'},
        {id:4,img:'img/house/hxt/hxt1.png',name:'户型D:3室2厅2卫 94平米',price:'608万',label:'大户型+朝南+低价',ldId:1,title:'户型D',ldName:'9栋',dy:'1单元',cs:'28层',mj:'323平米'},
      ];
    $scope.hxPKB = [
        {id:1,img:'img/house/hxt/hxt2.png',name:'户型B:3室2厅2卫 104平米',price:'580万',label:'小户型+朝东+高性价比',ldId:3,title:'户型B',ldName:'5栋',dy:'2单元',cs:'20层',mj:'156平米'},
        {id:2,img:'img/house/hxt/hxt2.png',name:'户型E:5室3厅2卫 264平米',price:'1408万',label:'小户型+朝北+低价',ldId:1,title:'户型E',ldName:'10栋',dy:'3单元',cs:'22层',mj:'113平米'},
        {id:3,img:'img/house/hxt/hxt3.png',name:'户型F:4室2厅2卫 134平米',price:'300万',label:'中户型+朝南+高性价比',ldId:2,title:'户型F',ldName:'8栋',dy:'2单元',cs:'21层',mj:'132平米'},
        {id:4,img:'img/house/hxt/hxt1.png',name:'户型G:3室1厅1卫 89平米',price:'160万',label:'大户型+朝东+低价',ldId:3,title:'户型G',ldName:'4栋',dy:'2单元',cs:'20层',mj:'136平米'},
      ];
    $scope.hxPKC = [
        {id:1,img:'img/house/hxt/hxt1.png',name:'户型G:3室1厅1卫 89平米',price:'160万',label:'大户型+朝东+低价',ldId:3,title:'户型G',ldName:'4栋',dy:'2单元',cs:'20层',mj:'136平米'},
        {id:2,img:'img/house/hxt/hxt2.png',name:'户型H:3室1厅2卫 98平米',price:'600万',label:'小户型+朝南+高性价比',ldId:3,title:'户型H',ldName:'2栋',dy:'1单元',cs:'19层',mj:'205平米'},
        {id:3,img:'img/house/hxt/hxt3.png',name:'户型I:3室2厅2卫 100平米',price:'500万',label:'中户型+朝东+高性价比',ldId:2,title:'户型I',ldName:'3栋',dy:'3单元',cs:'21层',mj:'116平米'}
    ];





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

.controller('houseCtrl', function($scope, $ionicHistory, $state){
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

  $scope.onSwipeUp = function(){
    $state.go('houseDetail');
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

.controller('houseZslCtrl', function($scope, $ionicHistory, $ionicScrollDelegate, $window, $state){
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

  $scope.options = {
    loop: true,
    effect: 'slide',
    speed: 500,
    spaceBetween:20,
    slidesPerView:2,
    initialSlide:0,
    slidesPerColumn:1,
    slidesPerColumnFill:'column',
    centeredSlides:true,
    slidesOffsetBefore:0,
    slidesOffsetAfter:0,
    paginationHide:true,
    paginationClickable: true,

    onSlideChangeEnd: function(swiper){
      console.log('The active index is ' + ( swiper.activeIndex ));
      //var index = swiper.activeIndex - 1;
      //$scope.onSliderShow(index);

      if(swiper.activeIndex){
        $scope.onSliderShow(swiper.activeIndex-1);
      }else{
        $scope.onSliderShow(0);
      }


    }
  }

  $scope.sliderArr = [
    {id:1,img:'img/house/hxt/hxt1.png',name:'户型A:4室2厅2卫 164平米',price:'700万',label:'大户型+朝南+低价',ldId:1},
    {id:2,img:'img/house/hxt/hxt2.png',name:'户型B:3室2厅2卫 104平米',price:'580万',label:'小户型+朝东+高性价比',ldId:3},
    {id:3,img:'img/house/hxt/hxt3.png',name:'户型C:4室2厅2卫 124平米',price:'705万',label:'中户型+朝东+低价',ldId:2},
    {id:4,img:'img/house/hxt/hxt1.png',name:'户型D:3室2厅2卫 94平米',price:'608万',label:'大户型+朝南+低价',ldId:1},
    {id:5,img:'img/house/hxt/hxt2.png',name:'户型E:5室3厅2卫 264平米',price:'1408万',label:'小户型+朝北+低价',ldId:1},
    {id:6,img:'img/house/hxt/hxt3.png',name:'户型F:4室2厅2卫 134平米',price:'300万',label:'中户型+朝南+高性价比',ldId:2},
    {id:7,img:'img/house/hxt/hxt1.png',name:'户型G:3室1厅1卫 89平米',price:'160万',label:'大户型+朝东+低价',ldId:3},
    {id:8,img:'img/house/hxt/hxt2.png',name:'户型H:3室1厅2卫 98平米',price:'600万',label:'小户型+朝南+高性价比',ldId:3},
    {id:9,img:'img/house/hxt/hxt3.png',name:'户型I:3室2厅2卫 100平米',price:'500万',label:'中户型+朝东+高性价比',ldId:2}
  ];


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

  //console.log($window.screen.availWidth);
  //console.log($window.screen.availHeight);

  $scope.onSliderShow = function(index){

    console.log(index);

    var ldId = parseInt($scope.sliderArr[index-1].ldId) - 1;
    //console.log($scope.map.ld);
    //console.log($scope.map.ld[ldId].x);
    //console.log($scope.map.ld[ldId].y);

    $scope.changeXY($scope.map.ld[ldId].x - $window.screen.availWidth/2 ,$scope.map.ld[ldId].y - 150);

  }

  setTimeout(function(){
    $scope.$broadcast('scroll.resize');
  }, 2000);

  $scope.ldLabels = [];

  $scope.changeXY = function(x,y){
    $ionicScrollDelegate.scrollTo(x,y);
  }

  $scope.goToHx = function(index){
    //console.log(index);
    //console.log($scope.sliderArr[index]);
    //console.log($scope.sliderArr[index].id);
    $state.go('houseHx', {hxId:$scope.sliderArr[index].id});
  }

  $scope.goToLd = function(){
    $state.go('houseLd');
  }


})


.controller('houseHxCtrl', function($scope, $stateParams, $ionicHistory){
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

    $scope.sliderArr = [
      {id:1,img:'img/house/hxt/hxt1.png',name:'户型A:4室2厅2卫 164平米',price:'700万',label:'大户型+朝南+低价',ldId:1},
      {id:2,img:'img/house/hxt/hxt2.png',name:'户型B:3室2厅2卫 104平米',price:'580万',label:'小户型+朝东+高性价比',ldId:3},
      {id:3,img:'img/house/hxt/hxt3.png',name:'户型C:4室2厅2卫 124平米',price:'705万',label:'中户型+朝东+低价',ldId:2},
      {id:4,img:'img/house/hxt/hxt1.png',name:'户型D:3室2厅2卫 94平米',price:'608万',label:'大户型+朝南+低价',ldId:1},
      {id:5,img:'img/house/hxt/hxt2.png',name:'户型E:5室3厅2卫 264平米',price:'1408万',label:'小户型+朝北+低价',ldId:1},
      {id:6,img:'img/house/hxt/hxt3.png',name:'户型F:4室2厅2卫 134平米',price:'300万',label:'中户型+朝南+高性价比',ldId:2},
      {id:7,img:'img/house/hxt/hxt1.png',name:'户型G:3室1厅1卫 89平米',price:'160万',label:'大户型+朝东+低价',ldId:3},
      {id:8,img:'img/house/hxt/hxt2.png',name:'户型H:3室1厅2卫 98平米',price:'600万',label:'小户型+朝南+高性价比',ldId:3},
      {id:9,img:'img/house/hxt/hxt3.png',name:'户型I:3室2厅2卫 100平米',price:'500万',label:'中户型+朝东+高性价比',ldId:2}
    ];

    console.log($stateParams);
    console.log($stateParams.hxId);
    $scope.hx = {id:2,img:'img/house/hxt/hxt2.png',name:'户型B:3室2厅2卫 104平米',price:'580万',label:'小户型+朝东+高性价比',ldId:3};


})

.controller('houseLdCtrl', function($scope,$ionicHistory,$ionicScrollDelegate, $window){
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

    $scope.map = {
      id:1,
      ld:[
        {lid:1,ldh:'1栋',sales:'在售',x:548,y:453,hx:[{hid:1,title:'4室2厅2卫'},{hid:2,title:'3室2厅2卫'},{hid:3,title:'2室1厅1卫'}],dy:'1个单元',lc:'8层',hs:'22户'},
        {lid:2,ldh:'2栋',sales:'售完',x:830,y:700,hx:[{hid:1,title:'3室1厅2卫'},{hid:2,title:'4室2厅3卫'},{hid:3,title:'3室2厅2卫'}],dy:'3个单元',lc:'14层',hs:'42户'},
        {lid:3,ldh:'3栋',sales:'在售',x:900,y:960,hx:[{hid:1,title:'5室2厅3卫'},{hid:2,title:'3室1厅2卫'},{hid:3,title:'4室2厅1卫'}],dy:'2个单元',lc:'12层',hs:'12户'}
      ],
      px:1600,
      py:1249,
    };


    $scope.options = {
      loop: false,
      effect: 'slide',
      speed: 500,
      spaceBetween:30,
      slidesPerView:1,
      initialSlide:0,
      slidesPerColumn:1,
      slidesPerColumnFill:'column',
      centeredSlides:true,
      paginationHide:false,
      paginationClickable: true,

      onInit: function(swiper){
        $scope.onSliderShow(0);
      },

      onSlideChangeEnd: function(swiper){
        //console.log('The active index is ' + (swiper.activeIndex));
        if(swiper.activeIndex){
          $scope.onSliderShow(swiper.activeIndex);
        }else{
          $scope.onSliderShow(0);
        }
      }
    };

    $scope.onSliderShow = function(index){
        $scope.changeXY($scope.map.ld[index].x - $window.screen.availWidth/2 ,$scope.map.ld[index].y - 150);
    }

    $scope.changeXY = function(x,y){
      $ionicScrollDelegate.scrollTo(x,y);
    }

})

  .controller('houseZbCtrl', function($scope, $stateParams, $ionicHistory, $rootScope, $http, $ionicPopup, $cordovaGeolocation){

    $scope.goBack = function(){
      $ionicHistory.goBack();
    };

    $scope.zbpts = [
      {id:1,name:"zbxx",type:"学校",icon:"zbxx",iconOn:"zbxxOn",imgOff:"img/house/zbicon/zbxx.png",imgOn:"img/house/zbicon/zbxxOn.png"},
      {id:2,name:"zbcs",type:"超市",icon:"zbcs",iconOn:"zbcsOn",imgOff:"img/house/zbicon/zbcs.png",imgOn:"img/house/zbicon/zbcsOn.png"},
      {id:3,name:"zbdt",type:"地铁",icon:"zbdt",iconOn:"zbdtOn",imgOff:"img/house/zbicon/zbdt.png",imgOn:"img/house/zbicon/zbdtOn.png"},
      {id:4,name:"zbjd",type:"酒店",icon:"zbjd",iconOn:"zbjdOn",imgOff:"img/house/zbicon/zbjd.png",imgOn:"img/house/zbicon/zbjdOn.png"},
      {id:5,name:"zbsc",type:"市场",icon:"zbsc",iconOn:"zbscOn",imgOff:"img/house/zbicon/zbsc.png",imgOn:"img/house/zbicon/zbscOn.png"},
      {id:6,name:"zbyy",type:"医院",icon:"zbyy",iconOn:"zbyyOn",imgOff:"img/house/zbicon/zbyy.png",imgOn:"img/house/zbicon/zbyyOn.png"},
      {id:7,name:"zbms",type:"美食",icon:"zbms",iconOn:"zbmsOn",imgOff:"img/house/zbicon/zbms.png",imgOn:"img/house/zbicon/zbmsOn.png"}
    ];

    $scope.popupBox = function(title,text,button){
      return $ionicPopup.alert({
        title: title,
        template: text,
        okText: button
      });
    };

    $scope.getZbMap = function(type,lon,lat){
      var map = new BMap.Map("allmap");
      map.centerAndZoom(new BMap.Point(lon, lat), 14);

      var local = new BMap.LocalSearch(map, {
        renderOptions:{map: map}
      });
      local.searchInBounds(type, map.getBounds());

      map.addEventListener("dragend",function(){
        map.clearOverlays();
        local.searchInBounds(type, map.getBounds());
      });
    }


    $scope.getPosition = function(type){

      if(type == undefined){
        var type = $scope.zbpts[0].type;
      }

      $scope.getZbMap(type,113.76724360543,23.024699455239);

      //var posOptions = {
      //  timeout: 10000,
      //  enableHighAccuracy: false
      //};
      //
      //$scope.loaded = false;
      //$scope.transformOk = false;
      //
      //$cordovaGeolocation.getCurrentPosition(posOptions)
      //  .then(function(pos){
      //    $scope.lon=pos.coords.longitude;
      //    $scope.lat=pos.coords.latitude;
      //    $scope.loaded = true;
      //    //$scope.popupBox('调整前','x:'+ $scope.lon + ',y:' + $scope.lat, '返回');
      //    //
      //    console.log($scope.lon);
      //    console.log($scope.lat);
      //
      //    $scope.lng = $scope.lon;
      //    $scope.lat = $scope.lat;
      //
      //    var positionUrl = "http://api.map.baidu.com/geoconv/v1/?coords="+$scope.lon+","+$scope.lat+"&from=1&to=5&ak=kAbQ9v46nkRPvD6WVFBIYOypIgQtdGXm&callback=JSON_CALLBACK";
      //    $http.jsonp(positionUrl)
      //      .success(function(data) {
      //        var result = data.result;
      //        $rootScope.x = result[0].x;
      //        $rootScope.y = result[0].y;
      //        $scope.transformOk = true;
      //
      //        if($scope.loaded && $scope.transformOk){
      //          // $scope.popupBox('提示','x:'+ $rootScope.x + ',y:' + $rootScope.y, '返回');
      //
      //          $scope.lngt = $rootScope.x;
      //          $scope.latt = $rootScope.y;
      //
      //          $scope.getZbMap(type, $rootScope.x, $rootScope.y);
      //
      //        }
      //
      //      })
      //      .error(function(){
      //        $rootScope.x = $scope.lon;
      //        $rootScope.y = $scope.lat;
      //      });
      //  },function(err){
      //    // console.log('定位不成功');
      //    $scope.popupBox('提示','无法定位您的位置','返回');
      //
      //  })

    }

    $scope.getPosition();

  })


.controller('hqyhCtrl',function($scope, $ionicHistory){
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
})




.controller('memberInfoCtrl', function($scope, $state, $ionicModal){
    $scope.goBackIndex = function () {
      $state.go('tab.dash');
    }

    $scope.hyArray = [
      {id:1,name:"互联网－软件"},
      {id:2,name:"通信－硬件"},
      {id:3,name:"房地产－建筑"},
      {id:4,name:"文化传媒"},
      {id:5,name:"金融类"},
      {id:6,name:"消费品"},
      {id:7,name:"汽车－机械"},
      {id:8,name:"教育－翻译"},
      {id:9,name:"贸易－物流"},
      {id:10,name:"生物－医疗"},
      {id:11,name:"能源－化工"},
      {id:12,name:"政府机构"},
      {id:13,name:"服务业"},
      {id:14,name:"其他行业"}
    ];


    $scope.selectHy = function(selectedHy){
      //console.log(selectedHy);
      $scope.hyName = selectedHy;
      return $scope.HyModal.hide();
    }

    if(!$scope.selectedHy){
      $scope.hyName = "互联网-软件";
    }



    //修改头像Modal
    $ionicModal.fromTemplateUrl('modifyTxModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.txModal = modal;
    })
    $scope.modifyTx = function() {
      $scope.txModal.show()
    }
    $scope.closeTxModal = function() {
      return $scope.txModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.txModal.remove();
    });


    //修改昵称Modal
    $ionicModal.fromTemplateUrl('modifyNicknameModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.NickModal = modal;
    })
    $scope.modifyNick = function() {
      $scope.NickModal.show()
    }
    $scope.closeNickModal = function() {
      return $scope.NickModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.NickModal.remove();
    });

    //修改性别Modal
    $ionicModal.fromTemplateUrl('modifyGenderModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.GenderModal = modal;
    })
    $scope.modifyGender = function() {
      $scope.GenderModal.show()
    }
    $scope.closeGenderModal = function() {
      return $scope.GenderModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.GenderModal.remove();
    });


    //修改手机号码Modal
    $ionicModal.fromTemplateUrl('modifyTelModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.telModal = modal;
    })
    $scope.modifyTel = function() {
      $scope.telModal.show()
    }
    $scope.closeTelModal = function() {
      return $scope.telModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.telModal.remove();
    });


    //修改个性签名Modal
    $ionicModal.fromTemplateUrl('modifySignatureModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.SignatureModal = modal;
    })
    $scope.modifySignature = function() {
      $scope.SignatureModal.show()
    }
    $scope.closeSignatureModal = function() {
      return $scope.SignatureModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.SignatureModal.remove();
    });


    //修改行业
    $ionicModal.fromTemplateUrl('modifyHyModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.HyModal = modal;
    })
    $scope.modifyHy = function() {
      $scope.HyModal.show();
    }
    $scope.closeHyModal = function() {
      return $scope.HyModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.HyModal.remove();
    });


    //修改公司职业
    $ionicModal.fromTemplateUrl('modifyCompanyModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.CompanyModal = modal;
    })
    $scope.modifyCompany = function() {
      $scope.CompanyModal.show()
    }
    $scope.closeCompanyModal = function() {
      return $scope.CompanyModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.CompanyModal.remove();
    });

})


.controller('memberJcqCtrl', function($scope, $state){
    $scope.goBackIndex = function () {
      $state.go('tab.dash');
    }

    $scope.jqcArray = [
      {id:1, cate:'cate1',src:'img/jqc.jpg'},
      {id:2, cate:'cate2',src:'img/jqc2.jpg'},
      {id:3, cate:'cate3',src:'img/jqc.jpg'},
      {id:4, cate:'cate3',src:'img/jqc2.jpg'},
    ];

})


.controller('memberRecommendCtrl', function($scope, $state, $ionicModal){
  $scope.goBackIndex = function () {
    $state.go('tab.dash');
  }

  $ionicModal.fromTemplateUrl('share.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.shareModal = modal;
  })
  $scope.openShareModal = function() {
    $scope.shareModal.show();
  }
  $scope.closeShareModal = function() {
    return $scope.shareModal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.shareModal.remove();
  });

})


.controller('memberFeedbackCtrl', function($scope, $state){
  $scope.goBackIndex = function () {
    $state.go('tab.dash');
  }

})



.controller('calculatorCtrl', function($scope, $state, $ionicModal, $timeout, $ionicPopup, $rootScope){
    $scope.goBackIndex = function () {
      $state.go('tab.dash');
    }



    //封装计算函数
    $scope.js = function(hkfs,fjze,sfbl,dkze,dknx,dkll){
      var yjhk = 0;
      var hkze = 0;
      var zflx = 0;
      var dkys = 0;
      var syhk = 0;

      if(dkze > fjze * ( 10 - sfbl ) / 10 ){
        var toastPopup = $ionicPopup.alert({
          cssClass:'toastPopup',
          template: '超出贷款总额'
        });
        $timeout(function() {
          toastPopup.close();
        }, 1000);
      }

      dkys = dknx * 12;

      switch(hkfs){
        case '等额本息':
          yjhk = Math.round(((dkze*10000*(dkll*0.01/12)*Math.pow((1+dkll*0.01/12),dkys))/(Math.pow((1+dkll*0.01/12),dkys)-1))*100)/100;
          hkze = Math.round(yjhk * dkys*100)/100;
          zflx = Math.round((hkze - dkze*10000)*100)/100;
          hk = '月均还款';
          break;
        case '等额本金':
          var monthBJ = dkze*10000/(dknx * 12);
          var monthBX = dkze*10000*dkll*0.01/12;
          syhk = Math.round((monthBJ + monthBX)*100)/100;
          yjhk = syhk;  //在等额本息方式下为月均还款，在等额本金下为首月还款
          zflx = Math.round((dkze*10000 * dkll*0.01/12 * ( dkys + 1 )/2)*100)/100;
          hkze = Math.round((dkze*10000 + zflx)*100)/100;
          hk = '首月还款';
          break;
      }

      return {
        hkze:hkze,
        dkys:dkys,
        zflx:zflx,
        yjhk:yjhk,
        hk:hk
      };
    }

    //$scope.hkfs = '等额本息';
    $scope.hkfsArray = [{id:1,name:'等额本息'},{id:2,name:'等额本金'}]
    $scope.hkfs = '等额本息';
    $scope.hk = '月均还款';

    $scope.sfblArray = [
      {id:1,name:'1成'},
      {id:2,name:'2成'},
      {id:3,name:'3成'},
      {id:4,name:'4成'},
      {id:5,name:'5成'},
      {id:6,name:'6成'},
      {id:7,name:'7成'},
      {id:8,name:'8成'},
      {id:9,name:'9成'},
      {id:10,name:'10成'}
    ];

    $scope.dknxArray = [
      {id:1,name:'1年'},
      {id:2,name:'2年'},
      {id:3,name:'3年'},
      {id:4,name:'4年'},
      {id:5,name:'5年'},
      {id:6,name:'6年'},
      {id:7,name:'7年'},
      {id:8,name:'8年'},
      {id:9,name:'9年'},
      {id:10,name:'10年'},
      {id:11,name:'11年'},
      {id:12,name:'12年'},
      {id:13,name:'13年'},
      {id:14,name:'14年'},
      {id:15,name:'15年'},
      {id:16,name:'16年'},
      {id:17,name:'17年'},
      {id:18,name:'18年'},
      {id:19,name:'19年'},
      {id:20,name:'20年'},
      {id:21,name:'21年'},
      {id:22,name:'22年'},
      {id:23,name:'23年'},
      {id:24,name:'24年'},
      {id:25,name:'25年'},
      {id:26,name:'26年'},
      {id:27,name:'27年'},
      {id:28,name:'28年'},
      {id:29,name:'29年'},
      {id:30,name:'30年'},
    ];

    //公积金贷款利率
    $scope.gjjDkllArray = [
      {id:1,ll:2.75,minYear:0,maxYear:5,name:"2015年月10月24日基准利率(2.75%)"},
      {id:2,ll:3.25,minYear:5,maxYear:30,name:"2015年月10月24日基准利率(3.25%)"}
    ];

    //商业贷款基准利率
    $scope.syjzllArray = [
      {id:1,ll:4.35,minYear:0,maxYear:1,name:"2015年10月24日基准利率(4.35%)",label:'一年以下'},
      {id:2,ll:4.75,minYear:1,maxYear:5,name:"2015年10月24日基准利率(4.75%)",label:'一至五年'},
      {id:3,ll:4.90,minYear:5,maxYear:30,name:"2015年10月24日基准利率(4.9%)",label:'五年以上'}
    ];

    //商业贷款利率折扣
    $scope.sydkllArray = [
      {id:1,llzk:1.00,name:"2015年10月24日基准利率(4.9%)"},
      {id:2,llzk:0.70,name:"2015年10月24日利率下限（7折）"},
      {id:3,llzk:0.85,name:"2015年10月24日利率下限（85折）"},
      {id:4,llzk:0.88,name:"2015年10月24日利率下限（88折）"},
      {id:5,llzk:0.90,name:"2015年10月24日利率下限（9折）"},
      {id:6,llzk:1.10,name:"2015年10月24日利率下限（1.1倍）"}
    ];

    //初始化
    $scope.fjze = 100;
    $scope.sfbl = 3;
    $scope.dknx = 20;

    //组合贷款-公积金贷款额度
    $scope.gjjdked = 30;
    //组合贷款-商业贷款额度
    $scope.sydked = 40;

    if(!$scope.dkll){
      $scope.syjzllArray.forEach(function(syDkll){
        if($scope.dknx > syDkll.minYear && $scope.dknx <= syDkll.maxYear ){
          $scope.dkll = syDkll.ll;
          $scope.dkllName = syDkll.name;
        }
      });
    }

    $scope.active_content = 'sydk';
    $rootScope.active_content = 'sydk';
    $scope.setActiveContent = function(active_content){
      $scope.active_content = active_content;
      $rootScope.active_content = active_content;

      switch($rootScope.active_content){
        case 'gjjdk':
          $scope.gjjDkllArray.forEach(function(gjjDkll){
            //console.log(gjjDkll);
            if($scope.dknx >= gjjDkll.minYear && $scope.dknx <= gjjDkll.maxYear ){
              $scope.dkll = gjjDkll.ll;
              $scope.dkllName = gjjDkll.name;
            }
          });
          break;
        case 'sydk':
          $scope.syjzllArray.forEach(function(syDkll){
            if($scope.dknx > syDkll.minYear && $scope.dknx <= syDkll.maxYear ){
              $scope.dkll = syDkll.ll;
              $scope.dkllName = syDkll.name;
            }
          });
          break;
        case 'zhdk':
          //获取公积金贷款利率
          $scope.gjjDkllArray.forEach(function(gjjDkll){
            //console.log(gjjDkll);
            if($scope.dknx >= gjjDkll.minYear && $scope.dknx <= gjjDkll.maxYear ){
              $scope.gjjDkllZh = gjjDkll.ll;
            }
          });
          //获取商业贷款利率
          $scope.syjzllArray.forEach(function(syDkll){
            if($scope.dknx > syDkll.minYear && $scope.dknx <= syDkll.maxYear ){
              $scope.syDkllZh = syDkll.ll;
              $scope.dkllName = syDkll.name;
            }
          });


          //watch组合贷款额度
          //$scope.$watch('gjjdked + sydked', function(){
          //  $scope.gjjdked = $scope.dkze - $scope.sydked;
          //  $scope.sydked = $scope.dkze - $scope.gjjdked;
          //});



          break;
      }

    }




    //首付比例
    $ionicModal.fromTemplateUrl('sfbl.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.sfblModal = modal;
    })
    $scope.openSfblModal = function() {
      $scope.sfblModal.show();
    }
    $scope.closeSfblModal = function() {
      return $scope.sfblModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.sfblModal.remove();
    });

    $scope.selectSfbl = function(sfblId){
      $scope.sfbl = parseInt(sfblId);
      $scope.closeSfblModal();
    }

    //贷款年限
    $ionicModal.fromTemplateUrl('dknx.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.dknxModal = modal;
    })
    $scope.openDknxModal = function() {
      $scope.dknxModal.show();
    }
    $scope.closeDknxModal = function() {
      return $scope.dknxModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.dknxModal.remove();
    });

    $scope.selectDknx = function(dknxId){
      $scope.dknx = parseInt(dknxId);
      //利率确定
      switch($rootScope.active_content){
        case 'gjjdk':
          //console.log($rootScope.active_content);
          $scope.gjjDkllArray.forEach(function(gjjDkll){
            if($scope.dknx > gjjDkll.minYear && $scope.dknx <= gjjDkll.maxYear ){
              $scope.dkll = gjjDkll.ll;
              $scope.dkllName = gjjDkll.name;
            }
          });
          break;
        case 'sydk':
          //console.log($rootScope.active_content);
          $scope.syjzllArray.forEach(function(syDkll){
            if($scope.dknx > syDkll.minYear && $scope.dknx <= syDkll.maxYear ){
              $scope.dkll = syDkll.ll;
              $scope.dkllName = syDkll.name;
            }
          });
          break;
        case 'zhdk':
          $scope.syjzllArray.forEach(function(syDkll){
            if($scope.dknx > syDkll.minYear && $scope.dknx <= syDkll.maxYear ){
              $scope.dkll = syDkll.ll;
              $scope.dkllName = syDkll.name;
            }
          });
          break;
      }
      $scope.closeDknxModal();
    }


    //商业贷款利率
    $ionicModal.fromTemplateUrl('sydkllModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.sydkllModal = modal;
    })
    $scope.openSydkllModal = function() {
      $scope.sydkllModal.show();
    }
    $scope.closeSydkllModal = function() {
      return $scope.sydkllModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.sydkllModal.remove();
    });

    $scope.selectSydkll = function(sydkllId){
      $scope.sydkllId = parseInt(sydkllId);
      //利率确定
      $scope.sydkzk = $scope.sydkllArray[$scope.sydkllId - 1].llzk;
      $scope.dkllName = $scope.sydkllArray[$scope.sydkllId - 1].name;

      $scope.closeSydkllModal();
    }

    //组合贷款利率
    $scope.$watch('dknx',function(){
      $scope.gjjDkllArray.forEach(function(gjjDkll){
        //console.log(gjjDkll);
        if($scope.dknx > gjjDkll.minYear && $scope.dknx <= gjjDkll.maxYear ){
          $scope.gjjDkllZh = gjjDkll.ll;
        }
      });
      //获取商业贷款利率
      $scope.syjzllArray.forEach(function(syDkll){
        if($scope.dknx > syDkll.minYear && $scope.dknx <= syDkll.maxYear ){
          $scope.syDkllZh = syDkll.ll;
          $scope.dkllName = syDkll.name;
        }
      });
    });



    var getDkze = function(){
      $scope.dkze = Math.round($scope.fjze * (1 - $scope.sfbl/10)*100)/100;
    }
    $scope.$watch('fjze + sfbl', getDkze);

    //还款总额
    $scope.hkze = 0.00;
    //贷款月数
    $scope.dkys = 0;
    //支付利息
    $scope.zflx = 0.00;
    //月均还款
    $scope.yjhk = 0.00;

    //商业贷款折扣初始化
    if(!$scope.sydkzk){
      $scope.sydkzk = 1.00;
    }


    //watch组合贷款额度
    $scope.$watch('gjjdked + sydked + dkze', function(){
      $scope.dkze = Math.round($scope.fjze * (1 - $scope.sfbl/10)*100)/100;
      $scope.sydked = $scope.dkze - $scope.gjjdked;
    });

    $scope.$watch('sydked', function(){
      if($scope.sydked < 0){
        $scope.sydked = 0;
      }
      if($scope.sydked > $scope.dkze){
        var toastPopup = $ionicPopup.alert({
          cssClass:'toastPopup',
          template: '超出贷款总额'
        });
        $timeout(function() {
          toastPopup.close();
        }, 1000);
        $scope.sydked = $scope.dkze;
      }else{
        $scope.gjjdked = $scope.dkze - $scope.sydked;
      }
    });

    $scope.$watch('gjjdked', function(){
      if($scope.gjjdked < 0){
        $scope.gjjdked = 0;
      }
      if($scope.gjjdked > $scope.dkze){
        var toastPopup = $ionicPopup.alert({
          cssClass:'toastPopup',
          template: '超出贷款总额'
        });
        $timeout(function() {
          toastPopup.close();
        }, 1000);
        $scope.gjjdked = $scope.dkze;
      }else{
        $scope.sydked = $scope.dkze - $scope.gjjdked;
      }
    });


    $scope.gjjJs = function(){
      var result = $scope.js($scope.hkfs,$scope.fjze,$scope.sfbl,$scope.dkze,$scope.dknx,$scope.dkll);
      $scope.hkze = result.hkze;
      $scope.dkys = result.dkys;
      $scope.zflx = result.zflx;
      $scope.yjhk = result.yjhk;
    };


    $scope.sydkJs = function(){
      var result = $scope.js($scope.hkfs,$scope.fjze,$scope.sfbl,$scope.dkze,$scope.dknx,$scope.dkll * $scope.sydkzk);
      $scope.hkze = result.hkze;
      $scope.dkys = result.dkys;
      $scope.zflx = result.zflx;
      $scope.yjhk = result.yjhk;
      $scope.hk = result.hk;
    };


    $scope.zhdkJs = function(){
      //console.log("还款方式：" + $scope.hkfs);
      //console.log("房价总额：" + $scope.fjze);
      //console.log("首付比例：" + $scope.sfbl);
      //console.log("贷款总额：" + $scope.dkze);
      //console.log("公积金贷款：" + $scope.gjjdked);
      //console.log("商业贷款：" + $scope.sydked);
      //console.log("贷款年限：" + $scope.dknx);
      //console.log("公积金利率：" + $scope.gjjDkllZh);
      //console.log("商业利率：" + $scope.syDkllZh);
      //console.log("商业利率折扣：" + $scope.sydkzk);
      //console.log("商业贷款利率说明：" + $scope.dkllName);

      var gjjResult = $scope.js($scope.hkfs,$scope.fjze,$scope.sfbl,$scope.gjjdked,$scope.dknx,$scope.gjjDkllZh);
      var SyResult =  $scope.js($scope.hkfs,$scope.fjze,$scope.sfbl,$scope.sydked,$scope.dknx,$scope.syDkllZh * $scope.sydkzk)

      $scope.hkze = Math.round((gjjResult.hkze + SyResult.hkze)*100)/100;
      $scope.dkys = gjjResult.dkys;
      $scope.zflx = Math.round((gjjResult.zflx + SyResult.zflx)*100)/100;
      $scope.yjhk = Math.round((gjjResult.yjhk + SyResult.yjhk)*100)/100;
      $scope.hk = SyResult.hk;

      //console.log(gjjResult);
      //console.log(SyResult);
      //
      //console.log("还款总额：");
      //console.log(gjjResult.hkze + SyResult.hkze);
      //
      //console.log("贷款月数：");
      //console.log(gjjResult.dkys);
      //
      //console.log("支付利息：");
      //console.log(gjjResult.zflx + SyResult.zflx);
      //
      //console.log("月均还款：");
      //console.log(gjjResult.yjhk + SyResult.yjhk);
      //
      //console.log("还款形式：");
      //console.log(SyResult.hk);

    };
})


.controller('callCtrl', function($scope, $ionicHistory, $timeout, $ionicModal, $ionicPopup, $http, $cordovaGeolocation, $rootScope){
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

    $scope.dial = function(phone){
      window.open("tel: " + phone);
    }

    $scope.sms = function(phone){
      window.open("sms: " + phone);
    }


    $scope.popupBox = function(title,text,button){
      return $ionicPopup.alert({
        title: title,
        template: text,
        okText: button
      });
    };

    $scope.jdr = {
      name:'胡景欢',
      phone:'18603045126'
    };
    $scope.jssj = {};
    $scope.isCall = false;
    $scope.cancelCar = false;
    $scope.showCar = false;
    $scope.callBtn = {
      isEnable:true,
      btnText:'马上叫车',
      isShow:true
    };

    $scope.bookLpArray = [
      {id:1,name:'都市华府'},
      {id:2,name:'东方华府'},
      {id:3,name:'水岸华庭'},
      {id:4,name:'皇庭壹号'},
      {id:5,name:'第一国际'},
      {id:6,name:'城市银座'},
      {id:7,name:'东方华府'},
      {id:8,name:'都市华府'},
      {id:9,name:'水岸华庭'},
    ];

    $scope.bookLpName = $scope.bookLpArray[0].name;
    $scope.localAddress = {
      lng:null,
      lat:null,
      address:"输入起点"
    };

    $scope.callCar = function(){
      $scope.callBtn = {
        isEnable:false,
        btnText:'正在叫车',
        isShow:true
      };

      $timeout(function() {
        $scope.isCall = false;

        $scope.jssj = {
          name:'阿克西',
          phone:'18503045129',
          carName:'丰田花冠',
          carColor:'银色',
          carNumber:'粤S 388N1'
        };

        $scope.callBtn = {
          isEnable:true,
          btnText:'取消叫车',
          isShow:false
        };

        $scope.cancelCar = true;

        $scope.showCar = true;
      }, 5000);
    }

    $scope.cancelCarHandle = function(){
      console.log('click cancel car');

      $scope.callBtn = {
        isEnable:true,
        btnText:'马上叫车',
        isShow:true
      };
      $scope.cancelCar = false;
      $scope.showCar = false;
    }


    //选择预约楼盘
    $ionicModal.fromTemplateUrl('bookLpModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.BookLpModal = modal;
    })
    $scope.openBookLpModal = function() {
      $scope.BookLpModal.show();
    }
    $scope.closeBookLpModal = function() {
      return $scope.BookLpModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.BookLpModal.remove();
    });

    $scope.selectBookLp = function(selectedLp){
      //console.log(selectedHy);
      $scope.bookLpName = selectedLp;
      return $scope.BookLpModal.hide();
    }


    $scope.testGetAddress = function(lat,lng){
      var addressUrl = "http://api.map.baidu.com/geocoder/v2/?ak=kAbQ9v46nkRPvD6WVFBIYOypIgQtdGXm&callback=JSON_CALLBACK&location="+lat+","+lng+"&output=json";
      $http.jsonp(addressUrl)
        .success(function(data){
          //console.log(data.result.formatted_address);
          //console.log(data.result.location.lng);
          //console.log(data.result.location.lat);
          //console.log(data.status);
          return data;
        })
        .error(function(error){
          return false;
        });
    }


    $scope.getPosition = function(type){
      var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false
      };

      $scope.loaded = false;
      $scope.transformOk = false;

      $cordovaGeolocation.getCurrentPosition(posOptions)
        .then(function(pos){
          $scope.lon=pos.coords.longitude;
          $scope.lat=pos.coords.latitude;
          $scope.loaded = true;

          //$scope.lon = 113.78224633708;
          //$scope.lat = 23.03936965081;

          var positionUrl = "http://api.map.baidu.com/geoconv/v1/?coords="+$scope.lon+","+$scope.lat+"&from=1&to=5&ak=kAbQ9v46nkRPvD6WVFBIYOypIgQtdGXm&callback=JSON_CALLBACK";

          $http.jsonp(positionUrl)
            .success(function(data) {
              $scope.transformOk = true;
              var loc = data.result[0];
              //console.log(loc);

              if($scope.loaded && $scope.transformOk && loc){
                var addressUrl = "http://api.map.baidu.com/geocoder/v2/?ak=kAbQ9v46nkRPvD6WVFBIYOypIgQtdGXm&callback=JSON_CALLBACK&location="+loc.y+","+loc.x+"&output=json";
                $http.jsonp(addressUrl)
                  .success(function(pos){
                    //console.log(pos.result);
                    if(pos.status == 0){
                      $scope.localAddress = {
                        lng:pos.result.location.lng,
                        lat:pos.result.location.lat,
                        address:pos.result.formatted_address
                      };
                      console.log($scope.localAddress);
                    }

                  })
                  .error(function(error){
                    $scope.popupBox('提示','无法定位您的位置','返回');
                  });
              }else{
                $scope.popupBox('提示','无法定位您的位置','返回');
              }
            })
            .error(function(){
              $scope.popupBox('提示','无法定位您的位置','返回');
            });
        },function(err){
          // console.log('定位不成功');
          $scope.popupBox('提示','无法定位您的位置','返回');
        })

    }




});




































