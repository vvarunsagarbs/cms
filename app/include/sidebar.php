<div data-ng-controller="SideBarController" data-ng-controller="ModuleController">
  <p id="sideNavTitle">Navigation</p>
  <a href="index.php"><div id="sideNavContent" data-ng-click="setActiveSubNavView('none')">
    Dashboard
  </div></a>
  <!-- Administration -->
  <div data-ng-show="activeUser.type == 'a'" data-ng-controller="SettingsController">
    <a href="modules.php" ng-click="setActiveModulePage('ad')">
      <div id="sideNavContent" data-ng-hide="activeSubNavView=='administration'" data-ng-click="setActiveSubNavView('administration')">
        <span>Administration</span>
        <i class="fa fa-fw fa-angle-right pullRight"></i>
      </div>
    </a>
    <div id="sideNavContentActive" data-ng-show="activeSubNavView=='administration'">
      <p data-ng-click="setActiveSubNavView('none')">
        <span>Administration</span>
        <i class="fa fa-fw fa-angle-down pullRight"></i>
      </p>
      <ul>
        <a data-ng-repeat="menu in administrationSubmenu" ng-href="{{menu.link}}" ><li>{{menu.title}}</li></a>
      </ul>
    </div>
  </div>
  <!-- Academics -->
  <div>
    <a href="modules.php" ng-click="setActiveModulePage('ac')">
      <div id="sideNavContent" data-ng-hide="activeSubNavView=='academics'" data-ng-click="setActiveSubNavView('academics')">
        <span>Academics</span>
        <i class="fa fa-fw fa-angle-right pullRight"></i>
      </div>
    </a>
    <div id="sideNavContentActive" data-ng-show="activeSubNavView=='academics'">
      <p data-ng-click="setActiveSubNavView('none')">
        <span>Academics</span>
        <i class="fa fa-fw fa-angle-down pullRight"></i>
      </p>
      <ul>
        <a data-ng-repeat="menu in academicsSubmenu" href="{{menu.link}}"><li>{{menu.title}}</li></a>
      </ul>
    </div>
  </div>
  <!-- Data and Reports -->
  <div data-ng-show="activeUser.type == 'a'">
    <a href="modules.php" ng-click="setActiveModulePage('dr')">
      <div id="sideNavContent" data-ng-hide="activeSubNavView=='dataAndReports'" data-ng-click="setActiveSubNavView('dataAndReports')">
        <span>Data and Reports</span>
        <i class="fa fa-fw fa-angle-right pullRight"></i>
      </div>
    </a>
    <div id="sideNavContentActive" data-ng-show="activeSubNavView=='dataAndReports'" data-ng-click="setActiveSubNavView('none')">
      <p data-ng-click="setActiveSubNavView('none')">
        <span>Data and Reports</span>
        <i class="fa fa-fw fa-angle-down pullRight"></i>
      </p>
      <ul>
        <a data-ng-repeat="menu in dataReportsSubmenu" href="{{menu.link}}"><li>{{menu.title}}</li></a>
      </ul>
    </div>
  </div>
  <!-- Collaboration -->
  <div>
    <a href="modules.php" ng-click="setActiveModulePage('co')">
      <div id="sideNavContent" data-ng-hide="activeSubNavView=='collaboration'" data-ng-click="setActiveSubNavView('collaboration')">
        <span>Collaboration</span>
        <i class="fa fa-fw fa-angle-right pullRight"></i>
      </div>
    </a>
    <div id="sideNavContentActive" data-ng-show="activeSubNavView=='collaboration'" data-ng-click="setActiveSubNavView('none')">
      <p data-ng-click="setActiveSubNavView('none')">
        <span>Collaboration</span>
        <i class="fa fa-fw fa-angle-down pullRight"></i>
      </p>
      <ul>
        <a data-ng-repeat="menu in collabrationSubmenu" href="{{menu.link}}"><li>{{menu.title}}</li></a>
      </ul>
    </div>
  </div>
</div>
