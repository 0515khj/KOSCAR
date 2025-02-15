module.exports = function override(config) {
    config.resolve.fallback = {
        buffer: require.resolve('buffer/'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        vm: require.resolve('vm-browserify'),
    };
    return config;
};