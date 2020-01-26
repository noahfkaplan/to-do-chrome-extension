class ListItem:
    id = 0
    listId = 0
    text = "Default Item"
    url = "http://www.google.com"
    completed = False

    def createDictionary(self):
        return {
            "id": self.id,
            "listId": self.listId,
            "text": self.text,
            "url": self.url,
            "completed": self.completed
        }