from Models.ListItem import ListItem
from Models.ToDoList import ToDoList

class ListService():
    def getListItemsByListId(listId):
        #returning the default list item until the db is set up
        #for each list item with listID = listId, create dictionary and return
        defaultItem = ListItem()
        items = []
        items.append(defaultItem.createDictionary())
        print(items)
        if listId == 0:
            return items
        else:
            return items
