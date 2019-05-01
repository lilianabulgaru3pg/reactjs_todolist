jest.mock('../services/firebase');
let signInWithEmailAndPassword = require('./firebase');

describe('Firebase', () => {
  it(' has mock', () => {
    signInWithEmailAndPassword = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error('test')));
    return expect(signInWithEmailAndPassword()).rejects.toEqual(
      new Error('test')
    );
  });
});
