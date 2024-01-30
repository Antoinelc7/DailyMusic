const VotingSession = require('../api/models/votingSessionModel');
const votingSessionController = require('../api/controllers/votingSessionController');

// Mocking the VotingSession model methods
jest.mock('../api/models/votingSessionModel');

// Mock the save method to return a mock session object
VotingSession.prototype.save = jest.fn().mockResolvedValue({
  _id: 'mockId',
  module_name: 'Test session',
  expiration_date: new Date(Date.now() + 7 * 60 * 60 * 1000),
  musics: [],
});

describe('Voting Session Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  
  it('should create a new session', async () => {
    const req = {
      body: {
        module_name: 'Test session',
      },
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjhiNjkxYjlkYzZkODNjNjFmMWFlMiIsImVtYWlsIjoidGVzdEB0ZXN0LmZyIiwicm9sZSI6ZmFsc2UsImlhdCI6MTcwNjYwNDE4NSwiZXhwIjoxNzA2NjQwMTg1fQ.-xQjrTbYFt_adndFs6pqgh6m1fZKKKP6A_zhMZun09o', // A remplacer par votre token JWT réel
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await votingSessionController.createSession(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: expect.stringContaining('Session créée: Test session') });
  });


  // Mock the find method to return a mock array of sessions
  VotingSession.find = jest.fn().mockResolvedValue([
    {
      _id: 'mockId1',
      module_name: 'Test session 1',
      expiration_date: new Date(Date.now() + 7 * 60 * 60 * 1000),
      musics: [],
    },
    {
      _id: 'mockId2',
      module_name: 'Test session 2',
      expiration_date: new Date(Date.now() + 7 * 60 * 60 * 1000),
      musics: [],
    },
  ]);

  // Now, when the find method is called in the getAllSessions function, it will return the above mock array of sessions

  it('should get all sessions', async () => {
    const req = {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjhiNjkxYjlkYzZkODNjNjFmMWFlMiIsImVtYWlsIjoidGVzdEB0ZXN0LmZyIiwicm9sZSI6ZmFsc2UsImlhdCI6MTcwNjYwNDE4NSwiZXhwIjoxNzA2NjQwMTg1fQ.-xQjrTbYFt_adndFs6pqgh6m1fZKKKP6A_zhMZun09o', // A remplacer par votre token JWT réel
        }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await votingSessionController.getAllSessions(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });



  it('should get a session by ID', async () => {
    const req = {
      params: {
        sessionId: '65b8c5f65e5e4aabe9faaee4',
      },
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjhiNjkxYjlkYzZkODNjNjFmMWFlMiIsImVtYWlsIjoidGVzdEB0ZXN0LmZyIiwicm9sZSI6ZmFsc2UsImlhdCI6MTcwNjYwNDE4NSwiZXhwIjoxNzA2NjQwMTg1fQ.-xQjrTbYFt_adndFs6pqgh6m1fZKKKP6A_zhMZun09o', // A remplacer par votre token JWT réel
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    VotingSession.findById.mockResolvedValueOnce({
        _id: '65b8c5f65e5e4aabe9faaee4',
        module_name: 'Test Session 1'
    });

    await votingSessionController.getSession(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });



  it('should delete a session by ID', async () => {
    const req = {
      params: {
        sessionId: '65b8c5f65e5e4aabe9faaee4',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    VotingSession.findByIdAndDelete.mockResolvedValueOnce({
        _id: '65b8c5f65e5e4aabe9faaee4',
        module_name: 'Test Session 1'
    });

    await votingSessionController.deleteSession(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Session supprimée avec succès!' });
  });
});
