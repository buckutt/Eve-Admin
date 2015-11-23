'use strict';

/* global define */

define('credit', require => {
    const Vue = require('vue');

    Vue.filter('credit', (credit, divide) => {
        let newCredit = (divide) ? (credit / 100) : credit;
        newCredit = newCredit.toFixed(2);

        return `${newCredit}€`;
    });
});
