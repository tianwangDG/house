angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])

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

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

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

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
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



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
