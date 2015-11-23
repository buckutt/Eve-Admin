'use strict';

/* global define */

define('date', require => {
    const Vue = require('vue');

    const pad2 = n => (n < 10) ? '0' + n : n.toString();
    const y    = n => n.toString().slice(2, 4);

    Vue.filter('date', date =>
        `${pad2(date.getDate())}/${pad2(date.getMonth())}/${y(date.getFullYear())} -` +
        `${pad2(date.getHours())}:${pad2(date.getMinutes())}`
    );
});
