angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services','ionic-datepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider, ionicDatePickerProvider) {

  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('bottom');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(geo|mailto|tel|maps):/)

  //日期选择器
  var datePickerObj = {
    inputDate: new Date(),
    setLabel: '确定',
    todayLabel: '今天',
    closeLabel: '关闭',
    mondayFirst: false,
    weeksList: ["日", "一", "二", "三", "四", "五", "六"],
    monthsList: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    templateType: 'popup',
    from: new Date(2016, 1, 1),
    to: new Date(2030, 12, 31),
    showTodayButton: true,
    dateFormat: 'yyyy - MM - dd',
    closeOnSelect: false,
    disableWeekdays: [],
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.dd', {
    url: '/dd',
    views: {
      'tab-dd': {
        templateUrl: 'templates/tab-dd.html',
        controller: 'ChatsCtrl'
      }
    }
  })
  //关注
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })



  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.test',{
    url:'/test',
    views: {
      'tab-dd':{
        templateUrl: 'templates/test.html',
        controller:'testCtrl',
      }
    }
  })

  .state('tab.house',{
    url:'/house',
    views: {
      'tab-dd':{
        templateUrl: 'templates/house.html',
        controller:'houseCtrl',
      }
    }
  })

  //.state('tab.houseDetail',{
  //  url:'/houseDetail',
  //  views: {
  //    'tab-dd':{
  //      templateUrl: 'templates/houseDetail.html',
  //      controller:'houseDetailCtrl',
  //    }
  //  }
  //})

  .state('tab.login', {
    url: '/account/login',
    views: {
      'tab-account': {
        templateUrl: 'templates/login2.html',
        controller: 'LoginCtrl'
      }
    }
  });

  $stateProvider
    .state('houseTab', {
      url: '/houseTab',
      abstract: true,
      templateUrl: 'templates/houseTabs.html'
    })
    .state('houseDetail',{
      url:'/houseDetail',
          templateUrl: 'templates/houseDetail.html',
          controller:'houseDetailCtrl'
    })
    .state('houseSjt',{
      url:'/houseSjt',
      templateUrl: 'templates/houseSjt.html',
      controller:'houseSjtCtrl'
    })
    .state('houseZsl',{
      url:'/houseZsl',
      templateUrl: 'templates/houseZsl.html',
      controller:'houseZslCtrl'
    })
    .state('houseHx',{
      url:'houseHx/:hxId',
      templateUrl: 'templates/houseHx.html',
      controller: 'houseHxCtrl'
    })
    .state('houseLd',{
      url:'/houseLd',
      templateUrl: 'templates/houseLd.html',
      controller:'houseLdCtrl'
    })
    .state('houseZb',{
      url:'/houseZb',
      templateUrl: 'templates/houseZb.html',
      controller:'houseZbCtrl'
    })
    .state('login',{
      url:'/login',
      templateUrl: 'templates/login.html',
      controller:'LoginCtrl',
    })
    .state('hqyh',{
      url:'/hqyh',
      templateUrl: 'templates/hqyh.html',
      controller:'hqyhCtrl',
    });

  $stateProvider
    .state('memberInfo',{
      url:'/memberInfo',
      templateUrl: 'templates/memberInfo.html',
      controller:'memberInfoCtrl'
    })
    .state('memberJcq',{
      url:'/memberJcq',
      templateUrl: 'templates/memberJcq.html',
      controller:'memberJcqCtrl'
    })
    .state('memberRecommend',{
      url:'/memberRecommend',
      templateUrl: 'templates/memberRecommend.html',
      controller:'memberRecommendCtrl'
    })
    .state('memberFeedback',{
      url:'/memberFeedback',
      templateUrl: 'templates/memberFeedback.html',
      controller:'memberFeedbackCtrl'
    })
    .state('calculator',{
      url:'/calculator',
      templateUrl: 'templates/calculator.html',
      controller:'calculatorCtrl'
    })
    .state('call',{
      url:'/call',
      templateUrl: 'templates/call.html',
      controller:'callCtrl'
    })

    .state('pk', {
      url: '/pk?param',
      templateUrl: 'templates/pk.html',
      controller: 'pkCtrl'
    })




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
