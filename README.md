# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Deployment


- Signup on AWS
- Launch Instance
- chmod 400 <secret>.pem
- ssh -i "devTInder-secret.pem" ubuntu@ec2-16-16-128-43.eu-north-1.compute.amazonaws.com
- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash (installing nodejs)
- install node 22.20.0 (means current version of your system)
- git clone https://github.com/tejastitare/DevTinder-Frontend.git
- git clone https://github.com/tejastitare/DevTinder.git
- ls
**Frontend**

- cd DevTinder-Frontend
- npm install
- npm run build
- ls
- sudo apt update
- sudo apt install nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx
- Copy code from dist(build files) to /var/www/html/  [
     - cd DevTinder-Frontend
     - sudo scp -r dist/* /var/www/html
     - ls
     - Enable port 80: Of your instance[
        Go to instance security and go to security group and 80 and enable for 0000/0
     ]

]

**Backend**

- Allowed ec2 instance public Ip on mongodb server
- npm install pm2 -g
- pm2 start npm -- start
- pm2 logs
- pm2 list,pm2 flush <name of process> ,pm2 stop <name of process>, pm2 delete <name of process>
- pm2 start npm --name "devTinder-backend" -- start
- config nginx - sudo nano /etc/nginx/sites-available/default
- sudo systemctl daemon-reload
- sudo systemctl restart nginx
- Modify the BASEURL in fronted project to "/api"

**Nginx Config**

- Frontend = http://16.16.128.43/
- Backend = http://16.16.128.43:7777/


   location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }





