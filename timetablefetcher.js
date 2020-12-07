const fetch = require("node-fetch");
const Log = require("../../js/logger.js");

const fetchTimetable = (sendNotificationSuccess, sendNotificationError) => (endpointUrl) => fetch(endpointUrl)
    .then(
         (response) => {
            if (response.status !== 200) {
                Log.error('[TIMETABLE] Looks like there was a problem fetching timetable. Status Code: ' +
                    response.status);
                sendNotificationError()
            }
            else{
                response.json().then((data) => {
                    Log.info('[TIMETABLE] Response is fetched correctly');
                    sendNotificationSuccess(data);
                });
            }
        }
    )
    .catch((err) => {
        Log.error('[TIMETABLE] Fetch Error :-S', err);
        sendNotificationError()
    });
    
module.exports = fetchTimetable;