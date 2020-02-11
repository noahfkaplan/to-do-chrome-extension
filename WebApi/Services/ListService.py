from Models.ListItem import ListItem
from Models.ToDoList import ToDoList
from Data.ListItemData import ListItemData
import json

class ListService():
    def getListItemsByListId(listId):
        #returning the default list item until the db is set up
        #for each list item with listID = listId, create dictionary and return
        listItemData = ListItemData()
        items = listItemData.getByListId(listId)
        return items

    def insertListItem(listItem):
        print(listItem)
        
        listItemData = ListItemData()
        result = listItemData.insert(json.loads(listItem))
        return result
        
