'use strict';

/* global define, page */

const debug = true;

define('login', require => {
    const Vue    = require('vue');
    const jQuery = require('jquery');
    const view   = require('text!login.html!strip');

    return {
        view,
        vm: () => {
            let login = new Vue({
                el     : 'main',
                data   : {
                    disableInput: false,
                    failedAuth  : false,
                    remember    : true
                },
                methods: {
                    dismissAlert: () => {
                        this.failedAuth = false;
                    },
                    login       : () => {
                        const email    = this.email;
                        const password = this.password;
                        const remember = this.remember;

                        this.disableInput = true;

                        setTimeout(() => {
                            if (debug) {
                                page('/dashboard');
                            } else {
                                this.failedAuth = true;
                            }
                            this.disableInput = false;
                        }, 500);
                    }
                }
            });

            login.$watch('failedAuth', failedAuth => {
                if (failedAuth === true) {
                    jQuery(login.$$.failedAuth).slideDown();
                } else {
                    jQuery(login.$$.failedAuth).slideUp();
                }
            });

            return login;
        }
    };
});
