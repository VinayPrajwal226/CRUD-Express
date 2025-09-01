
import {
    getUserByIdService
} from '../../models/userModel.js';
import { getUserById } from '../userController';


jest.mock("../../models/userModel.js", () => {
  const originalModule = jest.requireActual("../../models/userModel.js");
  return {
    __esModule: true,
    ...originalModule,
    getUserByIdService: jest.fn(),
  };
});

describe('getUserById() getUserById method', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: { id: '123' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('Happy paths', () => {
    it('should retrieve a user successfully when a valid ID is provided', async () => {
      // Arrange: Mock the service to return a user object
      const mockUser = { id: '123', name: 'John Doe', email: 'john@example.com' };
      getUserByIdService.mockResolvedValue(mockUser);

      // Act: Call the function
      await getUserById(req, res, next);

      // Assert: Check if the response is correct
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'User retrieved successfully',
        data: mockUser,
      });
    });
  });

  describe('Edge cases', () => {
    it('should return a 404 error when the user is not found', async () => {
      // Arrange: Mock the service to return null
      getUserByIdService.mockResolvedValue(null);

      // Act: Call the function
      await getUserById(req, res, next);

      // Assert: Check if the response is correct
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 404,
        message: 'User not found',
        data: null,
      });
    });

    it('should handle errors thrown by the service gracefully', async () => {
      // Arrange: Mock the service to throw an error
      const error = new Error('Service error');
      getUserByIdService.mockRejectedValue(error);

      // Act: Call the function
      await getUserById(req, res, next);

      // Assert: Check if the error is passed to the next middleware
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});