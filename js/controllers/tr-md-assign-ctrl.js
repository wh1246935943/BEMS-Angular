//检验单位检验准备-------人员指派模态框controller
angular.module('starter.controllers').controller('trMdAssignCtrl', function (AllCheckoutPersonnel,trMdAssign,sendInfoFty,$scope,items,$uibModalInstance,$rootScope) {
    trMdAssign.ipAssign(items).then(function (personnelAssign) {
        $scope.accNumber = personnelAssign.data.result.data;
        console.log($scope.accNumber)
    });
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    AllCheckoutPersonnel.GetAllCheckoutPersonnel().then(function (CheckoutPersonnel) {
        $scope.Personnel = CheckoutPersonnel.data.result.data;
        console.log($scope.Personnel)
    });

    $scope.doAccept = function () {
        sendInfoFty.sendInfo({
            acceptId:items,
            inspectorId:$scope.Personnel.q.id,
            adminId:1
        }).then(function (sendInfoPar) {
            $scope.ssss = sendInfoPar;
            console.log($scope.ssss);
            $uibModalInstance.dismiss('cancel');
            $rootScope.tRreacquire();
        });
        console.log($scope.Personnel.q.id)
    };


});
