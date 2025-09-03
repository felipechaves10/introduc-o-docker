import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { PrismaService } from "../prisma/prisma.service";
import { use } from "passport";

const mockPrismaService = {
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
};


describe("UserService", () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
      { provide: PrismaService,
        useValue: mockPrismaService,
      }
      ],
      imports: [],

    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it("deve listar todos os usuários", async () => {
    const users = [
      { id: 1, nome: "Jonas", email: "jonas@gmail.com" },
      { id: 2, nome: "Joana", email: "joana@gmail.com" },
    ];
    mockPrismaService.user.findMany.mockResolvedValue(users);

    const result = await userService.findAll();

    expect(result).toEqual(users);
  });
  it("deve mostra um usuario por id",async()=> {
    const user = { id: 1, nome: "Jonas", email: "jonas@gmail.com" }
    mockPrismaService.user.findUnique.mockResolvedValue(user)
    expect(await userService.findOne(1)).toEqual(user)

  })
  it("deve atualizar um usuário", async () => {
    const user = { id: 1, nome: "Jonas", email: "jonas@gmail.com" };

    mockPrismaService.user.findUnique.mockResolvedValue(user);
    mockPrismaService.user.update.mockResolvedValue(user);

    const result = await userService.update(user.id, user);

    expect(result).toEqual(user);
  });
  it("deve deletar um usuário", async () => {
    const user = { id: 1, nome: "Jonas", email: "jonas@gmail.com" };
    mockPrismaService.user.delete.mockResolvedValue(user);

    const result = await userService.remove(user.id);

    expect(result).toEqual(user);
  });
  });