export default class ListService {
    async GetListItemsByListId(Id){
        let listItems = undefined;
        await fetch('http://localhost:5000/api/toDoList/'+Id)
            .then(res => res.json())
            .then((data) => {
                listItems = data.items.map((item) => ({id:item._id, listId:item.listId, text:item.text, url:item.url, completed:item.completed}));
            });
        return listItems;    
    };

    async PostListItem(listItem) {
        await fetch('http://localhost:5000/api/toDoList/listItem', {
            method: 'POST',
            body: JSON.stringify(listItem)
        });
    }

    async DeleteListItemByItemId(Id){
        await fetch('http://localhost:5000/api/toDoList/listItem/'+Id, {
            method: 'DELETE'
        })
        .then(res => res.json());
    }
}
