const capitalize = require('../utilities/capitalize')

test('Capitalize correctly', () => {
  expect(capitalize('bulbasaur')).toBe('Bulbasaur')
})
