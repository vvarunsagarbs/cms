var app = angular.module('myWebApp',['ngMaterial']);

app.run(function($http, $rootScope, $timeout) {
  //console.log('App Starts');

  $rootScope.logoutActiveUser = function () {
    $rootScope.activeUser = '';
    window.localStorage['activeUser'] = '';
    window.location.reload();
  }

  $rootScope.setActiveSubNav = function (view) {
    //console.log('activeSubNav', view);
    $rootScope.activeSubNav = view;
  }

  $rootScope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
      //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
      var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

      var CSV = '';
      //Set Report title in first row or line

      CSV += ReportTitle + '\r\n\n';

      //This condition will generate the Label/Header
      if (ShowLabel) {
          var row = "";

          //This loop will extract the label from 1st index of on array
          for (var index in arrData[0]) {

              //Now convert each value to string and comma-seprated
              row += index + ',';
          }

          row = row.slice(0, -1);

          //append Label row with line break
          CSV += row + '\r\n';
      }

      //1st loop is to extract each row
      for (var i = 0; i < arrData.length; i++) {
          var row = "";

          //2nd loop will extract each column and convert it in string comma-seprated
          for (var index in arrData[i]) {
              row += '"' + arrData[i][index] + '",';
          }

          row.slice(0, row.length - 1);

          //add a line break after each row
          CSV += row + '\r\n';
      }

      if (CSV == '') {
          alert("Invalid data");
          return;
      }

      //Generate a file name
      var fileName = "MyReport_";
      //this will remove the blank-spaces from the title and replace it with an underscore
      fileName += ReportTitle.replace(/ /g,"_");

      //Initialize file format you want csv or xls
      var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

      // Now the little tricky part.
      // you can use either>> window.open(uri);
      // but this will not work in some browsers
      // or you will not get the correct file extension

      //this trick will generate a temp <a /> tag
      var link = document.createElement("a");
      link.href = uri;

      //set the visibility hidden so it will not effect on your web-layout
      link.style = "visibility:hidden";
      link.download = fileName + ".csv";

      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }

})

app.controller('HomeController', function($rootScope, $scope, $http, $timeout, $mdSidenav, $log) {
  //console.log('Loading Home Controller..');
  $scope.users = [{'name':'admin','password':'admin123','type':'a'},{'name':'employee','password':'employee123','type':'e'},{'name':'student','password':'student123','type':'s'},{'name':'parent','password':'parent123','type':'p'}];

  $scope.loginUser = function (loginData) {
    angular.forEach($scope.users, function(value, key) {
      // //console.log(key + ': ' + value.name+ ', ' + value.password);
      if (loginData.username == value.name ) {
        //console.log('username found');
        if (value.password == loginData.password) {
          //console.log('login success');
          $rootScope.activeUser = value;
          window.localStorage['activeUser'] = JSON.stringify($rootScope.activeUser);
          //console.log('activeUser',$rootScope.activeUser);
          window.location.href="index.php";
        }
      }
    });
  }
});

