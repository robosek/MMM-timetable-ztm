Module.register("MMM-timetable-ztm", {
    // Default module config.
    defaults: {
        refreshInterval: 15 // seconds
    },

    getStyles: function () {
        "use strict";
        return ["font-awesome.css"];
    },

    start: function () {
        "use strict";
        this.message = "Ładuję...";
        this.sendSocketNotification('TIMETABLE-INITIALIZE', this.config);
    },

    socketNotificationReceived: function (notification, data) {
        "use strict";

        switch (notification) {
            // Temperatures values recieved
            case 'CURRENT_TIMETABLE':
                this.message = data;
                this.updateDom();
                break;

            // Errors
            case 'TIMETABLE-ERROR':
                this.message = 'Error: Cannot connect to server'
                this.updateDom();
                break;
        }

    },

    // Override dom generator.
    getDom: function () {
        var wrapper = document.createElement("div");
        var table = document.createElement("table");

        if (typeof this.message === 'string') {
            wrapper.innerHTML = this.message;
            return wrapper;
        }

        let headRow = document.createElement("tr");
        let lineNumber = document.createElement("th");
        lineNumber.innerHTML = "Linia";
        let estimatedTime = document.createElement("th");
        estimatedTime.innerHTML = "Szacowany";
        let timetableTime = document.createElement("th");
        timetableTime.innerHTML = "Przyjazd";
        headRow.appendChild(lineNumber);
        headRow.appendChild(estimatedTime);
        headRow.appendChild(timetableTime);
        table.appendChild(headRow);

        for (var index in this.message.delay) {
            let row = document.createElement("tr");
            let line = document.createElement("td");
            line.innerHTML = this.message.delay[index].routeId;
            let estimatedTime = document.createElement("td");
            estimatedTime.innerHTML = this.message.delay[index].estimatedTime;
            let timetableTime = document.createElement("td");
            timetableTime.innerHTML = this.message.delay[index].theoreticalTime;

            row.appendChild(line);
            row.appendChild(estimatedTime);
            row.appendChild(timetableTime);

            table.appendChild(row)
        }

        wrapper.appendChild(table);
        return wrapper;
    }
});