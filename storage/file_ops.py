import os

# Create the storage directory
storage_path = './storage'
os.makedirs(storage_path, exist_ok=True)

# Create a file in the storage directory
def create_file(filename, content):
    filepath = os.path.join(storage_path, filename)
    with open(filepath, 'w') as file:
        file.write(content)

# Read a file from the storage directory
def read_file(filename):
    filepath = os.path.join(storage_path, filename)
    with open(filepath, 'r') as file:
        return file.read()

# List files in the storage directory
def list_storage_files():
    return os.listdir(storage_path)
