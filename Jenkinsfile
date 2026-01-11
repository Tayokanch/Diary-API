pipeline {
    agent any

    environment {
        DB_USER           = credentials('DB_USER')
        DB_PASSWORD       = credentials('DB_PASSWORD')
        DB_HOST           = 'db'
        DB_NAME           = credentials('DB_NAME')
        DB_PORT           = credentials('DB_PORT')
        JWT_SECRET        = credentials('JWT_SECRET')
        INIT_ADMIN_EMAIL  = credentials('INIT_ADMIN_EMAIL')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Prepare .env') {
            steps {
                writeFile file: '.env', text: """
                DB_USER=${DB_USER}
                DB_PASSWORD=${DB_PASSWORD}
                DB_HOST=${DB_HOST}
                DB_NAME=${DB_NAME}
                DB_PORT=${DB_PORT}
                JWT_SECRET=${JWT_SECRET}
                INIT_ADMIN_EMAIL=${INIT_ADMIN_EMAIL}
            """
            }
        }

        stage('Build & Deploy') {
            steps {
                sh '''
                    # Build images once
                    docker compose build --no-cache

                    # Clean up any old/orphan containers
                    docker compose down --remove-orphans

                    # Start DB
                    docker compose up -d db

                    # Run migrations in one-off container
                    docker compose run --rm notewatch-api node src/db/runMigrations.js

                    # Start API replicas and Nginx
                    docker compose up -d --scale notewatch-api=3 nginx
                '''
            }
        }

        stage('Verify') {
            steps {
                sh 'docker compose ps'
            }
        }

        stage('Cleanup .env') {
            steps {
                sh 'rm -f .env'
            }
        }
    }
}
