using System.ComponentModel.DataAnnotations;


namespace SmartCasa.Model.Entities;

public enum RecurrenceFrequency
{
    Daily,
    Weekly,
    Monthly,
    Yearly
}

public enum GenerationStatus
{
    Generating,
    Finished,
    Inactive,
}

public abstract class BaseRecurrencePattern
{
    [Key]
    public int Id { get; set; }
    public int HomeId { get; set; }
    public Home Home { get; set; }
    public int CreatedById { get; set; }
    public Member CreatedBy { get; set; }
    public RecurrenceFrequency Frequency { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? EndsAfter { get; set; }

    /* Example JSON string: {

        "interval": 2, // For example, every 2 weeks
        "daysOfWeek": ['mon','tue','fri'], 
        "daysOfMonth": [1,15,31],
        "daysOfYear": [{month: 1, day: 1}, {month: 12, day: 31}] // January 1st and December 31st
    } */
    public string RecurrenceJson { get; set; } // JSON string

    public GenerationStatus Status { get; set; } = GenerationStatus.Generating;
    public DateTime? LastGeneratedDate { get; set; }
}