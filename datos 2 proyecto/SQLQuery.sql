-- Consulta para obtener la información de un usuario con sus roles y permisos
SELECT 
    au.username, 
    au.name, 
    au.email, 
    r.name AS role_name, 
    p.name AS permission_name
FROM app_user au
JOIN user_role ur ON au.id = ur.user_id
JOIN role r ON ur.role_id = r.id
JOIN role_permission rp ON r.id = rp.role_id
JOIN permission p ON rp.permission_id = p.id
WHERE au.username = 'usuario_ejemplo'; -- Reemplazar con el nombre de usuario real


-- Consulta para obtener todos los servicios ofrecidos por una compañía
SELECT 
    c.name AS company_name,
    s.name AS service_name,
    s.description AS service_description
FROM companies c
JOIN company_service cs ON c.id = cs.company_id
JOIN services s ON cs.service_id = s.id
WHERE c.name = 'nombre_compañia'; -- Reemplazar con el nombre de la compañía real


-- Consulta para obtener las solicitudes de servicio activas (estado 'pendiente') por usuario
SELECT 
    r.id AS request_id,
    r.description AS request_description,
    r.status AS request_status,
    c.name AS company_name,
    s.name AS service_name,
    co.name AS contractor_name
FROM requests r
JOIN companies c ON r.company_id = c.id
JOIN services s ON r.service_id = s.id
JOIN contractors co ON r.contractor_id = co.id
WHERE r.user_id = (SELECT id FROM app_user WHERE username = 'usuario_ejemplo') 
AND r.status = 'Pendiente'; -- Reemplazar con el estado que desees filtrar


-- Consulta para obtener las facturas de un usuario
SELECT 
    b.id AS billing_id,
    b.amount AS billing_amount,
    b.payment_date AS payment_date,
    b.payment_method AS payment_method,
    b.request_id AS request_id
FROM billings b
JOIN app_user au ON b.user_id = au.id
WHERE au.username = 'usuario_ejemplo'; -- Reemplazar con el nombre de usuario real


-- Consulta para obtener todos los contratistas disponibles en una compañía
SELECT 
    c.name AS company_name,
    co.name AS contractor_name,
    co.status AS contractor_status,
    co.available AS contractor_availability
FROM contractors co
JOIN companies c ON co.company_id = c.id
WHERE c.name = 'nombre_compañia' 
AND co.available = True; -- 'S' indica disponible, puedes cambiar la lógica según tu necesidad


-- Consulta para obtener todos los roles asignados a un usuario específico
SELECT 
    r.name AS role_name, 
    r.description AS role_description
FROM user_role ur
JOIN role r ON ur.role_id = r.id
WHERE ur.user_id = (SELECT id FROM app_user WHERE username = 'usuario_ejemplo'); -- Reemplazar con el nombre de usuario real


-- Consulta para obtener todas las categorías de servicios disponibles
SELECT 
    c.name AS category_name, 
    c.description AS category_description
FROM categories c;


-- Consulta para obtener todos los servicios de una categoría específica
SELECT 
    s.name AS service_name,
    s.description AS service_description
FROM services s
JOIN categories c ON s.category_id = c.id
WHERE c.name = 'nombre_categoria'; -- Reemplazar con el nombre de la categoría real


-- Consulta para obtener el total facturado a un usuario en un período determinado
SELECT 
    SUM(b.amount) AS total_billed
FROM billings b
JOIN app_user au ON b.user_id = au.id
WHERE au.username = 'usuario_ejemplo' 
AND b.payment_date BETWEEN '2024-01-01'::date 
AND '2024-12-31'::date;


-- Consulta para obtener el número de solicitudes pendientes por cada compañía
SELECT 
    c.name AS company_name,
    COUNT(r.id) AS pending_requests
FROM companies c
JOIN requests r ON c.id = r.company_id
WHERE r.status = 'Pendiente'
GROUP BY c.name;


-- Consulta para obtener todas las facturas asociadas a una solicitud específica
SELECT 
    b.id AS billing_id,
    b.amount AS billing_amount,
    b.payment_date AS payment_date,
    b.payment_method AS payment_method
FROM billings b
JOIN requests r ON b.request_id = r.id
WHERE r.id = 12345; -- Reemplazar con el ID de la solicitud real


-- Consulta para obtener las solicitudes de un contratista específico
SELECT 
    r.id AS request_id,
    r.description AS request_description,
    r.status AS request_status,
    u.name AS user_name,
    s.name AS service_name
FROM requests r
JOIN app_user u ON r.user_id = u.id
JOIN services s ON r.service_id = s.id
WHERE r.contractor_id = (SELECT id FROM contractors WHERE name = 'nombre_contratista'); -- Reemplazar con el nombre del contratista real


-- Consulta para obtener el nombre de usuario y el estado de todos los usuarios que tienen un rol específico
SELECT 
    au.username, 
    au.status 
FROM app_user au
JOIN user_role ur ON au.id = ur.user_id
JOIN role r ON ur.role_id = r.id
WHERE r.name = 'rol_especifico'; -- Reemplazar con el nombre del rol real
