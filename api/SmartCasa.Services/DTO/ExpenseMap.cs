using SmartCasa.Model.Entities;

namespace SmartCasa.Services.DTO
{
    public static class ExpenseMappingExtensions
    {
        public static ExpenseDTO ToDto(this Expense entity)
        {
            return new ExpenseDTO
            {
                Id = entity.Id,
                Description = entity.Description,
                Amount = entity.Amount,
                Date = entity.Date,
                Category = entity.Category.ToString(),
                Splits = entity.Splits.ToDto(),
            };
        }

        public static Expense ToEntity(this ExpenseDTO dto)
        {
            return new Expense
            {
                Id = dto.Id,
                Description = dto.Description,
                Amount = dto.Amount,
                Date = dto.Date,
                Category = dto.Category.ToExpenseCategory(),
                Home = null
            };
        }
        public static List<ExpenseDTO> ToDto(this List<Expense> entities)
        {
            return entities.Select(e => e.ToDto()).ToList();
        }

        public static SplitDTO ToDto(this Split entity)
        {
            return new SplitDTO
            {
                Id = entity.Id,
                Type = entity.Type.ToString(),
                Amount = entity.Amount,
                Percentage = entity.Percentage,
                Member = entity.Member.ToDto(),
                // Transactions = entity.Transactions.ToDto()
            };
        }
        public static IEnumerable<SplitDTO> ToDto(this IEnumerable<Split> entities)
        {
            return entities.Select(e => e.ToDto()).ToList();
        }

        public static Split ToEntity(this SplitDTO dto, Expense expense)
        {
            return new Split
            {
                Id = dto.Id,
                Amount = dto.Amount,
                Percentage = dto.Percentage,
                Type = dto.Type.ToSplitType(),
                Expense = expense,
                Member = dto.Member.ToEntity()
            };
        }

        public static IEnumerable<Split> ToEntity(this IEnumerable<SplitDTO> dtos)
        {
            return dtos.Select(e => e.ToEntity(null)).ToList();
        }

        public static ExpenseCategory ToExpenseCategory(this string category)
        {
            return Enum.TryParse<ExpenseCategory>(category, true, out var cat) ? cat : ExpenseCategory.Other;
        }

        public static SplitType ToSplitType(this string type)
        {
            return Enum.TryParse<SplitType>(type, true, out var t) ? t : SplitType.Amount;
        }

    }
}