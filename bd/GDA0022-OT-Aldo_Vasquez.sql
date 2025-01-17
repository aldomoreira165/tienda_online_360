create database GDA0022OTAldoVasquez;

use GDA0022OTAldoVasquez;

-- creacion de tablas
create table Productos(
	idProductos int identity(1, 1), 
	nombre varchar(45) not null,
	marca varchar(45) not null, 
	codigo varchar(45) not null, 
	stock int not null,
	precio float not null, 
	fecha_creacion datetime not null, 
	foto varchar(255), 
	constraint PK_Productos primary key (idProductos)
);

create table Usuarios(
	idUsuarios int identity(1, 1),
	correo_electronico varchar(50) unique not null,
	nombre_completo varchar(100) not null,
	password varchar(100) not null,
	telefono varchar(45),
	fecha_nacimiento date not null,
	fecha_creacion datetime not null,
	constraint PK_Usuarios primary key (idUsuarios)
);

create table CategoriaProductos(
	idCategoriaProductos int identity(1, 1), 
	nombre varchar(45) unique not null,
	fecha_creacion datetime not null,
	constraint PK_CategoriaProductos primary key (idCategoriaProductos)
);

create table Estados(
	idEstados int identity(1, 1), 
	nombre varchar(45) unique not null,
	constraint PK_Estados primary key (idEstados)
);

create table Rol(
	idRol int identity(1, 1),
	nombre varchar(45) not null,
	constraint PK_Rol primary key (idRol)
);

create table OrdenDetalles(
	idOrdenDetalles int identity(1, 1), 
	cantidad int not null, 
	precio float not null,
	subtotal float not null,
	constraint PK_OrdenDetalles primary key (idOrdenDetalles)
);

create table Orden(
	idOrden int identity(1, 1),
	fecha_creacion datetime not null,
	nombre_completo varchar(100) not null,
	direccion varchar(545) not null,
	telefono varchar(45) not null,
	correo_electronico varchar(50) not null,
	fecha_entrega date not null,
	total_orden float not null,
	constraint PK_Orden primary key (idOrden)
);

create table Clientes(
	idClientes int identity(1, 1),
	razon_social varchar(245),
	nombre_comercial varchar(100),
	direccion_entrega varchar(100) not null,
	telefono varchar(45) not null, 
	email varchar(50) not null,
	constraint PK_Clientes primary key (idClientes)
);

create table Tokens(
	idToken int identity(1, 1),
	token  varchar(512) not null,
	fecha_creacion datetime not null,
	fecha_expiracion datetime not null
);

-- creacion de relaciones
alter table Productos
add CategoriaProductos_idCategoriaProductos int not null,
    Usuarios_idUsuarios int not null,
    Estados_idEstados int not null,
	constraint FK_Productos_CategoriaProductos foreign key (CategoriaProductos_idCategoriaProductos) references CategoriaProductos(idCategoriaProductos),
	constraint FK_Productos_Usuarios foreign key (Usuarios_idUsuarios) references Usuarios(idUsuarios),
	constraint FK_Productos_Estados foreign key (Estados_idEstados) references Estados(idEstados);

alter table Usuarios
add Rol_idRol int not null,
	Estados_idEstados int not null,
	Clientes_idClientes int,
	constraint FK_Usuarios_Rol foreign key (Rol_idRol) references Rol(idRol),
	constraint FK_Usuarios_Estados foreign key (Estados_idEstados) references Estados(idEstados),
	constraint FK_Usuarios_Clientes foreign key (Clientes_idClientes) references Clientes(idClientes);

alter table CategoriaProductos
add Usuarios_idUsuarios int not null, 
	Estados_idEstados int not null,
	constraint FK_CategoriaProductos_Usuarios foreign key (Usuarios_idUsuarios) references Usuarios(idUsuarios),
	constraint FK_CategoriaProductos_Estados foreign key (Estados_idEstados) references Estados(idEstados);

alter table OrdenDetalles
add Orden_idOrden int not null, 
	Productos_idProductos int not null,
	constraint FK_OrdenDetalles_Orden foreign key (Orden_idOrden) references Orden(idOrden),
	constraint FK_OrdenDetalles_Productos foreign key (Productos_idProductos) references Productos(idProductos);

