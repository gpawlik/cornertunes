export function removeClass(selector, className) {
    const elements = document.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove(className);
    }
};

export function addClass(selector, className) {
    const elements = document.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className);
    }
};

export function toggleClass(elements, className, force) {
    if (force === true) {
        this.addClass(elements, className);
    } else if (force === false) {
        this.removeClass(elements, className);
    } else {
        if (elements && elements.constructor === NodeList) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.toggle(className);
            }
        } else {
            elements.classList.toggle(className);
        }
    }
};

export function addEvent(selector, type, callback, bubble=false) {
    return document.addEventListener(type, function(e) {            
        const elements = document.querySelectorAll(selector);
        if (elements) {
            let el = e.target, 
                index = -1;
            while (el && ((index = Array.prototype.indexOf.call(elements, el)) === -1)) {
                el = el.parentElement;
            }
            if (index > -1) {
                callback.call(el, e);
            }
        }                        
    }, bubble);
};

export function onEvent(element, type, callback, bubble) {
    if (!element) {
        return;
    }
    document.addEventListener(type, function(event) {
        if (event.target === element || event.target.id === element) {
            callback.apply(event.target, [event]);
        }
    }, bubble || false);
};

export function triggerEvent(el, eventName, options) {
    let event;
    if (window.CustomEvent) {
        event = new CustomEvent(eventName, { detail: options });
    } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, true, true, options);
    }
    el.dispatchEvent(event);
};

export function getEl(selector, all=false) {
    if(all) {
        return document.querySelectorAll(selector);
    }
    return document.querySelector(selector)
};

export function getJsonp(uri){
    return new Promise(function(resolve, reject){
        const id = '_' + Math.round(10000 * Math.random());
        const callbackName = 'jsonp_callback_' + id;
        window[callbackName] = function(data){
            delete window[callbackName];
            const ele = document.getElementById(id);
            ele.parentNode.removeChild(ele);
            resolve(data);
        }

        const src = uri + '&callback=' + callbackName;
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.addEventListener('error', reject);
        (document.getElementsByTagName('head')[0] || document.body || document.documentElement).appendChild(script);
    })
}