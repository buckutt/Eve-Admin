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
                    devices                 : [],
                    points                  : [],
                    periods                 : [],

                    // Edit
                    deviceToEdit            : null,
                    deviceToEditPeriodPoints: null,
                    pointToAdd              : null,
                    periodToAdd             : null,

                    // Add
                    deviceToAddName         : '',
                    deviceDoubleValidation  : false,
                    deviceOffline           : false,
                    deviceShowPicture       : false
                },
                methods: {
                    /**
                     * Edits a device
                     * @param {Object} device The device
                     */
                    editDevice(device) {
                        console.log(device);
                        let clonedDevice              = clone(device);
                        this.deviceToEdit             = clonedDevice;
                        this.deviceToEditPeriodPoints = clonedDevice.periodPoints;
                    },

                    /**
                     * Removes a point from the editing device
                     * @param {Object} point The point
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
                        this.pointToAdd  = null;
                        this.periodToAdd = null;
                    },

                    /**
                     * Removes a device
                     * @param {Object} device The device
                     */
                    removeDevice(device) {
                        this.devices.splice(this.devices.indexOf(device), 1);
                    },

                    /**
                     * Creates a device
                     */
                    createDevice() {
                        this.devices.push({
                            createdAt       : new Date(),
                            name            : this.deviceToAddName,
                            fingerprint     : '',
                            isRemoved       : false,
                            doubleValidation: this.deviceDoubleValidation,
                            offline         : this.deviceOffline,
                            showPicture     : this.deviceShowPicture,
                            periodPoints    : [],
                            point           : {},
                            points          : []
                        });
                    }
                }
            });

            setTimeout(() => {
                // Todo set point from points (get the more accurate period)
                let dataDevices = data.devices.map(device => device);
                devices.devices = dataDevices;
                devices.points  = data.points;
                devices.periods = data.periods;
            }, 500);

            return devices;
        }
    };
});
