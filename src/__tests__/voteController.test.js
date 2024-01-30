const Vote = require('../api/models/voteModel');
const voteController = require('../api/controllers/voteController');

// Mocking the Vote model methods
jest.mock('../api/models/voteModel');

describe('Vote Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });



  it('should create a new vote', async () => {
    const req = {
        params: {
            sessionId: '65b8c5f65e5e4aabe9faaee4', // Remplacez par un ID de session réel
        },
        body: {
            music_id: '65b8b6b3b9dc6d83c61f1ae5', // Remplacez par un ID de musique réel
        },
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjhiNjkxYjlkYzZkODNjNjFmMWFlMiIsImVtYWlsIjoidGVzdEB0ZXN0LmZyIiwicm9sZSI6ZmFsc2UsImlhdCI6MTcwNjYwNDE4NSwiZXhwIjoxNzA2NjQwMTg1fQ.-xQjrTbYFt_adndFs6pqgh6m1fZKKKP6A_zhMZun09o', // Remplacez par votre token JWT réel
        },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await voteController.createVote(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: expect.stringContaining('Vote enregistré avec succès') });
  });



  it('should update a vote', async () => {
    const req = {
        params: {
            sessionId: '65b8c5f65e5e4aabe9faaee4', // Remplacez par un ID de session réel
            voteId: '65b8c6125e5e4aabe9faaee8', // Remplacez par un ID de vote réel
        },
        body: {
            upvote: true,
        },
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjhiNjkxYjlkYzZkODNjNjFmMWFlMiIsImVtYWlsIjoidGVzdEB0ZXN0LmZyIiwicm9sZSI6ZmFsc2UsImlhdCI6MTcwNjYwNDE4NSwiZXhwIjoxNzA2NjQwMTg1fQ.-xQjrTbYFt_adndFs6pqgh6m1fZKKKP6A_zhMZun09o', // Remplacez par votre token JWT réel
        },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await voteController.updateVote(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: expect.stringContaining('Vote mis à jour avec succès') });
  });



  it('should delete a vote', async () => {
    const req = {
        params: {
            sessionId: '65b8c5f65e5e4aabe9faaee4', // Remplacez par un ID de session réel
            voteId: '65b8c6125e5e4aabe9faaee8' // Remplacez par un ID de vote réel
        },
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjhiNjkxYjlkYzZkODNjNjFmMWFlMiIsImVtYWlsIjoidGVzdEB0ZXN0LmZyIiwicm9sZSI6ZmFsc2UsImlhdCI6MTcwNjYwNDE4NSwiZXhwIjoxNzA2NjQwMTg1fQ.-xQjrTbYFt_adndFs6pqgh6m1fZKKKP6A_zhMZun09o', // Remplacez par votre token JWT réel
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await voteController.deleteVote(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: expect.stringContaining('Vote supprimé avec succès') });
  });



  it('should get all votes', async () => {
    const req = {
        params: {
            sessionId: '65b8c5f65e5e4aabe9faaee4', // Remplacez par un ID de session réel
        },
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjhiNjkxYjlkYzZkODNjNjFmMWFlMiIsImVtYWlsIjoidGVzdEB0ZXN0LmZyIiwicm9sZSI6ZmFsc2UsImlhdCI6MTcwNjYwNDE4NSwiZXhwIjoxNzA2NjQwMTg1fQ.-xQjrTbYFt_adndFs6pqgh6m1fZKKKP6A_zhMZun09o', // Remplacez par votre token JWT réel
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await voteController.getAllVotes(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });



  it('should get a vote by ID', async () => {
    const req = {
        params: {
            sessionId: '65b8c5f65e5e4aabe9faaee4', // Remplacez par un ID de session réel
            voteId: '65b8c6125e5e4aabe9faaee8', // Remplacez par un ID de vote réel
        },
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjhiNjkxYjlkYzZkODNjNjFmMWFlMiIsImVtYWlsIjoidGVzdEB0ZXN0LmZyIiwicm9sZSI6ZmFsc2UsImlhdCI6MTcwNjYwNDE4NSwiZXhwIjoxNzA2NjQwMTg1fQ.-xQjrTbYFt_adndFs6pqgh6m1fZKKKP6A_zhMZun09o', // Remplacez par votre token JWT réel
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await voteController.getVoteById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });
})