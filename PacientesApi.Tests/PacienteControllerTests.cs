using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PacientesApi.Controllers;
using PacientesApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace PacientesApi.Tests
{
    [TestClass]
    public class PacienteControllerTests
    {
        private readonly PacienteController _controller;

        public PacienteControllerTests()
        {
            _controller = new PacienteController();
        }

        [TestInitialize]
        public void Setup()
        {
            // Limpiar la lista de pacientes antes de cada prueba
            var field = typeof(PacienteController).GetField("pacientes", BindingFlags.NonPublic | BindingFlags.Static)
                ?? throw new InvalidOperationException("No se pudo encontrar el campo 'pacientes'");
            field.SetValue(null, new List<Paciente>());
            
            // Reiniciar el contador de ID
            var nextIdField = typeof(PacienteController).GetField("nextId", BindingFlags.NonPublic | BindingFlags.Static)
                ?? throw new InvalidOperationException("No se pudo encontrar el campo 'nextId'");
            nextIdField.SetValue(null, 1);
        }

        [TestMethod]
        public void GetPacientes_ReturnsEmptyList_WhenNoPacientesExist()
        {
            // Act
            var result = _controller.GetPacientes();

            // Assert
            var okResult = result.Result as OkObjectResult
                ?? throw new AssertFailedException("Se esperaba OkObjectResult");
            var pacientes = okResult.Value as IEnumerable<Paciente>
                ?? throw new AssertFailedException("Se esperaba IEnumerable<Paciente>");
            Assert.AreEqual(0, pacientes.Count());
        }

        [TestMethod]
        public void PostPaciente_ReturnsPaciente_WithGeneratedId()
        {
            // Arrange
            var nuevoPaciente = new Paciente { Nombre = "Emma" };

            // Act
            var result = _controller.PostPaciente(nuevoPaciente);

            // Assert
            var createdAtActionResult = result.Result as CreatedAtActionResult
                ?? throw new AssertFailedException("Se esperaba CreatedAtActionResult");
            var pacienteCreado = createdAtActionResult.Value as Paciente
                ?? throw new AssertFailedException("Se esperaba un objeto Paciente");
            Assert.AreEqual("Emma", pacienteCreado.Nombre);
            Assert.IsTrue(pacienteCreado.Id > 0);
        }

        [TestMethod]
        public void DeletePaciente_ReturnsNotFound_WhenPacienteDoesNotExist()
        {
            // Act
            var result = _controller.DeletePaciente(999);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void DeletePaciente_ReturnsNoContent_WhenPacienteExists()
        {
            // Arrange
            var nuevoPaciente = new Paciente { Nombre = "Emma" };
            var createResult = _controller.PostPaciente(nuevoPaciente).Result as CreatedAtActionResult
                ?? throw new AssertFailedException("Se esperaba CreatedAtActionResult");
            var pacienteCreado = createResult.Value as Paciente
                ?? throw new AssertFailedException("Se esperaba un objeto Paciente");

            // Act
            var result = _controller.DeletePaciente(pacienteCreado.Id);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NoContentResult));
        }

        [TestMethod]
        public void GetPacientes_ReturnsPacientes_AfterAddingThem()
        {
            // Arrange
            _controller.PostPaciente(new Paciente { Nombre = "Emma" });
            _controller.PostPaciente(new Paciente { Nombre = "Albert" });

            // Act
            var result = _controller.GetPacientes();

            // Assert
            var okResult = result.Result as OkObjectResult
                ?? throw new AssertFailedException("Se esperaba OkObjectResult");
            var pacientes = okResult.Value as IEnumerable<Paciente>
                ?? throw new AssertFailedException("Se esperaba IEnumerable<Paciente>");
            Assert.AreEqual(2, pacientes.Count());
            CollectionAssert.Contains(pacientes.Select(p => p.Nombre).ToList(), "Emma");
            CollectionAssert.Contains(pacientes.Select(p => p.Nombre).ToList(), "Albert");
        }
    }
} 