alter table Orden
add Usuarios_idUsuarios int not null,
	Estados_idEstados int not null,
	constraint FK_Orden_Usuarios foreign key (Usuarios_idUsuarios) references Usuarios(idUsuarios),
	constraint FK_Orden_Estados foreign key (Estados_idEstados) references Estados(idEstados);

alter table Clientes
add Estados_idEstados int not null,
	constraint FK_Clientes_Estados foreign key (Estados_idEstados) references Estados(idEstados);

-- insercion de datos
insert into Estados (nombre) values ('Activo'), ('Inactivo');

insert into Rol (nombre) values ('Cliente'), ('Operador');

INSERT INTO Clientes (razon_social, nombre_comercial, direccion_entrega, telefono, email) VALUES 
('Cliente Individual 1', 'Cliente Uno', 'Calle 1, Zona 1', '55555555', 'cliente1@correo.com'),
('Cliente Individual 2', 'Cliente Dos', 'Calle 2, Zona 2', '55555556', 'cliente2@correo.com'),
('Cliente Individual 3', 'Cliente Tres', 'Calle 3, Zona 3', '55555559', 'cliente3@correo.com');

INSERT INTO Usuarios (correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, fecha_creacion, Rol_idRol, Estados_idEstados, Clientes_idClientes) VALUES 
('cliente1@correo.com', 'Cliente Uno', 'pass123', '55555555', '2000-01-01', GETDATE(), 1, 1, 1),
('cliente2@correo.com', 'Cliente Dos', 'pass123', '55555556', '1995-06-15', GETDATE(), 1, 1, 2),
('operador1@correo.com', 'Operador Uno', 'pass456', '55555557', '1990-02-10', GETDATE(), 2, 1, NULL),
('operador2@correo.com', 'Operador Dos', 'pass456', '55555558', '1985-05-20', GETDATE(), 2, 1, NULL),
('cliente3@correo.com', 'Cliente Tres', 'pass123', '55555559', '2002-12-12', GETDATE(), 1, 1, 3);

INSERT INTO CategoriaProductos (nombre, fecha_creacion, Usuarios_idUsuarios, Estados_idEstados) VALUES
('Abarrotes', GETDATE(), 3, 1),
('L�cteos', GETDATE(), 3, 1),
('Bebidas', GETDATE(), 3, 1),
('Snacks', GETDATE(), 3, 1),
('Higiene Personal', GETDATE(), 3, 1),
('Limpieza', GETDATE(), 3, 1),
('Panader�a', GETDATE(), 3, 1),
('Carnes', GETDATE(), 3, 1),
('Electrodom�sticos', GETDATE(), 3, 1),
('Frutas y Verduras', GETDATE(), 3, 1);

INSERT INTO Productos (nombre, marca, codigo, stock, precio, fecha_creacion, foto, CategoriaProductos_idCategoriaProductos, Usuarios_idUsuarios, Estados_idEstados) VALUES 
('Leche Entera', 'MarcaX', '001', 50, 10.00, GETDATE(), NULL, 2, 3, 1),
('Queso Mozzarella', 'MarcaY', '002', 20, 15.00, GETDATE(), NULL, 2, 3, 1),
('Refresco de Cola', 'MarcaZ', '003', 100, 5.00, GETDATE(), NULL, 3, 3, 1),
('Jab�n de Tocador', 'MarcaA', '004', 80, 8.00, GETDATE(), NULL, 5, 3, 1),
('Detergente L�quido', 'MarcaB', '005', 30, 25.00, GETDATE(), NULL, 6, 3, 1),
('Pan de Caja', 'MarcaC', '006', 40, 12.00, GETDATE(), NULL, 7, 3, 1),
('Carne de Res', 'MarcaD', '007', 15, 60.00, GETDATE(), NULL, 8, 3, 1),
('Cuchillo de Cocina', 'MarcaE', '008', 10, 30.00, GETDATE(), NULL, 9, 3, 1),
('Manzanas', 'MarcaF', '009', 120, 3.00, GETDATE(), NULL, 10, 3, 1),
('Papas Fritas', 'MarcaG', '010', 70, 2.00, GETDATE(), NULL, 4, 3, 1);

