using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using SmartCasa.Services.Interfaces;

using SmartCasa.API.DTO;
using Microsoft.AspNetCore.Authorization;
using SmartCasa.Services.DTO;

namespace SmartCasa.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    IExpenseService _expenseService;
    public ExpensesController(IExpenseService expenseService)
    {
        _expenseService = expenseService;
    }

    [HttpPost("{homeId}")]
    public async Task<IActionResult> Create(int homeId, [FromBody] CreateExpenseRequest request)
    {
        int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId);
        var entry = await _expenseService.Create(new ExpenseDTO
        {
            Description = request.Description,
            Amount = request.Amount,
            Date = request.Date,
            Category = request.Category,
        }, homeId);
        if (entry == null)
        {
            return BadRequest();
        }
        return new JsonResult(entry);
    }

    [HttpGet("{homeId}")]
    public IActionResult Get(int homeId)
    {

        return Ok(_expenseService.All(homeId).ToList());
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateExpenseRequest request)
    {
        int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId);
        var entry = await _expenseService.Update(new ExpenseDTO
        {
            Id = id,
            Description = request.Description,
            Amount = request.Amount,
            Date = request.Date,
            Category = request.Category,

        }, userId);
        if (entry == null)
        {
            return BadRequest();
        }
        return new JsonResult(entry);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId);
        var deleted = await _expenseService.Delete(id, userId);
        if (!deleted)
        {
            return BadRequest();
        }
        return new JsonResult(deleted);
    }

    // [HttpPost("{budgetId}/entries")]
    // public async Task<IActionResult> CreateBudgetEntry(int budgetId, [FromBody] CreateBudgetEntryRequest request)
    // {
    //     int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId);
    //     var budgetEntry = await _expenseService.Create(new BudgetEntryDTO
    //     {
    //         Description = request.Description,
    //         Amount = request.Amount,
    //     }, budgetId);
    //     if (budgetEntry == null)
    //     {
    //         return BadRequest();
    //     }
    //     return new JsonResult(budgetEntry);
    // }

    // [HttpPatch("{budgetId}/entries/{id}")]
    // public async Task<IActionResult> UpdateBudgetEntry(int budgetId, int id, [FromBody] CreateBudgetEntryRequest request)
    // {
    //     int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId);
    //     var budgetEntry = await _expenseService.Update(new BudgetEntryDTO
    //     {
    //         Id = id,
    //         Description = request.Description,
    //         Amount = request.Amount,
    //     }, userId);
    //     if (budgetEntry == null)
    //     {
    //         return BadRequest();
    //     }
    //     return new JsonResult(budgetEntry);
    // }
}
