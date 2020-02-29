from Models.ListItem import ListItem
from Models.ToDoList import ToDoList
from Data.ListItemData import ListItemData
import json

class ListService():
    def getListItemsByListId(listId):
        #returning the default list item until the db is set up
        #for each list item with listID = listId, create dictionary and return
        listItemData = ListItemData("mongodb://localhost:27017/")
        items = listItemData.getByListId(listId)
        return items

    def insertListItem(listItem):
        listItemData = ListItemData("mongodb://localhost:27017/")
        result = listItemData.insert(json.loads(listItem))
        return result

    def deleteListItem(itemId):
        listItemData = ListItemData("mongodb://localhost:27017/")
        result = listItemData.deleteByItemId(itemId)
        return result
        