app.controller('SideBarController', function ($rootScope,$scope, $timeout, $mdSidenav, $log) {
  //console.log('Loading SideBarController');

  $scope.setActiveSubNavView = function(view) {
    //console.log('activeSubNavView',view);
    $scope.activeSubNavView = view;
    window.localStorage['activeSubNavView'] = view;
    //console.log('window.localStorage["activeSubNavView"]', window.localStorage['activeSubNavView']);
  }

  if(window.localStorage['activeSubNavView'] == undefined || window.localStorage['activeSubNavView'] == null || window.localStorage['activeSubNavView'] == '') {
    $scope.setActiveSubNavView('none');
    //console.log('reset');
    } else {
    $scope.setActiveSubNavView(window.localStorage['activeSubNavView']);
    //console.log('sourced');
  }

  $scope.administrationSubmenu = [{'icon':'','link':'settings.php','title':'Settings'},{'icon':'','link':'','title':'Hostel'},{'icon':'','link':'','title':'Human Resource'},{'icon':'','link':'','title':'Inventory'},{'icon':'','link':'','title':'Online Payment'},{'icon':'','link':'','title':'Reminders'},{'icon':'','link':'','title':'Finance'},{'icon':'','link':'','title':'Transport'},{'icon':'','link':'','title':'User'}];
  $scope.academicsSubmenu = [{'icon':'','link':'','title':'Applicant Registration'},{'icon':'','link':'','title':'Attendence'},{'icon':'','link':'','title':'Batch Summary'},{'icon':'','link':'','title':'Calender'},{'icon':'','link':'','title':'Discipline'},{'icon':'','link':'','title':'Examination'},{'icon':'','link':'','title':'Leaves'},{'icon':'','link':'','title':'Library'},{'icon':'','link':'','title':'My Profile'},{'icon':'','link':'','title':'Placement'},{'icon':'','link':'','title':'Remarks'},{'icon':'','link':'','title':'Student Records'},{'icon':'','link':'','title':'Students'},{'icon':'','link':'','title':'Timetable'},{'icon':'','link':'','title':'Transfer Certificate'}];
  $scope.dataReportsSubmenu = [{'icon':'','link':'','title':'Custom Imports'},{'icon':'','link':'','title':'Custom Reports'},{'icon':'','link':'','title':'Data Exports'},{'icon':'','link':'','title':'Data Management'},{'icon':'','link':'','title':'Audit'},{'icon':'','link':'','title':'Reports'}];
  $scope.collabrationSubmenu = [{'icon':'','link':'','title':'Alumni'},{'icon':'','link':'','title':'Blog'},{'icon':'','link':'','title':'Collaborate'},{'icon':'','link':'','title':'Discussion'},{'icon':'','link':'','title':'Documents'},{'icon':'','link':'','title':'E-mail'},{'icon':'','link':'','title':'Event Creation'},{'icon':'','link':'','title':'Forms'},{'icon':'','link':'','title':'Gallery'},{'icon':'','link':'','title':'Google Docs'},{'icon':'','link':'','title':'News'},{'icon':'','link':'','title':'Poll'},{'icon':'','link':'','title':'Tasks'}];

});

app.controller('DashboardController', function ($rootScope,$scope, $timeout, $mdSidenav, $log) {
  //console.log('Loading DashboardController');

  if (window.localStorage['activeUser'] == null || window.localStorage['activeUser'] == undefined || window.localStorage['activeUser']== ""){
    window.location.href = "login.php";
  } else {
    $rootScope.activeUser = JSON.parse(window.localStorage['activeUser']);
    //console.log('activeUser',$rootScope.activeUser);
  }

  $scope.aDashCardsLeft = [{"title":"Discussions","content":"No Data to Display","active":"true"},{"title":"Finance","content":"No Data to Display","active":"true"},{"title":"Timetable","content":"No Data to Display","active":"true"}];
  $scope.aDashCardsMiddle = [{"title":"Birthdays","content":"No Data to Display","active":"true"},{"title":"Employees on Leave","content":"No Data to Display","active":"true"},{"title":"News","content":"No Data to Display","active":"true"},{"title":"Blogs","content":"No Data to Display","active":"true"},{"title":"Leave Applications","content":"No Data to Display","active":"true"}];
  $scope.aDashCardsRight = [{"title":"Online Meetings","content":"Meeting with Dean on July 25,2017 @ 5:00pm","active":"true"},{"title":"Events","content":"No Data to Display","active":"true"},{"title":"Placements","content":"No Data to Display","active":"true"}];

  $scope.sDashCardsLeft = [{"title":"Examinations","content":"No Data to Display","active":"true"},{"title":"Timetable","content":"No Data to Display","active":"true"}];
  $scope.sDashCardsMiddle = [{"title":"News","content":"No Data to Display","active":"true"},{"title":"Fees Due","content":"No Data to Display","active":"true"}];
  $scope.sDashCardsRight = [{"title":"Events","content":"No Data to Display","active":"true"}];

  $scope.pDashCardsLeft = [{"title":"Examinations","content":"No Data to Display","active":"true"},{"title":"Timetable","content":"No Data to Display","active":"true"}];
  $scope.pDashCardsMiddle = [{"title":"News","content":"No Data to Display","active":"true"},{"title":"Fees Due","content":"No Data to Display","active":"true"}];
  $scope.pDashCardsRight = [{"title":"Events","content":"No Data to Display","active":"true"}];

  $scope.eDashCardsLeft = [{"title":"Leave Applications","content":"No Data to Display","active":"true"},{"title":"News","content":"No Data to Display","active":"true"}];
  $scope.eDashCardsMiddle = [{"title":"Employees On Leave","content":"No Data to Display","active":"true"},{"title":"Events","content":"No Data to Display","active":"true"}];
  $scope.eDashCardsRight = [{"title":"Timetable","content":"No Data to Display","active":"true"}];
});

