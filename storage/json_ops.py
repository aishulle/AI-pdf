import os
import json

storage_path = './storage'

def save_json(filename, data):
    filepath = os.path.join(storage_path, filename)
    with open(filepath, 'w') as file:
        json.dump(data, file, indent=4)

def load_json(filename):
    filepath = os.path.join(storage_path, filename)
    with open(filepath, 'r') as file:
        return json.load(file)
