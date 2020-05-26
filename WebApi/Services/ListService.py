from WebApi.Models.ListItem import ListItem
from WebApi.Models.ToDoList import ToDoList
from WebApi.Data.ListItemData import ListItemData
import json

class ListService():
    def getListItemsByListId(listId):
        #for each list item with listID = listId, create dictionary and return
        listItemData = ListItemData()
        items = listItemData.getByListId(listId)
        return items

    def insertOrUpdateListItem(listItem):
        item = json.loads(listItem)
        listItemData = ListItemData()
        if not item["_id"]:
            result = listItemData.insert(item)
        else:
            result = listItemData.updateListItem(item)   
        return result

    def deleteListItem(itemId):
        listItemData = ListItemData()
        result = listItemData.deleteByItemId(itemId)
        return result
