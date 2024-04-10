from bson import ObjectId
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})  # Permitir solicitudes desde localhost:4200

mongo_uri = "mongodb+srv://ismael:1234@streaming.zkgnjwl.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client.get_database("appstreaming")
usuarios_collection = db.usuarios
peliculas_collection = db.peliculas
series_collection = db.series
log = db.log

# Resto de tu código...

# Manejo de solicitudes OPTIONS para CORS
@app.route('/<path:path>', methods=['OPTIONS'])
def handle_options(path):
    response = jsonify({'message': 'success'})
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
    return response

@app.route('/login', methods=['POST'])
def login():
    datos_login = request.json
    correo = datos_login.get('correo')
    contrasenia = datos_login.get('contrasenia')

    usuario = usuarios_collection.find_one({"correo": correo, "contrasenia": contrasenia})
    usuarios_collection.insert_one({"correo": correo, "log": "se ejecuto el loggeo correctamente"})

    if usuario:
        return jsonify({"mensaje": "Inicio de sesión exitoso"}), 200
    else:
        return jsonify({"mensaje": "Correo electrónico o contraseña incorrectos"}), 401
    
# Agregar esta ruta al final del archivo app.py
@app.route('/cambiar_contrasenia', methods=['POST'])
def cambiar_contrasenia():
    datos = request.json
    correo = datos.get('correo')
    contrasenia_actual = datos.get('contrasenia_actual')
    nueva_contrasenia = datos.get('nueva_contrasenia')

    # Verificar si el correo y la contraseña actual son correctos
    usuario = usuarios_collection.find_one({"correo": correo, "contrasenia": contrasenia_actual})
    if usuario:
        # Actualizar la contraseña del usuario
        usuarios_collection.update_one({"correo": correo}, {"$set": {"contrasenia": nueva_contrasenia}})
        return jsonify({"mensaje": "Contraseña cambiada exitosamente"}), 200
    else:
        return jsonify({"mensaje": "Correo electrónico o contraseña actual incorrectos"}), 401


@app.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    usuarios = list(usuarios_collection.find({}))
    for user in usuarios:
        user['_id'] = str(user['_id'])
    return jsonify(usuarios)

@app.route('/usuario/<string:usuario_id>', methods=['GET'])
def obtener_usuario(usuario_id):
    usuario = usuarios_collection.find_one({"_id": ObjectId(usuario_id)})
    if usuario:
        usuario['_id'] = str(usuario['_id'])
        return jsonify(usuario)
    else:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404

@app.route('/usuario', methods=['POST'])
def agregar_usuario():
    nuevo_usuario = request.json
    usuarios_collection.insert_one(nuevo_usuario)
    return jsonify({"mensaje": "Usuario creado exitosamente"}), 201

@app.route('/usuario/<string:usuario_id>', methods=['PUT'])
def actualizar_usuario(usuario_id):
    usuario_actualizado = request.json
    usuarios_collection.update_one({"_id": ObjectId(usuario_id)}, {"$set": usuario_actualizado})
    return jsonify({"mensaje": "Usuario actualizado exitosamente"})

@app.route('/usuario/<string:usuario_id>', methods=['DELETE'])
def eliminar_usuario(usuario_id):
    usuarios_collection.delete_one({"_id": ObjectId(usuario_id)})
    return jsonify({"mensaje": "Usuario eliminado exitosamente"})

@app.route('/series', methods=['GET'])
def obtener_series():
    series = list(series_collection.find({}))
    for serie in series:
        serie['_id'] = str(serie['_id'])
    return jsonify(series)

