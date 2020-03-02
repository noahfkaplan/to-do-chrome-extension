from dependency_injector import containers, providers
from pymongo import MongoClient
from ListService import ListService
from main import main

class IocContainer(containers.DeclarativeContainer):
    database_client = providers.Singleton(MongoClient, host='mongodb://localhost:27017/')
    list_service = providers.Factory(ListService, db=database_client)

    main = providers.Callable(
        main.main,
        listService=list_service,
    