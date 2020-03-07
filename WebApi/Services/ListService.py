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

    def insertOrUpdateListItem(listItem):
        item = json.loads(listItem)
        print(item)
        listItemData = ListItemData()
        if item["_id"] == "null":
            result = listItemData.insert(item)
        else:       
            print("updating")     
            result = listItemData.updateListItem(item)
            print(result)
        return result

    def deleteListItem(itemId):
        listItemData = ListItemData()
        result = listItemData.deleteByItemId(itemId)
        return result
        
