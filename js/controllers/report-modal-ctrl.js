//模态框：检验报告--编辑
angular.module('starter.controllers').controller('reportModalCtrl', function ($uibModalInstance, items,accept,inspectionReport,$scope,Upload) {
    console.log(items);
    $scope.fileCon=[];
    inspectionReport.getReportList(items).then(function (response) {
        $scope.info=response.data.result.data;
        for(var i=0;i<$scope.info.reportMaterialFiles.length;i++){
            $scope.fileCon.push([]);
            for(var value in $scope.info.reportMaterialFiles[i]){
                if(value!="name" && $scope.info.reportMaterialFiles[i][value]){
                    $scope.fileCon[i].push({
                        url:$scope.info.reportMaterialFiles[i][value]
                    })
                }
            }
        }
        console.log($scope.fileCon)
    },function (response) {
        console.log('ERROR----declare.getPending():',response);

    });
    // upload on file select or drop
    $scope.upload = function (files) {
        Upload.upload({
            url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/report-material/upload',
            data: files
        }).then(function (resp) {
            console.log('Success ' + resp);
        }, function (resp) {
            console.log('Error Upload: ' + resp.status);
        });
    };
    $scope.ok = function () {
        console.log($scope.fileCon,'3333');
        //编辑提交
        for(var j=0;j<$scope.fileCon.length;j++){
            for(var i=0;i<$scope.fileCon[j].length;i++){
                if($scope.fileCon[j][i].url.name){
                    console.log($scope.fileCon[j][i].url,'........');
                    var updateInfo={
                        executionId:items,
                        reportMaterialId:j+1,
                        materialFile:$scope.fileCon[j][i].url,
                        position:i+1
                    };
                    console.log($scope.fileCon[j][i].url,'===');
                    $scope.upload(updateInfo);
                    $uibModalInstance.close();
                }

            }
        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
