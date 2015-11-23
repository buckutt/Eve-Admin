'use strict';

/* global define */

define('guid', require => {
    const Vue = require('vue');

    Vue.component('guid', {
        props   : [
            'value'
        ],
        template: `<span :title="value">{{ value.slice(0, 10) }}…</span>`
    });
});
