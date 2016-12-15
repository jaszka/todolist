exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['e2e/sample.e2e-spec.js'],
    baseUrl: 'http://localhost:9000/#/main/welcome',

    jasmineNodeOpts: {
        showColors: true,
        isVerbose: true,
        defaultTimeoutInterval : 5000000
    }
};