-- Insertar datos en roles
INSERT INTO
    role (description, name)
VALUES
    ('Administrador del sistema', 'Admin'),
    ('Usuario que utiliza servicios', 'Client'),
    ('Compañia que brinda los servicios', 'Company');

-- Insertar datos en permissions
INSERT INTO
    permission (name, resource)
VALUES
    ('READ-USER', 'USER'),
    --1
    ('WRITE-USER', 'USER'),
    --2
    ('DELETE-USER', 'USER'),
    --3
    ('EDIT-USER', 'USER'),
    --4
    ('READ-ROLE', 'ROLE'),
    --5
    ('WRITE-ROLE', 'ROLE'),
    --6
    ('DELETE-ROLE', 'ROLE'),
    --7
    ('EDIT-ROLE', 'ROLE'),
    --8
    ('READ-PERMISSION', 'PERMISSION'),
    --9
    ('WRITE-PERMISSION', 'PERMISSION'),
    --10
    ('DELETE-PERMISSION', 'PERMISSION'),
    --11
    ('EDIT-PERMISSION', 'PERMISSION'),
    --12
    ('ALL-CLIENT', 'CLIENT'),
    --13
    ('ALL-COMPANY', 'COMPANY'),
    --14
    ('ALL-ADMIN', 'USER');

--15
-- Insertar datos en role_permission
INSERT INTO
    role_permission (role_id, permission_id)
VALUES
    (1, 1),
    -- Admin puede READ-USER
    (1, 2),
    -- Admin puede WRITE-USER
    (1, 3),
    -- Admin puede DELETE-USER
    (1, 4),
    -- Admin puede EDIT-USER
    (1, 5),
    -- Admin puede READ-ROLE
    (1, 6),
    -- Admin puede WRITE-ROLE
    (1, 7),
    -- Admin puede DELETE-ROLE
    (1, 8),
    -- Admin puede EDIT-ROLE
    (1, 9),
    -- Admin puede READ-PERMISSION
    (1, 10),
    -- Admin puede WRITE-PERMISSION
    (1, 11),
    -- Admin puede DELETE-PERMISSION
    (1, 12),
    -- Admin puede EDIT-PERMISSION
    (1, 15),
    -- Admin puede all of admin
    (2, 13),
    -- Client can all of client
    (3, 14);

-- Company can all of company
-- Insertar datos en categories
INSERT INTO
    categories (description, name)
VALUES
    (
        'Reparación de electrodomésticos',
        'Electrodomésticos'
    ),
    ('Servicios de limpieza', 'Limpieza'),
    ('Reparación de fontanería', 'Fontanería'),
    ('Servicios de jardinería', 'Jardinería'),
    (
        'Reparación de equipos electrónicos',
        'Electrónica'
    ),
    ('Servicios de pintura', 'Pintura'),
    ('Reparación de vehículos', 'Vehículos'),
    ('Servicios de mudanza', 'Mudanza'),
    ('Asesoría legal', 'Legal'),
    ('Servicios de seguridad', 'Seguridad');

-- Insertar datos en app_user
INSERT INTO
    app_user (
        address,
        city,
        country,
        email,
        last_name,
        name,
        password,
        phone,
        state,
        username,
        zip_code,
        status
    )