@app.route('/titulo/<string:titulo>', methods=['GET'])
def obtener_contenido_por_titulo(titulo):
    try:
        serie = series_collection.find_one({"titulo": titulo})
        if serie:
            serie['_id'] = str(serie['_id'])
            return jsonify(serie)
        else:
            pelicula = peliculas_collection.find_one({"titulo": titulo})
            if pelicula:
                pelicula['_id'] = str(pelicula['_id'])
                return jsonify(pelicula)
            else:
                return jsonify({"mensaje": f"Contenido con título '{titulo}' no encontrado"}), 404
    except Exception as e:
        return jsonify({"mensaje": "Error al buscar el contenido por título", "error": str(e)}), 500

@app.route('/serie/<string:serie_id>', methods=['GET'])
def obtener_serie(serie_id):
    serie = series_collection.find_one({"_id": ObjectId(serie_id)})
    if serie:
        serie['_id'] = str(serie['_id'])
        return jsonify(serie)
    else:
        return jsonify({"mensaje": "Serie no encontrada"}), 404

@app.route('/serie', methods=['POST'])
def agregar_serie():
    nueva_serie = request.json
    series_collection.insert_one(nueva_serie)
    return jsonify({"mensaje": "Serie creada exitosamente"}), 201

@app.route('/serie/<string:serie_id>', methods=['PUT'])
def actualizar_serie(serie_id):
    serie_actualizada = request.json
    series_collection.update_one({"_id": ObjectId(serie_id)}, {"$set": serie_actualizada})
    return jsonify({"mensaje": "Serie actualizada exitosamente"})

@app.route('/serie/<string:serie_id>', methods=['DELETE'])
def eliminar_serie(serie_id):
    series_collection.delete_one({"_id": ObjectId(serie_id)})
    return jsonify({"mensaje": "Serie eliminada exitosamente"})

@app.route('/peliculas', methods=['GET'])
def obtener_peliculas():
    peliculas = list(peliculas_collection.find({}))
    for pelicula in peliculas:
        pelicula['_id'] = str(pelicula['_id'])
    return jsonify(peliculas)

@app.route('/pelicula/<string:pelicula_id>', methods=['GET'])
def obtener_pelicula(pelicula_id):
    pelicula = peliculas_collection.find_one({"_id": ObjectId(pelicula_id)})
    if pelicula:
        pelicula['_id'] = str(pelicula['_id'])
        return jsonify(pelicula)
    else:
        return jsonify({"mensaje": "Película no encontrada"}), 404
    
@app.route('/peliculas/titulo/<string:titulo>', methods=['GET'])
def obtener_pelicula_por_titulo(titulo):
    try:
        pelicula = peliculas_collection.find_one({"Titulo": titulo})
        if pelicula:
            pelicula['_id'] = str(pelicula['_id'])
            return jsonify(pelicula)
        else:
            return jsonify({"mensaje": f"Película con título '{titulo}' no encontrada"}), 404
    except Exception as e:
        return jsonify({"mensaje": "Error al buscar la película", "error": str(e)}), 500

@app.route('/pelicula', methods=['POST'])
def agregar_pelicula():
    nueva_pelicula = request.json
    peliculas_collection.insert_one(nueva_pelicula)
    return jsonify({"mensaje": "Película creada exitosamente"}), 201

@app.route('/pelicula/<string:pelicula_id>', methods=['PUT'])
def actualizar_pelicula(pelicula_id):
    pelicula_actualizada = request.json

    # Elimina el campo _id del documento de actualización si existe
    if '_id' in pelicula_actualizada:
        del pelicula_actualizada['_id']

    # Actualiza el documento de la película sin modificar el campo _id
    peliculas_collection.update_one({"_id": ObjectId(pelicula_id)}, {"$set": pelicula_actualizada})
    return jsonify({"mensaje": "Película actualizada exitosamente"})

@app.route('/pelicula/<string:pelicula_id>', methods=['DELETE'])
def eliminar_pelicula(pelicula_id):
    peliculas_collection.delete_one({"_id": ObjectId(pelicula_id)})
    return jsonify({"mensaje": "Película eliminada exitosamente"})

if __name__ == '__main__':
    app.run(debug=True)
