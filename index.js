
class EventProxy {
    proxies = {};
    onceProxies = {};
    on = (eventName, handler) => {
        if (this.proxies[eventName]) {
            return this.proxies[eventName].push(handler);
        }
        this.proxies[eventName] = [handler];
    };
    once = (eventName, handler) => {
        if (this.onceProxies[eventName]) {
            return this.onceProxies[eventName].push(handler);
        }
        this.onceProxies[eventName] = [handler];
    };
    emit = (eventName, ...args) => {
        if (this.proxies[eventName]) {
            this.proxies[eventName]
                .forEach(handler => handler(...args));
        }
        if (this.onceProxies[eventName]) {
            this.onceProxies[eventName]
                .forEach(handler => handler(...args));
            this.onceProxies[eventName] = [];
        }
    };
    cancel = (eventName, handler) => {
        if (!this.proxies[eventName]) return;
        this.proxies[eventName] = this.proxies[eventName]
            .filter(h => h !== handler);
    };
    cancelOnce = (eventName, handler) => {
        if (!this.onceProxies[eventName]) return;
        this.onceProxies[eventName] = this.onceProxies[eventName]
            .filter(h => h !== handler);
    };
    cancelAll = (eventName) => {
        if (!this.proxies[eventName]) return;
        this.proxies[eventName] = [];
    };
    cancelAllOnce = (eventName) => {
        if (!this.onceProxies[eventName]) return;
        this.onceProxies[eventName] = [];
    }
}


export default EventProxy;
if (module) {
    module.export = EventProxy;
}
