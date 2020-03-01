import unittest
import app from ListController

class ListControllerTests(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
 

    def test_toDoList_ReturnsAllItems_WhenListExistsWithItems(self):
        response = self.app.post('/api/toDoList/1')
        print(response)
        self.assertFalse(True)