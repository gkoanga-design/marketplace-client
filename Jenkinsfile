pipeline {
    agent none

    stages {

        stage('Build React') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-u root'
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'mkdir -p staging && cp -r build/* staging/'
            }
        }

        stage('Unit Test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-u root'
                }
            }
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Push to Docker Hub') {
            agent {
                docker {
                    image 'docker:25.0.3'
                    args '-u root -v /var/run/docker.sock:/var/run/docker.sock -e DOCKER_HOST=unix:///var/run/docker.sock'
                }
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub_credentials',
                    passwordVariable: 'DOCKER_HUB_PASSWORD',
                    usernameVariable: 'DOCKER_HUB_USERNAME'
                )]) {
                    sh 'docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD'
                    sh 'docker build -t $DOCKER_HUB_USERNAME/servilink-frontend:v$BUILD_NUMBER .'
                    sh 'docker push $DOCKER_HUB_USERNAME/servilink-frontend:v$BUILD_NUMBER'
                }
            }
        }

        stage('Deploy') {
            agent any
            steps {
                script {
                    def userInput = input(
                        message: 'Voulez-vous déployer ServiLink sur le serveur ?',
                        ok: 'Déployer'
                    )
                    if (userInput != null) {
                        echo "Déploiement de servilink-frontend:v${BUILD_NUMBER}"
                    }
                }
            }
        }
    }

    post {
        success { echo 'Pipeline ServiLink build successfully' }
        failure { echo 'Pipeline ServiLink failed' }
    }
}