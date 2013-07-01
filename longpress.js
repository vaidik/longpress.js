/**
 * longpress.js
 *
 * longpress mouse event for desktop and mobile, similar to how they are in
 * native mobile applications.
 *
 * @name longpress
 * @version 0.1
 * @author Vaidik Kapoor
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, check out the README at:
 * http://github.com/vaidik/longpress.js/
 *
 * Copyright (c) 2008-2013, Vaidik Kapoor (kapoor [*dot*] vaidik -[at]- gmail [*dot*] com)
 */

(function() {
    // default configurations for longpress
    var config = {
        duration: 500,
    };

    // override default_config
    if (typeof longpress_config == "object") {
        for (var key in longpress_config) {
            config[key] = longpress_config[key];
        }
    }

    // custom longpress event
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent("longpress", true, true, {});

    var body = document.body;
    body.addEventListener('mousedown', mousedown_callback);
    body.addEventListener('touchstart', mousedown_callback);

    function mousedown_callback(e) {
        var mousedown_time = new Date().getTime();

        e.target.addEventListener('mouseup', mouseup_callback);
        e.target.addEventListener('touchstop', mouseup_callback);

        // dispatch longpress event after the default longpress duration timeout
        var timeout = setTimeout(function() {
            e.target.dispatchEvent(evt);

            // we don't need mouseup event handlers any more
            clean_mousup(e);
        }, config.duration);

        function mouseup_callback(e) {
            var click_duration = new Date().getTime() - mousedown_time;

            // if touch/click is released before longpress duration, clear the
            // timeout.
            if (click_duration < config.duration) {
                clearTimeout(timeout);
            } else {
                e.target.dispatchEvent(evt);
            }

            // we don't need mouseup event handlers any more
            clean_mousup(e);
        }

        // removes mouseup/touchup event handlers after successful longpress
        // event or release before timeout of longpress duration
        function clean_mousup(e) {
            e.target.removeEventListener('mouseup', mouseup_callback);
            e.target.removeEventListener('touchstop', mouseup_callback);
        }
    }
})();