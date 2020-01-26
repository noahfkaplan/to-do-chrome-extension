class ToDoList:
    id = 0
    items = []

    def createDictionary(self):
        dictionary = {
            "id": self.id,
            "items": self.items,
        }