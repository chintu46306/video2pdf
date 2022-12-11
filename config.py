import os

PORT = os.getenv("PORT", default=5000)

bind = "0.0.0.0:{}".format(PORT)