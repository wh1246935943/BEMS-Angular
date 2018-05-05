//安全检验合格证
angular.module('starter.controllers').controller('certificateCtrl',function (certificate,$scope,$uibModal,$log) {
    $scope.currentPage =1;//初始当前页
    $scope.maxSize = 100;//最多显示3页其他的用···代替
    $scope.itemsPerPage=2;

    var initData=function (data) {
        certificate.certificateInfo(data).then(function (certificatePar) {
            $scope.certificateArray = certificatePar.data.result.data;
            $scope.totalItems =certificatePar.data.result.total;

            console.log($scope.certificateArray)
            console.log($scope.totalItems)
        });
    };
    initData('&page='+$scope.currentPage);
    setTimeout(function () {
        return initData('&page='+$scope.currentPage);
    },5000);
    this.getsearchInfo = function(text1) {
        console.log("输出的内容为： " + text1.st+'--' + text1.en);
        console.log(text1.st.getFullYear()+"-"+(text1.st.getMonth()+1)+"-"+text1.st.getDate());
        console.log(text1.en.getFullYear()+"-"+(text1.en.getMonth()+1)+"-"+text1.en.getDate());
        var startDate=text1.st.getFullYear()+"-"+(text1.st.getMonth()+1)+"-"+text1.st.getDate();
        var endDate=text1.en.getFullYear()+"-"+(text1.en.getMonth()+1)+"-"+text1.en.getDate();
        // var startTime=Date.parse(text1.st)/1000;
        // console.log(startTime);
        setTimeout(function () {
            return initData('&key='+''+'&startDate='+startDate+'&endDate='+endDate);
        },5000);
        console.log("&key="+""+"&startDate="+startDate+"&endDate="+endDate);
    };
    $scope.pageChange=function () {
        console.log(22222)
        initData('&page='+$scope.currentPage);
    }
    //安全检验合格证——打印弹框开始
    $scope.certificatePrint = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var certificatePrintVar = arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'CertificatePrint-title',
            ariaDescribedBy: 'CertificatePrint-body',
            templateUrl: 'myCertificatePrint.html',
            controller: 'certificatePrintModalCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return certificatePrintVar;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //检验报告复检——打印弹框结束

    //    安全检验合格证——详情弹框开始
    $scope.certificateParticulars = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var certificateParticularsVar = arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'CertificateParticulars-title',
            ariaDescribedBy: 'CertificateParticulars-body',
            templateUrl: 'myCertificateParticulars.html',
            controller: 'certificateParticularsModalCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return certificateParticularsVar;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //    检验报告复检——详情弹框结束
});
