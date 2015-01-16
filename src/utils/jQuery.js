/*
    Redshift jQuery plugin
    
    Provides access to .play, .move and .track properties on an jQuery object.
    Uses that jQuery object to store a unqiue Redshift instance.
    
    .redshift() method used for other Redshift functions, ie $('#element').redshift('stop')
*/
"use strict";

var loadPlugins = function (redshift) {
    var KEY = require('../opts/keys.js'),
        utils = require('../utils/utils.js'),

        /*
            Get Redshift instance from jQuery object
            
            @param [jQuery element]
        */
        getInstance = function ($element) {
            var instance = $element.data(KEY.REDSHIFT);

            if (!instance) {
                instance = redshift.get();
                instance.data(KEY.JQUERY_ELEMENT, $element);
                $element.data(KEY.REDSHIFT, instance);
            }
            
            return instance;
        },

        /*
            Execute Action function

            @param [jQuery element]: jQuery element to check for Redshift instance
            @param [string]: Action function to call
            @param [...arguments]
        */
        execute = function ($element, action, arg1, arg2, arg3) {
            $element.each(function () {
                getInstance($(this))[action](arg1, arg2, arg3);
            });
        };
        
    $.fn.play = function () {
        execute(this, 'play', arguments[0], arguments[1]);
        
        return this;
    };
    
    $.fn.run = function () {
        execute(this, 'run', arguments[0], arguments[1]);

        return this;
    };
    
    $.fn.track = function () {
    console.log('test');
        execute(this, 'track', arguments[0], arguments[1], arguments[2]);
console.log(arguments);
        return this;
    };
    
    $.fn.redshift = function (action) {
        if (action) {
            execute(this, action, arguments[1], arguments[2]);
            return this;
        } else {
            return getInstance($(this));
        }
    };
};

module.exports = {
    load: function (redshift) {
    console.log('test');
        if (window.jQuery) {
            loadPlugins(redshift);
        }
    }
};