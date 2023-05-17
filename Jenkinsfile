pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
              echo 'Deploying....'
                sh 'sudo \\cd /var/www/dev1.my.id/anggris && sudo git pull origin main'
                sh 'sudo \\cd /var/www/dev1.my.id/anggris && sudo php artisan migrate'
                sh 'sudo \\cd /var/www/dev1.my.id/anggris && sudo composer i && sudo npm i'
                sh 'sudo \\cd /var/www/dev1.my.id/anggris && sudo npm run dev'
                sh 'sudo \\cd /var/www/dev1.my.id/anggris && sudo chown nginx:nginx -R ./'
            }
        }
    }
}
