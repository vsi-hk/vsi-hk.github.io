# Gemini Project: VSI Website

This document outlines the structure and purpose of the VSI Website project.

## Project Goal

To create a modern, responsive, and user-friendly website for VSI. VSI is a company that handles manufacturing high quality medical grade sensors and devices.



## Key Features

*   **Home Page:** A welcoming landing page introducing VSI.
*   **About Us Page:** Information about VSI's mission, vision, and team.
*   **Services/Products Page:** A detailed description of what VSI offers.
*   **Contact Page:** A form for users to get in touch, with appropriate validation and spam protection.
*   **Admin Interface:** For managing website content.

## Directory Structure

A typical Django project structure will be used:

*   `/`: Root of the project.
*   `Gemini.md`: This file, providing an overview of the project for the Gemini agent.
*   `manage.py`: Django's command-line utility.
*   `requirements.txt`: A file for listing Python dependencies.
*   `templates/`: For HTML templates.
*   `static/`: For static files like CSS, JavaScript, and images.
*   `vsi_project/`: The Django project directory.
    *   `__init__.py`
    *   `settings.py`
    *   `urls.py`
    *   `wsgi.py`
    *   `asgi.py`
*   `pages/`: A Django app for the main pages of the site.
*   `docs/`: documentation

## Getting Started

1.  **Set up the environment:**
    ```bash
    # not using venv
    python3 -m pip install -r requirements.txt
    ```
2.  **Initial Migration:**
    ```bash
    python3 manage.py migrate
    ```
3.  **Run the development server:**
    ```bash
    python3 manage.py runserver
    ```

## Development

### Frameworks
- Backend: Python and Django
- Frontend: HTMX and Tailwind CSS

### Testing
-   **Unit Tests:** For testing individual components (models, views, forms) in isolation.
-   **Integration Tests:** To ensure different parts of the application work together as expected.
-   Tests will be located in the `tests.py` file of each Django app.

### Security
-   **Data Encryption:** All sensitive data, both in transit and at rest, must be encrypted. Use TLS for data in transit and strong encryption algorithms for data at rest.
-   **Authentication and Authorization:** Implement robust authentication and authorization mechanisms. Passwords must be hashed and salted.
-   **Input Validation:** Validate all user input to prevent common vulnerabilities such as SQL injection, Cross-Site Scripting (XSS), and command injection.
-   **Error Handling and Logging:** Implement proper error handling to avoid revealing sensitive information. Log security-related events for monitoring and auditing.
-   **Security Headers:** Use security headers like Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), and X-Frame-Options to protect against various attacks.

### Documentation
- Write significant documentation for any APIs and architecture design in markdown(md) format.

