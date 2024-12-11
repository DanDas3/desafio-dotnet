using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.DTO;
using api.Model;
using AutoMapper;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProdutosController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var list = await _context.Produtos.Include(p => p.Categoria).ToListAsync();
            if (list == null)
            {
                return NotFound();
            }

            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var produto = await _context.Produtos
                .Include(p => p.Categoria)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (produto == null)
            {
                return NotFound();
            }

            return Ok(produto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProdutoDTO produto)
        {
            if (produto == null)
            {
                return BadRequest();
            }
            var produtoEntity = _mapper.Map<Produto>(produto);
            _context.Produtos.Add(produtoEntity);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Details), new { id = produtoEntity.Id }, produto);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProdutoDTO produto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var produtoExistente = await _context.Produtos.FindAsync(id);
                    if (produtoExistente == null)
                    {
                        return NotFound();
                    }

                    _mapper.Map(produto, produtoExistente);

                    _context.Produtos.Update(produtoExistente);
                    await _context.SaveChangesAsync();
                    return Ok(produtoExistente);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    if (!ProdutoExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        return (BadRequest());
                    }
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // DELETE: api/Products/{id}
        [HttpDelete("{id}")]
        public async Task<bool> DeleteProduct(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);
            _context.Produtos.Remove(produto);
            var deleted = await _context.SaveChangesAsync();
            if (deleted == 0)
                return false;

            return true;
        }

        private bool ProdutoExists(int id)
        {
            return _context.Produtos.Any(e => e.Id == id);
        }
    }
}
