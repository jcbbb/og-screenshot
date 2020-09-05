const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const getDimensions = (viewport) => {
    const [width, height] = viewport.split('x').map(Number);

    return [width, height];
};

const sanitazeUrl = (dirty) => {
    return dirty.replace(URL_REGEX, '');
};

module.exports = {
    getDimensions,
    sanitazeUrl,
};
