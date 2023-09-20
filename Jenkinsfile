pipeline {
    agent any
    environment {
        SONAR_TOKEN = credentials('sonar-token')
        SCANNER_HOME = tool 'sonar1' // sonar tool name configured in Jenkins
    }
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

                // Run tests with Mocha
                script {
                    def testResult = sh(script: 'mocha test/test.js --exit', returnStatus: true)
                
                    // Check if the tests passed
                    if (testResult == 0) {
                        echo 'All tests passed!'
                        currentBuild.result = 'SUCCESS'
                    } else {
                        error 'Tests failed!'
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
        
         stage('SonarQube Analysis') {
            steps {
                    script {
                    // Run SonarQube scanner with the configured environment
                    def scannerCMD = "${env.SCANNER_HOME}/bin/sonar-scanner"
                    sh "${scannerCMD} -Dsonar.projectKey=task -Dsonar.sources=./ -Dsonar.login=${env.SONAR_TOKEN}"
                }
                
            }
        }
    
            stage('Build and Deploy with Docker') {
                when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
                     }
            steps {
                
                
                // Build and deploy with Docker-compose
                sh 'docker build -t task-manager-1 .'
        
                sh 'docker-compose down && docker-compose up -d'
            }
        }

}
}
