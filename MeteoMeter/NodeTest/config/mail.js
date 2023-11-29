module.exports = {
    devSMTPConfig: {
        pool: DevIsPoolNo,
        host: 'ggggggggggggggggggg',
        port: ggggggggggggggggggggggggggggggg,
        secure: DevIsSecureNo, 
        auth: {
            user: 'ggggggggggggggggggggggggggg',
            pass: 'gggggggggggggggggggggggggggggggggg'
        },
        from:'gggggggggggggggggggggggggggg'
    },

    prodSMTPConfig: {
        pool: ProdIsPoolYes,
        host: 'ggggggggggggggggggggggggggggggggg',
        port: gggggggggggggggggggggggggggggggggggggg,
        secure: ProdIsSecureYes,
        auth: {
            user: 'ggggggggggggggggggggggggggggggggg',
            pass: 'ggggggggggggggggggggggggggggggggggggggggt'
        },
        from:'gggggggggggggggggggggggg'
    }
};