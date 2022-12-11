from server import app 
import os

if __name__ == "__main__":
    app.run(port=os.getenv("PORT", default=5000))