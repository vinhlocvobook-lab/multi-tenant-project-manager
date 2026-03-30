# Deployment Guide (Ubuntu + Apache + MariaDB)

This document provides step-by-step instructions for deploying the Multi-Tenant Project Manager application on an Ubuntu server.

## 1. Prerequisites

Ensure your Ubuntu server has the following installed:
- **Node.js**: (LTS version 20.x or 22.x recommended)
- **MariaDB Server**: (Already installed as per your request)
- **Apache2**: (Already installed as per your request)
- **Git**
- **PM2**: `sudo npm install -g pm2`

## 2. Prepare the Environment

Clone the repository and install dependencies:

```bash
git clone https://github.com/vinhlocvobook-lab/multi-tenant-project-manager.git
cd multi-tenant-project-manager
npm install
```

## 3. Database Configuration

1. Create a database for the project:
```sql
CREATE DATABASE project_manager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'pm_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON project_manager.* TO 'pm_user'@'localhost';
FLUSH PRIVILEGES;
```

2. Generate the `.env` file in the root directory:
```bash
cp .env.example .env # If available, otherwise create a new one
```

**Required `.env` variables:**
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=pm_user
DB_PASSWORD=your_secure_password
DB_NAME=project_manager

# Security
JWT_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
JWT_EXPIRATION=15m

# URLs
VITE_API_URL=https://api.yourdomain.com/api # Use HTTPS in production
```

3. Run migrations to create tables:
```bash
npx nx run backend:migration:up
```

## 4. Backend Deployment (NestJS)

1. Build the backend:
```bash
npx nx build backend --prod
```

2. Start the process with PM2:
```bash
pm2 start dist/apps/backend/main.js --name "pm-backend"
pm2 save
```

## 5. Frontend Deployment (React)

1. Build the frontend:
```bash
# Ensure VITE_API_URL is set correctly in .env before building
npx nx build frontend --prod
```
The static files will be generated in `dist/apps/frontend`.

## 6. Apache Configuration

You need two configurations: one for the static UI and one as a reverse proxy for the API.

### Enable Required Modules:
```bash
sudo a2enmod proxy proxy_http rewrite ssl
sudo systemctl restart apache2
```

### Config for API (`/etc/apache2/sites-available/api.conf`)
```apache
<VirtualHost *:80>
    ServerName api.yourdomain.com
    
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
```

### Config for UI (`/etc/apache2/sites-available/ui.conf`)
```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/multi-tenant-project-manager/dist/apps/frontend

    <Directory /var/www/multi-tenant-project-manager/dist/apps/frontend>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        # Support for React Router (SPA)
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

## 7. Crucial: SSL/HTTPS (Certbot)

Since we use **Secure HttpOnly Cookies**, the application **MUST** run over HTTPS.

```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d yourdomain.com -d api.yourdomain.com
```

Once HTTPS is enabled, the browser will successfully store the `refreshToken` cookie because the `Secure` flag will now match the protocol.

## 8. Summary of Ports
- **Backend (Node)**: Internal port 3000 (proxied via Apache)
- **Apache**: External ports 80 (HTTP) and 443 (HTTPS)
- **MariaDB**: Default port 3306
