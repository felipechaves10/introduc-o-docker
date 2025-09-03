import { Test } from "@nestjs/testing";
import { ReceitaService } from "./receitas.service";
import { mock } from "node:test";
import { NotFoundException } from "@nestjs/common";

const mockReceitaService = {
    todasreceitas: jest.fn(),
    Criarumareceita: jest.fn(),
    buscaReceitas: jest.fn(),
    atualizaReceitas: jest.fn(),
    deleteReceitas: jest.fn(),
}
describe("ReceitaService", () => {
    let service: ReceitaService;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [
                    {
                        provide: ReceitaService,
                        useValue: mockReceitaService,
                    },
                ],
            }).compile();

            service = module.get<ReceitaService>(ReceitaService);
        });
        it("deve criar uma receita", async () => {
            const dto = { name: "Receita Teste", ingredients: ["Ingrediente 1", "Ingrediente 2"] };
            mockReceitaService.Criarumareceita.mockResolvedValue(dto);
            const result = await service.Criarumareceita(dto as any);
            expect(result).toEqual(dto);
        });
        it("deve buscar todas as receitas", async () => {
            const dto = { name: "Receita Teste", ingredients: ["Ingrediente 1", "Ingrediente 2"] };
            mockReceitaService.todasreceitas.mockResolvedValue([dto]);
            const result = await service.todasreceitas();
            expect(result).toEqual([dto]);
        });
        it("deve buscar uma receita pelo ID", async () => {
            const dto = { id: 1, name: "Receita Teste", ingredients: ["Ingrediente 1", "Ingrediente 2"] };
            mockReceitaService.buscaReceitas.mockResolvedValue(dto);
            const result = await service.buscaReceitas(1);
            expect(result).toEqual(dto);
        });
        it("deve atualizar uma receita", async () => {
            const dto = { id: 1, name: "Receita Teste", ingredients: ["Ingrediente 1", "Ingrediente 2"] };
            mockReceitaService.atualizaReceitas.mockResolvedValue(dto);
            const result = await service.atualizaReceitas(1, dto as any);
            expect(result).toEqual(dto);
        });
        it("deve deletar uma receita", async () => {
            const dto = { id: 1, name: "Receita Teste", ingredients: ["Ingrediente 1", "Ingrediente 2"] };
            mockReceitaService.deleteReceitas.mockResolvedValue(dto);
            const result = await service.deleteReceitas(1);
            expect(result).toEqual(dto);
        });
        it("deve mostra um erro se não encotrar a receita", async () => {
            mockReceitaService.buscaReceitas.mockRejectedValue(new NotFoundException("Receita não encontrada"))
            await expect(service.buscaReceitas(9)).rejects.toThrow(NotFoundException)
        })
        it("seve mostra um erro ao atualizar uma receita inesxitente",async () => {
            mockReceitaService.atualizaReceitas.mockRejectedValue(new Error("não encotrado"))

            await expect(service.atualizaReceitas(1, {name: 'test'})).rejects.toThrow()
        })
        it("deve lançar erro ao deleta receita inexitente", async () => {
            mockReceitaService.deleteReceitas.mockRejectedValue(new Error("não encotrado"))
            await expect(service.deleteReceitas(1)).rejects.toThrow()
        })
    });
