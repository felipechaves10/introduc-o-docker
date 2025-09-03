import { Test, TestingModule } from '@nestjs/testing';
import {UserController} from './user.controller';
import { UserService } from './user.service';
import { create } from 'domain';


const mockUserService = {
    findAll: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
}
describe('UserController teste', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });
    it("deve listar todos os usuários", async () => {
        const usuarios = [
            { nome: "Usuário 1", email: "usuario1@example.com" },
            { nome: "Usuário 2", email: "usuario2@example.com" }
        ]
        mockUserService.findAll.mockResolvedValue(usuarios)

        expect(await controller.findAllUsers()).toEqual(usuarios)

    })



    it("deve buscar um usuário pelo ID", async () => {
        const usuario = { id: 1, nome: "Usuário 1", email: "usuario1@example.com" };
        mockUserService.findOne.mockResolvedValue(usuario);

        expect(await controller.findUserById(usuario.id)).toEqual(usuario)
    })
    it("deve atualizar um usuário", async () => {
        const usuario = { id: 1, nome: "Usuário 1", email: "usuario1@example.com" };
        mockUserService.update.mockResolvedValue(usuario);
        expect(await controller.updateUser(usuario.id, usuario)).toEqual(usuario);
    })
    it("deve deletar um usuário", async () => {
        const usuario = { id: 1, nome: "Usuário 1", email: "usuario1@example.com" };
        mockUserService.remove.mockResolvedValue(usuario);

        expect(await controller.deleteUser(usuario.id)).toEqual(usuario);

    })
  })
