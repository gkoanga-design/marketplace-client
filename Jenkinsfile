// ============================================================
// Jenkinsfile — Pipeline Jenkins  |  ServiLink Frontend
// ============================================================

pipeline {
    agent {
        docker {
            image 'node:18-alpine'
        }
    }

    stages {

        stage('Checkout') {
            steps {
                echo '=== Récupération du code ==='
                checkout scm
            }
        }

        stage('Install') {
            steps {
                echo '=== Installation des dépendances ==='
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                echo '=== Tests unitaires ==='
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                echo '=== Build de production ==='
                sh 'npm run build'
            }
        }

        stage('Archive') {
            steps {
                echo '=== Archivage du build ==='
                archiveArtifacts artifacts: 'build/**/*', fingerprint: true
            }
        }
    }

    post {
        success { echo '✅ Pipeline ServiLink terminé avec succès !' }
        failure { echo '❌ Échec du pipeline ServiLink.' }
    }
}
