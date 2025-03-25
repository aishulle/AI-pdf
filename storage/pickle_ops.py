import os
import pickle

storage_path = './storage'

def save_object(filename, obj):
    filepath = os.path.join(storage_path, filename)
    with open(filepath, 'wb') as file:
        pickle.dump(obj, file)

def load_object(filename):
    filepath = os.path.join(storage_path, filename)
    with open(filepath, 'rb') as file:
        return pickle.load(file)
