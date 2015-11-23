'use strict';

/* global define */

define('periods', require => {
    const Vue    = require('vue');
    const view   = require('text!periods.html!strip');

    return {
        view,
        vm: $el => {
            let periods = new Vue({
                el  : $el,
                data: {}
            });

            require('datetimepicker')();

            return periods;
        }
    };
});
