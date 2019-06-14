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
    public class AnimalsController : ControllerBase
    {
        private readonly provawebdbContext _context;

        public AnimalsController(provawebdbContext context)
        {
            _context = context;
        }

        // GET: api/Animals
        [HttpGet]
        public IEnumerable<Animal> GetAnimal()
        {
            return _context.Animal;
        }

        // GET: api/Animals/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAnimal([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var animal = await _context.Animal.FindAsync(id);

            if (animal == null)
            {
                return NotFound();
            }

            return Ok(animal);
        }

        // PUT: api/Animals/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnimal([FromRoute] int id, [FromBody] Animal animal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != animal.IdAnimal)
            {
                return BadRequest();
            }

            _context.Entry(animal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnimalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(animal);
        }

        // POST: api/Animals
        [HttpPost]
        public async Task<IActionResult> PostAnimal([FromBody] Animal animal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Animal.Add(animal);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AnimalExists(animal.IdAnimal))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAnimal", new { id = animal.IdAnimal }, animal);
        }

        // DELETE: api/Animals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnimal([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var animal = await _context.Animal.FindAsync(id);
            if (animal == null)
            {
                return NotFound();
            }

            _context.Animal.Remove(animal);
            await _context.SaveChangesAsync();

            return Ok(animal);
        }

        private bool AnimalExists(int id)
        {
            return _context.Animal.Any(e => e.IdAnimal == id);
        }
    }
}