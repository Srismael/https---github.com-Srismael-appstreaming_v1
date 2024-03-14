from bson import ObjectId
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

# Creamos una instancia de la aplicación Flask
app = Flask(__name__)
CORS(app) 
# Configuramos la URI de conexión a MongoDB Atlas
mongo_uri = "mongodb+srv://ismael:1234@streaming.zkgnjwl.mongodb.net/?retryWrites=true&w=majority"

# Creamos un cliente de MongoDB
client = MongoClient(mongo_uri)

# Seleccionamos la base de datos y la colección
db = client.get_database("appstreaming")
usuarios_collection = db.usuarios
peliculas_collection = db.peliculas
series_collection = db.series


@app.route('/login', methods=['POST'])
def login():
    datos_login = request.json
    correo = datos_login.get('correo')
    contrasenia = datos_login.get('contrasenia')

    # Verificar si el correo y la contraseña son válidos
    usuario = usuarios_collection.find_one({"correo": correo, "contrasenia": contrasenia})
    if usuario:
        # Usuario autenticado correctamente
        return jsonify({"mensaje": "Inicio de sesión exitoso"}), 200
    else:
        # Credenciales incorrectas
        return jsonify({"mensaje": "Correo electrónico o contraseña incorrectos"}), 401


# Ruta para obtener todos los usuarios
@app.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    usuarios = list(usuarios_collection.find({}))
    # Convert ObjectId to string for each user
    for user in usuarios:
        user['_id'] = str(user['_id'])
    return jsonify(usuarios)

# Ruta para obtener información de un usuario por su ID
@app.route('/usuario/<string:usuario_id>', methods=['GET'])  # Changed int to string
def obtener_usuario(usuario_id):
    usuario = usuarios_collection.find_one({"_id": ObjectId(usuario_id)})  # Convert string to ObjectId
    if usuario:
        usuario['_id'] = str(usuario['_id'])  # Convert ObjectId to string
        return jsonify(usuario)
    else:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404

# Ruta para agregar un nuevo usuario
@app.route('/usuario', methods=['POST'])
def agregar_usuario():
    nuevo_usuario = request.json
    usuarios_collection.insert_one(nuevo_usuario)
    return jsonify({"mensaje": "Usuario creado exitosamente"}), 201

# Ruta para actualizar información de un usuario por su ID
@app.route('/usuario/<string:usuario_id>', methods=['PUT'])  # Changed int to string
def actualizar_usuario(usuario_id):
    usuario_actualizado = request.json
    usuarios_collection.update_one({"_id": ObjectId(usuario_id)}, {"$set": usuario_actualizado})  # Convert string to ObjectId
    return jsonify({"mensaje": "Usuario actualizado exitosamente"})

# Ruta para eliminar un usuario por su ID
@app.route('/usuario/<string:usuario_id>', methods=['DELETE'])  # Changed int to string
def eliminar_usuario(usuario_id):
    usuarios_collection.delete_one({"_id": ObjectId(usuario_id)})  # Convert string to ObjectId
    return jsonify({"mensaje": "Usuario eliminado exitosamente"})


# Ruta para obtener todas las series
@app.route('/series', methods=['GET'])
def obtener_series():
    series = list(series_collection.find({}))
    # Convert ObjectId to string for each serie
    for serie in series:
        serie['_id'] = str(serie['_id'])
    return jsonify(series)

# Ruta para obtener información de una serie por su ID
@app.route('/serie/<string:serie_id>', methods=['GET'])
def obtener_serie(serie_id):
    serie = series_collection.find_one({"_id": ObjectId(serie_id)})  # Convert string to ObjectId
    if serie:
        serie['_id'] = str(serie['_id'])  # Convert ObjectId to string
        return jsonify(serie)
    else:
        return jsonify({"mensaje": "Serie no encontrada"}), 404

# Ruta para agregar una nueva serie
@app.route('/serie', methods=['POST'])
def agregar_serie():
    nueva_serie = request.json
    series_collection.insert_one(nueva_serie)
    return jsonify({"mensaje": "Serie creada exitosamente"}), 201

# Ruta para actualizar información de una serie por su ID
@app.route('/serie/<string:serie_id>', methods=['PUT'])
def actualizar_serie(serie_id):
    serie_actualizada = request.json
    series_collection.update_one({"_id": ObjectId(serie_id)}, {"$set": serie_actualizada})  # Convert string to ObjectId
    return jsonify({"mensaje": "Serie actualizada exitosamente"})

# Ruta para eliminar una serie por su ID
@app.route('/serie/<string:serie_id>', methods=['DELETE'])
def eliminar_serie(serie_id):
    series_collection.delete_one({"_id": ObjectId(serie_id)})  # Convert string to ObjectId
    return jsonify({"mensaje": "Serie eliminada exitosamente"})


# Ruta para obtener todas las películas
@app.route('/peliculas', methods=['GET'])
def obtener_peliculas():
    peliculas = list(peliculas_collection.find({}))
    # Convert ObjectId to string for each película
    for pelicula in peliculas:
        pelicula['_id'] = str(pelicula['_id'])
    return jsonify(peliculas)

# Ruta para obtener información de una película por su ID
@app.route('/pelicula/<string:pelicula_id>', methods=['GET'])
def obtener_pelicula(pelicula_id):
    pelicula = peliculas_collection.find_one({"_id": ObjectId(pelicula_id)})  # Convert string to ObjectId
    if pelicula:
        pelicula['_id'] = str(pelicula['_id'])  # Convert ObjectId to string
        return jsonify(pelicula)
    else:
        return jsonify({"mensaje": "Película no encontrada"}), 404

# Ruta para agregar una nueva película
@app.route('/pelicula', methods=['POST'])
def agregar_pelicula():
    nueva_pelicula = request.json
    peliculas_collection.insert_one(nueva_pelicula)
    return jsonify({"mensaje": "Película creada exitosamente"}), 201

# Ruta para actualizar información de una película por su ID
@app.route('/pelicula/<string:pelicula_id>', methods=['PUT'])
def actualizar_pelicula(pelicula_id):
    pelicula_actualizada = request.json
    peliculas_collection.update_one({"_id": ObjectId(pelicula_id)}, {"$set": pelicula_actualizada})  # Convert string to ObjectId
    return jsonify({"mensaje": "Película actualizada exitosamente"})

# Ruta para eliminar una película por su ID
@app.route('/pelicula/<string:pelicula_id>', methods=['DELETE'])
def eliminar_pelicula(pelicula_id):
    peliculas_collection.delete_one({"_id": ObjectId(pelicula_id)})  # Convert string to ObjectId
    return jsonify({"mensaje": "Película eliminada exitosamente"})


# Ejecutamos la aplicación si este script es el programa principal
if __name__ == '__main__':
    app.run(debug=True)