const StoreVarModules = {
    _localStorage(object, {
        path = "StoreVar/",
    } = {}) {
        function getLocalStorage(key) {
            return localStorage.getItem(path + key);
        }
        function setLocalStorage(key, value) {
            localStorage.setItem(path + key, value);
        }
        for (const key in object) {
            setLocalStorage(key, object[key]);
        }
        return new Proxy(object, {
            get: function (target, prop, receiver) {
                return getLocalStorage(prop);
            },
            set: function (target, prop, value, receiver) {
                setLocalStorage(prop, value);
                return true;
            },
        })
    }
}

function StoreVar({
    object = {},
    storeType
} = {}, moduleOptions = {}) {
    return StoreVarModules[`_${storeType}`](object, moduleOptions);
}

let storeVar = StoreVar({ object: { hi: 'hello' }, storeType: 'localStorage'});

console.log(storeVar.hi);
console.log(storeVar.text)