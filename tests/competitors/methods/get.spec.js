describe('Competitors @watch', () => {
  describe('Methods', () => {
    before(() => {
      server.call('dev/resetDatabase')
      server.call('dev/createCompanies')
      browser.url('http://localhost:3000')
    })

    it('should return the expected shape of data', () => {
      const companies = server.call('competitors.getAll')

      expect(companies).to.be.a('array')
    })
  })
})
