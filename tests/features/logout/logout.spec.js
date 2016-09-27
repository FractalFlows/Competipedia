import url from 'url'

describe('Logout @watch', () => {
  const host = 'http://localhost:3000'
  before(() => {
    server.call('dev/resetDatabase')
    server.call('dev/createUsers')

    browser.url(host)
    browser
      .timeoutsAsyncScript(5000)
      .executeAsync(done => {
        Meteor.loginWithPassword('normal-user@gmail.com', 'password', () => {
          done()
        })
      })
  })

  it('should redirect user to landing always', () => {
    browser
      .url( url.resolve(host, '/search/test') )
      .waitForVisible('#login-dropdown-list')

    browser
      .click('#login-dropdown-list')
      .click('#login-dropdown-list .js-logout')

    browser.waitUntil(() => {
      return browser.getUrl() === url.resolve(host, '/')
    }, 4000, 'expected user to be redirected to /')
  })
})
