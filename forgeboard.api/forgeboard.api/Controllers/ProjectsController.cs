using forgeboard.api.DTOs.Project;
using forgeboard.api.Models;
using forgeboard.api.Services.ProjectService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace forgeboard.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        // GET api/projects/company/1
        [HttpGet("company/{companyId:int}")]
        public async Task<ActionResult<IEnumerable<ProjectResponseDto>>> GetByCompany(int companyId)
        {
            var projects = await _projectService.GetAllProjectsByCompanyAsync(companyId);

            return Ok(projects);
        }

        // GET api/projects/5?companyId=1
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProjectResponseDto>> GetById(int id, [FromQuery] int companyId)
        {
            var project = await _projectService.GetProjectByIdAsync(id, companyId);

            if (project is null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        // POST api/projects
        [HttpPost]
        public async Task<ActionResult<ProjectResponseDto>> Create(CreateProjectDto dto)
        {
            var project = new Project
            {
                CompanyId = dto.CompanyId,
                ProjectPriorityId = dto.ProjectPriorityId,
                Name = dto.Name.Trim(),
                Description = dto.Description.Trim(),
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Archived = false
            };

            await _projectService.AddNewProjectAsync(project);

            return CreatedAtAction(
                nameof(GetById),
                new
                {
                    id = project.Id,
                    companyId = project.CompanyId
                },
                project);
        }

        // PUT api/projects/5?companyId=1
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromQuery] int companyId, UpdateProjectDto dto)
        {
            var project =
                await _projectService.GetProjectByIdAsync(id, companyId);

            if (project is null)
            {
                return NotFound();
            }

            project.ProjectPriorityId = dto.ProjectPriorityId;
            project.Name = dto.Name.Trim();
            project.Description = dto.Description.Trim();
            project.StartDate = dto.StartDate;
            project.EndDate = dto.EndDate;

            await _projectService.UpdateProjectAsync(project);

            return NoContent();
        }

        // PATCH api/projects/5/archive?companyId=1
        [HttpPatch("{id:int}/archive")]
        public async Task<IActionResult> Archive(int id, [FromQuery] int companyId)
        {
            var project =
                await _projectService.GetProjectByIdAsync(id, companyId);

            if (project is null)
            {
                return NotFound();
            }

            await _projectService.ArchiveProjectAsync(project);

            return NoContent();
        }

        // PATCH api/projects/5/restore?companyId=1
        [HttpPatch("{id:int}/restore")]
        public async Task<IActionResult> Restore(int id, [FromQuery] int companyId)
        {
            var project =
                await _projectService.GetProjectByIdAsync(id, companyId);

            if (project is null)
            {
                return NotFound();
            }

            await _projectService.RestoreProjectAsync(project);

            return NoContent();
        }
    }
}

