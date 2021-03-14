const MSVI_API = require('../index')

describe('Interact with Microsoft Video Indexer API', () => {

    let msvpapi
    beforeAll(() => {
        msvpapi = MSVI_API({
            location: process.env.LOCATION,
            accountId: process.env.ACCOUNT_ID,
            subscriptionKey: process.env.SUBSCRIPTION_KEY
        })
    });

    describe('Can get project auth token', () => {
        it('Should return the project\'s auth token', async () => {
            const token = await msvpapi().fetchCachedToken()

            console.log(token)

            expect(token).toBeTruthy();
        });
        it('can forceRefresh the project\'s auth token', async () => {
            const token = await msvpapi().fetchCachedToken(true)

            console.log(token)

            expect(token).toBeTruthy();
        });
    })
})
