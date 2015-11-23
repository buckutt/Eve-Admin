'use strict';

/* global requirejs, define, document */

requirejs.config({
    shim : {
        bootstrap: {
            deps: [
                'jquery'
            ]
        },
        bdtp     : {
            deps: [
                'jquery'
            ]
        },
        bdtpfr   : {
            deps: [
                'bdtp'
            ]
        }
    },
    paths: {
        jquery         : '/bower_components/jquery/dist/jquery.min',
        bootstrap      : '/bower_components/bootstrap/dist/js/bootstrap.min',
        vue            : '/bower_components/vue/dist/vue.min',
        page           : '/bower_components/page/page',
        text           : '/bower_components/text/text',
        bdtp           : '/bower_components/smalot-bootstrap-datetimepicker/js/bootstrap-datetimepicker',
        bdtpfr         : '/bower_components/smalot-bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.fr',
        fuzzy          : '/bower_components/fuzzy/fuzzy-min',

        data           : '/app/utils/buckuttData',
        datetimepicker : '/app/utils/datetimepicker',
        clone          : '/app/utils/clone',
        guid           : '/app/filters/guid',
        credit         : '/app/filters/credit',
        date           : '/app/filters/date',
        login          : '/app/login/login',
        dashboard      : '/app/dashboard/dashboard',
        err            : '/app/err/err',
        devices        : '/app/devices/devices',
        filterBestPoint: '/app/devices/filterBestPoint',
        items          : '/app/items/items',
        treasury       : '/app/treasury/treasury',
        rights         : '/app/rights/rights',
        periods        : '/app/periods/periods'
    }
});

define('app', require => {
    const jQuery = require('jquery');
    const page   = require('page');

    const login     = require('login');
    const dashboard = require('dashboard');
    const err       = require('err');

    const $viewPort = document.querySelector('main');

    jQuery.fx.speeds._default = 280;

    require('bootstrap');
    require('text');
    require('credit');
    require('bdtp');
    require('bdtpfr');
    require('filterBestPoint');
    require('guid');

    const controllers = {
        login,
        'err/:err': err,
        dashboard
    };

    const callController = (route, ...params) =>
        () => {
            const controller = controllers[route];
            $viewPort.innerHTML = controller.view;
            controller.vm(...params);
        };

    // page('/', callController('login'));
    page('/', callController('dashboard'));
    page('/dashboard', callController('dashboard'));
    page(callController('err/:err', '404', 'Page non trouvée'));
    page();

    this.page = page;
});
