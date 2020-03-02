from Models.ListItem import ListItem
from Models.ToDoList import ToDoList
from Data.ListItemData import ListItemData
import json

class ListService():
    def __init__(self, db):
        self.db = db

    def getListItemsByListId(listId):
        #returning the default list item until the db is set up
        #for each list item with listID = listId, create dictionary and return
        listItemData = ListItemData(self.db)
        items = listItemData.getByListId(listId)
        return items

    def insertListItem(listItem):
        listItemData = ListItemData(self.db)
        result = listItemData.insert(json.loads(listItem))
        return result

    def deleteListItem(itemId):
        listItemData = ListItemData(self.db)
        result = listItemData.deleteByItemId(itemId)
        return result
        
