const baseConfig = {
    port: 3000,
    front: 'localhost:8084',
    secrets: {
        jwt: 'bw5Neu7c',
        crypt: '3QgdarQ4GG2WtvtF'
    },
    db: {
        url: 'mongodb://localhost/hypertube'
    }
};

export default baseConfig;
