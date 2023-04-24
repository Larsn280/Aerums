using Aerums_API.Interfaces;
using Aerums_API.ViewModels.FreeTimeViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Aerums_API.Models;

namespace Aerums_API.Controllers
{

    [ApiController]
    [Route("api/v1/freetime")]
    public class FreetimeController : ControllerBase
    {
        private readonly IFreeTimeRepository _freeTimeRepo;

        public FreetimeController(IFreeTimeRepository freeTimegRepo)
        {
            _freeTimeRepo = freeTimegRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<FreeTimeViewModel>>> ListAllFreeTimes()
        {
            return Ok(await _freeTimeRepo.ListAllFreeTimesAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FreeTimeViewModel>> GetFreeTimeById(int id)
        {
            var response = await _freeTimeRepo.GetFreeTimeByIdAsync(id);
            if (response == null)
            {
                return NotFound($"Hitte int lejdige tidn me id: {id}");
            }
            return Ok(response);
        }
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<FreeTimeViewModel>>> ListThisUsersFreetimes(string userId)
        {
            var result = await _freeTimeRepo.ListAllThisUsersFreetimeAsync(userId);
            if (result == null)
            {
                return NotFound($"Kunde inte hitta användaren");
            }
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFreeTime(int id)
        {
            try
            {
                await _freeTimeRepo.DeleteFreeTime(id);
                return Ok($"Your FreeTime with id {id} is deleted");
            }
            catch (Exception ex)
            {

                return BadRequest($"Failed to delete free time: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddNewFreeTime([FromBody] FreeTimeViewModel input)
        {
            try
            {
                await _freeTimeRepo.AddNewFreeTime(input);

                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to add new free time: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditFreeTime(FreeTimeViewModel input, int id)
        {
            try
            {
                await _freeTimeRepo.EditFreeTime(input, id);

                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to edit free time: {ex.Message}");
            }
        }
    }
}
