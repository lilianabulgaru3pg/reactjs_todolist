const FbMock = jest.genMockFromModule('../firebase.js');

FbMock.signInWithEmailAndPassword = jest
  .fn()
  .mockRejectedValue(new Error('test'));

export const { signInWithEmailAndPassword } = FbMock;
export const { isAuthenticated } = FbMock;
export const { signOut } = FbMock;
export const { FirebaseContext } = FbMock;
