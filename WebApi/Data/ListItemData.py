from pymongo import MongoClient
from bson.objectid import ObjectId

class ListItemData(object):
        
    def getByListId(self, listId):
        client = MongoClient("mongodb://localhost:27017/")
        db = client.toDoListDB
        collection = db.listItems
        results = []
        for result in collection.find({'listId': listId}):
            result['_id'] = str(result['_id'])
            results.append(result)
        return results

    def getListItemByItemId(self, listItemId):
        client = MongoClient("mongodb://localhost:27017/")
        db = client.toDoListDB
        collection = db.listItems
        results = []
        return collection.find_one({'_id': ObjectId(listItemId)})

    def updateListItem(self, listItem):
        client = MongoClient("mongodb://localhost:27017/")
        db = client.toDoListDB
        collection = db.listItems
        query = {'_id': ObjectId(listItem["_id"])}
        previousDocument = collection.find_one(query)
        return collection.find_one_and_update(
            query,
            {
                '$set': {
                    'listId': listItem["listId"] if "listId" in listItem else previousDocument["listId"], 
                    'text': listItem["text"] if "text" in listItem else previousDocument["text"],
                    'url': listItem["url"] if "url" in listItem else previousDocument["url"],
                    'completed': listItem["completed"] if "completed" in listItem else previousDocument["completed"],
                }
            }
        )

    def insert(self, listItem):
        client = MongoClient("mongodb://localhost:27017/")
        db = client.toDoListDB
        collection = db.listItems
        result = collection.insert_one({
            'listId': listItem["listId"], 
            'text': listItem["text"],
            'url': listItem["url"],
            'completed': listItem["completed"] if "completed" in listItem else False,
        })
        return result
    
    def deleteByItemId(self, itemId):
        client = MongoClient("mongodb://localhost:27017/")
        db = client.toDoListDB
        collection = db.listItems
        result = collection.delete_one({
            '_id': ObjectId(itemId)
        })
        return result.deleted_count