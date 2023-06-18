import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/user.entity';
import authConfigMock from '@/config/mock/auth.config.mock';
import * as bcrypt from 'bcrypt';

const userRequest = {
  email: 'vuanhtai1997@gmail.com',
  password: '123456',
};
const userResponse = {
  id: 1,
  email: 'vuanhtai1997@gmail.com',
  password: '$2b$10$S8Z4H5MI3yoDJlthoUnuqecU.2DBPM.F0o8fiRiqi.CdosqcvcSU6',
} as User;

describe('AuthService', () => {
  let service: AuthService;
  let userRepo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
      imports: [
        JwtModule.register({
          secret: authConfigMock().jwtSecret,
          signOptions: { expiresIn: authConfigMock().jwtExpiryTime },
        }),
      ],
    })
      .overrideProvider(getRepositoryToken(User))
      .useClass(Repository)
      .compile();

    service = module.get<AuthService>(AuthService);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    beforeEach(() => {
      jest.spyOn(userRepo, 'save').mockResolvedValueOnce(userResponse);
    });

    it('should return a user', async () => {
      jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(null);

      const user = await service.createUser(userRequest);
      expect(user).toBeDefined();
      expect(user.email).toEqual(userResponse.email);
    });

    it('should throw an error if user already exists', async () => {
      jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(userResponse);

      await expect(
        service.createUser({
          email: 'vuanhtai1997@gmail.com',
          password: '123456',
        })
      ).rejects.toThrow('User already exists');

      expect(userRepo.findOne).toHaveBeenCalledTimes(1);

      expect(userRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('hashPassword', () => {
    beforeEach(() => {
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValueOnce('salt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword');
    });

    it('should return a hashed password', async () => {
      const hashedPassword = await service.hashPassword('123456');
      expect(hashedPassword).toEqual('hashedPassword');
      expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateUser', () => {
    const email = userRequest.email;
    const password = userRequest.password;

    it('should return a user', async () => {
      jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(userResponse);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
      const user = await service.validateUser(email, password);
      expect(user).toBeDefined();
      expect(user.email).toEqual(userResponse.email);
    });

    it('should return null if user does not exist', async () => {
      jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(null);

      const user = await service.validateUser(email, password);
      expect(user).toBeNull();
    });

    it('should return null if password is incorrect', async () => {
      jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(userResponse);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      const user = await service.validateUser(email, password);
      expect(user).toBeNull();
    });
  });

  describe('generateToken', () => {
    it('should return a token', () => {
      const token = service.generateToken(userResponse);
      expect(token).toBeDefined();
    });
  });
});