INSERT INTO Orden (fecha_creacion, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden, Usuarios_idUsuarios, Estados_idEstados) VALUES 
('2024-08-01', 'Cliente Uno', 'Calle 1, Zona 1', '55555555', 'cliente1@correo.com', '2024-08-03', 120.00, 1, 1),
('2024-08-05', 'Cliente Dos', 'Calle 2, Zona 2', '55555556', 'cliente2@correo.com', '2024-08-07', 300.00, 2, 1),
('2024-08-10', 'Cliente Tres', 'Calle 3, Zona 3', '55555559', 'cliente3@correo.com', '2024-08-12', 50.00, 5, 1);

INSERT INTO OrdenDetalles (cantidad, precio, subtotal, Orden_idOrden, Productos_idProductos) VALUES 
(10, 10.00, 100.00, 1, 1),
(2, 15.00, 30.00, 1, 2),
(50, 5.00, 250.00, 2, 3),
(10, 5.00, 50.00, 3, 3);

-- creacion de store procedures
-- <inicio estados>
create or alter proc p_insertarEstado
    @nombre varchar(45)
as
begin
	if exists (select 1 from Estados where nombre = @nombre)
		begin
			throw 50001, 'El estado ya existe.', 1;
        end

	insert into Estados (nombre) values (@nombre);
    select * from Estados where idEstados = scope_identity();

end;

create or alter proc p_obtenerEstados
as
begin
	select * from Estados;
end;

create or alter proc p_obtenerEstadoID
	@idEstados int
as
begin
	if not exists(select 1 from Estados where idEstados = @idEstados)
	begin
		throw 50001, 'El estado no existe.', 1;
	end

	select * from Estados where idEstados = @idEstados;
end;
-- <fin estados>

-- <inicio rol>
create or alter proc p_insertarRol
    @nombre varchar(45)
as
begin
	insert into Rol (nombre) values (@nombre);
end;
-- <fin rol>

-- <inicio usuario>
create or alter proc p_obtenerUsuarios
as
begin
	select 
		u.idUsuarios,
		u.correo_electronico,
		u.nombre_completo,
		u.telefono,
		u.fecha_nacimiento,
		u.fecha_creacion,
		r.nombre as 'nombre_rol',
		e.nombre as 'nombre_estado'
	from 
	Usuarios u 
		inner join 
	Rol r on u.Rol_idRol = r.idRol
		inner join
	Estados e on u.Estados_idEstados = e.idEstados
end;

create or alter proc p_obtenerUsuarioId
	@idUsuarios int
as
begin
	select * from Usuarios where idUsuarios = @idUsuarios;
end;

create or alter proc p_obtenerUsuarioEmail
	@correo_electronico varchar(50)
as
begin
	select * from Usuarios where correo_electronico = @correo_electronico;
end;

create or alter proc p_activarUsuario
 @idUsuarios int
as
begin
	update Usuarios
	set Estados_idEstados = 1
	where idUsuarios = @idUsuarios;

	select * from Usuarios where idUsuarios = @idUsuarios;
end;

create or alter proc p_inactivarUsuario
 @idUsuarios int
as
begin
	update Usuarios
	set Estados_idEstados = 2
	where idUsuarios = @idUsuarios;

	select * from Usuarios where idUsuarios = @idUsuarios;
end;

create or alter proc p_obtenerUsuariosActivos
as
begin
	select * from Usuarios where Estados_idEstados = 1;
end;

create or alter proc p_obtenerUsuariosInactivos
as 
begin
	select * from Usuarios where Estados_idEstados = 2;
end;

create or alter proc p_insertarUsuario
	@rol_idRol int,
	@estados_idEstados int,
	@correo_electronico varchar(50),
	@nombre_completo varchar(100),
	@password varchar(100),
	@telefono varchar(45),
	@fecha_nacimiento date,
	@clientes_idClientes int = null
as	
begin
	if not exists (select 1 from Estados where idEstados = @estados_idEstados)
	begin
		throw 50001, 'El estado no existe.', 1;
	end;

	if exists (select 1 from Usuarios where correo_electronico = @correo_electronico)
	begin	
		throw 50002, 'El correo electronico ya se encuentra asociado a otro usuario', 1;
	end;

	insert into Usuarios 
		(Rol_idRol, Estados_idEstados, correo_electronico, nombre_completo, 
		password, telefono, fecha_nacimiento, fecha_creacion, Clientes_idClientes)
	values
		(@rol_idRol, @estados_idEstados, @correo_electronico, @nombre_completo, @password, @telefono, @fecha_nacimiento, getdate(), @clientes_idClientes);

	select * from Usuarios where idUsuarios = scope_identity();
