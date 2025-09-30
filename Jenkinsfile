pipeline {
    agent none
    environment {
        DOCKER_IMAGE = "nesrinedh/frontend:latest"
        SONAR_HOST_URL = "http://sonarqube:9000"
        SONAR_LOGIN = credentials('sonarqube')
    }

    stages {
        stage('Build Angular') {
            agent {
                docker {
                    image 'node:18'
                    args '--network springboot_app-network'
                }
            }
            steps {
                checkout scm
                sh '''
                  npm ci --legacy-peer-deps
                  npm run build -- --configuration production
                '''
            }
        }

        stage('SonarQube Scan') {
            agent {
                docker {
                    image 'sonarsource/sonar-scanner-cli:5.0'
                    args '--network devops-net'
                }
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                      sonar-scanner \
                        -Dsonar.projectKey=frontend \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=$SONAR_HOST_URL \
                        -Dsonar.login=$SONAR_LOGIN
                    '''
                }
            }
        }

        stage('Docker Build & Push') {
            agent {
                docker {
                    image 'docker:24.0.2-dind'
                    args '--network devops-net --privileged -v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-pass',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh """
                        docker build -t $DOCKER_IMAGE .
                        echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin
                        docker push $DOCKER_IMAGE
                    """
                }
            }
        }
    }
}
