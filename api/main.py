import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client

gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
RCSB_URL = "https://data.rcsb.org/rest/v1/core/entry/"

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Please create .env.local file and insert UNSPLASH_KEY there"
    )

app = Flask(__name__)

CORS(app)

# Enable debug mode

app.debug = True


@app.route("/new-image")
def new_image():
    word = request.args.get("query")
    headers = {
        "Accept-Version": "v1",
    }
    params = {}
    response = requests.get(url=RCSB_URL + word, headers=headers, params=params)
    data = response.json()
    return data


@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        # read images from db
        images = images_collection.find({})
        return jsonify([img for img in images])
    if request.method == "POST":
        # save image in db
        image = request.get_json()
        image["_id"] = image.get("title")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}


@app.route("/images/<image_id>", methods=["DELETE"])
def image_delete(image_id):
    # delete image from db
    result = images_collection.delete_one({"_id": image_id})
    if result and not result.deleted_count:
        return {"error": "Image not found"}, 404
    elif not result:
        return {"error": "Image not deleted"}, 500
    return {"deleted_id": image_id}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
