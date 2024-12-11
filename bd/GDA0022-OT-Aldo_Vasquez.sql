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
	foto binary, 
	constraint PK_Productos primary key (idProductos)
);

create table Usuarios(
	idUsuarios int identity(1, 1),
	correo_electronico varchar(50) not null,
	nombre_completo varchar(100) not null,
	password varchar(45) not null,
	telefono varchar(45),
	fecha_nacimiento date not null,
	fecha_creacion datetime not null,
	constraint PK_Usuarios primary key (idUsuarios)
);

create table CategoriaProductos(
	idCategoriaProductos int identity(1, 1), 
	nombre varchar(45) not null,
	fecha_creacion datetime not null,
	constraint PK_CategoriaProductos primary key (idCategoriaProductos)
);

create table Estados(
	idEstados int identity(1, 1), 
	nombre varchar(45) not null,
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
('Lácteos', GETDATE(), 3, 1),
('Bebidas', GETDATE(), 3, 1),
('Snacks', GETDATE(), 3, 1),
('Higiene Personal', GETDATE(), 3, 1),
('Limpieza', GETDATE(), 3, 1),
('Panadería', GETDATE(), 3, 1),
('Carnes', GETDATE(), 3, 1),
('Electrodomésticos', GETDATE(), 3, 1),
('Frutas y Verduras', GETDATE(), 3, 1);

INSERT INTO Productos (nombre, marca, codigo, stock, precio, fecha_creacion, foto, CategoriaProductos_idCategoriaProductos, Usuarios_idUsuarios, Estados_idEstados) VALUES 
('Leche Entera', 'MarcaX', '001', 50, 10.00, GETDATE(), NULL, 2, 3, 1),
('Queso Mozzarella', 'MarcaY', '002', 20, 15.00, GETDATE(), NULL, 2, 3, 1),
('Refresco de Cola', 'MarcaZ', '003', 100, 5.00, GETDATE(), NULL, 3, 3, 1),
('Jabón de Tocador', 'MarcaA', '004', 80, 8.00, GETDATE(), NULL, 5, 3, 1),
('Detergente Líquido', 'MarcaB', '005', 30, 25.00, GETDATE(), NULL, 6, 3, 1),
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
create or alter proc p_insertarEstado
    @nombre varchar(45)
as
begin
    begin transaction;
    begin try
        insert into Estados (nombre) values (@nombre);
        commit transaction;
        print 'Inserción en Estados exitosa';
    end try
    begin catch
        print 'Ocurrió un error: ' + error_message();
        rollback transaction;
    end catch
end;

create or alter proc p_insertarRol
    @nombre varchar(45)
as
begin
    begin transaction;
    begin try
        insert into Rol (nombre) values (@nombre);
        commit transaction;
        print 'Inserción en Rol exitosa';
    end try
    begin catch
        print 'Ocurrió un error: ' + error_message();
        rollback transaction;
    end catch
end;

create or alter proc p_insertarCliente
    @razon_social varchar(245),
    @nombre_comercial varchar(100),
    @direccion_entrega varchar(45),
    @telefono varchar(45),
    @email varchar(45)
as
begin
    begin transaction;
    begin try
        insert into Clientes (razon_social, nombre_comercial, direccion_entrega, telefono, email)
        values (@razon_social, @nombre_comercial, @direccion_entrega, @telefono, @email);
        commit transaction;
        print 'Inserción en Clientes exitosa';
    end try
    begin catch
        print 'Ocurrió un error: ' + error_message();
        rollback transaction;
    end catch
end;

create or alter proc p_insertarUsuario
    @rol_idRol int,
    @estados_idEstados int,
    @correo_electronico varchar(50),
    @nombre_completo varchar(100),
    @password varchar(45),
    @telefono varchar(45),
    @fecha_nacimiento date,
    @fecha_creacion datetime,
    @clientes_idClientes int = null
as
begin
    begin transaction;
    begin try
        insert into Usuarios
            (Rol_idRol, Estados_idEstados, correo_electronico, nombre_completo,
            password, telefono, fecha_nacimiento, fecha_creacion, Clientes_idClientes)
        values
            (@rol_idRol, @estados_idEstados, @correo_electronico, @nombre_completo,
            @password, @telefono, @fecha_nacimiento, @fecha_creacion, @clientes_idClientes);
        commit transaction;
        print 'Inserción en Usuarios exitosa';
    end try
    begin catch
        print 'Ocurrió un error: ' + error_message();
        rollback transaction;
    end catch
end;

create or alter proc p_insertarCategoriaProductos
    @usuarios_idUsuarios int,
    @nombre varchar(45),
    @estados_idEstados int,
    @fecha_creacion datetime
as
begin
    begin transaction;
    begin try
        insert into CategoriaProductos
            (Usuarios_idUsuarios, nombre, Estados_idEstados, fecha_creacion)
        values (@usuarios_idUsuarios, @nombre, @estados_idEstados, @fecha_creacion);
        commit transaction;
        print 'Inserción en CategoriaProductos exitosa';
    end try
    begin catch
        print 'Ocurrió un error: ' + error_message();
        rollback transaction;
    end catch
end;

create or alter proc p_insertarProductos
    @categoriaProductos_idCategoriaProductos int,
    @usuarios_idUsuarios int,
    @nombre varchar(45),
    @marca varchar(45),
    @codigo varchar(45),
    @stock float,
    @estados_idEstados int,
    @precio float,
    @fecha_creacion datetime,
    @foto binary = null
as
begin
    begin transaction;
    begin try
        insert into Productos
            (CategoriaProductos_idCategoriaProductos, Usuarios_idUsuarios, nombre,
            marca, codigo, stock, Estados_idEstados, precio, fecha_creacion, foto)
        values
            (@categoriaProductos_idCategoriaProductos, @usuarios_idUsuarios, @nombre,
            @marca, @codigo, @stock, @estados_idEstados, @precio, @fecha_creacion, @foto);
        commit transaction;
        print 'Inserción en Productos exitosa';
    end try
    begin catch
        print 'Ocurrió un error: ' + error_message();
        rollback transaction;
    end catch
end;

create or alter proc p_insertarOrden
    @usuarios_idUsuarios int,
    @estados_idEstados int,
    @fecha_creacion datetime,
    @nombre_completo varchar(100),
    @direccion varchar(545),
    @telefono varchar(45),
    @correo_electronico varchar(50),
    @fecha_entrega date,
    @total_orden float
as
begin
    begin transaction;
    begin try
        insert into Orden
            (Usuarios_idUsuarios, Estados_idEstados, fecha_creacion, nombre_completo,
            direccion, telefono, correo_electronico, fecha_entrega, total_orden)
        values
            (@usuarios_idUsuarios, @estados_idEstados, @fecha_creacion,
            @nombre_completo, @direccion, @telefono, @correo_electronico,
            @fecha_entrega, @total_orden);
        commit transaction;
        print 'Inserción en Orden exitosa';
    end try
    begin catch
        print 'Ocurrió un error: ' + error_message();
        rollback transaction;
    end catch
end;

create or alter proc p_insertarOrdenDetalles
    @orden_idOrden int,
    @productos_idProductos int,
    @cantidad int,
    @precio float,
    @subtotal float
as
begin
    begin transaction;
    begin try
        insert into OrdenDetalles
            (Orden_idOrden, Productos_idProductos, cantidad, precio, subtotal)
        values
            (@orden_idOrden, @productos_idProductos, @cantidad, @precio, @subtotal);
        commit transaction;
        print 'Inserción en OrdenDetalles exitosa';
    end try
    begin catch
        print 'Ocurrió un error: ' + error_message();
        rollback transaction;
    end catch
end;

create or alter proc p_actualizarCategoriaProducto
	@idProducto int,
	@CategoriaProducto_idCategoriaProducto int
as
begin
	begin transaction; 
	begin try
		update Productos
		set CategoriaProductos_idCategoriaProductos = @CategoriaProducto_idCategoriaProducto
		where idProductos = @idProducto;
		commit transaction;
		print 'Actualizacion exitosa';
	end try
	begin catch
		print 'Ocurrio un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarNombreProducto
	@idProducto int,
	@nombre varchar(45)
as
begin
	begin transaction; 
	begin try
		if @nombre = '' or @nombre is null
		begin
			throw 50000, 'El nombre no puede estar vacío', 1;
		end
		
		update Productos
		set nombre = @nombre
		where idProductos = @idProducto;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarMarcaProducto
	@idProducto int,
	@marca varchar(45)
as
begin
	begin transaction; 
	begin try
		if @marca = '' or @marca is null
		begin
			throw 50000, 'La marca no puede estar vacía', 1;
		end
		
		update Productos
		set marca = @marca
		where idProductos = @idProducto;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarCodigoProducto
	@idProducto int,
	@codigo varchar(45)
as
begin
	begin transaction; 
	begin try
		if @codigo = '' or @codigo is null
		begin
			throw 50000, 'El código no puede estar vacío', 1;
		end
		
		update Productos
		set codigo = @codigo
		where idProductos = @idProducto;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarStockProducto
	@idProducto int,
	@stock int
as
begin
	begin transaction; 
	begin try
		if @stock < 0
		begin
			throw 50000, 'El stock no puede ser negativo', 1;
		end
		
		update Productos
		set stock = @stock
		where idProductos = @idProducto;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarEstadoProducto
	@idProducto int,
	@estado int
as
begin
	begin transaction; 
	begin try
		update Productos
		set Estados_idEstados = @estado
		where idProductos = @idProducto;
		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarPrecioProducto
	@idProducto int,
	@precio float
as
begin
	begin transaction; 
	begin try
		if @precio <= 0
		begin
			throw 50000, 'El precio debe ser mayor que cero', 1;
		end
		
		update Productos
		set precio = @precio
		where idProductos = @idProducto;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarFotoProducto
	@idProducto int,
	@foto binary
as
begin
	begin transaction; 
	begin try
		if @foto is null
		begin
			throw 50000, 'La foto no puede estar vacía', 1;
		end
		
		update Productos
		set foto = @foto
		where idProductos = @idProducto;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarEstadoUsuario
	@idUsuario int,
	@estado int
as
begin
	begin transaction; 
	begin try
		update Usuarios
		set Estados_idEstados = @estado
		where idUsuarios = @idUsuario;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarCorreoUsuario
	@idUsuario int,
	@correo_electronico varchar(50)
as
begin
	begin transaction; 
	begin try
		if @correo_electronico = '' or @correo_electronico is null
		begin
			throw 50000, 'El correo electrónico no puede estar vacío', 1;
		end
		if not (@correo_electronico like '%@%.%')
		begin
			throw 50000, 'El formato del correo electrónico no es válido', 1;
		end
		
		update Usuarios
		set correo_electronico = @correo_electronico
		where idUsuarios = @idUsuario;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarNombreCompletoUsuario
	@idUsuario int,
	@nombre_completo varchar(100)
as
begin
	begin transaction; 
	begin try
		if @nombre_completo = '' or @nombre_completo is null
		begin
			throw 50000, 'El nombre completo no puede estar vacío', 1;
		end
		
		update Usuarios
		set nombre_completo = @nombre_completo
		where idUsuarios = @idUsuario;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarPasswordUsuario
	@idUsuario int,
	@password varchar(45)
as
begin
	begin transaction; 
	begin try		
		update Usuarios
		set password = @password
		where idUsuarios = @idUsuario;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarTelefonoUsuario
	@idUsuario int,
	@telefono varchar(45)
as
begin
	begin transaction; 
	begin try
		if @telefono = '' or @telefono is null
		begin
			throw 50000, 'El teléfono no puede estar vacío', 1;
		end
		
		update Usuarios
		set telefono = @telefono
		where idUsuarios = @idUsuario;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarNombreCategoria
	@idCategoria int,
	@nombre varchar(45)
as
begin
	begin transaction;
	begin try
		if @nombre = '' or @nombre is null
		begin
			throw 50000, 'El nombre de la categoría no puede estar vacío o nulo', 1;
		end

		update CategoriaProductos
		set nombre = @nombre
		where idCategoriaProductos = @idCategoria;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarEstadoCategoria
	@idCategoria int,
	@estado int
as
begin
	begin transaction;
	begin try		
		update CategoriaProductos
		set Estados_idEstados = @estado
		where idCategoriaProductos = @idCategoria;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarNombreEstado
	@idEstado int,
	@nombre varchar(45)
as
begin
	begin transaction;
	begin try
		if @nombre = '' or @nombre is null
		begin
			throw 50000, 'El nombre del estado no puede estar vacío o nulo', 1;
		end
		
		update Estados
		set nombre = @nombre
		where idEstados = @idEstado;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarNombreRol
	@idRol int,
	@nombre varchar(45)
as
begin
	begin transaction;
	begin try
		if @nombre = '' or @nombre is null
		begin
			throw 50000, 'El nombre del rol no puede estar vacío o nulo', 1;
		end

		update Roles
		set nombre = @nombre
		where idRol = @idRol;

		commit transaction;
		print 'Actualización exitosa';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarCantidadOrdenDetalle
	@idOrdenDetalle int,
	@cantidad int
as
begin
	begin transaction;
	begin try
		if @cantidad <= 0
		begin
			throw 50000, 'La cantidad debe ser un número positivo mayor a cero.', 1;
		end

		update OrdenDetalles
		set cantidad = @cantidad
		where idOrdenDetalles = @idOrdenDetalle;

		commit transaction;
		print 'Actualización de cantidad exitosa.';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarPrecioOrdenDetalle
	@idOrdenDetalle int,
	@precio float 
as
begin
	begin transaction;
	begin try
		if @precio <= 0
		begin
			throw 50000, 'El precio debe ser un número positivo mayor a cero.', 1;
		end

		update OrdenDetalles
		set precio = @precio
		where idOrdenDetalles = @idOrdenDetalle;

		commit transaction;
		print 'Actualización de precio exitosa.';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarSubtotalOrdenDetalle
	@idOrdenDetalle int,
	@subtotal float
as
begin
	begin transaction;
	begin try
		if @subtotal <= 0
		begin
			throw 50000, 'El subtotal debe ser un número positivo mayor a cero.', 1;
		end

		update OrdenDetalles
		set subtotal = @subtotal
		where idOrdenDetalles = @idOrdenDetalle;

		commit transaction;
		print 'Actualización de subtotal exitosa.';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarEstadoOrden
	@idOrden int,
	@estado int
as
begin
	begin transaction;
	begin try
		update Orden
		set Estados_idEstados = @estado
		where idOrden = @idOrden;

		commit transaction;
		print 'Actualización de estado exitosa.';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarNombreCompletoOrden
	@idOrden int,
	@nombreCompleto varchar(100)
as
begin
	begin transaction;
	begin try
		update Orden
		set nombre_completo = @nombreCompleto
		where idOrden = @idOrden;

		commit transaction;
		print 'Actualización de nombre completo exitosa.';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarDireccionOrden
	@idOrden int,
	@direccion varchar(545)
as
begin
	begin transaction;
	begin try
		update Orden
		set direccion = @direccion
		where idOrden = @idOrden;

		commit transaction;
		print 'Actualización de dirección exitosa.';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarTelefonoOrden
	@idOrden int,
	@telefono varchar(45)
as
begin
	begin transaction;
	begin try
		update Orden
		set telefono = @telefono
		where idOrden = @idOrden;

		commit transaction;
		print 'Actualización de teléfono exitosa.';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarCorreoElectronicoOrden
	@idOrden int,
	@correoElectronico varchar(50)
as
begin
	begin transaction;
	begin try
		update Orden
		set correo_electronico = @correoElectronico
		where idOrden = @idOrden;

		commit transaction;
		print 'Actualización de correo electrónico exitosa.';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarFechaEntregaOrden
	@idOrden int,
	@fechaEntrega date
as
begin
	begin transaction;
	begin try
		update Orden
		set fecha_entrega = @fechaEntrega
		where idOrden = @idOrden;

		commit transaction;
		print 'Actualización de fecha de entrega exitosa.';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarRazonSocialCliente
	@idCliente int,
	@razonSocial varchar(245)
as
begin
	begin transaction;
	begin try
		update Cliente
		set razon_social = @razonSocial
		where idCliente = @idCliente;

		commit transaction;
		print 'Actualización de razón social exitosa.';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarNombreComercialCliente
	@idCliente int,
	@nombreComercial varchar(200)
as
begin
	begin transaction;
	begin try
		update Cliente
		set nombre_comercial = @nombreComercial
		where idCliente = @idCliente;

		commit transaction;
		print 'Actualización de nombre comercial exitosa.';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarDireccionEntregaCliente
	@idCliente int,
	@direccionEntrega varchar(300)
as
begin
	begin transaction;
	begin try
		update Cliente
		set direccion_entrega = @direccionEntrega
		where idCliente = @idCliente;

		commit transaction;
		print 'Actualización de dirección de entrega exitosa.';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarTelefonoCliente
	@idCliente int,
	@telefono varchar(45)
as
begin
	begin transaction;
	begin try
		update Cliente
		set telefono = @telefono
		where idCliente = @idCliente;

		commit transaction;
		print 'Actualización de teléfono exitosa.';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

create or alter proc p_actualizarEmailCliente
	@idCliente int,
	@email varchar(100)
as
begin
	begin transaction;
	begin try
		update Cliente
		set email = @email
		where idCliente = @idCliente;

		commit transaction;
		print 'Actualización de email exitosa.';
	end try
	begin catch
		print 'Ocurrió un error: ' + error_message();
		rollback transaction;
	end catch
end;

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
