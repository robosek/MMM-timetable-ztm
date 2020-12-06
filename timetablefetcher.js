const request = require("node-fetch");

const TimetableFetcher = () => {
    const fetchTimetable = (url) => {
        let result = ''
        await fetch(url)
            .then(res => res.json())
            .then(json => result = json);

        result
    }
}



module.exports = TimetableFetcher;