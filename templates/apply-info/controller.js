//设备报检申请
angular.module('starter.controllers').controller('applyInfo',function ($rootScope,$scope,$state,proInfoManage,company,equipmentInfo,declare,Upload) {
    //显示工程列表

    proInfoManage.showProList().then(function (response) {
        $scope.ownedProject=response.data.result.data;
        // console.log($scope.ownedProject);

    },function (response) {
        console.log('ERROR----proInfoManage.showProList():',response);

    });
    //获取所有公司
    company.getAllComp().then(function (response) {
        $scope.equipCompanyName=response.data.result.data;
        console.log(response.data.result.data);

    },function (response) {
        console.log('ERROR----company.getAllComp():',response);

    });
    // 获取所有的设备类型
    equipmentInfo.getAllEquip().then(function (response) {
        $scope.equipmentType=response.data.result.data;
        console.log(response);

    },function (response) {
        console.log('ERROR----equipmentInfo.getAllEquip():',response);

    });
    $scope.equipName={selected:''};
    $scope.getNews=function(arr){
        $scope.arr=arr.applicationMaterials;
        console.log($scope.arr);

    }
    $scope.upload = function (file) {
        Upload.upload({
            url: 'http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/application-material/upload',
            data: file
        }).then(function (resp) {
            console.log(22222)
            console.log('Success ' + resp);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        });
    };
    $scope.submitMyForm=function () {
        $scope.applyTextInfo={
            iprCode:$scope.recorderNumber,
            deviceCode:$scope.deviceNumber,
            deviceName:$scope.deviceName,
            specification:$scope.modelNumber,
            projectId:$scope.brand,
            declarant:$scope.declarant,
            applicationCompanyId:$scope.companyName,
            deviceTypeId:$scope.equipName.selected.id,
            adminId:1
        };
        console.log($scope.arr)
        declare.deviceAppAdd($scope.applyTextInfo);
        for(var i=0;i<$scope.arr.length;i++){
            var addInfo={
                applicationId:$scope.equipName.selected.id,
                applicationMaterialId:$scope.arr[i].id,
                materialFile:$scope.arr[i].file
            };
            console.log(addInfo,'----picture')
            $scope.upload(addInfo);
        }

        //跳转检验单位审核页面
        $state.go('temp.audit');
    }




});
