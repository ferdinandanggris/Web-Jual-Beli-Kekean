pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
              echo 'Deploying....'
                sh 'cd /var/www/dev1.my.id/jualbeli && sudo git pull && sudo chown nginx:nginx -R ./'
                sh 'cd /var/www/dev1.my.id/jualbeli && php artisan migrate'
                sh 'cd /var/www/dev1.my.id/jualbeli && composer i && npm i'
                sh 'cd /var/www/dev1.my.id/jualbeli && npm run dev'
            }
        }
    }
}
