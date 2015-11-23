'use strict';

/* global define, document */

define('datetimepicker', require => {
    return () => {
        const jQuery = require('jquery');

        const $datetimes = [].slice.call(document.querySelectorAll('input.datetimepicker'));
        $datetimes.forEach(function ($datetime) {
            jQuery($datetime).datetimepicker({
                format        : 'dd/mm/yyyy hh:ii',
                weekStart     : 1,
                todayHighlight: true,
                language      : 'fr',
                minuteStep    : 15
            });
        });
    };
});
