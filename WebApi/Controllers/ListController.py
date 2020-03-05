from flask import Flask, request
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

@app.route('/api/toDoList/listItem', methods=['POST'])
def listItem():
    listItem = request.get_data()
    result = ListService.insertOrUpdateListItem(listItem)
    return str(result.acknowledged)

@app.route('/api/toDoList/listItem/<string:itemId>', methods=['DELETE'])
def deleteListItem(itemId):
    itemDeleted = ListService.deleteListItem(itemId)
    if(itemDeleted >= 1):
        response = jsonify(message="Item Deleted")
        response.status_code = 200
        return response
    else:
        response = jsonify(error="No Item Deleted")
        response.status_code = 400
        return response