VALUES
    (
        '456 Elm St',
        'Cali',
        'Colombia',
        'user1@example.com',
        'Gómez',
        'Ana',
        '$2a$10$Y34.B81a8gmgLqNsUFxAWewEiwSxJhkr0OOJX4RG/VX9tU.Iajt22',
        '0987654321',
        'Valle del Cauca',
        'admin',
        '760002',
        true
    ),
    (
        '567 Elm St',
        'Cali',
        'Colombia',
        'user2@example.com',
        'Martínez',
        'Luis',
        '$2a$10$BHBS1AgZhrC0qHaJnaR2gObkOl4M5M.uEeHXpl83SwCarcBVtCz8C',
        '0876543210',
        'Valle del Cauca',
        'luisuser',
        '760003',
        true
    ),
    (
        '678 Elm St',
        'Cali',
        'Colombia',
        'user3@example.com',
        'Rodríguez',
        'Carlos',
        '$2a$10$UmQa.Gj7uepeDIIKcB2H.egn7l3nmgT0m6qJb6PD5JhgkpueFCWce',
        '0765432109',
        'Valle del Cauca',
        'carlosuser',
        '760004',
        true
    ),
    (
        '789 Elm St',
        'Cali',
        'Colombia',
        'user4@example.com',
        'Fernández',
        'Sofía',
        '$2a$10$pKpu4eMnILrNg1TEsg7Sm.vkPY2Tw9BZ7DhCijXcC/Tuu9nLGqrPO',
        '0654321098',
        'Valle del Cauca',
        'sofiauser',
        '760005',
        true
    ),
    (
        '890 Elm St',
        'Cali',
        'Colombia',
        'user5@example.com',
        'Pérez',
        'Juan',
        '$2a$10$iqaQE6OsuAaga3WBQJhffeD7CNbdeHP3hLctzUY2/Z/jHwtv6LnCa',
        '0543210987',
        'Valle del Cauca',
        'juanuser',
        '760006',
        true
    ),
    (
        '901 Elm St',
        'Cali',
        'Colombia',
        'user6@example.com',
        'García',
        'Marta',
        '$2a$10$kigUklMbYiK5V9CnKf1S6uMy5/cdQZGg26r/Yxbm63rmTUQgsae2S',
        '0432109876',
        'Valle del Cauca',
        'martauser',
        '760007',
        true
    ),
    (
        '012 Elm St',
        'Cali',
        'Colombia',
        'user7@example.com',
        'Mendoza',
        'Pedro',
        '$2a$10$pttzQzDZb9ULmu1sXympaeyAlSKVSfn1rzAPXWD3EkW7rPIqihAnq',
        '0321098765',
        'Valle del Cauca',
        'pedrouser',
        '760008',
        true
    ),
    (
        '123 Elm St',
        'Cali',
        'Colombia',
        'user8@example.com',
        'Ramírez',
        'Elena',
        '$2a$10$8cY8ChpFlgsRzerhbkH6Iujdc3nlwQUcnLuFN4f8nU36YoK16ye56',
        '0210987654',
        'Valle del Cauca',
        'elenasuser',
        '760009',
        true
    ),
    (
        '234 Elm St',
        'Cali',
        'Colombia',
        'user9@example.com',
        'Castro',
        'David',
        '$2a$10$Wkw.jy/4.h.g/bYqkZy.h.DwWzZztAZg6AiVLJgrMhr6XIGN0NvlS',
        '1098765432',
        'Valle del Cauca',
        'daviduser',
        '760010',
        true
    ),
    (
        '345 Elm St',
        'Cali',
        'Colombia',
        'user10@example.com',
        'Gutiérrez',
        'Isabel',
        '$2a$10$5rJ0aCn2BKTmJR0fb5Home7YNG5TmGOPI4LypQ/6W9oYYAGd6MZm6',
        '0987654321',
        'Valle del Cauca',
        'isabeluser',
        '760011',
        true
    ),
    (
        '2',
        'Cali',
        'Colombia',
        'user11@example.com',
        'Apellido',
        'name',
        '$2a$10$Y34.B81a8gmgLqNsUFxAWewEiwSxJhkr0OOJX4RG/VX9tU.Iajt22',
        '0987654321',
        'Valle del Cauca',
        '2',
        '760002',
        true
    );

-- Insertar datos en companies
INSERT INTO
    companies (
        address,
        city,
        country,
        description,
        email,
        name,
        phone,
        state,
        zip_code,
        user_id
    )
VALUES
    (
        '123 Main St',
        'Cali',
        'Colombia',
        'Proveedor de servicios generales',
        'contact@company1.com',
        'Tech Repairs',
        '1234567890',
        'Valle del Cauca',
        '760001',
        3
    ),
    (
        '234 Elm St',
        'Cali',
        'Colombia',
        'Servicios de limpieza',
        'contact@company2.com',
        'Clean Masters',
        '2345678901',
        'Valle del Cauca',
        '760002',
        6
    ),
    (
        '345 Oak St',
        'Cali',
        'Colombia',
        'Reparación de fontanería',
        'contact@company3.com',
        'Plumbing Experts',
        '3456789012',
        'Valle del Cauca',
        '760003',
        7
    ),
    (
        '456 Pine St',
        'Cali',
        'Colombia',
        'Servicios de jardinería',
        'contact@company4.com',
        'Garden Pros',
        '4567890123',
        'Valle del Cauca',
        '760004',
        10
    );

-- Insertar datos en contractors
INSERT INTO
    contractors (company_id, name, available, status)
VALUES
    (1, 'Juan Pérez', false, true),
    (2, 'María Gómez', false, true),
    (3, 'Carlos López', false, true),
    (4, 'Ana Morales', false, true),
    (1, 'Luis Fernández', false, true),
    (1, 'Laura Martínez', false, true),
    (3, 'Pedro Rodríguez', false, true),
    (4, 'Sofía González', false, true),
    (1, 'José Torres', false, true),
    (2, 'Elena Ramírez', false, true),
    (1, 'Juan Cabrera', true, true),
    (1, 'Gustavo López', true, true);

