angular.module('ngAutoComplete', [])
.directive('ngAutoComplete', function () {
  return {
    restrict: 'AE',
    template: '<div class="nacContainer">'
             +'    <input placeholder="{{placeholder}}" type="{{type||\'text\'}}"'
             +'           ng-model="input" class="form-control" ng-focus="showMorePkgs=true" ng-blur="showMorePkgs=false">'
             +'    <div class="nacOuter" ng-show="showMorePkgs">'
             +'      <div class="nacInner">'
             +'        <div ng-repeat="item in data | filter: input"'
             +'             ng-click="set(item)" ng-bind-html="formatter(item)"></div>'
             +'      </div>'
             +'    </div>'
             +'</div>',
    scope: {
      input: '=ngModel',
      data: '=nacData',
      type: '@type',
      placeholder: '@placeholder',
      formatter: '=?nacFormatter',
      parser: '=?nacParser'
    },
    require: 'ngModel',
    controller: function ($scope) {
      $scope.formatter = angular.isFunction($scope.formatter) ? $scope.formatter : rawReturn;
      $scope.parser = angular.isFunction($scope.parser) ? $scope.parser : rawReturn;

      $scope.set = function (item) {
        $scope.input = $scope.parser(item);
        $scope.showMorePkgs = false;
      };

      function rawReturn (item) {
        return item;
      }
    }
  };
});
