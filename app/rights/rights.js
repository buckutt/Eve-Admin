'use strict';

/* global define */

define('rights', require => {
    const Vue    = require('vue');
    const view   = require('text!rights.html!strip');

    return {
        view,
        vm: $el => {
            let rights = new Vue({
                el  : $el,
                data: {}
            });

            return rights;
        }
    };
});
