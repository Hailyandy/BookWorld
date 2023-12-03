// user.cy.js
// import { BaseEntity } from '~/entity/base/baseEntity'
// import { UserEntity } from '~/entity'
describe('UserEntity', () => {
    it('initializes all properties', () => {
        const testData = {
            id: 1,
            username: 'sample_username',
            name: 'Sample User',
            email: 'sample@example.com',
            phone: '123-456-7890',
            birthDate: '1990-01-01',
            urlAvatar: 'https://example.com/avatar.jpg',
            address: '123 Main St, City, Country',
            enabled: true,
            friendship: 'a'
        }

        cy.task('getUserEntity', testData).then(user => {

            expect(user).to.have.property('id', testData.id)
            expect(user).to.have.property('username', testData.username)
            expect(user).to.have.property('email', testData.email)
            expect(user).to.have.property('phone', testData.phone)
            expect(user).to.have.property('birthDate', testData.birthDate)
            expect(user).to.have.property('urlAvatar', testData.urlAvatar)
            expect(user).to.have.property('address', testData.address)
            expect(user).to.have.property('enabled', testData.enabled)
            expect(user).to.have.property('friendship', testData.friendship)
            // Assert other fields

        })

    })

    // it('extends BaseEntity class', () => {
    //     cy.task('getUserEntity').then(user => {
    //         expect(user).to.be.instanceOf(BaseEntity)
    //     })

    // })
})
// describe('User', () => {

//     it('creates with correct name and age', () => {
//         cy.task('createUserJava', ['John', 20]).then(user => {
//             expect(user).to.have.property('name', 'John')
//             expect(user).to.have.property('age', 20)
//         })
//     })

//     it('gets name', () => {
//         cy.task('getUserJava', 'Mary').then(user => {
//             expect(user.getName()).to.eq('Mary')
//         })
//     })

// })
