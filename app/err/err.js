'use strict';

/* global define */

define('err', require => {
    const Vue    = require('vue');
    const view   = require('text!err.html!strip');

    return {
        view,
        vm: (code, message) => {
            let err = new Vue({
                el  : 'main',
                data: {
                    code,
                    message
                }
            });

            return err;
        }
    };
});
