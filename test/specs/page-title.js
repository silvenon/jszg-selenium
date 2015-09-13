import assert from 'assert';

describe('page', () => {
  it('should have the expected class', () => {
    return browser
      .url('/')
      .getAttribute('h1', 'class').then((klass) => {
        assert.equal(klass, 'jszg');
      });
  });
});
