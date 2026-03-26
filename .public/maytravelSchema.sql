 /* ESQUEMA DE BASE DE DATOS: PLANIFICADOR DE ITINERARIOS INTELIGENTE
   PostgreSQL Syntax
*/

-- 1. USUARIOS
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL UNIQUE,
	role     VARCHAR(10) NOT NULL DEFAULT 'user',
    
    PRIMARY KEY (id)
);

-- 2. INTERESES (Catálogo de gustos: cine, bares, etc.)
DROP TABLE IF EXISTS interests CASCADE;
CREATE TABLE interests (
    id   SERIAL,
    name VARCHAR(50) NOT NULL UNIQUE,
    
    PRIMARY KEY (id)
);

-- 3. RELACIÓN USUARIOS - INTERESES (Tabla Intermedia)
DROP TABLE IF EXISTS users_interests CASCADE;
CREATE TABLE users_interests (
    user_id     INTEGER NOT NULL,
    interest_id INTEGER NOT NULL,
    
    PRIMARY KEY (user_id, interest_id),
    CONSTRAINT fk_user     FOREIGN KEY (user_id)     REFERENCES users(id)     ON DELETE CASCADE,
    CONSTRAINT fk_interest FOREIGN KEY (interest_id) REFERENCES interests(id) ON DELETE CASCADE
);

-- 4. CATÁLOGO DE PUNTOS DE INTERÉS (POI)
-- Almacena lugares conocidos para que la IA los reutilice
DROP TABLE IF EXISTS poi_catalog CASCADE;
CREATE TABLE poi_catalog (
    id                   BIGINT UNIQUE, -- usamos el ID proveniente de Overpass
    name                 TEXT NOT NULL,
    address              TEXT,
    poi                  GEOGRAPHY(POINT, 4326), -- Coordenadas (x, y)
    category             VARCHAR(50),    -- restaurante, cine, parque...
    business_hours       TEXT,
    average_stay_minutes INTEGER DEFAULT 60,
    last_updated         TIMESTAMP DEFAULT now(), -- para saber si el dato es viejo y hay que refrescarlo
    PRIMARY KEY (id)
);

-- 5. VIAJES (Contenedor principal del itinerario por usuario)
DROP TABLE IF EXISTS trips CASCADE;
CREATE TABLE trips (
    id          SERIAL,
    user_id     INTEGER NOT NULL,
    title       TEXT,  -- Se genera según la ciudad del shelter
    shelter     GEOGRAPHY(POINT, 4326),
    arrive_date TIMESTAMP WITH TIME ZONE,
    leave_date  TIMESTAMP WITH TIME ZONE,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    CONSTRAINT fk_trip_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. STOPS (Las paradas individuales de cada viaje)
DROP TABLE IF EXISTS stops CASCADE;
CREATE TABLE stops (
    id             SERIAL,
    trip_id        INTEGER NOT NULL,
    poi_catalog_id BIGINT NOT NULL,
    stop_order     INT NOT NULL, 
    arrival_time   TIMESTAMP WITH TIME ZONE,
    departure_time TIMESTAMP WITH TIME ZONE,

    
    PRIMARY KEY (id),
    CONSTRAINT fk_stop_trip    FOREIGN KEY (trip_id)        REFERENCES trips(id)        ON DELETE CASCADE,
    CONSTRAINT fk_stop_catalog FOREIGN KEY (poi_catalog_id) REFERENCES poi_catalog(id) ON DELETE CASCADE
)