import assert from 'assert';

describe('suite', () => {
  it('should have the correct class name', () => {
    return browser
      .url('/')
      .getAttribute('h1', 'class').then((klass) => {
        assert.equal(klass, 'jszg');
      });
  });
});