end;

create or alter proc p_actualizarUsuario
    @idUsuarios int,
    @nombre_completo varchar(100),
    @telefono varchar(45)
as
begin
        if not exists (select 1 from Usuarios where idUsuarios = @idUsuarios)
        begin
            throw 50001, 'El usuario especificado no existe.', 1;
        end;

        update Usuarios
        set
            nombre_completo = @nombre_completo,
            telefono = @telefono
        where idUsuarios = @idUsuarios;

		select * from Usuarios where idUsuarios = @idUsuarios;
end;
-- <fin usuario>

-- <inicio cliente>
create or alter proc p_obtenerClienteID
	@idClientes int
as
begin
	select * from Clientes where idClientes = @idClientes;
end;
	
create or alter proc p_obtenerClientes
as
begin
	select 
	c.idClientes,
	c.razon_social,
	c.nombre_comercial,
	c.direccion_entrega,
	c.telefono,
	c.email,
	c.Estados_idEstados,
	e.nombre as 'nombre_estado',
	u.idUsuarios as 'id_usuario',
	u.correo_electronico as 'correo_usuario',
	u.nombre_completo as 'nombre_usuario'
	from
		Clientes c 
			left join 
		Usuarios u on c.idClientes = u.Clientes_idClientes
			inner join
		Estados e on e.idEstados = c.Estados_idEstados;
end;

create or alter proc p_insertarCliente
	@razon_social varchar(245),
	@nombre_comercial varchar(100),
	@direccion_entrega varchar(100),
	@telefono varchar(45),
	@email varchar(45)
as
begin
	insert into Clientes (razon_social, nombre_comercial, direccion_entrega, telefono, email, Estados_idEstados)
		values	
	(@razon_social, @nombre_comercial, @direccion_entrega, @telefono, @email, 1);

	select * from Clientes where idClientes = scope_identity();
end;

create or alter proc p_actualizarCliente
    @idClientes int,
    @razon_social varchar(245),
    @nombre_comercial varchar(100),
    @direccion_entrega varchar(45),
    @telefono varchar(45),
    @correo_electronico varchar(45),
    @idEstados int
as
begin
    begin transaction;

    begin try
        if not exists (select 1 from Clientes where idClientes = @idClientes)
        begin
            throw 50001, 'El cliente especificado no existe.', 1;
        end;

        update Clientes
        set 
            razon_social = @razon_social,
            nombre_comercial = @nombre_comercial,
            direccion_entrega = @direccion_entrega,
            telefono = @telefono,
            email = @correo_electronico,
            Estados_idEstados = @idEstados
        where idClientes = @idClientes;

        if @idEstados = 2
        begin
            update Usuarios
            set Estados_idEstados = 2
            where Clientes_idClientes = @idClientes;
        end;

        commit transaction;

        select * from Clientes where idClientes = @idClientes;

    end try
    begin catch
        rollback transaction;

        throw;
    end catch;
end;
-- <fin cliente>

-- <inicio categorias>
create or alter proc p_obtenerCategorias
as
begin
	select 
		cat.idCategoriaProductos,
		cat.nombre,
		cat.fecha_creacion,
		cat.Usuarios_idUsuarios,
		cat.Estados_idEstados,
		e.nombre as 'nombre_estado'
	from 
	CategoriaProductos cat inner join Estados e on cat.Estados_idEstados = e.idEstados;
end;

create or alter proc p_obtenerCategoriaID
	@idCategoriaProductos int
as
begin
	if not exists(select 1 from CategoriaProductos where idCategoriaProductos = @idCategoriaProductos)
	begin
		throw 50001, 'La categor�a no existe.', 1;
	end

	select * from CategoriaProductos where idCategoriaProductos = @idCategoriaProductos;
end; 

create or alter proc p_insertarCategoriaProductos
    @usuarios_idUsuarios int,
    @nombre varchar(45),
    @estados_idEstados int,
    @fecha_creacion datetime
