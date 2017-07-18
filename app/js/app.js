var app = angular.module('myWebApp',['ngMaterial']);

app.run(function($http, $rootScope, $timeout) {
  console.log('App Starts');

  $rootScope.logoutActiveUser = function () {
    $rootScope.activeUser = '';
    window.localStorage['activeUser'] = '';
    window.location.reload();
  }

  $rootScope.setActiveSubNav = function (view) {
    console.log('activeSubNav', view);
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
  console.log('Loading Home Controller..');
  $scope.users = [{'name':'admin','password':'admin123','type':'a'},{'name':'employee','password':'employee123','type':'e'},{'name':'student','password':'student123','type':'s'},{'name':'parent','password':'parent123','type':'p'}];

  $scope.loginUser = function (loginData) {
    angular.forEach($scope.users, function(value, key) {
      // console.log(key + ': ' + value.name+ ', ' + value.password);
      if (loginData.username == value.name ) {
        console.log('username found');
        if (value.password == loginData.password) {
          console.log('login success');
          $rootScope.activeUser = value;
          window.localStorage['activeUser'] = JSON.stringify($rootScope.activeUser);
          console.log('activeUser',$rootScope.activeUser);
          window.location.href="index.php";
        }
      }
    });
  }
});

app.controller('SideBarController', function ($rootScope,$scope, $timeout, $mdSidenav, $log) {
  console.log('Loading SideBarController');

  $scope.setActiveSubNavView = function(view) {
    console.log('activeSubNavView',view);
    $scope.activeSubNavView = view;
    window.localStorage['activeSubNavView'] = view;
    console.log('window.localStorage["activeSubNavView"]', window.localStorage['activeSubNavView']);
  }

  if(window.localStorage['activeSubNavView'] == undefined || window.localStorage['activeSubNavView'] == null || window.localStorage['activeSubNavView'] == '') {
    $scope.setActiveSubNavView('none');
    console.log('reset');
    } else {
    $scope.setActiveSubNavView(window.localStorage['activeSubNavView']);
    console.log('sourced');
  }

  $scope.administrationSubmenu = [{'icon':'','controller':'SettingsController','link':'settings.php','title':'Settings'},{'icon':'','controller':'HostelController','link':'hostel.php','title':'Hostel'},{'icon':'','controller':'HRController','link':'hr.php','title':'Human Resource'},{'icon':'','controller':'OnlinePaymentController','link':'onlinePayment.php','title':'Online Payment'},{'icon':'','controller':'HomeController','link':'','title':'Inventory'},{'icon':'','controller':'HomeController','link':'','title':'Reminders'},{'icon':'','controller':'HomeController','link':'','title':'Finance'},{'icon':'','controller':'HomeController','link':'','title':'Transport'},{'icon':'','controller':'HomeController','link':'','title':'User'}];
  $scope.academicsSubmenu = [{'icon':'','controller':'HomeController','link':'','title':'Applicant Registration'},{'icon':'','controller':'HomeController','link':'','title':'Attendence'},{'icon':'','controller':'HomeController','link':'','title':'Batch Summary'},{'icon':'','controller':'HomeController','link':'','title':'Calender'},{'icon':'','controller':'HomeController','link':'','title':'Discipline'},{'icon':'','controller':'HomeController','link':'','title':'Examination'},{'icon':'','controller':'HomeController','link':'','title':'Leaves'},{'icon':'','controller':'HomeController','link':'','title':'Library'},{'icon':'','controller':'HomeController','link':'','title':'My Profile'},{'icon':'','controller':'HomeController','link':'','title':'Placement'},{'icon':'','controller':'HomeController','link':'','title':'Remarks'},{'icon':'','controller':'HomeController','link':'','title':'Student Records'},{'icon':'','controller':'HomeController','link':'','title':'Students'},{'icon':'','controller':'HomeController','link':'','title':'Timetable'},{'icon':'','controller':'HomeController','link':'','title':'Transfer Certificate'}];
  $scope.dataReportsSubmenu = [{'icon':'','controller':'HomeController','link':'','title':'Custom Imports'},{'icon':'','controller':'HomeController','link':'','title':'Custom Reports'},{'icon':'','controller':'HomeController','link':'','title':'Data Exports'},{'icon':'','controller':'HomeController','link':'','title':'Data Management'},{'icon':'','controller':'HomeController','link':'','title':'Audit'},{'icon':'','controller':'HomeController','link':'','title':'Reports'}];
  $scope.collabrationSubmenu = [{'icon':'','controller':'HomeController','link':'','title':'Alumni'},{'icon':'','controller':'HomeController','link':'','title':'Blog'},{'icon':'','controller':'HomeController','link':'','title':'Collaborate'},{'icon':'','controller':'HomeController','link':'','title':'Discussion'},{'icon':'','controller':'HomeController','link':'','title':'Documents'},{'icon':'','controller':'HomeController','link':'','title':'E-mail'},{'icon':'','controller':'HomeController','link':'','title':'Event Creation'},{'icon':'','controller':'HomeController','link':'','title':'Forms'},{'icon':'','controller':'HomeController','link':'','title':'Gallery'},{'icon':'','controller':'HomeController','link':'','title':'Google Docs'},{'icon':'','controller':'HomeController','link':'','title':'News'},{'icon':'','controller':'HomeController','link':'','title':'Poll'},{'icon':'','controller':'HomeController','link':'','title':'Tasks'}];

});

app.controller('DashboardController', function ($rootScope,$scope, $timeout, $mdSidenav, $log) {
  console.log('Loading DashboardController');

  if (window.localStorage['activeUser'] == null || window.localStorage['activeUser'] == undefined || window.localStorage['activeUser']== ""){
    window.location.href = "login.php";
  } else {
    $rootScope.activeUser = JSON.parse(window.localStorage['activeUser']);
    console.log('activeUser',$rootScope.activeUser);
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

app.controller('ModuleController', function ($rootScope, $scope, $timeout) {
  console.log('Loading ModuleController...');

  $scope.administrationCards = [{'icon':'','controller':'HomeController','link':'settings.php','title':'Settings'},{'icon':'','controller':'HostelController','link':'hostel.php','title':'Hostel'},{'icon':'','controller':'HRController','link':'hr.php','title':'Human Resource'},{'icon':'','controller':'OnlinePaymentController','link':'onlinePayment.php','title':'Online Payment'},{'icon':'','controller':'HomeController','link':'','title':'Inventory'},{'icon':'','controller':'HomeController','link':'','title':'Reminders'},{'icon':'','controller':'HomeController','link':'','title':'Finance'},{'icon':'','controller':'HomeController','link':'','title':'Transport'},{'icon':'','controller':'HomeController','link':'','title':'User'}];

  $scope.academicsCards = [{'icon':'','controller':'HomeController','link':'','title':'Applicant Registration'},{'icon':'','controller':'HomeController','link':'','title':'Attendence'},{'icon':'','controller':'HomeController','link':'','title':'Batch Summary'},{'icon':'','controller':'HomeController','link':'','title':'Calender'},{'icon':'','controller':'HomeController','link':'','title':'Discipline'},{'icon':'','controller':'HomeController','link':'','title':'Examination'},{'icon':'','controller':'HomeController','link':'','title':'Leaves'},{'icon':'','controller':'HomeController','link':'','title':'Library'},{'icon':'','controller':'HomeController','link':'','title':'My Profile'},{'icon':'','controller':'HomeController','link':'','title':'Placement'},{'icon':'','controller':'HomeController','link':'','title':'Remarks'},{'icon':'','controller':'HomeController','link':'','title':'Student Records'},{'icon':'','controller':'HomeController','link':'','title':'Students'},{'icon':'','controller':'HomeController','link':'','title':'Timetable'},{'icon':'','controller':'HomeController','link':'','title':'Transfer Certificate'}];

  $scope.dataReportsCards = [{'icon':'','controller':'HomeController','link':'','title':'Custom Imports'},{'icon':'','controller':'HomeController','link':'','title':'Custom Reports'},{'icon':'','controller':'HomeController','link':'','title':'Data Exports'},{'icon':'','controller':'HomeController','link':'','title':'Data Management'},{'icon':'','controller':'HomeController','link':'','title':'Audit'},{'icon':'','controller':'HomeController','link':'','title':'Reports'}];

  $scope.collabrationCards = [{'icon':'','controller':'HomeController','link':'','title':'Alumni'},{'icon':'','controller':'HomeController','link':'','title':'Blog'},{'icon':'','controller':'HomeController','link':'','title':'Collaborate'},{'icon':'','controller':'HomeController','link':'','title':'Discussion'},{'icon':'','controller':'HomeController','link':'','title':'Documents'},{'icon':'','controller':'HomeController','link':'','title':'E-mail'},{'icon':'','controller':'HomeController','link':'','title':'Event Creation'},{'icon':'','controller':'HomeController','link':'','title':'Forms'},{'icon':'','controller':'HomeController','link':'','title':'Gallery'},{'icon':'','controller':'HomeController','link':'','title':'Google Docs'},{'icon':'','controller':'HomeController','link':'','title':'News'},{'icon':'','controller':'HomeController','link':'','title':'Poll'},{'icon':'','controller':'HomeController','link':'','title':'Tasks'}];

  $scope.setActiveModulePage = function (view) {
    $scope.activeModulesView = view;
    console.log('activeModulesView',view);
    window.localStorage['activeModulesView'] = view;
  }
  if (window.localStorage['activeModulesView'] == null || window.localStorage['activeModulesView'] == undefined || window.localStorage['activeModulesView']== ""){
    $scope.setActiveModulePage('none');
  } else {
    $scope.setActiveModulePage(window.localStorage['activeModulesView']);
  }
})

app.controller('SettingsController', function ($rootScope,$scope, $timeout, $mdSidenav, $log) {
  console.log('Loading SettingsController');

  if (window.localStorage['activeUser'] == null || window.localStorage['activeUser'] == undefined || window.localStorage['activeUser']== ""){
      window.location.href = "login.php";
    } else {
      $rootScope.activeUser = JSON.parse(window.localStorage['activeUser']);
      console.log('activeUser',$rootScope.activeUser);
  }

  $scope.moduleSubMenu = [{"title":"Course/ Batch","tag":"Add a new course or batch for this academic year","link":"mcb"},{"title":"Subjects","tag":"Manage subjects coresponding to different courses","link":"ms"},{"title":"Student Category","tag":"Add Student Category","link":"msc"},{"title":"Additional Admission Details","tag":"Set Some Additional details for admission","link":"aaad"},{"title":"SMS Module","tag":"Enable/disable SMS settings","link":"sms"}];

  $scope.setActiveSettingsView = function (view) {
    $scope.activeSettingsView = view;
    console.log('activeSettingsView',view);
    window.localStorage['activeSettingsView'] = view;
  }

  if (window.localStorage['activeSettingsView'] == null || window.localStorage['activeSettingsView'] == undefined || window.localStorage['activeSettingsView']== ""){
    $scope.setActiveSettingsView('none');
  } else {
    $scope.setActiveSettingsView(window.localStorage['activeSettingsView']);
  }

  $scope.resetToDash = function () {
    $scope.setActiveSettingsView('none');
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

app.controller('HostelController', function ($rootScope,$scope,$timeout) {
  console.log('Loading HostelController');

  if (window.localStorage['activeUser'] == null || window.localStorage['activeUser'] == undefined || window.localStorage['activeUser']== ""){
      window.location.href = "login.php";
    } else {
      $rootScope.activeUser = JSON.parse(window.localStorage['activeUser']);
      console.log('activeUser',$rootScope.activeUser);
  }

  $scope.moduleSubMenu = [{"title":"Hostel","tag":"Manage Hostel Details","link":"ho"},{"title":"Rooms","tag":"Manage room details","link":"ro"},{"title":"Room Allocation","tag":"Allocate rooms to the students","link":"ra"},{"title":"Report","tag":"Generate Report","link":"re"}];

  $scope.setActiveHostelView = function (view) {
    $scope.activeHostelView = view;
    console.log('activeHostelView',view);
    window.localStorage['activeHostelView'] = view;
  }

  if (window.localStorage['activeHostelView'] == null || window.localStorage['activeHostelView'] == undefined || window.localStorage['activeHostelView']== ""){
    $scope.setActiveHostelView('none');
  } else {
    $scope.setActiveHostelView(window.localStorage['activeHostelView']);
  }

  $scope.resetToDash = function () {
    $scope.setActiveHostelView('none');
  }

  $scope.allHostels = [{"name": "G1","type": "Gents","info": ""},{"name": "L1","type": "Ladies","info": ""}];

  $scope.rooms = [{
                	"rNo": "r1",
                	"spr": "4",
                	"availability": "2",
                	"rent": "2500"
                }, {
                	"rNo": "r2",
                	"spr": "4",
                	"availability": "2",
                	"rent": "2500"
                }, {
                	"rNo": "r3",
                	"spr": "4",
                	"availability": "2",
                	"rent": "2500"
                }, {
                	"rNo": "r4",
                	"spr": "4",
                	"availability": "2",
                	"rent": "2500"
                }, {
                	"rNo": "r5",
                	"spr": "4",
                	"availability": "2",
                	"rent": "2500"
                }, {
                	"rNo": "r6",
                	"spr": "3",
                	"availability": "3",
                	"rent": "3000"
                }, {
                	"rNo": "r7",
                	"spr": "3",
                	"availability": "3",
                	"rent": "3000"
                }, {
                	"rNo": "r8",
                	"spr": "3",
                	"availability": "2",
                	"rent": "3000"
                }, {
                	"rNo": "r9",
                	"spr": "3",
                	"availability": "2",
                	"rent": "3000"
                }, {
                	"rNo": "r10",
                	"spr": "3",
                	"availability": "1",
                	"rent": "2500"
                }, {
                	"rNo": "r11",
                	"spr": "2",
                	"availability": "2",
                	"rent": "3500"
                }, {
                	"rNo": "r12",
                	"spr": "2",
                	"availability": "2",
                	"rent": "3500"
                }, {
                	"rNo": "r13",
                	"spr": "2",
                	"availability": "2",
                	"rent": "3500"
                }, {
                	"rNo": "r14",
                	"spr": "2",
                	"availability": "1",
                	"rent": "3500"
                }, {
                	"rNo": "r15",
                	"spr": "2",
                	"availability": "1",
                	"rent": "3500"
                }, {
                	"rNo": "r16",
                	"spr": "1",
                	"availability": "1",
                	"rent": "4000"
                }, {
                	"rNo": "r17",
                	"spr": "1",
                	"availability": "1",
                	"rent": "4000"
                }, {
                	"rNo": "r18",
                	"spr": "1",
                	"availability": "1",
                	"rent": "4000"
                }, {
                	"rNo": "r19",
                	"spr": "1",
                	"availability": "1",
                	"rent": "4000"
                }, {
                	"rNo": "r20",
                	"spr": "1",
                	"availability": "1",
                	"rent": "4000"
                }];

})

app.controller('HRController', function ($rootScope,$scope,$timeout) {
  console.log('Loading HRController');

  if (window.localStorage['activeUser'] == null || window.localStorage['activeUser'] == undefined || window.localStorage['activeUser']== ""){
      window.location.href = "login.php";
    } else {
      $rootScope.activeUser = JSON.parse(window.localStorage['activeUser']);
      console.log('activeUser',$rootScope.activeUser);
  }

  $scope.moduleSubMenu = [{"title":"HR Settings","tag":"Set up and maintain Human Resources","link":"hrs"},{"title":"Employee Management","tag":"Add employees and manage their subject associations","link":"em"},{"title":"Employee Leave Management","tag":"Manage employee attendance and leaves","link":"elm"},{"title":"Employee Search","tag":"Search, view, and maintain employee records","link":"es"},{"title":"Payroll and Payslip Management","tag":"Set up employee payroll and generate payslips","link":"ppm"}];

  $scope.HRsettings = [{"title":"Employee Category","tag":"Create and manage employee categories","link":"hrsec"},{"title":"Employee Position","tag":"Create and manage employee positions","link":"hrsep"},{"title":"Employee Department","tag":"Create and manage employee departments","link":"hrsed"},{"title":"Employee Grade","tag":"Create and manage employee grades","link":"hrseg"},{"title":"Working Day Settings","tag":"Set up employee working day settings","link":"hrswds"},{"title":"Leave Types","tag":"Add and manage employee leave types","link":"hrslt"},{"title":"Bank Details","tag":"Create and manage employee bank details","link":"hrsbd"},{"title":"Payroll Settings","tag":"Configure the payroll calculation mode","link":"hrsps"},{"title":"Additional Details","tag":"Create and manage additional details for the employee admission form","link":"hrsps"},{"title":"Leave Groups","tag":"Create leave groups to manage different leave types.","link":"hrslg"}];

  $scope.employeeManagement = [{"title":"Employee Admission","tag":"Employee admission form","link":"emed"},{"title":"Employee Subject Association","tag":"Assign an employee with one or more subjects","link":"emesa"}];

  $scope.employeeLeaveManagement = [{"title":"Attendance Register","tag":"Mark employee attendance","link":"elmarr"},{"title":"Attendance Report","tag":"Generate the employee attendance report for all departments","link":"elmart"},{"title":"Leave Reset","tag":"Reset employee leaves","link":"elmart"},{"title":"Leave Applications","tag":"View all employee leave applications","link":"elmla"}];

  $scope.payrollAndPayslipManagement = [{"title":"Payroll Categories","tag":"Create and manage employee payroll categories","link":"ppm"},{"title":"Payroll Groups","tag":"Create and manage employee payroll groups","link":"ppmpg"},{"title":"Payslips for Payroll Groups","tag":"Generate payslips for employees of a payroll group","link":"ppmppg"},{"title":"Payslips for Employees","tag":"Generate payslips for individual employees","link":"ppmpfe"},{"title":"Rejected Payslips","tag":"Manage rejected employee payslips","link":"ppmrp"},{"title":"Payslip Settings","tag":"Configure information to be displayed in employee payslips","link":"ppmps"},{"title":"Payslip Report","tag":"View the employee payslip report","link":"ppmpr"},{"title":"Advanced Payslip Reports","tag":"Generate advanced payslip reports and save as custom templates for later use","link":"ppmapr"}];

  $scope.setActiveHRView = function (view) {
    $scope.activeHRView = view;
    console.log('activeHRView',view);
    window.localStorage['activeHRView'] = view;
  }

  if (window.localStorage['activeHRView'] == null || window.localStorage['activeHRView'] == undefined || window.localStorage['activeHRView']== ""){
    $scope.setActiveHRView('none');
  } else {
    $scope.setActiveHRView(window.localStorage['activeHRView']);
  }

  $scope.resetToDash = function () {
    $scope.setActiveHRView('none');
  }

})

app.controller('OnlinePaymentController', function ($rootScope,$scope,$timeout) {
  console.log('Loading OnlinePaymentController');

  if (window.localStorage['activeUser'] == null || window.localStorage['activeUser'] == undefined || window.localStorage['activeUser']== ""){
      window.location.href = "login.php";
    } else {
      $rootScope.activeUser = JSON.parse(window.localStorage['activeUser']);
      console.log('activeUser',$rootScope.activeUser);
  }

  $scope.moduleSubMenu = [{"title":"Settings","tag":"Manage online payment settings","link":"ops"},{"title":"Transactions","tag":"List online transactions","link":"opt"},{"title":"Custom Gateways","tag":"Manage custom gateways","link":"cg"}];

  $scope.setActiveOnlinePaymentView = function (view) {
    $scope.activeOnlinePaymentView = view;
    console.log('activeOnlinePaymentView',view);
    window.localStorage['activeOnlinePaymentView'] = view;
  }

  if (window.localStorage['activeOnlinePaymentView'] == null || window.localStorage['activeOnlinePaymentView'] == undefined || window.localStorage['activeOnlinePaymentView']== ""){
    $scope.setActiveOnlinePaymentView('none');
   } else {
    $scope.setActiveOnlinePaymentView(window.localStorage['activeOnlinePaymentView']);
  }

  $scope.resetToDash = function () {
    $scope.setActiveOnlinePaymentView('none');
  }

  $scope.customGateways = [{'name':'CC Avenue','status':'Active'},{'name':'PayUMoney','status':'Inactive'}];
})
