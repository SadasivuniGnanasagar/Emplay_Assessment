# AI Prompt Library Application

## Overview

This project is a full-stack application to store and manage AI prompts. Users can view prompts, create new ones, and track how many times each prompt is viewed.

## Tech Stack

* Frontend: Angular
* Backend: Django
* Database: PostgreSQL (or SQLite for development)
* Cache: Redis
* Containerization: Docker

## Features

* View all prompts
* View prompt details
* Add new prompts
* Track view count using Redis

## API Endpoints

* GET /api/prompts/
* POST /api/prompts/
* GET /api/prompts/:id/

## How to Run

### Backend

cd backend
python -m venv venv
venv\Scripts\activate
pip install django redis
python manage.py runserver

### Frontend

cd frontend
npm install
ng serve

### Docker

docker-compose up --build

## Notes

* Redis is used to store view counts
* Angular communicates with Django via API
* View count increases on each detail page visit