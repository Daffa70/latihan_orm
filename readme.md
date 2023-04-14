npx sequelize init
npx sequelize db:create
sequelize model:generate --name Channel --attributes name:string,description:string  
npx sequelize db:migrate
