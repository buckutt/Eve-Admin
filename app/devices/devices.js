'use strict';

/* global define */

define('devices', require => {
    const Vue    = require('vue');
    const view   = require('text!devices.html!strip');
    const data   = require('data');
    const clone  = require('clone');

    require('date');

    return {
        view,
        vm: $el => {
            let devices = new Vue({
                el     : $el,
                data   : {
                    devices: [],
                    points : [],
                    periods: []
                },
                methods: {
                    /**
                     * Edits a device
                     * @param  {Object} device The device
                     */
                    editDevice(device) {
                        let clonedDevice = clone(device);
                        this.$set('deviceToEdit', clonedDevice);
                        this.$set('deviceToEditPeriodPoints', clonedDevice.periodPoints);
                    },

                    /**
                     * Removes a point from the editing device
                     * @param  {Object} point The point
                     */
                    removePoint(point) {
                        let dtep = this.deviceToEditPeriodPoints;
                        dtep.splice(dtep.indexOf(point), 1);
                    },

                    /**
                     * Adds a point to the editing device
                     */
                    addPoint() {
                        if (!this.pointToAdd || !this.periodToAdd) {
                            return;
                        }

                        let point  = data.points.filter(p => p.id === this.pointToAdd)[0];
                        let period = data.periods.filter(p => p.id === this.periodToAdd)[0];

                        let newPeriodPoint = {
                            point : point,
                            period: period
                        };

                        this.deviceToEditPeriodPoints.push(newPeriodPoint);
                        this.$set('pointToAdd', '');
                        this.$set('periodToAdd', '');
                    },

                    /**
                     * Removes a device
                     * @param  {Object} device The device
                     */
                    removeDevice(device) {
                        this.devices.splice(this.devices.indexOf(device), 1);
                    }
                }
            });

            setTimeout(() => {
                // Todo set point from points (get the more accurate period)
                let dataDevices = data.devices.map(device => device);
                devices.$set('devices', dataDevices);
                devices.$set('points', data.points);
                devices.$set('periods', data.periods);
            }, 500);

            return devices;
        }
    };
});
