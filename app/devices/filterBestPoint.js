'use strict';

/* global define */

define('filterBestPoint', require => {
    const data = require('data');

    data.devices = data.devices.map(device => {
        let periodDuration = Infinity;
        let chosenPoint    = null;

        device.periodPoints.forEach(periodPoint => {
            let period          = periodPoint.period;
            let periodDuration_ = new Date(period.end) - new Date(period.start);

            if (periodDuration_ < periodDuration) {
                chosenPoint    = periodPoint.point;
                periodDuration = periodDuration_;
            }
        });

        device.point = chosenPoint;

        return device;
    });
});
