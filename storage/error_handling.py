import os

storage_path = './storage'

def safe_create_file(filename, content):
    try:
        filepath = os.path.join(storage_path, filename)
        with open(filepath, 'w') as file:
            file.write(content)
        print(f"File {filename} created successfully")
    except IOError as e:
        print(f"Error creating file: {e}")

def file_exists(filename):
    filepath = os.path.join(storage_path, filename)
    return os.path.exists(filepath)
