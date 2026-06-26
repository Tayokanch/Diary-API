pipeline {
    agent any

    environment {
        DB_USER          = credentials('DB_USER')
        DB_PASSWORD      = credentials('DB_PASSWORD')
        DB_NAME          = credentials('DB_NAME')
        //DB_HOST = "diaryhub-db"
        DB_HOST =  credentials('DB_HOST')
        JWT_SECRET       = credentials('JWT_SECRET')
        INIT_ADMIN_EMAIL = credentials('INIT_ADMIN_EMAIL')
        API_REPLICAS = "3"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Temporary Debug'){
            steps{
                sh '''
                    echo "DB_USER=$DB_USER"
                    echo "DB_NAME=$DB_NAME"
                    echo "DB_PASSWORD=$DB_PASSWORD"
                '''
            }
        }

        stage('Deploy') {
    steps {
        sh '''
            set -e

            echo "Stopping old containers..."
            docker compose down --remove-orphans

            echo "Building images..."
            docker compose build

            echo "Starting stack..."
            docker compose up -d --scale diaryhub-api=$API_REPLICAS
        '''
    }
}

        stage('Verify') {
            steps {
                sh 'docker compose ps'
            }
        }
    }
}