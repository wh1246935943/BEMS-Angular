//模态框：检验报告复检--添加复检报告
angular.module('starter.controllers').controller('addRepCtrl', function ($uibModalInstance, items,$scope,Upload) {
    console.log(items)
    $scope.roleList=items[0];
    $scope.recheckDate={date:new Date()};
    $scope.issueDate={date:new Date()};
    $scope.nextIssueDate={date:new Date()};
    $scope.maintenanceDate={date:new Date()};
    $scope.upload = function (file) {
        Upload.upload({
            url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/add',
            data: file
        }).then(function (resp) {
            console.log(22222)
            console.log('Success ' + resp);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        });
    };
    $scope.ok = function () {
        var addInfo={
            conclusionId:$scope.conclusionId,
            code:$scope.usingUnit,
            installAddress:$scope.installAddress,
            recheckDate:new Date($scope.recheckDate.date).getFullYear()+"-"+new Date($scope.recheckDate.date).getMonth()+"-"+new Date($scope.recheckDate.date).getDate(),
            recheckConclusion:$scope.recheckConclusion,
            inspectionUnitCertificateCode:$scope.inspectionUnitCertificateCode,
            issueDate:new Date($scope.issueDate.date).getFullYear()+"-"+new Date($scope.issueDate.date).getMonth()+"-"+new Date($scope.issueDate.date).getDate(),
            nextIssueDate:new Date($scope.nextIssueDate.date).getFullYear()+"-"+new Date($scope.nextIssueDate.date).getMonth()+"-"+new Date($scope.nextIssueDate.date).getDate(),
            remark:$scope.remark,
            firstInspectionDisqualifiedReason:$scope.firstInspectionDisqualifiedReason,
            recheckResult:$scope.recheckResult,
            maintenanceStaff:$scope.maintenanceStaff,
            maintenanceDate:new Date($scope.maintenanceDate.date).getFullYear()+"-"+new Date($scope.maintenanceDate.date).getMonth()+"-"+new Date($scope.maintenanceDate.date).getDate(),
            recheckReportConclusionPageFile:$scope.recheckReportConclusionPageFile,
            usingUnit:items
        };
        console.log(addInfo)
        $scope.upload(addInfo);
        $uibModalInstance.close();

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
