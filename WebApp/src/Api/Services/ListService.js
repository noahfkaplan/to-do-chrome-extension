export default class ListService {
    GetListItemsByListId = (async (Id) =>{
        let listItems = undefined;
        await fetch('http://localhost:5000/api/toDoList/'+Id)
            .then(res => res.json())
            .then((data) => {
                listItems = data.items.map((item) => ({id:item.id, listId:item.listId, text:item.text, url:item.url, completed:item.completed}));
            });
        return listItems;    
    });
}
