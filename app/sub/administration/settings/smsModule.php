<div class="container-fluid">
  <div class="row" id="pageHeader" style="background-color:#F6F8F8;color:#646565;font-size:18px;">
    <div class="col-md-2 pad-10">
      Configuration
    </div>
    <div class="col-md-10 right">
      <ul id="moduleSubMenu" class="customScroll">
        <a ng-repeat="menu in moduleSubMenu" ng-click="setActiveSettingsView(menu.link)"><li>{{menu.title}}</li></a>
      </ul>
    </div>
  </div>
  <div id="BreadCrumb" data-ng-controller="ModuleController">
    <ul>
      <a href="index.php"><li style="display:inline">Home</li></a> >
      <a href="modules.php" data-ng-click="setActiveModulePage('ad')"><li style="display:inline">Administration</li></a> >
      <a ng-click="setActiveSettingsView('none')"><li style="display:inline">Settings</li></a> >
      <a ng-click="#"><li style="display:inline">Manage SMS</li></a>
    </ul>
  </div>
  <div class="row">
    <div class="pad-20">
      <p><b>Manage SMS</b></p>
    </div>
    <div class="col-md-8 col-md-offset-2">
      <md-content>
        <div class="container-fluid">
    	    <div class="row pad-20">
            <div class="col-md-6">
              <md-input-container>
        		    <label>Name</label>
        		    <input ng-model="user.title" type="text">
      		    </md-input-container>
            </div>
           <div class="col-md-6">
      		   <md-input-container>
      		       <label>Input method</label>
                <md-select ng-model="ctrl.userState">
                  <md-option><em>Text Box</em></md-option>
                  <md-option><em>Select Box</em></md-option>
                  <md-option><em>Text Area</em></md-option>
                  <md-option><em>Chek Box</em></md-option>
                  <md-option ng-repeat="state in ctrl.states" ng-value="state.abbrev" ng-disabled="$index === 1">
             </md-input-container>
           </div>
          </div>
          <div class="row pad-20">
     	        <md-button class="md-primary md-raised pullRight">Add</md-button>
          </div>
        </div>
      </md-content>
    </div>
  </div>
</div>
