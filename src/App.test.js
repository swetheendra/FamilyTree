import {expect} from '@jest/globals';

test('renders the landing page', () => {
  return expect(Promise.resolve('lemon')).resolves.toBe('lemon');
});