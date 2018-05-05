//模态框：检验报告--详情
angular.module('starter.controllers').controller('reportTextTwoModalCtrl', function ($uibModalInstance, items,accept,siteInspection,$scope) {
    console.log(items)
    siteInspection.getSceneDetailAll(items).then(function (response) {
            $scope.recheckDetailInfo=response.data.result.data;
            console.log('报检',response.data.result.data);
        },function (response) {
            console.log('ERROR----siteInspection.getSceneDetailAll():',response);
        }
    );
    $scope.ok = function () {
        // console.log($ctrl)
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