app.controller('SettingsController', function ($rootScope,$scope, $timeout, $mdSidenav, $log) {
  //console.log('Loading SettingsController');

  if (window.localStorage['activeUser'] == null || window.localStorage['activeUser'] == undefined || window.localStorage['activeUser']== ""){
    window.location.href = "login.php";
  } else {
    $rootScope.activeUser = JSON.parse(window.localStorage['activeUser']);
    //console.log('activeUser',$rootScope.activeUser);
  }

  $scope.moduleSubMenu = [{"title":"Course/ Batch","tag":"Add a new course or batch for this academic year","link":"mcb"},{"title":"Subjects","tag":"Manage subjects coresponding to different courses","link":"ms"},{"title":"Student Category","tag":"Add Student Category","link":"msc"},{"title":"Additional Admission Details","tag":"Set Some Additional details for admission","link":"aaad"},{"title":"SMS Module","tag":"Enable/disable SMS settings","link":"sms"}];

  $scope.setActiveSettingsView = function (view) {
    $scope.activeSettingsView = view;
    //console.log('activeSettingsView',view);
    window.localStorage['activeSettingsView'] = view;
  }

  if (window.localStorage['activeSettingsView'] == null || window.localStorage['activeSettingsView'] == undefined || window.localStorage['activeSettingsView']== ""){
    $scope.setActiveSettingsView('none');
  } else {
    $scope.setActiveSettingsView(window.localStorage['activeSettingsView']);
  }

  $scope.studentCategory = [{'name':'Staff child'},{'name':'Financially Weak student'},{'name':'Sibling In Institution'}];
  $scope.courseBatches = [{
                          	"sNo": "1",
                          	"name": "Diploma in Theatre Semester 1(GPA)",
                          	"code": "DT Sem1",
                          	"batch": "0",
                          	"student":"0"
                          }, {
                          	"sNo": "2",
                          	"name": "Diploma in Theatre Semester 2(GPA)",
                          	"code": "DT Sem2",
                          	"batch": "0",
                          	"student":"0"
                          }, {
                          	"sNo": "3",
                          	"name": "Diploma in Theatre Semester 3(GPA)",
                          	"code": "DT Sem3",
                          	"batch": "0",
                          	"student":"0"
                          }, {
                          	"sNo": "4",
                          	"name": "Diploma in Theatre Semester 4(GPA)",
                          	"code": "DT Sem4",
                          	"batch": "0",
                          	"student":"0"
                          }, {
                          	"sNo": "5",
                          	"name": "Diploma in Theatre Semester 5(GPA)",
                          	"code": "DT Sem5",
                          	"batch": "0",
                          	"student":"0"
                          }, {
                          	"sNo": "6",
                          	"name": "Diploma in Theatre Semester 6(GPA)",
                          	"code": "DT Sem6",
                          	"batch": "1",
                          	"student":"5"
                          }, {
                          	"sNo": "7",
                          	"name": "Grade 1(Normal)",
                          	"code": "G1",
                          	"batch": "1",
                          	"student":"11"
                          }, {
                          	"sNo": "8",
                          	"name": "Grade 2(GPA)",
                          	"code": "G2",
                          	"batch": "1",
                          	"student":"10"
                          }, {
                          	"sNo": "9",
                          	"name": "Grade 3(CWA)",
                          	"code": "G3",
                          	"batch": "1",
                          	"student":"10"
                          }, {
                          	"sNo": "10",
                          	"name": "Grade 4(CSE)",
                          	"code": "G4",
                          	"batch": "1",
                          	"student":"10"
                          }, {
                          	"sNo": "11",
                          	"name": "Grade 5(CCE)",
                          	"code": "G5",
                          	"batch": "1",
                          	"student":"10"
                          }];

});

