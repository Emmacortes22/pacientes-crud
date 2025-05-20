using Microsoft.AspNetCore.Mvc;
using PacientesApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace PacientesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacienteController : ControllerBase
    {
        private static List<Paciente> pacientes = new List<Paciente>();
        private static int nextId = 1;

        [HttpGet]
        public ActionResult<IEnumerable<Paciente>> GetPacientes()
        {
            return Ok(pacientes);
        }

        [HttpPost]
        public ActionResult<Paciente> PostPaciente([FromBody] Paciente paciente)
        {
            paciente.Id = nextId++;
            pacientes.Add(paciente);
            return CreatedAtAction(nameof(GetPacientes), new { id = paciente.Id }, paciente);
        }
        
        [HttpDelete("{id}")]
        public IActionResult DeletePaciente(int id)
        {
            var paciente = pacientes.FirstOrDefault(p => p.Id == id);
            if (paciente == null) return NotFound();
            pacientes.Remove(paciente);
            return NoContent();
        }
    }
}