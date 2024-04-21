angular.module("myPromiseApp")

    .controller("myPromiseController", ["$scope", "$q", "$interval", "myPromiseService",
        function ($scope, $q, $interval, myPromiseService) {

            $scope.time = new Date().toLocaleTimeString("ES-es");

            $scope.carsData = "";
            $scope.ownerData = "";
            $scope.unionData = "";

            $scope.dataA = "";
            $scope.dataB = "";

            $interval(() => {
                $scope.time = new Date().toLocaleTimeString("ES-es");
            }, 1000);

            // Ejercicio de conjunción de promesas, enfocado a comprender los distintos elementos
            // La promesa es creada en la función
            $scope.loadCars = function () {
                var carsDefered = $q.defer();
                var carsPromise = carsDefered.promise;

                var ownersDefered = $q.defer();
                var ownersPromise = ownersDefered.promise;

                var dataPromise = $q.all([carsPromise, ownersPromise]);

                myPromiseService.getData(carsDefered, 1000);
                myPromiseService.getData(ownersDefered, 5000);

                // Promesa coches
                carsPromise.then(function (reponse) {
                    $scope.carsData = "OK CARS";
                }, function (err) {
                    $scope.carsData = "KO CARS";
                }, function (notify) {
                    console.log(notify);
                });

                // Promesa propietarios
                ownersPromise["finally"](function () {
                    $scope.ownerData = "FIN DE CARGA OWNERS";
                });

                // Promesa conjunta
                dataPromise.then(function (reponse) {
                    $scope.unionData = "OK ALL";
                }, function (err) {
                    $scope.unionData = "KO ALL";
                });
            }

            // Ejercicio de conjunción de promesas, enfocado a manejar respuesta por nombre
            // La promesa es devuelta de forma externa
            $scope.loadData = function () {
                var promiseA = myPromiseService.getDataResolve(1000);
                var promiseB = myPromiseService.getDataResolve(5000);

                // Indicación de nombres
                var promiseAll = $q.all({ A: promiseA, B: promiseB });

                promiseA["finally"](function () {
                    console.log("A");
                });

                promiseB["finally"](function () {
                    console.log("B");
                });

                promiseAll.then(function (response) {
                    // Uso de nombres y no de posiciones
                    $scope.dataA = response.A;
                    $scope.dataB = response.B;
                }, function (err) {
                    console.log(err);
                });
            }

            $scope.loadCars();
            $scope.loadData();

        }]);