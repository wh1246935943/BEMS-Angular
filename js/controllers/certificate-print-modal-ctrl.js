//安全检验合格证------打印模态框controller
angular.module('starter.controllers').controller('certificatePrintModalCtrl', function (certificatePrintModal,$scope,items,$uibModalInstance) {
    certificatePrintModal.certificatePrintInfo(items).then(function (certificatePrintPar) {
        $scope.printPic = certificatePrintPar.data.result.data.application.project;
        console.log($scope.printPic);
        console.log(items);
    });
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.print = function () {
        var newwindow = window.open("","aaaaaa");
        bdhtml=window.document.body.innerHTML;
        sprnstr="<!--startprint-->";
        eprnstr="<!--endprint-->";
        prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17);
        prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));
        newwindow.document.body.innerHTML=prnhtml;
        newwindow.window.print();

    };

});
    