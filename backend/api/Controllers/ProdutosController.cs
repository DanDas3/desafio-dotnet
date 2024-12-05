using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Model;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProdutosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var list = await _context.Produtos.ToListAsync();
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
        public async Task<IActionResult> Create([FromBody] Produto produto)
        {
            if (produto == null)
            {
                return BadRequest();
            }

            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Details), new { id = produto.Id }, produto);
            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Produto produto)
        {
            if (id != produto.Id)
                return BadRequest("Product ID mismatch");

            var p = await _context.Produtos
                .Include(p => p.Categoria)
                .FirstOrDefaultAsync(m => m.Id == id);
            p = produto;

            _context.Produtos.Update(p);
            var updatedProduct = await _context.SaveChangesAsync();
            if (updatedProduct == null)
                return NotFound($"Product with ID {id} not found");

            return Ok(updatedProduct);
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
