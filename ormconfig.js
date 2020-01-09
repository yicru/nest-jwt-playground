module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
};
