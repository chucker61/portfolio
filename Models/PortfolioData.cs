namespace BlazorApp.Models;

public class PortfolioData
{
    public List<Skill> Skills { get; set; } = new();
    public List<Project> Projects { get; set; } = new();
}

public class Skill
{
    public string Title { get; set; } = string.Empty;
    public string Technologies { get; set; } = string.Empty;
}

public class Project
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string TechStack { get; set; } = string.Empty;
    public List<string> Features { get; set; } = new();
} 