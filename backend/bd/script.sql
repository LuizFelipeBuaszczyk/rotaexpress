/* modelagem: */

CREATE TABLE User (
    id_user nvarchar(32) PRIMARY KEY,
    name nvarchar(50),
    cpf nvarchar(14) UNIQUE,
    password nvarchar(50),
    email nvarchar(100),
    phone_number nvarchar(20)
);

CREATE TABLE Firm (
    id_firm nvarchar(32) PRIMARY KEY,
    name nvarchar(14),
    address nvarchar(200),
    fk_id_user nvarchar(32)
);

CREATE TABLE Delivery (
    id_delivery nvarchar(32) PRIMARY KEY,
    status nvarchar(20),
    delivery_date date,
    address nvarchar(200),
    fk_id_routes nvarchar(32)
);

CREATE TABLE Product (
    id_product nvarchar(32) PRIMARY KEY,
    name nvarchar(50),
    description nvarchar(200),
    fk_id_delivery nvarchar(32)
);

CREATE TABLE Routes (
    id_routes nvarchar(32) PRIMARY KEY,
    cpf nvarchar(14),
    fk_id_firm nvarchar(32)
);
 
ALTER TABLE Firm ADD CONSTRAINT FK_Firm_1
    FOREIGN KEY (name)
    REFERENCES User (cpf);
 
ALTER TABLE Firm ADD CONSTRAINT FK_Firm_2
    FOREIGN KEY (fk_id_user???)
    REFERENCES ??? (???);
 
ALTER TABLE Delivery ADD CONSTRAINT FK_Delivery_1
    FOREIGN KEY (fk_id_routes???)
    REFERENCES ??? (???);
 
ALTER TABLE Product ADD CONSTRAINT FK_Product_1
    FOREIGN KEY (fk_id_delivery???)
    REFERENCES ??? (???);
 
ALTER TABLE Routes ADD CONSTRAINT FK_Routes_2
    FOREIGN KEY (fk_id_firm???)
    REFERENCES ??? (???);