angular.module("myPromiseApp")

    .service("myPromiseService", ["$timeout", "$q", function ($timeout, $q) {

        // Función que dado un time realiza la espera para resolver y notificar promesas
        this.getData = function (defered, time) {
            $timeout(() => {
                defered.notify(time);
                defered.resolve();
            }, time);
        }

        // Función que dado un time realiza la espera para devolver datos
        this.getDataResolve = function (time) {
            var response = $q.defer();

            $timeout(() => {
                response.resolve("OK");
            }, time);

            return response.promise;
        }

    }]);