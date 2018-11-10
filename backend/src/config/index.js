import merge from 'lodash.merge'

const baseConfig = {
    port: 3000,
    secrets: {},
    db: {
        url: 'mongodb://localhost/hypertube'
    }
};

let envConfig = {
    disableAuth: true,
    secrets: {
        JWT_SECRET: 'bw5Neu7c'
    }
};

export default merge(baseConfig, envConfig);
