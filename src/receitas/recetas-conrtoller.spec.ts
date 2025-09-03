import { Test, TestingModule } from '@nestjs/testing';
import { ReceitaController } from './receitas.controller';
import { ReceitaService } from './receitas.service';
import { create } from 'domain';


const mockReceitaService = {
  todasreceitas: jest.fn(),
  Criarumareceita: jest.fn(),
  buscaReceitas: jest.fn(),
  atualizaReceitas: jest.fn(),
  deleteReceitas: jest.fn(),
}
describe('ReceitaController teste', () => {
  let controller: ReceitaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceitaController],
      providers: [
        {
          provide: ReceitaService,
          useValue: mockReceitaService,
        },
      ],
    }).compile();

    controller = module.get<ReceitaController>(ReceitaController);
  });

  it("deve criar nova receita", async () => {
    const receita = { nome: "Receita 1", ingredientes: ["Ingrediente 1", "Ingrediente 2"] }
    mockReceitaService.Criarumareceita.mockResolvedValue(receita)
    expect(await controller.createreceita(receita as any)).toEqual(receita)
    expect(mockReceitaService.Criarumareceita).toHaveBeenCalledWith(receita)
  })
  it("deve listar todas as receitas", async () => {
    const receitas = [
      { nome: "Receita 1", ingredientes: ["Ingrediente 1", "Ingrediente 2"] },
      { nome: "Receita 2", ingredientes: ["Ingrediente 3", "Ingrediente 4"] }
    ]
    mockReceitaService.todasreceitas.mockResolvedValue(receitas)

    expect(await controller.todasreceita()).toEqual(receitas)

  })
  it("deve buscar uma receita pelo ID", async () => {
    const receita = { id: 1, nome: "Receita 1", ingredientes: ["Ingrediente 1", "Ingrediente 2"] };
    mockReceitaService.buscaReceitas.mockResolvedValue(receita);

    expect(await controller.buscaReceitas(1)).toEqual(receita);
  })
  it("deve atualizar uma receita ", async () => {
    const receita = { id: 1, nome: "Receita 1", ingredientes: ["Ingrediente 1", "Ingrediente 2"] };
    mockReceitaService.atualizaReceitas.mockResolvedValue(receita);
    expect(await controller.AtualizaReceitas("1", receita as any)).toEqual(receita);

  })
  it("deve deletar uma receita ", async () => {
    const receita = { id: 1, nome: "Receita 1", ingredientes: ["Ingrediente 1", "Ingrediente 2"] };
    mockReceitaService.deleteReceitas.mockResolvedValue(receita);

    expect(await controller.deleteReceita("1")).toEqual(receita);

  })
})
