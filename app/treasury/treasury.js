'use strict';

/* global define, fuzzy */

define('treasury', require => {
    const Vue    = require('vue');
    const view   = require('text!treasury.html!strip');
    require('fuzzy');

    return {
        view,
        vm: $el => {
            let treasury = new Vue({
                el     : $el,
                data   : {
                    customDate          : true,
                    activePeriodIndex   : 0,
                    activePeriod        : 'Période personnalisée',
                    activeFundationIndex: 0,
                    activeFundation     : 'Toutes les assos',
                    activePointIndex    : 0,
                    activePoint         : 'Toutes les points',
                    searchItem          : '',
                    purchases           : [],
                    batchPurchases      : [],
                    totalPurchases      : 0
                },
                methods: {
                    changePeriod   : index => {
                        treasury.activePeriod      = treasury.$$.periodDropdown.children[index + 1].innerText;
                        treasury.activePeriodIndex = index;
                        treasury.customDate        = (index === 0);
                    },
                    changeFundation: index => {
                        treasury.activeFundation      = treasury.$$.fundationsDropdown.children[index + 1].innerText;
                        treasury.activeFundationIndex = index;
                    },
                    changePoint    : index => {
                        treasury.activePoint      = treasury.$$.pointsDropdown.children[index + 1].innerText;
                        treasury.activePointIndex = index;
                    }
                }
            });

            treasury.$watch('searchItem', () => {
                let purchases = treasury.batchPurchases.slice().filter(purchase => {
                    let sellerMatch  = fuzzy.test(treasury.searchItem, purchase.seller);
                    let buyerMatch   = fuzzy.test(treasury.searchItem, purchase.buyer);
                    let articleMatch = fuzzy.test(treasury.searchItem, purchase.article);
                    let amountMatch  = parseFloat(treasury.searchItem) * 100 === purchase.amount;

                    return sellerMatch || buyerMatch || articleMatch || amountMatch;
                });

                treasury.$set('purchases', purchases);

                if (purchases.length === 0) {
                    treasury.$set('totalPurchases', 0);

                    return;
                }

                treasury.$set('totalPurchases', purchases.reduce((a, b) =>
                    ({
                        amount: a.amount + b.amount
                    })
                ).amount);
            });

            setTimeout(() => {
                let purchases = [
                    {
                        seller   : 'Lucas Soulier',
                        buyer    : 'Gabriel Juchault',
                        article  : 'Kinder Delice',
                        point    : 'Foyer',
                        fundation: 'BDE',
                        amount   : 100
                    },
                    {
                        seller   : 'Lucas Soulier',
                        buyer    : 'Gabriel Juchault',
                        article  : 'Kinder Delice',
                        point    : 'Foyer',
                        fundation: 'BDE',
                        amount   : 200
                    },
                    {
                        seller   : 'Lucas Soulier',
                        buyer    : 'Gabriel Juchault',
                        article  : 'Kinder Delice',
                        point    : 'Foyer',
                        fundation: 'BDE',
                        amount   : 150
                    },
                    {
                        seller   : 'Lucas Soulier',
                        buyer    : 'Gabriel Juchault',
                        article  : 'Kinder Delice',
                        point    : 'Foyer',
                        fundation: 'BDE',
                        amount   : 100
                    }
                ];
                treasury.$set('batchPurchases', purchases);
                treasury.$set('purchases', purchases);
                treasury.$set('totalPurchases', purchases.reduce((a, b) =>
                    ({
                        amount: a.amount + b.amount
                    })
                ).amount);
            }, 500);

            require('datetimepicker')();

            return treasury;
        }
    };
});
