//模态框：检验报告复检--详情
angular.module('starter.controllers').controller('recheckDetailCtrl', function ($uibModalInstance, items,$scope,checkoutRes) {
    console.log(items)
    checkoutRes.getRecheckDetaiAll(items).then(function (response) {
        $scope.recheckDetailInfo=response.data.result.data;
        console.log('复检详情',response.data.result.data);
    },function (response) {
        console.log('ERROR----checkoutRes.getRecheckDetailList():',response);
    });
    //TabsDemoCtrl－－START
    $scope.tabs = [
        { title:'Dynamic Title 1', content:'Dynamic content 1' },
        { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];

    $scope.alertMe = function() {
        setTimeout(function() {
            $window.alert('You\'ve selected the alert tab!');
        });
    };

    $scope.model = {
        name: 'Tabs'
    };
    //TabsDemoCtrl－－END

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
