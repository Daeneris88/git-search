const retrieveUser = require('./retrieveUser.js')

describe('logic - retrieve user', () => {
    let data

    beforeEach(() => {
        data = `name-${Math.random()}`
    })
    it('should succeed on matching nickname with username', () =>
        retrieveUser('daeneris88')
        .then(_user => {
            const { user, repos } = _user
            expect(user.login).toBe('Daeneris88')
            expect(repos).toBeDefined()
        })
    )

    it('should fail on empty nickname', () =>
        expect(async() =>{ 
            try {
                await retrieveUser('')
            } catch ({ message }) {
                expect(message).toBe('Does not exist')
            }      
        })
    )

    it('should fail on wrong nickname', () =>
        expect(async() =>{ 
            try {
                await retrieveUser(data)
            } catch ({ message }) {
                expect(message).toBe('Does not exist')
            }      
        })
    )
})