app.controller('ModuleController', function ($rootScope, $scope, $timeout) {
  //console.log('Loading ModuleController...');

  $scope.administrationCards = [{'icon':'','link':'settings.php','title':'Settings'},{'icon':'','link':'','title':'Hostel'},{'icon':'','link':'','title':'Human Resource'},{'icon':'','link':'','title':'Inventory'},{'icon':'','link':'','title':'Online Payment'},{'icon':'','link':'','title':'Reminders'},{'icon':'','link':'','title':'Finance'},{'icon':'','link':'','title':'Transport'},{'icon':'','link':'','title':'User'}];
  $scope.academicsCards = [{'icon':'','link':'','title':'Applicant Registration'},{'icon':'','link':'','title':'Attendence'},{'icon':'','link':'','title':'Batch Summary'},{'icon':'','link':'','title':'Calender'},{'icon':'','link':'','title':'Discipline'},{'icon':'','link':'','title':'Examination'},{'icon':'','link':'','title':'Leaves'},{'icon':'','link':'','title':'Library'},{'icon':'','link':'','title':'My Profile'},{'icon':'','link':'','title':'Placement'},{'icon':'','link':'','title':'Remarks'},{'icon':'','link':'','title':'Student Records'},{'icon':'','link':'','title':'Students'},{'icon':'','link':'','title':'Timetable'},{'icon':'','link':'','title':'Transfer Certificate'}];
  $scope.dataReportsCards = [{'icon':'','link':'','title':'Custom Imports'},{'icon':'','link':'','title':'Custom Reports'},{'icon':'','link':'','title':'Data Exports'},{'icon':'','link':'','title':'Data Management'},{'icon':'','link':'','title':'Audit'},{'icon':'','link':'','title':'Reports'}];
  $scope.collabrationCards = [{'icon':'','link':'','title':'Alumni'},{'icon':'','link':'','title':'Blog'},{'icon':'','link':'','title':'Collaborate'},{'icon':'','link':'','title':'Discussion'},{'icon':'','link':'','title':'Documents'},{'icon':'','link':'','title':'E-mail'},{'icon':'','link':'','title':'Event Creation'},{'icon':'','link':'','title':'Forms'},{'icon':'','link':'','title':'Gallery'},{'icon':'','link':'','title':'Google Docs'},{'icon':'','link':'','title':'News'},{'icon':'','link':'','title':'Poll'},{'icon':'','link':'','title':'Tasks'}];

  $scope.setActiveModulePage = function (view) {
    $scope.activeModulesView = view;
    //console.log('activeModulesView',view);
    window.localStorage['activeModulesView'] = view;
  }
  if (window.localStorage['activeModulesView'] == null || window.localStorage['activeModulesView'] == undefined || window.localStorage['activeModulesView']== ""){
    $scope.setActiveModulePage('none');
  } else {
    $scope.setActiveModulePage(window.localStorage['activeModulesView']);
  }
})
