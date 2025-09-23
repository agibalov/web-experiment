import random

def generate_seed_data(count: int):
    task_templates = [
        "Learn {}",
        "Build {}",
        "Create {}",
        "Deploy {}",
        "Write {}",
        "Set up {}",
        "Implement {}",
        "Add {}",
        "Configure {}",
        "Optimize {}",
        "Debug {}",
        "Test {}",
        "Review {}",
        "Refactor {}",
        "Document {}",
        "Install {}",
        "Update {}",
        "Fix {}",
        "Monitor {}",
        "Analyze {}"
    ]
    
    subjects = [
        "Python", "GraphQL API", "React frontend", "production environment",
        "documentation", "monitoring", "authentication", "unit tests", 
        "CI/CD pipeline", "performance", "database", "user interface",
        "API endpoints", "error handling", "logging", "caching",
        "security measures", "data validation", "backup system",
        "load balancing", "microservices", "containerization",
        "cloud deployment", "automated testing", "code reviews",
        "version control", "project structure", "dependencies",
        "configuration files", "environment variables", "SSL certificates",
        "database migrations", "user permissions", "rate limiting",
        "API documentation", "frontend components", "state management",
        "routing system", "form validation", "error boundaries",
        "responsive design", "accessibility features", "SEO optimization",
        "performance metrics", "user analytics", "A/B testing",
        "notification system", "email templates", "file uploads",
        "search functionality", "pagination", "data export",
        "reporting dashboard", "admin panel", "user profiles"
    ]
    
    todos = []
    for i in range(count):
        template = random.choice(task_templates)
        subject = random.choice(subjects)
        title = template.format(subject)
        done = random.choice([True, False])
        
        todos.append({
            "title": title,
            "done": done
        })
    
    return todos