as
begin
	-- Validando que el usuario existe
    if not exists (select 1 from Usuarios where idUsuarios = @usuarios_idUsuarios)
    begin
        throw 50001, 'El usuario especificado no existe.', 1;
    end;

    -- Validando que el estado existe
    if not exists (select 1 from Estados where idEstados = @estados_idEstados)
    begin
        throw 50002, 'El estado especificado no existe.', 1;
    end;

    -- Validando que el nombre de la categor�a no exista
    if exists (select 1 from CategoriaProductos where nombre = @nombre)
    begin
        throw 50003, 'El nombre de la categor�a ya existe.', 1;
    end;

    insert into CategoriaProductos
        (Usuarios_idUsuarios, nombre, Estados_idEstados, fecha_creacion)
    values 
        (@usuarios_idUsuarios, @nombre, @estados_idEstados, @fecha_creacion);

    select * from CategoriaProductos where idCategoriaProductos = scope_identity();
end;

create or alter proc p_actualizarCategoria
    @idCategoriaProductos int,
    @nombre varchar(45),
    @estados_idEstados int
as
begin
    begin try
        begin transaction;

        -- Validando que la categor�a existe
        if not exists (select 1 from CategoriaProductos where idCategoriaProductos = @idCategoriaProductos)
        begin
            throw 50001, 'La categor�a especificada no existe.', 1;
        end;

        -- Validando que el nombre no exista en otra categor�a
        if exists (select 1 from CategoriaProductos 
                   where nombre = @nombre and idCategoriaProductos != @idCategoriaProductos)
        begin
            throw 50002, 'El nombre de la categor�a ya existe.', 1;
        end;

        -- Validando que el estado exista
        if not exists (select 1 from Estados where idEstados = @estados_idEstados)
        begin
            throw 50003, 'El estado especificado no existe.', 1;
        end;

        update CategoriaProductos
        set 
            nombre = @nombre,
            Estados_idEstados = @estados_idEstados
        where 
            idCategoriaProductos = @idCategoriaProductos;

        declare @estadoInactivo int = 2;
        
        if @estados_idEstados = @estadoInactivo
        begin
            update Productos
            set 
                Estados_idEstados = @estadoInactivo
            where 
                CategoriaProductos_idCategoriaProductos = @idCategoriaProductos;
        end;

        commit transaction;

        select * from CategoriaProductos where idCategoriaProductos = @idCategoriaProductos;
    end try
    begin catch
        if @@TRANCOUNT > 0
            rollback transaction;

        throw;
    end catch
end;
-- <fin categorias>

-- <inicio productos>
create or alter proc p_obtenerProductos
as
begin
	select 
		p.idProductos,
		p.nombre,
		p.marca,
		p.codigo,
		p.stock,
		p.precio,
		p.fecha_creacion,
		p.foto,
		p.CategoriaProductos_idCategoriaProductos,
		p.Usuarios_idUsuarios,
		p.Estados_idEstados,
		e.nombre as 'nombre_estado',
		c.nombre as 'nombre_categoria'
	from 
		Productos p 
			inner join 
		Estados e on p.Estados_idEstados = e.idEstados
			inner join
		CategoriaProductos c on p.CategoriaProductos_idCategoriaProductos = c.idCategoriaProductos
end;

create or alter proc p_obtenerProductoID
	@idProductos int
as
begin
	if not exists(select 1 from Productos where idProductos = @idProductos)
	begin
		throw 50001, 'El producto no existe.', 1;
	end

	select * from Productos where idProductos = @idProductos;
end; 

create or alter proc p_obtenerProductosActivos
as
begin
	select 
		p.idProductos,
		p.nombre,
		p.marca,
		p.foto,
		p.stock,
		p.precio,
		c.nombre as 'nombre_categoria' 
	from 
	Productos p inner join CategoriaProductos c
	on p.CategoriaProductos_idCategoriaProductos = c.idCategoriaProductos
	where p.Estados_idEstados = 1;
end;

create or alter proc p_reducirStockProducto
	@idProductos int,
	@cantidadProducto int
as
begin
	update Productos
	set stock = stock - @cantidadProducto
	where idProductos = @idProductos;

	select * from Productos where idProductos = @idProductos;
