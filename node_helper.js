var NodeHelper = require("node_helper");
const fetch = require("node-fetch");
const Log = require("../../js/logger.js");

module.exports = NodeHelper.create({
    consolePrefix: 'MMM-timetable-ztm : ',

    start: function function_name() {
        "use strict";
        this.isInitialized = false;
    },

    socketNotificationReceived: function (notification, payload) {
        "use strict";
        var self = this;

        if (notification === 'TIMETABLE-INITIALIZE') {
            this.config = payload;
        }

        if (!this.isInitialized) {
            setInterval(function () {
                self.getTimetable();
            }, self.config.refreshInterval * 1000);
        }

        this.isInitialized = true;

    },

    getTimetable: function () {
        "use strict";
        var self = this;

        fetch('http://ckan2.multimediagdansk.pl/delays?stopId=1850')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        Log.error('[TIMETABLE] Looks like there was a problem fetching timetable. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then(function (data) {
                        Log.info('[TIMETABLE] Response is fetched correctly')
                        self.sendSocketNotification('CURRENT_TIMETABLE', data);
                    });
                }
            )
            .catch(function (err) {
                Log.error('[TIMETABLE] Fetch Error :-S', err);
            });
    },

});