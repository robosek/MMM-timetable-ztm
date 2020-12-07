# MMM-timetable-ztm 

## Description
This module allows to fetch timetable for specific bus/tram stop in tricity. It uses globally available API (https://ckan.multimediagdansk.pl/dataset/tristar)

## Screen shot
<img width="416" alt="Zrzut ekranu 2020-12-7 o 21 32 04" src="https://user-images.githubusercontent.com/9861540/101406925-6a288b00-38da-11eb-8a90-45eb62dac4bd.png">


## Installation
Navigate into your MagicMirror's `modules` folder:
```bash
cd ~/MagicMirror/modules
```

Clone this repository:
```bash
git clone https://github.com/robosek/magic-mirror-ztm-timetable-module.git
```

Navigate to the new `MMM-timetable-ztm` folder and install the node dependencies.
```bash
npm install
```

Configure the module in your `config.js` file.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

```javascript
modules: [
   {
       module: 'MMM-timetable-ztm',
       position: 'top_right',
       header: 'Timetable ZTM bus stop(Zacna)',
       config: {
            refreshInterval: 100,
            stopId: 1850 // Get from this endpoint: https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/d3e96eb6-25ad-4d6c-8651-b1eb39155945/download/stopsingdansk.json
            endpointUrl: 'http://ckan2.multimediagdansk.pl/delays?stopId=' //Check if this is still available in (https://ckan.multimediagdansk.pl/dataset/tristar)
        }
    },
]

```