end;

create or alter proc p_incrementarStockProducto
	@idProductos int,
	@cantidadProducto int
as
begin
	update Productos
	set stock = stock + @cantidadProducto
	where idProductos = @idProductos;

	select * from Productos where idProductos = @idProductos;
end;

create or alter proc p_insertarProductos
    @categoriaProductos_idCategoriaProductos int,
    @usuarios_idUsuarios int,
    @nombre varchar(45),
    @marca varchar(45),
    @codigo varchar(45),
    @stock int,
    @estados_idEstados int,
    @precio float,
    @fecha_creacion datetime,
    @foto varchar(255) = null
as
begin
	-- Validar que la categor�a exista
	if not exists (select 1 from CategoriaProductos where idCategoriaProductos = @categoriaProductos_idCategoriaProductos)
		begin
			throw 50001, 'La categor�a especificada no existe.', 1;
		end

	-- Validar que el usuario exista
	if not exists (select 1 from Usuarios where idUsuarios = @usuarios_idUsuarios)
		begin
			throw 50002, 'El usuario especificado no existe.', 1;
		end

	-- Validar que el estado exista
	if not exists (select 1 from Estados where idEstados = @estados_idEstados)
		begin
			throw 50003, 'El estado especificado no existe.', 1;
		end

	-- Validar que el stock sea positivo
	if @stock <= 0
		begin
			throw 50004, 'El stock debe ser un valor positivo.', 1;
		end

	-- Validar que el precio sea positivo
	if @precio <= 0
		begin
			throw 50005, 'El precio debe ser un valor positivo.', 1;
		end

	insert into Productos
	(CategoriaProductos_idCategoriaProductos, Usuarios_idUsuarios, nombre,
	marca, codigo, stock, Estados_idEstados, precio, fecha_creacion, foto)
	values
	(@categoriaProductos_idCategoriaProductos, @usuarios_idUsuarios, @nombre,
	@marca, @codigo, @stock, @estados_idEstados, @precio, @fecha_creacion, @foto);

	select * from Productos where idProductos = scope_identity();
end;

create or alter proc p_actualizarProducto
	@idProductos int,
	@categoriaProductos_idCategoriaProductos int,
	@nombre varchar(45),
    @marca varchar(45),
    @codigo varchar(45),
    @stock int,
    @estados_idEstados int,
    @precio float,
	@foto varchar(255) = null
as
begin
	-- Validando que el producto existe
    if not exists (select 1 from Productos where idProductos = @idProductos)
    begin
        throw 50001, 'El producto especificada no existe.', 1;
    end;

    -- Validando que la categor�a existe
    if not exists (select 1 from CategoriaProductos where idCategoriaProductos = @categoriaProductos_idCategoriaProductos)
    begin
		throw 50002, 'La categor�a especificada no existe.', 1;
    end;

    -- Validando que el estado existe
    if not exists (select 1 from Estados where idEstados = @estados_idEstados)
    begin
		throw 50003, 'El estado especificado no existe.', 1;
    end;

    -- Validando que el stock no sea negativo
    if @stock < 0
    begin
		throw 50004, 'El stock no puede ser un valor negativo.', 1;
    end;

    -- Validando que el precio no sea negativo
    if @precio < 0
    begin
		throw 50004, 'El precio no puede ser un valor negativo.', 1;
    end;

	update Productos
    set 
        CategoriaProductos_idCategoriaProductos = @categoriaProductos_idCategoriaProductos,
        nombre = @nombre,
        marca = @marca,
        codigo = @codigo,
        stock = @stock,
        Estados_idEstados = @estados_idEstados,
        precio = @precio,
        foto = @foto
    where 
		idProductos = @idProductos;

	-- Retornando el producto actualizado
	select * from Productos where idProductos = @idProductos;
end;
-- <fin productos>

-- <inicio orden>
create or alter proc p_insertarOrdenConDetalle
    @Usuarios_idUsuarios int,
    @Estados_idEstados int,
    @nombre_completo varchar(100),
    @direccion varchar(545),
    @telefono varchar(45),
    @correo_electronico varchar(50),
    @fecha_entrega date,
    @total_orden float,
    @detalles nvarchar(max)
