<div data-ng-controller="SideBarController">
  <p id="sideNavTitle">Navigation</p>
  <a href="index.php"><div id="sideNavContent" data-ng-click="setActiveSubView('none')">
    Dashboard
  </div></a>
  <!-- Administration -->
  <div data-ng-show="activeUser.type == 'a'">
    <div id="sideNavContent" data-ng-hide="activeSubView=='administration'" data-ng-click="setActiveSubView('administration')">
      <span>Administration</span>
      <i class="fa fa-fw fa-angle-right pullRight"></i>
    </div>
    <div id="sideNavContentActive" data-ng-show="activeSubView=='administration'" data-ng-click="setActiveSubView('none')">
      <span>Administration</span>
      <i class="fa fa-fw fa-angle-down pullRight"></i>
      <ul>
        <a data-ng-repeat="menu in administrationSubmenu" href="{{menu.link}}"><li>{{menu.title}}</li></a>
      </ul>
    </div>
  </div>
  <!-- Academics -->
  <div>
    <div id="sideNavContent" data-ng-hide="activeSubView=='academics'" data-ng-click="setActiveSubView('academics')">
      <span>Academics</span>
      <i class="fa fa-fw fa-angle-right pullRight"></i>
    </div>
    <div id="sideNavContentActive" data-ng-show="activeSubView=='academics'" data-ng-click="setActiveSubView('none')">
      <span>Academics</span>
      <i class="fa fa-fw fa-angle-down pullRight"></i>
      <ul>
        <a data-ng-repeat="menu in academicsSubmenu" href="{{menu.link}}"><li>{{menu.title}}</li></a>
      </ul>
    </div>
  </div>
  <!-- Data and Reports -->
  <div data-ng-show="activeUser.type == 'a'">
    <div id="sideNavContent" data-ng-hide="activeSubView=='dataAndReports'" data-ng-click="setActiveSubView('dataAndReports')">
      <span>Data and Reports</span>
      <i class="fa fa-fw fa-angle-right pullRight"></i>
    </div>
    <div id="sideNavContentActive" data-ng-show="activeSubView=='dataAndReports'" data-ng-click="setActiveSubView('none')">
      <span>Data and Reports</span>
      <i class="fa fa-fw fa-angle-down pullRight"></i>
      <ul>
        <a data-ng-repeat="menu in dataReportsSubmenu" href="{{menu.link}}"><li>{{menu.title}}</li></a>
      </ul>
    </div>
  </div>
  <!-- Collaboration -->
  <div>
    <div id="sideNavContent" data-ng-hide="activeSubView=='collaboration'" data-ng-click="setActiveSubView('collaboration')">
      <span>Collaboration</span>
      <i class="fa fa-fw fa-angle-right pullRight"></i>
    </div>
    <div id="sideNavContentActive" data-ng-show="activeSubView=='collaboration'" data-ng-click="setActiveSubView('none')">
      <span>Collaboration</span>
      <i class="fa fa-fw fa-angle-down pullRight"></i>
      <ul>
        <a data-ng-repeat="menu in collabrationSubmenu" href="{{menu.link}}"><li>{{menu.title}}</li></a>
      </ul>
    </div>
  </div>
</div>
