from flask import Flask
from flask import jsonify
import json
from Services.ListService import ListService
app = Flask(__name__)


@app.route('/toDoList/<int:listId>')
def toDoList(listId):
    result = ListService.getListItemsByListId(listId)
    return jsonify({'items': result})