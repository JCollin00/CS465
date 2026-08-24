# Travlr Getaways - Full Stack Web Application

## Overview

Travlr Getaways is a full-stack travel booking web application built using the **MEAN stack** (MongoDB, Express, Angular, Node.js). The application allows customers to browse travel packages, view trip details, and book reservations. It also includes an administrative Single-Page Application (SPA) for managing trips, users, and bookings.

---

## GitHub Repository Structure

This project is organized using **Git branches**, with each branch representing a major milestone in the development process. This approach mirrors real-world development workflows and allows for easy tracking of progress.

### Branches Overview

| Branch | Module | Description | Status |
|--------|--------|-------------|--------|
| **`main`** | - | Initial project setup and README | 📄 Documentation |
| **`module1`** | Module 1 | Initial setup: Node.js, Express, static HTML with Handlebars | 
| **`module2`** | Module 2 | MVC architecture implementation with routes, controllers, and views | 
| **`module3`** | Module 3 | Dynamic templates with JSON data (Handlebars + JSON) | 
| **`module4`** | Module 4 | Backend integration: MongoDB, Mongoose models, database seeding |
| **`module5`** | Module 5 | RESTful API creation (`app_api/`), Postman testing |
| **`module6`** | Module 6 | Angular SPA development (admin interface) |
| **`module7`** | Module 7 | Authentication: JWT, Passport, login form, secure endpoints |

### How to Access Each Branch

```bash
# Clone the repository
git clone <repository-url>
cd travlr

# View all branches
git branch -a

# Switch to a specific branch
git checkout <branch-name>

# Examples:
git checkout module7    # Latest fully functional version with authentication
git checkout module6    # Angular SPA implementation
git checkout module5    # RESTful API implementation
