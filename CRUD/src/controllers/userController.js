import {
    createUserService,
    getAllUserService,
    getUserByIdService,
    updateUserService,
    deleteUserService
} from '../models/userModel.js';
const handleResponse=(res, status,message, data) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};
export const createUser = async (req, res, next) => {
    const { email, name } = req.body;
    try {
const newUser = await createUserService(name, email);
if (!newUser) {
    return handleResponse(res, 400, "User creation failed", null);
}
handleResponse(res, 201, "User created successfully", newUser);
    } catch (error) {
        next(error);
        console.error("Error creating user:", error);
      
    }

};
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUserService();
        if (users.length === 0) {
            return handleResponse(res, 404, "No users found", null);
        }
        handleResponse(res, 200, "Users retrieved successfully", users);
    } catch (error) {
        next(error);
        console.error("Error retrieving users:", error);
       
    }
};
export const getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await getUserByIdService(id);
        if (!user) {
            return handleResponse(res, 404, "User not found", null);
        }
        handleResponse(res, 200, "User retrieved successfully", user);
    } catch (error) {
        next(error);
        console.error("Error retrieving user:", error);
    
    }
};
export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {

        const updatedUser = await updateUserService(id, name, email);
        if (!updatedUser) {
            return handleResponse(res, 404, "User not found", null);
        }
        handleResponse(res, 200, "User updated successfully", updatedUser);
    } catch (error) {
        next(error);
        console.error("Error updating user:", error);
    
    }
};
export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUserService(id);
        if (!deletedUser) {
            return handleResponse(res, 404, "User not found", null);
        }
        handleResponse(res, 200, "User deleted successfully", deletedUser);
    } catch (error) {
        next(error);
        console.error("Error deleting user:", error);
       
    }
};
