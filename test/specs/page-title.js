import assert from 'assert';

describe('page', () => {
  it('should have the correct page title', () => {
    return browser
      .url('/')
      .getTitle().then((title) => {
        assert.equal(title, 'JavaScript Zagreb');
      });
  });
});
