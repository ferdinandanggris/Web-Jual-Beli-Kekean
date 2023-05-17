pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
              echo 'Deploying....'
                sh 'cd /var/www/dev1.my.id/anggris && sudo git pull'
                sh 'cd /var/www/dev1.my.id/anggris && php artisan migrate'
                sh 'cd /var/www/dev1.my.id/anggris && composer i && npm i'
                sh 'cd /var/www/dev1.my.id/anggris && npm run dev'
                sh 'cd /var/www/dev1.my.id/anggris && sudo chown nginx:nginx -R ./'
            }
        }
    }
}
