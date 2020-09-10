const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const getDimensions = (viewport) => {
    const [width, height] = viewport.split('x').map(Number);

    return [width, height];
};

const sanitazeUrl = (dirty) => {
    return dirty.replace(URL_REGEX, '');
};

const getUrlFromPathname = (path) => {
    let url = path.slice(1);
    if (url.startsWith('http') || url.startsWith('https')) {
        return url;
    }

    return 'https://' + url;
};

module.exports = {
    getDimensions,
    sanitazeUrl,
    getUrlFromPathname,
};
