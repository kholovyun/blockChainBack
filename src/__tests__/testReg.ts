import bcrypt from 'bcrypt';
import { Users } from '../models/user';
import { mongoDB } from '../repositories/mongoDB';

jest.mock('bcrypt');
jest.mock('../models/user');

describe('MongoDB Tests', () => {
  beforeAll(async () => {
    await mongoDB.init();
  });

  afterAll(async () => {
    await mongoDB.close();
  });

  describe('Login Tests', () => {
    it('should return user data if username and password are correct', async () => {
      const mockedUser = {
        _id: 'testid',
        username: 'testuser',
        password: await bcrypt.hash('testpassword', 10),
      };

      const mockedCompare = jest.fn().mockResolvedValue(true);

      Users.findOne = jest.fn().mockResolvedValue(mockedUser);
      bcrypt.compare = mockedCompare;

      const userInfo = { username: 'testuser', password: 'testpassword' };
      const response = await mongoDB.login(userInfo);

      expect(response.data).toBeDefined();
      expect(response.message).toBe('Accepted');
      expect(response.data?.username).toBe('testuser');
      expect(response.data?.token).toBeDefined();
    });

    it('should throw an error if username is not found', async () => {
      Users.findOne = jest.fn().mockResolvedValue(null);

      const userInfo = { username: 'nonexistentuser', password: 'testpassword' };
      const response = await mongoDB.login(userInfo);

      expect(response.data).toBeUndefined();
      expect(response.message).toBe('Not found');
    });

    it('should throw an error if password is incorrect', async () => {
      const mockedUser = {
        _id: 'testid',
        username: 'testuser',
        password: await bcrypt.hash('testpassword', 10),
      };

      const mockedCompare = jest.fn().mockResolvedValue(false);

      Users.findOne = jest.fn().mockResolvedValue(mockedUser);
      bcrypt.compare = mockedCompare;

      const userInfo = { username: 'testuser', password: 'wrongpassword' };
      const response = await mongoDB.login(userInfo);

      expect(response.data).toBeUndefined();
      expect(response.message).toBe('Wrong password');
    });
  });
});