-- Insertar datos en services
INSERT INTO
    services (category_id, description, name)
VALUES
    (
        1,
        'Reparación de televisores',
        'Reparación de TV'
    ),
    (2, 'Limpieza de oficinas', 'Limpieza de Oficina'),
    (
        3,
        'Reparación de tuberías',
        'Reparación de Tubos'
    ),
    (
        4,
        'Cuidado de jardines',
        'Mantenimiento de Jardines'
    ),
    (
        5,
        'Reparación de computadoras',
        'Reparación de PC'
    ),
    (
        6,
        'Pintura de interiores',
        'Pintura de Interiores'
    ),
    (7, 'Cambio de aceite', 'Cambio de Aceite'),
    (8, 'Mudanza local', 'Mudanza Local'),
    (9, 'Consultoría legal', 'Asesoría Jurídica'),
    (10, 'Seguridad 24/7', 'Servicio de Seguridad');

-- Insertar datos en company_service
INSERT INTO
    company_service (company_id, service_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (1, 5),
    (2, 6),
    (3, 7),
    (4, 8),
    (1, 9),
    (2, 10);

-- Insertar datos en requests
INSERT INTO
    requests (
        date,
        user_id,
        company_id,
        contractor_id,
        service_id,
        status,
        description
    )
VALUES
    (
        '2024-01-01',
        2,
        1,
        1,
        1,
        'Completada',
        'Descripción de la solicitud 1'
    ),
    (
        '2024-06-01',
        2,
        1,
        2,
        2,
        'Cancelada',
        'Descripción de la solicitud 2'
    ),
    (
        '2024-03-01',
        2,
        2,
        3,
        3,
        'En Progreso',
        'Descripción de la solicitud 3'
    ),
    (
        '2024-02-01',
        2,
        2,
        4,
        4,
        'Cancelada',
        'Descripción de la solicitud 4'
    ),
    (
        '2024-07-01',
        2,
        2,
        5,
        5,
        'Completada',
        'Descripción de la solicitud 5'
    ),
    (
        '2024-08-01',
        2,
        1,
        6,
        6,
        'En Progreso',
        'Descripción de la solicitud 6'
    ),
    (
        '2024-04-01',
        2,
        3,
        7,
        7,
        'Completada',
        'Descripción de la solicitud 7'
    ),
    (
        '2024-05-01',
        2,
        3,
        8,
        8,
        'Pendiente',
        'Descripción de la solicitud 8'
    ),
    (
        '2024-09-01',
        2,
        4,
        9,
        9,
        'En Progreso',
        'Descripción de la solicitud 9'
    ),
    (
        '2024-10-01',
        2,
        4,
        10,
        10,
        'Pendiente',
        'Descripción de la solicitud 10'
    );

-- Insertar datos en billings
INSERT INTO
    billings (
        amount,
        payment_date,
        contractor_id,
        user_id,
        request_id,
        payment_method
    )
VALUES
    (
        150.00,
        '2024-01-05',
        1, -- contractor_id
        1, -- user_id
        1, -- request_id
        'Efectivo' -- payment_method
    ),
    (
        350.00,
        '2024-07-05',
        5, -- contractor_id
        5, -- user_id
        5, -- request_id
        'Efectivo' -- payment_method
    ),
    (
        450.00,
        '2024-04-05',
        7, -- contractor_id
        7, -- user_id
        7, -- request_id
        'Tarjeta de Débito' -- payment_method
    );

-- Insertar datos en ratings
INSERT INTO
    ratings (rating_value, company_id, comment)
VALUES
    (5.0, 1, 'Excelente servicio'),
    (4.5, 2, 'Muy buen trabajo'),
    (4.0, 3, 'Satisfactorio'),
    (4.7, 4, 'Altamente recomendable'),
    (4.3, 1, 'Buena calidad'),
    (4.6, 2, 'Trabajo bien hecho'),
    (4.2, 3, 'Servicio eficiente'),
    (4.9, 4, 'Superó expectativas'),
    (4.1, 1, 'Adecuado'),
    (4.8, 2, 'Excelente atención');

-- Insertar datos en user_role
INSERT INTO
    user_role (role_id, user_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (2, 4),
    (2, 5),
    (3, 6),
    (3, 7),
    (2, 8),
    (2, 9),
    (3, 10),
    (1, 11);