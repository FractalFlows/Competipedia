describe('Logout', () => {
  before(() => {
    server.call('dev/seedUsers')

    browser.executeAsync(done => {
      Meteor.loginWithPassword('user@gmail.com', 'password', () => {
        done()
      })
    })
  })

  it('should redirect user to landing always', () => {
    browser.url()
  })
})
