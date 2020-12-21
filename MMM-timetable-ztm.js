Module.register("MMM-timetable-ztm", {
    defaults: {},

    getStyles: function () {
        "use strict";
        return ["font-awesome.css"];
    },

    getScripts: function () {
        return [
            this.file('constants.js'),
        ]
    },

    start: function () {
        "use strict";
        this.message = "Ładuję...";
        this.sendSocketNotification(TIMETABLE_INIT, this.config);
    },

    socketNotificationReceived: function (notification, data) {
        "use strict";

        switch (notification) {
            case 'TIMETABLE_SUCCESS':
                if (data.delay.length > 0) {
                    this.timetable = data;
                    this.message = null;
                }
                else {
                    this.timetable = null;
                    this.message = 'Brak autobusów';
                }
                this.updateDom();
                break;

            case 'TIMETABLE_ERROR':
                this.message = 'Problem z pobraniem danych...'
                this.timetable = null;
                this.updateDom();
                break;
        }

    },

    getDom: function () {
        var wrapper = document.createElement("div");
        var table = document.createElement("table");

        if (this.message !== null) {
            wrapper.innerHTML = this.message;
            return wrapper;
        }

        let headRow = document.createElement("tr");
        let lineNumber = document.createElement("td");
        lineNumber.style = 'text-align: center';
        lineNumber.innerHTML = '<i class="fas fa-bus"></i>';
        let estimatedTime = document.createElement("td");
        estimatedTime.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
        estimatedTime.style = 'text-align:center'
        let timetableTime = document.createElement("td");
        timetableTime.innerHTML = '<i class="far fa-clock"></i>';
        timetableTime.style = 'text-align:center'
        headRow.appendChild(lineNumber);
        headRow.appendChild(estimatedTime);
        headRow.appendChild(timetableTime);
        table.appendChild(headRow);

        for (var index in this.timetable.delay) {
            let row = document.createElement("tr");
            let line = document.createElement("td");
            line.style = 'text-align: center'
            line.innerHTML = this.timetable.delay[index].routeId;
            let timetableTime = document.createElement("td");
            timetableTime.innerHTML = '<b>' + this.timetable.delay[index].theoreticalTime + '</b>';
            let estimatedTime = document.createElement("td");
            estimatedTime.innerHTML = this.timetable.delay[index].estimatedTime;

            row.appendChild(line);
            row.appendChild(estimatedTime);
            row.appendChild(timetableTime);

            table.appendChild(row)
        }

        wrapper.appendChild(table);
        return wrapper;
    }
});