as
begin
    begin try
        begin transaction

        -- Validando que el usuario existe
        if not exists (select 1 from Usuarios where idUsuarios = @Usuarios_idUsuarios)
        begin
            throw 50001, 'El usuario especificado no existe.', 1;
        end

        -- Validando que el estado existe
        if not exists (select 1 from Estados where idEstados = @Estados_idEstados)
        begin
            throw 50002, 'El estado especificado no existe.', 1;
        end

        insert into Orden (
            Usuarios_idUsuarios, 
            Estados_idEstados, 
            fecha_creacion, 
            nombre_completo, 
            direccion, 
            telefono, 
            correo_electronico, 
            fecha_entrega, 
            total_orden
        )
        values (
            @Usuarios_idUsuarios, 
            @Estados_idEstados, 
            getdate(), 
            @nombre_completo, 
            @direccion, 
            @telefono, 
            @correo_electronico, 
            @fecha_entrega, 
            @total_orden
        );

        declare @idOrden int = scope_identity();

        -- Insertando los detalles de la orden
        insert into OrdenDetalles (
            Orden_idOrden, 
            Productos_idProductos, 
            cantidad, 
            precio, 
            subtotal
        )
        select
            @idOrden,
            Detalles.Productos_idProductos,
            Detalles.cantidad,
            p.precio,
            p.precio * Detalles.cantidad as subtotal
        from
            openjson(@detalles)
            with (
                Productos_idProductos int '$.Productos_idProductos',
                cantidad int '$.cantidad'
            ) as Detalles
        inner join Productos p on Detalles.Productos_idProductos = p.idProductos;

        -- Verificaci�n de existencia de productos en la tabla Productos
        if exists (
            select 1
            from OrdenDetalles od
            left join Productos p on od.Productos_idProductos = p.idProductos
            where od.Orden_idOrden = @idOrden and p.idProductos is null
        )
        begin
            throw 50003, 'Uno o m�s productos en los detalles no existen.', 1;
        end

		select * from Orden where idOrden = @idOrden;

        commit transaction;
    end try
    begin catch
        rollback transaction;
        throw;
    end catch
end;

create or alter proc p_obtenerOrdenes
as
begin
	select 
    o.idOrden,
    o.Usuarios_idUsuarios,
    o.Estados_idEstados,
	e.nombre as 'estado_nombre',
    o.fecha_creacion,
	o.fecha_entrega,
	o.total_orden,
	o.direccion,
    d.Productos_idProductos,
    d.cantidad,
    d.subtotal,
	p.nombre,
	p.foto,
	p.precio,
	p.marca,
	u.idUsuarios,
	u.correo_electronico
	from 
		Orden o
	inner join 
		OrdenDetalles d on o.idOrden = d.Orden_idOrden
	inner join 
		Productos p on p.idProductos = d.Productos_idProductos
	inner join
		Estados e on o.Estados_idEstados = e.idEstados
	inner join 
		Usuarios u on o.Usuarios_idUsuarios = u.idUsuarios
	where o.Estados_idEstados != 15
	order by 
		o.fecha_creacion desc;
end;

create or alter proc p_obtenerOrdenesUsuario
	@idUsuarios int
as
begin
	select 
    o.idOrden,
    o.Usuarios_idUsuarios,
    o.Estados_idEstados,
	e.nombre as 'estado_nombre',
    o.fecha_creacion,
	o.fecha_entrega,
	o.total_orden,
	o.direccion,
    d.Productos_idProductos,
    d.cantidad,
    d.subtotal,
	p.nombre,
	p.foto,
	p.precio,
	p.marca
	from 
		Orden o
	inner join 
		OrdenDetalles d on o.idOrden = d.Orden_idOrden
	inner join 
		Productos p on p.idProductos = d.Productos_idProductos
	inner join
		Estados e on o.Estados_idEstados = e.idEstados
	where o.Usuarios_idUsuarios = @idUsuarios
	order by 
		o.fecha_creacion desc;
end;

