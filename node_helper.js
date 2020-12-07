var NodeHelper = require("node_helper");
const fetchTimetable = require('./timetablefetcher.js');
const { TIMETABLE_SUCCESS, TIMETABLE_INIT, TIMETABLE_ERROR } = require('./constants.js')

module.exports = NodeHelper.create({
    consolePrefix: 'MMM-timetable-ztm : ',

    start: function function_name() {
        "use strict";
        this.isInitialized = false;
    },

    socketNotificationReceived: function (notification, payload) {
        "use strict";
        var self = this;

        if (notification === TIMETABLE_INIT) {
            this.config = payload;
        }

        if (!this.isInitialized) {
            self.getTimetable()

            setInterval(function () {
                self.getTimetable();
            }, self.config.refreshInterval * 1000);
        }

        this.isInitialized = true;

    },

    getTimetable: function () {
        "use strict";
        var self = this;
        var apiUrl = self.config.endpointUrl;
        var endpointUrl = apiUrl + self.config.stopId;

        const sendNotificationSuccess = (data) => {
            self.sendSocketNotification(TIMETABLE_SUCCESS, data);
        }

        const sendNotificationError = () => {
            self.sendSocketNotification(TIMETABLE_ERROR, null)
        }

        let fetch = fetchTimetable(sendNotificationSuccess, sendNotificationError)
        fetch(endpointUrl);
    },
});