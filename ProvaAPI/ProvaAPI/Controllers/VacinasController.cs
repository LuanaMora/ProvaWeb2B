using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProvaAPI.Models;

namespace ProvaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacinasController : ControllerBase
    {
        private readonly provawebdbContext _context;

        public VacinasController(provawebdbContext context)
        {
            _context = context;
        }

        // GET: api/Vacinas
        [HttpGet]
        public IEnumerable<Vacina> GetVacina()
        {
            return _context.Vacina;
        }

        // GET: api/Vacinas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVacina([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vacina = await _context.Vacina.FindAsync(id);

            if (vacina == null)
            {
                return NotFound();
            }

            return Ok(vacina);
        }

        // PUT: api/Vacinas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVacina([FromRoute] int id, [FromBody] Vacina vacina)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vacina.IdVacina)
            {
                return BadRequest();
            }

            _context.Entry(vacina).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VacinaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(vacina);
        }

        // POST: api/Vacinas
        [HttpPost]
        public async Task<IActionResult> PostVacina([FromBody] Vacina vacina)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Vacina.Add(vacina);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (VacinaExists(vacina.IdVacina))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtAction("GetVacina", new { id = vacina.IdVacina }, vacina);
        }

        // DELETE: api/Vacinas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVacina([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vacina = await _context.Vacina.FindAsync(id);
            if (vacina == null)
            {
                return NotFound();
            }

            _context.Vacina.Remove(vacina);
            await _context.SaveChangesAsync();

            return Ok(vacina);
        }

        private bool VacinaExists(int id)
        {
            return _context.Vacina.Any(e => e.IdVacina == id);
        }
    }
}