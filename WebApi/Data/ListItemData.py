from pymongo import MongoClient
from bson.objectid import ObjectId
# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
class ListItemData():
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
        return collection.find_one({'_id': listItemId})

    def updateListItem(self, listItem):
        client = MongoClient("mongodb://localhost:27017/")
        db = client.toDoListDB
        collection = db.listItems

        previousItem = getListItemByItemId(listItem["listId"])
        print(listItem["text"])

        return collection.find_one_and_update(
            {'_id': ObjectId(listItem["_id"])},
            {
                '$set': {
                    'listId': listItem["listId"], 
                    'text': listItem["text"],
                    'url': listItem["url"],
                    'completed': listItem["completed"],
                }
            })

    def insert(self, listItem):
        client = MongoClient("mongodb://localhost:27017/")
        db = client.toDoListDB
        collection = db.listItems
        result = collection.insert_one({
            'listId': listItem["listId"], 
            'text': listItem["text"],
            'url': listItem["url"],
            'completed': listItem["completed"],
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