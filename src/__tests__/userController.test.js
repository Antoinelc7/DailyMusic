const UserController = require('../api/controllers/userController');
const User = require('../api/models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('UserController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should register a new user', async () => {
    const req = {
      body: {
        email: 'testuser@example.com',
        password: 'testpassword',
        role: false,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
    
    jest.spyOn(User.prototype, 'save').mockResolvedValue({
      email: req.body.email,
      password: 'hashedPassword',
      role: req.body.role,
    });

    await UserController.userRegister(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
        message: `Utilisateur créé: ${req.body.email}`,
      });      
  });

  test('Should handle errors during user registration', async () => {
    const req = {
      body: {
        email: 'testuser@example.com',
        password: 'testpassword',
        role: false,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(bcrypt, 'genSalt').mockRejectedValue(new Error('Salt error'));
    jest.spyOn(bcrypt, 'hash').mockRejectedValue(new Error('Hashing error'));

    await UserController.userRegister(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Requête invalide' });
  });
});

describe('UserController', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('Should log in user and return a bearer token', async () => {
      const mockUser = {
        _id: 'userId',
        email: 'testuser@example.com',
        password: 'hashedPassword',
        role: false,
      };
  
      const req = {
        body: {
          email: 'testuser@example.com',
          password: 'testpassword',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
  
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
  
      jest.spyOn(jwt, 'sign').mockReturnValue('mockToken');
  
      await UserController.userLogin(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: 'mockToken' });
    });
  
    test('Should handle invalid login credentials', async () => {
      const req = {
        body: {
          email: 'testuser@example.com',
          password: 'invalidpassword',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
  
      await UserController.userLogin(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'utilisateur non trouvé' });
    });
  
    test('Should handle incorrect password', async () => {
      const req = {
        body: {
          email: 'testuser@example.com',
          password: 'incorrectpassword',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(User, 'findOne').mockResolvedValue({
        _id: 'userId',
        email: 'testuser@example.com',
        password: 'hashedPassword',
        role: false,
      });
  
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
  
      await UserController.userLogin(req, res);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email ou mot de passe incorrect' });
    });
  
    test('Should handle errors during login', async () => {
      const req = {
        body: {
          email: 'testuser@example.com',
          password: 'testpassword',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      jest.spyOn(User, 'findOne').mockRejectedValue(new Error('User find error'));
  
      await UserController.userLogin(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Une erreur s\'est produite lors du traitement' });
    });
});