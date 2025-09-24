import random
from datetime import datetime, timedelta

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
    now = datetime.now()
    
    for i in range(count):
        template = random.choice(task_templates)
        subject = random.choice(subjects)
        title = template.format(subject)
        done = random.choice([True, False])
        
        days_ago = random.randint(0, 1095)
        hours_ago = random.randint(0, 23)
        minutes_ago = random.randint(0, 59)
        seconds_ago = random.randint(0, 59)
        
        created_at = now - timedelta(
            days=days_ago,
            hours=hours_ago,
            minutes=minutes_ago,
            seconds=seconds_ago
        )
        
        if done:
            max_days_since_creation = min(days_ago, 180)
            update_days_ago = random.randint(0, max_days_since_creation)
        else:
            update_days_ago = random.randint(0, days_ago) if days_ago > 0 else 0
        
        update_hours_ago = random.randint(0, 23)
        update_minutes_ago = random.randint(0, 59)
        update_seconds_ago = random.randint(0, 59)
        
        updated_at = now - timedelta(
            days=update_days_ago,
            hours=update_hours_ago,
            minutes=update_minutes_ago,
            seconds=update_seconds_ago
        )
        
        if updated_at < created_at:
            updated_at = created_at + timedelta(minutes=random.randint(1, 60))
        
        todos.append({
            "title": title,
            "done": done,
            "created_at": created_at,
            "updated_at": updated_at
        })
    
    return todos