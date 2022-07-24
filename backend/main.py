import json
from os.path import isfile
from fastapi import FastAPI, Response
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from mimetypes import guess_type


app = FastAPI()
app.mount("/json", StaticFiles(directory="json"), name="json")


item_1 = "1.json"

# check item id
@app.get("/item/{item_id}")
async def read_item(item_id):
    filename = str(item_id) + '.json'


    with open(filename) as f:
        content = f.read()
    print(content)

    if not isfile(filename):
        return Response(status_code=404)
    
    content_type, _ = guess_type(filename)

    return Response(content, media_type=content_type)
