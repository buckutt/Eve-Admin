'use strict';

/* global document, define */

define('dashboard', require => {
    const Vue    = require('vue');
    const view   = require('text!dashboard.html!strip');

    const components = [
        require('devices'),
        require('items'),
        require('treasury'),
        require('rights'),
        require('periods')
    ];

    return {
        view,
        vm: () => {
            let dashboard = new Vue({
                el     : 'main',
                data   : {
                    page: 0
                },
                methods: {
                    changePage: e => {
                        dashboard.page = parseInt(e.target.dataset.index, 10);

                        Vue.nextTick(() => {
                            const $viewPort = document.querySelector('.page > .panel > .panel-body');
                            const subcontroller = components[dashboard.page];
                            $viewPort.innerHTML = subcontroller.view;

                            subcontroller.vm('.page > .panel > .panel-body');
                        });
                    }
                }
            });

            // Init first page
            dashboard.changePage({
                target: {
                    dataset: {
                        index: 0
                    }
                }
            });

            return dashboard;
        }
    };
});
