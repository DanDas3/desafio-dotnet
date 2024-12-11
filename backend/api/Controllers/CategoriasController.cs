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
    public class CategoriasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CategoriasController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            return Ok(await _context.Categorias.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var categoria = await _context.Categorias
                .Include(c => c.Produtos).FirstOrDefaultAsync(m => m.Id == id);
            if (categoria == null)
            {
                return NotFound();
            }

            return Ok(categoria);
        }

        [HttpPost]

        public async Task<IActionResult> Create([Bind("Id,Nome")] CategoriaDTO categoria)
        {
            if (ModelState.IsValid)
            {
                var categoriaEntity = _mapper.Map<Categoria>(categoria);
                _context.Add(categoriaEntity);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(List));
            }
            return Ok(categoria);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] CategoriaDTO categoria)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var categoriaExistente = await _context.Categorias.FindAsync(id);

                    if (categoriaExistente == null)
                    {
                        return NotFound();
                    }
                    _mapper.Map(categoria, categoriaExistente);

                    _context.Update(categoriaExistente);
                    await _context.SaveChangesAsync();
                    return Ok(categoriaExistente);
                }
                catch (Exception)
                {
                    if (!CategoriaExists(id))
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

        [HttpDelete("{id}")]
        public async Task<bool> DeleteProduct(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            _context.Categorias.Remove(categoria);
            var deleted = await _context.SaveChangesAsync();
            if (deleted == 0)
                return false;

            return true;
        }

        private bool CategoriaExists(int id)
        {
            return _context.Categorias.Any(e => e.Id == id);
        }
    }
}
