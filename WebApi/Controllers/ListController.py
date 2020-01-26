from flask import Flask
from flask import jsonify
import json
from Services.ListService import ListService
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/toDoList/<int:listId>')
def toDoList(listId):
    result = ListService.getListItemsByListId(listId)
    return jsonify({'items': result})