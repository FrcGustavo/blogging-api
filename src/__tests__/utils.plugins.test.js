const slugify = require('../utils/plugins/slugify');

describe('utils - plugins', () => {
  describe('slugify', () => {
    test('should reaturn a slug', () => {
      const title = 'Hello This Is A Title For Create A Slug';
      const resultFake = 'hello-this-is-a-title-for-create-a-slug';
      const result = slugify(title);

      expect(result).toEqual(resultFake);
    });
  });
});
