pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
              echo 'Deploying....'
                sh 'sudo \\cd /var/www/dev1.my.id/anggris && sudo git pull'
                sh 'sudo \\cd /var/www/dev1.my.id/anggris && php artisan migrate'
                sh 'sudo \\cd /var/www/dev1.my.id/anggris && composer i && npm i'
                sh 'sudo \\cd /var/www/dev1.my.id/anggris && npm run dev'
                sh 'sudo \\cd /var/www/dev1.my.id/anggris && sudo chown nginx:nginx -R ./'
            }
        }
    }
}
