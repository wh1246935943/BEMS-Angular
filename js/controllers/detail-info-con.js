//模态框：检验单位审核--详情
angular.module('starter.controllers').controller('detailInfoCon', function ($uibModalInstance, items,$scope,declare) {
    // var $ctrl = this;
    // $ctrl.items = items;
    console.log(items);

    //获取申报详情
    declare.getApplicationDetail(items).then(function (response) {
        console.log(response.data.result.data,'lllllllllll')
        $scope.info=response.data.result.data;
        $scope.recorderNumber=$scope.info.iprCode;
        $scope.deviceNumber=$scope.info.deviceCode;
        $scope.deviceName=$scope.info.deviceName;
        $scope.modelNumber=$scope.info.specification;
        $scope.brand=$scope.info.project.name;
        $scope.declarant=$scope.info.declarant;
        $scope.companyName=$scope.info.applicationCompany.name;
        $scope.equipName=$scope.info.deviceType.name;

    },function (response) {
        console.log('ERROR----declare.getApplicationDetail():',response);
    });
    // $ctrl.selected = {
    //     item: $ctrl.items[0]
    // };

    // $ctrl.ok = function () {
    //     // console.log($ctrl)
    //     $uibModalInstance.close($ctrl.selected.item);
    // };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
