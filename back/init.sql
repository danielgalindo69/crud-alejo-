-- Create the table
CREATE TABLE IF NOT EXISTS carros (
    id SERIAL PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    anio INTEGER NOT NULL,
    color VARCHAR(50) NOT NULL
);
-- Insert dummy data
INSERT INTO carros (marca, modelo, anio, color)
VALUES ('Toyota', 'Corolla', 2022, 'Rojo'),
    ('Honda', 'Civic', 2023, 'Azul'),
    ('Ford', 'Mustang', 2021, 'Negro');