create or alter proc p_obtenerOrdenesConfirmadas
as
begin
	select 
    o.idOrden,
    o.Usuarios_idUsuarios,
    o.Estados_idEstados,
	e.nombre as 'estado_nombre',
    o.fecha_creacion,
	o.fecha_entrega,
	o.total_orden,
	o.direccion,
    d.Productos_idProductos,
    d.cantidad,
    d.subtotal,
	p.nombre,
	p.foto,
	p.precio,
	p.marca,
	u.idUsuarios,
	u.correo_electronico
	from 
		Orden o
	inner join 
		OrdenDetalles d on o.idOrden = d.Orden_idOrden
	inner join 
		Productos p on p.idProductos = d.Productos_idProductos
	inner join
		Estados e on o.Estados_idEstados = e.idEstados
	inner join 
		Usuarios u on o.Usuarios_idUsuarios = u.idUsuarios
	where o.Estados_idEstados = 15
	order by 
		o.fecha_creacion desc;
end;

create or alter proc p_obtenerOrdenID
	@idOrden int
as
begin
	select 
    o.idOrden,
    o.Usuarios_idUsuarios,
    o.Estados_idEstados,
    o.fecha_creacion,
    d.Productos_idProductos,
    d.cantidad,
    d.subtotal
	from 
		Orden o
	inner join 
		OrdenDetalles d on o.idOrden = d.Orden_idOrden
	where o.idOrden = @idOrden
	order by 
		o.fecha_creacion desc;
end;

create or alter proc p_entregarOrden
	@idOrden int
as
begin
	update Orden
	set Estados_idEstados = 1012
	where idOrden = @idOrden;

	select * from Orden where idOrden = @idOrden;
end;

create or alter proc p_rechazarOrden
	@idOrden int
as
begin
	update Orden
	set Estados_idEstados = 14
	where idOrden = @idOrden;

	select * from Orden where idOrden = @idOrden;
end;

create or alter proc p_cancelarOrden
	@idOrden int
as
begin
	update Orden
	set Estados_idEstados = 1013
	where idOrden = @idOrden;

	select * from Orden where idOrden = @idOrden;
end;

create or alter proc p_actualizarOrden
	@idOrden int,
    @Estados_idEstados int,
    @nombre_completo varchar(100),
    @direccion varchar(545),
    @telefono varchar(45),
    @correo_electronico varchar(50),
    @fecha_entrega date,
    @total_orden float
as
begin
	if not exists (select 1 from Estados where idEstados = @Estados_idEstados)
        begin
            throw 50001, 'El estado especificado no existe.', 1;
        end

	update Orden
		set 
			Estados_idEstados = @Estados_idEstados,
			nombre_completo = @nombre_completo,
			direccion = @direccion,
			telefono = @telefono,
			correo_electronico = @correo_electronico,
			fecha_entrega = @fecha_entrega,
			total_orden = @total_orden
		where idOrden = @idOrden;

	select * from Orden where idOrden = @idOrden;
end;
-- <fin orden>

-- <inicio tokens>
create or alter proc p_insertarToken
	@token varchar(512)
as
begin
	insert into Tokens (token) values (@token);
end;

create or alter proc p_eliminarToken
	@token varchar(512)
as
begin
	delete from Tokens where token = @token;
end;

create or alter proc p_obtenerToken
	@token varchar(512)
as
begin
	select * from Tokens where token = @token;
end;
-- <fin tokens>

-- creacion de vistas

-- a
create or alter view Total_Productos_Activos_Disponibles
as
select count(p.idProductos) as 'Total de productos activos con stock disponible'
from Productos p inner join Estados e on p.Estados_idEstados = e.idEstados
where lower(e.nombre) = 'activo' and p.stock > 0;

-- b
create or alter view Total_Ordenes_Agosto2024
as
select sum(o.total_orden) as 'Total de Quetzales en ordenes en Agosto 2024'
FROM Orden o
where o.fecha_creacion between '2024-08-01' and '2024-08-31';

-- c
create or alter view Top10_Clientes_Consumo_Ordenes
as
select top 10 sum(o.total_orden) as 'Consumo', o.Usuarios_idUsuarios as 'ID usuario' from Orden o
group by o.Usuarios_idUsuarios
order by Consumo desc;

-- d
create or alter view Top10_Productos_Vendidos
as
select top 10 sum(od.cantidad) as 'Cantidad vendida', od.Productos_idProductos from OrdenDetalles od
group by od.Productos_idProductos
order by [Cantidad vendida] desc;