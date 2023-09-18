pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout code from your Git repository
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/konark111/task-manager-1.git']])
            }
        }
        stage('Install Dependencies and Run Tests') {
            steps {
                // Install npm dependencies
                sh 'npm install'

                // Run tests using Mocha
                script {
                    def testResult = sh(script: 'mocha test/test.js --exit', returnStatus: true)
                
                    // Check if the tests passed
                    if (testResult == 0) {
                        echo 'All tests passed!'
                    } else {
                        error 'Tests failed!'
                    }
                }
            }
        }
            stage('Build and Deploy with Docker') {
            steps {
                
                
                // Build and deploy with Docker-compose
                sh 'docker build -t task-manager-1 .'
        
                sh 'docker-compose down && docker-compose up -d'
            }
        }

}
}
