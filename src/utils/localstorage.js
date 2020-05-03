function setStorage(key, value, expires) {
    if (expires === undefined || expires === null) {
        expires = 600000; // Default set to 10 mins
    } else {
        expires = Math.abs(expires);
    }

    const schedule = Date.now() + expires;
    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(key + "_expiresIn", schedule);
    return true;
}

function removeStorage(key) {
    localStorage.removeItem(key);
    localStorage.removeItem(key + "_expiresIn");
}

function getStorage(key) {
    const now = Date.now();
    let expiresIn = localStorage.getItem(key + "_expiresIn");
    if (expiresIn === undefined || expiresIn === null) {
        expiresIn = 0;
    }

    if (expiresIn < now) {
        removeStorage(key);
        return null;
    } else {
        return JSON.parse(localStorage.getItem(key));
    }
}

export { setStorage, removeStorage, getStorage };
