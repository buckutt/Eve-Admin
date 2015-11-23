'use strict';

/* global define */

define('items', require => {
    const Vue    = require('vue');
    const data   = require('data');
    const view   = require('text!items.html!strip');

    return {
        view,
        vm: $el => {
            let items = new Vue({
                el  : $el,
                data: {
                    articles  : [],
                    categories: []
                }
            });

            setTimeout(() => {
                items.$set('articles', data.articles);
                items.$set('categories', data.category);
            }, 500);

            return items;
        }
    };
});
