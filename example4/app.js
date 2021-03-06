/*
(function() {
    'use strict';

    angular.module('DIApp', [])
        .controller('DIController', ['$scope', '$filter', '$injector', DIController]);

    function DIController($scope, $filter, $injector) {
        $scope.name = "David";
        $scope.upper = function() {
            var uppercase = $filter('uppercase');
            $scope.name = uppercase($scope.name);
        };

        console.log($injector.annotate(DIController));
    }

    function AnnotateMe($scope, job, blah) {
        console.log($scope);
        return "Blah!";
    }

    console.log(DIController.toString());
})();
*/

/*
(function() {
    'use strict';

    angular.module('DIApp', [])
        .controller('DIController', ['$scope', '$filter', function($scope, $filter) {
            $scope.name = "David";
            $scope.upper = function() {
                var uppercase = $filter('uppercase');
                $scope.name = uppercase($scope.name);
            };
        }]);
})();
*/
(function() {
    'use strict';
    angular.module('MsgApp', [])
        .controller('MsgController', MsgController);

    MsgController.$inject = ['$scope', '$filter'];
    function MsgController($scope, $inject) {
        $scope.name = "David";
        $scope.state = "holiday";

        $scope.switchState = function() {
            if ( $scope.state == "holiday" ) {
                $scope.state = "job";
            } else {
                $scope.state = "holiday";
            }
        }
    }

})();
//!function(){"use strict";function n(o,e,t){o.name="David",o.upper=function(){var n=e("uppercase");o.name=n(o.name)},console.log(t.annotate(n))}angular.module("DIApp",[]).controller("DIController",["$scope","$filter","$injector",n]),console.log(n.toString())}();