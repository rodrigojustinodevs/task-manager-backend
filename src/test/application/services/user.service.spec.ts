import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../application/services/user.service';
import { PrismaUserRepository } from '../../../infrastructure/repositories/prisma.user.repository';
import { CreateUserDto } from '../../../application/dto/create-user.dto';
import { User } from '../../../domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';


describe('UserService', () => {
  let userService: UserService;
  let userRepository: PrismaUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaUserRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<PrismaUserRepository>(PrismaUserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Arrange: Mock do repositório
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: uuidv4(),
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      } as User;
      
      jest.spyOn(userRepository, 'create').mockResolvedValue(mockUser);

      // Act: Chamar o método de criação
      const result = await userService.create(createUserDto);

      // Assert: Verificar o resultado e o mock
      expect(result).toEqual(mockUser);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledWith({
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      });
    });

    it('should throw an error if user creation fails', async () => {
      // Arrange: Mock para simular erro
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      jest.spyOn(userRepository, 'create').mockRejectedValue(new Error('Database error'));

      // Act & Assert: Verificar se o erro é lançado
      await expect(userService.create(createUserDto)).rejects.toThrow('Database error');
      expect(userRepository.create).toHaveBeenCalledTimes(1);
    });
  });
});
